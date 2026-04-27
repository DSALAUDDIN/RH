'use client';

import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useInView, Variants } from 'framer-motion';
import {
  ArrowUpRight, Phone, ShieldCheck, Award, CheckCircle2,
  Sparkles, Clock, Stethoscope, Zap, Heart,
  ScanLine, Building2, FlaskConical, MessageCircle,
  ChevronRight, HelpCircle, Globe, User, Play, Pause, Volume2, VolumeX, Maximize
} from 'lucide-react';
import './implants.css';

import heroImg from '@/assets/implants/implant-hero.jpg';
import typesImg from '@/assets/implants/implant_types.png';
import beforeAfterImg from '@/assets/implants/implant_before_after.png';
import facilityImg from '@/assets/implants/implant_facility.png';
import labImg from '@/assets/implants/clinic-action.jpg';

/* ── Counter ── */
function Counter({ to, suffix = '' }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let c = 0; const inc = to / 80;
    const t = setInterval(() => {
      c += inc;
      if (c >= to) { setCount(to); clearInterval(t); }
      else setCount(Math.floor(c));
    }, 16);
    return () => clearInterval(t);
  }, [inView, to]);
  return <span ref={ref}>{count}{suffix}</span>;
}

/* ── Scroll reveal ── */
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

/* ── Video Player ── */
function ImplantVideo() {
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
    <div className="imp-video-wrapper">
      <video
        ref={videoRef}
        className="imp-video"
        loop
        muted={muted}
        playsInline
        autoPlay
        preload="auto"
      >
        <source src="https://res.cloudinary.com/dxrcufs8f/video/upload/v1777313555/implantVideo_bzruai.mp4" type="video/mp4" />
      </video>
      <div className="imp-video-controls">
        <button onClick={() => { setPaused(!paused); if (videoRef.current) { paused ? videoRef.current.play() : videoRef.current.pause(); } }}>
          {paused ? <Play size={18} /> : <Pause size={18} />}
        </button>
        <button onClick={() => setMuted(!muted)}>
          {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </button>
        <button onClick={() => videoRef.current?.requestFullscreen()}>
          <Maximize size={18} />
        </button>
      </div>
    </div>
  );
}

const stagger: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.09 } } };
const fadeUp: Variants = { hidden: { opacity: 0, y: 36 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } } };

const heroStats = [
  { val: 98, suf: '%', label: 'Success Rate' },
  { val: 12, suf: '+', label: 'Years Exp.' },
  { val: 1000, suf: '+', label: 'Implants Done' },
  { val: 5, suf: '', label: 'Countries Trained' },
];

const techFeatures = [
  { icon: <ScanLine size={22} />, title: '3D Imaging & CBCT', desc: 'Cone Beam CT for detailed bone assessment and precise diagnosis — zero guesswork, total clarity.', color: '#0ea5e9', bg: '#e0f2fe' },
  { icon: <Stethoscope size={22} />, title: 'Digital Implant Planning', desc: 'Predictable, customized treatment planned digitally before any surgery begins.', color: '#6366f1', bg: '#ede9fe' },
  { icon: <Zap size={22} />, title: 'Guided Implant Surgery', desc: 'Minimally invasive, highly accurate placement using 3D-printed surgical guides.', color: '#f59e0b', bg: '#fef3c7' },
  { icon: <FlaskConical size={22} />, title: 'Custom Abutments & Prosthetics', desc: 'Optimal fit, strength, and natural aesthetics with precision-crafted components.', color: '#10b981', bg: '#d1fae5' },
  { icon: <Building2 size={22} />, title: 'Digital Workflow', desc: 'End-to-end digital treatment from diagnosis to final restoration for efficiency and precision.', color: '#ef4444', bg: '#fee2e2' },
  { icon: <Award size={22} />, title: 'International Training', desc: 'Dr. Hasan trained in implantology in China, Korea & India — bringing global expertise.', color: '#8b5cf6', bg: '#ede9fe' },
];

const benefits = [
  'Long-term durability and strength',
  'Natural look and feel',
  'Preservation of bone and facial structure',
  'Improved chewing function and speech',
  'Enhanced confidence and comfort',
];

const personalizedCare = [
  'Comprehensive clinical and radiographic evaluation',
  'Customized treatment planning',
  'Minimally invasive surgical protocols',
  'Precision-crafted final restorations',
];

const faqs = [
  { q: 'Is dental implant surgery painful?', a: 'Not at all. The procedure is performed under local anesthesia and is completely painless. Most patients report mild discomfort for 2-3 days after surgery, easily managed with prescribed medication.' },
  { q: 'How long does a dental implant last?', a: 'With proper oral hygiene and regular check-ups, dental implants can last a lifetime. The crown may need replacement after 10-15 years due to normal wear.' },
  { q: 'Am I a good candidate for implants?', a: 'Most adults with good general health are candidates. Adequate jawbone density is needed, but bone grafting can address bone loss. A consultation will confirm your eligibility.' },
  { q: 'What is the success rate?', a: 'Dental implants have a 98% success rate at RH Dental Care. Dr. Hasan\'s advanced training and 3D-guided techniques ensure predictable, long-term outcomes.' },
  { q: 'Can I get teeth in one day?', a: 'Yes! We offer immediate loading implants where you receive a temporary prosthesis on the same day as surgery. The permanent crown is placed after osseointegration.' },
  { q: 'How much does a dental implant cost?', a: 'Single implants start at ৳70,000-80,000 (including implant, abutment, and crown). Full mouth rehabilitation ranges from ৳4,00,000-6,00,000 per jaw.' },
];

/* ══ PAGE ══ */
export default function ImplantsPage() {
  return (
    <div>

      {/* ═══════════════════════ HERO ═══════════════════════ */}
      <section className="imp-hero">
        <div className="imp-hero-bg">
          <Image src={heroImg} alt="Dental Implant Surgery at RH Dental Care" fill priority quality={90} />
        </div>
        <div className="imp-hero-overlay" />

        <div className="imp-hero-content">
          <motion.div initial={{ opacity: 0, y: -14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Link href="/" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.4rem', marginBottom: '1rem' }}>
              Home <ChevronRight size={12} /> <span style={{ color: 'rgba(255,255,255,0.8)' }}>Implants</span>
            </Link>
          </motion.div>

          <motion.div className="imp-badge" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.1 }}>
            <Sparkles size={14} /> Advanced Implantology
          </motion.div>

          <motion.h1 className="imp-hero-title"
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            Dental <span>Implants</span>
          </motion.h1>

          <motion.p className="imp-hero-subtitle"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Precision, Technology &amp; Trusted Excellence. Permanent, natural-feeling tooth replacement by Dr. B.M. Rafiqul Hasan Mehedi — delivering implant dentistry at an international standard.
          </motion.p>

          <motion.div className="imp-hero-stats" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }}>
            {heroStats.map((s, i) => (
              <div key={i} className="imp-hero-stat">
                <span className="imp-hero-stat-val"><Counter to={s.val} suffix={s.suf} /></span>
                <span className="imp-hero-stat-label">{s.label}</span>
              </div>
            ))}
          </motion.div>

          <motion.div className="imp-hero-cta-row" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.8 }}>
            <Link href="/contact" className="imp-btn-primary">Book Free Consultation <ArrowUpRight size={18} /></Link>
            <a href="tel:+8801775227902" className="imp-btn-glass"><Phone size={16} /> Call Now</a>
            <a href="https://wa.me/8801775227902" target="_blank" rel="noopener noreferrer" className="imp-btn-glass" style={{ color: '#25D366' }}><MessageCircle size={16} /> WhatsApp</a>
          </motion.div>
        </div>
        <div className="imp-scroll-indicator"><span>Scroll</span><div className="imp-scroll-line" /></div>
      </section>

      {/* ═══════════════════════ PROVEN EXCELLENCE ═══════════════════════ */}
      <section className="imp-section imp-section-white">
        <div className="container">
          <div className="imp-what-grid">
            <FadeIn>
              <div className="imp-what-img">
                <Image src={typesImg} alt="Dental implant anatomy" fill sizes="(max-width:1024px) 100vw, 50vw" />
              </div>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div className="imp-what-content">
                <span className="imp-label"><Award size={14} /> Proven Clinical Excellence</span>
                <h2>A Confident Smile <span style={{ color: '#0284c7' }}>Redefined</span></h2>
                <p>A confident smile is not just about aesthetics—it reflects health, confidence, and quality of life. At RH Dental Care, we combine extensive clinical experience, cutting-edge technology, and refined patient care to deliver implant dentistry at an international standard.</p>
                <p>With over a <strong>thousand successful implant cases</strong>, we deliver consistent, high-quality outcomes—even in complex situations such as full-mouth rehabilitation and compromised bone conditions.</p>
                <div className="imp-anatomy-list">
                  <motion.div className="imp-anatomy-item" initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0 }}>
                    <div className="imp-anatomy-icon" style={{ background: 'linear-gradient(135deg, #0ea5e9, #0284c7)' }}>1</div>
                    <div>
                      <div className="imp-anatomy-title">Titanium Post (Fixture)</div>
                      <p className="imp-anatomy-desc">Biocompatible titanium screw placed into the jawbone — fuses naturally through osseointegration.</p>
                    </div>
                  </motion.div>
                  <motion.div className="imp-anatomy-item" initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
                    <div className="imp-anatomy-icon" style={{ background: 'linear-gradient(135deg, #6366f1, #4f46e5)' }}>2</div>
                    <div>
                      <div className="imp-anatomy-title">Abutment (Connector)</div>
                      <p className="imp-anatomy-desc">Custom connector piece that attaches to the implant post and supports the final crown.</p>
                    </div>
                  </motion.div>
                  <motion.div className="imp-anatomy-item" initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
                    <div className="imp-anatomy-icon" style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)' }}>3</div>
                    <div>
                      <div className="imp-anatomy-title">Crown (Prosthesis)</div>
                      <p className="imp-anatomy-desc">Custom-crafted porcelain or zirconia crown designed to match your natural teeth perfectly.</p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══════════════════════ DR. HASAN — CLINICIAN ═══════════════════════ */}
      <section className="imp-section imp-section-alt">
        <div className="container">
          <div className="imp-what-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
            <FadeIn>
              <div className="imp-what-content">
                <span className="imp-label"><Stethoscope size={14} /> Led by an Expert</span>
                <h2>Distinguished <span style={{ color: '#0284c7' }}>Implant Clinician</span></h2>
                <p>Implant treatments are led by <strong>Dr. B.M. Rafiqul Hasan (Mehedi)</strong>, an experienced Oral &amp; Dental Surgeon with advanced international training in implantology.</p>
                <p>Known for his precision, aesthetic sense, and ability to manage complex implant cases, he is widely regarded as one of the leading implant practitioners in Bangladesh. His work reflects a careful balance of scientific accuracy and artistic excellence.</p>
                <div className="imp-gallery-checks">
                  {['Internationally trained in China, Korea & India', 'Over 1,000 successful implant cases', 'Expert in full-mouth rehabilitation', 'Precision-guided surgical techniques', 'Results that are functional and naturally beautiful'].map((t, i) => (
                    <div key={i} className="imp-gallery-check"><CheckCircle2 size={16} />{t}</div>
                  ))}
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div className="imp-what-img">
                <Image src={labImg} alt="RH Dental Care Implant Lab" fill sizes="(max-width:1024px) 100vw, 50vw" style={{ objectPosition: 'center' }} />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══════════════════════ TECHNOLOGY ═══════════════════════ */}
      <section className="imp-section imp-section-light">
        <div className="container">
          <FadeIn>
            <div className="imp-section-header">
              <span className="imp-label"><Zap size={14} /> Technology-Driven</span>
              <h2 className="imp-title">Advanced Technology for <span className="imp-accent">Superior Results</span></h2>
              <p className="imp-subtitle">Implant dentistry driven by modern technology to enhance accuracy, safety, and outcomes — meeting and exceeding global standards.</p>
            </div>
          </FadeIn>
          <motion.div className="imp-types-grid" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }}>
            {techFeatures.map((t, i) => (
              <motion.div key={i} className="imp-type-card" style={{ borderTop: `4px solid ${t.color}` }} variants={fadeUp}>
                <div className="imp-type-icon" style={{ background: t.bg, color: t.color }}>{t.icon}</div>
                <div className="imp-type-title">{t.title}</div>
                <p className="imp-type-desc">{t.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════ VIDEO SECTION — HIGHLIGHTED ═══════════════════════ */}
      <section className="imp-video-section">
        <div className="imp-video-orb imp-video-orb-1" />
        <div className="imp-video-orb imp-video-orb-2" />
        <div className="container">
          <FadeIn>
            <div className="imp-section-header" style={{ color: '#fff' }}>
              <span className="imp-label" style={{ background: 'rgba(14,165,233,0.15)', borderColor: 'rgba(14,165,233,0.3)', color: '#38bdf8' }}><Play size={14} /> Experience Our Clinic</span>
              <h2 className="imp-title" style={{ color: '#f1f5f9' }}>See Where <span style={{ background: 'linear-gradient(135deg, #38bdf8, #818cf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Precision Happens</span></h2>
              <p className="imp-subtitle" style={{ color: 'rgba(203,213,225,0.8)' }}>Take a virtual tour of our world-class implant facility — purpose-built for advanced surgery with hospital-grade sterilization and digital workflow.</p>
            </div>
          </FadeIn>
          <FadeIn delay={0.15}>
            <ImplantVideo />
          </FadeIn>
          <FadeIn delay={0.25}>
            <div className="imp-video-badges">
              {[
                { icon: <ShieldCheck size={16} />, text: 'Hospital-Grade Sterilization' },
                { icon: <Award size={16} />, text: '3D-Guided Surgery Suite' },
                { icon: <Zap size={16} />, text: 'Digital Implant Workflow' },
              ].map((b, i) => (
                <div key={i} className="imp-video-badge-item">
                  {b.icon} <span>{b.text}</span>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════ GOLD STANDARD ═══════════════════════ */}
      <section className="imp-section imp-section-alt">
        <div className="container">
          <div className="imp-gallery-grid">
            <FadeIn>
              <div className="imp-gallery-img">
                <Image src={beforeAfterImg} alt="Implant smile transformations" fill sizes="(max-width:1024px) 100vw, 50vw" />
              </div>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div className="imp-gallery-content">
                <span className="imp-label"><Heart size={14} /> The Gold Standard</span>
                <h2>Complete Restoration of <span style={{ color: '#0284c7' }}>Oral Harmony</span></h2>
                <p>A dental implant is a biocompatible titanium fixture placed into the jawbone, where it integrates naturally to form a stable foundation. Dental implants are not just a replacement—they are a complete restoration.</p>
                <div className="imp-gallery-checks">
                  {benefits.map((text, i) => (
                    <div key={i} className="imp-gallery-check"><CheckCircle2 size={16} />{text}</div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══════════════════════ PERSONALIZED CARE ═══════════════════════ */}
      <section className="imp-section imp-section-white">
        <div className="container">
          <div className="imp-what-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
            <FadeIn>
              <div className="imp-what-content">
                <span className="imp-label"><ShieldCheck size={14} /> Personalized Care</span>
                <h2>No Two Smiles <span style={{ color: '#0284c7' }}>Treated the Same</span></h2>
                <p>Every treatment is tailored based on individual needs, ensuring optimal results. Each smile is designed with care, detail, and long-term vision.</p>
                <div className="imp-gallery-checks">
                  {personalizedCare.map((t, i) => (
                    <div key={i} className="imp-gallery-check"><CheckCircle2 size={16} />{t}</div>
                  ))}
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div className="imp-what-content">
                <span className="imp-label"><Globe size={14} /> Local & International</span>
                <h2>Seamless <span style={{ color: '#0284c7' }}>Patient Experience</span></h2>
                <p>We provide a seamless experience for both local and international patients — convenience without compromising clinical excellence.</p>
                <div className="imp-anatomy-list">
                  <div className="imp-anatomy-item">
                    <div className="imp-anatomy-icon" style={{ background: 'linear-gradient(135deg, #10b981, #059669)' }}><User size={18} /></div>
                    <div>
                      <div className="imp-anatomy-title">Local Patients</div>
                      <p className="imp-anatomy-desc">Continuous care and easy follow-up with your dedicated treatment team.</p>
                    </div>
                  </div>
                  <div className="imp-anatomy-item">
                    <div className="imp-anatomy-icon" style={{ background: 'linear-gradient(135deg, #0ea5e9, #0284c7)' }}><Globe size={18} /></div>
                    <div>
                      <div className="imp-anatomy-title">International Patients</div>
                      <p className="imp-anatomy-desc">Online consultation, transparent timelines, efficient scheduling & remote follow-up.</p>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══════════════════════ FAQ ═══════════════════════ */}
      <section className="imp-section imp-section-light">
        <div className="container">
          <FadeIn>
            <div className="imp-section-header">
              <span className="imp-label"><HelpCircle size={14} /> Common Questions</span>
              <h2 className="imp-title">Implant <span className="imp-accent">FAQ</span></h2>
              <p className="imp-subtitle">Answers to the most frequently asked questions about dental implants.</p>
            </div>
          </FadeIn>
          <motion.div className="imp-faq-grid" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }}>
            {faqs.map((faq, i) => (
              <motion.div key={i} className="imp-faq-card" variants={fadeUp}>
                <div className="imp-faq-q"><HelpCircle size={16} />{faq.q}</div>
                <p className="imp-faq-a">{faq.a}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════ CTA ═══════════════════════ */}
      <section className="imp-cta">
        <div className="imp-cta-orb" />
        <div className="imp-cta-orb" style={{ top: 'auto', bottom: -120, left: -80, right: 'auto', background: 'radial-gradient(circle, rgba(129,140,248,0.1), transparent 70%)' }} />
        <div className="container">
          <FadeIn>
            <div className="imp-cta-inner">
              <div className="imp-badge" style={{ margin: '0 auto 1.5rem' }}><Sparkles size={14} /> Start Your Implant Journey</div>
              <h2 className="imp-cta-title">
                Ready to Restore Your{' '}
                <span style={{ background: 'linear-gradient(135deg, #38bdf8, #818cf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Perfect Smile?</span>
              </h2>
              <p className="imp-cta-sub">Take the first step toward restoring your smile with confidence. Contact us today for a personalized consultation and discover how advanced implant dentistry can redefine your life.</p>
              <div className="imp-cta-btns">
                <Link href="/contact" className="imp-btn-primary">Book Free Consultation <ArrowUpRight size={18} /></Link>
                <a href="tel:+8801775227902" className="imp-btn-glass"><Phone size={16} /> Call Now</a>
                <a href="https://wa.me/8801775227902" target="_blank" rel="noopener noreferrer" className="imp-btn-glass" style={{ color: '#25D366' }}><MessageCircle size={16} /> WhatsApp</a>
              </div>
              <div style={{ marginTop: '2.5rem', display: 'flex', gap: '2rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', fontWeight: 600 }}><CheckCircle2 size={14} color="#16a34a" /> Pain-Free Guarantee</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', fontWeight: 600 }}><Award size={14} color="#38bdf8" /> BMDC 5169</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', fontWeight: 600 }}><ShieldCheck size={14} color="#818cf8" /> 98% Success Rate</div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

    </div>
  );
}
