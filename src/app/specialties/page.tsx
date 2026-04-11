import { Metadata } from 'next';
import Specialties from '@/components/Specialties';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Our Specialties | RH Dental Care',
  description: 'Explore our world-class specialized treatments, from 3D imaging to precision orthodontics.',
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
