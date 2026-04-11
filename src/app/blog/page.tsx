import { Metadata } from 'next';
import Link from 'next/link';
import { blogPosts, blogCategories } from '@/lib/blogData';
import { BookOpen, Clock, ArrowRight, Star } from 'lucide-react';
import './blog.css';

export const metadata: Metadata = {
  title: 'Patient Education Blog | RH Dental Care',
  description: 'Read expert articles on all dental treatments — root canal, implants, braces, gum care, and much more. Comprehensive patient education from RH Dental Care.',
};

const categoryColors: Record<string, string> = {
  'Periodontology': '#0ea5e9',
  'Oral & Maxillofacial Surgery': '#ef4444',
  'Conservative Dentistry & Endodontics': '#6366f1',
  'Pediatric Dentistry': '#f97316',
  'Orthodontics': '#8b5cf6',
  'Prosthodontics': '#f59e0b',
  'Aesthetic Dentistry': '#ec4899',
  'Cross-Departmental': '#10b981',
};

export default function BlogPage({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  const activeCategory = searchParams?.category ?? 'All';
  const filtered = activeCategory === 'All'
    ? blogPosts
    : blogPosts.filter((p) => p.category === activeCategory);

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', paddingTop: 'var(--nav-height, 80px)' }}>
      {/* Hero */}
      <div style={{
        background: 'linear-gradient(135deg, #020617 0%, #0f172a 60%, #020617 100%)',
        padding: '5rem 2rem 4rem',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: '-10%', left: '0',
          width: '500px', height: '500px',
          background: 'radial-gradient(circle, rgba(14,165,233,0.12) 0%, transparent 70%)',
          borderRadius: '50%', filter: 'blur(60px)',
        }} />
        <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            background: 'rgba(14,165,233,0.15)',
            border: '1px solid rgba(14,165,233,0.25)',
            color: '#38bdf8', padding: '0.4rem 1rem',
            borderRadius: '100px', fontSize: '0.78rem',
            fontWeight: 800, textTransform: 'uppercase',
            letterSpacing: '0.1em', marginBottom: '1.5rem',
          }}>
            <BookOpen size={12} />
            Patient Education
          </div>
          <h1 style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: 900, color: '#fff',
            marginBottom: '1rem', letterSpacing: '-0.04em', lineHeight: 1.1,
          }}>
            Treatment Articles<br />
            <span style={{ color: '#38bdf8' }}>& Patient Guides</span>
          </h1>
          <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.6)', maxWidth: '560px', lineHeight: 1.8 }}>
            {blogPosts.length}+ detailed treatment guides covering every procedure we offer — written to help you make informed decisions about your oral health.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 2rem 5rem' }}>
        {/* Category Filter */}
        <div style={{
          display: 'flex', flexWrap: 'wrap', gap: '0.5rem',
          marginBottom: '3rem',
        }}>
          {['All', ...blogCategories].map((cat) => {
            const isActive = activeCategory === cat;
            const color = cat === 'All' ? '#0ea5e9' : (categoryColors[cat] ?? '#64748b');
            return (
              <Link
                key={cat}
                href={cat === 'All' ? '/blog' : `/blog?category=${encodeURIComponent(cat)}`}
                style={{
                  padding: '0.45rem 1rem',
                  borderRadius: '100px',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  border: `1.5px solid ${isActive ? color : 'rgba(0,0,0,0.1)'}`,
                  background: isActive ? color : '#fff',
                  color: isActive ? '#fff' : '#475569',
                  textDecoration: 'none',
                  whiteSpace: 'nowrap',
                }}
              >
                {cat}
              </Link>
            );
          })}
        </div>

        {/* Articles Grid */}
        <div className="blog-grid">
          {filtered.map((post) => {
            const color = categoryColors[post.category] ?? '#64748b';
            return (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="blog-card-link"
                style={{ '--card-color': color } as React.CSSProperties}
              >
                <div className="blog-card">
                  {/* Category badge */}
                  <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    marginBottom: '1rem',
                  }}>
                    <span style={{
                      background: `${color}15`,
                      color: color,
                      padding: '0.3rem 0.75rem',
                      borderRadius: '100px',
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      letterSpacing: '0.05em',
                    }}>
                      {post.category}
                    </span>
                    <span style={{
                      display: 'flex', alignItems: 'center', gap: '0.3rem',
                      fontSize: '0.78rem', color: '#94a3b8', fontWeight: 600,
                    }}>
                      <Clock size={12} />
                      {post.readTime}
                    </span>
                  </div>

                  <h2 className="blog-card-title">{post.title}</h2>
                  <p style={{
                    fontSize: '0.85rem', color: '#64748b',
                    fontStyle: 'italic', marginBottom: '0.75rem', fontWeight: 500,
                  }}>
                    {post.subtitle}
                  </p>
                  <p style={{ fontSize: '0.875rem', color: '#64748b', lineHeight: 1.7, flex: 1 }}>
                    {post.summary}
                  </p>
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: '0.4rem',
                    marginTop: '1.5rem', color: color,
                    fontWeight: 700, fontSize: '0.875rem',
                  }}>
                    Read Article
                    <ArrowRight size={16} />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '5rem 0', color: '#94a3b8' }}>
            <BookOpen size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} />
            <p>No articles found in this category.</p>
          </div>
        )}

        {/* CTA */}
        <div style={{
          marginTop: '4rem', textAlign: 'center',
          background: 'linear-gradient(135deg, #020617, #0f172a)',
          borderRadius: '2rem', padding: '4rem 2rem',
          boxShadow: '0 30px 80px rgba(2,6,23,0.2)',
        }}>
          <Star size={32} fill="#f59e0b" color="#f59e0b" style={{ marginBottom: '1rem' }} />
          <h2 style={{
            fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
            fontWeight: 900, color: '#fff', marginBottom: '1rem',
            letterSpacing: '-0.03em',
          }}>
            Have more questions?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '2rem', fontSize: '1.05rem' }}>
            Book a free consultation and our specialists will answer all your questions in person.
          </p>
          <Link href="/contact" style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.75rem',
            padding: '1rem 2.5rem',
            background: 'linear-gradient(135deg, #0ea5e9, #0284c7)',
            color: '#fff', borderRadius: '100px',
            fontWeight: 800, fontSize: '1rem', textDecoration: 'none',
            boxShadow: '0 12px 35px rgba(14,165,233,0.4)',
          }}>
            Book a Consultation
          </Link>
        </div>
      </div>
    </div>
  );
}
