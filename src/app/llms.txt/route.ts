import { SITE, absoluteUrl } from '@/config/site';
import { BRANCH_LIST } from '@/lib/branches';
import { ROUTES } from '@/lib/seo/routes';

export const dynamic = 'force-static';

/**
 * /llms.txt: a plain-text site summary for AI assistants and answer engines
 * (https://llmstxt.org). Generated from the route manifest and branch registry
 * so it never drifts from the site.
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

  const body = `# ${SITE.name}

> ${SITE.description}

## Clinics

${branches}

## Pages

${pages}
`;

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
