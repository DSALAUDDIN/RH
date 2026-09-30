import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  getAllBanglaAuthorityGuides,
  getBanglaAuthorityGuide,
  BANGLA_CATEGORY_DESCRIPTIONS,
} from '@/data/banglaAuthorityContent';
import { BRANCH_LIST } from '@/lib/branches';
import { pageMeta } from '@/lib/seo/metadata';
import { articleSchema, breadcrumbs } from '@/lib/seo/schema';
import JsonLd from '@/components/seo/JsonLd';
import {
  CheckCircle2,
  Clock,
  UserCheck,
  Calendar,
  AlertCircle,
  Sparkles,
  ArrowRight,
  MapPin,
  Phone,
  Shield,
  FileText,
  Globe,
} from 'lucide-react';
import '../../../guides/[slug]/guide.css';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const guides = getAllBanglaAuthorityGuides();
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = getBanglaAuthorityGuide(slug);
  if (!guide) {
    return { title: 'গাইড পাওয়া যায়নি', robots: { index: false } };
  }

  return pageMeta({
    title: guide.title,
    description: guide.metaDescription,
    path: `/bn/guides/${slug}`,
    canonical: `/bn/guides/${slug}`,
    noindex: guide.status !== 'live',
    type: 'article',
    locale: 'bn_BD',
    publishedTime: guide.publishedAt,
    modifiedTime: guide.updatedAt,
    section: guide.categoryLabel,
    tags: [guide.categoryLabel, ...guide.secondaryTopics],
    languages: {
      'en-BD': `/guides/${slug}`,
      'bn-BD': `/bn/guides/${slug}`,
      'x-default': `/guides/${slug}`,
    },
  });
}

export default async function BanglaAuthorityGuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = getBanglaAuthorityGuide(slug);

  if (!guide) {
    notFound();
  }

  const categoryMeta = BANGLA_CATEGORY_DESCRIPTIONS[guide.category];

  // Breadcrumbs schema and visible trail
  const breadcrumbItems = [
    { name: 'হোম', path: '/bn' },
    { name: 'ডেন্টাল গাইড', path: '/bn/guides' },
    { name: categoryMeta?.label ?? guide.categoryLabel, path: '/bn/guides' },
    { name: guide.shortTitle, path: `/bn/guides/${slug}` },
  ];

  const breadcrumbsNode = breadcrumbs(
    { name: 'হোম', path: '/bn' },
    { name: 'ডেন্টাল গাইড', path: '/bn/guides' },
    { name: categoryMeta?.label ?? guide.categoryLabel, path: '/bn/guides' },
    { name: guide.shortTitle, path: `/bn/guides/${slug}` },
  );

  // Article schema with bn-BD language
  const articleNode = articleSchema({
    path: `/bn/guides/${slug}`,
    headline: guide.title,
    description: guide.metaDescription,
    section: guide.categoryLabel,
    author: guide.reviewerSlug,
    datePublished: guide.publishedAt,
    dateModified: guide.updatedAt,
    inLanguage: 'bn-BD',
  });

  return (
    <div className="guide-page-container">
      <JsonLd nodes={[breadcrumbsNode, articleNode]} />

      {/* Hero Header */}
      <header className="guide-hero">
        <div className="guide-hero-inner">
          <nav aria-label="ব্রেডক্রাম্ব" className="guide-breadcrumbs">
            <ol>
              {breadcrumbItems.map((item, idx) => (
                <li key={item.path + idx}>
                  {idx > 0 && <span className="crumb-sep">/</span>}
                  {idx === breadcrumbItems.length - 1 ? (
                    <span aria-current="page">{item.name}</span>
                  ) : (
                    <Link href={item.path}>{item.name}</Link>
                  )}
                </li>
              ))}
            </ol>
          </nav>

          {/* Language Switcher Pill */}
          <div className="guide-lang-switcher" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.35rem 0.85rem', background: '#f1f5f9', borderRadius: '9999px', fontSize: '0.8125rem', marginBottom: '1rem' }}>
            <Globe size={14} className="text-slate-500" />
            <Link href={`/guides/${slug}`} style={{ color: '#0284c7', textDecoration: 'none', fontWeight: 500 }}>
              English Version
            </Link>
            <span style={{ color: '#94a3b8' }}>|</span>
            <span style={{ fontWeight: 700, color: '#0f172a' }}>বাংলা সংস্করণ</span>
          </div>

          <div className="guide-meta-pill">
            <span className="guide-cat-badge">{guide.categoryLabel}</span>
            <span className="guide-meta-divider">•</span>
            <div className="guide-reading-time">
              <Clock size={13} />
              <span>{guide.readingTimeMinutes} মিনিট পাঠ</span>
            </div>
            {guide.status === 'review' && (
              <>
                <span className="guide-meta-divider">•</span>
                <span className="guide-staging-badge" title="এই পাতাটি বর্তমানে অভ্যন্তরীণ পর্যালোচনার অধীনে রয়েছে">
                  প্রিভিউ কপি
                </span>
              </>
            )}
          </div>

          <h1 className="guide-title">{guide.title}</h1>

          {guide.medicallyReviewed && (
            <div className="guide-author-strip">
              <UserCheck size={16} className="text-emerald-600" />
              <span>
                চিকিৎসাগতভাবে পরীক্ষিত: <strong>{guide.reviewer}</strong>
                {guide.reviewerRole && <span className="author-role"> ({guide.reviewerRole})</span>}
              </span>
              <span className="guide-meta-divider">•</span>
              <div className="guide-date-badge">
                <Calendar size={13} />
                <span>হালনাগাদ: {guide.updatedAt}</span>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Content Layout */}
      <div className="guide-content-layout">
        <main className="guide-main-article">
          {/* Quick Answer Callout */}
          <div className="guide-quick-answer">
            <div className="quick-answer-header">
              <Sparkles size={18} className="text-emerald-700" />
              <h3>সংক্ষেপে মূল তথ্য</h3>
            </div>
            <p>{guide.quickAnswer}</p>
          </div>

          {/* Sections */}
          <div className="guide-sections-flow">
            {guide.sections.map((section, sIdx) => (
              <section key={sIdx} className="guide-body-section">
                <h2>{section.heading}</h2>

                {section.paragraphs.map((p, pIdx) => (
                  <p key={pIdx}>{p}</p>
                ))}

                {section.keyPoints && section.keyPoints.length > 0 && (
                  <ul className="guide-key-points">
                    {section.keyPoints.map((point, kIdx) => (
                      <li key={kIdx}>
                        <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-1" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {section.callout && (
                  <div className={`guide-inline-callout callout-${section.callout.type ?? 'info'}`}>
                    <div className="callout-title">
                      <AlertCircle size={16} />
                      <strong>{section.callout.title}</strong>
                    </div>
                    <p>{section.callout.text}</p>
                  </div>
                )}
              </section>
            ))}
          </div>

          {/* FAQs Section */}
          {guide.faqs && guide.faqs.length > 0 && (
            <section className="guide-faqs-section">
              <h2>সাধারণ প্রশ্নোত্তর</h2>
              <div className="guide-faqs-list">
                {guide.faqs.map((faq, fIdx) => (
                  <div key={fIdx} className="guide-faq-card">
                    <h3 className="guide-faq-question">{faq.question}</h3>
                    <p className="guide-faq-answer">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Medical Disclaimer */}
          <div className="guide-disclaimer">
            <Shield size={16} className="text-slate-400 shrink-0" />
            <p>
              <strong>চিকিৎসাগত সতর্কতা:</strong> এই তথ্যগুলো শুধুমাত্র সাধারণ স্বাস্থ্য সচেতনতা ও রোগীকে সচেতন করার উদ্দেশ্যে প্রস্তুত করা হয়েছে। এটি কোনো সরাসরি চিকিৎসা পরামর্শের বিকল্প নয়। যেকোনো ডেন্টাল চিকিৎসার পূর্বে একজন যোগ্য বিএমডিসি নিবন্ধিত ডেন্টাল সার্জনের সাথে ব্যক্তিগত পরামর্শ নিন।
            </p>
          </div>
        </main>

        {/* Clinical Sidebar */}
        <aside className="guide-sidebar">
          {/* Reviewer Card */}
          {guide.medicallyReviewed && (
            <div className="sidebar-card reviewer-card">
              <h4 className="sidebar-heading">চিকিৎসক পরিচিতি</h4>
              <div className="reviewer-info">
                <div className="reviewer-avatar">
                  <UserCheck size={22} className="text-emerald-700" />
                </div>
                <div>
                  <div className="reviewer-name">{guide.reviewer}</div>
                  <div className="reviewer-meta">{guide.reviewerRole}</div>
                  <div className="reviewer-sub">আরএইচ ডেন্টাল কেয়ার</div>
                </div>
              </div>
              <Link href={guide.reviewerSlug ? `/team/${guide.reviewerSlug}` : '/team'} className="reviewer-profile-link">
                <span>প্রোফাইল দেখুন</span>
                <ArrowRight size={13} />
              </Link>
            </div>
          )}

          {/* Related Treatments */}
          {guide.relatedTreatments && guide.relatedTreatments.length > 0 && (
            <div className="sidebar-card">
              <h4 className="sidebar-heading">সম্পর্কিত চিকিৎসাসমূহ</h4>
              <ul className="sidebar-treatment-links">
                {guide.relatedTreatments.map((t, idx) => (
                  <li key={idx}>
                    <Link href={t.href}>
                      <span>{t.title}</span>
                      <ArrowRight size={13} className="link-arrow" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Location Branches Card */}
          <div className="sidebar-card branches-card">
            <h4 className="sidebar-heading">আমাদের শাখাসমূহ</h4>
            <div className="sidebar-branches-list">
              {BRANCH_LIST.filter((b) => guide.relatedBranches.includes(b.id)).map((branch) => (
                <div key={branch.id} className="sidebar-branch-item">
                  <div className="branch-title">
                    <MapPin size={15} className="text-emerald-600 shrink-0" />
                    <strong>{branch.id === 'banani' ? 'বনানী শাখা' : 'বনশ্রী শাখা'}</strong>
                  </div>
                  <p className="branch-addr">{branch.streetAddress}, {branch.addressLocality}</p>
                  <a href={`tel:${branch.phone}`} className="branch-call-link">
                    <Phone size={13} />
                    <span>{branch.phone}</span>
                  </a>
                </div>
              ))}
            </div>

            <div className="sidebar-book-cta">
              <Link href="/book" className="sidebar-book-btn">
                <Calendar size={15} />
                <span>অ্যাপয়েন্টমেন্ট নিন</span>
              </Link>
            </div>
          </div>

          {/* Guide Index Link */}
          <div className="sidebar-card hub-link-card">
            <div className="hub-link-inner">
              <FileText size={18} className="text-emerald-600" />
              <div>
                <h5>আরও বাংলা ডেন্টাল গাইড</h5>
                <p>আমাদের নলেজ বেসে ৪০টি বিষয়ভিত্তিক নির্দেশিকা রয়েছে।</p>
                <Link href="/bn/guides" className="hub-explore-link">
                  <span>সবগুলো গাইড দেখুন</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
