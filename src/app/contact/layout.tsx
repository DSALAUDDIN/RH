import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Book a Free Dental Consultation in Dhaka | Contact RH Dental Care',
  description:
    'Book your free dental consultation at RH Dental Care — Dhaka\'s top-rated dental clinic. Call us or fill the form. BMDC-certified specialists available 6 days a week. Quick response guaranteed.',
  keywords: [
    'book dental appointment Dhaka',
    'dental clinic contact Dhaka Bangladesh',
    'free dental consultation Dhaka',
    'RH Dental Care contact',
    'dentist appointment Dhaka',
    'dental emergency Dhaka',
  ],
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Contact RH Dental Care | Book Free Consultation — Dhaka',
    description:
      'Get in touch with RH Dental Care to book a free consultation with our specialist team. Painless care, guaranteed results.',
    url: 'https://www.rhdentalcare.com/contact',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

