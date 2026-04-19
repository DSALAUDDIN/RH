import type { Metadata } from 'next';
import { Inter, Plus_Jakarta_Sans, Outfit } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

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

const BASE_URL = 'https://rhdentalcare.com';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),

  /* ── Titles ── */
  title: {
    default: 'RH Dental Care | Best Dental Clinic in Dhaka, Bangladesh',
    template: '%s | RH Dental Care — Dhaka',
  },

  /* ── Description — primary ranking signal ── */
  description:
    'RH Dental Care is the #1 dental clinic in Dhaka, Bangladesh. Expert oral & dental surgery, dental implants, orthodontics, root canal, cosmetic dentistry & smile design by BMDC-certified specialist Dr. B.M. Rafiqul Hasan (Mehedi). 13k+ happy patients. Book a free consultation today.',

  /* ── Exhaustive keyword set ── */
  keywords: [
    // Brand
    'RH Dental Care',
    'RH Dental Care Dhaka',
    'RH Dental Clinic Bangladesh',
    'Dr Rafiqul Hasan Mehedi',
    'Dr BM Rafiqul Hasan dentist',
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
    'geo.region': 'BD-13',        // Dhaka Division
    'geo.placename': 'Dhaka, Bangladesh',
    'geo.position': '23.8103;90.4125',
    'ICBM': '23.8103, 90.4125',
    'language': 'en',
    'revisit-after': '7 days',
    'rating': 'general',
    'HandheldFriendly': 'True',
    'MobileOptimized': '320',
  },
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
        streetAddress: 'Dhaka',
        addressLocality: 'Dhaka',
        addressRegion: 'Dhaka Division',
        postalCode: '1000',
        addressCountry: 'BD',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 23.8103,
        longitude: 90.4125,
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
      sameAs: [
        'https://www.facebook.com/rhdentalcare',
        'https://www.instagram.com/rhdentalcare',
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

    /* FAQ — rich results */
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Where is RH Dental Care located?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'RH Dental Care is located in Dhaka, Bangladesh. Please visit our contact page or call us for the exact address and directions.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is RH Dental Care the best dental clinic in Dhaka?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'RH Dental Care is consistently rated as one of the top dental clinics in Dhaka, Bangladesh, with 13k+ happy patients, a 99% success rate, and a team of BMDC-certified specialists.',
          },
        },
        {
          '@type': 'Question',
          name: 'What dental treatments are available at RH Dental Care?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'We offer dental implants, orthodontics (braces & clear aligners), root canal treatment, cosmetic/smile design, teeth whitening, veneers, gum care, pediatric dentistry, full-mouth rehabilitation, and more.',
          },
        },
        {
          '@type': 'Question',
          name: 'How do I book an appointment at RH Dental Care?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'You can book an appointment by visiting our Contact page at rhdentalcare.com/contact or calling us directly. We offer free initial consultations.',
          },
        },
        {
          '@type': 'Question',
          name: 'Does RH Dental Care offer painless dental treatment?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. RH Dental Care guarantees pain-free treatment using the latest anaesthetic techniques and sedation protocols. We are known for our gentle, patient-friendly approach.',
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
        <main className="main-content">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
