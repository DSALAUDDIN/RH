// src/lib/metadata.ts
//
// Every route builds its metadata through pageMeta(). The canonical is a
// REQUIRED argument, so a route cannot be shipped without one.
//
// Why this exists: the root layout used to set `alternates: { canonical: '/' }`,
// which the App Router inherits down to any route that does not declare its own.
// Twelve routes — including /banani, /banasree and both doctor pages — were
// therefore telling Google "I am a duplicate of the homepage, index that
// instead". See docs/audit-report.md P0-1. Inheritance is never used for
// canonicals again.

import type { Metadata } from 'next';

export const BASE_URL = 'https://www.rhdentalcare.com';

/** Google truncates around these. Enforced by scripts/seo-audit.mjs. */
export const TITLE_MAX = 60;
export const DESC_MAX = 155;

export interface PageMetaInput {
  /** Under 60 characters, excluding the " | RH Dental Care" the template adds. */
  title: string;
  /** Under 155 characters. Specific, not a slogan. */
  description: string;
  /** Absolute path, e.g. '/banani'. Required. */
  path: string;
  /** Absolute path to an OG image, e.g. '/assets/branches/banani/reception.webp'. */
  image?: string;
  imageAlt?: string;
  /** Set true only for pages that genuinely should not be indexed. */
  noindex?: boolean;
  type?: 'website' | 'article';
}

export function pageMeta({
  title,
  description,
  path,
  image,
  imageAlt,
  noindex = false,
  type = 'website',
}: PageMetaInput): Metadata {
  const url = `${BASE_URL}${path === '/' ? '' : path}`;
  const images = image
    ? [{ url: image, width: 1200, height: 630, alt: imageAlt ?? title }]
    : undefined;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      url,
      siteName: 'RH Dental Care',
      title,
      description,
      locale: 'en_BD',
      images,
    },
    twitter: {
      card: images ? 'summary_large_image' : 'summary',
      title,
      description,
      images: image ? [image] : undefined,
    },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  };
}
