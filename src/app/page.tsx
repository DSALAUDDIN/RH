import Hero from '@/components/Hero';
import BranchChooser from '@/components/branch/BranchChooser';
import Specialties from '@/components/Specialties';
import Testimonials from '@/components/Testimonials';
import VideoSection from '@/components/VideoSection';
import ClinicGallery from '@/components/ClinicGallery';
import BeforeAfter from '@/components/BeforeAfter';
import { ShieldCheck, Sparkles, ArrowRight } from 'lucide-react';
import Link from 'next/link';

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

      {/* Patient Knowledge Base Authority Showcase */}
      <section
        style={{
          maxWidth: '1200px',
          margin: '3rem auto 4rem',
          padding: '0 1.5rem',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginBottom: '1.75rem',
            gap: '1rem',
          }}
        >
          <div>
            <div
              style={{
                fontSize: '0.85rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: '#8C7355',
                marginBottom: '0.35rem',
              }}
            >
              Patient Knowledge Base
            </div>
            <h2
              style={{
                fontSize: 'clamp(1.5rem, 3.5vw, 2.25rem)',
                fontWeight: 700,
                color: 'var(--rh-ink, #132A13)',
                margin: 0,
                letterSpacing: '-0.02em',
              }}
            >
              Doctor-Reviewed Dental Guides
            </h2>
          </div>
          <Link
            href="/guides"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontWeight: 600,
              fontSize: '0.95rem',
              color: 'var(--rh-ink, #132A13)',
              textDecoration: 'none',
            }}
          >
            <span>Explore Guides Hub</span>
            <ArrowRight size={16} />
          </Link>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.25rem',
          }}
        >
          <Link
            href="/guides/dental-implant-cost-dhaka"
            style={{
              background: '#FFFFFF',
              border: '1px solid #E5E0D8',
              borderRadius: '12px',
              padding: '1.5rem',
              textDecoration: 'none',
              color: 'inherit',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '0 2px 10px rgba(0,0,0,0.02)',
            }}
          >
            <div>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#2D6A4F', textTransform: 'uppercase' }}>
                Dental Implants
              </span>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#132A13', margin: '0.5rem 0' }}>
                Dental Implant Cost in Dhaka
              </h3>
              <p style={{ fontSize: '0.875rem', color: '#4A5568', lineHeight: 1.5, margin: 0 }}>
                What clinical factors and materials determine implant treatment investment in Dhaka?
              </p>
            </div>
            <div style={{ marginTop: '1rem', fontSize: '0.85rem', fontWeight: 600, color: '#8C7355', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <span>Read Guide</span>
              <ArrowRight size={14} />
            </div>
          </Link>

          <Link
            href="/guides/microscopic-root-canal-treatment"
            style={{
              background: '#FFFFFF',
              border: '1px solid #E5E0D8',
              borderRadius: '12px',
              padding: '1.5rem',
              textDecoration: 'none',
              color: 'inherit',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '0 2px 10px rgba(0,0,0,0.02)',
            }}
          >
            <div>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#2D6A4F', textTransform: 'uppercase' }}>
                Endodontics
              </span>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#132A13', margin: '0.5rem 0' }}>
                Microscopic Root Canal Care
              </h3>
              <p style={{ fontSize: '0.875rem', color: '#4A5568', lineHeight: 1.5, margin: 0 }}>
                How surgical operating microscopes illuminate hidden canals and help preserve natural teeth.
              </p>
            </div>
            <div style={{ marginTop: '1rem', fontSize: '0.85rem', fontWeight: 600, color: '#8C7355', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <span>Read Guide</span>
              <ArrowRight size={14} />
            </div>
          </Link>

          <Link
            href="/guides/clear-aligners-vs-braces"
            style={{
              background: '#FFFFFF',
              border: '1px solid #E5E0D8',
              borderRadius: '12px',
              padding: '1.5rem',
              textDecoration: 'none',
              color: 'inherit',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '0 2px 10px rgba(0,0,0,0.02)',
            }}
          >
            <div>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#2D6A4F', textTransform: 'uppercase' }}>
                Orthodontics
              </span>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#132A13', margin: '0.5rem 0' }}>
                Clear Aligners vs Braces
              </h3>
              <p style={{ fontSize: '0.875rem', color: '#4A5568', lineHeight: 1.5, margin: 0 }}>
                Clinical comparison of aesthetics, dietary freedom, hygiene, and alignment predictability.
              </p>
            </div>
            <div style={{ marginTop: '1rem', fontSize: '0.85rem', fontWeight: 600, color: '#8C7355', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <span>Read Guide</span>
              <ArrowRight size={14} />
            </div>
          </Link>
        </div>
      </section>

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
              <span style={{ color: '#E4E0D2' }}>Serving Dhaka Since 2014 · Two branches, one clinical team</span>
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
