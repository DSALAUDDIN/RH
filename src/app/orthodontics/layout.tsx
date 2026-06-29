import type { Metadata } from 'next';

const BASE_URL = 'https://www.rhdentalcare.com';

export const metadata: Metadata = {
  title: 'Orthodontics — Braces & Clear Aligners in Dhaka | RH Dental Care',
  description:
    'Get expert orthodontic treatment at RH Dental Care, Dhaka. Traditional braces & invisible clear aligners with 3D digital smile planning. Personalized care for teens and adults. Free consultation by BMDC-certified orthodontist.',
  keywords: [
    'orthodontics Dhaka',
    'braces Dhaka',
    'clear aligners Bangladesh',
    'invisible braces Dhaka',
    'teeth straightening Dhaka',
    'ceramic braces Bangladesh',
    'orthodontist Dhaka',
    'lingual braces Dhaka',
    'Invisalign Dhaka',
    'clear aligner cost Bangladesh',
    'braces cost Dhaka',
    'best orthodontist Bangladesh',
    'RH Dental Care orthodontics',
  ],
  alternates: { canonical: '/orthodontics' },
  openGraph: {
    title: 'Orthodontics — Braces & Clear Aligners | RH Dental Care Dhaka',
    description:
      'Advanced orthodontic treatment with 3D digital smile planning. Braces and clear aligners for teens and adults. BMDC-certified orthodontist at RH Dental Care.',
    url: `${BASE_URL}/orthodontics`,
    images: [{ url: '/rhlogo.jpeg', width: 1200, height: 630, alt: 'Orthodontics Braces Dhaka — RH Dental Care' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Orthodontics & Braces Dhaka | RH Dental Care',
    description: 'Braces and clear aligners with 3D smile planning by BMDC-certified orthodontist in Dhaka. Free consultation.',
    images: ['/rhlogo.jpeg'],
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'MedicalProcedure',
      name: 'Orthodontic Treatment (Braces & Clear Aligners)',
      description:
        'Comprehensive orthodontic treatment at RH Dental Care, Dhaka including traditional braces and modern clear aligners with 3D digital smile planning.',
      procedureType: 'https://schema.org/TherapeuticProcedure',
      bodyLocation: 'Teeth / Dental Arch',
      preparation: '3D digital scan and bite analysis',
      followup: 'Regular adjustment visits every 4–6 weeks; permanent retainer',
      howPerformed: 'Custom bracket bonding or sequential clear aligner therapy based on digital treatment simulation',
      performer: {
        '@type': 'Physician',
        name: 'Dr. B.M. Rafiqul Hasan (Mehedi)',
        '@id': `${BASE_URL}/#dr-hasan`,
      },
      availableService: {
        '@type': 'MedicalClinic',
        name: 'RH Dental Care',
        '@id': `${BASE_URL}/#dentist`,
      },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
        { '@type': 'ListItem', position: 2, name: 'Orthodontics', item: `${BASE_URL}/orthodontics` },
      ],
    },
  ],
};

export default function OrthodonticsLayout({ children }: { children: React.ReactNode }) {
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