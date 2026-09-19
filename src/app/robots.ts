import type { MetadataRoute } from 'next';
import { SITE, absoluteUrl } from '@/config/site';

/** Paths that are never useful in search results. */
const DISALLOW = ['/api/', '/admin'];

/**
 * AI search and assistant crawlers, listed explicitly so the policy for each
 * is visible and can be changed per agent. /_next/ stays crawlable: Googlebot
 * needs the JS and CSS to render pages.
 */
const AI_CRAWLERS = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-User',
  'Claude-SearchBot',
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
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: DISALLOW },
      { userAgent: AI_CRAWLERS, allow: '/', disallow: DISALLOW },
    ],
    sitemap: absoluteUrl('/sitemap.xml'),
    host: SITE.url,
  };
}
