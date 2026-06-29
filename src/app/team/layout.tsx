import type { Metadata } from 'next';

const BASE_URL = 'https://www.rhdentalcare.com';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
    { '@type': 'ListItem', position: 2, name: 'Our Team', item: `${BASE_URL}/team` },
  ],
};

export const metadata: Metadata = {
  title: 'Our Dental Team in Dhaka — BMDC-Certified Specialists | RH Dental Care',
  description:
    'Meet the BMDC-certified dental team at RH Dental Care, Dhaka — led by Dr. B.M. Rafiqul Hasan. Specialists in implants, orthodontics, oral surgery & cosmetic dentistry. 13k+ patients.',
  keywords: [
    'dental team Dhaka',
    'BMDC certified dentist Dhaka',
    'Dr BM Rafiqul Hasan Mehedi',
    'Dr Shimia Binte Taher dentist',
    'oral surgeon Dhaka Bangladesh',
    'best dental specialists Dhaka',
    'dental implant doctor Dhaka',
    'orthodontist Dhaka',
    'endodontist Dhaka',
    'pediatric dentist Dhaka',
    'cosmetic dentist Dhaka',
    'RH Dental Care doctors',
    'best dentist in Bangladesh',
    'dental clinic team Dhaka',
  ],
  alternates: { canonical: '/team' },
  openGraph: {
    title: 'Meet Our Expert Dental Team | RH Dental Care Dhaka',
    description:
      'BMDC-certified specialists in implantology, orthodontics, endodontics, oral surgery & cosmetic dentistry at RH Dental Care, Dhaka.',
    url: `${BASE_URL}/team`,
    images: [{ url: '/rhlogo.jpeg', width: 1200, height: 630, alt: 'RH Dental Care Team — Dhaka' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Our Expert Dental Team | RH Dental Care Dhaka',
    description: 'Meet the BMDC-certified specialists at RH Dental Care — Dhaka\'s top dental clinic.',
    images: ['/rhlogo.jpeg'],
  },
};

export default function TeamLayout({ children }: { children: React.ReactNode }) {
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
