import { MetadataRoute } from 'next';
import { blogPosts } from '@/lib/blogData';
import { ROUTES, SPECIALTY_SLUGS } from '@/lib/routes';
import { BASE_URL } from '@/lib/metadata';
import { ROSTER, clinicianPath } from '@/lib/doctors';

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

  const doctorRoutes: MetadataRoute.Sitemap = ROSTER.map((d) => ({
    url: `${BASE_URL}${clinicianPath(d)}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...staticRoutes, ...specialtyRoutes, ...blogRoutes, ...doctorRoutes];
}
