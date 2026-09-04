import { MetadataRoute } from 'next';
import { blogPosts } from '@/lib/blogData';
import { ROUTES, SPECIALTY_SLUGS } from '@/lib/routes';
import { BASE_URL } from '@/lib/metadata';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = ROUTES.map((r) => ({
    url: `${BASE_URL}${r.path === '/' ? '' : r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));

  const specialtyRoutes: MetadataRoute.Sitemap = SPECIALTY_SLUGS.map((slug) => ({
    url: `${BASE_URL}/specialties/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const blogRoutes: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...specialtyRoutes, ...blogRoutes];
}
