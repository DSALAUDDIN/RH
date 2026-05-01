import type { Metadata } from 'next';

const BASE_URL = 'https://www.rhdentalcare.com';

export const metadata: Metadata = {
  title: 'Dental Implants in Dhaka — Permanent Tooth Replacement | RH Dental Care',
  description:
    'Get premium dental implants at RH Dental Care, Dhaka. 98% success rate. 3D-guided implant surgery by Dr. B.M. Rafiqul Hasan Mehedi — trained in China, Korea & India. Single implants, bridges & full mouth rehabilitation. Book free consultation.',
  keywords: [
    'dental implants Dhaka',
    'dental implant Bangladesh',
    'best dental implant clinic Dhaka',
    'tooth implant Dhaka',
    'implant surgery Dhaka',
    'full mouth rehabilitation Dhaka',
    'dental implant cost Bangladesh',
    'implant dentist Dhaka',
    'All-on-4 implants Dhaka',
    'single tooth implant Dhaka',
    'implant-supported bridge Bangladesh',
    'immediate dental implant Dhaka',
    'dental implant price Bangladesh',
    '3D guided implant surgery',
    'painless implant surgery Dhaka',
    'titanium implant Dhaka',
    'dental implant near me',
    'RH Dental Care implants',
  ],
  alternates: { canonical: '/implants' },
  openGraph: {
    title: 'Dental Implants — Permanent Tooth Replacement | RH Dental Care Dhaka',
    description:
      'Premium dental implants with 98% success rate. 3D-guided precision surgery by internationally trained specialists. Single implants from ৳70,000. Book free consultation now.',
    url: `${BASE_URL}/implants`,
    images: [{ url: '/rhlogo.jpeg', width: 1200, height: 630, alt: 'Dental Implants Dhaka — RH Dental Care' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dental Implants Dhaka | RH Dental Care',
    description: '98% success rate dental implants in Dhaka. 3D-guided surgery by BMDC-certified specialists. Book free consultation.',
    images: ['/rhlogo.jpeg'],
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'MedicalProcedure',
      name: 'Dental Implant Surgery',
      description:
        'Permanent tooth replacement using titanium dental implants at RH Dental Care, Dhaka. Computer-guided 3D surgery with 98% success rate.',
      procedureType: 'https://schema.org/SurgicalProcedure',
      bodyLocation: 'Jaw / Oral Cavity',
      preparation: 'CBCT 3D scan and treatment planning',
      followup: '3–6 months osseointegration, then crown placement',
      howPerformed: '3D-guided minimally invasive titanium implant placement under local anaesthesia',
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
        { '@type': 'ListItem', position: 2, name: 'Dental Implants', item: `${BASE_URL}/implants` },
      ],
    },
  ],
};

export default function ImplantsLayout({ children }: { children: React.ReactNode }) {
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