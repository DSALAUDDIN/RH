import type {
  KeywordPerformanceRow,
  PagePerformanceRow,
  AuthorityPagePerformanceItem,
  LocalBranchMetrics,
} from './types';

function escapeCsvField(field: unknown): string {
  if (field === null || field === undefined) return '""';
  const str = String(field);
  return `"${str.replace(/"/g, '""')}"`;
}

export function exportQueriesToCsv(keywords: KeywordPerformanceRow[]): string {
  const headers = [
    'Query',
    'Clicks',
    'Impressions',
    'CTR (%)',
    'Average Google Position',
    'Previous Position',
    'Position Change',
    'Language',
    'Cluster',
    'Is Branded',
    'Landing Page',
  ];

  const rows = keywords.map((k) => [
    escapeCsvField(k.query),
    k.clicks,
    k.impressions,
    k.ctr,
    k.avgPosition,
    k.previousPosition ?? 'N/A',
    k.positionChange ?? 'N/A',
    escapeCsvField(k.language),
    escapeCsvField(k.cluster),
    k.isBranded ? 'Yes' : 'No',
    escapeCsvField(k.landingPage || ''),
  ]);

  return [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
}

export function exportPagesToCsv(pages: PagePerformanceRow[]): string {
  const headers = [
    'URL Path',
    'Page Title',
    'Group',
    'Language',
    'Status',
    'Clicks',
    'Impressions',
    'CTR (%)',
    'Average Position',
    'Organic Sessions',
    'Leads',
  ];

  const rows = pages.map((p) => [
    escapeCsvField(p.path),
    escapeCsvField(p.title || ''),
    escapeCsvField(p.group),
    escapeCsvField(p.language),
    escapeCsvField(p.status || ''),
    p.clicks,
    p.impressions,
    p.ctr,
    p.avgPosition,
    p.organicSessions,
    p.leads,
  ]);

  return [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
}

export function exportAuthorityContentToCsv(items: AuthorityPagePerformanceItem[]): string {
  const headers = [
    'Slug',
    'Language',
    'Title',
    'Full URL',
    'Status',
    'Category',
    'Published Date',
    'Days Live',
    'Clicks',
    'Impressions',
    'CTR (%)',
    'Average Position',
    'Medically Reviewed',
    'Reviewer',
  ];

  const rows = items.map((a) => [
    escapeCsvField(a.slug),
    escapeCsvField(a.language),
    escapeCsvField(a.title),
    escapeCsvField(a.fullUrl),
    escapeCsvField(a.status),
    escapeCsvField(a.category),
    escapeCsvField(a.publishedAt),
    a.daysLive,
    a.gscClicks,
    a.gscImpressions,
    a.gscCtr,
    a.gscAvgPosition,
    a.medicallyReviewed ? 'Yes' : 'No',
    escapeCsvField(a.reviewer || 'N/A'),
  ]);

  return [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
}

export function exportLocalPerformanceToCsv(
  banani: LocalBranchMetrics,
  banasree: LocalBranchMetrics,
): string {
  const headers = [
    'Branch',
    'Status',
    'Search Impressions',
    'Maps Impressions',
    'Website Clicks',
    'Calls',
    'Direction Requests',
    'Total Actions',
  ];

  const rows = [banani, banasree].map((b) => [
    escapeCsvField(b.name),
    escapeCsvField(b.status),
    b.searchImpressions,
    b.mapsImpressions,
    b.websiteClicks,
    b.calls,
    b.directionRequests,
    b.totalActions,
  ]);

  return [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
}
