import type { AuthorityGuide } from '@/data/guides/implantGuides';

export type IntegrationStatus = 'connected' | 'not_connected' | 'pending_access' | 'error';

export interface GoogleIntegrationConfig {
  connected: boolean;
  gscSiteUrl: string | null;
  ga4PropertyId: string | null;
  gbpAccountId: string | null;
  gbpBananiLocationId: string | null;
  gbpBanasreeLocationId: string | null;
  gbpStatus: IntegrationStatus;
  lastSyncAt: string | null;
  lastSyncStatus: 'success' | 'partial' | 'error' | null;
  lastError: string | null;
  baselineDate: string | null;
}

export interface DateRangeComparison {
  label: string;
  startDate: string;
  endDate: string;
  prevStartDate: string;
  prevEndDate: string;
}

export interface MetricWithChange {
  current: number;
  previous: number;
  change: number; // current - previous
  percentageChange: number | null; // null if previous === 0
}

export interface SearchVisibilitySummary {
  impressions: MetricWithChange;
  clicks: MetricWithChange;
  ctr: MetricWithChange; // represented as percentage e.g. 3.4
  avgPosition: MetricWithChange; // e.g. 14.2
  top3QueriesCount: number;
  top10QueriesCount: number;
  top20QueriesCount: number;
  organicLeads: MetricWithChange;
}

export interface KeywordPerformanceRow {
  query: string;
  clicks: number;
  impressions: number;
  ctr: number;
  avgPosition: number;
  previousPosition: number | null;
  positionChange: number | null;
  landingPage: string | null;
  language: 'en' | 'bn';
  cluster: string;
  isBranded: boolean;
}

export interface QueryOpportunity {
  type: 'striking_distance' | 'high_impression_low_ctr' | 'improving' | 'declining' | 'new_query';
  query: string;
  currentPosition: number;
  impressions: number;
  ctr: number;
  landingPage?: string;
  recommendation: string;
}

export interface SeoWin {
  id: string;
  type: 'growth' | 'rank' | 'local' | 'content';
  title: string;
  description: string;
  metric?: string;
}

export interface SeoAttentionItem {
  id: string;
  severity: 'high' | 'medium' | 'info';
  category: 'technical' | 'content' | 'visibility' | 'performance' | 'local';
  title: string;
  description: string;
  actionRecommendation: string;
}

export interface PagePerformanceRow {
  path: string;
  title?: string;
  clicks: number;
  impressions: number;
  ctr: number;
  avgPosition: number;
  organicSessions: number;
  leads: number;
  group: 'core_treatment' | 'doctor' | 'branch' | 'english_guide' | 'bangla_guide' | 'other';
  language: 'en' | 'bn';
  status?: 'live' | 'review' | 'draft' | 'core';
  indexStatus?: 'indexed' | 'not_indexed' | 'unchecked';
}

export interface AuthorityPagePerformanceItem extends AuthorityGuide {
  fullUrl: string;
  language: 'en' | 'bn';
  gscClicks: number;
  gscImpressions: number;
  gscCtr: number;
  gscAvgPosition: number;
  indexStatus: 'indexed' | 'not_indexed' | 'unchecked';
  lastCrawledAt?: string;
  daysLive: number;
}

export interface LocalBranchMetrics {
  branchId: 'banani' | 'banasree';
  name: string;
  address: string;
  status: IntegrationStatus;
  searchImpressions: number;
  mapsImpressions: number;
  websiteClicks: number;
  calls: number;
  directionRequests: number;
  totalActions: number;
  searchKeywords: Array<{
    keyword: string;
    monthlyImpressions: number;
  }>;
}

export interface PageSpeedMetricItem {
  path: string;
  url: string;
  performanceScore: number;
  accessibilityScore: number;
  bestPracticesScore: number;
  seoScore: number;
  lcp: string;
  inp: string;
  legacyFid?: string;
  cls: string;
  fieldDataAvailable: boolean;
  labFcp: string;
  labSpeedIndex: string;
  labTbt: string;
  lastCheckedAt: string;
}

export interface InternalAuditSummary {
  timestamp: string;
  routesAudited: number;
  criticalErrors: number;
  warnings: number;
  canonicalIssues: number;
  metadataIssues: number;
  schemaIssues: number;
  hreflangIssues: number;
  sitemapIssues: number;
  brokenInternalLinks: number;
  enLiveCount: number;
  bnLiveCount: number;
  enReviewCount: number;
  bnReviewCount: number;
}

export interface RhSeoHealthScoreBreakdown {
  totalScore: number; // 0-100
  dataCoveragePercentage: number; // 0-100%
  isScoreComplete: boolean;
  missingDataNotes: string[];
  subScores: {
    technicalHealth: { score: number; max: 30; label: string };
    contentArchitecture: { score: number; max: 20; label: string };
    searchVisibility: { score: number; max: 20; label: string };
    userExperience: { score: number; max: 15; label: string };
    localPresence: { score: number; max: 15; label: string };
  };
}

export interface ConversionEventsSummary {
  phoneClicks: number;
  whatsappClicks: number;
  appointmentStarts: number;
  appointmentSubmissions: number;
  mapClicks: number;
  totalConversions: number;
}

export interface SeoFunnelStep {
  label: string;
  count: number;
  conversionRate: number | null; // % from previous step
}

export interface SeoCommandCenterData {
  config: GoogleIntegrationConfig;
  dateRange: DateRangeComparison;
  healthScore: RhSeoHealthScoreBreakdown;
  visibility: SearchVisibilitySummary;
  keywords: KeywordPerformanceRow[];
  opportunities: QueryOpportunity[];
  wins: SeoWin[];
  attentionItems: SeoAttentionItem[];
  pages: PagePerformanceRow[];
  authorityContent: AuthorityPagePerformanceItem[];
  local: {
    banani: LocalBranchMetrics;
    banasree: LocalBranchMetrics;
  };
  conversions: ConversionEventsSummary;
  funnel: SeoFunnelStep[];
  pageSpeed: PageSpeedMetricItem[];
  audit: InternalAuditSummary;
  historicalSnapshots: Array<{
    date: string;
    impressions: number;
    clicks: number;
    avgPosition: number;
    leads: number;
    healthScore: number;
  }>;
}
