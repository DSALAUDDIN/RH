'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import {
  ArrowUpRight, Phone, CheckCircle2, Sparkles, Award,
  Crown, Shield, Zap, Target, Monitor, ChevronRight,
  ShieldCheck, MessageCircle, Star, Info
} from 'lucide-react';
import '../implants/implants.css';
import '../zirconia-crown/zirconia.css';
import BranchCTA from '@/components/branch/BranchCTA';

import heroImg      from '@/assets/specialties/zirconia.jpg';
import digitalImg   from '@/assets/specialties/zirconia_digital_workflow.png';
import veneersFlyer from '@/assets/Service_Flyer/veneers_flyer.jpeg';

/* ─── motion variants ─── */
const fadeUp: Variants  = { hidden: { opacity: 0, y: 36 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } } };

function FadeIn({ children, delay = 0, className }: { children: React.ReactNode; delay?: number; className?: string }) {
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

/* ─── page metadata ─── */
const advantages = [
  { icon: <Sparkles size={22}/>, title: 'Exceptional Natural Appearance', desc: 'Modern zirconia veneers mimic the translucency and shine of natural teeth, creating a highly aesthetic and realistic smile.', color: '#55684F', bg: '#DCE7D2' },
  { icon: <Shield size={22}/>,   title: 'Strong & Durable', desc: 'Zirconia is one of the strongest dental ceramics, highly resistant to fracture, wear, and discoloration for long-term smile rehabilitation.', color: '#9C7C38', bg: '#DCE7D2' },
  { icon: <ShieldCheck size={22}/>, title: 'Stain Resistant', desc: 'Resists staining from tea, coffee, smoking, and colored foods, helping maintain a bright smile for years.', color: '#9C7C38', bg: '#EFE3CB' },
  { icon: <Zap size={22}/>,      title: 'Minimal Tooth Reduction', desc: 'Our minimally invasive technique preserves maximum natural tooth structure while delivering outstanding cosmetic improvement.', color: 'var(--rh-brass)', bg: '#EFE3CB' },
  { icon: <Monitor size={22}/>,   title: 'Digitally Customized Smile', desc: 'Using advanced 3D scanning technology, we create highly accurate designs tailored specifically to your facial aesthetics.', color: '#9C7C38', bg: '#F1EEE3' },
];

const steps = [
  { num: '01', title: 'Advanced 3D Intraoral Scanning', desc: 'Accurate and comfortable digital impression of your teeth without the mess.' },
  { num: '02', title: 'Digital Smile Designing', desc: 'Designing your perfect smile tailored to your unique facial profile and lip support.' },
  { num: '03', title: 'CAD/CAM Precision Planning', desc: 'Highly precise computer-aided planning for perfect shape and harmony.' },
  { num: '04', title: 'High-Quality Zirconia Fabrication', desc: 'Precision milling from premium zirconia for ultimate strength and beauty.' },
  { num: '05', title: 'Custom Shade Matching & Bonding', desc: 'Minimally invasive preparation and secure bonding for a seamless, long-lasting smile.' },
];

const whyUs = [
  'Experienced Cosmetic Dental Team',
  'Modern Technology & Equipment',
  'Personalized Treatment Planning',
  'Comfortable & Patient-Friendly Environment',
  'Advanced 3D Digital Scanning',
  'High-Quality Zirconia Materials',
];

const perfectFor = [
  'Discolored or stained teeth',
  'Chipped or fractured teeth',
  'Uneven or irregular teeth',
  'Gaps between teeth',
  'Mildly crowded or misaligned teeth',
  'Worn down teeth',
  'Old unaesthetic restorations',
  'Smile asymmetry',
];

export default function ZirconiaVeneersPage() {
  return (
    <div>
      {/* ═══════════════════════ HERO ═══════════════════════ */}
      <section className="imp-hero zircon-hero">
        <div className="imp-hero-bg">
          <Image src={heroImg} alt="Zirconia Veneers at RH Dental Care" fill priority quality={90} />
        </div>
        <div className="imp-hero-overlay zircon-overlay" />
        <div className="imp-hero-content">
          <motion.div initial={{ opacity: 0, y: -14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Link href="/" style={{ color: 'var(--rh-ink-soft)', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.4rem', marginBottom: '1rem' }}>
              Home <ChevronRight size={12} /> <span style={{ color: 'var(--rh-ink-soft)' }}>Zirconia Veneers</span>
            </Link>
          </motion.div>

          <motion.div className="imp-badge zircon-badge" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.1 }}>
            <Sparkles size={14} /> Premium Smile Transformation
          </motion.div>

          <motion.h1 className="imp-hero-title"
            initial={{ opacity: 0.001, y: 40 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            Indirect Zirconia <span>Veneers</span>
          </motion.h1>

          <motion.p className="imp-hero-subtitle"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            A Premium Smile Transformation with Advanced Digital Dentistry. Achieve a naturally beautiful, long-lasting, and confident smile.
          </motion.p>

          <motion.div className="imp-hero-cta-row" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.8 }}>
            <BranchCTA action="book" service="Zirconia Veneers" className="imp-btn-primary zircon-btn">Book Consultation <ArrowUpRight size={18}/></BranchCTA>
            <BranchCTA action="call" service="Zirconia Veneers" className="imp-btn-glass"><Phone size={18}/> Call Now</BranchCTA>
            <BranchCTA action="whatsapp" service="Zirconia Veneers" className="imp-btn-glass" style={{ color: '#25D366' }}><MessageCircle size={18} /> WhatsApp</BranchCTA>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════ INTRODUCTION ═══════════════════════ */}
      <section className="imp-section" style={{ background: '#F7F5EE' }}>
        <div className="container">
          <div className="imp-what-grid" style={{ alignItems: 'center' }}>
            <FadeIn>
              <div className="imp-what-content">
                <span className="imp-label" style={{ background: 'rgba(5,150,105,0.1)', color: '#45543F', borderColor: 'rgba(5,150,105,0.2)' }}>
                  <Star size={14} /> The Gold Standard in Aesthetics
                </span>
                <h2 className="imp-title">What Are Indirect <span className="imp-accent" style={{ background: 'linear-gradient(135deg, #55684F, #45543F)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Zirconia Veneers?</span></h2>
                <div className="imp-description">
                  <p>
                    Indirect zirconia veneers are ultra-thin customized ceramic shells made from premium zirconia material that are bonded to the front surface of teeth to improve appearance and smile aesthetics.
                  </p>
                  <p>
                    Unlike direct composite veneers, these veneers are digitally designed and fabricated outside the mouth using advanced CAD/CAM technology, ensuring superior precision, strength, and natural beauty.
                  </p>
                  <p>
                    At RH Dental Care, every veneer is individually crafted according to the patient’s facial profile, smile line, lip support, and tooth anatomy to achieve the most natural and elegant result possible.
                  </p>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="imp-what-img" style={{ borderRadius: '2rem', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.08)', border: '1px solid rgba(0,0,0,0.05)', position: 'relative', width: '100%', aspectRatio: '3/4' }}>
                <Image src={veneersFlyer} alt="Zirconia Veneers Smile Transformation" fill style={{ objectFit: 'cover' }} />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══════════════════════ ADVANTAGES ═══════════════════════ */}
      <section className="imp-section">
        <div className="container">
          <FadeIn>
            <div className="imp-section-header">
              <span className="imp-label"><Award size={14} /> Why Choose Zirconia Veneers?</span>
              <h2 className="imp-title">Precision, Strength, and <span className="imp-accent">Elegance</span></h2>
              <p className="imp-subtitle">Discover the outstanding benefits of modern zirconia veneers over conventional cosmetic options.</p>
            </div>
          </FadeIn>

          <motion.div className="imp-types-grid" variants={{ hidden: {}, show: { transition: { staggerChildren: 0.09 } } }} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }}>
            {advantages.map((adv, i) => (
              <motion.div key={i} className="imp-type-card" style={{ borderTop: `4px solid ${adv.color}` }} variants={{ hidden: { opacity: 0, y: 36 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } } }}>
                <div className="imp-type-icon" style={{ background: adv.bg, color: adv.color }}>{adv.icon}</div>
                <div className="imp-type-title">{adv.title}</div>
                <p className="imp-type-desc">{adv.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════ PERFECT FOR ═══════════════════════ */}
      <section className="imp-section" style={{ background: '#F1EEE3', borderTop: '1px solid rgba(0,0,0,0.05)', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
        <div className="container">
          <div className="imp-what-grid" style={{ alignItems: 'center' }}>
            <FadeIn>
              <div className="imp-what-content">
                <span className="imp-label" style={{ background: 'rgba(156,124,56,0.1)', color: '#7E6329', borderColor: 'rgba(156,124,56,0.2)' }}>
                  <Target size={14} /> Treatment Indications
                </span>
                <h2 className="imp-title">Conditions That Can Be <span className="imp-accent" style={{ background: 'linear-gradient(135deg, #9C7C38, #7E6329)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Corrected</span></h2>
                <p className="imp-subtitle" style={{ textAlign: 'left', margin: '0 0 2rem 0', maxWidth: '100%' }}>
                  Indirect zirconia veneers can dramatically improve a wide variety of cosmetic dental issues to give you a flawless smile.
                </p>

                <div className="imp-perfect-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                  {perfectFor.map((item, i) => (
                    <div key={i} className="imp-perfect-item" style={{ background: '#fff', padding: '1rem', borderRadius: '1rem', border: '1px solid rgba(156,124,56,0.1)', display: 'flex', alignItems: 'flex-start', gap: '0.75rem', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
                      <CheckCircle2 size={18} style={{ color: '#7E6329', flexShrink: 0, marginTop: '0.1rem' }} />
                      <span style={{ fontSize: '0.95rem', fontWeight: 500, color: '#45432F' }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="imp-what-content" style={{ background: '#fff', padding: '2.5rem', borderRadius: '2rem', boxShadow: '0 20px 40px rgba(0,0,0,0.05)', border: '1px solid rgba(0,0,0,0.05)' }}>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                  <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '64px', height: '64px', background: 'rgba(156,124,56,0.1)', color: '#7E6329', borderRadius: '50%', marginBottom: '1rem' }}>
                    <Info size={32} />
                  </div>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 600, color: '#2B2A1C' }}>Smile with Confidence</h3>
                  <p style={{ color: '#6E6B57', fontSize: '0.95rem', marginTop: '0.5rem', lineHeight: 1.6 }}>
                    A beautiful smile can improve confidence, personality, and overall appearance. Our goal is to create confident, healthy, and attractive smiles through modern digital dentistry.
                  </p>
                </div>

                <div style={{ background: 'linear-gradient(135deg, #F7F5EE, #F1EEE3)', padding: '1.5rem', borderRadius: '1.25rem', border: '1px solid rgba(0,0,0,0.03)' }}>
                  <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#2B2A1C', marginBottom: '1rem' }}>The RH Difference</h4>
                  <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', listStyle: 'none', padding: 0, margin: 0 }}>
                    {whyUs.slice(0, 4).map((benefit, i) => (
                      <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.9rem', color: '#5A5747', fontWeight: 500 }}>
                        <div style={{ width: '6px', height: '6px', background: '#7E6329', borderRadius: '50%' }} />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══════════════════════ DIGITAL PROCEDURE ═══════════════════════ */}
      <section className="imp-section imp-section-white">
        <div className="container">
          <FadeIn>
            <div className="imp-section-header">
              <span className="imp-label" style={{ background: 'rgba(85,104,79,0.08)', borderColor: 'rgba(85,104,79,0.2)', color: '#45543F' }}><Monitor size={14} /> Our Digital Workflow</span>
              <h2 className="imp-title">Seamless <span className="imp-accent" style={{ background: 'linear-gradient(135deg, #55684F, #45543F)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Digital Procedure</span></h2>
              <p className="imp-subtitle">This digital workflow improves treatment accuracy, patient comfort, fit precision, and final aesthetic outcome while reducing conventional impression-related discomfort.</p>
            </div>
          </FadeIn>

          <div className="imp-what-grid" style={{ alignItems: 'start' }}>
            <FadeIn delay={0.1}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {steps.map((step, i) => (
                  <motion.div
                    key={i}
                    className="imp-anatomy-item"
                    initial={{ opacity: 0, x: -24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                    style={{ background: '#fff', border: '1.5px solid rgba(0,0,0,0.05)', borderRadius: '1.25rem', padding: '1.5rem', boxShadow: '0 4px 20px rgba(0,0,0,0.03)', alignItems: 'flex-start' }}
                  >
                    <div className="imp-anatomy-icon" style={{ background: 'linear-gradient(135deg, #55684F, #45543F)', minWidth: '48px', height: '48px', fontSize: '0.95rem', fontWeight: 600 }}>{step.num}</div>
                    <div>
                      <div className="imp-anatomy-title" style={{ marginBottom: '0.35rem' }}>{step.title}</div>
                      <p className="imp-anatomy-desc" style={{ margin: 0 }}>{step.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div style={{ position: 'sticky', top: '100px' }}>
                <div className="imp-what-img" style={{ height: '360px', borderRadius: '2rem', overflow: 'hidden', marginBottom: '2.5rem' }}>
                  <Image src={digitalImg} alt="Digital Workflow at RH Dental Care" fill sizes="50vw" style={{ objectFit: 'cover' }} />
                </div>

                <h4 style={{ fontWeight: 600, color: '#2B2A1C', fontSize: '1.1rem', marginBottom: '1.25rem' }}>Advantages of Choosing RH Dental Care</h4>
                <div className="imp-gallery-checks">
                  {whyUs.map((t, i) => (
                    <div key={i} className="imp-gallery-check"><CheckCircle2 size={16} style={{ color: '#55684F' }} />{t}</div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══════════════════════ CTA ═══════════════════════ */}
      <section className="imp-video-section" style={{ background: 'linear-gradient(135deg, #1F1E14 0%, #022c22 50%, #1F1E14 100%)' }}>
        <div className="imp-video-orb imp-video-orb-1" style={{ background: 'radial-gradient(circle, rgba(85,104,79,0.12), transparent 70%)' }} />
        <div className="imp-video-orb imp-video-orb-2" style={{ background: 'radial-gradient(circle, rgba(5,150,105,0.07), transparent 70%)' }} />
        <div className="container">
          <FadeIn>
            <div className="imp-section-header" style={{ color: 'var(--rh-ink)' }}>
              <span className="imp-label" style={{ background: 'rgba(85,104,79,0.15)', borderColor: 'rgba(85,104,79,0.3)', color: 'var(--rh-sage-deep)' }}><Sparkles size={14} /> Enhance Your Beauty</span>
              <h2 className="imp-title" style={{ color: '#F1EEE3' }}>
                Ready for a <span style={{ background: 'linear-gradient(135deg, #34d399, #B4D1A8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Beautiful Smile?</span>
              </h2>
              <p className="imp-subtitle" style={{ color: 'rgba(201,197,178,0.8)' }}>Visit RH Dental Care today and experience advanced digital dentistry designed for comfort, aesthetics, and long-term success. Your dream smile is just one appointment away.</p>
            </div>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div className="imp-hero-cta-row" style={{ justifyContent: 'center' }}>
              <BranchCTA action="book" service="Zirconia Veneers" className="imp-btn-primary" style={{ background: 'linear-gradient(135deg, #55684F, #45543F)', boxShadow: '0 8px 32px rgba(85,104,79,0.4)', padding: '1rem 2.5rem', fontSize: '1rem' }}>
                Book Your Appointment Now <ArrowUpRight size={18} />
              </BranchCTA>
              <BranchCTA action="call" service="Zirconia Veneers" className="imp-btn-glass"><Phone size={16} /> Call Now</BranchCTA>
              <BranchCTA action="whatsapp" service="Zirconia Veneers" className="imp-btn-glass" style={{ color: '#25D366' }}><MessageCircle size={16} /> WhatsApp</BranchCTA>
            </div>
          </FadeIn>
        </div>
      </section>

    </div>
  );
}
