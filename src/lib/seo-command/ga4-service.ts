import { getValidGoogleAccessToken } from './google-oauth';
import type { ConversionEventsSummary } from './types';

const GA4_API_BASE = 'https://analyticsdata.googleapis.com/v1beta';

export interface Ga4OrganicReport {
  activeUsers: number;
  sessions: number;
  engagedSessions: number;
  landingPageSessions: Array<{ pagePath: string; sessions: number }>;
  conversions: ConversionEventsSummary;
}

/**
 * Fetch organic traffic and conversion events from GA4 Data API
 */
export async function queryGa4OrganicReport(
  propertyId: string,
  startDate: string,
  endDate: string,
): Promise<Ga4OrganicReport | null> {
  const token = await getValidGoogleAccessToken();
  if (!token) return null;

  // Clean propertyId format to "properties/XXXXX"
  const formattedPropertyId = propertyId.startsWith('properties/')
    ? propertyId
    : `properties/${propertyId}`;

  try {
    // 1. Fetch Organic Sessions & Users
    const metricsRes = await fetch(`${GA4_API_BASE}/${formattedPropertyId}:runReport`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        dateRanges: [{ startDate, endDate }],
        dimensions: [{ name: 'sessionDefaultChannelGroup' }],
        dimensionFilter: {
          filter: {
            fieldName: 'sessionDefaultChannelGroup',
            stringFilter: {
              matchType: 'CONTAINS',
              value: 'Organic',
            },
          },
        },
        metrics: [
          { name: 'activeUsers' },
          { name: 'sessions' },
          { name: 'engagedSessions' },
        ],
      }),
    });

    let activeUsers = 0;
    let sessions = 0;
    let engagedSessions = 0;

    if (metricsRes.ok) {
      const data = await metricsRes.json();
      if (data.rows && data.rows.length > 0) {
        for (const row of data.rows) {
          activeUsers += parseInt(row.metricValues?.[0]?.value || '0', 10);
          sessions += parseInt(row.metricValues?.[1]?.value || '0', 10);
          engagedSessions += parseInt(row.metricValues?.[2]?.value || '0', 10);
        }
      }
    }

    // 2. Fetch Conversion Events (phone_click, whatsapp_click, appointment_start, appointment_submit, map_click)
    const eventsRes = await fetch(`${GA4_API_BASE}/${formattedPropertyId}:runReport`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        dateRanges: [{ startDate, endDate }],
        dimensions: [{ name: 'eventName' }],
        dimensionFilter: {
          filter: {
            fieldName: 'sessionDefaultChannelGroup',
            stringFilter: {
              matchType: 'CONTAINS',
              value: 'Organic',
            },
          },
        },
        metrics: [{ name: 'eventCount' }],
      }),
    });

    const conversions: ConversionEventsSummary = {
      phoneClicks: 0,
      whatsappClicks: 0,
      appointmentStarts: 0,
      appointmentSubmissions: 0,
      mapClicks: 0,
      totalConversions: 0,
    };

    if (eventsRes.ok) {
      const data = await eventsRes.json();
      if (data.rows) {
        for (const row of data.rows) {
          const eventName = row.dimensionValues?.[0]?.value;
          const count = parseInt(row.metricValues?.[0]?.value || '0', 10);

          if (eventName === 'phone_click') conversions.phoneClicks += count;
          else if (eventName === 'whatsapp_click') conversions.whatsappClicks += count;
          else if (eventName === 'appointment_start') conversions.appointmentStarts += count;
          else if (eventName === 'appointment_submit') conversions.appointmentSubmissions += count;
          else if (eventName === 'map_click') conversions.mapClicks += count;
        }
      }
      conversions.totalConversions =
        conversions.phoneClicks +
        conversions.whatsappClicks +
        conversions.appointmentSubmissions;
    }

    // 3. Fetch Organic Landing Pages
    const landingPagesRes = await fetch(`${GA4_API_BASE}/${formattedPropertyId}:runReport`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        dateRanges: [{ startDate, endDate }],
        dimensions: [{ name: 'landingPagePlusQueryString' }],
        dimensionFilter: {
          filter: {
            fieldName: 'sessionDefaultChannelGroup',
            stringFilter: {
              matchType: 'CONTAINS',
              value: 'Organic',
            },
          },
        },
        metrics: [{ name: 'sessions' }],
        limit: 100,
      }),
    });

    const landingPageSessions: Array<{ pagePath: string; sessions: number }> = [];
    if (landingPagesRes.ok) {
      const data = await landingPagesRes.json();
      if (data.rows) {
        for (const row of data.rows) {
          const pagePath = row.dimensionValues?.[0]?.value?.split('?')[0] || '/';
          const pSessions = parseInt(row.metricValues?.[0]?.value || '0', 10);
          landingPageSessions.push({ pagePath, sessions: pSessions });
        }
      }
    }

    return {
      activeUsers,
      sessions,
      engagedSessions,
      landingPageSessions,
      conversions,
    };
  } catch (error) {
    console.error('[GA4 Data API] Query exception:', error);
    return null;
  }
}
