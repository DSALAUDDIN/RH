import type { Metadata } from 'next';
import Specialties from '@/components/Specialties';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Dental Specialties in Dhaka — Implants, Braces, Root Canal & More | RH Dental Care',
  description:
    'Explore world-class dental specialties at RH Dental Care, Dhaka\'s premier clinic. 3D imaging, dental implants, orthodontics, root canal, zirconia crowns, gum care, pediatric dentistry & aesthetic smile design. BMDC-certified specialists.',
  keywords: [
    'dental implants Dhaka Bangladesh',
    'orthodontics braces Dhaka',
    'clear aligners Dhaka',
    'root canal treatment Dhaka',
    'painless root canal Bangladesh',
    'zirconia crown Dhaka',
    'teeth whitening Dhaka',
    'smile design Dhaka',
    'cosmetic dentistry Bangladesh',
    'gum disease treatment Dhaka',
    'kids dentist Dhaka',
    '3D dental imaging Dhaka',
    'dental specialties Bangladesh',
    'best dental treatments Dhaka',
  ],
  alternates: { canonical: '/specialties' },
  openGraph: {
    title: 'Dental Specialties — Implants, Braces, Root Canal, Aesthetics | RH Dental Care Dhaka',
    description:
      'All dental specialties under one roof in Dhaka — implants, orthodontics, root canal & cosmetic dentistry by BMDC-certified specialists at RH Dental Care.',
    url: 'https://www.rhdentalcare.com/specialties',
    images: [{ url: '/rhlogo.jpeg', width: 1200, height: 630, alt: 'Dental Specialties — RH Dental Care Dhaka' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dental Specialties Dhaka | RH Dental Care',
    description: 'Implants, orthodontics, root canal, cosmetic dentistry & more by BMDC-certified specialists in Dhaka.',
    images: ['/rhlogo.jpeg'],
  },
};

export default function SpecialtiesPage() {
  return (
    <div style={{ background: '#020617', minHeight: '100vh' }}>
      {/* ── Minimal Breadcrumb / Top Bar ── */}
      <div style={{ 
        paddingTop: 'calc(var(--nav-height, 80px) + 20px)',
        paddingLeft: '2rem',
        paddingRight: '2rem',
        maxWidth: '1350px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <Link href="/" style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '0.5rem', 
          color: 'rgba(255,255,255,0.5)', 
          textDecoration: 'none',
          fontSize: '0.9rem',
          fontWeight: 600,
          transition: 'color 0.3s ease'
        }}>
          <ArrowLeft size={16} />
          Back to Home
        </Link>
      </div>

      {/* ── Core Specialties Component ── */}
      {/* 
          Note: We're using the same component as the homepage. 
          It has its own Elite "Specialties" title and full-width layout.
      */}
      <Specialties />

      {/* ── Footer-like Strip for specialized pages ── */}
      <section style={{ 
        padding: '100px 0', 
        background: '#fff', 
        textAlign: 'center',
        borderTop: '1px solid rgba(0,0,0,0.05)'
      }}>
        <div className="container">
           <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', marginBottom: '1.5rem' }}>
             Ready to experience world-class care?
           </h3>
           <Link href="/contact" style={{
             display: 'inline-block',
             padding: '1.2rem 3rem',
             borderRadius: '100px',
             background: '#020617',
             color: '#fff',
             fontWeight: 800,
             textDecoration: 'none',
             boxShadow: '0 20px 40px rgba(2,6,23,0.2)'
           }}>
             Book Your Consultation
           </Link>
        </div>
      </section>
    </div>
  );
}
