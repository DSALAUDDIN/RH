import { Metadata } from 'next';
import Testimonials from '@/components/Testimonials';
import { prisma } from '@/lib/prisma';
import VideoGallery from '@/components/VideoGallery';
import { pageMeta } from '@/lib/metadata';

export const metadata: Metadata = pageMeta({
  title: 'Patient Reviews',
  description: 'What patients say about RH Dental Care. Ratings shown here come from the live Google listing for each branch, or are not shown at all.',
  path: '/reviews',
});

import JsonLd from '@/components/JsonLd';
import ReviewBadge from '@/components/ReviewBadge';
import { breadcrumbSchema } from '@/lib/schema';
import { BRANCH_LIST } from '@/lib/branches';

/* REMOVED: a hardcoded aggregateRating of 5.0 from 200 reviews, on a
   MedicalClinic node with an @id that did not match any entity elsewhere in the
   graph. It came from no API and matched neither branch's live listing.
   Marking up a rating that does not exist violates Google's structured data
   policy and can cost the site every rich result it would otherwise earn.
   See docs/audit-report.md P0-3.

   A rating may only ever be emitted from a live Places response — see
   aggregateRatingFrom() in src/lib/reviews.ts, which returns null when there is
   nothing real to publish. */

export default async function ReviewsPage() {
  /* Best-effort. A database that is unreachable, or a Review table that has not
     been migrated, must not take the whole page down — the rest of this page is
     static content that is still worth serving. */
  let videoReviews: Awaited<ReturnType<typeof prisma.review.findMany>> = [];
  try {
    videoReviews = await prisma.review.findMany({ orderBy: { createdAt: 'desc' } });
  } catch (err) {
    console.error('[reviews] could not load video reviews:', err);
  }

  return (
    <div className="reviews-root">
      <JsonLd
        nodes={[
          breadcrumbSchema([
            { name: 'RH Dental Care', path: '/' },
            { name: 'Patient reviews', path: '/reviews' },
          ]),
        ]}
      />

      {/* Live ratings, per branch. Each renders only if its Google listing
          actually returns one — otherwise nothing appears here. */}
      <section className="rh-section rh-scope">
        <div className="rh-container">
          <h1 style={{ fontFamily: 'var(--rh-font-display)', fontWeight: 400, marginBottom: 'var(--rh-4)' }}>
            What patients say
          </h1>
          <p style={{ color: 'var(--rh-ink-soft)', maxWidth: 'var(--rh-measure)' }}>
            Ratings below are read from each branch&rsquo;s live Google listing. If a
            branch has no rating yet, nothing is shown for it — we do not publish a
            number we cannot point you at.
          </p>
          <div style={{ display: 'flex', gap: 'var(--rh-3)', flexWrap: 'wrap', marginTop: 'var(--rh-6)' }}>
            {BRANCH_LIST.map((b) => (
              <ReviewBadge key={b.id} branch={b.id} />
            ))}
          </div>
        </div>
      </section>
      {/* Video Reviews Section */}
      <VideoGallery videos={videoReviews} />

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
              background: 'linear-gradient(145deg, #2B2A1C 0%, #2B2A1C 100%)',
              padding: 'clamp(3rem, 5vw, 4rem)',
              borderRadius: '2rem',
              border: '1px solid rgba(255,255,255,0.1)',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              color: 'var(--rh-ink)',
            }}
          >
            <h2
              style={{
                fontSize: 'clamp(2rem, 4vw, 2.5rem)',
                fontWeight: 600,
                marginBottom: '1rem',
                letterSpacing: '-0.02em'
              }}
            >
              Share Your <span style={{ color: 'var(--rh-brass)' }}>Experience</span>
            </h2>
            <p style={{ fontSize: '1.1rem', marginBottom: '2.5rem', color: '#C9C5B2', lineHeight: '1.7', maxWidth: '600px', margin: '0 auto 2.5rem' }}>
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
                borderRadius: '4px',
                background: '#9C7C38',
                color: 'var(--rh-ink)',
                border: 'none',
                boxShadow: '0 10px 25px rgba(156, 124, 56, 0.4)'
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
