import type { Metadata } from 'next';

const BASE_URL = 'https://www.rhdentalcare.com';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
    { '@type': 'ListItem', position: 2, name: 'All Treatments', item: `${BASE_URL}/treatments` },
  ],
};

export const metadata: Metadata = {
  title: 'All Dental Treatments in Dhaka | RH Dental Care',
  description:
    'Complete dental treatment directory at RH Dental Care, Dhaka — implants, root canal, braces, veneers, gum surgery, bone grafting & pediatric care by BMDC-certified specialists.',
  keywords: [
    'dental treatments Dhaka',
    'root canal treatment Dhaka',
    'dental implants Bangladesh',
    'orthodontic treatment Dhaka',
    'teeth whitening Dhaka',
    'gum surgery Dhaka',
    'bone graft dental Dhaka',
    'zirconia crown Dhaka',
    'porcelain veneers Dhaka',
    'smile makeover Dhaka',
    'dental treatment list Bangladesh',
    'RH Dental Care treatments',
    'all dental procedures Dhaka',
    'comprehensive dental care Bangladesh',
  ],
  alternates: { canonical: '/treatments' },
  openGraph: {
    title: 'All Dental Treatments | RH Dental Care Dhaka',
    description:
      'Complete dental treatment directory — implants, braces, root canal, cosmetic care & more at RH Dental Care, Dhaka\'s premier clinic.',
    url: `${BASE_URL}/treatments`,
    images: [{ url: '/rhlogo.jpeg', width: 1200, height: 630, alt: 'RH Dental Care Treatments Dhaka' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'All Dental Treatments | RH Dental Care Dhaka',
    description: 'Browse all dental treatments at RH Dental Care — Dhaka\'s best clinic for implants, braces, root canal & more.',
    images: ['/rhlogo.jpeg'],
  },
};

export default function TreatmentsLayout({ children }: { children: React.ReactNode }) {
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