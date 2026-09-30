import type { Metadata } from 'next';
import Link from 'next/link';
import {
  getLiveBanglaAuthorityGuides,
  BANGLA_CATEGORY_DESCRIPTIONS,
  type AuthorityCategory,
} from '@/data/banglaAuthorityContent';
import { pageMeta } from '@/lib/seo/metadata';
import { breadcrumbs, itemListSchema } from '@/lib/seo/schema';
import JsonLd from '@/components/seo/JsonLd';
import { BookOpen, Clock, ArrowRight, ShieldCheck } from 'lucide-react';
import '../../guides/guides.css';

export const metadata: Metadata = pageMeta({
  title: 'ডেন্টাল চিকিৎসা গাইড ও স্বাস্থ্য তথ্য ভাণ্ডার',
  description:
    'বিশেষজ্ঞ চিকিৎসকদের বাংলা ডেন্টাল গাইড: ইমপ্লান্ট খরচ, মাইক্রোস্কোপিক রুট ক্যানেল, ব্রেসেস, জিরকোনিয়া ক্রাউন ও ক্লিনিক ভিজিট প্রস্তুতি।',
  path: '/bn/guides',
  canonical: '/bn/guides',
  locale: 'bn_BD',
  languages: {
    'en-BD': '/guides',
    'bn-BD': '/bn/guides',
    'x-default': '/guides',
  },
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

export default function BanglaGuidesHubPage() {
  const liveGuides = getLiveBanglaAuthorityGuides();

  const breadcrumbsNode = breadcrumbs(
    { name: 'হোম', path: '/bn' },
    { name: 'বাংলা ডেন্টাল গাইড', path: '/bn/guides' },
  );

  const listNode = itemListSchema(
    liveGuides.map((g) => ({
      name: g.title,
      path: `/bn/guides/${g.slug}`,
    })),
  );

  return (
    <div className="guides-hub-container">
      <JsonLd nodes={[breadcrumbsNode, listNode]} />

      <header className="guides-hub-hero">
        <div className="guides-hub-hero-inner">
          <div className="guides-hub-kicker">
            <BookOpen size={15} />
            <span>আরএইচ ডেন্টাল নলেজ বেস</span>
          </div>
          <h1 className="guides-hub-title">ডেন্টাল চিকিৎসা সংক্রান্ত বাংলা গাইড</h1>
          <p className="guides-hub-subtitle">
            ডেন্টাল ইমপ্লান্টের খরচ, মাইক্রোস্কোপিক রুট ক্যানেল, ক্লিয়ার অ্যালাইনার বনাম ব্রেসেস, জিরকোনিয়া ক্রাউন এবং ঢাকায় চিকিৎসার প্রস্তুতি বিষয়ে নির্ভরযোগ্য ও চিকিৎসাগতভাবে পরীক্ষিত তথ্য।
          </p>

          <div style={{ marginTop: '1.25rem' }}>
            <span style={{ fontSize: '0.8125rem', color: '#64748b' }}>ভাষান্তর: </span>
            <Link href="/guides" style={{ fontSize: '0.8125rem', color: '#0284c7', textDecoration: 'none', fontWeight: 600 }}>
              English Guides Hub
            </Link>
          </div>
        </div>
      </header>

      <main className="guides-hub-main">
        {/* Categories Bar */}
        <nav aria-label="বাংলা গাইড ক্যাটাগরি" className="guides-categories-bar">
          {CLUSTERS.map((catKey) => {
            const meta = BANGLA_CATEGORY_DESCRIPTIONS[catKey];
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
          const meta = BANGLA_CATEGORY_DESCRIPTIONS[catKey];

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
                  <Link key={guide.slug} href={`/bn/guides/${guide.slug}`} className="guide-card">
                    <div className="guide-card-top">
                      <span className="guide-card-badge">{guide.categoryLabel}</span>
                      <div className="guide-card-meta">
                        <Clock size={13} />
                        <span>{guide.readingTimeMinutes} মিনিট পাঠ</span>
                      </div>
                    </div>

                    <h3 className="guide-card-title">{guide.title}</h3>

                    <p className="guide-card-summary">{guide.quickAnswer}</p>

                    <div className="guide-card-footer">
                      {guide.medicallyReviewed && (
                        <div className="guide-card-reviewed">
                          <ShieldCheck size={14} className="text-emerald-600" />
                          <span>চিকিৎসক দ্বারা পরীক্ষিত</span>
                        </div>
                      )}
                      <span className="guide-card-read-more">
                        <span>সম্পূর্ণ পড়ুন</span>
                        <ArrowRight size={14} />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </main>
    </div>
  );
}
