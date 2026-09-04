#!/usr/bin/env node
/**
 * scripts/seo-audit.mjs
 *
 * Crawls the running site and asserts the things that were actually broken.
 * Every check here corresponds to a finding in docs/audit-report.md — this
 * script exists so none of them can come back quietly.
 *
 *   npm run build && npm start        # in one terminal
 *   node scripts/seo-audit.mjs        # in another
 *
 * Options:  --base=http://localhost:3000   --json
 * Exit code 1 if any ERROR-level check fails, so it can gate a deploy.
 */

import { ROUTES, SPECIALTY_SLUGS, EXCLUDED } from '../src/lib/routes.ts';

const arg = (k, d) => {
  const hit = process.argv.find((a) => a.startsWith(`--${k}=`));
  return hit ? hit.slice(k.length + 3) : d;
};
const BASE = arg('base', 'http://localhost:3000').replace(/\/$/, '');
const JSON_OUT = process.argv.includes('--json');
const CANONICAL_HOST = 'https://www.rhdentalcare.com';

const TITLE_MAX = 60;
const DESC_MAX = 155;

/* Claims that must never reappear in shipped HTML. Each was a real string in
   the codebase — see docs/audit-report.md P2-2. */
const BANNED = [
  /\b13\s*,?\s*000\+/i, /\b13k\+/i, /\b500\+\s*(google\s*)?reviews?/i,
  /\bhappy patients\b/i, /\b#\s*1\b/, /\bno\.?\s*1\b/i,
  /\bbest dental clinic\b/i, /\bworld-?class\b/i,
  /\bpainless guarantee\b/i, /\bpain-?free guarantee\b/i,
  /\b98%\s*success/i, /\bluxur/i, /\blimited slots\b/i,
];

const results = [];
const add = (level, route, check, detail) => results.push({ level, route, check, detail });

async function get(path) {
  const res = await fetch(BASE + path, { redirect: 'manual' });
  return { status: res.status, html: res.ok ? await res.text() : '' };
}

const one = (html, re) => (html.match(re) ?? [])[1] ?? null;
const all = (html, re) => [...html.matchAll(re)].map((m) => m[1]);
const decode = (s) =>
  (s ?? '').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
           .replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&mdash;/g, '—');

function stripped(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

async function auditRoute(path) {
  const { status, html } = await get(path);
  if (status !== 200) {
    add('ERROR', path, 'http', `returned ${status}`);
    return;
  }

  /* ── Canonical: present, absolute, and pointing at THIS url ──────────────
     The bug this whole script exists for: `canonical: '/'` on the root layout
     was inherited by twelve routes, so they told Google they were the
     homepage. */
  const canonical = one(html, /<link rel="canonical" href="([^"]+)"/);
  const expected = CANONICAL_HOST + (path === '/' ? '' : path);
  if (!canonical) add('ERROR', path, 'canonical', 'missing');
  else if (canonical !== expected)
    add('ERROR', path, 'canonical', `points at ${canonical}, expected ${expected}`);

  /* ── Title ── */
  const title = decode(one(html, /<title>([^<]*)<\/title>/));
  if (!title) add('ERROR', path, 'title', 'missing');
  else {
    const bare = title.split(' | ')[0];
    if (bare.length > TITLE_MAX)
      add('WARN', path, 'title', `${bare.length} chars (max ${TITLE_MAX}): ${bare}`);
    seenTitles.set(title, [...(seenTitles.get(title) ?? []), path]);
  }

  /* ── Description ── */
  const desc = decode(one(html, /<meta name="description" content="([^"]*)"/));
  if (!desc) add('ERROR', path, 'description', 'missing');
  else {
    if (desc.length > DESC_MAX)
      add('WARN', path, 'description', `${desc.length} chars (max ${DESC_MAX})`);
    seenDescs.set(desc, [...(seenDescs.get(desc) ?? []), path]);
  }

  /* ── Exactly one H1 ── */
  const h1s = [...html.matchAll(/<h1[\s>]/gi)];
  if (h1s.length === 0) add('ERROR', path, 'h1', 'no <h1>');
  else if (h1s.length > 1) add('WARN', path, 'h1', `${h1s.length} <h1> elements`);

  /* ── An H1 must not be invisible in the initial HTML.
        Framer Motion was writing opacity:0 inline on two hero headings. ── */
  const hiddenH1 = /<h1[^>]*style="[^"]*opacity:\s*0(?:[;"\s]|$)/i.test(html);
  if (hiddenH1) add('ERROR', path, 'h1-hidden', 'h1 rendered with inline opacity:0');

  /* ── OpenGraph ── */
  if (!/property="og:title"/.test(html)) add('WARN', path, 'og', 'no og:title');
  if (!/property="og:description"/.test(html)) add('WARN', path, 'og', 'no og:description');

  /* ── noindex ── */
  const robots = one(html, /<meta name="robots" content="([^"]*)"/);
  if (robots && /noindex/.test(robots) && !EXCLUDED.includes(path))
    add('ERROR', path, 'robots', `noindex on an indexable route: ${robots}`);

  /* ── Structured data ── */
  const blocks = all(html, /<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g);
  if (!blocks.length) add('WARN', path, 'jsonld', 'no JSON-LD');
  const ids = new Map();
  for (const raw of blocks) {
    let parsed;
    try { parsed = JSON.parse(raw.replace(/\\u003c/g, '<')); }
    catch (e) { add('ERROR', path, 'jsonld', `unparseable: ${e.message}`); continue; }
    const nodes = parsed['@graph'] ?? [parsed];
    for (const n of nodes) {
      if (JSON.stringify(n).includes('aggregateRating'))
        add('ERROR', path, 'aggregateRating',
            'aggregateRating in markup — only permitted from a live API response');
      if (n['@id']) ids.set(n['@id'], (ids.get(n['@id']) ?? 0) + 1);
    }
  }
  for (const [id, count] of ids)
    if (count > 1) add('ERROR', path, 'jsonld', `@id ${id} declared ${count}× on one page`);

  /* ── Contact details must come from branches.ts, not literals in a page ── */
  const text = stripped(html);
  if (/tel:\+?8801234567890/.test(html))
    add('ERROR', path, 'phone', 'placeholder number +8801234567890 in markup');

  /* ── Unsupported claims ── */
  for (const re of BANNED) {
    const m = text.match(re);
    if (m) add('ERROR', path, 'claim', `"${m[0]}" — unsupported claim in visible text`);
  }

  /* ── Thin content ── */
  const words = text.split(' ').length;
  if (words < 250) add('WARN', path, 'thin', `${words} words of body text`);

  return { path, title, desc, canonical, words, jsonld: blocks.length };
}

const seenTitles = new Map();
const seenDescs = new Map();

async function main() {
  console.log(`\nSEO audit — ${BASE}\n${'─'.repeat(64)}`);

  const paths = ROUTES.map((r) => r.path);

  /* ── robots.txt ── */
  const robots = await get('/robots.txt');
  if (robots.status !== 200) add('ERROR', '/robots.txt', 'http', `status ${robots.status}`);
  else {
    if (/Disallow:\s*\/_next\//.test(robots.html))
      add('ERROR', '/robots.txt', 'robots',
          'Disallow: /_next/ blocks the JS and CSS Google needs to render pages');
    if (!/Sitemap:/i.test(robots.html)) add('ERROR', '/robots.txt', 'robots', 'no Sitemap line');
    for (const bot of ['GPTBot', 'ClaudeBot', 'PerplexityBot', 'Google-Extended'])
      if (!robots.html.includes(bot))
        add('WARN', '/robots.txt', 'ai-crawlers', `${bot} not named explicitly`);
  }

  /* ── sitemap covers every route ── */
  const sm = await get('/sitemap.xml');
  if (sm.status !== 200) add('ERROR', '/sitemap.xml', 'http', `status ${sm.status}`);
  else {
    const locs = new Set(
      all(sm.html, /<loc>([^<]+)<\/loc>/g).map((u) => u.replace(CANONICAL_HOST, '') || '/')
    );
    for (const p of paths)
      if (!locs.has(p)) add('ERROR', '/sitemap.xml', 'coverage', `${p} missing from sitemap`);
    for (const s of SPECIALTY_SLUGS)
      if (!locs.has(`/specialties/${s}`))
        add('WARN', '/sitemap.xml', 'coverage', `/specialties/${s} missing`);
    for (const p of EXCLUDED)
      if (locs.has(p)) add('ERROR', '/sitemap.xml', 'coverage', `${p} should not be listed`);
  }

  /* ── every route ── */
  const rows = [];
  for (const p of paths) rows.push(await auditRoute(p));

  /* ── duplicate titles and descriptions across routes ── */
  for (const [t, ps] of seenTitles)
    if (ps.length > 1) add('ERROR', ps.join(', '), 'duplicate-title', `"${t}"`);
  for (const [d, ps] of seenDescs)
    if (ps.length > 1) add('ERROR', ps.join(', '), 'duplicate-desc', `"${d.slice(0, 60)}…"`);

  /* ── report ── */
  if (JSON_OUT) {
    console.log(JSON.stringify({ results, rows: rows.filter(Boolean) }, null, 2));
  } else {
    console.log(
      '\n' + 'route'.padEnd(22) + 'title'.padStart(6) + 'desc'.padStart(6) +
      'words'.padStart(7) + 'ld'.padStart(4) + '  canonical'
    );
    for (const r of rows.filter(Boolean)) {
      const ok = r.canonical === CANONICAL_HOST + (r.path === '/' ? '' : r.path);
      console.log(
        r.path.padEnd(22) +
        String((r.title ?? '').split(' | ')[0].length).padStart(6) +
        String((r.desc ?? '').length).padStart(6) +
        String(r.words).padStart(7) +
        String(r.jsonld).padStart(4) +
        '  ' + (ok ? 'ok' : `WRONG → ${r.canonical}`)
      );
    }

    const errors = results.filter((r) => r.level === 'ERROR');
    const warns = results.filter((r) => r.level === 'WARN');

    for (const [label, list] of [['ERRORS', errors], ['WARNINGS', warns]]) {
      if (!list.length) continue;
      console.log(`\n${label} (${list.length})\n${'─'.repeat(64)}`);
      for (const r of list) console.log(`  ${r.route}  [${r.check}]  ${r.detail}`);
    }

    console.log(
      `\n${'─'.repeat(64)}\n${errors.length} error(s), ${warns.length} warning(s)\n`
    );
  }

  process.exit(results.some((r) => r.level === 'ERROR') ? 1 : 0);
}

main().catch((e) => { console.error(e); process.exit(1); });
