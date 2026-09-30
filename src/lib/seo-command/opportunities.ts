import type {
  KeywordPerformanceRow,
  QueryOpportunity,
  SeoWin,
  SeoAttentionItem,
  InternalAuditSummary,
  GoogleIntegrationConfig,
  SearchVisibilitySummary,
  LocalBranchMetrics,
} from './types';

const BENGALI_REGEX = /[\u0980-\u09FF]/;
const BRAND_TERMS = ['rh', 'rh dental', 'rh dental care', 'r h dental', 'rafiqul hasan', 'dr hasan'];

/**
 * Classify a search query into language, cluster, and brand
 */
export function classifyQuery(query: string): {
  language: 'en' | 'bn';
  cluster: string;
  isBranded: boolean;
} {
  const q = query.toLowerCase();
  const isBn = BENGALI_REGEX.test(query);

  let isBranded = false;
  for (const b of BRAND_TERMS) {
    if (q.includes(b)) {
      isBranded = true;
      break;
    }
  }

  let cluster = 'general';
  if (isBranded) {
    cluster = 'brand';
  } else if (q.includes('implant') || q.includes('ইমপ্লান্ট')) {
    cluster = 'implant';
  } else if (q.includes('root canal') || q.includes('রুট ক্যানেল') || q.includes('rct')) {
    cluster = 'root-canal';
  } else if (
    q.includes('brace') ||
    q.includes('aligner') ||
    q.includes('ব্রেস') ||
    q.includes('অ্যালাইনার') ||
    q.includes('orthodontic')
  ) {
    cluster = 'orthodontics';
  } else if (
    q.includes('zirconia') ||
    q.includes('crown') ||
    q.includes('veneer') ||
    q.includes('জিরকোনিয়া') ||
    q.includes('ক্রাউন') ||
    q.includes('ভিনিয়ার')
  ) {
    cluster = 'zirconia';
  } else if (
    q.includes('wisdom') ||
    q.includes('surgery') ||
    q.includes('cbct') ||
    q.includes('আক্কেল দাঁত') ||
    q.includes('সার্জারি')
  ) {
    cluster = 'surgery';
  } else if (q.includes('banani') || q.includes('বনানী')) {
    cluster = 'banani';
  } else if (q.includes('banasree') || q.includes('বনশ্রী')) {
    cluster = 'banasree';
  }

  return {
    language: isBn ? 'bn' : 'en',
    cluster,
    isBranded,
  };
}

/**
 * Discover query opportunities based on GSC metrics
 */
export function generateQueryOpportunities(keywords: KeywordPerformanceRow[]): QueryOpportunity[] {
  const opportunities: QueryOpportunity[] = [];

  for (const kw of keywords) {
    // 1. Striking Distance (Position 4-15 with meaningful impressions >= 10)
    if (kw.avgPosition >= 4 && kw.avgPosition <= 15 && kw.impressions >= 10) {
      opportunities.push({
        type: 'striking_distance',
        query: kw.query,
        currentPosition: kw.avgPosition,
        impressions: kw.impressions,
        ctr: kw.ctr,
        landingPage: kw.landingPage || undefined,
        recommendation:
          'Potential page-1 / top-3 visibility opportunity: reinforce internal links from topically relevant authority guides and verify search intent alignment.',
      });
    }

    // 2. High Impression, Low CTR (Impressions >= 25, CTR < 2.0%)
    if (kw.impressions >= 25 && kw.ctr < 2.0) {
      opportunities.push({
        type: 'high_impression_low_ctr',
        query: kw.query,
        currentPosition: kw.avgPosition,
        impressions: kw.impressions,
        ctr: kw.ctr,
        landingPage: kw.landingPage || undefined,
        recommendation:
          'High search impressions with below-average CTR: inspect landing page title tag, meta description, and schema markup to improve SERP snippet appeal.',
      });
    }

    // 3. Position Improving
    if (kw.positionChange !== null && kw.positionChange < -1.5 && kw.impressions >= 10) {
      opportunities.push({
        type: 'improving',
        query: kw.query,
        currentPosition: kw.avgPosition,
        impressions: kw.impressions,
        ctr: kw.ctr,
        landingPage: kw.landingPage || undefined,
        recommendation: `Position improved by ${Math.abs(kw.positionChange).toFixed(1)} spots vs prior period. Continue monitoring clinical relevance.`,
      });
    }

    // 4. Position Declining
    if (kw.positionChange !== null && kw.positionChange > 2.0 && kw.impressions >= 15) {
      opportunities.push({
        type: 'declining',
        query: kw.query,
        currentPosition: kw.avgPosition,
        impressions: kw.impressions,
        ctr: kw.ctr,
        landingPage: kw.landingPage || undefined,
        recommendation: `Average position dropped by ${kw.positionChange.toFixed(1)} spots. Check for content freshness or newly competing search results.`,
      });
    }
  }

  return opportunities.slice(0, 20); // Top 20 actionable opportunities
}

/**
 * Generate factual SEO Wins based on real data
 */
export function generateSeoWins(params: {
  visibility: SearchVisibilitySummary;
  audit: InternalAuditSummary;
  banani: LocalBranchMetrics;
  banasree: LocalBranchMetrics;
}): SeoWin[] {
  const { visibility, audit, banani, banasree } = params;
  const wins: SeoWin[] = [];

  // Content Architecture Win
  const totalAssets = audit.enLiveCount + audit.bnLiveCount + audit.enReviewCount + audit.bnReviewCount;
  if (totalAssets >= 80) {
    wins.push({
      id: 'content-80',
      type: 'content',
      title: 'Dual-Language Authority Architecture Active',
      description: '80 comprehensive first-party educational guides built across English and Native বাংলা with 1-to-1 slug equivalence.',
      metric: '80 assets',
    });
  }

  // Technical SEO Win
  if (audit.criticalErrors === 0) {
    wins.push({
      id: 'tech-zero-errors',
      type: 'rank',
      title: 'Zero Critical Technical SEO Errors',
      description: 'All 181 routes validated with correct self-canonical headers, valid JSON-LD schemas, and bidirectional hreflang tags.',
      metric: '0 errors',
    });
  }

  // Search Visibility Growth Wins (if GSC connected)
  if (visibility.impressions.percentageChange && visibility.impressions.percentageChange > 0) {
    wins.push({
      id: 'gsc-impressions-growth',
      type: 'growth',
      title: 'Organic Search Impressions Gained',
      description: `Search Console recorded a ${visibility.impressions.percentageChange.toFixed(1)}% increase in Google search impressions.`,
      metric: `+${visibility.impressions.percentageChange.toFixed(1)}%`,
    });
  }

  if (visibility.clicks.percentageChange && visibility.clicks.percentageChange > 0) {
    wins.push({
      id: 'gsc-clicks-growth',
      type: 'growth',
      title: 'Organic Click Growth',
      description: `Organic website clicks increased by ${visibility.clicks.percentageChange.toFixed(1)}% compared to the previous period.`,
      metric: `+${visibility.clicks.percentageChange.toFixed(1)}%`,
    });
  }

  // Local Actions Win
  const totalLocalActions = banani.totalActions + banasree.totalActions;
  if (totalLocalActions > 0) {
    wins.push({
      id: 'local-actions-active',
      type: 'local',
      title: 'Google Business Profile Actions Recorded',
      description: `${totalLocalActions} total local actions (calls, directions, website visits) tracked across Banani and Banasree.`,
      metric: `${totalLocalActions} actions`,
    });
  }

  return wins;
}

/**
 * Generate SEO Attention Items
 */
export function generateSeoAttentionItems(params: {
  config: GoogleIntegrationConfig;
  audit: InternalAuditSummary;
  keywords: KeywordPerformanceRow[];
}): SeoAttentionItem[] {
  const { config, audit, keywords } = params;
  const items: SeoAttentionItem[] = [];

  // Integration Alerts
  if (!config.connected) {
    items.push({
      id: 'gsc-disconnected',
      severity: 'high',
      category: 'visibility',
      title: 'Google Search Console Not Connected',
      description: 'OAuth connection is pending. Connect Search Console to unlock real-time query positions, CTR, and search impression data.',
      actionRecommendation: 'Click "Connect Google Account" in the Integrations panel to authorize read-only Search Console access.',
    });
  }

  if (config.gbpStatus === 'not_connected') {
    items.push({
      id: 'gbp-disconnected',
      severity: 'medium',
      category: 'local',
      title: 'Google Business Profile Not Connected',
      description: 'Local Maps performance metrics for Banani and Banasree are waiting for account connection.',
      actionRecommendation: 'Ensure Google Account with manager access to Banani and Banasree listings is authorized.',
    });
  } else if (config.gbpStatus === 'pending_access') {
    items.push({
      id: 'gbp-pending',
      severity: 'info',
      category: 'local',
      title: 'Google Business Profile API Approval Pending',
      description: 'The Performance API request has been initiated and is awaiting Google project quota authorization.',
      actionRecommendation: 'Check Google Cloud Console → APIs & Services → Business Profile Performance API quota status.',
    });
  }

  // Audit Alerts
  if (audit.warnings > 0) {
    items.push({
      id: 'audit-warnings',
      severity: 'medium',
      category: 'technical',
      title: `${audit.warnings} Technical SEO Warning(s) Flagged`,
      description: 'The repository audit identified minor content or metadata warnings (e.g. word count thresholds).',
      actionRecommendation: 'Review the Internal Audit section for specific routes and recommended copy adjustments.',
    });
  }

  // High Impression Low CTR Alert
  const lowCtrKws = keywords.filter((k) => k.impressions >= 30 && k.ctr < 1.5);
  if (lowCtrKws.length > 0) {
    items.push({
      id: 'low-ctr-queries',
      severity: 'medium',
      category: 'visibility',
      title: `${lowCtrKws.length} High-Impression Queries With Low CTR`,
      description: `Keywords like "${lowCtrKws[0].query}" receive strong search impressions but below 1.5% click-through rate.`,
      actionRecommendation: 'Optimize page titles and meta descriptions with clearer patient value propositions.',
    });
  }

  return items;
}
