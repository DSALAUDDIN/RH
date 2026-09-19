/**
 * Route manifest: the single list of indexable URLs.
 *
 * Consumed by app/sitemap.ts, app/llms.txt and scripts/seo-audit.mjs, so a new
 * page must be registered here to be discoverable and audited.
 */

export type ChangeFrequency = 'daily' | 'weekly' | 'monthly' | 'yearly';

export interface RouteEntry {
  path: string;
  /** Human-readable label, used in llms.txt and internal tooling. */
  label: string;
  priority: number;
  changeFrequency: ChangeFrequency;
  /** ISO date of the last meaningful content change. */
  lastModified?: string;
}

/** Fallback lastModified for routes without their own date. Bump on content releases. */
export const CONTENT_UPDATED = '2026-09-19';

export const ROUTES: RouteEntry[] = [
  { path: '/', label: 'Home', priority: 1.0, changeFrequency: 'weekly' },

  // Branches
  {
    path: '/banani',
    label: 'Banani private dental suite',
    priority: 0.95,
    changeFrequency: 'monthly',
  },
  {
    path: '/banasree',
    label: 'Banasree dental hospital',
    priority: 0.95,
    changeFrequency: 'monthly',
  },

  // Clinicians
  { path: '/dr-hasan', label: 'Dr. B.M. Rafiqul Hasan', priority: 0.9, changeFrequency: 'monthly' },
  {
    path: '/dr-shimia',
    label: 'Dr. Shimia Binte Taher',
    priority: 0.9,
    changeFrequency: 'monthly',
  },

  // Treatments
  { path: '/implants', label: 'Dental implants', priority: 0.95, changeFrequency: 'monthly' },
  {
    path: '/orthodontics',
    label: 'Orthodontics (braces and aligners)',
    priority: 0.9,
    changeFrequency: 'monthly',
  },
  { path: '/root-canal', label: 'Root canal treatment', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/zirconia-crown', label: 'Zirconia crowns', priority: 0.85, changeFrequency: 'monthly' },
  { path: '/zirconia-veneers', label: 'Veneers', priority: 0.85, changeFrequency: 'monthly' },
  {
    path: '/dental-surgery',
    label: 'Oral and dental surgery',
    priority: 0.85,
    changeFrequency: 'monthly',
  },
  {
    path: '/digital-dentistry',
    label: 'Digital dentistry and 3D imaging',
    priority: 0.85,
    changeFrequency: 'monthly',
  },
  { path: '/kids-care', label: "Children's dentistry", priority: 0.8, changeFrequency: 'monthly' },
  {
    path: '/special-child',
    label: 'Dentistry for children with special needs',
    priority: 0.8,
    changeFrequency: 'monthly',
  },

  // Hubs
  { path: '/treatments', label: 'Treatments', priority: 0.85, changeFrequency: 'monthly' },
  { path: '/services', label: 'Services', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/specialties', label: 'Specialties', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/team', label: 'Clinical team', priority: 0.85, changeFrequency: 'monthly' },
  { path: '/about', label: 'About', priority: 0.85, changeFrequency: 'monthly' },
  { path: '/contact', label: 'Contact and booking', priority: 0.85, changeFrequency: 'monthly' },
  {
    path: '/dental-tourism',
    label: 'Treatment for overseas patients',
    priority: 0.8,
    changeFrequency: 'monthly',
  },
  { path: '/blog', label: 'Articles', priority: 0.75, changeFrequency: 'weekly' },
  { path: '/reviews', label: 'Patient reviews', priority: 0.7, changeFrequency: 'weekly' },
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
] as const;

export type SpecialtySlug = (typeof SPECIALTY_SLUGS)[number];

/**
 * Specialty pages that overlap a dedicated treatment page. They canonicalise
 * to the treatment page and are left out of the sitemap to avoid keyword
 * cannibalisation. Remove an entry to let a specialty page rank on its own.
 */
export const SPECIALTY_CANONICAL: Partial<Record<SpecialtySlug, string>> = {
  braces: '/orthodontics',
  zirconia: '/zirconia-crown',
  'root-canal': '/root-canal',
  'kids-care': '/kids-care',
  implants: '/implants',
  'dental-tourism': '/dental-tourism',
};

export function isSpecialtySlug(value: string): value is SpecialtySlug {
  return (SPECIALTY_SLUGS as readonly string[]).includes(value);
}

/** Routes that exist but must never be indexed or listed. */
export const EXCLUDED = ['/admin', '/admin/dashboard'];

/** Permanent redirects, applied in next.config.ts. */
export const REDIRECTS: { source: string; destination: string }[] = [
  { source: '/team/dr-hasan', destination: '/dr-hasan' },
  { source: '/team/dr-shimia', destination: '/dr-shimia' },
];
