import type { Metadata, Viewport } from 'next';
import { Newsreader, Karla, Hind_Siliguri } from 'next/font/google';
import Script from 'next/script';
import { cookies } from 'next/headers';
import './tokens.css';
import './globals.css';
import LayoutWrapper from '@/components/LayoutWrapper';
import { BranchProvider } from '@/components/branch/BranchProvider';
import BranchPickerSheet from '@/components/branch/BranchPickerSheet';
import JsonLd from '@/components/JsonLd';
import { BRANCH_COOKIE } from '@/lib/branch-cookie';
import { isBranchId } from '@/lib/branches';
import { BASE_URL } from '@/lib/metadata';

/* ── Type ──────────────────────────────────────────────────────────────────
   Newsreader for display: a warm, low-contrast serif that matches the panelled
   walls in the branch photographs. Karla for body. Hind Siliguri for Bengali —
   the schema declares আরএইচ ডেন্টাল কেয়ার as an alternate name, and until now no
   Bengali face was loaded at all.                                          */
const newsreader = Newsreader({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
});

const karla = Karla({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap',
});

const hindSiliguri = Hind_Siliguri({
  subsets: ['bengali', 'latin'],
  weight: ['400', '500', '600'],
  variable: '--font-bn',
  display: 'swap',
});

/* ── Root metadata ─────────────────────────────────────────────────────────
   NOTE: no `alternates` here on purpose. Setting a canonical on the root layout
   makes every route that does not declare its own inherit it, which is what put
   twelve pages — /banani and /banasree among them — behind a canonical pointing
   at the homepage. Each route sets its own via pageMeta().
   NOTE: no `keywords` here on purpose either. Google has ignored the meta
   keywords tag since 2009, and it was the last machine-readable place the
   superlative claims survived.                                   */
export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),

  title: {
    default: 'RH Dental Care — Dental Clinics in Banani & Banasree, Dhaka',
    template: '%s | RH Dental Care',
  },

  description:
    'Two dental clinics in Dhaka: an appointment-only private suite in Banani and a full-service flagship hospital in Banasree. Same clinicians at both.',

  applicationName: 'RH Dental Care',
  authors: [{ name: 'RH Dental Care', url: BASE_URL }],
  creator: 'RH Dental Care',
  publisher: 'RH Dental Care',
  category: 'Health & Medical',

  openGraph: {
    type: 'website',
    locale: 'en_BD',
    url: BASE_URL,
    siteName: 'RH Dental Care',
    title: 'RH Dental Care — Banani & Banasree, Dhaka',
    description:
      'An appointment-only private suite in Banani and a full-service flagship hospital in Banasree. Same doctors, same materials, same sterilisation protocol.',
    images: [
      {
        url: '/assets/branches/banani/reception.webp',
        width: 1200,
        height: 630,
        alt: 'Reception at RH Dental Care Banani: pale oak, cream seating and panelled sage-green walls lit from behind.',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'RH Dental Care — Banani & Banasree, Dhaka',
    description:
      'An appointment-only private suite in Banani and a full-service flagship hospital in Banasree.',
    images: ['/assets/branches/banani/reception.webp'],
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
    icon: [{ url: '/rhlogo.jpeg', type: 'image/jpeg' }],
    apple: '/rhlogo.jpeg',
    shortcut: '/rhlogo.jpeg',
  },

  other: {
    'geo.region': 'BD-13',
    'geo.placename': 'Dhaka, Bangladesh',
  },

  verification: { google: '45b388b56fe88bf2' },
  manifest: '/manifest.json',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F7F5EE' },
    { media: '(prefers-color-scheme: dark)', color: '#2B2A1C' },
  ],
};

const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? 'G-XZPKR17DNF';

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  /* Branch precedence is route > ?branch= > cookie > null.
     The cookie is read here, server-side, so pricing, metadata and JSON-LD
     render correctly with no hydration flash. This is what makes every route
     dynamically rendered — see docs/audit-report.md P1-3 for the trade-off. */
  const cookieStore = await cookies();
  const rawBranch = cookieStore.get(BRANCH_COOKIE)?.value;
  const initialBranch = isBranchId(rawBranch) ? rawBranch : null;

  return (
    <html
      lang="en"
      className={`${newsreader.variable} ${karla.variable} ${hindSiliguri.variable}`}
      data-branch={initialBranch || undefined}
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="preconnect" href="https://res.cloudinary.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />

        {/* Site-wide entities only: Organization, WebSite, and the two clinics as
            separately-@id'd Dentist nodes. FAQPage is NOT emitted here — it now
            renders on the page whose visible content answers the questions. */}
        <JsonLd site />

        <link rel="alternate" hrefLang="en-BD" href={BASE_URL} />
        <link rel="alternate" hrefLang="x-default" href={BASE_URL} />
      </head>

      <body suppressHydrationWarning>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}');
          `}
        </Script>

        <a href="#main" className="rh-skip-link">Skip to content</a>

        <BranchProvider initialBranch={initialBranch}>
          <LayoutWrapper>{children}</LayoutWrapper>
          <BranchPickerSheet />
        </BranchProvider>
      </body>
    </html>
  );
}
