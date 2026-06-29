import type { Metadata } from 'next';

const BASE_URL = 'https://www.rhdentalcare.com';

export const metadata: Metadata = {
  title: 'Painless Root Canal Treatment in Dhaka — Single Visit Endodontics | RH Dental Care',
  description:
    'Painless, single-visit root canal treatment at RH Dental Care, Dhaka. Microscope-guided precision with CBCT 3D imaging, rotary endodontics, and digital workflow. 5-year guarantee. BMDC-certified specialist.',
  keywords: [
    'root canal Dhaka',
    'root canal treatment Bangladesh',
    'single visit root canal Dhaka',
    'painless root canal Bangladesh',
    'endodontics Dhaka',
    'root canal specialist Dhaka',
    'dental microscope root canal Dhaka',
    'RH Dental Care root canal',
    'root canal medical tourism Bangladesh',
    'rotary endodontics Dhaka',
    'root canal cost Bangladesh',
    'best root canal dentist Dhaka',
  ],
  alternates: { canonical: '/root-canal' },
  openGraph: {
    title: 'Painless Root Canal Treatment — Single Visit | RH Dental Care Dhaka',
    description:
      'Painless single-visit root canal with microscope-guided precision, CBCT 3D imaging, and rotary endodontics. 5-year guarantee. International standard care in Dhaka.',
    url: `${BASE_URL}/root-canal`,
    images: [{ url: '/rhlogo.jpeg', width: 1200, height: 630, alt: 'Root Canal Treatment Dhaka — RH Dental Care' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Painless Root Canal Dhaka | RH Dental Care',
    description: 'Single-visit painless root canal in Dhaka. Microscope-guided precision. 5-year guarantee by BMDC-certified specialist.',
    images: ['/rhlogo.jpeg'],
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'MedicalProcedure',
      name: 'Root Canal Treatment (Endodontics)',
      description:
        'Painless, microscope-guided root canal therapy at RH Dental Care, Dhaka. Single-visit treatment using rotary endodontics and CBCT 3D imaging.',
      procedureType: 'https://schema.org/TherapeuticProcedure',
      bodyLocation: 'Tooth / Dental Pulp',
      preparation: 'Digital X-ray and pulp vitality testing',
      followup: 'Permanent crown placement within 2 weeks',
      howPerformed: 'Microscope-guided pulp removal, canal shaping and biocompatible filling under local anaesthesia',
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
        { '@type': 'ListItem', position: 2, name: 'Root Canal Treatment', item: `${BASE_URL}/root-canal` },
      ],
    },
  ],
};

export default function RootCanalLayout({ children }: { children: React.ReactNode }) {
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