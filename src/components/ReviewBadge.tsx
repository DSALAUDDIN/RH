// src/components/ReviewBadge.tsx
//
// Renders the branch's real Google rating, or nothing at all.
// There is deliberately no placeholder, no skeleton and no "coming soon" state —
// an empty space is honest; an invented number is not.
//
// Server component. Replaces every hardcoded claim badge on the site
// (the 13k+ patient counters, the "500+ reviews" line, the 4.9-star block).
// See docs/audit-report.md P2-2.

import { Star } from 'lucide-react';
import { BranchId } from '@/lib/branches';
import { getBranchRating } from '@/lib/reviews';
import './ReviewBadge.css';

export default async function ReviewBadge({
  branch,
  className = '',
}: {
  branch: BranchId;
  className?: string;
}) {
  const data = await getBranchRating(branch);
  if (!data) return null;

  const rounded = data.rating.toFixed(1);
  const label = `Rated ${rounded} out of 5 from ${data.count} Google ${
    data.count === 1 ? 'review' : 'reviews'
  }`;

  return (
    <a
      className={`rh-review-badge ${className}`}
      href={data.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${label}. Opens the Google listing in a new tab.`}
    >
      <span className="rh-review-stars" aria-hidden="true">
        {[0, 1, 2, 3, 4].map((i) => (
          <Star
            key={i}
            size={14}
            strokeWidth={1.5}
            className={i < Math.round(data.rating) ? 'is-filled' : ''}
          />
        ))}
      </span>
      <span className="rh-review-value">{rounded}</span>
      <span className="rh-review-count">
        {data.count} Google {data.count === 1 ? 'review' : 'reviews'}
      </span>
    </a>
  );
}
