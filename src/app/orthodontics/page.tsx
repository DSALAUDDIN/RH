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
import BranchCTA from '@/components/branch/BranchCTA';

import heroImg from '@/assets/ortho/ortho-hero.jpg';
import invisalignFlyer from '@/assets/ortho/invisalign_flyer.png';
import bracesProgress from '@/assets/ortho/braces_progress.png';
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
  // REMOVED: an unevidenced '12+ Years Expertise' counter.
  { val: '2', label: 'Branches' },
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
        <div className="imp-hero-overlay" style={{ background: 'linear-gradient(180deg, rgba(247, 245, 238, 0.72) 0%, rgba(247, 245, 238, 0.47) 40%, rgba(247, 245, 238, 0.92) 100%), radial-gradient(ellipse at 30% 20%, rgba(156,124,56,0.2) 0%, transparent 60%)' }} />
        <div className="imp-hero-content">
          <motion.div initial={{ opacity: 0, y: -14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Link href="/" className="ortho-breadcrumb">Home <ChevronRight size={12} /> <span>Specialties</span> <ChevronRight size={12} /> <span className="ortho-breadcrumb-active">Orthodontics</span></Link>
          </motion.div>
          <motion.div className="imp-badge ortho-badge" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.1 }}>
            <Sparkles size={14} /> Advanced Orthodontics
          </motion.div>
          <motion.h1 className="imp-hero-title" initial={{ opacity: 0.001, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}>
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
            <BranchCTA action="book" service="Orthodontics & Braces" className="imp-btn-primary" style={{ background: 'linear-gradient(135deg, #9C7C38, #7E6329)' }}>Book Consultation <ArrowUpRight size={18} /></BranchCTA>
            <BranchCTA action="call" service="Orthodontics & Braces" className="imp-btn-glass"><Phone size={16} /> Call Now</BranchCTA>
            <BranchCTA action="whatsapp" service="Orthodontics & Braces" className="imp-btn-glass" style={{ color: '#25D366' }}><MessageCircle size={16} /> WhatsApp</BranchCTA>
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

      {/* ═══════════════ ORTHODONTIC PACKAGES ═══════════════ */}
      <section className="imp-section imp-section-white">
        <div className="container">
          <FadeIn>
            <div className="imp-section-header">
              <span className="imp-label"><Award size={14} /> Investment in Your Future</span>
              <h2 className="imp-title">Treatment <span className="imp-accent" style={{ background: 'linear-gradient(135deg, #9C7C38, #9C7C38)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Packages</span></h2>
              <p className="imp-subtitle">Transparent pricing tailored to your unique clinical needs and lifestyle preferences.</p>
            </div>
          </FadeIn>

          <div className="ortho-split-grid">
            {/* Braces Card */}
            <FadeIn delay={0.1}>
              <div className="ortho-option-card ortho-braces-card">
                <div className="ortho-card-header">
                  <div className="ortho-card-icon ortho-braces-icon">🦷</div>
                  <div>
                    <div className="ortho-card-tag ortho-braces-tag">Orthodontic Braces</div>
                    <div style={{ fontSize: '0.8rem', color: '#6E6B57', fontWeight: 600 }}>Effective · Reliable · Transformative</div>
                  </div>
                </div>
                
                <div style={{ background: 'rgba(255,255,255,0.6)', border: '1px dashed rgba(156,124,56,0.3)', borderRadius: '1rem', padding: '1.25rem', marginBottom: '1.5rem', textAlign: 'center' }}>
                  <span style={{ fontSize: '0.7rem', fontWeight: 600, textTransform: 'uppercase', color: '#8C8973', display: 'block', marginBottom: '0.2rem' }}>Price Range</span>
                  <div style={{ fontSize: '1.8rem', fontWeight: 600, color: '#2B2A1C' }}>৳80,000 – 120,000</div>
                </div>

                <div className="ortho-advantages-list">
                  {[
                    { t: 'Effective for all types of misalignment', d: 'Ideal for simple to complex cases' },
                    { t: 'Durable & long-lasting results', d: 'Provides strong and stable movement' },
                    { t: 'Cost-effective option', d: 'More affordable compared to aligners' },
                    { t: 'No discipline required', d: 'Works 24/7 once placed' },
                    { t: 'Improves oral health', d: 'Easier cleaning and long-term function' },
                    { t: 'Custom treatment', d: 'Tailored to your unique dental needs' }
                  ].map((item, i) => (
                    <div key={i} className="ortho-advantage-item" style={{ alignItems: 'flex-start' }}>
                      <div className="ortho-advantage-icon ortho-braces-adv-icon" style={{ marginTop: '0.2rem' }}><CheckCircle2 size={14} /></div>
                      <div>
                        <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#2B2A1C' }}>{item.t}</div>
                        <div style={{ fontSize: '0.8rem', color: '#6E6B57', fontWeight: 500 }}>{item.d}</div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <Link href="/contact" className="ortho-card-cta ortho-braces-cta" style={{ width: '100%', justifyContent: 'center' }}>Book Braces Consultation <ArrowUpRight size={16} /></Link>
              </div>
            </FadeIn>

            {/* Aligners Card */}
            <FadeIn delay={0.2}>
              <div className="ortho-option-card ortho-aligner-card">
                <div className="ortho-card-header">
                  <div className="ortho-card-icon ortho-aligner-icon">✨</div>
                  <div>
                    <div className="ortho-card-tag ortho-aligner-tag">Clear Aligners</div>
                    <div style={{ fontSize: '0.8rem', color: '#6E6B57', fontWeight: 600 }}>Clear · Comfortable · Confident</div>
                  </div>
                </div>

                <div style={{ background: 'rgba(255,255,255,0.6)', border: '1px dashed rgba(156,124,56,0.3)', borderRadius: '1rem', padding: '1.25rem', marginBottom: '1.5rem', textAlign: 'center' }}>
                  <span style={{ fontSize: '0.7rem', fontWeight: 600, textTransform: 'uppercase', color: '#8C8973', display: 'block', marginBottom: '0.2rem' }}>Price Range</span>
                  <div style={{ fontSize: '1.8rem', fontWeight: 600, color: '#2B2A1C' }}>৳200,000 – 350,000</div>
                </div>

                <div className="ortho-advantages-list">
                  {[
                    { t: 'Virtually invisible', d: 'Clear and discreet for a confident smile' },
                    { t: 'Removable & comfortable', d: 'Easy to eat, brush and floss' },
                    { t: 'Advanced digital planning', d: 'Precision planning for predictable results' },
                    { t: 'Fewer dental visits', d: 'Convenient and time-saving' },
                    { t: 'Smooth & gentle movement', d: 'More comfort throughout the treatment' },
                    { t: 'Ideal for adults & professionals', d: 'Aesthetic solution for modern lifestyle' }
                  ].map((item, i) => (
                    <div key={i} className="ortho-advantage-item" style={{ alignItems: 'flex-start' }}>
                      <div className="ortho-advantage-icon ortho-aligner-adv-icon" style={{ marginTop: '0.2rem' }}><CheckCircle2 size={14} /></div>
                      <div>
                        <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#2B2A1C' }}>{item.t}</div>
                        <div style={{ fontSize: '0.8rem', color: '#6E6B57', fontWeight: 500 }}>{item.d}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <Link href="/contact" className="ortho-card-cta ortho-aligner-cta" style={{ width: '100%', justifyContent: 'center' }}>Book Aligner Consultation <ArrowUpRight size={16} /></Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══════════════ APPRECIATING BOTH ═══════════════ */}
      <section className="imp-section imp-section-alt">
        <div className="container">
          <div className="imp-what-grid">
            <FadeIn>
              <div className="imp-what-content">
                <span className="imp-label"><Star size={14} /> Appreciating Both</span>
                <h2>A Thoughtful <span style={{ color: '#9C7C38' }}>Choice</span></h2>
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


      {/* ═══════════════ INVISALIGN — SPLIT LAYOUT ═══════════════ */}
      <section className="imp-section imp-section-white">
        <div className="container">
          <FadeIn>
            <div className="imp-section-header">
              <span className="imp-label"><Sparkles size={14} /> The Future of Orthodontics</span>
              <h2 className="imp-title">How Does <span className="imp-accent" style={{ background: 'linear-gradient(135deg, #9C7C38, #CDAE51)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Invisalign</span> Work?</h2>
              <p className="imp-subtitle">Move forward in life with a newer, better smile — make traditional braces a thing of the past.</p>
            </div>
          </FadeIn>

          <div className="ortho-invisalign-split">
            {/* Left — image inside a styled frame */}
            <FadeIn delay={0.1}>
              <div className="ortho-invisalign-img-frame">
                <div className="ortho-invisalign-img-glow" />
                <Image
                  src={invisalignFlyer}
                  alt="Invisalign Treatment Guide by RH Dental Care"
                  style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '1.25rem', position: 'relative', zIndex: 1 }}
                  quality={100}
                />
              </div>
            </FadeIn>

            {/* Right — steps */}
            <FadeIn delay={0.2}>
              <div className="ortho-invisalign-steps">
                <p className="ortho-invisalign-tagline">
                  &ldquo;Your smile is our happiness&rdquo;
                </p>

                {[
                  {
                    num: '01',
                    color: '#9C7C38',
                    bg: '#DCE7D2',
                    title: 'Treat',
                    desc: 'Your journey begins with a scan or physical impression of your teeth. Your orthodontist will develop a complete plan — carefully planning your best smile from start to finish.',
                  },
                  {
                    num: '02',
                    color: '#9C7C38',
                    bg: '#F1EEE3',
                    title: 'Trays',
                    desc: 'You receive a series of custom-made clear aligners or trays, worn 20–22 hours a day. They are removable, so your daily life stays completely uninterrupted.',
                  },
                  {
                    num: '03',
                    color: '#55684F',
                    bg: '#DCE7D2',
                    title: 'Transform',
                    desc: 'As you progress through your trays, teeth move gradually through expertly designed movements — transforming not just your smile, but your life.',
                  },
                ].map((step, i) => (
                  <motion.div
                    key={i}
                    className="ortho-step-card"
                    initial={{ opacity: 0, x: 24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.15 * i, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div className="ortho-step-num" style={{ background: step.bg, color: step.color }}>
                      {step.num}
                    </div>
                    <div className="ortho-step-body">
                      <div className="ortho-step-title" style={{ color: step.color }}>{step.title}</div>
                      <p className="ortho-step-desc">{step.desc}</p>
                    </div>
                  </motion.div>
                ))}

                <Link href="/contact" className="imp-btn-primary" style={{ background: 'linear-gradient(135deg, #9C7C38, #CDAE51)', marginTop: '1.5rem', display: 'inline-flex' }}>
                  Book Invisalign Consultation <ArrowUpRight size={18} />
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══════════════ BRACES PROGRESS — SPLIT LAYOUT ═══════════════ */}
      <section className="imp-section imp-section-light">
        <div className="container">
          <FadeIn>
            <div className="imp-section-header">
              <span className="imp-label"><Layers size={14} /> The Braces Journey</span>
              <h2 className="imp-title">Stages of <span className="imp-accent" style={{ background: 'linear-gradient(135deg, #9C7C38, #7E6329)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Transformation</span></h2>
              <p className="imp-subtitle">A step-by-step look at how modern braces gradually align your teeth for a perfect, healthy smile.</p>
            </div>
          </FadeIn>

          <div className="imp-what-grid ortho-invisalign-split" style={{ alignItems: 'center' }}>
            {/* Left — steps/content */}
            <FadeIn delay={0.1}>
              <div className="ortho-invisalign-steps">
                <p className="ortho-invisalign-tagline" style={{ color: '#9C7C38' }}>
                  &ldquo;Precision at every stage&rdquo;
                </p>

                {[
                  {
                    num: '01',
                    color: '#9C7C38',
                    bg: '#F1EEE3',
                    title: 'Initial Bonding',
                    desc: 'High-precision brackets are bonded to your teeth, and the first architectural wire is placed to begin the alignment process.',
                  },
                  {
                    num: '02',
                    color: '#9C7C38',
                    bg: '#DCE7D2',
                    title: 'Leveling & Space Closure',
                    desc: 'Advanced mechanics like power chains or elastic loops are used to close gaps and align the arches with surgical precision.',
                  },
                  {
                    num: '03',
                    color: '#55684F',
                    bg: '#DCE7D2',
                    title: 'Final Reveal',
                    desc: 'After the teeth have reached their ideal positions, the braces are removed to reveal a perfectly balanced, healthy smile.',
                  },
                ].map((step, i) => (
                  <motion.div
                    key={i}
                    className="ortho-step-card"
                    initial={{ opacity: 0, x: -24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.15 * i, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div className="ortho-step-num" style={{ background: step.bg, color: step.color }}>
                      {step.num}
                    </div>
                    <div className="ortho-step-body">
                      <div className="ortho-step-title" style={{ color: step.color }}>{step.title}</div>
                      <p className="ortho-step-desc">{step.desc}</p>
                    </div>
                  </motion.div>
                ))}

                <Link href="/contact" className="imp-btn-primary" style={{ background: 'linear-gradient(135deg, #9C7C38, #7E6329)', marginTop: '1.5rem', display: 'inline-flex' }}>
                  Start Your Journey <ArrowUpRight size={18} />
                </Link>
              </div>
            </FadeIn>

            {/* Right — the progress image */}
            <FadeIn delay={0.2}>
              <div className="ortho-invisalign-img-frame" style={{ border: '2px solid rgba(156,124,56,0.1)' }}>
                <div className="ortho-invisalign-img-glow" style={{ background: 'radial-gradient(circle, rgba(156,124,56,0.15), transparent 70%)' }} />
                <Image
                  src={bracesProgress}
                  alt="Braces Treatment Progress — Before and After at RH Dental Care"
                  style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '1.25rem', position: 'relative', zIndex: 1 }}
                  quality={100}
                />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══════════════ CLINICAL APPROACH ═══════════════ */}
      <section className="imp-section imp-section-white">
        <div className="container">
          <FadeIn>
            <div className="imp-section-header">
              <span className="imp-label"><ScanLine size={14} /> Our Clinical Approach</span>
              <h2 className="imp-title">Precision <span className="imp-accent" style={{ background: 'linear-gradient(135deg, #9C7C38, #7E6329)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Planning</span></h2>
              <p className="imp-subtitle">Every case begins with a comprehensive evaluation — then we recommend the most suitable option based on scientific accuracy and patient preference.</p>
            </div>
          </FadeIn>
          <motion.div className="ortho-why-grid" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }}>
            {[
              { icon: <ScanLine size={24} />, title: 'Digital Smile Assessment', desc: 'Complete facial and dental analysis using high-resolution photography and software.', bg: '#DCE7D2', color: '#9C7C38' },
              { icon: <Layers size={24} />, title: '3D Intraoral Scanning', desc: 'Precise digital impressions — no messy moulds, instant 3D models of your teeth.', bg: '#F1EEE3', color: '#9C7C38' },
              { icon: <Target size={24} />, title: 'Bite & Jaw Analysis', desc: 'Comprehensive assessment of occlusion, jaw alignment, and functional harmony.', bg: '#EFE3CB', color: 'var(--rh-brass)' },
              { icon: <Stethoscope size={24} />, title: 'Personalized Treatment Plan', desc: 'Braces, aligners, or a combination — recommended based on your unique case.', bg: '#DCE7D2', color: '#55684F' },
              { icon: <Eye size={24} />, title: 'Smile Preview', desc: 'See your predicted end-result before treatment begins with digital simulation.', bg: '#EFE3CB', color: '#9C7C38' },
              { icon: <Award size={24} />, title: 'Progress Monitoring', desc: 'Regular check-ups with digital tracking to ensure your treatment stays on course.', bg: '#F0E0D8', color: '#8A3B2A' },
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
            <div className="imp-section-header" style={{ color: 'var(--rh-ink)' }}>
              <span className="imp-label" style={{ background: 'rgba(156,124,56,0.15)', borderColor: 'rgba(156,124,56,0.3)', color: '#a5b4fc' }}><Play size={14} /> Watch Our Work</span>
              <h2 className="imp-title" style={{ color: '#F1EEE3' }}>See Orthodontics <span style={{ background: 'linear-gradient(135deg, #a5b4fc, #CDAE51)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>in Action</span></h2>
              <p className="imp-subtitle" style={{ color: 'rgba(201,197,178,0.8)' }}>Watch real orthodontic treatment at RH Dental Care — precision planning, modern technology, and stunning results.</p>
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
                <div key={i} className="imp-video-badge-item" style={{ borderColor: 'rgba(156,124,56,0.15)' }}>
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
              <h2 className="imp-title">Regardless of Method, the <span className="imp-accent" style={{ background: 'linear-gradient(135deg, #9C7C38, #7E6329)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Goal Is the Same</span></h2>
            </div>
          </FadeIn>
          <motion.div className="imp-types-grid" style={{ gap: '1.5rem', maxWidth: 900, margin: '0 auto' }} variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
            {[
              { icon: <Smile size={28} />, title: 'A Balanced, Natural Smile', desc: 'Perfectly aligned teeth that look and feel completely natural.', bg: '#F1EEE3', color: '#9C7C38' },
              { icon: <Zap size={28} />, title: 'Improved Function & Health', desc: 'Better chewing, easier cleaning, and long-term oral health benefits.', bg: '#DCE7D2', color: '#9C7C38' },
              { icon: <ShieldCheck size={28} />, title: 'Long-Term Stability', desc: 'Retention protocols ensure your results last a lifetime.', bg: '#DCE7D2', color: '#55684F' },
            ].map((item, i) => (
              <motion.div key={i} variants={fadeUp} style={{ background: '#fff', borderRadius: '1.5rem', padding: '2.25rem', border: '1px solid rgba(0,0,0,0.04)', boxShadow: '0 4px 24px rgba(0,0,0,0.02)', textAlign: 'center', transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)' }}>
                <div style={{ width: 64, height: 64, borderRadius: 18, background: item.bg, color: item.color, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem' }}>{item.icon}</div>
                <div style={{ fontSize: '1.08rem', fontWeight: 600, color: '#2B2A1C', marginBottom: '0.6rem' }}>{item.title}</div>
                <p style={{ fontSize: '0.87rem', color: '#6E6B57', lineHeight: 1.75, margin: 0 }}>{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
          <FadeIn delay={0.2}>
            <p style={{ textAlign: 'center', marginTop: '3rem', fontSize: '1.15rem', fontWeight: 700, color: '#7E6329', fontStyle: 'italic' }}>
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
        <div className="imp-cta-orb" style={{ background: 'radial-gradient(circle, rgba(156,124,56,0.12), transparent 70%)' }} />
        <div className="imp-cta-orb" style={{ top: 'auto', bottom: -120, left: -80, right: 'auto', background: 'radial-gradient(circle, rgba(129,140,248,0.08), transparent 70%)' }} />
        <div className="container">
          <FadeIn>
            <div className="imp-cta-inner">
              <div className="imp-badge" style={{ margin: '0 auto 1.5rem', background: 'rgba(156,124,56,0.15)', borderColor: 'rgba(156,124,56,0.3)', color: '#a5b4fc' }}>
                <Sparkles size={14} /> Your Smile Journey Starts Here
              </div>
              <h2 className="imp-cta-title">
                Ready for a{' '}
                <span style={{ background: 'linear-gradient(135deg, #a5b4fc, #CDAE51)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Confident Smile?</span>
              </h2>
              <p className="imp-cta-sub">With the right expertise and technology, both braces and aligners can deliver exceptional, life-changing results. Book your consultation today.</p>
              <div className="imp-cta-btns">
                <BranchCTA action="book" service="Orthodontics & Braces" className="imp-btn-primary" style={{ background: 'linear-gradient(135deg, #9C7C38, #7E6329)' }}>Book Consultation <ArrowUpRight size={18} /></BranchCTA>
                <BranchCTA action="call" service="Orthodontics & Braces" className="imp-btn-glass"><Phone size={16} /> Call Now</BranchCTA>
                <BranchCTA action="whatsapp" service="Orthodontics & Braces" className="imp-btn-glass" style={{ color: '#25D366' }}><MessageCircle size={16} /> WhatsApp</BranchCTA>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
