import { MetadataRoute } from 'next';
import { blogPosts } from '@/lib/blogData';

const BASE_URL = 'https://www.rhdentalcare.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  /* ── Static high-priority pages ── */
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL,                          lastModified: now, changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${BASE_URL}/about`,               lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/team`,                lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/implants`,            lastModified: now, changeFrequency: 'weekly',  priority: 0.95 },
    { url: `${BASE_URL}/orthodontics`,        lastModified: now, changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${BASE_URL}/root-canal`,          lastModified: now, changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${BASE_URL}/services`,            lastModified: now, changeFrequency: 'weekly',  priority: 0.85 },
    { url: `${BASE_URL}/specialties`,         lastModified: now, changeFrequency: 'weekly',  priority: 0.85 },
    { url: `${BASE_URL}/treatments`,          lastModified: now, changeFrequency: 'weekly',  priority: 0.85 },
    { url: `${BASE_URL}/contact`,             lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/reviews`,             lastModified: now, changeFrequency: 'weekly',  priority: 0.75 },
    { url: `${BASE_URL}/blog`,                lastModified: now, changeFrequency: 'daily',   priority: 0.8 },
  ];

  /* ── Specialty detail pages ── */
  const specialtySlugs = [
    '3d-imaging',
    'braces',
    'zirconia',
    'root-canal',
    'gum-care',
    'kids-care',
    'implants',
    'aesthetics',
  ];
  const specialtyRoutes: MetadataRoute.Sitemap = specialtySlugs.map((slug) => ({
    url: `${BASE_URL}/specialties/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  /* ── Blog post pages ── */
  const blogRoutes: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...specialtyRoutes, ...blogRoutes];
}