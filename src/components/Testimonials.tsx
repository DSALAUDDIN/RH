'use client';

import Link from 'next/link';
import { SHARED_TRUST } from '@/lib/branches';
import './Testimonials.css';

/**
 * VERIFIED reviews only.
 *
 * This array is empty on purpose. The six named testimonials that used to be
 * hardcoded here — with a Google logo, five stars, "Local Guide · 32 reviews"
 * badges and a "Read all 500+ Reviews on Google" link — could not be verified
 * against either branch's live listing, and the Banani listing shows roughly
 * twelve reviews in total. They are preserved unrendered in
 * src/components/testimonials.unverified.ts pending the client's confirmation.
 *
 * To put one back: confirm it is a real review, add it here WITH its live
 * `url`, and it renders. Anything without a URL that resolves to the review on
 * Google does not go on this site.
 *
 * The live star rating and review count are rendered by <ReviewBadge>, which
 * reads the Google Places API and renders nothing when there is nothing real to
 * show. See src/lib/reviews.ts.
 */
interface VerifiedTestimonial {
  name: string;
  content: string;
  rating: number;
  /** Link to the review on the live Google listing. Required. */
  url: string;
  branch: 'banani' | 'banasree';
}

const VERIFIED_TESTIMONIALS: VerifiedTestimonial[] = [];

export default function Testimonials() {
  if (VERIFIED_TESTIMONIALS.length === 0) {
    // Nothing verified to show. Rather than an empty band or a fabricated one,
    // the section states what is true and points at the listings themselves.
    return (
      <section className="rh-testimonials rh-section rh-scope" aria-labelledby="tm-title">
        <div className="rh-container">
          <h2 id="tm-title" className="rh-tm-title">What patients say</h2>
          <p className="rh-tm-body">
            Reviews for both branches live on their Google listings, where you can
            see who wrote them and when. We do not reproduce them here.
          </p>
          <p className="rh-tm-trust">{SHARED_TRUST}</p>
          <Link href="/contact" className="rh-btn rh-btn-ghost">
            Find your branch
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="rh-testimonials rh-section rh-scope" aria-labelledby="tm-title">
      <div className="rh-container">
        <h2 id="tm-title" className="rh-tm-title">What patients say</h2>
        <ul className="rh-tm-list">
          {VERIFIED_TESTIMONIALS.map((t) => (
            <li key={t.url} className="rh-panel rh-tm-card" data-branch={t.branch}>
              <blockquote>
                <p>{t.content}</p>
              </blockquote>
              <footer>
                <cite>{t.name}</cite>
                <a href={t.url} target="_blank" rel="noopener noreferrer">
                  Read on Google
                </a>
              </footer>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
