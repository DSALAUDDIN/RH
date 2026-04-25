'use client';

import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useInView, Variants } from 'framer-motion';
import {
  ArrowUpRight, Phone, ShieldCheck, Award, CheckCircle2,
  Sparkles, Clock, Stethoscope, Zap, Heart,
  ScanLine, Building2, FlaskConical, MessageCircle,
  ChevronRight, HelpCircle,
} from 'lucide-react';
import './implants.css';

import heroImg from '@/assets/implants/implant_hero.png';
import typesImg from '@/assets/implants/implant_types.png';
import beforeAfterImg from '@/assets/implants/implant_before_after.png';
import facilityImg from '@/assets/implants/implant_facility.png';

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

const stagger: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.09 } } };
const fadeUp: Variants = { hidden: { opacity: 0, y: 36 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } } };

/* ══ IMPLANT DATA ══ */
const heroStats = [
  { val: 98, suf: '%', label: 'Success Rate' },
  { val: 12, suf: '+', label: 'Years Exp.' },
  { val: 3500, suf: '+', label: 'Implants Done' },
  { val: 5, suf: '', label: 'Countries Trained' },
];

const implantTypes = [
  {
    title: 'Single Tooth Implant',
    desc: 'Replace a single missing tooth with a titanium post and custom-crafted porcelain crown that blends seamlessly with your natural teeth.',
    icon: '🦷',
    features: ['Natural appearance', 'Preserves adjacent teeth', 'Permanent solution', 'Easy maintenance'],
    price: '৳70,000 – 80,000',
    priceNote: 'Includes implant + abutment + crown',
    cardClass: 'card-1',
    color: '#0ea5e9',
    bg: '#e0f2fe',
  },
  {
    title: 'Implant-Supported Bridge',
    desc: 'Replace multiple missing teeth with an implant-supported bridge — no removable dentures needed. Sturdy, comfortable, and long-lasting.',
    icon: '🌉',
    features: ['Replace 3+ teeth', 'No bone loss', 'Fixed & stable', 'No adhesives needed'],
    price: 'Starting ৳1,50,000',
    priceNote: 'Varies based on number of units',
    cardClass: 'card-2',
    color: '#6366f1',
    bg: '#ede9fe',
  },
  {
    title: 'Full Mouth Rehabilitation',
    desc: 'Complete restoration of all teeth using strategic implant placement. Transform your entire smile and restore full chewing function.',
    icon: '✨',
    features: ['Full arch restoration', 'Digital planning', 'Same-day options', 'Lifetime investment'],
    price: '৳4,00,000 – 6,00,000',
    priceNote: 'Per jaw – includes all implants & prosthesis',
    cardClass: 'card-3',
    color: '#f59e0b',
    bg: '#fef3c7',
  },
];

const processSteps = [
  {
    num: '01',
    title: '3D Planning & Assessment',
    desc: 'Digital CT scan for precise 3D mapping of your jawbone. Complete oral health assessment and customised treatment plan.',
    duration: 'Day 1',
  },
  {
    num: '02',
    title: 'Implant Surgery',
    desc: 'Minimally invasive titanium post insertion under local anesthesia. Guided surgery for maximum precision and comfort.',
    duration: '1-2 Hours',
  },
  {
    num: '03',
    title: 'Osseointegration',
    desc: 'Healing period where the implant fuses with your jawbone. Regular check-ups to monitor progress.',
    duration: '3-6 Months',
  },
  {
    num: '04',
    title: 'Crown Placement',
    desc: 'Custom-designed porcelain or zirconia crown is fabricated and permanently attached for a natural, beautiful finish.',
    duration: 'Final Visit',
  },
];

const benefits = [
  { icon: <ShieldCheck size={22} />, title: 'Lifetime Durability', desc: 'Dental implants can last a lifetime with proper care — no need for repeated replacements like dentures.' },
  { icon: <Heart size={22} />, title: 'Natural Feel & Function', desc: 'Implants feel, look, and function exactly like your natural teeth. Eat, smile, and speak with confidence.' },
  { icon: <Zap size={22} />, title: 'Prevents Bone Loss', desc: 'Unlike bridges or dentures, implants stimulate the jawbone, preventing bone deterioration and facial changes.' },
  { icon: <Sparkles size={22} />, title: 'Perfect Aesthetics', desc: 'Custom-crafted crowns match the exact shade, shape, and translucency of your surrounding natural teeth.' },
  { icon: <ScanLine size={22} />, title: '3D Guided Precision', desc: 'Advanced CT scanning and digital planning ensure perfect implant positioning for optimal results.' },
  { icon: <Award size={22} />, title: 'International Training', desc: 'Dr. Hasan trained in implantology in China, Korea, and India — bringing global expertise to your treatment.' },
];

const faqs = [
  { q: 'Is dental implant surgery painful?', a: 'Not at all. The procedure is performed under local anesthesia and is completely painless. Most patients report mild discomfort for 2-3 days after surgery, easily managed with prescribed medication.' },
  { q: 'How long does a dental implant last?', a: 'With proper oral hygiene and regular check-ups, dental implants can last a lifetime. The crown may need replacement after 10-15 years due to normal wear.' },
  { q: 'Am I a good candidate for implants?', a: 'Most adults with good general health are candidates. Adequate jawbone density is needed, but bone grafting can address bone loss. A consultation will confirm your eligibility.' },
  { q: 'What is the success rate?', a: 'Dental implants have a 98% success rate at RH Dental Care. Dr. Hasan\'s advanced training and 3D-guided techniques ensure predictable, long-term outcomes.' },
  { q: 'Can I get teeth in one day?', a: 'Yes! We offer immediate loading implants where you receive a temporary prosthesis on the same day as surgery. The permanent crown is placed after osseointegration.' },
  { q: 'How much does a dental implant cost?', a: 'Single implants start at ৳70,000-80,000 (including implant, abutment, and crown). Full mouth rehabilitation ranges from ৳4,00,000-6,00,000 per jaw.' },
];

const facilityFeatures = [
  { icon: <ScanLine size={20} />, title: '3D CBCT Scanner', desc: 'Precise cone beam computed tomography for accurate jawbone mapping and implant planning.' },
  { icon: <Building2 size={20} />, title: 'Dedicated Implant OT', desc: 'Fully equipped operating theatre with hospital-grade sterilization for safe surgical procedures.' },
  { icon: <FlaskConical size={20} />, title: 'In-House Dental Lab', desc: 'On-site laboratory for same-day prosthesis fabrication — faster turnaround and superior fit.' },
  { icon: <Stethoscope size={20} />, title: 'Digital Workflow', desc: 'End-to-end digital treatment from diagnosis to final restoration using intraoral scanners and 3D printers.' },
];

/* ══ PAGE ══ */
export default function ImplantsPage() {
  return (
    <div>

      {/* ═══════════════════════ HERO ═══════════════════════ */}
      <section className="imp-hero">
        <div className="imp-hero-bg">
          <Image src={heroImg} alt="Dental Implant Surgery" fill priority quality={90} />
        </div>
        <div className="imp-hero-overlay" />

        <div className="imp-hero-content">
          <motion.div
            initial={{ opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link href="/" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.4rem', marginBottom: '1rem' }}>
              Home <ChevronRight size={12} /> <span style={{ color: 'rgba(255,255,255,0.8)' }}>Implants</span>
            </Link>
          </motion.div>

          <motion.div
            className="imp-badge"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Sparkles size={14} />
            Advanced Implantology
          </motion.div>

          <motion.h1
            className="imp-hero-title"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            Dental <span>Implants</span>
          </motion.h1>

          <motion.p
            className="imp-hero-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Permanent, natural-feeling tooth replacement by Dr. B. M. Rafiqul Hasan Mehedi — trained in advanced implantology in China, Korea & India. 3D-guided precision surgery for predictable, lifetime results.
          </motion.p>

          <motion.div
            className="imp-hero-stats"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {heroStats.map((s, i) => (
              <div key={i} className="imp-hero-stat">
                <span className="imp-hero-stat-val"><Counter to={s.val} suffix={s.suf} /></span>
                <span className="imp-hero-stat-label">{s.label}</span>
              </div>
            ))}
          </motion.div>

          <motion.div
            className="imp-hero-cta-row"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Link href="/contact" className="imp-btn-primary">
              Book Free Implant Consultation <ArrowUpRight size={18} />
            </Link>
            <a href="tel:+8801775227902" className="imp-btn-glass">
              <Phone size={16} /> Call Now
            </a>
          </motion.div>
        </div>

        <div className="imp-scroll-indicator">
          <span>Scroll</span>
          <div className="imp-scroll-line" />
        </div>
      </section>

      {/* ═══════════════════════ WHAT IS AN IMPLANT ═══════════════════════ */}
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
                <span className="imp-label"><Stethoscope size={14} /> Understanding Implants</span>
                <h2>What is a <span style={{ color: '#0284c7' }}>Dental Implant?</span></h2>
                <p>
                  A dental implant is a small titanium post that is surgically placed into the jawbone beneath the gum line. It acts as an artificial tooth root, providing a strong, stable foundation for a replacement crown that looks and feels exactly like a natural tooth.
                </p>

                <div className="imp-anatomy-list">
                  {[
                    { num: '1', title: 'Titanium Post (Fixture)', desc: 'Biocompatible titanium screw placed into the jawbone — fuses with bone through osseointegration.', bg: 'linear-gradient(135deg, #0ea5e9, #0284c7)' },
                    { num: '2', title: 'Abutment (Connector)', desc: 'Custom connector piece that attaches to the implant post and supports the final crown.', bg: 'linear-gradient(135deg, #6366f1, #4f46e5)' },
                    { num: '3', title: 'Crown (Prosthesis)', desc: 'A custom-crafted porcelain or zirconia crown designed to match your natural teeth perfectly.', bg: 'linear-gradient(135deg, #f59e0b, #d97706)' },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      className="imp-anatomy-item"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <div className="imp-anatomy-icon" style={{ background: item.bg }}>{item.num}</div>
                      <div>
                        <div className="imp-anatomy-title">{item.title}</div>
                        <p className="imp-anatomy-desc">{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══════════════════════ IMPLANT TYPES ═══════════════════════ */}
      <section className="imp-section imp-section-alt">
        <div className="container">
          <FadeIn>
            <div className="imp-section-header">
              <span className="imp-label"><Sparkles size={14} /> Treatment Options</span>
              <h2 className="imp-title">Choose Your <span className="imp-accent">Implant Solution</span></h2>
              <p className="imp-subtitle">From single tooth replacement to complete full-mouth rehabilitation — we offer the right implant solution for every case.</p>
            </div>
          </FadeIn>

          <motion.div className="imp-types-grid" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }}>
            {implantTypes.map((t, i) => (
              <motion.div key={i} className={`imp-type-card ${t.cardClass}`} variants={fadeUp}>
                <div className="imp-type-icon" style={{ background: t.bg, color: t.color }}>{t.icon}</div>
                <div className="imp-type-title">{t.title}</div>
                <p className="imp-type-desc">{t.desc}</p>
                <div className="imp-type-features">
                  {t.features.map((f, j) => (
                    <div key={j} className="imp-type-feature">
                      <CheckCircle2 size={14} color={t.color} />
                      {f}
                    </div>
                  ))}
                </div>
                <div className="imp-type-price">
                  {t.price}
                  <span>{t.priceNote}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════ PROCESS ═══════════════════════ */}
      <section className="imp-section imp-section-white">
        <div className="container">
          <FadeIn>
            <div className="imp-section-header">
              <span className="imp-label"><Clock size={14} /> Treatment Journey</span>
              <h2 className="imp-title">The Implant <span className="imp-accent">Process</span></h2>
              <p className="imp-subtitle">A step-by-step guide to your dental implant journey at RH Dental Care.</p>
            </div>
          </FadeIn>

          <motion.div className="imp-process-grid" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }}>
            {processSteps.map((step, i) => (
              <motion.div key={i} className="imp-process-card" variants={fadeUp}>
                <div className="imp-process-num">{step.num}</div>
                <div className="imp-process-title">{step.title}</div>
                <p className="imp-process-desc">{step.desc}</p>
                <span className="imp-process-duration">
                  <Clock size={12} />
                  {step.duration}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════ BENEFITS ═══════════════════════ */}
      <section className="imp-section imp-section-light">
        <div className="container">
          <FadeIn>
            <div className="imp-section-header">
              <span className="imp-label"><Heart size={14} /> Why Choose Implants</span>
              <h2 className="imp-title">Benefits of <span className="imp-accent">Dental Implants</span></h2>
              <p className="imp-subtitle">Why dental implants are the gold standard for tooth replacement worldwide.</p>
            </div>
          </FadeIn>

          <motion.div className="imp-benefits-grid" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }}>
            {benefits.map((b, i) => (
              <motion.div key={i} className="imp-benefit-card" variants={fadeUp}>
                <div className="imp-benefit-icon">{b.icon}</div>
                <div className="imp-benefit-title">{b.title}</div>
                <p className="imp-benefit-desc">{b.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════ BEFORE / AFTER ═══════════════════════ */}
      <section className="imp-section imp-section-white">
        <div className="container">
          <div className="imp-gallery-grid">
            <FadeIn>
              <div className="imp-gallery-img">
                <Image src={beforeAfterImg} alt="Dental implant results" fill sizes="(max-width:1024px) 100vw, 50vw" />
              </div>
            </FadeIn>

            <FadeIn delay={0.15}>
              <div className="imp-gallery-content">
                <span className="imp-label"><Award size={14} /> Proven Results</span>
                <h2>Smile Transformations with <span style={{ color: '#0284c7' }}>Implants</span></h2>
                <p>
                  Our patients regain full confidence with dental implants that are virtually indistinguishable from natural teeth. Every case is planned with 3D precision and executed with meticulous care.
                </p>
                <div className="imp-gallery-checks">
                  {[
                    'Natural-looking porcelain & zirconia crowns',
                    'Custom shade-matching for seamless results',
                    '3D-guided placement for perfect positioning',
                    'Same-day implant & temporary tooth options',
                    'Proven long-term success with regular follow-ups',
                  ].map((text, i) => (
                    <div key={i} className="imp-gallery-check">
                      <CheckCircle2 size={16} />
                      {text}
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══════════════════════ FACILITY ═══════════════════════ */}
      <section className="imp-section imp-section-light">
        <div className="container">
          <div className="imp-facility-grid">
            <FadeIn delay={0.1}>
              <div>
                <span className="imp-label"><Building2 size={14} /> Our Facility</span>
                <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', fontWeight: 900, color: '#0f172a', marginBottom: '1.5rem', letterSpacing: '-0.03em' }}>
                  World-Class <span style={{ color: '#0284c7' }}>Implant Centre</span>
                </h2>
                <p style={{ fontSize: '1.05rem', color: '#475569', lineHeight: 1.85, marginBottom: '2rem' }}>
                  Our 3,500 sq.ft facility is purpose-built for advanced implant surgery, housing dedicated operating rooms, a 3D scanner, in-house lab, and full digital workflow.
                </p>

                <div className="imp-facility-features">
                  {facilityFeatures.map((f, i) => (
                    <motion.div
                      key={i}
                      className="imp-facility-feature"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08 }}
                    >
                      <div className="imp-facility-feature-icon">{f.icon}</div>
                      <div>
                        <div className="imp-facility-feature-title">{f.title}</div>
                        <p className="imp-facility-feature-desc">{f.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="imp-facility-img">
                <Image src={facilityImg} alt="RH Dental Care implant facility" fill sizes="(max-width:1024px) 100vw, 50vw" />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══════════════════════ FAQ ═══════════════════════ */}
      <section className="imp-section imp-section-alt">
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
                <div className="imp-faq-q">
                  <HelpCircle size={16} />
                  {faq.q}
                </div>
                <p className="imp-faq-a">{faq.a}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════ CTA ═══════════════════════ */}
      <section className="imp-cta">
        <div className="imp-cta-orb" />
        <div className="container">
          <FadeIn>
            <div className="imp-cta-inner">
              <div className="imp-badge" style={{ margin: '0 auto 1.5rem' }}>
                <Sparkles size={14} />
                Start Your Implant Journey
              </div>
              <h2 className="imp-cta-title">
                Ready to Restore Your{' '}
                <span style={{ background: 'linear-gradient(135deg, #38bdf8, #818cf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  Perfect Smile?
                </span>
              </h2>
              <p className="imp-cta-sub">
                Book a free implant consultation with Dr. B. M. Rafiqul Hasan Mehedi. Get a 3D scan, personalised treatment plan, and transparent pricing — all with zero obligation.
              </p>
              <div className="imp-cta-btns">
                <Link href="/contact" className="imp-btn-primary">
                  Book Free Consultation <ArrowUpRight size={18} />
                </Link>
                <a href="tel:+8801775227902" className="imp-btn-glass">
                  <Phone size={16} /> Call Now
                </a>
                <a href="https://wa.me/8801775227902" target="_blank" rel="noopener noreferrer" className="imp-btn-glass" style={{ color: '#25D366' }}>
                  <MessageCircle size={16} /> WhatsApp
                </a>
              </div>
              <div style={{ marginTop: '2.5rem', display: 'flex', gap: '2rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', fontWeight: 600 }}>
                  <CheckCircle2 size={14} color="#16a34a" /> Pain-Free Guarantee
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', fontWeight: 600 }}>
                  <Award size={14} color="#38bdf8" /> BMDC 5169
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', fontWeight: 600 }}>
                  <ShieldCheck size={14} color="#818cf8" /> 98% Success Rate
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

    </div>
  );
}
