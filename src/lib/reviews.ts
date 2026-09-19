// Live Google review data per branch (server only).
//
// Returns null unless the Places API responds. No cached or seeded ratings:
// review markup must reflect the live listing (Google structured data policy).
//
// Requires GOOGLE_PLACES_API_KEY and a `placeId` per branch in branches.ts.

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

/** Revalidate hourly. */
const REVALIDATE_SECONDS = 3600;

export async function getBranchRating(branch: BranchId): Promise<BranchRating | null> {
  const key = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = BRANCHES[branch].placeId;

  // Not configured.
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

    // No ratings yet.
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
