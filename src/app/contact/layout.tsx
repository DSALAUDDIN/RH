import type { Metadata } from 'next';

const BASE_URL = 'https://www.rhdentalcare.com';

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
        { '@type': 'ListItem', position: 2, name: 'Contact', item: `${BASE_URL}/contact` },
      ],
    },
    {
      '@type': 'ContactPage',
      name: 'Contact RH Dental Care',
      description: 'Book a free dental consultation at RH Dental Care, Dhaka.',
      url: `${BASE_URL}/contact`,
      mainEntity: {
        '@id': `${BASE_URL}/#dentist`,
      },
    },
  ],
};

export const metadata: Metadata = {
  title: 'Book Free Dental Consultation in Dhaka | Contact RH Dental Care',
  description:
    'Book your free consultation at RH Dental Care, Dhaka\'s top-rated dental clinic. Call or fill the form. BMDC-certified specialists, 6 days a week. Quick response.',
  keywords: [
    'book dental appointment Dhaka',
    'dental clinic contact Dhaka Bangladesh',
    'free dental consultation Dhaka',
    'RH Dental Care contact',
    'dentist appointment Dhaka',
    'dental emergency Dhaka',
    'dental clinic phone number Dhaka',
    'RH Dental Care address',
  ],
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Contact RH Dental Care | Book Free Consultation — Dhaka',
    description:
      'Book a free dental consultation at RH Dental Care, Dhaka. BMDC-certified specialists available 6 days a week. Call or message us today.',
    url: `${BASE_URL}/contact`,
    images: [{ url: '/rhlogo.jpeg', width: 1200, height: 630, alt: 'Contact RH Dental Care — Dhaka' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact RH Dental Care | Free Consultation Dhaka',
    description: 'Book a free dental consultation at RH Dental Care, Dhaka. BMDC-certified specialists available 6 days a week.',
    images: ['/rhlogo.jpeg'],
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
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
