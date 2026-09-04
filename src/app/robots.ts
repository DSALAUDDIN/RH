import { MetadataRoute } from 'next';
import { BASE_URL } from '@/lib/metadata';

/* AI answer engines are named explicitly rather than left to the wildcard.
   The wildcard already permits them, but naming them is what makes the intent
   legible to anyone auditing the file — and it is where a future decision to
   exclude one would be recorded. */
const AI_AGENTS = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-User',
  'anthropic-ai',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',
  'Applebot-Extended',
  'CCBot',
  'Bytespider',
  'Amazonbot',
  'meta-externalagent',
];

export default function robots(): MetadataRoute.Robots {
  /* /_next/ is deliberately NOT disallowed. Blocking it stops Googlebot
     fetching the JS and CSS it needs to render the page, and a page Google
     cannot render is a page it cannot rank. */
  const disallow = ['/api/', '/admin', '/private/'];

  return {
    rules: [
      { userAgent: '*', allow: '/', disallow },
      ...AI_AGENTS.map((userAgent) => ({ userAgent, allow: '/', disallow })),
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
