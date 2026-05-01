'use client';

import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useInView, AnimatePresence, Variants } from 'framer-motion';
import {
  ArrowUpRight, Phone, ShieldCheck, Award, CheckCircle2,
  Sparkles, Clock, Stethoscope, Zap, Heart,
  ScanLine, MessageCircle, ChevronRight, ChevronDown,
  Target, Smile, Eye, Layers, Star,
  Play, Pause, Volume2, VolumeX, Maximize
} from 'lucide-react';
import '../implants/implants.css';
import './orthodontics.css';

import heroImg from '@/assets/ortho/ortho-hero.jpg';
import bracesFlyer from '@/assets/specialties/braces_clean.png';
import clinicActionImg from '@/assets/ortho/ortho-lab.jpg';

function FadeIn({ children, delay = 0, className }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] }}
    >{children}</motion.div>
  );
}

const stagger: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.09 } } };
const fadeUp: Variants = { hidden: { opacity: 0, y: 36 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } } };

const heroStats = [
  { val: '2 Paths', label: 'Treatment Options' },
  { val: '3D', label: 'Digital Planning' },
  { val: '12+', label: 'Years Expertise' },
  { val: '✓', label: 'Hybrid Approach' },
];

/* ── Portrait Video Player ── */
function OrthoVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [paused, setPaused] = useState(false);
  const inView = useInView(videoRef, { once: false, margin: '-100px' });

  useEffect(() => {
    if (!videoRef.current) return;
    if (inView && !paused) { videoRef.current.play().catch(() => {}); }
    else { videoRef.current.pause(); }
  }, [inView, paused]);

  return (
    <div className="ortho-video-wrapper">
      <video ref={videoRef} className="ortho-video" loop muted={muted} playsInline autoPlay preload="auto">
        <source src="https://res.cloudinary.com/dxrcufs8f/video/upload/v1777313544/ortho_video_tj8vbu.mp4" type="video/mp4" />
      </video>
      <div className="ortho-video-controls">
        <button onClick={() => { setPaused(!paused); if (videoRef.current) { paused ? videoRef.current.play() : videoRef.current.pause(); } }}>
          {paused ? <Play size={16} /> : <Pause size={16} />}
        </button>
        <button onClick={() => setMuted(!muted)}>{muted ? <VolumeX size={16} /> : <Volume2 size={16} />}</button>
        <button onClick={() => videoRef.current?.requestFullscreen()}><Maximize size={16} /></button>
      </div>
    </div>
  );
}

const faqs = [
  { q: 'How do I know which option is right for me?', a: 'It depends on the complexity of your case and your lifestyle preferences. During your consultation, we perform a comprehensive evaluation including 3D scanning to recommend the most suitable option — braces, aligners, or a hybrid approach.' },
  { q: 'Are clear aligners as effective as braces?', a: 'For mild to moderate cases, aligners deliver excellent results comparable to braces. For complex corrections involving severe crowding or bite issues, braces provide more control. Both are highly effective when used appropriately.' },
  { q: 'How long does orthodontic treatment take?', a: 'Treatment duration varies: simple aligner cases may take 6-12 months, while complex braces cases can take 18-24 months. Your personalized timeline is established during the consultation phase.' },
  { q: 'Is orthodontic treatment painful?', a: 'You may experience mild discomfort for 2-3 days after adjustments or new aligner trays. Modern brackets are smaller and smoother, and aligners are designed for maximum comfort.' },
  { q: 'Can adults get orthodontic treatment?', a: 'Absolutely. There is no age limit for orthodontics. Many of our patients are adults seeking improved alignment and bite correction, especially with the discreet option of clear aligners.' },
  { q: 'What is a hybrid approach?', a: 'Some patients benefit from using both braces and aligners strategically during different phases. For example, braces for initial complex movement, then aligners for final refinement and retention.' },
];

export default function OrthodonticsPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div>

      {/* ═══════════════ HERO ═══════════════ */}
      <section className="imp-hero ortho-hero">
        <div className="imp-hero-bg">
          <Image src={heroImg} alt="Orthodontic Treatment at RH Dental Care" fill priority quality={90} />
        </div>
        <div className="imp-hero-overlay" style={{ background: 'linear-gradient(180deg, rgba(2,6,23,0.6) 0%, rgba(2,6,23,0.35) 40%, rgba(2,6,23,0.9) 100%), radial-gradient(ellipse at 30% 20%, rgba(99,102,241,0.2) 0%, transparent 60%)' }} />
        <div className="imp-hero-content">
          <motion.div initial={{ opacity: 0, y: -14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Link href="/" className="ortho-breadcrumb">Home <ChevronRight size={12} /> <span>Specialties</span> <ChevronRight size={12} /> <span className="ortho-breadcrumb-active">Orthodontics</span></Link>
          </motion.div>
          <motion.div className="imp-badge ortho-badge" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.1 }}>
            <Sparkles size={14} /> Advanced Orthodontics
          </motion.div>
          <motion.h1 className="imp-hero-title" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}>
            Braces &amp; Clear <span>Aligners</span>
          </motion.h1>
          <motion.p className="imp-hero-subtitle" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}>
            Two advanced paths to the same confident smile. Controlled, gradual tooth movement guided by precision planning — tailored to your unique needs and lifestyle.
          </motion.p>
          <motion.div className="ortho-hero-stats" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.55 }}>
            {heroStats.map((s, i) => (
              <div key={i} className="ortho-stat-pill">
                <span className="ortho-stat-val">{s.val}</span>
                <span className="ortho-stat-label">{s.label}</span>
              </div>
            ))}
          </motion.div>
          <motion.div className="imp-hero-cta-row" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.7 }}>
            <Link href="/contact" className="imp-btn-primary" style={{ background: 'linear-gradient(135deg, #6366f1, #4f46e5)' }}>Book Consultation <ArrowUpRight size={18} /></Link>
            <a href="tel:+8801775227902" className="imp-btn-glass"><Phone size={16} /> Call Now</a>
            <a href="https://wa.me/8801775227902" target="_blank" rel="noopener noreferrer" className="imp-btn-glass" style={{ color: '#25D366' }}><MessageCircle size={16} /> WhatsApp</a>
          </motion.div>
        </div>
        <div className="imp-scroll-indicator"><span>Scroll</span><div className="imp-scroll-line" /></div>
      </section>

      {/* ═══════════════ PHILOSOPHY STRIP ═══════════════ */}
      <section className="ortho-philosophy">
        <div className="container">
          <FadeIn>
            <div className="ortho-philosophy-inner">
              <div className="ortho-philosophy-icon"><Smile size={28} /></div>
              <div>
                <div className="ortho-philosophy-title">A Balanced Perspective</div>
                <p className="ortho-philosophy-text">
                  Both braces and aligners are grounded in the same orthodontic principles: controlled, gradual tooth movement guided by precision planning. The difference lies in how that movement is delivered. <strong>Braces offer unmatched control and versatility. Aligners offer discretion and lifestyle flexibility.</strong> The best choice is not about &ldquo;which is better,&rdquo; but which is better <em>for you</em>.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════ BRACES vs ALIGNERS ═══════════════ */}
      <section className="imp-section imp-section-white">
        <div className="container">
          <FadeIn>
            <div className="imp-section-header">
              <span className="imp-label"><Heart size={14} /> Two Paths, One Goal</span>
              <h2 className="imp-title">Choose Your <span className="imp-accent" style={{ background: 'linear-gradient(135deg, #6366f1, #0ea5e9)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Path to Confidence</span></h2>
              <p className="imp-subtitle">Rather than comparing them as competitors, we see them as complementary tools — each with its own strengths, designed to suit different needs and lifestyles.</p>
            </div>
          </FadeIn>
          <div className="ortho-split-grid">
            {/* Braces Card */}
            <FadeIn delay={0.1}>
              <div className="ortho-option-card ortho-braces-card">
                <div className="ortho-card-header">
                  <div className="ortho-card-icon ortho-braces-icon">🦷</div>
                  <div>
                    <div className="ortho-card-tag ortho-braces-tag">Braces</div>
                    <h3 className="ortho-card-title">Timeless Precision &amp; Full Control</h3>
                  </div>
                </div>
                <p className="ortho-card-desc">Braces have evolved significantly with modern materials. Today&apos;s systems are more comfortable, more aesthetic, and more efficient than ever. They remain the gold standard when precision and full control are essential.</p>
                <div className="ortho-advantages-list">
                  {['Ideal for complex and comprehensive corrections', 'Continuous, controlled force for precise movement', 'Highly effective for bite issues and severe crowding', 'Consistent results regardless of compliance', 'Smaller, smoother brackets for improved comfort', 'Ceramic options for a more aesthetic look'].map((t, i) => (
                    <div key={i} className="ortho-advantage-item">
                      <div className="ortho-advantage-icon ortho-braces-adv-icon"><CheckCircle2 size={15} /></div>
                      <span>{t}</span>
                    </div>
                  ))}
                </div>
                <div className="ortho-card-best-for">
                  <span className="ortho-best-label">Best For</span>
                  <p>Complex cases, severe crowding, bite corrections, and patients wanting proven, hands-off treatment.</p>
                </div>
                <Link href="/contact" className="ortho-card-cta ortho-braces-cta">Book Braces Consultation <ArrowUpRight size={16} /></Link>
              </div>
            </FadeIn>

            {/* Aligners Card */}
            <FadeIn delay={0.2}>
              <div className="ortho-option-card ortho-aligner-card">
                <div className="ortho-card-header">
                  <div className="ortho-card-icon ortho-aligner-icon">✨</div>
                  <div>
                    <div className="ortho-card-tag ortho-aligner-tag">Clear Aligners</div>
                    <h3 className="ortho-card-title">Discreet Innovation &amp; Everyday Comfort</h3>
                  </div>
                </div>
                <p className="ortho-card-desc">Clear aligners represent the modern evolution of orthodontics — designed for patients who want effective treatment without compromising their appearance or routine. Using advanced 3D scanning and simulation, each aligner is custom-crafted.</p>
                <div className="ortho-advantages-list">
                  {['Virtually invisible — professional & social confidence', 'Removable — no food or hygiene restrictions', 'Comfort-focused — smooth, wire-free design', 'Digitally engineered step-by-step precision', 'Custom-crafted with advanced 3D scanning', 'Ideal for mild to moderate cases'].map((t, i) => (
                    <div key={i} className="ortho-advantage-item">
                      <div className="ortho-advantage-icon ortho-aligner-adv-icon"><CheckCircle2 size={15} /></div>
                      <span>{t}</span>
                    </div>
                  ))}
                </div>
                <div className="ortho-card-best-for">
                  <span className="ortho-best-label">Best For</span>
                  <p>Mild to moderate cases, professionals, and patients who value flexibility, aesthetics, and lifestyle freedom.</p>
                </div>
                <Link href="/contact" className="ortho-card-cta ortho-aligner-cta">Book Aligner Consultation <ArrowUpRight size={16} /></Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══════════════ APPRECIATING BOTH ═══════════════ */}
      <section className="imp-section imp-section-alt">
        <div className="container">
          <div className="imp-what-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
            <FadeIn>
              <div className="imp-what-content">
                <span className="imp-label"><Star size={14} /> Appreciating Both</span>
                <h2>A Thoughtful <span style={{ color: '#6366f1' }}>Choice</span></h2>
                <p>Instead of choosing sides, it&apos;s important to recognize the unique strengths of each approach. Some patients even benefit from a <strong>hybrid approach</strong>, where both techniques are used strategically during different phases.</p>
                <div className="imp-gallery-checks">
                  {['Braces excel in complexity and full control', 'Aligners excel in convenience and discretion', 'Both deliver excellent results when used appropriately', 'Hybrid approach combines best of both worlds', 'No one-size-fits-all — each case is unique'].map((t, i) => (
                    <div key={i} className="imp-gallery-check"><CheckCircle2 size={16} />{t}</div>
                  ))}
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div className="imp-what-img">
                <Image src={clinicActionImg} alt="Orthodontic treatment options" fill sizes="(max-width:1024px) 100vw, 50vw" style={{ objectFit: 'cover' }} />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══════════════ FLYER SECTION ═══════════════ */}
      <section className="imp-section" style={{ background: '#f8fafc', padding: '0 0 6rem 0' }}>
        <div className="container">
          <FadeIn>
            <div style={{
              position: 'relative',
              width: '100%',
              maxWidth: '1200px',
              aspectRatio: '16/10',
              margin: '0 auto',
              borderRadius: '1.5rem',
              overflow: 'hidden',
              boxShadow: '0 25px 60px rgba(0,0,0,0.08)',
              border: '2px solid rgba(99,102,241,0.1)'
            }}>
              <Image 
                src={bracesFlyer} 
                alt="Orthodontic Braces Flyer" 
                fill 
                style={{ objectFit: 'contain', background: '#fff' }} 
              />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════ CLINICAL APPROACH ═══════════════ */}
      <section className="imp-section imp-section-white">
        <div className="container">
          <FadeIn>
            <div className="imp-section-header">
              <span className="imp-label"><ScanLine size={14} /> Our Clinical Approach</span>
              <h2 className="imp-title">Precision <span className="imp-accent" style={{ background: 'linear-gradient(135deg, #6366f1, #4f46e5)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Planning</span></h2>
              <p className="imp-subtitle">Every case begins with a comprehensive evaluation — then we recommend the most suitable option based on scientific accuracy and patient preference.</p>
            </div>
          </FadeIn>
          <motion.div className="ortho-why-grid" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }}>
            {[
              { icon: <ScanLine size={24} />, title: 'Digital Smile Assessment', desc: 'Complete facial and dental analysis using high-resolution photography and software.', bg: '#e0f2fe', color: '#0ea5e9' },
              { icon: <Layers size={24} />, title: '3D Intraoral Scanning', desc: 'Precise digital impressions — no messy moulds, instant 3D models of your teeth.', bg: '#ede9fe', color: '#6366f1' },
              { icon: <Target size={24} />, title: 'Bite & Jaw Analysis', desc: 'Comprehensive assessment of occlusion, jaw alignment, and functional harmony.', bg: '#fef3c7', color: '#f59e0b' },
              { icon: <Stethoscope size={24} />, title: 'Personalized Treatment Plan', desc: 'Braces, aligners, or a combination — recommended based on your unique case.', bg: '#d1fae5', color: '#10b981' },
              { icon: <Eye size={24} />, title: 'Smile Preview', desc: 'See your predicted end-result before treatment begins with digital simulation.', bg: '#fce7f3', color: '#ec4899' },
              { icon: <Award size={24} />, title: 'Progress Monitoring', desc: 'Regular check-ups with digital tracking to ensure your treatment stays on course.', bg: '#fee2e2', color: '#ef4444' },
            ].map((item, i) => (
              <motion.div key={i} className="ortho-why-card" variants={fadeUp}>
                <div className="ortho-why-icon" style={{ background: item.bg, color: item.color }}>{item.icon}</div>
                <div className="ortho-why-title">{item.title}</div>
                <p className="ortho-why-desc">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════ VIDEO — PORTRAIT ═══════════════ */}
      <section className="ortho-video-section">
        <div className="ortho-vid-orb ortho-vid-orb-1" />
        <div className="ortho-vid-orb ortho-vid-orb-2" />
        <div className="container">
          <FadeIn>
            <div className="imp-section-header" style={{ color: '#fff' }}>
              <span className="imp-label" style={{ background: 'rgba(99,102,241,0.15)', borderColor: 'rgba(99,102,241,0.3)', color: '#a5b4fc' }}><Play size={14} /> Watch Our Work</span>
              <h2 className="imp-title" style={{ color: '#f1f5f9' }}>See Orthodontics <span style={{ background: 'linear-gradient(135deg, #a5b4fc, #818cf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>in Action</span></h2>
              <p className="imp-subtitle" style={{ color: 'rgba(203,213,225,0.8)' }}>Watch real orthodontic treatment at RH Dental Care — precision planning, modern technology, and stunning results.</p>
            </div>
          </FadeIn>
          <FadeIn delay={0.15}>
            <OrthoVideo />
          </FadeIn>
          <FadeIn delay={0.25}>
            <div className="imp-video-badges">
              {[
                { icon: <ScanLine size={16} />, text: '3D Digital Planning' },
                { icon: <ShieldCheck size={16} />, text: 'Precision Treatment' },
                { icon: <Smile size={16} />, text: 'Life-Changing Results' },
              ].map((b, i) => (
                <div key={i} className="imp-video-badge-item" style={{ borderColor: 'rgba(99,102,241,0.15)' }}>
                  <span style={{ color: '#a5b4fc' }}>{b.icon}</span> <span>{b.text}</span>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════ THE OUTCOME ═══════════════ */}
      <section className="imp-section imp-section-white">
        <div className="container">
          <FadeIn>
            <div className="imp-section-header">
              <span className="imp-label"><Heart size={14} /> The Outcome That Matters</span>
              <h2 className="imp-title">Regardless of Method, the <span className="imp-accent" style={{ background: 'linear-gradient(135deg, #6366f1, #4f46e5)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Goal Is the Same</span></h2>
            </div>
          </FadeIn>
          <motion.div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', maxWidth: 900, margin: '0 auto' }} variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
            {[
              { icon: <Smile size={28} />, title: 'A Balanced, Natural Smile', desc: 'Perfectly aligned teeth that look and feel completely natural.', bg: '#ede9fe', color: '#6366f1' },
              { icon: <Zap size={28} />, title: 'Improved Function & Health', desc: 'Better chewing, easier cleaning, and long-term oral health benefits.', bg: '#e0f2fe', color: '#0ea5e9' },
              { icon: <ShieldCheck size={28} />, title: 'Long-Term Stability', desc: 'Retention protocols ensure your results last a lifetime.', bg: '#d1fae5', color: '#10b981' },
            ].map((item, i) => (
              <motion.div key={i} variants={fadeUp} style={{ background: '#fff', borderRadius: '1.5rem', padding: '2.25rem', border: '1px solid rgba(0,0,0,0.04)', boxShadow: '0 4px 24px rgba(0,0,0,0.02)', textAlign: 'center', transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)' }}>
                <div style={{ width: 64, height: 64, borderRadius: 18, background: item.bg, color: item.color, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem' }}>{item.icon}</div>
                <div style={{ fontSize: '1.08rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.6rem' }}>{item.title}</div>
                <p style={{ fontSize: '0.87rem', color: '#64748b', lineHeight: 1.75, margin: 0 }}>{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
          <FadeIn delay={0.2}>
            <p style={{ textAlign: 'center', marginTop: '3rem', fontSize: '1.15rem', fontWeight: 700, color: '#4f46e5', fontStyle: 'italic' }}>
              &ldquo;Your smile is unique — your treatment should be too.&rdquo;
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════ FAQ ═══════════════ */}
      <section className="imp-section imp-section-light">
        <div className="container">
          <FadeIn>
            <div className="imp-section-header">
              <span className="imp-label"><Stethoscope size={14} /> Common Questions</span>
              <h2 className="imp-title">Orthodontics <span className="imp-accent">FAQs</span></h2>
            </div>
          </FadeIn>
          <div className="ortho-faq-list" style={{ maxWidth: 800, margin: '0 auto' }}>
            {faqs.map((faq, i) => (
              <FadeIn key={i} delay={i * 0.04}>
                <div className={`ortho-faq-item ${openFaq === i ? 'open' : ''}`}>
                  <button className="ortho-faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                    <span>{faq.q}</span>
                    <ChevronDown size={18} className="ortho-faq-icon" />
                  </button>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div className="ortho-faq-a" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }} style={{ overflow: 'hidden' }}>
                        <p>{faq.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ CTA ═══════════════ */}
      <section className="imp-cta">
        <div className="imp-cta-orb" style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.12), transparent 70%)' }} />
        <div className="imp-cta-orb" style={{ top: 'auto', bottom: -120, left: -80, right: 'auto', background: 'radial-gradient(circle, rgba(129,140,248,0.08), transparent 70%)' }} />
        <div className="container">
          <FadeIn>
            <div className="imp-cta-inner">
              <div className="imp-badge" style={{ margin: '0 auto 1.5rem', background: 'rgba(99,102,241,0.15)', borderColor: 'rgba(99,102,241,0.3)', color: '#a5b4fc' }}>
                <Sparkles size={14} /> Your Smile Journey Starts Here
              </div>
              <h2 className="imp-cta-title">
                Ready for a{' '}
                <span style={{ background: 'linear-gradient(135deg, #a5b4fc, #818cf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Confident Smile?</span>
              </h2>
              <p className="imp-cta-sub">With the right expertise and technology, both braces and aligners can deliver exceptional, life-changing results. Book your consultation today.</p>
              <div className="imp-cta-btns">
                <Link href="/contact" className="imp-btn-primary" style={{ background: 'linear-gradient(135deg, #6366f1, #4f46e5)' }}>Book Consultation <ArrowUpRight size={18} /></Link>
                <a href="tel:+8801775227902" className="imp-btn-glass"><Phone size={16} /> Call Now</a>
                <a href="https://wa.me/8801775227902" target="_blank" rel="noopener noreferrer" className="imp-btn-glass" style={{ color: '#25D366' }}><MessageCircle size={16} /> WhatsApp</a>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
