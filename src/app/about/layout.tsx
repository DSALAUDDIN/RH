import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us — RH Dental Care',
  description:
    'Learn about RH Dental Care, our experienced team of specialists, and our commitment to premium, painless dental care in Dhaka. Led by Dr. B.M Rafiqual Hasan.',
  openGraph: {
    title: 'About Us | RH Dental Care',
    description:
      'World-class dental care led by Chief Consultant Dr. B.M Rafiqual Hasan. Specialists in Implants, Orthodontics, Cosmetic Dentistry & Oral Surgery.',
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
