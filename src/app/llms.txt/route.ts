import { SITE, absoluteUrl } from '@/config/site';
import { BRANCH_LIST } from '@/lib/branches';
import { ROUTES } from '@/lib/seo/routes';
import { getAllAuthorityGuides } from '@/data/authorityContent';
import { getAllBanglaAuthorityGuides } from '@/data/banglaAuthorityContent';
import { FAQ_CATEGORIES } from '@/data/faqBank';

export const dynamic = 'force-static';

/**
 * /llms.txt: a plain-text site summary for AI assistants and answer engines
 * (https://llmstxt.org). Generated from the route manifest, branch registry,
 * authority guides, and clinical FAQ bank.
 */
export function GET() {
  const branches = BRANCH_LIST.map(
    (b) =>
      `- [${b.name}](${absoluteUrl(b.href)}): ${b.tagline}. ${b.address}. Phone ${b.phoneDisplay}.` +
      (b.hoursDisplay ? ` Hours: ${b.hoursDisplay}.` : ''),
  ).join('\n');

  const pages = ROUTES.filter((r) => r.path !== '/')
    .map((r) => `- [${r.label}](${absoluteUrl(r.path)})`)
    .join('\n');

  const faqSections = FAQ_CATEGORIES.map(
    (cat) =>
      `- [${cat.title}](${absoluteUrl(`/faq#${cat.slug}`)}): ${cat.faqs.length} verified patient Q&As on ${cat.title.toLowerCase()}.`,
  ).join('\n');

  const enGuides = getAllAuthorityGuides()
    .map((g) => `- [${g.title}](${absoluteUrl(`/guides/${g.slug}`)}): ${g.metaDescription}`)
    .join('\n');

  const bnGuides = getAllBanglaAuthorityGuides()
    .map((g) => `- [${g.title}](${absoluteUrl(`/bn/guides/${g.slug}`)}): ${g.metaDescription}`)
    .join('\n');

  const body = `# ${SITE.name}

> ${SITE.description}
> Full technical documentation, doctor credentials & 120-item FAQ bank: ${absoluteUrl('/llms-full.txt')}

## Clinics & Locations

${branches}

## Core Pages & Specialties

${pages}

## Verified Patient FAQ Bank (120 Questions across 15 Clinical Domains)

${faqSections}

## Doctor-Reviewed Patient Dental Guides (English)

${enGuides}

## সম্পূর্ণ বাংলায় ডেন্টাল গাইডসমূহ (Bangla Dental Guides)

${bnGuides}
`;

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
