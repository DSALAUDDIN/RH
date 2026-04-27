import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Root Canal Treatment — Single Visit Precision Endodontics | RH Dental Care Dhaka',
  description:
    'Painless, single-visit root canal treatment at RH Dental Care, Dhaka. Microscope-guided precision with CBCT 3D imaging, rotary endodontics, and digital workflow. Ideal for local and international patients.',
  keywords: [
    'root canal Dhaka',
    'root canal treatment Bangladesh',
    'single visit root canal Dhaka',
    'painless root canal Bangladesh',
    'endodontics Dhaka',
    'root canal specialist Dhaka',
    'dental microscope root canal',
    'RH Dental Care root canal',
    'root canal medical tourism Bangladesh',
  ],
  alternates: { canonical: '/root-canal' },
  openGraph: {
    title: 'Root Canal Treatment — Single Visit | RH Dental Care Dhaka',
    description:
      'Painless single-visit root canal with microscope-guided precision, CBCT 3D imaging, and rotary endodontics. International standard care in Dhaka.',
    url: 'https://www.rhdentalcare.com/root-canal',
    images: [{ url: '/rhlogo.jpeg', width: 1200, height: 630 }],
  },
};

export default function RootCanalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
