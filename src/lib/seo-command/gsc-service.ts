import { getValidGoogleAccessToken } from './google-oauth';

const GSC_API_BASE = 'https://www.googleapis.com/webmasters/v3';
const URL_INSPECTION_BASE = 'https://searchconsole.googleapis.com/v1/urlInspection/index:inspect';

export interface GscQueryItem {
  keys: string[];
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

export interface GscSearchAnalyticsResponse {
  rows?: GscQueryItem[];
}

/**
 * List verified Google Search Console properties accessible to the authenticated account
 */
export async function listGscSites(): Promise<Array<{ siteUrl: string; permissionLevel: string }>> {
  const token = await getValidGoogleAccessToken();
  if (!token) return [];

  try {
    const res = await fetch(`${GSC_API_BASE}/sites`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) {
      console.warn(`[GSC] Failed to list sites: ${res.statusText}`);
      return [];
    }

    const data = await res.json();
    return data.siteEntry || [];
  } catch (error) {
    console.error('[GSC] Error listing sites:', error);
    return [];
  }
}

/**
 * Query Search Console Search Analytics API
 */
export async function queryGscSearchAnalytics(params: {
  siteUrl: string;
  startDate: string;
  endDate: string;
  dimensions: ('query' | 'page' | 'device' | 'country' | 'date')[];
  rowLimit?: number;
  country?: string;
  device?: string;
}): Promise<GscQueryItem[]> {
  const token = await getValidGoogleAccessToken();
  if (!token) return [];

  const body: Record<string, unknown> = {
    startDate: params.startDate,
    endDate: params.endDate,
    dimensions: params.dimensions,
    rowLimit: params.rowLimit || 250,
  };

  const dimensionFilterGroups: Array<{
    filters: Array<{
      dimension: string;
      operator: string;
      expression: string;
    }>;
  }> = [];

  if (params.country && params.country !== 'all') {
    dimensionFilterGroups.push({
      filters: [{ dimension: 'country', operator: 'equals', expression: params.country }],
    });
  }

  if (params.device && params.device !== 'all') {
    dimensionFilterGroups.push({
      filters: [{ dimension: 'device', operator: 'equals', expression: params.device }],
    });
  }

  if (dimensionFilterGroups.length > 0) {
    body.dimensionFilterGroups = dimensionFilterGroups;
  }

  try {
    const res = await fetch(
      `${GSC_API_BASE}/sites/${encodeURIComponent(params.siteUrl)}/searchAnalytics/query`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      },
    );

    if (!res.ok) {
      const err = await res.text();
      console.warn(`[GSC] Query failed (${res.status}):`, err);
      return [];
    }

    const data: GscSearchAnalyticsResponse = await res.json();
    return data.rows || [];
  } catch (error) {
    console.error('[GSC] Query exception:', error);
    return [];
  }
}

// In-memory inspection cache with 24-hour expiration to respect quota limits
const urlInspectionCache = new Map<string, { data: UrlInspectionResult; timestamp: number }>();
const CACHE_TTL_MS = 24 * 60 * 60 * 1000;

export interface UrlInspectionResult {
  inspectionUrl: string;
  verdict: 'PASS' | 'PARTIAL' | 'FAIL' | 'NEUTRAL';
  coverageState?: string;
  robotsTxtState?: string;
  indexingState?: string;
  lastCrawlTime?: string;
  pageFetchState?: string;
  googleCanonical?: string;
  userCanonical?: string;
  crawledAs?: string;
}

/**
 * Inspect a specific URL via Google URL Inspection API with rate-limit and caching protection.
 */
export async function inspectUrl(
  siteUrl: string,
  inspectionUrl: string,
): Promise<UrlInspectionResult | null> {
  const cached = urlInspectionCache.get(inspectionUrl);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
    return cached.data;
  }

  const token = await getValidGoogleAccessToken();
  if (!token) return null;

  try {
    const res = await fetch(URL_INSPECTION_BASE, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inspectionUrl,
        siteUrl,
      }),
    });

    if (!res.ok) {
      return null;
    }

    const data = await res.json();
    const result = data.inspectionResult?.indexStatusResult;

    if (!result) return null;

    const parsed: UrlInspectionResult = {
      inspectionUrl,
      verdict: result.verdict || 'NEUTRAL',
      coverageState: result.coverageState,
      robotsTxtState: result.robotsTxtState,
      indexingState: result.indexingState,
      lastCrawlTime: result.lastCrawlTime,
      pageFetchState: result.pageFetchState,
      googleCanonical: result.googleCanonical,
      userCanonical: result.userCanonical,
      crawledAs: result.crawledAs,
    };

    urlInspectionCache.set(inspectionUrl, { data: parsed, timestamp: Date.now() });
    return parsed;
  } catch (error) {
    console.error('[GSC URL Inspection] Error inspecting URL:', error);
    return null;
  }
}
