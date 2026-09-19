import type { Metadata } from 'next';
import { SITE, absoluteUrl } from '@/config/site';

/** Approximate SERP truncation limits. Enforced by `npm run seo:audit`. */
export const TITLE_MAX = 60;
export const DESC_MAX = 155;

export interface PageMetaInput {
  /** Page title without the brand suffix (the root template appends it). */
  title: string;
  /** Use `title` verbatim, bypassing the template (used by the home page). */
  absoluteTitle?: boolean;
  /** Meta description, ideally 120-155 characters. */
  description: string;
  /** Site-relative canonical path, e.g. '/banani'. */
  path: string;
  /** Site-relative Open Graph image path. Falls back to the site default. */
  image?: string;
  imageAlt?: string;
  imageWidth?: number;
  imageHeight?: number;
  /** Exclude from the index while still letting crawlers follow links. */
  noindex?: boolean;
  /** Canonical override for pages that consolidate into another URL. */
  canonical?: string;
  type?: 'website' | 'article' | 'profile';
  /** ISO 8601 dates, used for `type: 'article'`. */
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  section?: string;
  tags?: string[];
}

/**
 * Builds route metadata. Every route calls this so canonical, hreflang,
 * Open Graph and Twitter tags stay consistent. Canonicals are always set
 * explicitly per route and never inherited from a layout.
 */
export function pageMeta(input: PageMetaInput): Metadata {
  const {
    title,
    description,
    path,
    image,
    imageAlt,
    imageWidth,
    imageHeight,
    noindex = false,
    canonical = path,
    type = 'website',
  } = input;

  if (process.env.NODE_ENV !== 'production') {
    if (title.length > TITLE_MAX) {
      console.warn(`[seo] title over ${TITLE_MAX} chars on ${path}: "${title}"`);
    }
    if (description.length > DESC_MAX) {
      console.warn(`[seo] description over ${DESC_MAX} chars on ${path}`);
    }
  }

  const url = absoluteUrl(canonical);
  const ogImage = image
    ? { url: image, width: imageWidth ?? 1200, height: imageHeight ?? 630, alt: imageAlt ?? title }
    : {
        url: SITE.defaultOgImage.path,
        width: SITE.defaultOgImage.width,
        height: SITE.defaultOgImage.height,
        alt: SITE.defaultOgImage.alt,
      };

  const openGraph: Metadata['openGraph'] =
    type === 'article'
      ? {
          type: 'article',
          url,
          siteName: SITE.name,
          title,
          description,
          locale: SITE.locale,
          images: [ogImage],
          publishedTime: input.publishedTime,
          modifiedTime: input.modifiedTime,
          authors: input.authors,
          section: input.section,
          tags: input.tags,
        }
      : {
          type: type === 'profile' ? 'profile' : 'website',
          url,
          siteName: SITE.name,
          title,
          description,
          locale: SITE.locale,
          images: [ogImage],
        };

  return {
    title: input.absoluteTitle ? { absolute: title } : title,
    description,
    alternates: {
      canonical,
      languages: { [SITE.language]: canonical, 'x-default': canonical },
    },
    openGraph,
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage.url],
    },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  };
}
