import type { Metadata } from 'next';
import { Inter, Plus_Jakarta_Sans, Outfit } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-jakarta',
});

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-outfit',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.rhdentalcare.com'),
  title: {
    default: 'RH Dental Care | Best Dental Clinic & Oral Surgery Centre',
    template: '%s | RH Dental Care',
  },
  description: 'Welcome to RH Dental Care, leading dental clinic for expert oral & dental surgery, implants, and orthodontics by Dr. B.M Rafiqual Hasan (Mehedi). Experience painless treatment in a sea-blue calm environment.',
  keywords: [
    'RH Dental Care', 
    'Best Dental Clinic', 
    'Oral Surgery', 
    'Dental Implant specialist', 
    'Orthodontics', 
    'Dr. B.M Rafiqual Hasan', 
    'Mehedi Dentist', 
    'Teeth Whitening', 
    'Painless Dentistry',
    'Dental Aesthetic'
  ],
  authors: [{ name: 'RH Dental Care' }],
  creator: 'RH Dental Care',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.rhdentalcare.com',
    siteName: 'RH Dental Care',
    title: 'RH Dental Care | Professional Oral & Dental Surgery Centre',
    description: 'Expert dental care by Chief Consultant Dr. B.M Rafiqual Hasan (Mehedi). Specializing in Implants, Orthodontics, and Aesthetic Dentistry.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'RH Dental Care Clinic',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RH Dental Care | Premium Oral Health Services',
    description: 'Book your appointment with Dr. B.M Rafiqual Hasan at RH Dental Care.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jakarta.variable} ${outfit.variable}`} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Navbar />
        <main className="main-content">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
