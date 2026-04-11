import { Metadata } from 'next';
import Testimonials from '@/components/Testimonials';

export const metadata: Metadata = {
  title: 'Patient Reviews',
  description: 'Read what real patients say about their experience at RH Dental Clinic — honest reviews and 5-star stories from our growing family of happy smiles.',
};

export default function ReviewsPage() {
  return (
    <div style={{ paddingTop: 'var(--nav-height)' }}>
      {/* Testimonials Core Section */}
      <Testimonials />

      {/* Leave a Review CTA */}
      <section
        style={{
          background: 'hsl(var(--background))',
          padding: '2rem 0 6rem',
          textAlign: 'center',
        }}
      >
        <div className="container">
          <div
            style={{
              maxWidth: '800px',
              margin: '0 auto',
              background: 'linear-gradient(145deg, #0f172a 0%, #1e293b 100%)',
              padding: 'clamp(3rem, 5vw, 4rem)',
              borderRadius: '2rem',
              border: '1px solid rgba(255,255,255,0.1)',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              color: 'white',
            }}
          >
            <h2
              style={{
                fontSize: 'clamp(2rem, 4vw, 2.5rem)',
                fontWeight: 800,
                marginBottom: '1rem',
                letterSpacing: '-0.02em'
              }}
            >
              Share Your <span style={{ color: '#38bdf8' }}>Experience</span>
            </h2>
            <p style={{ fontSize: '1.1rem', marginBottom: '2.5rem', color: '#cbd5e1', lineHeight: '1.7', maxWidth: '600px', margin: '0 auto 2.5rem' }}>
              Had a great visit? We&apos;d love to hear your story. Your review helps others discover quality dental care and helps us serve you better.
            </p>
            <a
              href="https://www.google.com/maps/place/RH+Dental+Care+and+Implant+Center/@23.7606927,90.4273875,17z/data=!4m16!1m7!3m6!1s0x3755b8754cadaa87:0x9db1359510cadcfd!2sRH+Dental+Care+and+Implant+Center!8m2!3d23.7606878!4d90.4299624!16s%2Fg%2F11b5pjywjt!3m7!1s0x3755b8754cadaa87:0x9db1359510cadcfd!8m2!3d23.7606878!4d90.4299624!9m1!1b1!16s%2Fg%2F11b5pjywjt?hl=en-US&entry=ttu&g_ep=EgoyMDI2MDQwOC4wIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
              style={{ 
                display: 'inline-block',
                padding: '1rem 2.5rem', 
                fontSize: '1.05rem',
                fontWeight: 700,
                borderRadius: '999px',
                background: '#0ea5e9',
                color: 'white',
                border: 'none',
                boxShadow: '0 10px 25px rgba(14, 165, 233, 0.4)'
              }}
            >
              Write a Review on Google
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
