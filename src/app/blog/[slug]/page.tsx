import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getBlogPost, getRelatedPosts, blogPosts, BlogSection } from '@/lib/blogData';
import { ArrowLeft, Clock, BookOpen, ArrowRight, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';
import '../blog.css';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

const BASE_URL = 'https://www.rhdentalcare.com';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return { title: 'Not Found' };

  const url = `${BASE_URL}/blog/${slug}`;
  const ogImage = { url: '/rhlogo.jpeg', width: 1200, height: 630, alt: post.title };

  return {
    title: `${post.title} | RH Dental Care Blog`,
    description: post.summary,
    keywords: [
      post.category,
      'dental health tips',
      'dentist Dhaka',
      'dental blog Bangladesh',
      'RH Dental Care blog',
      'oral health advice Bangladesh',
    ],
    alternates: { canonical: `/blog/${slug}` },
    authors: [{ name: 'Dr. B.M. Rafiqul Hasan (Mehedi)', url: `${BASE_URL}/about` }],
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.summary,
      url,
      siteName: 'RH Dental Care',
      images: [ogImage],
      authors: ['Dr. B.M. Rafiqul Hasan (Mehedi)'],
      tags: [post.category, 'Dental Care', 'Dhaka', 'Bangladesh'],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.summary,
      images: ['/rhlogo.jpeg'],
    },
  };
}

function renderSection(section: BlogSection, idx: number, accentColor: string) {
  switch (section.type) {
    case 'heading':
      return (
        <h2 key={idx} style={{
          fontSize: '1.75rem', fontWeight: 900, color: '#0f172a',
          marginTop: '3.5rem', marginBottom: '1.5rem', letterSpacing: '-0.04em',
          lineHeight: 1.3,
          display: 'flex', alignItems: 'center', gap: '0.8rem',
        }}>
          <span style={{ width: '4px', height: '1.2em', background: accentColor, borderRadius: '4px' }} />
          {section.content}
        </h2>
      );

    case 'subheading':
      return (
        <h3 key={idx} style={{
          fontSize: '1.15rem', fontWeight: 800, color: '#1e293b',
          marginTop: '1.75rem', marginBottom: '0.75rem', letterSpacing: '-0.02em',
        }}>
          {section.content}
        </h3>
      );

    case 'paragraph':
      return (
        <p key={idx} style={{
          fontSize: '1.125rem', color: '#334155', lineHeight: 1.85,
          marginBottom: '1.5rem', fontWeight: 400
        }}>
          {section.content}
        </p>
      );

    case 'list':
    case 'list':
      return (
        <ul key={idx} style={{ listStyle: 'none', margin: '0 0 2rem', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
          {section.items?.map((item, i) => (
            <li key={i} style={{
              display: 'flex', gap: '1rem', alignItems: 'flex-start',
              padding: '1rem 1.25rem',
              background: `color-mix(in srgb, ${accentColor} 4%, transparent)`,
              borderRadius: '1rem',
              border: `1px solid color-mix(in srgb, ${accentColor} 12%, transparent)`,
            }}>
              <CheckCircle2 size={20} color={accentColor} style={{ flexShrink: 0, marginTop: '0.1rem' }} />
              <span style={{ fontSize: '1.05rem', color: '#334155', lineHeight: 1.7 }}>{item}</span>
            </li>
          ))}
        </ul>
      );

    case 'numbered':
      return (
        <ol key={idx} style={{ margin: '0 0 2rem', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.875rem', listStyle: 'none' }}>
          {section.items?.map((item, i) => (
            <li key={i} style={{
              display: 'flex', gap: '1.25rem', alignItems: 'flex-start',
              padding: '1.25rem 1.5rem',
              background: '#f8fafc',
              borderRadius: '1.25rem',
              border: '1px solid rgba(0,0,0,0.04)',
              boxShadow: '0 2px 10px rgba(0,0,0,0.02)'
            }}>
              <span style={{
                width: '32px', height: '32px',
                borderRadius: '50%',
                background: `linear-gradient(135deg, ${accentColor}, color-mix(in srgb, ${accentColor} 80%, black))`,
                color: '#fff',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '0.9rem', fontWeight: 800, flexShrink: 0,
                boxShadow: `0 4px 12px color-mix(in srgb, ${accentColor} 30%, transparent)`
              }}>
                {i + 1}
              </span>
              <span style={{ fontSize: '1.05rem', color: '#334155', lineHeight: 1.7, paddingTop: '0.15rem' }}>{item}</span>
            </li>
          ))}
        </ol>
      );

    case 'table':
      return (
        <div key={idx} style={{ marginBottom: '2rem', overflowX: 'auto', borderRadius: '1rem', border: '1px solid rgba(0,0,0,0.04)', padding: '1rem' }}>
          {section.heading && (
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem', paddingLeft: '0.25rem' }}>
              {section.heading}
            </h3>
          )}
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '1.05rem' }}>
            <thead>
              <tr style={{ background: `color-mix(in srgb, ${accentColor} 8%, transparent)` }}>
                {section.headers?.map((h, i) => (
                  <th key={i} style={{
                    padding: '1rem 1.25rem', textAlign: 'left',
                    fontWeight: 800, color: '#0f172a',
                    borderBottom: `2px solid color-mix(in srgb, ${accentColor} 20%, transparent)`,
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {section.rows?.map((row, ri) => (
                <tr key={ri} className="blog-table-row" style={{ background: ri % 2 === 0 ? '#fff' : '#f8fafc' }}>
                  {row.map((cell, ci) => (
                    <td key={ci} style={{
                      padding: '1rem 1.25rem', color: '#334155',
                      borderBottom: '1px solid rgba(0,0,0,0.05)',
                    }}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    case 'tip':
      return (
        <div key={idx} style={{
          display: 'flex', gap: '1.25rem', alignItems: 'flex-start',
          padding: '1.5rem 1.75rem',
          background: `color-mix(in srgb, ${accentColor} 8%, transparent)`,
          border: `1.5px solid color-mix(in srgb, ${accentColor} 20%, transparent)`,
          borderRadius: '1.25rem',
          marginBottom: '2rem',
          marginTop: '1rem',
          boxShadow: '0 4px 15px rgba(0,0,0,0.02)'
        }}>
          <AlertCircle size={26} color={accentColor} style={{ flexShrink: 0, marginTop: '0.1rem' }} />
          <p style={{ fontSize: '1.1rem', color: '#1e293b', lineHeight: 1.8, margin: 0, fontWeight: 500 }}>
            {section.content}
          </p>
        </div>
      );

    default:
      return null;
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const related = getRelatedPosts(post.relatedSlugs ?? []);
  const color = post.categoryColor;

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.summary,
        author: {
          '@type': 'Physician',
          name: 'Dr. B.M. Rafiqul Hasan (Mehedi)',
          '@id': `${BASE_URL}/#dr-hasan`,
          url: `${BASE_URL}/about`,
        },
        publisher: {
          '@type': 'Organization',
          name: 'RH Dental Care',
          '@id': `${BASE_URL}/#dentist`,
          logo: { '@type': 'ImageObject', url: `${BASE_URL}/rhlogo.jpeg` },
        },
        url: `${BASE_URL}/blog/${slug}`,
        image: `${BASE_URL}/rhlogo.jpeg`,
        articleSection: post.category,
        inLanguage: 'en-US',
        isPartOf: { '@id': `${BASE_URL}/#website` },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: `${BASE_URL}/blog` },
          { '@type': 'ListItem', position: 3, name: post.title, item: `${BASE_URL}/blog/${slug}` },
        ],
      },
    ],
  };

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd).replace(/</g, '\\u003c') }}
      />
      {/* Hero */}
      <div style={{
        background: 'linear-gradient(135deg, #020617 0%, #0f172a 60%, #020617 100%)',
        padding: '5rem 2rem 8rem',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: '-20%', left: '5%',
          width: '400px', height: '400px',
          background: `radial-gradient(circle, ${color}25 0%, transparent 70%)`,
          borderRadius: '50%', filter: 'blur(60px)',
        }} />

        <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <Link href="/blog" style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            color: 'rgba(255,255,255,0.5)', textDecoration: 'none',
            fontSize: '0.875rem', fontWeight: 600, marginBottom: '2rem',
          }}>
            <ArrowLeft size={16} />
            Back to All Articles
          </Link>

          <div style={{ marginBottom: '1.5rem' }}>
            <span style={{
              background: `color-mix(in srgb, ${color} 15%, transparent)`,
              border: `1px solid color-mix(in srgb, ${color} 30%, transparent)`,
              color: color, padding: '0.4rem 1.25rem',
              borderRadius: '100px', fontSize: '0.85rem', fontWeight: 800,
              textTransform: 'uppercase', letterSpacing: '0.12em',
            }}>
              {post.category}
            </span>
          </div>

          <h1 style={{
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: 900, color: '#fff',
            marginBottom: '1rem', letterSpacing: '-0.05em', lineHeight: 1.1,
          }}>
            {post.title}
          </h1>

          <p style={{
            fontSize: '1.2rem', color: 'rgba(255,255,255,0.6)',
            fontWeight: 500, marginBottom: '1.5rem', lineHeight: 1.6,
          }}>
            {post.subtitle}
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
            <span style={{
              display: 'flex', alignItems: 'center', gap: '0.4rem',
              color: 'rgba(255,255,255,0.5)', fontSize: '0.875rem', fontWeight: 600,
            }}>
              <Clock size={14} />
              {post.readTime}
            </span>
            <span style={{
              display: 'flex', alignItems: 'center', gap: '0.4rem',
              color: 'rgba(255,255,255,0.5)', fontSize: '0.875rem', fontWeight: 600,
            }}>
              <BookOpen size={14} />
              RH Dental Care
            </span>
          </div>
        </div>
      </div>

      {/* Summary box */}
      <div style={{ maxWidth: '900px', margin: '-4.5rem auto 0', padding: '0 2rem', position: 'relative', zIndex: 10 }}>
        <div style={{
          background: 'rgba(255,255,255,0.85)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderRadius: '1.5rem',
          padding: '2rem 2.5rem',
          boxShadow: '0 20px 60px rgba(0,0,0,0.08), 0 0 0 1px rgba(255,255,255,0.5) inset',
          border: `1px solid color-mix(in srgb, ${color} 20%, transparent)`,
          marginBottom: '3rem',
        }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '0.5rem',
            fontSize: '0.8rem', fontWeight: 800, color: color,
            textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '1rem',
          }}>
            <Sparkles size={14} /> Summary
          </div>
          <p style={{ margin: 0, fontSize: '1.15rem', color: '#1e293b', lineHeight: 1.8, fontWeight: 500 }}>
            {post.summary}
          </p>
        </div>
      </div>

      {/* Article body */}
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 2rem 5rem' }}>
        <div style={{
          background: '#fff',
          borderRadius: '2rem',
          padding: 'clamp(2rem, 5vw, 4rem)',
          boxShadow: '0 10px 40px rgba(0,0,0,0.03)',
          border: '1px solid rgba(0,0,0,0.04)',
        }}>
          {post.sections.map((s, i) => renderSection(s, i, color))}
        </div>

        {/* Related Articles */}
        {related.length > 0 && (
          <div style={{ marginTop: '4rem' }}>
            <h2 style={{
              fontSize: '1.5rem', fontWeight: 900, color: '#0f172a',
              marginBottom: '1.5rem', letterSpacing: '-0.03em',
            }}>
              Related Articles
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
              gap: '1.25rem',
            }}>
              {related.map((rPost) => (
                <Link key={rPost.slug} href={`/blog/${rPost.slug}`} style={{ textDecoration: 'none' }}>
                  <div 
                    className="related-post-card"
                    style={{
                      background: '#fff', borderRadius: '1.25rem', padding: '1.5rem',
                      border: '2px solid rgba(0,0,0,0.05)',
                      boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
                      '--item-color': rPost.categoryColor,
                    } as React.CSSProperties}
                  >
                    <span style={{
                      background: `${rPost.categoryColor}15`,
                      color: rPost.categoryColor,
                      padding: '0.25rem 0.625rem',
                      borderRadius: '100px',
                      fontSize: '0.7rem', fontWeight: 800,
                      display: 'inline-block', marginBottom: '0.75rem',
                    }}>
                      {rPost.category}
                    </span>
                    <h3 style={{
                      fontSize: '1rem', fontWeight: 800, color: '#0f172a',
                      marginBottom: '0.5rem', lineHeight: 1.35,
                    }}>
                      {rPost.title}
                    </h3>
                    <p style={{ fontSize: '0.85rem', color: '#64748b', lineHeight: 1.6, marginBottom: '1rem' }}>
                      {rPost.summary.slice(0, 90)}…
                    </p>
                    <div style={{
                      display: 'flex', alignItems: 'center', gap: '0.3rem',
                      color: rPost.categoryColor, fontWeight: 700, fontSize: '0.825rem',
                    }}>
                      Read <ArrowRight size={14} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div style={{
          marginTop: '4rem',
          background: 'linear-gradient(135deg, #020617, #0f172a)',
          borderRadius: '2rem', padding: '3rem 2rem', textAlign: 'center',
          boxShadow: '0 30px 70px rgba(2,6,23,0.2)',
        }}>
          <h2 style={{
            fontSize: '1.75rem', fontWeight: 900, color: '#fff',
            marginBottom: '0.875rem', letterSpacing: '-0.03em',
          }}>
            Ready to Schedule Treatment?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '2rem', fontSize: '1rem' }}>
            Our specialists are here to guide you through every step of your dental journey.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/contact" style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
              padding: '0.9rem 2rem',
              background: `linear-gradient(135deg, ${color}, ${color}cc)`,
              color: '#fff', borderRadius: '100px',
              fontWeight: 800, fontSize: '0.95rem', textDecoration: 'none',
              boxShadow: `0 12px 30px ${color}45`,
            }}>
              Book Consultation
            </Link>
            <Link href="/blog" style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
              padding: '0.9rem 2rem',
              background: 'rgba(255,255,255,0.1)',
              border: '1.5px solid rgba(255,255,255,0.2)',
              color: '#fff', borderRadius: '100px',
              fontWeight: 700, fontSize: '0.95rem', textDecoration: 'none',
            }}>
              More Articles
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
