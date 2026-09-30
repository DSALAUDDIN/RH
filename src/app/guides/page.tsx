import type { Metadata } from 'next';
import Link from 'next/link';
import {
  getLiveAuthorityGuides,
  CATEGORY_DESCRIPTIONS,
  type AuthorityCategory,
} from '@/data/authorityContent';
import { pageMeta } from '@/lib/seo/metadata';
import { breadcrumbs, itemListSchema } from '@/lib/seo/schema';
import JsonLd from '@/components/seo/JsonLd';
import { BookOpen, Clock, ArrowRight, ShieldCheck } from 'lucide-react';
import './guides.css';

export const metadata: Metadata = pageMeta({
  title: 'Patient Dental Guides & Oral Health Knowledge Base',
  description:
    'Doctor-reviewed dental guides from RH Dental Care: dental implant costs, microscopic root canals, clear aligners, zirconia crowns, and clinic visit advice.',
  path: '/guides',
});

const CLUSTERS: AuthorityCategory[] = [
  'implants',
  'endodontics',
  'orthodontics',
  'zirconia',
  'digital-dentistry',
  'surgery',
  'patient-guides',
  'branch-guides',
  'general-care',
];

export default function GuidesHubPage() {
  const liveGuides = getLiveAuthorityGuides();

  const breadcrumbsNode = breadcrumbs(
    { name: 'Home', path: '/' },
    { name: 'Guides', path: '/guides' },
  );

  const listNode = itemListSchema(
    liveGuides.map((g) => ({
      name: g.title,
      path: `/guides/${g.slug}`,
    })),
  );

  return (
    <div className="guides-hub-container">
      <JsonLd nodes={[breadcrumbsNode, listNode]} />

      <header className="guides-hub-hero">
        <div className="guides-hub-hero-inner">
          <div className="guides-hub-kicker">
            <BookOpen size={15} />
            <span>RH Dental Knowledge Base</span>
          </div>
          <h1 className="guides-hub-title">Doctor-Reviewed Dental Guides</h1>
          <p className="guides-hub-subtitle">
            Clear, clinically verified information on dental implant costs, microscopic root canals, clear aligners vs braces, zirconia restorations, and visit logistics in Dhaka.
          </p>
        </div>
      </header>

      <main className="guides-hub-main">
        {/* Categories Bar */}
        <nav aria-label="Guides Categories" className="guides-categories-bar">
          {CLUSTERS.map((catKey) => {
            const meta = CATEGORY_DESCRIPTIONS[catKey];
            const count = liveGuides.filter((g) => g.category === catKey).length;
            if (count === 0) return null;
            return (
              <a key={catKey} href={`#${catKey}`} className="guides-category-pill">
                <span>{meta.label}</span>
                <span style={{ opacity: 0.65, fontSize: '0.8em', marginLeft: '0.35rem' }}>({count})</span>
              </a>
            );
          })}
        </nav>

        {/* Clustered Guides */}
        {CLUSTERS.map((catKey) => {
          const guidesInCluster = liveGuides.filter((g) => g.category === catKey);
          if (guidesInCluster.length === 0) return null;
          const meta = CATEGORY_DESCRIPTIONS[catKey];

          return (
            <section key={catKey} id={catKey} className="guides-cluster-group">
              <div className="guides-cluster-header">
                <div>
                  <h2 className="guides-cluster-title">{meta.label}</h2>
                  <p className="guides-cluster-desc">{meta.description}</p>
                </div>
              </div>

              <div className="guides-grid">
                {guidesInCluster.map((guide) => (
                  <Link key={guide.slug} href={`/guides/${guide.slug}`} className="guide-card">
                    <div className="guide-card-top">
                      <span className="guide-card-badge">{guide.categoryLabel}</span>
                      <span className="guide-card-time">
                        <Clock size={13} />
                        <span>{guide.readingTimeMinutes} min</span>
                      </span>
                    </div>

                    <h3 className="guide-card-title">{guide.shortTitle}</h3>
                    <p className="guide-card-excerpt">{guide.quickAnswer}</p>

                    <div className="guide-card-footer">
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#2D6A4F' }}>
                        <ShieldCheck size={14} />
                        <span>Doctor Reviewed</span>
                      </span>
                      <span className="guide-card-cta">
                        <span>Read Guide</span>
                        <ArrowRight size={14} />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}

        {/* Client QA & Progress System Notice */}
        <div className="guides-client-notice">
          <strong>Internal Quality Assurance:</strong> The RH Dental content team is developing 40 total authority guides.
          Review all active drafts, medical review statuses, and staged batches on the{' '}
          <Link href="/seo-progress">SEO Progress Dashboard</Link>.
        </div>
      </main>
    </div>
  );
}
