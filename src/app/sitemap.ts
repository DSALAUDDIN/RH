import type { MetadataRoute } from 'next';
import { absoluteUrl } from '@/config/site';
import { blogPosts } from '@/lib/blogData';
import { CONTENT_UPDATED, ROUTES, SPECIALTY_CANONICAL, SPECIALTY_SLUGS } from '@/lib/seo/routes';

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = ROUTES.map((route) => ({
    url: absoluteUrl(route.path),
    lastModified: route.lastModified ?? CONTENT_UPDATED,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const specialties: MetadataRoute.Sitemap = SPECIALTY_SLUGS.filter(
    (slug) => !SPECIALTY_CANONICAL[slug],
  ).map((slug) => ({
    url: absoluteUrl(`/specialties/${slug}`),
    lastModified: CONTENT_UPDATED,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const articles: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: absoluteUrl(`/blog/${post.slug}`),
    lastModified: post.updatedAt ?? post.publishedAt ?? CONTENT_UPDATED,
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [...pages, ...specialties, ...articles];
}
