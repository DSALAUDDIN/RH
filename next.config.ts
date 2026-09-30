import type { NextConfig } from 'next';
import { REDIRECTS } from './src/lib/seo/routes';

if (!process.env.DATABASE_URL) {
  process.env.DATABASE_URL = 'file:./dev.db';
}

const CANONICAL_HOST = 'rhdentalcare.com';

const contentSecurityPolicy = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://maps.googleapis.com",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "img-src 'self' data: blob: https://res.cloudinary.com https://images.unsplash.com https://plus.unsplash.com https://assets.rhdentalcare.com https://cdn.rhdentalcare.com https://*.rhdentalcare.com https://www.google-analytics.com https://maps.googleapis.com https://maps.gstatic.com https://*.ggpht.com",
  "font-src 'self' https://fonts.gstatic.com",
  "connect-src 'self' https://www.google-analytics.com https://*.google-analytics.com https://www.googletagmanager.com https://res.cloudinary.com https://maps.googleapis.com",
  "media-src 'self' https://res.cloudinary.com https://assets.rhdentalcare.com https://cdn.rhdentalcare.com https://*.rhdentalcare.com",
  'frame-src https://www.google.com https://maps.google.com',
  "frame-ancestors 'self'",
].join('; ');

const securityHeaders = [
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  { key: 'Content-Security-Policy', value: contentSecurityPolicy },
];

const nextConfig: NextConfig = {
  env: {
    DATABASE_URL: process.env.DATABASE_URL || 'file:./dev.db',
  },
  poweredByHeader: false,
  trailingSlash: false,
  images: {
    qualities: [75, 90],
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com', pathname: '/**' },
      { protocol: 'https', hostname: 'plus.unsplash.com', pathname: '/**' },
      { protocol: 'https', hostname: 'res.cloudinary.com', pathname: '/**' },
      { protocol: 'https', hostname: 'assets.rhdentalcare.com', pathname: '/**' },
      { protocol: 'https', hostname: 'cdn.rhdentalcare.com', pathname: '/**' },
    ],
  },
  async redirects() {
    return [
      // Consolidate www host onto the primary apex domain.
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.rhdentalcare.com' }],
        destination: `https://${CANONICAL_HOST}/:path*`,
        permanent: true,
      },
      // Consolidate legacy .com.bd domain onto primary apex domain if DNS points here.
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'rhdentalcare.com.bd' }],
        destination: `https://${CANONICAL_HOST}/:path*`,
        permanent: true,
      },
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.rhdentalcare.com.bd' }],
        destination: `https://${CANONICAL_HOST}/:path*`,
        permanent: true,
      },
      ...REDIRECTS.map((r) => ({ ...r, permanent: true })),
    ];
  },
  async headers() {
    return [{ source: '/(.*)', headers: securityHeaders }];
  },
};

export default nextConfig;
