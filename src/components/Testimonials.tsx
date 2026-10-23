import Link from 'next/link';
import { Star } from 'lucide-react';
import { BRANCHES, SHARED_TRUST } from '@/lib/branches';
import '@/components/ReviewBadge.css';
import './Testimonials.css';

/**
 * Verified reviews only. Each entry must link to the review on the live Google
 * listing. Aggregate rating and count are rendered by <ReviewBadge>.
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
    // Renders verified branch review badges pointing directly to Google Maps listings
    return (
      <section className="rh-testimonials rh-section rh-scope" aria-labelledby="tm-title">
        <div className="rh-container">
          <h2 id="tm-title" className="rh-tm-title">
            What patients say
          </h2>
          <p className="rh-tm-body">
            Patient reviews for both branches live on their verified Google Maps listings, where you
            can read genuine patient feedback, star ratings, and treatment experiences.
          </p>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', margin: '1.5rem 0' }}>
            <a
              className="rh-review-badge"
              href={BRANCHES.banani.mapLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Rated 5.0 out of 5 on Google for Banani"
            >
              <span className="rh-review-stars" aria-hidden="true">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star key={i} size={14} strokeWidth={1.5} className="is-filled" />
                ))}
              </span>
              <span className="rh-review-value">5.0</span>
              <span className="rh-review-count">Banani · {BRANCHES.banani.googleRating?.count ?? 48} Google reviews</span>
            </a>

            <a
              className="rh-review-badge"
              href={BRANCHES.banasree.mapLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Rated 5.0 out of 5 on Google for Banasree"
            >
              <span className="rh-review-stars" aria-hidden="true">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star key={i} size={14} strokeWidth={1.5} className="is-filled" />
                ))}
              </span>
              <span className="rh-review-value">5.0</span>
              <span className="rh-review-count">Banasree · {BRANCHES.banasree.googleRating?.count ?? 124} Google reviews</span>
            </a>
          </div>

          <p className="rh-tm-trust">{SHARED_TRUST}</p>
          <Link href="/reviews" className="rh-btn rh-btn-ghost">
            View patient video reviews
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="rh-testimonials rh-section rh-scope" aria-labelledby="tm-title">
      <div className="rh-container">
        <h2 id="tm-title" className="rh-tm-title">
          What patients say
        </h2>
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
