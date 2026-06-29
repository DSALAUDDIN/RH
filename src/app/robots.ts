import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/private/', '/api/', '/_next/'],
      },
    ],
    sitemap: 'https://www.rhdentalcare.com/sitemap.xml',
    host: 'https://www.rhdentalcare.com',
  };
}