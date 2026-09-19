import Hero from '@/components/Hero';
import BranchChooser from '@/components/branch/BranchChooser';
import Specialties from '@/components/Specialties';
import Testimonials from '@/components/Testimonials';
import VideoSection from '@/components/VideoSection';
import ClinicGallery from '@/components/ClinicGallery';
import BeforeAfter from '@/components/BeforeAfter';
import { ShieldCheck, Sparkles } from 'lucide-react';

import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo/metadata';

export const metadata: Metadata = pageMeta({
  title: 'RH Dental Care | Dental Clinics in Banani & Banasree, Dhaka',
  absoluteTitle: true,
  description:
    'Two clinics in Dhaka: an appointment-only private suite in Banani and a full-service flagship hospital in Banasree. Same clinical team at both.',
  path: '/',
  image: '/assets/branches/banani/reception.webp',
  imageAlt: 'Reception at RH Dental Care Banani.',
});

export default function Home() {
  return (
    <>
      <Hero />
      <BranchChooser />
      <Specialties />
      <VideoSection />
      <ClinicGallery />

      <BeforeAfter />
      <Testimonials />

      {/* Call to Action Section */}
      <section
        className="section bg-primary text-white text-center"
        style={{
          background: 'var(--rh-surface)',
          color: 'var(--rh-ink)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Subtle background glow */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '800px',
            height: '800px',
            background: 'radial-gradient(circle, rgba(0,140,255,0.16) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="max-w-3xl mx-auto" style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(0,140,255,0.1)',
                padding: '6px 16px',
                borderRadius: '999px',
                fontSize: '0.85rem',
                fontWeight: 700,
                marginBottom: '1.5rem',
                border: '1px solid rgba(0,140,255,0.25)',
              }}
            >
              <Sparkles size={16} color="#38bdf8" />
              <span style={{ color: '#E4E0D2' }}>Two branches, one clinical team</span>
            </div>

            <h2
              style={{
                color: 'var(--rh-ink)',
                marginBottom: '1rem',
                fontSize: 'clamp(2rem, 5vw, 3rem)',
                fontWeight: 600,
                letterSpacing: '-0.02em',
                lineHeight: 1.1,
              }}
            >
              Two clinics. One clinical team.
            </h2>

            <p
              style={{
                color: 'var(--rh-ink-soft)',
                marginBottom: '2.5rem',
                fontSize: '1.25rem',
                lineHeight: 1.6,
              }}
            >
              Delaying treatment only makes it more painful and expensive. Claim your consultation
              today and experience dentistry.
            </p>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1.5rem',
              }}
            >
              <a
                href="/contact"
                className="btn-cta-hover"
                style={{
                  background: 'var(--rh-cta)',
                  color: '#fff',
                  padding: '1.1rem 2.75rem',
                  fontSize: '1.05rem',
                  fontWeight: 600,
                  borderRadius: '999px',
                  boxShadow: '0 12px 32px -8px rgba(0,140,255,0.55)',
                  transition: 'transform 0.2s',
                  textDecoration: 'none',
                }}
              >
                Request an appointment
              </a>

              <div
                style={{
                  display: 'flex',
                  gap: '2rem',
                  color: '#C9C5B2',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  justifyContent: 'center',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <ShieldCheck size={18} color="#B4D1A8" /> Comfort-focused care
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
