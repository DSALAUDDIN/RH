import type { Metadata } from 'next';

const BASE_URL = 'https://www.rhdentalcare.com';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
    { '@type': 'ListItem', position: 2, name: 'About Us', item: `${BASE_URL}/about` },
  ],
};

export const metadata: Metadata = {
  title: 'About Us | Dr. B.M. Rafiqul Hasan — RH Dental Care Dhaka',
  description:
    'Meet Dr. B.M. Rafiqul Hasan (Mehedi), BMDC Reg. 5169 — Chief Consultant at RH Dental Care, Dhaka\'s #1 dental clinic. BDS, MPH, 12+ years experience, 13k+ patients.',
  keywords: [
    'Dr BM Rafiqul Hasan Mehedi dentist Dhaka',
    'best oral surgeon Dhaka Bangladesh',
    'RH Dental Care about us',
    'dental clinic team Dhaka',
    'BMDC certified dentist Bangladesh',
    'Dr Shimia Binte Taher dentist',
    'top dental specialists Dhaka',
    'dental clinic history Bangladesh',
  ],
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About RH Dental Care | #1 Dental Clinic in Dhaka',
    description:
      'Meet the specialist team at RH Dental Care, Dhaka. Led by Dr. B.M. Rafiqul Hasan (Mehedi), BMDC Reg. 5169 — 12+ years, 13k+ happy patients.',
    url: `${BASE_URL}/about`,
    images: [{ url: '/rhlogo.jpeg', width: 1200, height: 630, alt: 'RH Dental Care team — Dhaka' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About RH Dental Care | Dr. B.M. Rafiqul Hasan — Dhaka',
    description: 'BMDC-certified Chief Consultant with 12+ years experience. Dhaka\'s most trusted dental clinic.',
    images: ['/rhlogo.jpeg'],
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />
      {children}
    </>
  );
}