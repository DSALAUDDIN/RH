'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Activity,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle2,
  RefreshCw,
  Download,
  ExternalLink,
  ShieldCheck,
  Search,
  Globe,
  MapPin,
  Zap,
  Layers,
  Clock,
  Sparkles,
  ChevronDown,
  Target,
} from 'lucide-react';
import type { SeoCommandCenterData } from '@/lib/seo-command/types';
import './SeoCommandCenter.css';

interface Props {
  initialData: SeoCommandCenterData;
  adminUsername: string;
}

export default function SeoCommandCenter({ initialData, adminUsername }: Props) {
  const [data, setData] = useState<SeoCommandCenterData>(initialData);
  const [activeView, setActiveView] = useState<'client' | 'technical'>('client');
  const [selectedRange, setSelectedRange] = useState<number>(28);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [syncMessage, setSyncMessage] = useState<string | null>(null);

  // Filters
  const [keywordCluster, setKeywordCluster] = useState<string>('all');
  const [authorityLang, setAuthorityLang] = useState<'all' | 'en' | 'bn'>('all');
  const [authorityStatus, setAuthorityStatus] = useState<'all' | 'live' | 'review'>('all');
  const [authoritySearch, setAuthoritySearch] = useState<string>('');
  const [opportunityTab, setOpportunityTab] = useState<string>('all');
  const [exportOpen, setExportOpen] = useState<boolean>(false);

  // Re-fetch data on range change
  const handleRangeChange = async (days: number) => {
    setSelectedRange(days);
    try {
      const res = await fetch(`/api/admin/seo/data?range=${days}`);
      if (res.ok) {
        const newData = await res.json();
        setData(newData);
      }
    } catch (err) {
      console.error('Failed to change date range:', err);
    }
  };

  // Trigger manual sync
  const handleSyncNow = async () => {
    setIsSyncing(true);
    setSyncMessage('Synchronizing Google Search Console, GA4 & GBP...');
    try {
      const res = await fetch('/api/admin/seo/sync', { method: 'POST' });
      const result = await res.json();
      if (res.ok) {
        setSyncMessage('Sync complete! Reloading latest metrics...');
        const refreshed = await fetch(`/api/admin/seo/data?range=${selectedRange}`);
        if (refreshed.ok) {
          setData(await refreshed.json());
        }
      } else {
        setSyncMessage(`Sync failed: ${result.error || 'Server error'}`);
      }
    } catch {
      setSyncMessage('Sync request failed.');
    } finally {
      setIsSyncing(false);
      setTimeout(() => setSyncMessage(null), 4000);
    }
  };

  // Google OAuth initiation
  const handleConnectGoogle = async () => {
    try {
      const res = await fetch('/api/admin/seo/auth/google');
      const json = await res.json();
      if (json.authUrl) {
        window.location.href = json.authUrl;
      } else {
        alert(json.error || 'Could not initiate Google OAuth flow.');
      }
    } catch {
      alert('Network error connecting to Google.');
    }
  };

  // Disconnect Google
  const handleDisconnectGoogle = async () => {
    if (!confirm('Are you sure you want to disconnect Google integrations?')) return;
    try {
      const res = await fetch('/api/admin/seo/auth/google/disconnect', { method: 'POST' });
      if (res.ok) {
        const refreshed = await fetch(`/api/admin/seo/data?range=${selectedRange}`);
        if (refreshed.ok) setData(await refreshed.json());
      }
    } catch {
      alert('Failed to disconnect.');
    }
  };

  // Filtered Keywords
  const filteredKeywords = data.keywords.filter((k) => {
    if (keywordCluster === 'all') return true;
    if (keywordCluster === 'en') return k.language === 'en';
    if (keywordCluster === 'bn') return k.language === 'bn';
    if (keywordCluster === 'brand') return k.isBranded;
    if (keywordCluster === 'non-brand') return !k.isBranded;
    return k.cluster === keywordCluster;
  });

  // Filtered Authority Content (80 items total)
  const filteredAuthority = data.authorityContent.filter((item) => {
    if (authorityLang !== 'all' && item.language !== authorityLang) return false;
    if (authorityStatus !== 'all' && item.status !== authorityStatus) return false;
    if (authoritySearch.trim()) {
      const q = authoritySearch.toLowerCase();
      return (
        item.title.toLowerCase().includes(q) ||
        item.slug.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
      );
    }
    return true;
  });

  // Filtered Opportunities
  const filteredOpportunities = data.opportunities.filter((op) => {
    if (opportunityTab === 'all') return true;
    return op.type === opportunityTab;
  });

  const { healthScore, visibility, local, conversions, config, audit, dateRange } = data;

  return (
    <div className="seo-cc-container">
      {/* Top Navbar */}
      <header className="seo-cc-header">
        <div className="seo-cc-header-inner">
          <div className="seo-cc-brand">
            <div className="seo-cc-logo-badge">RH</div>
            <div className="seo-cc-title-wrap">
              <h1>RH Dental SEO Command Center</h1>
              <div className="seo-cc-domain-pill">
                Primary Domain: <code>https://rhdentalcare.com</code>
                <span style={{ color: '#475569' }}>•</span>
                <span>User: <strong>{adminUsername}</strong></span>
              </div>
            </div>
          </div>

          <div className="seo-cc-controls">
            {/* View Mode Toggle */}
            <div className="seo-cc-view-toggle">
              <button
                type="button"
                className={`seo-cc-view-btn ${activeView === 'client' ? 'active' : ''}`}
                onClick={() => setActiveView('client')}
              >
                Client Summary
              </button>
              <button
                type="button"
                className={`seo-cc-view-btn ${activeView === 'technical' ? 'active' : ''}`}
                onClick={() => setActiveView('technical')}
              >
                Technical & Deep Dive
              </button>
            </div>

            {/* Date Range Selector */}
            <div className="seo-cc-view-toggle">
              {[7, 28, 90].map((days) => (
                <button
                  key={days}
                  type="button"
                  className={`seo-cc-view-btn ${selectedRange === days ? 'active' : ''}`}
                  onClick={() => handleRangeChange(days)}
                >
                  {days}D
                </button>
              ))}
            </div>

            {/* Sync Now */}
            <button
              type="button"
              className="seo-cc-btn"
              onClick={handleSyncNow}
              disabled={isSyncing}
              title="Sync latest Search Console, GA4 & GBP metrics"
            >
              <RefreshCw size={14} className={isSyncing ? 'animate-spin' : ''} />
              <span>{isSyncing ? 'Syncing...' : 'Sync Now'}</span>
            </button>

            {/* CSV Export Dropdown */}
            <div style={{ position: 'relative' }}>
              <button
                type="button"
                className="seo-cc-btn"
                onClick={() => setExportOpen(!exportOpen)}
              >
                <Download size={14} />
                <span>Export CSV</span>
                <ChevronDown size={12} />
              </button>
              {exportOpen && (
                <div
                  style={{
                    position: 'absolute',
                    right: 0,
                    top: '110%',
                    background: '#0f172a',
                    border: '1px solid rgba(255,255,255,0.12)',
                    borderRadius: '8px',
                    padding: '6px',
                    zIndex: 50,
                    boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
                    minWidth: '180px',
                  }}
                >
                  <a
                    href={`/api/admin/seo/export?type=queries&range=${selectedRange}`}
                    download
                    className="seo-cc-btn"
                    style={{ width: '100%', justifyContent: 'flex-start', border: 'none', background: 'none' }}
                    onClick={() => setExportOpen(false)}
                  >
                    Export Queries
                  </a>
                  <a
                    href={`/api/admin/seo/export?type=pages&range=${selectedRange}`}
                    download
                    className="seo-cc-btn"
                    style={{ width: '100%', justifyContent: 'flex-start', border: 'none', background: 'none' }}
                    onClick={() => setExportOpen(false)}
                  >
                    Export Pages
                  </a>
                  <a
                    href={`/api/admin/seo/export?type=content&range=${selectedRange}`}
                    download
                    className="seo-cc-btn"
                    style={{ width: '100%', justifyContent: 'flex-start', border: 'none', background: 'none' }}
                    onClick={() => setExportOpen(false)}
                  >
                    Export 80 Guides
                  </a>
                  <a
                    href={`/api/admin/seo/export?type=local&range=${selectedRange}`}
                    download
                    className="seo-cc-btn"
                    style={{ width: '100%', justifyContent: 'flex-start', border: 'none', background: 'none' }}
                    onClick={() => setExportOpen(false)}
                  >
                    Export GBP Local
                  </a>
                </div>
              )}
            </div>

            {/* Back to General Dashboard */}
            <Link href="/admin/dashboard" className="seo-cc-btn">
              Admin Home
            </Link>
          </div>
        </div>
      </header>

      {/* Main Body */}
      <main className="seo-cc-main">
        {syncMessage && (
          <div
            style={{
              padding: '10px 16px',
              borderRadius: '8px',
              background: 'rgba(2, 132, 199, 0.2)',
              border: '1px solid #0284c7',
              color: '#38bdf8',
              fontSize: '0.85rem',
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <Activity size={16} />
            <span>{syncMessage}</span>
          </div>
        )}

        {/* Info Header Bar */}
        <div className="seo-cc-infobar">
          <div className="seo-cc-infobar-item">
            <Clock size={15} className="text-slate-400" />
            <span>
              Comparing: <strong>{dateRange.startDate}</strong> to <strong>{dateRange.endDate}</strong> vs prior period
            </span>
          </div>
          <div className="seo-cc-infobar-item">
            <span>
              Baseline Date: <strong>{config.baselineDate ? config.baselineDate.split('T')[0] : '2026-09-30'}</strong>
            </span>
          </div>
          <div className="seo-cc-infobar-item">
            <span>
              Last Sync:{' '}
              <strong>
                {config.lastSyncAt
                  ? new Date(config.lastSyncAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                  : 'Pending OAuth'}
              </strong>
            </span>
          </div>
        </div>

        {/* 1. RH SEO Health Score Card */}
        <section className="seo-cc-card">
          <div className="seo-cc-card-header">
            <div>
              <h2 className="seo-cc-card-title">
                <ShieldCheck size={20} className="text-sky-400" />
                <span>RH SEO Health Score</span>
                <span className="seo-cc-badge seo-cc-badge-diagnostic">
                  Internal Diagnostic Score — Not a Google Ranking Score
                </span>
              </h2>
            </div>
            <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
              Data Coverage: <strong style={{ color: '#38bdf8' }}>{healthScore.dataCoveragePercentage}%</strong>
            </div>
          </div>

          <div className="seo-cc-health-grid">
            <div className="seo-cc-health-main">
              <div className="seo-cc-score-num">
                {healthScore.totalScore}
                <span className="seo-cc-score-denom">/100</span>
              </div>
              <div className="seo-cc-score-coverage">
                {healthScore.isScoreComplete ? (
                  <span style={{ color: '#34d399' }}>✓ All 5 Dimensions Connected</span>
                ) : (
                  <span style={{ color: '#fbbf24' }}>
                    Score adjusted for {healthScore.missingDataNotes.length} pending integration(s)
                  </span>
                )}
              </div>
            </div>

            <div className="seo-cc-subscore-list">
              {Object.entries(healthScore.subScores).map(([key, item]) => {
                const pct = Math.round((item.score / item.max) * 100);
                return (
                  <div key={key} className="seo-cc-subscore-item">
                    <div className="seo-cc-subscore-labels">
                      <span>{item.label}</span>
                      <strong>
                        {item.score} / {item.max} ({pct}%)
                      </strong>
                    </div>
                    <div className="seo-cc-progress-bar">
                      <div className="seo-cc-progress-fill" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {healthScore.missingDataNotes.length > 0 && (
            <div
              style={{
                marginTop: '16px',
                padding: '10px 14px',
                borderRadius: '8px',
                background: 'rgba(255,255,255,0.03)',
                fontSize: '0.75rem',
                color: '#94a3b8',
              }}
            >
              <strong style={{ color: '#f8fafc' }}>Diagnostic Note: </strong>
              {healthScore.missingDataNotes.join(' ')}
            </div>
          )}
        </section>

        {/* 2. Hero Search Visibility & Organic Metrics Grid */}
        <section className="seo-cc-metrics-grid">
          <div className="seo-cc-metric-box">
            <div className="seo-cc-metric-label">Google Impressions</div>
            <div className="seo-cc-metric-value">{visibility.impressions.current.toLocaleString()}</div>
            <div className="seo-cc-metric-change">
              {visibility.impressions.percentageChange !== null ? (
                visibility.impressions.percentageChange >= 0 ? (
                  <span className="seo-cc-change-pos">
                    <TrendingUp size={13} style={{ display: 'inline', marginRight: '2px' }} />
                    +{visibility.impressions.percentageChange.toFixed(1)}% vs prior period
                  </span>
                ) : (
                  <span className="seo-cc-change-neg">
                    <TrendingDown size={13} style={{ display: 'inline', marginRight: '2px' }} />
                    {visibility.impressions.percentageChange.toFixed(1)}% vs prior period
                  </span>
                )
              ) : (
                <span className="seo-cc-change-neutral">Awaiting historical comparison</span>
              )}
            </div>
          </div>

          <div className="seo-cc-metric-box">
            <div className="seo-cc-metric-label">Organic Clicks</div>
            <div className="seo-cc-metric-value">{visibility.clicks.current.toLocaleString()}</div>
            <div className="seo-cc-metric-change">
              {visibility.clicks.percentageChange !== null ? (
                visibility.clicks.percentageChange >= 0 ? (
                  <span className="seo-cc-change-pos">
                    <TrendingUp size={13} style={{ display: 'inline', marginRight: '2px' }} />
                    +{visibility.clicks.percentageChange.toFixed(1)}% vs prior
                  </span>
                ) : (
                  <span className="seo-cc-change-neg">
                    <TrendingDown size={13} style={{ display: 'inline', marginRight: '2px' }} />
                    {visibility.clicks.percentageChange.toFixed(1)}%
                  </span>
                )
              ) : (
                <span className="seo-cc-change-neutral">Baseline recording</span>
              )}
            </div>
          </div>

          <div className="seo-cc-metric-box">
            <div className="seo-cc-metric-label">Avg Google Position</div>
            <div className="seo-cc-metric-value">
              {visibility.avgPosition.current > 0 ? visibility.avgPosition.current.toFixed(1) : '—'}
            </div>
            <div className="seo-cc-metric-change">
              <span className="seo-cc-change-neutral">Search Analytics average across all queries</span>
            </div>
          </div>

          <div className="seo-cc-metric-box">
            <div className="seo-cc-metric-label">Average CTR</div>
            <div className="seo-cc-metric-value">{visibility.ctr.current.toFixed(1)}%</div>
            <div className="seo-cc-metric-change">
              <span className="seo-cc-change-neutral">Search Console click-through rate</span>
            </div>
          </div>

          <div className="seo-cc-metric-box">
            <div className="seo-cc-metric-label">Organic Conversions</div>
            <div className="seo-cc-metric-value" style={{ color: '#34d399' }}>
              {conversions.totalConversions}
            </div>
            <div className="seo-cc-metric-change">
              <span style={{ color: '#34d399' }}>Calls, WhatsApp & Appointments</span>
            </div>
          </div>

          <div className="seo-cc-metric-box">
            <div className="seo-cc-metric-label">Top-10 Queries</div>
            <div className="seo-cc-metric-value">{visibility.top10QueriesCount}</div>
            <div className="seo-cc-metric-change">
              <span className="seo-cc-change-neutral">Queries averaging position 1–10</span>
            </div>
          </div>
        </section>

        {/* 3. Google Connection Center (Integrations) */}
        <section className="seo-cc-card">
          <div className="seo-cc-card-header">
            <h2 className="seo-cc-card-title">
              <Globe size={18} className="text-sky-400" />
              <span>Google Integrations & Data Ingestion Pipeline</span>
            </h2>
            {!config.connected ? (
              <button
                type="button"
                className="seo-cc-btn seo-cc-btn-primary"
                onClick={handleConnectGoogle}
              >
                <Sparkles size={14} /> Connect Google Account
              </button>
            ) : (
              <div style={{ display: 'flex', gap: '8px' }}>
                <span className="seo-cc-badge seo-cc-badge-connected">✓ Authorized</span>
                <button
                  type="button"
                  className="seo-cc-btn"
                  style={{ color: '#f87171' }}
                  onClick={handleDisconnectGoogle}
                >
                  Disconnect
                </button>
              </div>
            )}
          </div>

          <div className="seo-cc-integrations-grid">
            {/* Search Console */}
            <div className="seo-cc-integration-card">
              <div className="seo-cc-integration-head">
                <span className="seo-cc-integration-name">Google Search Console</span>
                <span
                  className={`seo-cc-badge ${
                    config.connected ? 'seo-cc-badge-connected' : 'seo-cc-badge-disconnected'
                  }`}
                >
                  {config.connected ? 'Connected' : 'Not Connected'}
                </span>
              </div>
              <div className="seo-cc-integration-detail">
                Property: <code>{config.gscSiteUrl || 'sc-domain:rhdentalcare.com'}</code>
              </div>
              <div style={{ fontSize: '0.7rem', color: '#64748b' }}>
                Scope: webmasters.readonly (Search Analytics & URL Inspection)
              </div>
            </div>

            {/* Google Analytics 4 */}
            <div className="seo-cc-integration-card">
              <div className="seo-cc-integration-head">
                <span className="seo-cc-integration-name">Google Analytics 4</span>
                <span
                  className={`seo-cc-badge ${
                    config.connected && config.ga4PropertyId
                      ? 'seo-cc-badge-connected'
                      : 'seo-cc-badge-disconnected'
                  }`}
                >
                  {config.connected && config.ga4PropertyId ? 'Connected' : 'Pending Property'}
                </span>
              </div>
              <div className="seo-cc-integration-detail">
                Property ID: <code>{config.ga4PropertyId || 'GA4_PROPERTY_ID pending in env'}</code>
              </div>
              <div style={{ fontSize: '0.7rem', color: '#64748b' }}>
                Scope: analytics.readonly (Organic Sessions & Conversion Events)
              </div>
              <div style={{ marginTop: '6px', fontSize: '0.68rem', color: '#38bdf8' }}>
                Latest available GA4 reporting data • 24–48h processing latency
              </div>
            </div>

            {/* Google Business Profile */}
            <div className="seo-cc-integration-card">
              <div className="seo-cc-integration-head">
                <span className="seo-cc-integration-name">Google Business Profile</span>
                <span
                  className={`seo-cc-badge ${
                    config.gbpStatus === 'connected'
                      ? 'seo-cc-badge-connected'
                      : config.gbpStatus === 'pending_access'
                      ? 'seo-cc-badge-pending'
                      : 'seo-cc-badge-disconnected'
                  }`}
                >
                  {config.gbpStatus === 'connected'
                    ? 'Connected'
                    : config.gbpStatus === 'pending_access'
                    ? 'Pending Access'
                    : 'Not Connected'}
                </span>
              </div>
              <div className="seo-cc-integration-detail">
                Locations: Banani (Road 11) & Banasree (Block C)
              </div>
              <div style={{ fontSize: '0.7rem', color: '#64748b' }}>
                Scope: business.manage (Management-capable scope required by Google for Performance API; dashboard operates strictly read-only)
              </div>
            </div>

            {/* PageSpeed Insights */}
            <div className="seo-cc-integration-card">
              <div className="seo-cc-integration-head">
                <span className="seo-cc-integration-name">PageSpeed Insights</span>
                <span className="seo-cc-badge seo-cc-badge-connected">Available</span>
              </div>
              <div className="seo-cc-integration-detail">
                Monitored: 9 Core Clinical & Branch URLs
              </div>
              <div style={{ fontSize: '0.7rem', color: '#64748b' }}>
                API: v5 Mobile Strategy (Field Data & Lab Metrics)
              </div>
            </div>
          </div>
        </section>

        {/* 4. Local Performance: Banani vs Banasree GBP */}
        <section className="seo-cc-card">
          <div className="seo-cc-card-header">
            <h2 className="seo-cc-card-title">
              <MapPin size={18} className="text-emerald-400" />
              <span>Local Performance — Banani vs Banasree (GBP Performance)</span>
            </h2>
            <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
              Operational Comparison • Not a “Which Branch is Better” Ranking
            </span>
          </div>

          <div className="seo-cc-local-grid">
            {/* Banani Card */}
            <div className="seo-cc-branch-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <h3 style={{ fontSize: '1rem', fontWeight: 700, margin: 0, color: '#f8fafc' }}>
                    {local.banani.name}
                  </h3>
                  <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '2px' }}>
                    {local.banani.address}
                  </div>
                </div>
                <span
                  className={`seo-cc-badge ${
                    local.banani.status === 'connected'
                      ? 'seo-cc-badge-connected'
                      : local.banani.status === 'pending_access'
                      ? 'seo-cc-badge-pending'
                      : 'seo-cc-badge-disconnected'
                  }`}
                >
                  {local.banani.status}
                </span>
              </div>

              <div className="seo-cc-branch-metrics-grid">
                <div className="seo-cc-branch-stat">
                  <div className="seo-cc-branch-stat-val">{local.banani.searchImpressions}</div>
                  <div className="seo-cc-branch-stat-lbl">Search Views</div>
                </div>
                <div className="seo-cc-branch-stat">
                  <div className="seo-cc-branch-stat-val">{local.banani.mapsImpressions}</div>
                  <div className="seo-cc-branch-stat-lbl">Maps Views</div>
                </div>
                <div className="seo-cc-branch-stat">
                  <div className="seo-cc-branch-stat-val">{local.banani.websiteClicks}</div>
                  <div className="seo-cc-branch-stat-lbl">Website Clicks</div>
                </div>
                <div className="seo-cc-branch-stat">
                  <div className="seo-cc-branch-stat-val">{local.banani.calls}</div>
                  <div className="seo-cc-branch-stat-lbl">Phone Calls</div>
                </div>
                <div className="seo-cc-branch-stat">
                  <div className="seo-cc-branch-stat-val">{local.banani.directionRequests}</div>
                  <div className="seo-cc-branch-stat-lbl">Directions</div>
                </div>
                <div className="seo-cc-branch-stat">
                  <div className="seo-cc-branch-stat-val" style={{ color: '#38bdf8' }}>
                    {local.banani.totalActions}
                  </div>
                  <div className="seo-cc-branch-stat-lbl">Total Actions</div>
                </div>
              </div>
            </div>

            {/* Banasree Card */}
            <div className="seo-cc-branch-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <h3 style={{ fontSize: '1rem', fontWeight: 700, margin: 0, color: '#f8fafc' }}>
                    {local.banasree.name}
                  </h3>
                  <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '2px' }}>
                    {local.banasree.address}
                  </div>
                </div>
                <span
                  className={`seo-cc-badge ${
                    local.banasree.status === 'connected'
                      ? 'seo-cc-badge-connected'
                      : local.banasree.status === 'pending_access'
                      ? 'seo-cc-badge-pending'
                      : 'seo-cc-badge-disconnected'
                  }`}
                >
                  {local.banasree.status}
                </span>
              </div>

              <div className="seo-cc-branch-metrics-grid">
                <div className="seo-cc-branch-stat">
                  <div className="seo-cc-branch-stat-val">{local.banasree.searchImpressions}</div>
                  <div className="seo-cc-branch-stat-lbl">Search Views</div>
                </div>
                <div className="seo-cc-branch-stat">
                  <div className="seo-cc-branch-stat-val">{local.banasree.mapsImpressions}</div>
                  <div className="seo-cc-branch-stat-lbl">Maps Views</div>
                </div>
                <div className="seo-cc-branch-stat">
                  <div className="seo-cc-branch-stat-val">{local.banasree.websiteClicks}</div>
                  <div className="seo-cc-branch-stat-lbl">Website Clicks</div>
                </div>
                <div className="seo-cc-branch-stat">
                  <div className="seo-cc-branch-stat-val">{local.banasree.calls}</div>
                  <div className="seo-cc-branch-stat-lbl">Phone Calls</div>
                </div>
                <div className="seo-cc-branch-stat">
                  <div className="seo-cc-branch-stat-val">{local.banasree.directionRequests}</div>
                  <div className="seo-cc-branch-stat-lbl">Directions</div>
                </div>
                <div className="seo-cc-branch-stat">
                  <div className="seo-cc-branch-stat-val" style={{ color: '#38bdf8' }}>
                    {local.banasree.totalActions}
                  </div>
                  <div className="seo-cc-branch-stat-lbl">Total Actions</div>
                </div>
              </div>
            </div>
          </div>

          <div
            style={{
              marginTop: '16px',
              padding: '10px 14px',
              borderRadius: '8px',
              background: 'rgba(255,255,255,0.03)',
              fontSize: '0.75rem',
              color: '#94a3b8',
              lineHeight: 1.4,
            }}
          >
            <strong>Note on Local Rankings:</strong> Exact geo-grid Maps ranking requires a dedicated local-rank
            tracking provider and is not inferred from Google Business Profile Performance data.
          </div>
        </section>

        {/* 5. SEO Wins & Attention Items */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>
          {/* Wins */}
          <div className="seo-cc-card" style={{ margin: 0 }}>
            <h3 className="seo-cc-card-title" style={{ marginBottom: '14px' }}>
              <Sparkles size={16} className="text-emerald-400" />
              <span>Factual SEO Wins ({data.wins.length})</span>
            </h3>
            {data.wins.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {data.wins.map((w) => (
                  <div key={w.id} className="seo-cc-win-box">
                    <div className="seo-cc-win-title">
                      <CheckCircle2 size={15} />
                      <span>{w.title}</span>
                    </div>
                    <div className="seo-cc-win-desc">{w.description}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="seo-cc-empty-state">
                No automatic wins recorded for this period yet.
              </div>
            )}
          </div>

          {/* Attention Items */}
          <div className="seo-cc-card" style={{ margin: 0 }}>
            <h3 className="seo-cc-card-title" style={{ marginBottom: '14px' }}>
              <AlertTriangle size={16} className="text-amber-400" />
              <span>SEO Attention Items ({data.attentionItems.length})</span>
            </h3>
            {data.attentionItems.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {data.attentionItems.map((a) => (
                  <div key={a.id} className="seo-cc-alert-box">
                    <div className="seo-cc-alert-title">
                      <AlertTriangle size={15} />
                      <span>{a.title}</span>
                    </div>
                    <div className="seo-cc-alert-desc">{a.description}</div>
                    <div className="seo-cc-alert-action">→ Action: {a.actionRecommendation}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="seo-cc-empty-state">
                No critical attention items flagged.
              </div>
            )}
          </div>
        </div>

        {/* 6. Authority Content Program Performance (80 Assets) */}
        <section className="seo-cc-card">
          <div className="seo-cc-card-header">
            <div>
              <h2 className="seo-cc-card-title">
                <Layers size={18} className="text-sky-400" />
                <span>Authority Content Performance (80 Total Assets)</span>
              </h2>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '2px' }}>
                English: <strong>40</strong> (12 Live · 28 Review) • বাংলা: <strong>40</strong> (12 Live · 28 Review)
              </div>
            </div>

            {/* Filter Pills */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
              <input
                type="text"
                placeholder="Search guide title or slug..."
                value={authoritySearch}
                onChange={(e) => setAuthoritySearch(e.target.value)}
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: '6px',
                  padding: '5px 10px',
                  fontSize: '0.75rem',
                  color: '#f8fafc',
                  outline: 'none',
                }}
              />

              <div className="seo-cc-view-toggle">
                {(['all', 'en', 'bn'] as const).map((lang) => (
                  <button
                    key={lang}
                    type="button"
                    className={`seo-cc-view-btn ${authorityLang === lang ? 'active' : ''}`}
                    onClick={() => setAuthorityLang(lang)}
                  >
                    {lang === 'all' ? 'All (80)' : lang === 'en' ? 'English (40)' : 'বাংলা (40)'}
                  </button>
                ))}
              </div>

              <div className="seo-cc-view-toggle">
                {(['all', 'live', 'review'] as const).map((st) => (
                  <button
                    key={st}
                    type="button"
                    className={`seo-cc-view-btn ${authorityStatus === st ? 'active' : ''}`}
                    onClick={() => setAuthorityStatus(st)}
                  >
                    {st === 'all' ? 'All' : st === 'live' ? 'Live (24)' : 'Review (56)'}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="seo-cc-table-wrap">
            <table className="seo-cc-table">
              <thead>
                <tr>
                  <th>Lang</th>
                  <th>Title & Slug</th>
                  <th>Cluster</th>
                  <th>Status</th>
                  <th>Published</th>
                  <th>Clicks</th>
                  <th>Impressions</th>
                  <th>CTR</th>
                  <th>Avg Position</th>
                  <th>Live Link</th>
                </tr>
              </thead>
              <tbody>
                {filteredAuthority.slice(0, 30).map((guide) => (
                  <tr key={`${guide.language}-${guide.slug}`}>
                    <td>
                      <span className={`seo-cc-pill ${guide.language === 'en' ? 'seo-cc-pill-en' : 'seo-cc-pill-bn'}`}>
                        {guide.language.toUpperCase()}
                      </span>
                    </td>
                    <td>
                      <div style={{ fontWeight: 600, color: '#f8fafc' }}>{guide.title}</div>
                      <code style={{ fontSize: '0.7rem', color: '#64748b' }}>/{guide.language === 'bn' ? 'bn/guides/' : 'guides/'}{guide.slug}</code>
                    </td>
                    <td>
                      <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{guide.categoryLabel}</span>
                    </td>
                    <td>
                      <span className={`seo-cc-badge ${guide.status === 'live' ? 'seo-cc-badge-live' : 'seo-cc-badge-review'}`}>
                        {guide.status === 'live' ? 'Live' : 'Review'}
                      </span>
                    </td>
                    <td style={{ whiteSpace: 'nowrap', fontSize: '0.75rem' }}>{guide.publishedAt}</td>
                    <td><strong>{guide.gscClicks}</strong></td>
                    <td>{guide.gscImpressions}</td>
                    <td>{guide.gscCtr.toFixed(1)}%</td>
                    <td>{guide.gscAvgPosition > 0 ? guide.gscAvgPosition.toFixed(1) : '—'}</td>
                    <td>
                      <a
                        href={guide.fullUrl}
                        target="_blank"
                        rel="noreferrer"
                        style={{ color: '#38bdf8', display: 'inline-flex', alignItems: 'center', gap: '3px' }}
                      >
                        <ExternalLink size={13} /> View
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredAuthority.length > 30 && (
            <div style={{ textAlign: 'center', marginTop: '12px', fontSize: '0.75rem', color: '#94a3b8' }}>
              Showing first 30 of {filteredAuthority.length} matching guides. Use filters or Export CSV for complete list.
            </div>
          )}
        </section>

        {/* 7. Keyword Performance Table & Opportunities (Visible in both or deep dive) */}
        <section className="seo-cc-card">
          <div className="seo-cc-card-header">
            <div>
              <h2 className="seo-cc-card-title">
                <Search size={18} className="text-sky-400" />
                <span>Search Console Keyword Performance</span>
              </h2>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '2px' }}>
                Search Analytics query metrics • Filter by language and clinical category
              </div>
            </div>

            <div className="seo-cc-filter-bar">
              {[
                { id: 'all', label: 'All Queries' },
                { id: 'en', label: 'English' },
                { id: 'bn', label: 'বাংলা' },
                { id: 'brand', label: 'Branded' },
                { id: 'non-brand', label: 'Non-Brand' },
                { id: 'banani', label: 'Banani' },
                { id: 'banasree', label: 'Banasree' },
                { id: 'implant', label: 'Implant' },
                { id: 'root-canal', label: 'Root Canal' },
                { id: 'orthodontics', label: 'Aligners / Braces' },
                { id: 'zirconia', label: 'Zirconia' },
              ].map((btn) => (
                <button
                  key={btn.id}
                  type="button"
                  className={`seo-cc-filter-pill ${keywordCluster === btn.id ? 'active' : ''}`}
                  onClick={() => setKeywordCluster(btn.id)}
                >
                  {btn.label}
                </button>
              ))}
            </div>
          </div>

          {filteredKeywords.length > 0 ? (
            <div className="seo-cc-table-wrap">
              <table className="seo-cc-table">
                <thead>
                  <tr>
                    <th>Query</th>
                    <th>Language</th>
                    <th>Clicks</th>
                    <th>Impressions</th>
                    <th>CTR</th>
                    <th>Average Position</th>
                    <th>Change</th>
                    <th>Landing Page</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredKeywords.slice(0, 25).map((kw) => (
                    <tr key={kw.query}>
                      <td style={{ fontWeight: 600, color: '#f8fafc' }}>{kw.query}</td>
                      <td>
                        <span className={`seo-cc-pill ${kw.language === 'en' ? 'seo-cc-pill-en' : 'seo-cc-pill-bn'}`}>
                          {kw.language.toUpperCase()}
                        </span>
                      </td>
                      <td><strong>{kw.clicks}</strong></td>
                      <td>{kw.impressions}</td>
                      <td>{kw.ctr.toFixed(1)}%</td>
                      <td>{kw.avgPosition.toFixed(1)}</td>
                      <td>
                        {kw.positionChange !== null ? (
                          kw.positionChange < 0 ? (
                            <span style={{ color: '#34d399' }}>▲ {Math.abs(kw.positionChange).toFixed(1)}</span>
                          ) : (
                            <span style={{ color: '#f87171' }}>▼ {kw.positionChange.toFixed(1)}</span>
                          )
                        ) : (
                          '—'
                        )}
                      </td>
                      <td style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {kw.landingPage ? (
                          <code style={{ fontSize: '0.7rem', color: '#94a3b8' }}>{kw.landingPage}</code>
                        ) : (
                          '—'
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="seo-cc-empty-state">
              <strong>No Search Console Query Data for This Period</strong>
              {config.connected ? (
                <span>This page or query cluster has not recorded search impressions in the selected {selectedRange}-day date range.</span>
              ) : (
                <span>Connect Google Search Console via OAuth to populate real-time queries and ranking metrics.</span>
              )}
            </div>
          )}
        </section>

        {/* 7b. Query Opportunity Engine */}
        <section className="seo-cc-card">
          <div className="seo-cc-card-header">
            <div>
              <h2 className="seo-cc-card-title">
                <Target size={18} className="text-sky-400" />
                <span>Query Opportunity Engine</span>
              </h2>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '2px' }}>
                Algorithmic discovery: Striking distance (Pos 4–15), high impression / low CTR, and trending queries
              </div>
            </div>

            <div className="seo-cc-view-toggle">
              {[
                { id: 'all', label: 'All Opportunities' },
                { id: 'striking_distance', label: 'Striking Distance (4–15)' },
                { id: 'high_impression_low_ctr', label: 'High Imp / Low CTR' },
                { id: 'improving', label: 'Improving' },
                { id: 'declining', label: 'Declining' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  className={`seo-cc-view-btn ${opportunityTab === tab.id ? 'active' : ''}`}
                  onClick={() => setOpportunityTab(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {filteredOpportunities.length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '14px' }}>
              {filteredOpportunities.map((op) => (
                <div
                  key={`${op.type}-${op.query}`}
                  style={{
                    background: 'rgba(30, 41, 59, 0.4)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '10px',
                    padding: '14px',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ fontWeight: 700, color: '#f8fafc', fontSize: '0.9rem' }}>{op.query}</div>
                    <span
                      className="seo-cc-pill"
                      style={{
                        background:
                          op.type === 'striking_distance'
                            ? 'rgba(56, 189, 248, 0.15)'
                            : op.type === 'high_impression_low_ctr'
                            ? 'rgba(245, 158, 11, 0.15)'
                            : 'rgba(16, 185, 129, 0.15)',
                        color:
                          op.type === 'striking_distance'
                            ? '#38bdf8'
                            : op.type === 'high_impression_low_ctr'
                            ? '#fbbf24'
                            : '#34d399',
                      }}
                    >
                      {op.type === 'striking_distance'
                        ? 'Pos 4–15 Opportunity'
                        : op.type === 'high_impression_low_ctr'
                        ? 'Low CTR'
                        : op.type}
                    </span>
                  </div>

                  <div style={{ display: 'flex', gap: '16px', marginTop: '8px', fontSize: '0.75rem', color: '#94a3b8' }}>
                    <div>
                      Avg Position: <strong style={{ color: '#f1f5f9' }}>{op.currentPosition.toFixed(1)}</strong>
                    </div>
                    <div>
                      Impressions: <strong style={{ color: '#f1f5f9' }}>{op.impressions}</strong>
                    </div>
                    <div>
                      CTR: <strong style={{ color: '#f1f5f9' }}>{op.ctr.toFixed(1)}%</strong>
                    </div>
                  </div>

                  <div style={{ fontSize: '0.75rem', color: '#cbd5e1', marginTop: '8px', lineHeight: 1.4 }}>
                    {op.recommendation}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="seo-cc-empty-state">
              <strong>No Queries Matching Selected Opportunity Filter</strong>
              <span>
                {config.connected
                  ? 'All recorded search queries are performing normally or require larger impression volume.'
                  : 'Connect Search Console to identify striking-distance and SERP optimization opportunities.'}
              </span>
            </div>
          )}
        </section>

        {/* 8. Conversion Funnel (GA4 Aggregate) */}
        <section className="seo-cc-card">
          <div className="seo-cc-card-header">
            <h2 className="seo-cc-card-title">
              <Activity size={18} className="text-emerald-400" />
              <span>SEO → Lead Conversion Funnel</span>
            </h2>
            <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
              Google Organic Search traffic flow into patient actions
            </div>
          </div>

          <div className="seo-cc-funnel-grid">
            {data.funnel.map((step, idx) => (
              <div key={step.label} className="seo-cc-funnel-step">
                <div style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 700 }}>
                  STEP 0{idx + 1}
                </div>
                <div className="seo-cc-funnel-num">{step.count.toLocaleString()}</div>
                <div className="seo-cc-funnel-lbl">{step.label}</div>
                {step.conversionRate !== null && (
                  <div className="seo-cc-funnel-rate">
                    {step.conversionRate}% conversion
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* 9. Technical Deep Dive View (Shown when ActiveView === 'technical') */}
        {activeView === 'technical' && (
          <>
            {/* PageSpeed Performance Table */}
            <section className="seo-cc-card">
              <div className="seo-cc-card-header">
                <h2 className="seo-cc-card-title">
                  <Zap size={18} className="text-amber-400" />
                  <span>PageSpeed Insights & Core Web Vitals (Monitored URLs)</span>
                </h2>
                <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                  Field Data (Real Users) vs Lab Data • INP is the official responsiveness metric (replaces legacy FID)
                </div>
              </div>

              <div className="seo-cc-table-wrap">
                <table className="seo-cc-table">
                  <thead>
                    <tr>
                      <th>Monitored URL</th>
                      <th>Performance</th>
                      <th>Accessibility</th>
                      <th>Best Practices</th>
                      <th>SEO</th>
                      <th>LCP (Field/Lab)</th>
                      <th>INP (Interaction to Next Paint)</th>
                      <th>CLS</th>
                      <th>Data Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.pageSpeed.map((ps) => (
                      <tr key={ps.path}>
                        <td>
                          <code style={{ color: '#38bdf8' }}>{ps.path}</code>
                        </td>
                        <td>
                          <strong style={{ color: ps.performanceScore >= 90 ? '#34d399' : '#fbbf24' }}>
                            {ps.performanceScore}/100
                          </strong>
                        </td>
                        <td>{ps.accessibilityScore}/100</td>
                        <td>{ps.bestPracticesScore}/100</td>
                        <td>{ps.seoScore}/100</td>
                        <td>{ps.lcp}</td>
                        <td>{ps.inp}</td>
                        <td>{ps.cls}</td>
                        <td>
                          <span
                            className="seo-cc-pill"
                            style={{
                              background: ps.fieldDataAvailable ? 'rgba(16,185,129,0.15)' : 'rgba(148,163,184,0.15)',
                              color: ps.fieldDataAvailable ? '#34d399' : '#94a3b8',
                            }}
                          >
                            {ps.fieldDataAvailable ? 'Field (Real Users)' : 'Lab Metric'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Internal Technical SEO Audit */}
            <section className="seo-cc-card">
              <div className="seo-cc-card-header">
                <h2 className="seo-cc-card-title">
                  <ShieldCheck size={18} className="text-emerald-400" />
                  <span>Internal Technical SEO Audit (npm run seo:audit)</span>
                </h2>
                <span className="seo-cc-badge seo-cc-badge-live">
                  {audit.criticalErrors === 0 ? '✓ 0 Critical Errors' : `${audit.criticalErrors} Errors`}
                </span>
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                  gap: '12px',
                  marginTop: '12px',
                }}
              >
                <div className="seo-cc-branch-stat">
                  <div className="seo-cc-branch-stat-val">{audit.routesAudited}</div>
                  <div className="seo-cc-branch-stat-lbl">Routes Audited</div>
                </div>
                <div className="seo-cc-branch-stat">
                  <div className="seo-cc-branch-stat-val" style={{ color: '#34d399' }}>
                    {audit.criticalErrors}
                  </div>
                  <div className="seo-cc-branch-stat-lbl">Critical Errors</div>
                </div>
                <div className="seo-cc-branch-stat">
                  <div className="seo-cc-branch-stat-val" style={{ color: '#fbbf24' }}>
                    {audit.warnings}
                  </div>
                  <div className="seo-cc-branch-stat-lbl">Warnings</div>
                </div>
                <div className="seo-cc-branch-stat">
                  <div className="seo-cc-branch-stat-val">{audit.canonicalIssues}</div>
                  <div className="seo-cc-branch-stat-lbl">Canonical Issues</div>
                </div>
                <div className="seo-cc-branch-stat">
                  <div className="seo-cc-branch-stat-val">{audit.hreflangIssues}</div>
                  <div className="seo-cc-branch-stat-lbl">Hreflang Issues</div>
                </div>
                <div className="seo-cc-branch-stat">
                  <div className="seo-cc-branch-stat-val">{audit.schemaIssues}</div>
                  <div className="seo-cc-branch-stat-lbl">Schema Issues</div>
                </div>
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
}
