/**
 * Site-wide constants. Anything that identifies the site (name, origin,
 * locale, verification tokens, analytics IDs) is read from here.
 */

export const SITE = {
  name: 'RH Dental Care',
  shortName: 'RH Dental',
  alternateNames: ['RH Dental Clinic', 'আরএইচ ডেন্টাল কেয়ার'],
  /** Canonical origin. No trailing slash. */
  url: 'https://www.rhdentalcare.com',
  /** BCP 47 language tag of the published content. */
  language: 'en-BD',
  /** Open Graph locale. */
  locale: 'en_BD',
  description:
    'Two dental clinics in Dhaka: an appointment-only private suite in Banani and a full-service flagship hospital in Banasree. Same clinicians at both.',
  logo: { path: '/rhlogo.jpeg', width: 200, height: 200 },
  defaultOgImage: {
    path: '/assets/branches/banani/reception.webp',
    width: 1200,
    height: 630,
    alt: 'Reception at RH Dental Care Banani.',
  },
  themeColor: { light: '#ffffff', dark: '#050e1e' },
  geo: { region: 'BD-13', placename: 'Dhaka, Bangladesh' },
  /**
   * Profiles the clinic controls (Facebook, Instagram, YouTube, Google
   * Business Profile). Only add handles that are verified as owned: sameAs
   * links are used for entity reconciliation.
   */
  sameAs: [] as string[],
  verification: {
    google: '45b388b56fe88bf2',
  },
  analytics: {
    ga4: process.env.NEXT_PUBLIC_GA_ID ?? 'G-XZPKR17DNF',
  },
} as const;

/** Resolves a site-relative path to an absolute URL on the canonical origin. */
export function absoluteUrl(path = '/'): string {
  if (/^https?:\/\//.test(path)) return path;
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return normalized === '/' ? SITE.url : `${SITE.url}${normalized}`;
}
