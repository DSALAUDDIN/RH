import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us — Chief Consultant Dr. B.M. Rafiqul Hasan | RH Dental Care Dhaka',
  description:
    'Meet Dr. B.M. Rafiqul Hasan (Mehedi), Chief Consultant Oral & Dental Surgeon at RH Dental Care — Dhaka\'s #1 dental clinic. BMDC Reg. 5169. BDS, MPH, trained in implantology across China, Korea & India. 12+ years experience, 13k+ happy patients.',
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
    title: 'About RH Dental Care | #1 Dental Clinic in Dhaka, Bangladesh',
    description:
      'Your smile is our happiness. Meet the world-class specialist team at RH Dental Care, Dhaka\'s most trusted 3,500 sq.ft dental facility. Led by Dr. B.M. Rafiqul Hasan (Mehedi), BMDC Reg. 5169.',
    url: 'https://www.rhdentalcare.com/about',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'RH Dental Care team Dhaka' }],
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
