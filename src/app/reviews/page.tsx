import { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import VideoGallery from '@/components/VideoGallery';
import { pageMeta } from '@/lib/seo/metadata';

export const metadata: Metadata = pageMeta({
  title: 'Patient Reviews & Experiences · RH Dental Care Dhaka',
  description:
    'What patients say about RH Dental Care. Ratings shown here come from the live Google listing for each branch, or are not shown at all.',
  path: '/reviews',
});

import JsonLd from '@/components/seo/JsonLd';
import ReviewBadge from '@/components/ReviewBadge';
import { breadcrumbs } from '@/lib/seo/schema';
import { BRANCH_LIST } from '@/lib/branches';

/*
 * aggregateRating is only emitted from a live Places response
 * (see aggregateRatingFrom() in src/lib/reviews.ts).
 */

export default async function ReviewsPage() {
  /* Best-effort: a missing or unmigrated database must not fail the page. */
  let videoReviews: Awaited<ReturnType<typeof prisma.review.findMany>> = [];
  try {
    videoReviews = await prisma.review.findMany({ orderBy: { createdAt: 'desc' } });
  } catch (err) {
    console.error('[reviews] could not load video reviews:', err);
  }

  return (
    <div className="reviews-root">
      <JsonLd nodes={[breadcrumbs({ name: 'Patient reviews', path: '/reviews' })]} />

      {/* Live ratings, per branch. Each renders only if its Google listing
          actually returns one — otherwise nothing appears here. */}
      <section className="rh-section rh-scope">
        <div className="rh-container">
          <h1
            style={{
              fontFamily: 'var(--rh-font-display)',
              fontWeight: 400,
              marginBottom: 'var(--rh-4)',
            }}
          >
            Patient Reviews &amp; Experiences at RH Dental Care Dhaka
          </h1>
          <p style={{ color: 'var(--rh-ink-soft)', maxWidth: 'var(--rh-measure)' }}>
            Ratings below are read from each branch&rsquo;s live Google listing. If a branch has no
            rating yet, nothing is shown for it — we do not publish a number we cannot point you at.
          </p>
          <div
            style={{
              display: 'flex',
              gap: 'var(--rh-3)',
              flexWrap: 'wrap',
              marginTop: 'var(--rh-6)',
            }}
          >
            {BRANCH_LIST.map((b) => (
              <ReviewBadge key={b.id} branch={b.id} />
            ))}
          </div>
        </div>
      </section>
      {/* Video Reviews Section */}
      <VideoGallery videos={videoReviews} />

      {/* Leave a Review CTA - Dual Branch & Modern Theme */}
      <section
        style={{
          background: '#f8fafc',
          padding: '4rem 1.5rem 6rem',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div
            style={{
              background: 'linear-gradient(135deg, #002347 0%, #003366 100%)',
              padding: 'clamp(2.5rem, 5vw, 3.5rem)',
              borderRadius: '24px',
              border: '1px solid rgba(56, 189, 248, 0.25)',
              boxShadow: '0 20px 45px -10px rgba(0, 35, 71, 0.35)',
              color: '#ffffff',
            }}
          >
            <h2
              style={{
                fontSize: 'clamp(1.8rem, 4vw, 2.4rem)',
                fontWeight: 800,
                marginBottom: '1rem',
                letterSpacing: '-0.02em',
                color: '#ffffff',
              }}
            >
              Share Your Experience &amp; <span style={{ color: '#38bdf8' }}>Review Us</span>
            </h2>
            <p
              style={{
                fontSize: '1.05rem',
                marginBottom: '2.5rem',
                color: '#94a3b8',
                lineHeight: '1.7',
                maxWidth: '650px',
                margin: '0 auto 2.5rem',
              }}
            >
              Had a positive visit? Your feedback helps fellow patients find trusted, microscope-guided dental care in Dhaka. Choose your branch below to leave a 5-star Google review:
            </p>

            <div
              style={{
                display: 'flex',
                gap: '1.25rem',
                justifyContent: 'center',
                flexWrap: 'wrap',
              }}
            >
              <a
                href="https://www.google.com/maps/place/RH+Dental+Care+and+Implant+Center/@23.7606927,90.4273875,17z/data=!4m16!1m7!3m6!1s0x3755b8754cadaa87:0x9db1359510cadcfd!2sRH+Dental+Care+and+Implant+Center!8m2!3d23.7606878!4d90.4299624!16s%2Fg%2F11b5pjywjt!3m7!1s0x3755b8754cadaa87:0x9db1359510cadcfd!8m2!3d23.7606878!4d90.4299624!9m1!1b1!16s%2Fg%2F11b5pjywjt"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '1rem 2rem',
                  fontSize: '1rem',
                  fontWeight: 700,
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #0073e6 0%, #0284c7 100%)',
                  color: '#ffffff',
                  textDecoration: 'none',
                  boxShadow: '0 8px 24px rgba(0, 115, 230, 0.4)',
                  transition: 'transform 0.2s',
                }}
              >
                ★ Review Banasree Branch
              </a>

              <a
                href="https://maps.google.com/?q=B%26B+Empire,+Plot+116,+Road+11,+Banani,+Dhaka+1213"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '1rem 2rem',
                  fontSize: '1rem',
                  fontWeight: 700,
                  borderRadius: '12px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: '#ffffff',
                  border: '1px solid rgba(255, 255, 255, 0.25)',
                  textDecoration: 'none',
                  transition: 'background 0.2s',
                }}
              >
                ★ Review Banani Branch
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
