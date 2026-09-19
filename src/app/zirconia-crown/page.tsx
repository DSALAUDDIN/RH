'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  Cpu,
  Crown,
  Layers,
  MessageCircle,
  Monitor,
  PenTool,
  Phone,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
} from 'lucide-react';
import '../implants/implants.css';
import BranchCTA from '@/components/branch/BranchCTA';
import './zirconia.css';

import heroImg from '@/assets/specialties/zirconia.jpg';
import zirconiaImg from '@/assets/specialties/zirconia.png';
import digitalImg from '@/assets/specialties/zirconia_digital_workflow.png';

/* Motion variants */
const stagger: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.09 } } };
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 36 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

function FadeIn({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* Content */
const reasons = [
  {
    icon: <Cpu size={22} />,
    title: 'In-House CAD/CAM Dental Laboratory',
    desc: 'Your crown is not simply ordered from an outside laboratory. Design, milling, finishing and final checks all happen in our own lab.',
    color: '#10b981',
    bg: '#d1fae5',
  },
  {
    icon: <Layers size={22} />,
    title: 'Premium Zirconia Materials',
    desc: 'High-quality zirconia discs such as Upcera, Xtcera and multilayer aesthetic zirconia, selected for each clinical case.',
    color: '#0ea5e9',
    bg: '#e0f2fe',
  },
  {
    icon: <PenTool size={22} />,
    title: 'Expert Crown Designing',
    desc: 'Designs developed and reviewed by experienced local and international dental CAD/design experts, depending on case complexity.',
    color: '#6366f1',
    bg: '#ede9fe',
  },
  {
    icon: <Monitor size={22} />,
    title: 'Digital Precision',
    desc: 'Scanning, CAD design, CAM milling and professional finishing in one integrated digital workflow for greater consistency.',
    color: '#f59e0b',
    bg: '#fef3c7',
  },
  {
    icon: <ClipboardCheck size={22} />,
    title: 'Strict Quality Control',
    desc: 'Every case goes through multiple stages of checking by our clinical and laboratory teams before delivery.',
    color: '#ec4899',
    bg: '#fce7f3',
  },
  {
    icon: <ShieldCheck size={22} />,
    title: 'We Stand Behind Our Work',
    desc: 'If a crown from our lab develops a manufacturing-related problem covered by our service policy, we assess it and, when appropriate, replace it.',
    color: '#8b5cf6',
    bg: '#f3e8ff',
  },
];

const labBenefits = [
  'Better precision',
  'Consistency',
  'Clearer communication',
  'Faster turnaround',
];

const materials = [
  'Upcera Zirconia',
  'Xtcera Zirconia',
  'Multilayer / highly aesthetic zirconia options',
  'Material selection according to the individual clinical requirement',
];

const designFocus = [
  'Natural tooth shape',
  'Proper proportions',
  'Smile-line harmony',
  'Contact points',
  'Occlusion and bite',
  'Marginal adaptation',
  'Functional anatomy',
  'Shade and translucency',
  'Facial and smile aesthetics',
];

const qualityChecks = [
  'Design',
  'Fit',
  'Margins',
  'Contacts',
  'Occlusion',
  'Shape',
  'Shade',
  'Surface Finish',
  'Final Polish',
];

const suitableFor = [
  'Damaged or heavily restored teeth',
  'Root-canal-treated teeth requiring full coverage',
  'Fractured teeth',
  'Discolored teeth',
  'Replacement of old crowns',
  'Dental bridges',
  'Implant-supported crowns',
  'Full-mouth rehabilitation',
  'Smile makeover cases',
];

const steps = [
  {
    num: '01',
    title: 'Clinical Assessment',
    desc: 'Our dentist examines your teeth, gums, bite and overall oral condition.',
  },
  {
    num: '02',
    title: 'Digital Scan',
    desc: 'Digital impressions/scans are taken whenever clinically appropriate.',
  },
  {
    num: '03',
    title: 'Digital Smile & Crown Design',
    desc: 'The crown is digitally designed according to your tooth anatomy, occlusion and aesthetic requirements.',
  },
  {
    num: '04',
    title: 'Expert Review',
    desc: 'Complex or highly aesthetic cases may be reviewed by experienced CAD/design professionals.',
  },
  {
    num: '05',
    title: 'CAD/CAM Milling',
    desc: 'The approved design is milled from selected premium zirconia material in our in-house laboratory.',
  },
  {
    num: '06',
    title: 'Finishing & Characterization',
    desc: 'The restoration is professionally finished, polished and characterized to achieve the desired appearance.',
  },
  {
    num: '07',
    title: 'Clinical Try-In',
    desc: 'Fit, contacts, margins, shade and occlusion are carefully evaluated.',
  },
  {
    num: '08',
    title: 'Final Cementation',
    desc: 'After all necessary checks and adjustments, the crown is permanently cemented.',
  },
];

const ACCENT = 'linear-gradient(135deg, #10b981, #059669)';
const labelStyle = {
  background: 'rgba(16,185,129,0.08)',
  borderColor: 'rgba(16,185,129,0.2)',
  color: '#059669',
};
const accentText = {
  background: ACCENT,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
} as const;

export default function ZirconiaCrownPage() {
  return (
    <div>
      {/* Hero */}
      <section className="imp-hero zircon-hero">
        <div className="imp-hero-bg">
          <Image
            src={heroImg}
            alt="Zirconia dental crown at RH Dental Care"
            fill
            priority
            quality={90}
          />
        </div>
        <div className="imp-hero-overlay zircon-overlay" />
        <div className="imp-hero-content">
          <motion.div
            initial={{ opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              href="/"
              style={{
                color: 'rgba(255,255,255,0.5)',
                textDecoration: 'none',
                fontSize: '0.85rem',
                fontWeight: 600,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                marginBottom: '1rem',
              }}
            >
              Home <ChevronRight size={12} />{' '}
              <span style={{ color: 'rgba(255,255,255,0.8)' }}>Zirconia Crown</span>
            </Link>
          </motion.div>

          <motion.div
            className="imp-badge zircon-badge"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Crown size={14} /> Precision. Strength. Natural Beauty.
          </motion.div>

          <motion.h1
            className="imp-hero-title"
            initial={{ opacity: 0.001, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            Premium Zirconia <span>Crowns</span>
          </motion.h1>

          <motion.p
            className="imp-hero-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Advanced digital dentistry, premium zirconia materials, expert crown designing and
            strict quality control, for restorations built for long-lasting function and a
            natural-looking smile.
          </motion.p>

          <motion.div
            className="imp-hero-cta-row"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <BranchCTA
              action="book"
              service="Zirconia Crown"
              className="imp-btn-primary"
              style={{ background: ACCENT, boxShadow: '0 8px 32px rgba(16,185,129,0.4)' }}
            >
              Book Free Consultation <ArrowUpRight size={18} />
            </BranchCTA>
            <BranchCTA action="call" service="Zirconia Crown" className="imp-btn-glass">
              <Phone size={16} /> Call Now
            </BranchCTA>
            <BranchCTA
              action="whatsapp"
              service="Zirconia Crown"
              className="imp-btn-glass"
              style={{ color: '#25D366' }}
            >
              <MessageCircle size={16} /> WhatsApp
            </BranchCTA>
          </motion.div>
        </div>
        <div className="imp-scroll-indicator">
          <span>Scroll</span>
          <div className="imp-scroll-line" />
        </div>
      </section>

      {/* In-house lab */}
      <section className="imp-section imp-section-white">
        <div className="container">
          <div className="imp-what-grid">
            <FadeIn>
              <div className="imp-what-img">
                <Image
                  src={zirconiaImg}
                  alt="Zirconia crown with a natural tooth-coloured finish"
                  fill
                  sizes="(max-width:1024px) 100vw, 50vw"
                />
                <div
                  className="imp-what-img-badge"
                  style={{
                    background: 'rgba(16,185,129,0.12)',
                    borderColor: 'rgba(16,185,129,0.25)',
                    color: '#10b981',
                  }}
                >
                  <Star size={14} fill="currentColor" /> Made in our own lab
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div className="imp-what-content">
                <span className="imp-label" style={labelStyle}>
                  <Cpu size={14} /> In-House CAD/CAM Dental Laboratory
                </span>
                <h2>
                  Precision. Strength. <span style={{ color: '#10b981' }}>Natural Beauty.</span>
                </h2>
                <p>
                  At RH Dental Care, we combine advanced digital dentistry, premium zirconia
                  materials, expert crown designing, and strict quality control to create
                  restorations that are designed for both long-lasting function and a
                  natural-looking smile.
                </p>
                <p>
                  Your crown is <strong>not simply ordered from an outside laboratory</strong>. We
                  have our own in-house CAD/CAM laboratory, allowing us to maintain closer control
                  over the entire process, from digital design and milling to finishing and final
                  quality checking.
                </p>

                <div className="imp-anatomy-list" style={{ marginTop: '2rem' }}>
                  {labBenefits.map((t, i) => (
                    <motion.div
                      key={t}
                      className="imp-anatomy-item"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <div className="imp-anatomy-icon" style={{ background: ACCENT }}>
                        <CheckCircle2 size={16} />
                      </div>
                      <div>
                        <div className="imp-anatomy-title">{t}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section className="imp-section imp-section-light">
        <div className="container">
          <FadeIn>
            <div className="imp-section-header">
              <span className="imp-label" style={labelStyle}>
                <BadgeCheck size={14} /> Why RH Dental Care
              </span>
              <h2 className="imp-title">
                Why Choose Our{' '}
                <span className="imp-accent" style={accentText}>
                  Zirconia Crowns?
                </span>
              </h2>
              <p className="imp-subtitle">
                Premium dentistry is not only about premium materials. It is about maintaining
                quality at every step.
              </p>
            </div>
          </FadeIn>

          <motion.div
            className="imp-types-grid"
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
          >
            {reasons.map((r) => (
              <motion.div
                key={r.title}
                className="imp-type-card"
                style={{ borderTop: `4px solid ${r.color}` }}
                variants={fadeUp}
              >
                <div className="imp-type-icon" style={{ background: r.bg, color: r.color }}>
                  {r.icon}
                </div>
                <div className="imp-type-title">{r.title}</div>
                <p className="imp-type-desc">{r.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Materials and design */}
      <section className="imp-section imp-section-alt">
        <div className="container">
          <div className="imp-what-grid" style={{ alignItems: 'start' }}>
            <FadeIn>
              <div className="imp-what-content">
                <span className="imp-label" style={labelStyle}>
                  <Layers size={14} /> Premium Zirconia Materials
                </span>
                <h2>
                  The Right Zirconia <span style={{ color: '#10b981' }}>for Your Tooth</span>
                </h2>
                <p>
                  We carefully select high-quality zirconia discs for our restorations, including
                  premium materials such as:
                </p>
                <div className="imp-gallery-checks">
                  {materials.map((t) => (
                    <div key={t} className="imp-gallery-check" style={{ color: '#059669' }}>
                      <CheckCircle2 size={16} style={{ color: '#10b981' }} />
                      {t}
                    </div>
                  ))}
                </div>
                <p style={{ marginTop: '1.5rem' }}>
                  The right zirconia is selected based on tooth position, functional load, aesthetic
                  requirements, occlusion, and available space.
                </p>
              </div>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div className="imp-what-content">
                <span className="imp-label" style={labelStyle}>
                  <PenTool size={14} /> Expert Crown Designing
                </span>
                <h2>
                  A Beautiful Crown <span style={{ color: '#10b981' }}>Starts with Design</span>
                </h2>
                <p>
                  Our crown designs can be developed and reviewed by experienced local and
                  international dental CAD/design experts, depending on the complexity and aesthetic
                  requirements of the case. We focus on:
                </p>
                <div className="imp-types-grid" style={{ gap: '0.75rem', marginTop: '1.5rem' }}>
                  {designFocus.map((label) => (
                    <div
                      key={label}
                      style={{
                        textAlign: 'center',
                        padding: '1rem 0.75rem',
                        background: '#fff',
                        borderRadius: '1rem',
                        border: '1px solid rgba(16,185,129,0.1)',
                        boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        color: '#1e293b',
                        lineHeight: 1.3,
                      }}
                    >
                      {label}
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Quality control */}
      <section className="imp-section imp-section-white">
        <div className="container">
          <FadeIn>
            <div className="imp-section-header">
              <span className="imp-label" style={labelStyle}>
                <ClipboardCheck size={14} /> Strict Quality Control
              </span>
              <h2 className="imp-title">
                Checked at{' '}
                <span className="imp-accent" style={accentText}>
                  Every Step
                </span>
              </h2>
              <p className="imp-subtitle">
                Before a zirconia crown is delivered, our clinical and laboratory teams check each
                stage and make the necessary adjustments before it is permanently cemented.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '0.6rem',
              }}
            >
              {qualityChecks.map((check, i) => (
                <span
                  key={check}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem' }}
                >
                  <span
                    style={{
                      padding: '0.6rem 1.1rem',
                      borderRadius: '999px',
                      background: '#f0fdf4',
                      border: '1px solid rgba(16,185,129,0.25)',
                      color: '#065f46',
                      fontWeight: 700,
                      fontSize: '0.9rem',
                    }}
                  >
                    {check}
                  </span>
                  {i < qualityChecks.length - 1 && (
                    <ArrowRight size={16} style={{ color: '#10b981' }} aria-hidden="true" />
                  )}
                </span>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div
              className="imp-payment-note"
              style={{
                marginTop: '3rem',
                borderColor: 'rgba(16,185,129,0.15)',
                maxWidth: '820px',
                marginInline: 'auto',
              }}
            >
              <div className="imp-payment-icon" style={{ color: '#10b981' }}>
                <ShieldCheck size={24} />
              </div>
              <div className="imp-payment-body">
                <h4>What If There Is a Problem?</h4>
                <p>
                  We stand behind the quality of our work. If a crown manufactured by our laboratory
                  develops a manufacturing-related problem covered under our service policy, we will
                  assess the case and, when appropriate, replace the crown rather than simply asking
                  you to accept the problem. You should be confident about the restoration you
                  receive.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Suitable for */}
      <section className="imp-section imp-section-light">
        <div className="container">
          <div className="imp-what-grid" style={{ alignItems: 'center' }}>
            <FadeIn>
              <div className="imp-what-content">
                <span className="imp-label" style={labelStyle}>
                  <Target size={14} /> Suitable For
                </span>
                <h2>
                  When Zirconia Crowns <span style={{ color: '#10b981' }}>Are Recommended</span>
                </h2>
                <div className="imp-gallery-checks">
                  {suitableFor.map((t) => (
                    <div key={t} className="imp-gallery-check" style={{ color: '#059669' }}>
                      <CheckCircle2 size={16} style={{ color: '#10b981' }} />
                      {t}
                    </div>
                  ))}
                </div>
                <p style={{ marginTop: '1.5rem' }}>
                  The most suitable restoration depends on your individual clinical condition.
                </p>
              </div>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div className="imp-what-content">
                <span className="imp-label" style={labelStyle}>
                  <Sparkles size={14} /> Natural-Looking Smile
                </span>
                <h2>
                  Strong <span style={{ color: '#10b981' }}>and Natural</span>
                </h2>
                <p>
                  Modern zirconia is no longer limited to strong but opaque-looking crowns. With
                  appropriate material selection, digital design, characterization and finishing,
                  zirconia can provide an excellent combination of:
                </p>
                <div className="imp-types-grid" style={{ gap: '1rem', marginTop: '1.5rem' }}>
                  {['Strength', 'Aesthetics', 'Function', 'Biocompatibility'].map((label) => (
                    <div
                      key={label}
                      style={{
                        textAlign: 'center',
                        padding: '1.25rem 0.75rem',
                        background: '#fff',
                        borderRadius: '1rem',
                        border: '1px solid rgba(16,185,129,0.1)',
                        boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
                        fontSize: '0.85rem',
                        fontWeight: 800,
                        color: '#065f46',
                      }}
                    >
                      {label}
                    </div>
                  ))}
                </div>
                <p style={{ marginTop: '1.5rem' }}>
                  For highly aesthetic cases, our dental team carefully considers your facial
                  features, existing teeth, smile line and desired appearance before finalizing the
                  design.
                </p>

                <div
                  className="imp-payment-note"
                  style={{ marginTop: '2rem', borderColor: 'rgba(16,185,129,0.15)' }}
                >
                  <div className="imp-payment-icon" style={{ color: '#10b981' }}>
                    <Crown size={24} />
                  </div>
                  <div className="imp-payment-body">
                    <h4>Price</h4>
                    <p>
                      Zirconia crown treatment starts at{' '}
                      <strong style={{ color: '#10b981', fontSize: '1.2rem' }}>৳20,000</strong>,
                      including the digital workflow, scanning and crown placement.
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Workflow */}
      <section className="imp-section imp-section-white">
        <div className="container">
          <FadeIn>
            <div className="imp-section-header">
              <span className="imp-label" style={labelStyle}>
                <Monitor size={14} /> Digital Workflow
              </span>
              <h2 className="imp-title">
                Our Zirconia Crown{' '}
                <span className="imp-accent" style={accentText}>
                  Workflow
                </span>
              </h2>
              <p className="imp-subtitle">
                Scanning, CAD design, CAM milling and professional finishing, integrated in one
                digital workflow.
              </p>
            </div>
          </FadeIn>

          <div className="imp-what-grid" style={{ alignItems: 'start' }}>
            <FadeIn delay={0.1}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {steps.map((step, i) => (
                  <motion.div
                    key={step.num}
                    className="imp-anatomy-item"
                    initial={{ opacity: 0, x: -24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                      background: '#fff',
                      border: '1.5px solid rgba(0,0,0,0.05)',
                      borderRadius: '1.25rem',
                      padding: '1.5rem',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
                      alignItems: 'flex-start',
                    }}
                  >
                    <div
                      className="imp-anatomy-icon"
                      style={{
                        background: ACCENT,
                        minWidth: '48px',
                        height: '48px',
                        fontSize: '0.95rem',
                        fontWeight: 900,
                      }}
                    >
                      {step.num}
                    </div>
                    <div>
                      <div className="imp-anatomy-title" style={{ marginBottom: '0.35rem' }}>
                        {step.title}
                      </div>
                      <p className="imp-anatomy-desc" style={{ margin: 0 }}>
                        {step.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div style={{ position: 'sticky', top: '100px' }}>
                <div
                  className="imp-what-img"
                  style={{
                    height: '360px',
                    borderRadius: '2rem',
                    overflow: 'hidden',
                    marginBottom: '2.5rem',
                  }}
                >
                  <Image
                    src={digitalImg}
                    alt="Digital zirconia crown CAD/CAM workflow"
                    fill
                    sizes="50vw"
                    style={{ objectFit: 'cover' }}
                  />
                </div>

                <h3
                  style={{
                    fontWeight: 900,
                    color: '#0f172a',
                    fontSize: '1.1rem',
                    marginBottom: '1rem',
                  }}
                >
                  More Than a Crown
                </h3>
                <p style={{ color: '#475569', lineHeight: 1.75 }}>
                  At RH Dental Care, we don&rsquo;t believe in simply placing a crown and calling
                  the treatment complete. We focus on the entire restorative process, from diagnosis
                  and treatment planning to digital design, laboratory fabrication, clinical fitting
                  and long-term follow-up.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="imp-video-section"
        style={{ background: 'linear-gradient(135deg, #020617 0%, #022c22 50%, #020617 100%)' }}
      >
        <div
          className="imp-video-orb imp-video-orb-1"
          style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.12), transparent 70%)' }}
        />
        <div
          className="imp-video-orb imp-video-orb-2"
          style={{ background: 'radial-gradient(circle, rgba(5,150,105,0.07), transparent 70%)' }}
        />
        <div className="container">
          <FadeIn>
            <div className="imp-section-header" style={{ color: '#fff' }}>
              <span
                className="imp-label"
                style={{
                  background: 'rgba(16,185,129,0.15)',
                  borderColor: 'rgba(16,185,129,0.3)',
                  color: '#6ee7b7',
                }}
              >
                <Crown size={14} /> RH Dental Care
              </span>
              <h2 className="imp-title" style={{ color: '#f1f5f9' }}>
                Your Tooth. Your Smile.{' '}
                <span
                  style={{
                    background: 'linear-gradient(135deg, #34d399, #6ee7b7)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  Our Responsibility.
                </span>
              </h2>
              <p className="imp-subtitle" style={{ color: 'rgba(203,213,225,0.8)' }}>
                Book a consultation to find out whether a zirconia crown is right for your tooth.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div className="imp-hero-cta-row" style={{ justifyContent: 'center' }}>
              <BranchCTA
                action="book"
                service="Zirconia Crown"
                className="imp-btn-primary"
                style={{
                  background: ACCENT,
                  boxShadow: '0 8px 32px rgba(16,185,129,0.4)',
                  padding: '1rem 2.5rem',
                  fontSize: '1rem',
                }}
              >
                Book Your Appointment <ArrowUpRight size={18} />
              </BranchCTA>
              <BranchCTA action="call" service="Zirconia Crown" className="imp-btn-glass">
                <Phone size={16} /> Call Now
              </BranchCTA>
              <BranchCTA
                action="whatsapp"
                service="Zirconia Crown"
                className="imp-btn-glass"
                style={{ color: '#25D366' }}
              >
                <MessageCircle size={16} /> WhatsApp
              </BranchCTA>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
