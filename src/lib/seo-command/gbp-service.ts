import { getValidGoogleAccessToken } from './google-oauth';
import type { LocalBranchMetrics } from './types';

const GBP_API_BASE = 'https://businessprofileperformance.googleapis.com/v1';

export async function fetchBranchGbpMetrics(
  branchId: 'banani' | 'banasree',
  locationId: string | null,
  startDate: { year: number; month: number; day: number },
  endDate: { year: number; month: number; day: number },
): Promise<LocalBranchMetrics> {
  const branchName = branchId === 'banani' ? 'Banani Private Suite' : 'Banasree Dental Center';
  const branchAddress =
    branchId === 'banani'
      ? 'Level 7, B&B Empire, Plot 116, Road 11, Block E, Banani'
      : 'House 15, Road 4, Block C (Main Road), Banasree';

  const defaultResult: LocalBranchMetrics = {
    branchId,
    name: branchName,
    address: branchAddress,
    status: 'not_connected',
    searchImpressions: 0,
    mapsImpressions: 0,
    websiteClicks: 0,
    calls: 0,
    directionRequests: 0,
    totalActions: 0,
    searchKeywords: [],
  };

  if (!locationId) {
    return defaultResult;
  }

  const token = await getValidGoogleAccessToken();
  if (!token) {
    return defaultResult;
  }

  try {
    const formattedLocation = locationId.startsWith('locations/')
      ? locationId
      : `locations/${locationId}`;

    const res = await fetch(
      `${GBP_API_BASE}/${formattedLocation}:fetchMultiDailyMetricsTimeSeries`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          dailyMetrics: [
            'BUSINESS_IMPRESSIONS_DESKTOP_MAPS',
            'BUSINESS_IMPRESSIONS_DESKTOP_SEARCH',
            'BUSINESS_IMPRESSIONS_MOBILE_MAPS',
            'BUSINESS_IMPRESSIONS_MOBILE_SEARCH',
            'CALL_CLICKS',
            'WEBSITE_CLICKS',
            'BUSINESS_DIRECTION_REQUESTS',
          ],
          dailyRange: {
            startDate,
            endDate,
          },
        }),
      },
    );

    if (res.status === 403 || res.status === 429) {
      // Access pending or quota awaiting Google approval
      return {
        ...defaultResult,
        status: 'pending_access',
      };
    }

    if (!res.ok) {
      console.warn(`[GBP API] Failed to fetch metrics for ${branchId} (${res.status}): ${res.statusText}`);
      return {
        ...defaultResult,
        status: 'error',
      };
    }

    const data = await res.json();
    let searchImpressions = 0;
    let mapsImpressions = 0;
    let websiteClicks = 0;
    let calls = 0;
    let directionRequests = 0;

    if (data.multiDailyMetricTimeSeries) {
      for (const series of data.multiDailyMetricTimeSeries) {
        const metric = series.dailyMetric;
        const total =
          series.dailyMetricTimeSeries?.reduce(
            (acc: number, item: { value?: string }) => acc + parseInt(item.value || '0', 10),
            0,
          ) || 0;

        if (metric?.includes('SEARCH')) searchImpressions += total;
        if (metric?.includes('MAPS')) mapsImpressions += total;
        if (metric === 'WEBSITE_CLICKS') websiteClicks += total;
        if (metric === 'CALL_CLICKS') calls += total;
        if (metric === 'BUSINESS_DIRECTION_REQUESTS') directionRequests += total;
      }
    }

    // Fetch monthly search keywords if available
    let searchKeywords: Array<{ keyword: string; monthlyImpressions: number }> = [];
    try {
      const kwRes = await fetch(
        `${GBP_API_BASE}/${formattedLocation}/searchkeywords/impressions/monthly`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      if (kwRes.ok) {
        const kwData = await kwRes.json();
        if (kwData.searchKeywordsCounts) {
          searchKeywords = kwData.searchKeywordsCounts.map(
            (k: { searchKeyword?: string; insightsValue?: { value?: string } }) => ({
              keyword: k.searchKeyword || '',
              monthlyImpressions: parseInt(k.insightsValue?.value || '0', 10),
            }),
          );
        }
      }
    } catch {
      // Keywords endpoint optional
    }

    return {
      branchId,
      name: branchName,
      address: branchAddress,
      status: 'connected',
      searchImpressions,
      mapsImpressions,
      websiteClicks,
      calls,
      directionRequests,
      totalActions: websiteClicks + calls + directionRequests,
      searchKeywords,
    };
  } catch (error) {
    console.error(`[GBP API] Exception fetching metrics for ${branchId}:`, error);
    return {
      ...defaultResult,
      status: 'error',
    };
  }
}
