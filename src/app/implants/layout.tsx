import type { Metadata } from 'next';

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
    url: 'https://www.rhdentalcare.com/implants',
    images: [{ url: '/rhlogo.jpeg', width: 1200, height: 630 }],
  },
};

export default function ImplantsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
