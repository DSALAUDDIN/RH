import { MetadataRoute } from 'next';
import { blogPosts } from '@/lib/blogData';
import { ROUTES, SPECIALTY_SLUGS } from '@/lib/seo/routes';
import { SITE } from '@/config/site';
import { ROSTER, clinicianPath } from '@/lib/doctors';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = ROUTES.map((r) => ({
    url: `${SITE.url}${r.path === '/' ? '' : r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));

  const specialtyRoutes: MetadataRoute.Sitemap = SPECIALTY_SLUGS.map((slug) => ({
    url: `${SITE.url}/specialties/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const blogRoutes: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${SITE.url}/blog/${post.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  const doctorRoutes: MetadataRoute.Sitemap = ROSTER.map((d) => ({
    url: `${SITE.url}${clinicianPath(d)}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...staticRoutes, ...specialtyRoutes, ...blogRoutes, ...doctorRoutes];
}
