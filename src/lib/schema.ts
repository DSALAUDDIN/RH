// src/lib/schema.ts
//
// Single source of structured data. Nothing else in the app should hand-write a
// schema object — before this file existed the branch entities were declared in
// three places (layout.tsx, components/JsonLd.tsx, app/banasree/page.tsx) with
// conflicting coordinates, addresses and opening hours, and /banasree emitted a
// second node reusing the layout node's @id. See docs/audit-report.md P1-5.
//
// HARD RULE: no aggregateRating is ever built here. A rating may only be
// rendered from a live API response (see src/lib/reviews.ts). Marking up a
// rating that does not exist on a real listing violates Google's structured
// data policy and can cost the site its rich results.

import { BRANCHES, BranchId, Branch } from './branches';

export const BASE_URL = 'https://www.rhdentalcare.com';

export const ID = {
  organization: `${BASE_URL}/#organization`,
  website: `${BASE_URL}/#website`,
  branch: (id: BranchId) => `${BASE_URL}/${id}#clinic`,
  physician: (slug: string) => `${BASE_URL}/${slug}#physician`,
};

type Json = Record<string, unknown>;

/* ── Postal address, derived from branches.ts only ───────────────────────── */
function postalAddress(b: Branch): Json {
  return {
    '@type': 'PostalAddress',
    streetAddress: b.streetAddress,
    addressLocality: b.addressLocality,
    addressRegion: 'Dhaka Division',
    postalCode: b.postalCode,
    addressCountry: 'BD',
  };
}

/* ── Opening hours.
   Emitted ONLY when the branch record marks them verified. Publishing invented
   hours in schema is how a patient arrives at a locked door. ─────────────── */
function openingHours(b: Branch): Json[] | undefined {
  if (!b.hoursVerified || !b.hours?.length) return undefined;
  return b.hours.map((h) => ({
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: h.days,
    opens: h.opens,
    closes: h.closes,
  }));
}

/* ── Geo. Same rule: only if verified against the real listing. ──────────── */
function geo(b: Branch): Json | undefined {
  if (!b.geoVerified || !b.geo) return undefined;
  return {
    '@type': 'GeoCoordinates',
    latitude: b.geo.lat,
    longitude: b.geo.lng,
  };
}

function compact<T extends Json>(o: T): T {
  return Object.fromEntries(
    Object.entries(o).filter(([, v]) => v !== undefined && v !== null && v !== '')
  ) as T;
}

/* ── The two clinics, as distinguishable entities ────────────────────────── */
export function branchSchema(id: BranchId): Json {
  const b = BRANCHES[id];
  return compact({
    '@type': ['Dentist', 'MedicalClinic'],
    '@id': ID.branch(id),
    name: b.name,
    description: b.schemaDescription,
    url: `${BASE_URL}${b.href}`,
    telephone: b.phone,
    email: b.email,
    image: b.ogImage ? `${BASE_URL}${b.ogImage}` : undefined,
    address: postalAddress(b),
    geo: geo(b),
    openingHoursSpecification: openingHours(b),
    priceRange: b.priceRange,
    currenciesAccepted: 'BDT',
    paymentAccepted: b.paymentAccepted,
    areaServed: [{ '@type': 'City', name: 'Dhaka' }],
    parentOrganization: { '@id': ID.organization },
    availableService: b.services.map((s) => ({
      '@type': 'MedicalProcedure',
      name: s,
    })),
  });
}

export function organizationSchema(): Json {
  return compact({
    '@type': 'MedicalOrganization',
    '@id': ID.organization,
    name: 'RH Dental Care',
    alternateName: ['RH Dental Clinic', 'আরএইচ ডেন্টাল কেয়ার'],
    description:
      'RH Dental Care operates two dental clinics in Dhaka: an appointment-only private suite in Banani and a full-service flagship hospital in Banasree. Same clinicians, same materials and the same sterilisation protocol at both.',
    url: BASE_URL,
    logo: {
      '@type': 'ImageObject',
      url: `${BASE_URL}/rhlogo.jpeg`,
      width: 200,
      height: 200,
    },
    department: [{ '@id': ID.branch('banani') }, { '@id': ID.branch('banasree') }],
    // TODO(client): confirm every one of these profiles is actually controlled by
    // RH Dental Care before re-enabling. Claiming a handle you do not own in
    // sameAs misidentifies the entity to Google. Left empty deliberately.
    // sameAs: [],
  });
}

export function websiteSchema(): Json {
  return {
    '@type': 'WebSite',
    '@id': ID.website,
    url: BASE_URL,
    name: 'RH Dental Care',
    publisher: { '@id': ID.organization },
    inLanguage: 'en-BD',
  };
}

/* ── Doctors ─────────────────────────────────────────────────────────────── */
export interface PhysicianInput {
  slug: string;
  name: string;
  jobTitle: string;
  description: string;
  image?: string;
  /** Only real, client-confirmed credentials. Omit rather than guess. */
  credentials?: string[];
  knowsAbout?: string[];
  worksAt?: BranchId[];
}

export function physicianSchema(p: PhysicianInput): Json {
  return compact({
    '@type': 'Physician',
    '@id': ID.physician(p.slug),
    name: p.name,
    honorificPrefix: 'Dr.',
    jobTitle: p.jobTitle,
    description: p.description,
    url: `${BASE_URL}/${p.slug}`,
    image: p.image ? `${BASE_URL}${p.image}` : undefined,
    medicalSpecialty: 'Dentistry',
    worksFor: { '@id': ID.organization },
    availableAtOrFrom: (p.worksAt ?? ['banani', 'banasree']).map((b) => ({
      '@id': ID.branch(b),
    })),
    hasCredential: p.credentials?.length
      ? p.credentials.map((c) => ({
          '@type': 'EducationalOccupationalCredential',
          credentialCategory: c,
        }))
      : undefined,
    knowsAbout: p.knowsAbout,
  });
}

/* ── FAQ. Emitted only on the page whose visible content answers it. ─────── */
export interface FaqItem {
  q: string;
  a: string;
}

export function faqSchema(items: FaqItem[]): Json {
  return {
    '@type': 'FAQPage',
    mainEntity: items.map((i) => ({
      '@type': 'Question',
      name: i.q,
      acceptedAnswer: { '@type': 'Answer', text: i.a },
    })),
  };
}

export function breadcrumbSchema(trail: { name: string; path: string }[]): Json {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((t, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: t.name,
      item: `${BASE_URL}${t.path}`,
    })),
  };
}

export function medicalProcedureSchema(input: {
  name: string;
  description: string;
  path: string;
  bodyLocation?: string;
  howPerformed?: string;
}): Json {
  return compact({
    '@type': 'MedicalProcedure',
    '@id': `${BASE_URL}${input.path}#procedure`,
    name: input.name,
    description: input.description,
    url: `${BASE_URL}${input.path}`,
    bodyLocation: input.bodyLocation,
    howPerformed: input.howPerformed,
    procedureType: { '@type': 'MedicalProcedureType', name: 'Noninvasive procedure' },
    provider: { '@id': ID.organization },
  });
}

/* ── Graph assembly ──────────────────────────────────────────────────────── */
export function buildGraph(nodes: Json[]) {
  return {
    '@context': 'https://schema.org',
    '@graph': nodes,
  };
}

/** The site-wide base: organization + website + both clinics.
 *  Rendered once, in the root layout. */
export function siteGraph(): Json[] {
  return [
    organizationSchema(),
    websiteSchema(),
    branchSchema('banani'),
    branchSchema('banasree'),
  ];
}
