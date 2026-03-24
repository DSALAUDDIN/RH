import { Metadata } from 'next';
import Testimonials from '@/components/Testimonials';

export const metadata: Metadata = {
  title: 'Patient Reviews',
  description: 'Read what real patients say about their experience at RH Dental Clinic — honest reviews and 5-star stories from our growing family of happy smiles.',
};

export default function ReviewsPage() {
  return (
    <div style={{ paddingTop: 'var(--nav-height)' }}>
      {/* Hero Banner */}
      <div
        style={{
          background: 'linear-gradient(135deg, hsl(var(--blue-700)), hsl(var(--blue-500)))',
          padding: '5rem 0 4rem',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute', top: '-80px', left: '10%',
            width: '400px', height: '400px', borderRadius: '50%',
            background: 'rgba(255,255,255,0.06)', pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute', bottom: '-60px', right: '5%',
            width: '280px', height: '280px', borderRadius: '50%',
            background: 'rgba(255,255,255,0.08)', pointerEvents: 'none',
          }}
        />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <span
            style={{
              display: 'inline-block',
              background: 'rgba(255,255,255,0.15)',
              color: 'white',
              borderRadius: '9999px',
              padding: '0.35rem 1.25rem',
              fontWeight: 700,
              fontSize: '0.85rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginBottom: '1.25rem',
            }}
          >
            Real Patient Stories
          </span>
          <h1 style={{ color: 'white', fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', marginBottom: '1rem' }}>
            Patient Reviews
          </h1>
          <p
            style={{
              color: 'rgba(255,255,255,0.88)',
              fontSize: '1.2rem',
              maxWidth: '680px',
              margin: '0 auto',
              lineHeight: 1.7,
            }}
          >
            Over 5,000 patients have trusted us with their smiles. Here&apos;s what some of them have to say about the RH Dental experience.
          </p>

          {/* Aggregate rating display */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
              marginTop: '2rem',
              background: 'rgba(255,255,255,0.12)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '9999px',
              padding: '0.75rem 2rem',
            }}
          >
            <span style={{ fontSize: '1.75rem', fontWeight: 800, color: '#fbbf24' }}>4.9</span>
            <div style={{ display: 'flex', gap: '3px' }}>
              {[...Array(5)].map((_, i) => (
                <svg key={i} width="20" height="20" viewBox="0 0 24 24" fill="#fbbf24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ))}
            </div>
            <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: '1rem' }}>Based on 500+ reviews</span>
          </div>
        </div>
      </div>

      {/* Testimonials Grid — full set */}
      <Testimonials />

      {/* Leave a Review CTA */}
      <section
        style={{
          background: 'hsl(var(--background))',
          padding: '5rem 0',
          textAlign: 'center',
        }}
      >
        <div className="container">
          <div
            className="glass"
            style={{
              maxWidth: '700px',
              margin: '0 auto',
              padding: '4rem 3rem',
              borderRadius: '2rem',
              border: '1px solid rgba(0,115,230,0.15)',
            }}
          >
            <h2
              style={{
                fontSize: '2rem',
                marginBottom: '1rem',
                background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--blue-400)))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Share Your Experience
            </h2>
            <p style={{ fontSize: '1.125rem', marginBottom: '2rem', color: 'hsl(var(--muted-foreground))' }}>
              Had a great visit? We&apos;d love to hear your story. Your review helps others discover quality dental care.
            </p>
            <a
              href="/contact"
              className="btn btn-primary"
              style={{ padding: '1rem 2.5rem', fontSize: '1.125rem' }}
            >
              Write a Review
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
