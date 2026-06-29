import type { Metadata } from 'next';
import DentalTourism from './DentalTourism';

export const metadata: Metadata = {
  title: 'International Dental Tourism — RH Dental Care',
  description:
    'World-class dentistry in the heart of Dhaka. Internationally-trained specialists, 3D digital workflows, BMDC-certified care — at a fraction of UK / US / EU prices. Free WhatsApp consultation, plan before you fly.',
  keywords: [
    'dental tourism Bangladesh',
    'dental implants Dhaka',
    'cheap dental treatment abroad',
    'RH Dental Care',
    'Dr. B.M. Rafiqul Hasan',
    'medical tourism Bangladesh',
    'international dental patient',
  ],
  openGraph: {
    title: 'International Dental Tourism — RH Dental Care, Dhaka',
    description:
      'Premium dental care in Bangladesh — designed end-to-end around the visiting patient.',
    type: 'website',
  },
};

export default function Page() {
  return <DentalTourism />;
}
