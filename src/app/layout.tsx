import type { Metadata, Viewport } from 'next';
import { Bricolage_Grotesque, Geist, Hind_Siliguri, Inter } from 'next/font/google';
import { cookies } from 'next/headers';
import './tokens.css';
import './globals.css';
import GoogleAnalytics from '@/components/analytics/GoogleAnalytics';
import LayoutWrapper from '@/components/LayoutWrapper';
import { BranchProvider } from '@/components/branch/BranchProvider';
import BranchPickerSheet from '@/components/branch/BranchPickerSheet';
import JsonLd from '@/components/seo/JsonLd';
import { SITE } from '@/config/site';
import { BRANCH_COOKIE } from '@/lib/branch-cookie';
import { isBranchId } from '@/lib/branches';

const displayFont = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const bodyFont = Geist({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

const uiFont = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const bengaliFont = Hind_Siliguri({
  subsets: ['bengali', 'latin'],
  weight: ['400', '500', '600'],
  variable: '--font-bn',
  display: 'swap',
});

/**
 * Site-wide defaults. Canonical URLs and hreflang are intentionally not set
 * here: they would be inherited by every route. Each route sets its own via
 * pageMeta().
 */
export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name}: Dental Clinics in Banani & Banasree, Dhaka`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  publisher: SITE.name,
  category: 'Health & Medical',
  formatDetection: { telephone: false, email: false, address: false },
  openGraph: {
    type: 'website',
    locale: SITE.locale,
    url: SITE.url,
    siteName: SITE.name,
    title: `${SITE.name}: Banani & Banasree, Dhaka`,
    description: SITE.description,
    images: [
      {
        url: SITE.defaultOgImage.path,
        width: SITE.defaultOgImage.width,
        height: SITE.defaultOgImage.height,
        alt: SITE.defaultOgImage.alt,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE.name}: Banani & Banasree, Dhaka`,
    description: SITE.description,
    images: [SITE.defaultOgImage.path],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [{ url: SITE.logo.path, type: 'image/jpeg' }],
    apple: SITE.logo.path,
    shortcut: SITE.logo.path,
  },
  other: {
    'geo.region': SITE.geo.region,
    'geo.placename': SITE.geo.placename,
  },
  verification: { google: SITE.verification.google },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: SITE.themeColor.light },
    { media: '(prefers-color-scheme: dark)', color: SITE.themeColor.dark },
  ],
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  // Branch precedence: route > ?branch= > cookie > none. Reading the cookie on
  // the server avoids a branch-accent flash on hydration, at the cost of
  // rendering routes dynamically.
  const cookieStore = await cookies();
  const storedBranch = cookieStore.get(BRANCH_COOKIE)?.value;
  const initialBranch = isBranchId(storedBranch) ? storedBranch : null;

  return (
    <html
      lang={SITE.language}
      className={`${displayFont.variable} ${bodyFont.variable} ${uiFont.variable} ${bengaliFont.variable}`}
      data-branch={initialBranch ?? undefined}
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://res.cloudinary.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <JsonLd site />
      </head>

      <body suppressHydrationWarning>
        <GoogleAnalytics measurementId={SITE.analytics.ga4} />

        <a href="#main" className="rh-skip-link">
          Skip to content
        </a>

        <BranchProvider initialBranch={initialBranch}>
          <LayoutWrapper>{children}</LayoutWrapper>
          <BranchPickerSheet />
        </BranchProvider>
      </body>
    </html>
  );
}
