import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Orthodontics — Braces & Clear Aligners in Dhaka | RH Dental Care',
  description:
    'Get expert orthodontic treatment at RH Dental Care Dhaka. Traditional braces & clear aligners with 3D digital planning. Personalised care for teens and adults. Book free consultation.',
  keywords: [
    'orthodontics Dhaka',
    'braces Dhaka',
    'clear aligners Bangladesh',
    'invisible braces Dhaka',
    'teeth straightening Dhaka',
    'ceramic braces Bangladesh',
    'orthodontist Dhaka',
    'RH Dental Care orthodontics',
  ],
  alternates: { canonical: '/orthodontics' },
  openGraph: {
    title: 'Orthodontics — Braces & Clear Aligners | RH Dental Care Dhaka',
    description:
      'Advanced orthodontic treatment with 3D digital planning. Braces and clear aligners for teens and adults. Personalised care at RH Dental Care.',
    url: 'https://www.rhdentalcare.com/orthodontics',
    images: [{ url: '/rhlogo.jpeg', width: 1200, height: 630 }],
  },
};

export default function OrthodonticsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
