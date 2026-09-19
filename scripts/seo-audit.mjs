#!/usr/bin/env node
/**
 * Technical SEO audit against a running build.
 *
 *   npm run build && npm start
 *   npm run seo:audit                       # defaults to http://localhost:3000
 *   npm run seo:audit -- --base=https://www.rhdentalcare.com
 *   npm run seo:audit -- --json             # machine-readable output
 *
 * Exits with code 1 when any ERROR-level check fails, so it can gate CI/deploys.
 */

import {
  EXCLUDED,
  REDIRECTS,
  ROUTES,
  SPECIALTY_CANONICAL,
  SPECIALTY_SLUGS,
} from '../src/lib/seo/routes.ts';

const arg = (key, fallback) => {
  const hit = process.argv.find((a) => a.startsWith(`--${key}=`));
  return hit ? hit.slice(key.length + 3) : fallback;
};

const BASE = arg('base', 'http://localhost:3000').replace(/\/$/, '');
const JSON_OUT = process.argv.includes('--json');
const CANONICAL_ORIGIN = 'https://www.rhdentalcare.com';
const LANGUAGE = 'en-BD';

const TITLE_MAX = 60;
const DESC_MIN = 70;
const DESC_MAX = 155;
const THIN_CONTENT_WORDS = 250;

/** Unsubstantiated marketing claims that must not appear in rendered copy. */
const BANNED_CLAIMS = [
  /\b13\s*,?\s*000\+/i,
  /\b13k\+/i,
  /\b500\+\s*(google\s*)?reviews?/i,
  /\bhappy patients\b/i,
  /\b#\s*1\b/,
  /\bno\.?\s*1\b/i,
  /\bbest dental clinic\b/i,
  /\bworld-?class\b/i,
  /\bpainless guarantee\b/i,
  /\bpain-?free guarantee\b/i,
  /\b98%\s*success/i,
  /\bluxur/i,
  /\blimited slots\b/i,
];

const results = [];
const add = (level, route, check, detail) => results.push({ level, route, check, detail });

const expectedUrl = (path) => CANONICAL_ORIGIN + (path === '/' ? '' : path);

async function get(path) {
  const res = await fetch(BASE + path, { redirect: 'manual' });
  return {
    status: res.status,
    location: res.headers.get('location'),
    html: res.ok ? await res.text() : '',
  };
}

const first = (html, re) => (html.match(re) ?? [])[1] ?? null;
const every = (html, re) => [...html.matchAll(re)].map((m) => m[1]);
const decode = (s) =>
  (s ?? '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'");

function visibleText(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

const seenTitles = new Map();
const seenDescriptions = new Map();

async function auditPage(path, { canonical: expectedCanonical = path } = {}) {
  const { status, html } = await get(path);
  if (status !== 200) {
    add('ERROR', path, 'http', `returned ${status}`);
    return null;
  }

  // Canonical: present, absolute, self-referencing (or the declared consolidation target).
  const canonical = first(html, /<link rel="canonical" href="([^"]+)"/);
  if (!canonical) add('ERROR', path, 'canonical', 'missing');
  else if (canonical !== expectedUrl(expectedCanonical))
    add('ERROR', path, 'canonical', `${canonical} (expected ${expectedUrl(expectedCanonical)})`);

  // hreflang: language + x-default, matching the canonical.
  const hreflang = new Map(
    [...html.matchAll(/<link rel="alternate" hrefLang="([^"]+)" href="([^"]+)"/gi)].map((m) => [
      m[1],
      m[2],
    ]),
  );
  for (const lang of [LANGUAGE, 'x-default']) {
    if (!hreflang.has(lang)) add('ERROR', path, 'hreflang', `missing ${lang}`);
    else if (canonical && hreflang.get(lang) !== canonical)
      add('ERROR', path, 'hreflang', `${lang} → ${hreflang.get(lang)} does not match canonical`);
  }

  const title = decode(first(html, /<title>([^<]*)<\/title>/));
  if (!title) add('ERROR', path, 'title', 'missing');
  else {
    const bare = title.split(' | ')[0];
    if (bare.length > TITLE_MAX)
      add('WARN', path, 'title', `${bare.length} chars (max ${TITLE_MAX}): ${bare}`);
    seenTitles.set(title, [...(seenTitles.get(title) ?? []), path]);
  }

  const description = decode(first(html, /<meta name="description" content="([^"]*)"/));
  if (!description) add('ERROR', path, 'description', 'missing');
  else {
    if (description.length > DESC_MAX)
      add('WARN', path, 'description', `${description.length} chars (max ${DESC_MAX})`);
    if (description.length < DESC_MIN)
      add('WARN', path, 'description', `${description.length} chars (min ${DESC_MIN})`);
    seenDescriptions.set(description, [...(seenDescriptions.get(description) ?? []), path]);
  }

  const h1Count = (html.match(/<h1[\s>]/gi) ?? []).length;
  if (h1Count === 0) add('ERROR', path, 'h1', 'no <h1>');
  else if (h1Count > 1) add('WARN', path, 'h1', `${h1Count} <h1> elements`);
  if (/<h1[^>]*style="[^"]*opacity:\s*0(?:[;"\s]|$)/i.test(html))
    add('ERROR', path, 'h1', 'rendered with inline opacity:0');

  for (const prop of ['og:title', 'og:description', 'og:image', 'og:url'])
    if (!html.includes(`property="${prop}"`)) add('WARN', path, 'open-graph', `no ${prop}`);
  if (!html.includes('name="twitter:card"')) add('WARN', path, 'twitter', 'no twitter:card');

  const robotsMeta = first(html, /<meta name="robots" content="([^"]*)"/);
  if (robotsMeta && /noindex/.test(robotsMeta) && !EXCLUDED.includes(path))
    add('ERROR', path, 'robots', `noindex on an indexable route: ${robotsMeta}`);

  if (!/<html[^>]+lang="[a-z]{2}/i.test(html)) add('ERROR', path, 'lang', 'missing <html lang>');

  // Structured data: parseable, unique @ids, no static ratings.
  const blocks = every(html, /<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g);
  if (!blocks.length) add('WARN', path, 'jsonld', 'no JSON-LD');
  const ids = new Map();
  const types = new Set();
  for (const raw of blocks) {
    let parsed;
    try {
      parsed = JSON.parse(raw.replace(/\\u003c/g, '<'));
    } catch (e) {
      add('ERROR', path, 'jsonld', `unparseable: ${e.message}`);
      continue;
    }
    for (const node of parsed['@graph'] ?? [parsed]) {
      [].concat(node['@type'] ?? []).forEach((t) => types.add(t));
      if (JSON.stringify(node).includes('aggregateRating'))
        add('ERROR', path, 'jsonld', 'aggregateRating present (only allowed from live data)');
      if (node['@id']) ids.set(node['@id'], (ids.get(node['@id']) ?? 0) + 1);
    }
  }
  for (const [id, count] of ids)
    if (count > 1) add('ERROR', path, 'jsonld', `@id ${id} declared ${count} times`);
  if (path !== '/' && blocks.length && !types.has('BreadcrumbList'))
    add('WARN', path, 'jsonld', 'no BreadcrumbList');

  // Content quality.
  const text = visibleText(html);
  if (/\bTODO\b/.test(text))
    add('ERROR', path, 'content', 'editorial TODO visible in production HTML');
  for (const re of BANNED_CLAIMS) {
    const match = text.match(re);
    if (match) add('ERROR', path, 'claim', `"${match[0]}" in visible text`);
  }
  const words = text.split(' ').length;
  if (words < THIN_CONTENT_WORDS) add('WARN', path, 'thin-content', `${words} words`);

  // Images without alt text.
  const imgs = [...html.matchAll(/<img\b[^>]*>/gi)].map((m) => m[0]);
  const missingAlt = imgs.filter((tag) => !/\balt="/.test(tag)).length;
  if (missingAlt) add('WARN', path, 'img-alt', `${missingAlt} <img> without alt`);

  return { path, title, description, canonical, words, jsonld: blocks.length };
}

async function auditRobots() {
  const robots = await get('/robots.txt');
  if (robots.status !== 200) return add('ERROR', '/robots.txt', 'http', `status ${robots.status}`);
  if (/Disallow:\s*\/_next\//.test(robots.html))
    add('ERROR', '/robots.txt', 'robots', 'Disallow: /_next/ blocks rendering resources');
  if (!/Sitemap:/i.test(robots.html)) add('ERROR', '/robots.txt', 'robots', 'no Sitemap directive');
}

async function auditSitemap() {
  const sitemap = await get('/sitemap.xml');
  if (sitemap.status !== 200)
    return add('ERROR', '/sitemap.xml', 'http', `status ${sitemap.status}`);

  const locs = new Set(
    every(sitemap.html, /<loc>([^<]+)<\/loc>/g).map((u) => u.replace(CANONICAL_ORIGIN, '') || '/'),
  );
  for (const { path } of ROUTES)
    if (!locs.has(path)) add('ERROR', '/sitemap.xml', 'coverage', `${path} missing`);
  for (const slug of SPECIALTY_SLUGS) {
    const path = `/specialties/${slug}`;
    const consolidated = Boolean(SPECIALTY_CANONICAL[slug]);
    if (consolidated && locs.has(path))
      add('ERROR', '/sitemap.xml', 'coverage', `${path} canonicalises elsewhere but is listed`);
    if (!consolidated && !locs.has(path))
      add('WARN', '/sitemap.xml', 'coverage', `${path} missing`);
  }
  for (const path of EXCLUDED)
    if (locs.has(path)) add('ERROR', '/sitemap.xml', 'coverage', `${path} must not be listed`);
}

async function auditRedirects() {
  for (const { source, destination } of REDIRECTS) {
    const res = await get(source);
    if (res.status !== 308 && res.status !== 301)
      add('ERROR', source, 'redirect', `expected permanent redirect, got ${res.status}`);
    else if (!res.location?.endsWith(destination))
      add('ERROR', source, 'redirect', `redirects to ${res.location}, expected ${destination}`);
  }
}

function report(rows) {
  const errors = results.filter((r) => r.level === 'ERROR');
  const warnings = results.filter((r) => r.level === 'WARN');

  if (JSON_OUT) {
    console.log(JSON.stringify({ base: BASE, results, pages: rows }, null, 2));
    return errors.length;
  }

  console.log(`\nSEO audit: ${BASE}\n`);
  console.log(
    'route'.padEnd(34) +
      'title'.padStart(6) +
      'desc'.padStart(6) +
      'words'.padStart(7) +
      'ld'.padStart(4),
  );
  for (const r of rows) {
    console.log(
      r.path.padEnd(34) +
        String((r.title ?? '').split(' | ')[0].length).padStart(6) +
        String((r.description ?? '').length).padStart(6) +
        String(r.words).padStart(7) +
        String(r.jsonld).padStart(4),
    );
  }
  for (const [label, list] of [
    ['Errors', errors],
    ['Warnings', warnings],
  ]) {
    if (!list.length) continue;
    console.log(`\n${label} (${list.length})`);
    for (const r of list) console.log(`  ${r.route}  [${r.check}]  ${r.detail}`);
  }
  console.log(`\n${errors.length} error(s), ${warnings.length} warning(s)\n`);
  return errors.length;
}

async function main() {
  await auditRobots();
  await auditSitemap();
  await auditRedirects();

  const rows = [];
  for (const { path } of ROUTES) rows.push(await auditPage(path));
  for (const slug of SPECIALTY_SLUGS)
    rows.push(
      await auditPage(`/specialties/${slug}`, {
        canonical: SPECIALTY_CANONICAL[slug] ?? `/specialties/${slug}`,
      }),
    );

  const indexable = new Set(ROUTES.map((r) => r.path));
  for (const [title, paths] of seenTitles) {
    const own = paths.filter((p) => indexable.has(p));
    if (own.length > 1) add('ERROR', own.join(', '), 'duplicate-title', `"${title}"`);
  }
  for (const [description, paths] of seenDescriptions) {
    const own = paths.filter((p) => indexable.has(p));
    if (own.length > 1)
      add('ERROR', own.join(', '), 'duplicate-description', `"${description.slice(0, 60)}…"`);
  }

  const errorCount = report(rows.filter(Boolean));
  process.exit(errorCount ? 1 : 0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
