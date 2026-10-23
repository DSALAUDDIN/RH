import Link from 'next/link';
import {
  getAuthorityGuidesByCategory,
  type AuthorityCategory,
} from '@/data/authorityContent';
import { getBanglaAuthorityGuidesByCategory } from '@/data/banglaAuthorityContent';
import { BookOpen, ArrowRight, ShieldCheck, Clock } from 'lucide-react';
import './RelatedGuidesCluster.css';

interface Props {
  category: AuthorityCategory;
  title?: string;
  subtitle?: string;
  className?: string;
}

export default function RelatedGuidesCluster({
  category,
  title = 'Doctor-Reviewed Patient Guides & Clinical Resources',
  subtitle = 'Evidence-based guides written and reviewed by our clinical team, covering procedure steps, material choices, recovery, and costs in Dhaka.',
  className = '',
}: Props) {
  const enGuides = getAuthorityGuidesByCategory(category);
  const bnGuides = getBanglaAuthorityGuidesByCategory(category);

  if (!enGuides.length && !bnGuides.length) {
    return null;
  }

  return (
    <section className={`related-guides-cluster ${className}`}>
      <div className="cluster-header">
        <div className="cluster-kicker">
          <BookOpen size={16} />
          <span>Patient Knowledge Base</span>
        </div>
        <h2 className="cluster-title">{title}</h2>
        <p className="cluster-subtitle">{subtitle}</p>
      </div>

      <div className="cluster-grid">
        {enGuides.slice(0, 3).map((guide) => (
          <article key={guide.slug} className="cluster-card">
            <div className="cluster-card-badge">
              <ShieldCheck size={13} />
              <span>Doctor Reviewed</span>
            </div>
            <h3 className="cluster-card-title">
              <Link href={`/guides/${guide.slug}`}>{guide.title}</Link>
            </h3>
            <p className="cluster-card-desc">{guide.metaDescription}</p>

            <div className="cluster-card-footer">
              <div className="cluster-reading-time">
                <Clock size={13} />
                <span>{guide.readingTimeMinutes} min read</span>
              </div>
              <div className="cluster-card-links">
                <Link href={`/bn/guides/${guide.slug}`} className="cluster-bn-link" title="বাংলা সংস্করণ">
                  🇧🇩 বাংলা
                </Link>
                <Link href={`/guides/${guide.slug}`} className="cluster-read-link">
                  <span>Read</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="cluster-bottom-bar">
        <span>Looking for more patient advice?</span>
        <div className="cluster-bottom-actions">
          <Link href="/bn/guides" className="btn-cluster-bn">
            🇧🇩 সব বাংলা গাইড (৪০টি)
          </Link>
          <Link href="/guides" className="btn-cluster-all">
            <span>Explore All 40 Patient Guides</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
