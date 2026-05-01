import { Metadata } from 'next';
import Testimonials from '@/components/Testimonials';

const BASE_URL = 'https://www.rhdentalcare.com';

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
        { '@type': 'ListItem', position: 2, name: 'Patient Reviews', item: `${BASE_URL}/reviews` },
      ],
    },
    {
      '@type': 'MedicalClinic',
      '@id': `${BASE_URL}/#dentist`,
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '5.0',
        reviewCount: '200',
        bestRating: '5',
        worstRating: '1',
      },
    },
  ],
};

export const metadata: Metadata = {
  title: 'Patient Reviews & Testimonials — 5-Star Dental Care in Dhaka | RH Dental Care',
  description:
    '13,000+ happy patients at RH Dental Care, Dhaka. Read 5-star reviews for dental implants, orthodontics, root canal & cosmetic dentistry by BMDC-certified specialists.',
  keywords: [
    'RH Dental Care reviews',
    'dental clinic reviews Dhaka',
    'best dentist reviews Bangladesh',
    'dental implant reviews Dhaka',
    'orthodontics reviews Bangladesh',
    'patient testimonials dental Dhaka',
    '5 star dental clinic Dhaka',
    'dentist reviews Bangladesh',
    'RH Dental Care testimonials',
  ],
  alternates: { canonical: '/reviews' },
  openGraph: {
    title: 'Patient Reviews — 5-Star Dental Care | RH Dental Care Dhaka',
    description:
      '13,000+ happy patients rate RH Dental Care as Dhaka\'s #1 dental clinic. Read honest reviews for implants, orthodontics, root canal & cosmetic dentistry.',
    url: 'https://www.rhdentalcare.com/reviews',
    images: [{ url: '/rhlogo.jpeg', width: 1200, height: 630, alt: 'RH Dental Care Patient Reviews' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Patient Reviews | RH Dental Care Dhaka',
    description: '5-star reviews from 13,000+ happy patients at RH Dental Care — Dhaka\'s best dental clinic.',
    images: ['/rhlogo.jpeg'],
  },
};

export default function ReviewsPage() {
  return (
    <div style={{ paddingTop: 'var(--nav-height)' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />
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
