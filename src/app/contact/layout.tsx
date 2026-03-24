import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us | RH Dental Clinic',
  description: 'Get in touch with RH Dental Clinic to book your appointment. We are available 24/7 for dental emergencies in Blue Bay, CA.',
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
