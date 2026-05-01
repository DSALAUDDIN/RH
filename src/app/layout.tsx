import type { Metadata, Viewport } from 'next';
import { Inter, Plus_Jakarta_Sans, Outfit } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AudioPlayer from '@/components/AudioPlayer';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-jakarta',
});

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-outfit',
});

const BASE_URL = 'https://www.rhdentalcare.com';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),

  /* ── Titles ── */
  title: {
    default: 'RH Dental Care | Best Dental Clinic in Dhaka, Bangladesh',
    template: '%s | RH Dental Care — Dhaka',
  },

  /* ── Description — primary ranking signal ── */
  description:
    'RH Dental Care is the #1 dental clinic in Dhaka, Bangladesh. Expert oral & dental surgery, dental implants, orthodontics, root canal, cosmetic dentistry & smile design by BMDC-certified specialist Dr. B. M. Rafiqul Hasan Mehedi. 13k+ happy patients. Book a free consultation today.',

  /* ── Exhaustive keyword set ── */
  keywords: [
    // Brand
    'RH Dental Care',
    'RH Dental Care Dhaka',
    'RH Dental Clinic Bangladesh',
    'Dr. B. M. Rafiqul Hasan Mehedi',
    'Dr. B. M. Rafiqul Hasan Mehedi dentist',
    // Local intent — Dhaka
    'best dental clinic in Dhaka',
    'top dental clinic Dhaka Bangladesh',
    'dental clinic near me Dhaka',
    'dental hospital Dhaka',
    'dentist in Dhaka',
    'oral surgeon Dhaka',
    'dental clinic Bangladesh',
    'best dental clinic in Banasree',
    'dental clinic Rampura',
    // Treatments
    'dental implants Dhaka',
    'dental implant Bangladesh',
    'orthodontics Dhaka',
    'braces Dhaka',
    'clear aligner Dhaka',
    'root canal treatment Dhaka',
    'painless root canal Dhaka',
    'teeth whitening Dhaka',
    'smile design Dhaka',
    'veneers Dhaka',
    'zirconia crown Dhaka',
    'gum treatment Dhaka',
    'kids dentist Dhaka',
    'pediatric dentist Dhaka',
    'wisdom tooth removal Dhaka',
    'full mouth rehabilitation Dhaka',
    'cosmetic dentistry Bangladesh',
    'laser dentistry Dhaka',
    // Long-tail global
    'best dental clinic in Bangladesh',
    'top dentist Bangladesh',
    'affordable dental implants Bangladesh',
    'international standard dental clinic Dhaka',
    'BMDC certified dentist Dhaka',
    'medical tourism dental Bangladesh',
  ],

  /* ── Canonical ── */
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/',
      'en-BD': '/',
    },
  },

  /* ── Authors ── */
  authors: [
    { name: 'Dr. B.M. Rafiqul Hasan (Mehedi)', url: BASE_URL },
    { name: 'RH Dental Care', url: BASE_URL },
  ],
  creator: 'RH Dental Care',
  publisher: 'RH Dental Care',
  category: 'Health & Medical',

  /* ── Open Graph ── */
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: BASE_URL,
    siteName: 'RH Dental Care',
    title: 'RH Dental Care | #1 Dental Clinic in Dhaka, Bangladesh',
    description:
      'Visit RH Dental Care — Dhaka\'s most trusted dental clinic. Advanced implants, orthodontics, smile design & painless root canal by BMDC-certified specialists. Book free consultation now.',
    images: [
      {
        url: '/rhlogo.jpeg',
        width: 1200,
        height: 630,
        alt: 'RH Dental Care — Best Dental Clinic in Dhaka, Bangladesh',
        type: 'image/jpeg',
      },
    ],
  },

  /* ── Twitter / X card ── */
  twitter: {
    card: 'summary_large_image',
    site: '@rhdentalcare',
    creator: '@rhdentalcare',
    title: 'RH Dental Care | Best Dental Clinic Dhaka Bangladesh',
    description:
      'The #1 dental clinic in Dhaka. Expert implants, orthodontics, smile design & cosmetic dentistry by Dr. B.M. Rafiqul Hasan.',
    images: ['/rhlogo.jpeg'],
  },

  /* ── Robots ── */
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  /* ── Icons ── */
  icons: {
    icon: [
      { url: '/rhlogo.jpeg', type: 'image/jpeg' },
    ],
    apple: '/rhlogo.jpeg',
    shortcut: '/rhlogo.jpeg',
  },

  /* ── Geographic targeting ── */
  other: {
    'geo.region': 'BD-13',
    'geo.placename': 'Dhaka, Bangladesh',
    'geo.position': '23.7634;90.4321',
    'ICBM': '23.7634, 90.4321',
    'language': 'en',
    'revisit-after': '7 days',
    'rating': 'general',
    'HandheldFriendly': 'True',
    'MobileOptimized': '320',
  },

  /* ── Verification ── */
  verification: {
    google: '45b388b56fe88bf2',
  },

  /* ── Manifest ── */
  manifest: '/manifest.json',
};

/* ── Viewport (separate export as required by Next.js 14+) ── */
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#0ea5e9' },
    { media: '(prefers-color-scheme: dark)', color: '#0284c7' },
  ],
};

/* ── JSON-LD Structured Data ── */
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    /* Dental Clinic (LocalBusiness) */
    {
      '@type': ['Dentist', 'LocalBusiness', 'MedicalOrganization'],
      '@id': `${BASE_URL}/#dentist`,
      name: 'RH Dental Care',
      alternateName: ['RH Dental', 'RH Dental Clinic', 'আরএইচ ডেন্টাল কেয়ার'],
      description:
        'RH Dental Care is Dhaka\'s premier dental clinic offering advanced oral surgery, implants, orthodontics, cosmetic dentistry and full-mouth rehabilitation under BMDC-certified specialists.',
      url: BASE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/rhlogo.jpeg`,
        width: 200,
        height: 200,
      },
      image: `${BASE_URL}/rhlogo.jpeg`,
      telephone: '+8801775227902',
      email: 'info@rhdentalcare.com',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'House: 42, Road: 8, Block: C, Banasree, Rampura',
        addressLocality: 'Dhaka',
        addressRegion: 'Dhaka Division',
        postalCode: '1219',
        addressCountry: 'BD',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 23.7634,
        longitude: 90.4321,
      },
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
          opens: '09:00',
          closes: '21:00',
        },
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Friday'],
          opens: '14:00',
          closes: '21:00',
        },
      ],
      priceRange: '৳৳',
      currenciesAccepted: 'BDT',
      paymentAccepted: 'Cash, Card',
      hasMap: 'https://maps.google.com/?q=RH+Dental+Care+Dhaka',
      numberOfEmployees: { '@type': 'QuantitativeValue', value: 15 },
      foundingDate: '2015',
      areaServed: [
        { '@type': 'City', name: 'Dhaka' },
        { '@type': 'Country', name: 'Bangladesh' },
      ],
      sameAs: [
        'https://www.facebook.com/rhdentalcare',
        'https://www.instagram.com/rhdentalcare',
        'https://www.linkedin.com/company/rhdentalcare',
        'https://www.youtube.com/@rhdentalcare',
        'https://g.page/rhdentalcare',
      ],
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '5.0',
        reviewCount: '200',
        bestRating: '5',
        worstRating: '1',
      },
      medicalSpecialty: [
        'Oral Surgery',
        'Implantology',
        'Orthodontics',
        'Cosmetic Dentistry',
        'Endodontics',
        'Periodontics',
        'Pediatric Dentistry',
        'Prosthodontics',
      ],
    },

    /* Website */
    {
      '@type': 'WebSite',
      '@id': `${BASE_URL}/#website`,
      url: BASE_URL,
      name: 'RH Dental Care',
      description: 'Best dental clinic in Dhaka, Bangladesh',
      publisher: { '@id': `${BASE_URL}/#dentist` },
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${BASE_URL}/blog?q={search_term_string}`,
        },
        'query-input': 'required name=search_term_string',
      },
      inLanguage: 'en-US',
    },

    /* Primary Doctor — Person */
    {
      '@type': 'Physician',
      '@id': `${BASE_URL}/#dr-hasan`,
      name: 'Dr. B.M. Rafiqul Hasan (Mehedi)',
      honorificPrefix: 'Dr.',
      jobTitle: 'Chief Consultant Oral & Dental Surgeon',
      description:
        'BMDC-registered (Reg. 5169) Chief Consultant & Founder of RH Dental Care. BDS from Sapporo Dental College, MPH from City University. Over 12+ years of clinical experience in implantology, cosmetic dentistry and full-mouth rehabilitation.',
      worksFor: { '@id': `${BASE_URL}/#dentist` },
      url: `${BASE_URL}/about`,
      image: `${BASE_URL}/rhlogo.jpeg`,
      hasCredential: [
        { '@type': 'EducationalOccupationalCredential', credentialCategory: 'BDS — Sapporo Dental College' },
        { '@type': 'EducationalOccupationalCredential', credentialCategory: 'MPH — City University' },
        { '@type': 'EducationalOccupationalCredential', credentialCategory: 'BMDC Reg. 5169' },
      ],
      knowsAbout: ['Dental Implants', 'Orthodontics', 'Root Canal', 'Cosmetic Dentistry', 'Oral Surgery'],
    },

    /* FAQ — rich results (10 high-value questions for Google FAQ snippets) */
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Where is RH Dental Care located?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'RH Dental Care is located at House 42, Road 8, Block C, Banasree, Rampura, Dhaka 1219, Bangladesh. You can also visit www.rhdentalcare.com/contact for directions.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is RH Dental Care the best dental clinic in Dhaka?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'RH Dental Care is consistently rated as one of the top dental clinics in Dhaka, Bangladesh, with 13,000+ happy patients, a 5-star rating, and a team of BMDC-certified specialists led by Dr. B.M. Rafiqul Hasan.',
          },
        },
        {
          '@type': 'Question',
          name: 'What dental treatments are available at RH Dental Care?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'RH Dental Care offers dental implants (single, multiple, All-on-4/6), orthodontics (braces & clear aligners), painless root canal, cosmetic dentistry & smile design, teeth whitening, zirconia crowns, veneers, gum care, pediatric dentistry, and full-mouth rehabilitation.',
          },
        },
        {
          '@type': 'Question',
          name: 'How do I book an appointment at RH Dental Care?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'You can book a free consultation by visiting www.rhdentalcare.com/contact, calling +8801775227902, or messaging via WhatsApp. We are open Saturday to Thursday 9am–9pm and Friday 2pm–9pm.',
          },
        },
        {
          '@type': 'Question',
          name: 'Does RH Dental Care offer painless dental treatment?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. RH Dental Care uses the latest anaesthetic techniques, rotary endodontics, and sedation protocols to ensure a comfortable, pain-free experience for every patient.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is the cost of dental implants in Dhaka at RH Dental Care?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Dental implant prices at RH Dental Care start from approximately ৳70,000 for a single implant. Exact pricing depends on the case complexity. We offer free consultations to provide a personalized treatment plan.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is Dr. B.M. Rafiqul Hasan BMDC registered?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. Dr. B.M. Rafiqul Hasan (Mehedi) is a fully BMDC-registered Oral & Dental Surgeon with Registration No. 5169. He holds a BDS from Sapporo Dental College (DU) and an MPH from City University, with advanced international training in implantology from China, Korea, and India.',
          },
        },
        {
          '@type': 'Question',
          name: 'Does RH Dental Care accept international patients?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. RH Dental Care welcomes international and medical-tourism patients seeking affordable, high-quality dental treatment in Bangladesh. We offer digital workflows, pre-arrival treatment planning, and fast-track appointments.',
          },
        },
        {
          '@type': 'Question',
          name: 'What technology does RH Dental Care use?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'RH Dental Care is equipped with 3D CBCT imaging, digital smile design (DSD), computer-guided implant surgery, intraoral scanning, laser dentistry, microscope-guided root canal, and an in-house dental lab for same-day restorations.',
          },
        },
        {
          '@type': 'Question',
          name: 'How long does orthodontic treatment take at RH Dental Care?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Orthodontic treatment duration varies by case. Traditional braces typically take 18–36 months, while clear aligners can take 12–24 months for most cases. Our specialists create a personalized timeline during your free consultation.',
          },
        },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLdString = JSON.stringify(jsonLd).replace(/</g, '\\u003c');

  return (
    <html lang="en" className={`${inter.variable} ${jakarta.variable} ${outfit.variable}`} suppressHydrationWarning>
      <head>
        {/* Preconnect to external origins for faster resource loading */}
        <link rel="preconnect" href="https://res.cloudinary.com" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />

        {/* Google Analytics 4 */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XZPKR17DNF"
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XZPKR17DNF');
          `}
        </Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdString }}
        />
        {/* Language targeting */}
        <link rel="alternate" hrefLang="en" href={BASE_URL} />
        <link rel="alternate" hrefLang="x-default" href={BASE_URL} />
      </head>
      <body suppressHydrationWarning>
        <Navbar />
        <AudioPlayer />
        <main className="main-content">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
