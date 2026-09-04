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
import BranchCTA from '@/components/branch/BranchCTA';
import './zirconia.css';

import heroImg      from '@/assets/specialties/zirconia.jpg';
import zirconiaImg  from '@/assets/specialties/zirconia.png';
import digitalImg   from '@/assets/specialties/zirconia_digital_workflow.png';

/* ─── motion variants (same as implants page) ─── */
const stagger: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.09 } } };
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
  { icon: <Sparkles size={22}/>, title: 'Natural & Aesthetic Appearance', desc: 'Closely resembles natural teeth in color, translucency and texture. Blends beautifully with surrounding teeth.', color: '#55684F', bg: '#DCE7D2' },
  { icon: <Shield size={22}/>,   title: 'Exceptional Strength & Durability', desc: 'Highly strong and resistant to fracture for long-lasting results on both front and back teeth.', color: '#9C7C38', bg: '#DCE7D2' },
  { icon: <Zap size={22}/>,      title: 'Metal-Free & Biocompatible', desc: 'Safe for gums and the body. No risk of allergy or metal sensitivity. Gentle on soft tissue.', color: '#9C7C38', bg: '#F1EEE3' },
  { icon: <Target size={22}/>,   title: 'Precise Fit & Comfort', desc: 'Digitally designed for highly accurate fit and maximum comfort using CAD/CAM technology.', color: 'var(--rh-brass)', bg: '#EFE3CB' },
  { icon: <ShieldCheck size={22}/>, title: 'Stain Resistant', desc: 'Smooth ceramic surface resists stains and maintains long-term brightness for a radiant smile.', color: '#9C7C38', bg: '#EFE3CB' },
  { icon: <Crown size={22}/>,    title: 'Confidence in Every Smile', desc: 'Restores full function and gives you the confidence to smile freely, every single day.', color: '#9C7C38', bg: '#f3e8ff' },
];

const steps = [
  { num: '01', title: 'Examination & Treatment Planning', desc: 'Our dental team carefully evaluates your oral condition and designs a customized treatment plan.' },
  { num: '02', title: '3D Intraoral Scanning', desc: 'We use advanced 3D digital intraoral scanning — no uncomfortable conventional impressions needed.' },
  { num: '03', title: 'Digital Crown Design (CAD/CAM)', desc: 'The crown is digitally designed using modern CAD/CAM software for optimal fit, aesthetics and function.' },
  { num: '04', title: 'Precision Milling of Zirconia', desc: 'The crown is precision-milled from a solid block of high-quality zirconia with advanced CNC technology.' },
  { num: '05', title: 'Trial, Adjustment & Final Cementation', desc: 'After fitting and shade adjustment, the crown is permanently cemented for long-lasting performance.' },
];

const whyUs = [
  'Advanced Digital 3D Scanning Technology',
  'Modern CAD/CAM Digital Dentistry Workflow',
  'Experienced & Internationally Trained Clinicians',
  'Precision-Based Treatment Planning',
  'High Quality Premium Zirconium Materials',
  'Natural Looking Smile Restoration',
  'Comfortable & Patient-Friendly Environment',
];

const perfectFor = [
  'Broken or damaged teeth',
  'Root canal treated teeth',
  'Severely decayed teeth',
  'Discolored or misshaped teeth',
  'Smile makeover & aesthetic enhancement',
];

export default function ZirconiaCrownPage() {
  return (
    <div>

      {/* ═══════════════════════ HERO ═══════════════════════ */}
      <section className="imp-hero zircon-hero">
        <div className="imp-hero-bg">
          <Image src={heroImg} alt="Zirconium Dental Crown at RH Dental Care" fill priority quality={90} />
        </div>
        <div className="imp-hero-overlay zircon-overlay" />
        <div className="imp-hero-content">
          <motion.div initial={{ opacity: 0, y: -14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Link href="/" style={{ color: 'var(--rh-ink-soft)', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.4rem', marginBottom: '1rem' }}>
              Home <ChevronRight size={12} /> <span style={{ color: 'var(--rh-ink-soft)' }}>Zirconia Crown</span>
            </Link>
          </motion.div>

          <motion.div className="imp-badge zircon-badge" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.1 }}>
            <Crown size={14} /> Premium Smile Restoration
          </motion.div>

          <motion.h1 className="imp-hero-title"
            initial={{ opacity: 0.001, y: 40 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            Zirconium <span>Dental Crown</span>
          </motion.h1>

          <motion.p className="imp-hero-subtitle"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Naturally Beautiful. Exceptionally Strong. Metal-free ceramic crowns crafted with digital precision — restoring strength, beauty and confidence.
          </motion.p>

          <motion.div className="imp-hero-cta-row" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.8 }}>
            <BranchCTA action="book" service="Zirconia Crown" className="imp-btn-primary" style={{ background: 'linear-gradient(135deg, #55684F, #45543F)', boxShadow: '0 8px 32px rgba(85,104,79,0.4)' }}>Book Free Consultation <ArrowUpRight size={18} /></BranchCTA>
            <BranchCTA action="call" service="Zirconia Crown" className="imp-btn-glass"><Phone size={16} /> Call Now</BranchCTA>
            <BranchCTA action="whatsapp" service="Zirconia Crown" className="imp-btn-glass" style={{ color: '#25D366' }}><MessageCircle size={16} /> WhatsApp</BranchCTA>
          </motion.div>
        </div>
        <div className="imp-scroll-indicator"><span>Scroll</span><div className="imp-scroll-line" /></div>
      </section>

      {/* ═══════════════════════ INTRODUCTION ═══════════════════════ */}
      <section className="imp-section imp-section-white">
        <div className="container">
          <div className="imp-what-grid">
            <FadeIn>
              <div className="imp-what-img">
                <Image src={zirconiaImg} alt="Zirconium crown model showing natural appearance" fill sizes="(max-width:1024px) 100vw, 50vw" />
                <div className="imp-what-img-badge" style={{ background: 'rgba(85,104,79,0.12)', borderColor: 'rgba(85,104,79,0.25)', color: '#55684F' }}>
                  <Star size={14} fill="currentColor" /> Premium Quality
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div className="imp-what-content">
                <span className="imp-label" style={{ background: 'rgba(85,104,79,0.08)', borderColor: 'rgba(85,104,79,0.2)', color: '#45543F' }}><Info size={14} /> Advanced Ceramic Technology</span>
                <h2>Restore Strength. <span style={{ color: '#55684F' }}>Enhance Beauty.</span></h2>
                <p>At RH Dental Care, we provide advanced Zirconium Dental Crown treatment designed to restore damaged, broken, discolored, or root canal treated teeth with exceptional strength, comfort, and natural aesthetics.</p>
                <p>Zirconium crowns are one of the most modern and premium solutions in contemporary dentistry. These <strong>metal-free ceramic crowns</strong> are specially crafted to look, feel, and function like natural teeth while providing excellent long-term durability.</p>

                <div style={{ background: 'linear-gradient(135deg, #f0fdf4, #DCE7D2)', border: '1px solid rgba(85,104,79,0.2)', borderRadius: '1.25rem', padding: '1.5rem', marginTop: '1.5rem' }}>
                  <h4 style={{ color: '#065f46', fontWeight: 600, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Crown size={16} /> What is a Zirconium Crown?</h4>
                  <p style={{ margin: 0, fontSize: '0.9rem', color: '#047857', lineHeight: 1.75 }}>A high-quality ceramic dental cap made from zirconia material — known for its superior strength and lifelike appearance. Unlike metal-based crowns, it provides a completely natural tooth-colored appearance without any dark metal margins.</p>
                </div>

                <div className="imp-anatomy-list" style={{ marginTop: '2rem' }}>
                  {['Lifelike Translucency — matches your natural teeth', 'Custom Shade Matching — blends seamlessly', 'Seamless Blending — invisible in your smile'].map((t, i) => (
                    <motion.div key={i} className="imp-anatomy-item" initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                      <div className="imp-anatomy-icon" style={{ background: 'linear-gradient(135deg, #55684F, #45543F)' }}><CheckCircle2 size={16} /></div>
                      <div><div className="imp-anatomy-title">{t}</div></div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══════════════════════ ADVANTAGES ═══════════════════════ */}
      <section className="imp-section imp-section-light">
        <div className="container">
          <FadeIn>
            <div className="imp-section-header">
              <span className="imp-label" style={{ background: 'rgba(85,104,79,0.08)', borderColor: 'rgba(85,104,79,0.2)', color: '#45543F' }}><Award size={14} /> Clinical Advantages</span>
              <h2 className="imp-title">Advantages of <span className="imp-accent" style={{ background: 'linear-gradient(135deg, #55684F, #45543F)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Zirconium Crowns</span></h2>
              <p className="imp-subtitle">Combining the beauty of natural teeth with the strength of advanced high-tech ceramics — for a smile that lasts a lifetime.</p>
            </div>
          </FadeIn>

          <motion.div className="imp-types-grid" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }}>
            {advantages.map((adv, i) => (
              <motion.div key={i} className="imp-type-card" style={{ borderTop: `4px solid ${adv.color}` }} variants={fadeUp}>
                <div className="imp-type-icon" style={{ background: adv.bg, color: adv.color }}>{adv.icon}</div>
                <div className="imp-type-title">{adv.title}</div>
                <p className="imp-type-desc">{adv.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════ PERFECT FOR ═══════════════════════ */}
      <section className="imp-section imp-section-alt">
        <div className="container">
          <div className="imp-what-grid" style={{ alignItems: 'center' }}>
            <FadeIn>
              <div className="imp-what-content">
                <span className="imp-label" style={{ background: 'rgba(85,104,79,0.08)', borderColor: 'rgba(85,104,79,0.2)', color: '#45543F' }}><Target size={14} /> Ideal Candidates</span>
                <h2>Perfect For <span style={{ color: '#55684F' }}>These Cases</span></h2>
                <p>Zirconium crowns are recommended for a wide range of conditions. Our specialists will evaluate your unique needs during a consultation to determine if this is the right solution for you.</p>
                <div className="imp-gallery-checks">
                  {perfectFor.map((t, i) => (
                    <div key={i} className="imp-gallery-check" style={{ color: '#45543F' }}><CheckCircle2 size={16} style={{ color: '#55684F' }} />{t}</div>
                  ))}
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div className="imp-what-content">
                <span className="imp-label" style={{ background: 'rgba(85,104,79,0.08)', borderColor: 'rgba(85,104,79,0.2)', color: '#45543F' }}><Crown size={14} /> Natural Match</span>
                <h2>Natural Look. <span style={{ color: '#55684F' }}>Perfect Match.</span></h2>
                <p>Zirconium crowns are crafted to mimic natural teeth in color, shape and translucency — blending beautifully with your smile so no one can tell the difference.</p>
                <div className="imp-types-grid" style={{ gap: '1rem', marginTop: '1.5rem' }}>
                  {[
                    { label: 'Lifelike Translucency', icon: <Sparkles size={20} /> },
                    { label: 'Custom Shade Matching', icon: <Target size={20} /> },
                    { label: 'Seamless Blending', icon: <Shield size={20} /> },
                  ].map((item, i) => (
                    <div key={i} style={{ textAlign: 'center', padding: '1.25rem 0.75rem', background: '#fff', borderRadius: '1rem', border: '1px solid rgba(85,104,79,0.1)', boxShadow: '0 4px 16px rgba(0,0,0,0.03)' }}>
                      <div style={{ color: '#55684F', marginBottom: '0.5rem', display: 'flex', justifyContent: 'center' }}>{item.icon}</div>
                      <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#2B2A1C', lineHeight: 1.3 }}>{item.label}</div>
                    </div>
                  ))}
                </div>

                <div className="imp-payment-note" style={{ marginTop: '2rem', borderColor: 'rgba(85,104,79,0.15)' }}>
                  <div className="imp-payment-icon" style={{ color: '#55684F' }}><Crown size={24} /></div>
                  <div className="imp-payment-body">
                    <h4>Premium Price</h4>
                    <p>Zirconium Crown treatment is available at <strong style={{ color: '#55684F', fontSize: '1.2rem' }}>৳20,000</strong> — includes full digital workflow, scanning & crown placement.</p>
                  </div>
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
              <span className="imp-label" style={{ background: 'rgba(85,104,79,0.08)', borderColor: 'rgba(85,104,79,0.2)', color: '#45543F' }}><Monitor size={14} /> Digital Workflow</span>
              <h2 className="imp-title">Our Advanced <span className="imp-accent" style={{ background: 'linear-gradient(135deg, #55684F, #45543F)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Digital Procedure</span></h2>
              <p className="imp-subtitle">A seamless 5-step process using cutting-edge digital dentistry technology — precise, comfortable, and predictable from start to finish.</p>
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
                  <Image src={digitalImg} alt="Digital zirconia crown CAD/CAM workflow" fill sizes="50vw" style={{ objectFit: 'cover' }} />
                </div>

                <h4 style={{ fontWeight: 600, color: '#2B2A1C', fontSize: '1.1rem', marginBottom: '1.25rem' }}>Why Choose RH Dental Care?</h4>
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
              <span className="imp-label" style={{ background: 'rgba(85,104,79,0.15)', borderColor: 'rgba(85,104,79,0.3)', color: 'var(--rh-sage-deep)' }}><Crown size={14} /> Restore Your Confidence</span>
              <h2 className="imp-title" style={{ color: '#F1EEE3' }}>
                Ready for a <span style={{ background: 'linear-gradient(135deg, #34d399, #B4D1A8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Beautiful Smile?</span>
              </h2>
              <p className="imp-subtitle" style={{ color: 'rgba(201,197,178,0.8)' }}>Visit RH Dental Care today and experience advanced digital dentistry designed for comfort, aesthetics, and long-term success. Your dream smile is just one appointment away.</p>
            </div>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div className="imp-hero-cta-row" style={{ justifyContent: 'center' }}>
              <BranchCTA action="book" service="Zirconia Crown" className="imp-btn-primary" style={{ background: 'linear-gradient(135deg, #55684F, #45543F)', boxShadow: '0 8px 32px rgba(85,104,79,0.4)', padding: '1rem 2.5rem', fontSize: '1rem' }}>
                Book Your Appointment Now <ArrowUpRight size={18} />
              </BranchCTA>
              <BranchCTA action="call" service="Zirconia Crown" className="imp-btn-glass"><Phone size={16} /> Call Now</BranchCTA>
              <BranchCTA action="whatsapp" service="Zirconia Crown" className="imp-btn-glass" style={{ color: '#25D366' }}><MessageCircle size={16} /> WhatsApp</BranchCTA>
            </div>
          </FadeIn>
        </div>
      </section>

    </div>
  );
}
