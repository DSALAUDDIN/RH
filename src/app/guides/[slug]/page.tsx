import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  getAllAuthorityGuides,
  getAuthorityGuide,
  CATEGORY_DESCRIPTIONS,
} from '@/data/authorityContent';
import { BRANCHES } from '@/lib/branches';
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
} from 'lucide-react';
import './guide.css';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const guides = getAllAuthorityGuides();
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = getAuthorityGuide(slug);
  if (!guide) {
    return { title: 'Guide Not Found', robots: { index: false } };
  }

  return pageMeta({
    title: guide.title,
    description: guide.metaDescription,
    path: `/guides/${slug}`,
    noindex: guide.status !== 'live',
    type: 'article',
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

export default async function AuthorityGuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = getAuthorityGuide(slug);

  if (!guide) {
    notFound();
  }

  const categoryMeta = CATEGORY_DESCRIPTIONS[guide.category];

  // Breadcrumbs schema and visible trail
  const breadcrumbItems = [
    { name: 'Home', path: '/' },
    { name: 'Guides', path: '/guides' },
    { name: categoryMeta?.label ?? guide.categoryLabel, path: '/guides' },
    { name: guide.shortTitle, path: `/guides/${slug}` },
  ];

  const breadcrumbsNode = breadcrumbs(
    { name: 'Home', path: '/' },
    { name: 'Guides', path: '/guides' },
    { name: categoryMeta?.label ?? guide.categoryLabel, path: '/guides' },
    { name: guide.shortTitle, path: `/guides/${slug}` },
  );

  // Article / MedicalWebPage schema
  const articleNode = articleSchema({
    path: `/guides/${slug}`,
    headline: guide.title,
    description: guide.metaDescription,
    section: guide.categoryLabel,
    author: guide.reviewerSlug,
    datePublished: guide.publishedAt,
    dateModified: guide.updatedAt,
  });

  return (
    <div className="guide-page-container">
      <JsonLd nodes={[breadcrumbsNode, articleNode]} />

      {/* Hero Header */}
      <header className="guide-hero">
        <div className="guide-hero-inner">
          <nav aria-label="Breadcrumb" className="guide-breadcrumbs">
            {breadcrumbItems.map((item, idx) => (
              <span key={item.path} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                {idx > 0 && <span style={{ opacity: 0.5 }}>/</span>}
                {idx === breadcrumbItems.length - 1 ? (
                  <span className="current" aria-current="page">
                    {item.name}
                  </span>
                ) : (
                  <Link href={item.path}>{item.name}</Link>
                )}
              </span>
            ))}
          </nav>

          {/* Language Switcher Pill */}
          <div className="guide-lang-switcher" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.35rem 0.85rem', background: '#f1f5f9', borderRadius: '9999px', fontSize: '0.8125rem', marginBottom: '1rem' }}>
            <span style={{ fontWeight: 700, color: '#0f172a' }}>English</span>
            <span style={{ color: '#94a3b8' }}>|</span>
            <Link href={`/bn/guides/${slug}`} style={{ color: '#0284c7', textDecoration: 'none', fontWeight: 500 }}>
              বাংলা সংস্করণ
            </Link>
          </div>

          {/* Status Indicator */}
          {guide.status !== 'live' ? (
            <div className="guide-review-status-banner is-review">
              <AlertCircle size={14} />
              <span>Medical & Editorial Review Preview · Not Indexed (noindex)</span>
            </div>
          ) : (
            <div className="guide-review-status-banner">
              <Shield size={14} />
              <span>RH Dental Clinical Knowledge Base</span>
            </div>
          )}

          <h1 className="guide-title">{guide.title}</h1>

          {/* Metadata bar */}
          <div className="guide-meta-bar">
            <div className="guide-meta-item">
              <Clock size={15} />
              <span>{guide.readingTimeMinutes} min read</span>
            </div>
            <div className="guide-meta-item">
              <Calendar size={15} />
              <span>Updated: {guide.updatedAt}</span>
            </div>
            <div className="guide-meta-item">
              <FileText size={15} />
              <span>Prepared by RH Dental Editorial Team</span>
            </div>
            {guide.medicallyReviewed && guide.reviewer ? (
              <div className="guide-meta-item guide-meta-reviewer">
                <UserCheck size={16} style={{ color: '#C5A880' }} />
                <span>
                  Medically reviewed by{' '}
                  {guide.reviewerSlug ? (
                    <Link href={`/${guide.reviewerSlug}`}>{guide.reviewer}</Link>
                  ) : (
                    guide.reviewer
                  )}
                </span>
              </div>
            ) : (
              <div className="guide-meta-item" style={{ opacity: 0.75 }}>
                <Clock size={15} />
                <span>Pending Clinical Verification</span>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="guide-main">
        {/* Quick Answer Card */}
        <section className="guide-quick-answer-card" aria-label="Quick Answer Summary">
          <div className="guide-quick-answer-title">
            <Sparkles size={18} style={{ color: '#C5A880' }} />
            <span>Quick Answer</span>
          </div>
          <p className="guide-quick-answer-text">{guide.quickAnswer}</p>
        </section>

        {/* Article Body */}
        <article className="guide-article-body">
          {guide.sections.map((sec, idx) => (
            <section key={idx} className="guide-section">
              <h2 className="guide-section-heading">{sec.heading}</h2>

              {sec.paragraphs.map((p, pIdx) => (
                <p key={pIdx} className="guide-paragraph">
                  {p}
                </p>
              ))}

              {sec.keyPoints && sec.keyPoints.length > 0 && (
                <ul className="guide-keypoints-list">
                  {sec.keyPoints.map((pt, kIdx) => (
                    <li key={kIdx} className="guide-keypoint-item">
                      <CheckCircle2 size={16} className="guide-keypoint-icon" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              )}

              {sec.callout && (
                <aside className={`guide-callout-box ${sec.callout.type ?? 'info'}`}>
                  <div className="guide-callout-title">
                    {sec.callout.type === 'warning' ? (
                      <AlertCircle size={16} />
                    ) : sec.callout.type === 'tip' ? (
                      <Sparkles size={16} />
                    ) : (
                      <CheckCircle2 size={16} />
                    )}
                    <span>{sec.callout.title}</span>
                  </div>
                  <div>{sec.callout.text}</div>
                </aside>
              )}
            </section>
          ))}

          {/* Optional FAQs */}
          {guide.faqs && guide.faqs.length > 0 && (
            <section className="guide-faqs-section">
              <h2 className="guide-faqs-title">Frequently Asked Patient Questions</h2>
              {guide.faqs.map((faq, fIdx) => (
                <div key={fIdx} className="guide-faq-item">
                  <div className="guide-faq-question">{faq.question}</div>
                  <div className="guide-faq-answer">{faq.answer}</div>
                </div>
              ))}
            </section>
          )}
        </article>

        {/* Relevant Relationships */}
        <div className="guide-relationships-grid">
          {guide.relatedTreatments && guide.relatedTreatments.length > 0 && (
            <div className="guide-rel-card">
              <div className="guide-rel-card-title">
                <FileText size={18} style={{ color: '#132A13' }} />
                <span>Related Dental Treatments</span>
              </div>
              <div className="guide-rel-links-list">
                {guide.relatedTreatments.map((t) => (
                  <Link key={t.href} href={t.href} className="guide-rel-link-item">
                    <span>{t.title}</span>
                    <ArrowRight size={14} />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {guide.relatedDoctors && guide.relatedDoctors.length > 0 && (
            <div className="guide-rel-card">
              <div className="guide-rel-card-title">
                <UserCheck size={18} style={{ color: '#132A13' }} />
                <span>Clinical Specialists</span>
              </div>
              <div className="guide-rel-links-list">
                {guide.relatedDoctors.map((doc) => (
                  <Link key={doc.href} href={doc.href} className="guide-rel-link-item">
                    <div>
                      <div>{doc.name}</div>
                      <div style={{ fontSize: '0.78rem', color: '#6B7280' }}>{doc.role}</div>
                    </div>
                    <ArrowRight size={14} />
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Available Branches */}
        {guide.relatedBranches && guide.relatedBranches.length > 0 && (
          <section className="guide-branches-section">
            <div className="guide-branches-title">
              <MapPin size={20} style={{ color: '#132A13' }} />
              <span>Available Clinic Locations</span>
            </div>
            <div className="guide-branches-grid">
              {guide.relatedBranches.map((bId) => {
                const b = BRANCHES[bId];
                if (!b) return null;
                return (
                  <div key={bId} className="guide-branch-box">
                    <div className="guide-branch-name">{b.name}</div>
                    <div className="guide-branch-tagline">{b.tagline}</div>
                    <div className="guide-branch-address">{b.address}</div>
                    <div className="guide-branch-actions">
                      <Link href={b.href} className="guide-branch-btn primary">
                        <span>Branch Profile</span>
                        <ArrowRight size={12} />
                      </Link>
                      <a href={`tel:${b.phone}`} className="guide-branch-btn secondary">
                        <Phone size={12} />
                        <span>{b.phoneDisplay}</span>
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Consultation Call to Action */}
        <section className="guide-cta-card">
          <div className="guide-cta-kicker">Transparent Dental Consultations</div>
          <h2 className="guide-cta-title">Discuss Your Treatment with Our Specialists</h2>
          <p className="guide-cta-desc">
            Receive an unhurried, personalized clinical evaluation with digital diagnostics and clear treatment planning at RH Dental Care Banani or Banasree.
          </p>
          <div className="guide-cta-btn-group">
            <Link href="/contact" className="guide-cta-primary-btn">
              <span>Book a Consultation</span>
              <ArrowRight size={16} />
            </Link>
            <Link href="/treatments" className="guide-cta-secondary-btn">
              <span>Explore All Treatments</span>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
