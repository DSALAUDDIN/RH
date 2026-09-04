// src/lib/routes.ts
//
// The route manifest. sitemap.ts and scripts/seo-audit.mjs both read it, so a
// page cannot exist without appearing in the sitemap and being checked.
//
// Why: the sitemap used to be a hand-written array. /banani, /banasree and both
// doctor pages were simply forgotten — and were simultaneously canonicalised to
// the homepage, so Google had no route to them at all (docs/audit-report.md P0-2).

export interface RouteEntry {
  path: string;
  priority: number;
  changeFrequency: 'daily' | 'weekly' | 'monthly' | 'yearly';
}

export const ROUTES: RouteEntry[] = [
  { path: '/', priority: 1.0, changeFrequency: 'weekly' },

  // Branches — the two entities the whole site has to distinguish.
  { path: '/banani', priority: 0.95, changeFrequency: 'monthly' },
  { path: '/banasree', priority: 0.95, changeFrequency: 'monthly' },

  // Clinicians — what a knowledge panel and an AI assistant cite.
  { path: '/dr-hasan', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/dr-shimia', priority: 0.9, changeFrequency: 'monthly' },

  // Treatments
  { path: '/implants', priority: 0.95, changeFrequency: 'monthly' },
  { path: '/orthodontics', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/root-canal', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/zirconia-crown', priority: 0.85, changeFrequency: 'monthly' },
  { path: '/zirconia-veneers', priority: 0.85, changeFrequency: 'monthly' },
  { path: '/dental-surgery', priority: 0.85, changeFrequency: 'monthly' },
  { path: '/digital-dentistry', priority: 0.85, changeFrequency: 'monthly' },
  { path: '/kids-care', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/special-child', priority: 0.8, changeFrequency: 'monthly' },

  // Hubs
  { path: '/treatments', priority: 0.85, changeFrequency: 'monthly' },
  { path: '/services', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/specialties', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/team', priority: 0.85, changeFrequency: 'monthly' },
  { path: '/about', priority: 0.85, changeFrequency: 'monthly' },
  { path: '/contact', priority: 0.85, changeFrequency: 'monthly' },
  { path: '/dental-tourism', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/blog', priority: 0.75, changeFrequency: 'weekly' },
  { path: '/reviews', priority: 0.7, changeFrequency: 'weekly' },
];

export const SPECIALTY_SLUGS = [
  '3d-imaging',
  'braces',
  'zirconia',
  'root-canal',
  'gum-care',
  'kids-care',
  'implants',
  'aesthetics',
  'dental-tourism',
];

/** Routes that exist but must not be indexed or listed. */
export const EXCLUDED = ['/admin', '/admin/dashboard', '/team/dr-hasan', '/team/dr-shimia'];
