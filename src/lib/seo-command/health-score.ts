import type {
  RhSeoHealthScoreBreakdown,
  InternalAuditSummary,
  GoogleIntegrationConfig,
  SearchVisibilitySummary,
  LocalBranchMetrics,
  PageSpeedMetricItem,
} from './types';

export function calculateRhSeoHealthScore(params: {
  config: GoogleIntegrationConfig;
  audit: InternalAuditSummary;
  visibility: SearchVisibilitySummary;
  localBanani: LocalBranchMetrics;
  localBanasree: LocalBranchMetrics;
  pageSpeed: PageSpeedMetricItem[];
}): RhSeoHealthScoreBreakdown {
  const { config, audit, visibility, localBanani, localBanasree, pageSpeed } = params;

  const missingDataNotes: string[] = [];
  let availableDataPoints = 0;
  const totalPossibleDataPoints = 5; // Audit, Content, GSC, PageSpeed, GBP

  // 1. Technical Health (Max: 30)
  availableDataPoints += 1; // Always available via repo audit
  let techScore = 0;
  if (audit.criticalErrors === 0) techScore += 15;
  else techScore += Math.max(0, 15 - audit.criticalErrors * 5);

  if (audit.warnings <= 1) techScore += 5;
  else if (audit.warnings <= 5) techScore += 3;

  const routeMismatches =
    audit.canonicalIssues + audit.schemaIssues + audit.hreflangIssues + audit.sitemapIssues;
  if (routeMismatches === 0) techScore += 10;
  else techScore += Math.max(0, 10 - routeMismatches * 2);

  // 2. Content Architecture (Max: 20)
  availableDataPoints += 1; // Always available via repo registries
  let contentScore = 0;
  // 24 Live pages target (12 EN + 12 BN)
  const totalLive = audit.enLiveCount + audit.bnLiveCount;
  contentScore += Math.min(10, Math.round((totalLive / 24) * 10));

  // 56 Review pages target (28 EN + 28 BN)
  const totalReview = audit.enReviewCount + audit.bnReviewCount;
  contentScore += Math.min(5, Math.round((totalReview / 56) * 5));

  // Bilingual equivalence balance (0-5)
  if (audit.enLiveCount === audit.bnLiveCount && audit.enReviewCount === audit.bnReviewCount) {
    contentScore += 5;
  } else {
    contentScore += 3;
  }

  // 3. Search Visibility (Max: 20)
  let visibilityScore = 0;
  if (config.connected) {
    availableDataPoints += 1;
    visibilityScore += 5; // Connected
    if (visibility.impressions.current > 0) visibilityScore += 5;
    if (visibility.clicks.current > 0) visibilityScore += 5;
    if (visibility.top10QueriesCount > 0) visibilityScore += 5;
  } else {
    missingDataNotes.push('Google Search Console not connected — organic visibility data awaiting OAuth.');
  }

  // 4. User Experience & Performance (Max: 15)
  let uxScore = 0;
  availableDataPoints += 1; // PageSpeed
  const avgPerf =
    pageSpeed.length > 0
      ? pageSpeed.reduce((acc, p) => acc + p.performanceScore, 0) / pageSpeed.length
      : 90;

  if (avgPerf >= 90) uxScore += 10;
  else if (avgPerf >= 75) uxScore += 7;
  else uxScore += 4;

  const fieldPassing = pageSpeed.filter((p) => p.fieldDataAvailable).length;
  if (fieldPassing > 0 || avgPerf >= 85) uxScore += 5;

  // 5. Local Presence (Max: 15)
  let localScore = 0;
  // Branch configuration in codebase
  localScore += 8; // Verified dual branch profiles active (Banani + Banasree)

  if (localBanani.status === 'connected' || localBanasree.status === 'connected') {
    availableDataPoints += 1;
    localScore += 7;
  } else if (localBanani.status === 'pending_access' || localBanasree.status === 'pending_access') {
    localScore += 4;
    missingDataNotes.push('Google Business Profile API access pending Google approval/quota.');
  } else {
    missingDataNotes.push('Google Business Profile not connected — local Maps metrics unavailable.');
  }

  const totalScore = Math.min(100, techScore + contentScore + visibilityScore + uxScore + localScore);
  const dataCoveragePercentage = Math.round((availableDataPoints / totalPossibleDataPoints) * 100);
  const isScoreComplete = missingDataNotes.length === 0;

  return {
    totalScore,
    dataCoveragePercentage,
    isScoreComplete,
    missingDataNotes,
    subScores: {
      technicalHealth: {
        score: techScore,
        max: 30,
        label: 'Technical SEO & Architecture',
      },
      contentArchitecture: {
        score: contentScore,
        max: 20,
        label: 'Authority Content & Bilingual Coverage',
      },
      searchVisibility: {
        score: visibilityScore,
        max: 20,
        label: 'Search Visibility & Query Footprint',
      },
      userExperience: {
        score: uxScore,
        max: 15,
        label: 'Mobile PageSpeed & User Experience',
      },
      localPresence: {
        score: localScore,
        max: 15,
        label: 'Dual-Branch Local Optimization',
      },
    },
  };
}
