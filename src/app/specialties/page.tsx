import { Metadata } from 'next';
import Specialties from '@/components/Specialties';

export const metadata: Metadata = {
  title: 'Our Specialties',
  description: 'Explore RH Dental Clinic\'s clinical specialties — Oral Surgery, Periodontology, Endodontics, Pediatric Dentistry, Preventive Care, and advanced Diagnostic Imaging.',
};

export default function SpecialtiesPage() {
  return (
    <div style={{ paddingTop: 'var(--nav-height)' }}>
      {/* Hero Banner */}
      <div
        style={{
          background: 'linear-gradient(135deg, hsl(var(--blue-600)), hsl(var(--blue-400)))',
          padding: '5rem 0 4rem',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decorative blobs */}
        <div
          style={{
            position: 'absolute', top: '-80px', right: '-80px',
            width: '350px', height: '350px', borderRadius: '50%',
            background: 'rgba(255,255,255,0.08)', pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute', bottom: '-60px', left: '-60px',
            width: '250px', height: '250px', borderRadius: '50%',
            background: 'rgba(255,255,255,0.06)', pointerEvents: 'none',
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
            Clinical Excellence
          </span>
          <h1 style={{ color: 'white', fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', marginBottom: '1rem' }}>
            Our Core Specialties
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
            Each discipline at RH Dental Clinic is handled by a board-certified specialist committed to the highest standard of care.
          </p>
        </div>
      </div>

      {/* Core Specialties Grid */}
      <Specialties />

      {/* Why Choose Us Strip */}
      <section
        style={{
          background: 'hsl(var(--blue-50))',
          padding: '5rem 0',
        }}
      >
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '2rem',
            }}
          >
            {[
              { stat: '15+', label: 'Years of Clinical Experience' },
              { stat: '5,000+', label: 'Successful Procedures' },
              { stat: '10+', label: 'Board-Certified Specialists' },
              { stat: '100%', label: 'Patient Satisfaction Rate' },
            ].map((item) => (
              <div
                key={item.label}
                className="glass"
                style={{
                  padding: '2.5rem 2rem',
                  borderRadius: '1.25rem',
                  textAlign: 'center',
                  border: '1px solid rgba(0,115,230,0.12)',
                }}
              >
                <h2
                  style={{
                    fontSize: '3rem',
                    fontWeight: 800,
                    background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--blue-400)))',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    marginBottom: '0.5rem',
                  }}
                >
                  {item.stat}
                </h2>
                <p style={{ color: 'hsl(var(--muted-foreground))', marginBottom: 0, fontWeight: 500 }}>
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
