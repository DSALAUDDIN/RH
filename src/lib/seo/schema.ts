/**
 * Structured data (schema.org JSON-LD) builders.
 *
 * All JSON-LD on the site is produced here so entity IDs stay stable and every
 * node can reference the others by `@id`. Pages render nodes through
 * <JsonLd>; the site-wide graph (organization, website, both clinics) is
 * rendered once by the root layout.
 *
 * Policy: aggregateRating is never built from static data. Ratings may only
 * come from a live Places API response (see src/lib/reviews.ts).
 */

import { SITE, absoluteUrl } from '@/config/site';
import { BRANCHES, type Branch, type BranchId } from '@/lib/branches';

export type JsonLdNode = Record<string, unknown>;

/** Stable entity identifiers. Changing these breaks entity continuity. */
export const ID = {
  organization: `${SITE.url}/#organization`,
  website: `${SITE.url}/#website`,
  branch: (id: BranchId) => `${SITE.url}/${id}#clinic`,
  physician: (slug: string) => `${SITE.url}/${slug}#physician`,
  teamMember: (slug: string) => `${SITE.url}/team#${slug}`,
  webpage: (path: string) => `${absoluteUrl(path)}#webpage`,
  procedure: (path: string) => `${absoluteUrl(path)}#procedure`,
  article: (path: string) => `${absoluteUrl(path)}#article`,
};

/** Drops undefined, null and empty-string values. */
function compact<T extends JsonLdNode>(node: T): T {
  return Object.fromEntries(
    Object.entries(node).filter(([, v]) => v !== undefined && v !== null && v !== ''),
  ) as T;
}

/* Organization and clinics */

function postalAddress(b: Branch): JsonLdNode {
  return {
    '@type': 'PostalAddress',
    streetAddress: b.streetAddress,
    addressLocality: b.addressLocality,
    addressRegion: 'Dhaka Division',
    postalCode: b.postalCode,
    addressCountry: 'BD',
  };
}

/** Published only when the branch record marks hours as verified. */
function openingHours(b: Branch): JsonLdNode[] | undefined {
  if (!b.hoursVerified || !b.hours?.length) return undefined;
  return b.hours.map((h) => ({
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: h.days,
    opens: h.opens,
    closes: h.closes,
  }));
}

/** Published only when coordinates are verified against the listing pin. */
function geo(b: Branch): JsonLdNode | undefined {
  if (!b.geoVerified || !b.geo) return undefined;
  return { '@type': 'GeoCoordinates', latitude: b.geo.lat, longitude: b.geo.lng };
}

export function branchSchema(id: BranchId): JsonLdNode {
  const b = BRANCHES[id];
  return compact({
    '@type': ['Dentist', 'MedicalClinic'],
    '@id': ID.branch(id),
    name: b.name,
    description: b.schemaDescription,
    url: absoluteUrl(b.href),
    telephone: b.phone,
    email: b.email,
    image: b.ogImage ? absoluteUrl(b.ogImage) : undefined,
    address: postalAddress(b),
    geo: geo(b),
    hasMap: b.mapLink,
    openingHoursSpecification: openingHours(b),
    currenciesAccepted: 'BDT',
    paymentAccepted: b.paymentAccepted,
    areaServed: { '@type': 'City', name: 'Dhaka' },
    parentOrganization: { '@id': ID.organization },
    availableService: b.services.map((name) => ({ '@type': 'MedicalProcedure', name })),
  });
}

export function organizationSchema(): JsonLdNode {
  return compact({
    '@type': 'MedicalOrganization',
    '@id': ID.organization,
    name: SITE.name,
    alternateName: [...SITE.alternateNames],
    description: SITE.description,
    url: SITE.url,
    logo: {
      '@type': 'ImageObject',
      url: absoluteUrl(SITE.logo.path),
      width: SITE.logo.width,
      height: SITE.logo.height,
    },
    medicalSpecialty: 'Dentistry',
    department: [{ '@id': ID.branch('banani') }, { '@id': ID.branch('banasree') }],
    sameAs: SITE.sameAs.length ? [...SITE.sameAs] : undefined,
  });
}

export function websiteSchema(): JsonLdNode {
  return {
    '@type': 'WebSite',
    '@id': ID.website,
    url: SITE.url,
    name: SITE.name,
    alternateName: [...SITE.alternateNames],
    publisher: { '@id': ID.organization },
    inLanguage: SITE.language,
  };
}

/** Site-wide graph, rendered once by the root layout. */
export function siteGraph(): JsonLdNode[] {
  return [organizationSchema(), websiteSchema(), branchSchema('banani'), branchSchema('banasree')];
}

/* People */

export interface PhysicianInput {
  slug: string;
  name: string;
  jobTitle: string;
  description: string;
  image?: string;
  /** Verified credentials only. */
  credentials?: string[];
  knowsAbout?: string[];
  worksAt?: BranchId[];
  /** False for roster entries without their own profile page. */
  hasProfilePage?: boolean;
}

export function physicianSchema(p: PhysicianInput): JsonLdNode {
  const hasPage = p.hasProfilePage ?? true;
  return compact({
    '@type': 'Physician',
    '@id': hasPage ? ID.physician(p.slug) : ID.teamMember(p.slug),
    name: p.name,
    honorificPrefix: 'Dr.',
    jobTitle: p.jobTitle,
    description: p.description,
    url: hasPage ? absoluteUrl(`/${p.slug}`) : absoluteUrl(`/team#${p.slug}`),
    image: p.image ? absoluteUrl(p.image) : undefined,
    medicalSpecialty: 'Dentistry',
    worksFor: { '@id': ID.organization },
    availableAtOrFrom: (p.worksAt ?? ['banani', 'banasree']).map((b) => ({ '@id': ID.branch(b) })),
    hasCredential: p.credentials?.length
      ? p.credentials.map((c) => ({
          '@type': 'EducationalOccupationalCredential',
          credentialCategory: c,
        }))
      : undefined,
    knowsAbout: p.knowsAbout,
  });
}

/* Content */

export interface FaqItem {
  q: string;
  /** Published answer. Items with an empty answer are not rendered. */
  a: string;
  /** Editorial note for content still pending; never rendered. */
  pending?: string;
}

/** FAQ items that are ready to publish. */
export function publishedFaq(items: FaqItem[]): FaqItem[] {
  return items.filter((i) => i.a.trim().length > 0);
}

export function faqSchema(items: FaqItem[]): JsonLdNode {
  return {
    '@type': 'FAQPage',
    mainEntity: publishedFaq(items).map((i) => ({
      '@type': 'Question',
      name: i.q,
      acceptedAnswer: { '@type': 'Answer', text: i.a },
    })),
  };
}

export interface Crumb {
  name: string;
  path: string;
}

export function breadcrumbSchema(trail: Crumb[]): JsonLdNode {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((t, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: t.name,
      item: absoluteUrl(t.path),
    })),
  };
}

/** Breadcrumb that always starts at the home page. */
export function breadcrumbs(...trail: Crumb[]): JsonLdNode {
  return breadcrumbSchema([{ name: SITE.name, path: '/' }, ...trail]);
}

export interface ProcedureInput {
  name: string;
  description: string;
  path: string;
  kind?: 'MedicalProcedure' | 'SurgicalProcedure' | 'TherapeuticProcedure';
  bodyLocation?: string;
  howPerformed?: string;
  preparation?: string;
  followup?: string;
}

export function medicalProcedureSchema(input: ProcedureInput): JsonLdNode {
  return compact({
    '@type': input.kind ?? 'MedicalProcedure',
    '@id': ID.procedure(input.path),
    name: input.name,
    description: input.description,
    url: absoluteUrl(input.path),
    bodyLocation: input.bodyLocation,
    howPerformed: input.howPerformed,
    preparation: input.preparation,
    followup: input.followup,
  });
}

export interface MedicalWebPageInput {
  path: string;
  name: string;
  description: string;
  /** `@id` of the main entity, e.g. ID.procedure('/implants'). */
  about?: string;
  /** Physician slug, only once the page has actually been clinically reviewed. */
  reviewedBy?: string;
  /** ISO date of the last clinical review. */
  lastReviewed?: string;
}

export function medicalWebPageSchema(input: MedicalWebPageInput): JsonLdNode {
  return compact({
    '@type': 'MedicalWebPage',
    '@id': ID.webpage(input.path),
    url: absoluteUrl(input.path),
    name: input.name,
    description: input.description,
    inLanguage: SITE.language,
    isPartOf: { '@id': ID.website },
    publisher: { '@id': ID.organization },
    about: input.about ? { '@id': input.about } : undefined,
    mainEntity: input.about ? { '@id': input.about } : undefined,
    reviewedBy: input.reviewedBy ? { '@id': ID.physician(input.reviewedBy) } : undefined,
    lastReviewed: input.lastReviewed,
  });
}

export interface ArticleInput {
  path: string;
  headline: string;
  description: string;
  section?: string;
  image?: string;
  /** Physician slug of the author. */
  author?: string;
  datePublished?: string;
  dateModified?: string;
}

export function articleSchema(input: ArticleInput): JsonLdNode {
  return compact({
    '@type': 'BlogPosting',
    '@id': ID.article(input.path),
    mainEntityOfPage: absoluteUrl(input.path),
    url: absoluteUrl(input.path),
    headline: input.headline,
    description: input.description,
    articleSection: input.section,
    image: absoluteUrl(input.image ?? SITE.defaultOgImage.path),
    author: input.author ? { '@id': ID.physician(input.author) } : { '@id': ID.organization },
    publisher: { '@id': ID.organization },
    datePublished: input.datePublished,
    dateModified: input.dateModified ?? input.datePublished,
    inLanguage: SITE.language,
    isPartOf: { '@id': ID.website },
  });
}

export function itemListSchema(items: { name: string; path: string }[]): JsonLdNode {
  return {
    '@type': 'ItemList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      url: absoluteUrl(item.path),
    })),
  };
}

/** Wraps nodes in a single `@graph` document. */
export function buildGraph(nodes: JsonLdNode[]) {
  return { '@context': 'https://schema.org', '@graph': nodes };
}

/** Serialises JSON-LD for a <script> tag, escaping `<` to prevent tag injection. */
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}
