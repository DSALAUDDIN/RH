// src/lib/reviews.ts
//
// Live Google review data, per branch. Server-side only.
//
// HARD RULE: this module returns null unless a real API response comes back.
// There is no cached fallback, no seeded average, no "approximately". A rating
// that is not currently on the live Google listing must not appear on the site
// or in structured data — that is the Google structured-data policy the audit
// flagged (docs/audit-report.md P0-3), and it is also the reason patients who
// check discount everything else on the page.
//
// Setup: set GOOGLE_PLACES_API_KEY and each branch's `placeId` in branches.ts.
// Until both exist, every consumer of this module renders nothing.

import { BRANCHES, BranchId } from './branches';

export interface BranchRating {
  branch: BranchId;
  /** e.g. 4.8 */
  rating: number;
  /** Number of ratings on the live listing. */
  count: number;
  /** Deep link to the listing's reviews. */
  url: string;
  fetchedAt: string;
}

const ENDPOINT = 'https://places.googleapis.com/v1/places';

/** Revalidate hourly. A stale-by-an-hour real number is fine; an invented one is not. */
const REVALIDATE_SECONDS = 3600;

export async function getBranchRating(branch: BranchId): Promise<BranchRating | null> {
  const key = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = BRANCHES[branch].placeId;

  // No key or no place id → no rating. This is the expected state today.
  if (!key || !placeId) return null;

  try {
    const res = await fetch(`${ENDPOINT}/${placeId}`, {
      headers: {
        'X-Goog-Api-Key': key,
        'X-Goog-FieldMask': 'rating,userRatingCount,googleMapsUri',
      },
      next: { revalidate: REVALIDATE_SECONDS },
    });

    if (!res.ok) return null;

    const data = (await res.json()) as {
      rating?: number;
      userRatingCount?: number;
      googleMapsUri?: string;
    };

    // A listing with no ratings yet is not an error — it is simply nothing to show.
    if (typeof data.rating !== 'number' || typeof data.userRatingCount !== 'number') {
      return null;
    }
    if (data.userRatingCount < 1) return null;

    return {
      branch,
      rating: data.rating,
      count: data.userRatingCount,
      url: data.googleMapsUri ?? `https://www.google.com/maps/place/?q=place_id:${placeId}`,
      fetchedAt: new Date().toISOString(),
    };
  } catch {
    return null;
  }
}

/**
 * aggregateRating for JSON-LD — ONLY from a live response.
 * Callers must spread the result and tolerate null:
 *   ...(agg ? { aggregateRating: agg } : {})
 */
export function aggregateRatingFrom(r: BranchRating | null) {
  if (!r) return null;
  return {
    '@type': 'AggregateRating',
    ratingValue: r.rating,
    reviewCount: r.count,
    bestRating: 5,
    worstRating: 1,
  };
}
