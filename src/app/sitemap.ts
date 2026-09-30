import { MetadataRoute } from 'next';
import { blogPosts } from '@/lib/blogData';
import { ROUTES, SPECIALTY_SLUGS, SPECIALTY_CANONICAL } from '@/lib/seo/routes';
import { SITE } from '@/config/site';
import { ROSTER, clinicianPath } from '@/lib/doctors';
import { getLiveAuthorityGuides } from '@/data/authorityContent';
import { getLiveBanglaAuthorityGuides } from '@/data/banglaAuthorityContent';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = ROUTES.map((r) => ({
    url: `${SITE.url}${r.path === '/' ? '' : r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));

  // Only include specialty pages that are self-canonical (not mapped in SPECIALTY_CANONICAL)
  const indexableSpecialtySlugs = SPECIALTY_SLUGS.filter(
    (slug) => !SPECIALTY_CANONICAL[slug],
  );

  const specialtyRoutes: MetadataRoute.Sitemap = indexableSpecialtySlugs.map((slug) => ({
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

  // Authority content guides: only 'live' approved guides enter sitemap
  const liveGuideRoutes: MetadataRoute.Sitemap = getLiveAuthorityGuides().map((g) => ({
    url: `${SITE.url}/guides/${g.slug}`,
    lastModified: new Date(g.updatedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // Bangla authority content guides: only 'live' approved guides enter sitemap
  const liveBanglaGuideRoutes: MetadataRoute.Sitemap = getLiveBanglaAuthorityGuides().map((g) => ({
    url: `${SITE.url}/bn/guides/${g.slug}`,
    lastModified: new Date(g.updatedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [
    ...staticRoutes,
    ...specialtyRoutes,
    ...blogRoutes,
    ...doctorRoutes,
    ...liveGuideRoutes,
    ...liveBanglaGuideRoutes,
  ];
}
