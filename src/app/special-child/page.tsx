'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import {
  ArrowUpRight, Phone, CheckCircle2, Heart, Award,
  ShieldCheck, Users, Star, Info, Building2,
  ChevronRight, MessageCircle, Baby, Stethoscope,
  BookOpen, Target, Smile
} from 'lucide-react';
import '../implants/implants.css';
import './special-child.css';

import heroImg from '@/assets/specialties/kids-care.jpg';
import kidsImg  from '@/assets/specialties/kids_clean.png';
import flyerImg from '@/assets/specialties/special-child-flyer.jpg';

/* ─── variants ─── */
const stagger: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.09 } } };
const fadeUp: Variants  = { hidden: { opacity: 0, y: 36 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } } };

function FadeIn({ children, delay = 0, className }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div className={className} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}>
      {children}
    </motion.div>
  );
}

/* ─── data ─── */
const pillars = [
  { icon: <Baby size={22}/>,        title: 'Child-Friendly Environment',  desc: 'Warm, welcoming, and stress-free atmosphere designed to ease anxiety and build trust with every child.', color: '#14b8a6', bg: '#ccfbf1' },
  { icon: <Heart size={22}/>,       title: 'Individualized Care',          desc: 'Every treatment plan is tailored to the child\'s unique medical condition, behavior, and dental needs.', color: '#ec4899', bg: '#fce7f3' },
  { icon: <ShieldCheck size={22}/>, title: 'Safe & Comfortable Treatment', desc: 'Advanced behavior management techniques and GA protocols ensure maximum safety and comfort.', color: '#6366f1', bg: '#ede9fe' },
  { icon: <Smile size={22}/>,       title: 'Better Oral Health',           desc: 'Long-term preventive care and oral hygiene guidance for a healthier, happier quality of life.', color: '#10b981', bg: '#d1fae5' },
  { icon: <Users size={22}/>,       title: 'Parent & Caregiver Support',   desc: 'Continuous communication and guidance for parents throughout the entire treatment journey.', color: '#f59e0b', bg: '#fef3c7' },
  { icon: <BookOpen size={22}/>,    title: 'Awareness & Education',        desc: 'Creating oral health awareness among parents, caregivers, and the wider community.', color: '#0ea5e9', bg: '#e0f2fe' },
];

const gaFeatures = [
  'Pain-free and stress-free treatment',
  'Multiple procedures completed in a single session',
  'Minimizes fear, anxiety and trauma',
  'Safe and closely monitored by experienced anesthetists',
  'Better cooperation and long-term oral health outcomes',
];

const mouFeatures = [
  'Access to advanced medical facilities',
  'Pre-assessment and medical evaluation',
  'Safe anesthesia and recovery',
  'Emergency support when required',
  'Multidisciplinary and integrated patient care',
];

const approach = [
  { icon: <Users size={20}/>,       title: 'Awareness & Education',    desc: 'Creating awareness among parents, caregivers and the community about special child dental needs.', color: '#14b8a6' },
  { icon: <Target size={20}/>,      title: 'Specialized Assessment',   desc: 'Individual evaluation and treatment planning based on each child\'s unique clinical needs.', color: '#6366f1' },
  { icon: <Heart size={20}/>,       title: 'Comfortable Treatment',    desc: 'Gentle behavior management techniques in a caring and child-friendly environment.', color: '#ec4899' },
  { icon: <ShieldCheck size={20}/>, title: 'Safe Management',          desc: 'Treatments under GA with strict safety protocols, expert anesthesiology and monitoring.', color: '#10b981' },
  { icon: <Smile size={20}/>,       title: 'Preventive Care',          desc: 'Focus on long-term oral health, prevention and regular follow-up for lasting outcomes.', color: '#f59e0b' },
];

const goals = [
  'Improve oral health awareness among parents and caregivers',
  'Provide compassionate and specialized dental treatment',
  'Reduce dental fear and treatment anxiety',
  'Ensure safe, effective and ethical management for special children',
  'Promote long-term preventive dental care and oral hygiene',
];

export default function SpecialChildPage() {
  return (
    <div>

      {/* ═══════════════ HERO ═══════════════ */}
      <section className="imp-hero sc-hero">
        <div className="imp-hero-bg">
          <Image src={heroImg} alt="Special Child Dental Care at RH Dental Care" fill priority quality={90} />
        </div>
        <div className="imp-hero-overlay sc-overlay" />
        <div className="imp-hero-content">
          <motion.div initial={{ opacity: 0, y: -14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Link href="/" style={{ color:'rgba(255,255,255,0.5)', textDecoration:'none', fontSize:'0.85rem', fontWeight:600, display:'inline-flex', alignItems:'center', gap:'0.4rem', marginBottom:'1rem' }}>
              Home <ChevronRight size={12}/> <span style={{ color:'rgba(255,255,255,0.8)' }}>Specialties</span> <ChevronRight size={12}/> <span style={{ color:'#99f6e4' }}>Special Child Program</span>
            </Link>
          </motion.div>

          <motion.div className="imp-badge sc-badge" initial={{ opacity:0, scale:0.9 }} animate={{ opacity:1, scale:1 }} transition={{ duration:0.5, delay:0.1 }}>
            <Heart size={14}/> Compassionate Care · Special Smiles
          </motion.div>

          <motion.h1 className="imp-hero-title" initial={{ opacity:0, y:40 }} animate={{ opacity:1, y:0 }} transition={{ duration:1, delay:0.2, ease:[0.16,1,0.3,1] }}>
            Special Child <span>Dental Program</span>
          </motion.h1>

          <motion.p className="imp-hero-subtitle" initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.8, delay:0.4 }}>
            Dental Awareness & Management for Children with Special Healthcare Needs — safe, compassionate, and designed around every child's unique journey.
          </motion.p>

          <motion.div className="imp-hero-cta-row" initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.8, delay:0.8 }}>
            <Link href="/contact" className="imp-btn-primary" style={{ background:'linear-gradient(135deg, #14b8a6, #0d9488)', boxShadow:'0 8px 32px rgba(20,184,166,0.4)' }}>
              Book a Consultation <ArrowUpRight size={18}/>
            </Link>
            <a href="tel:+8801775227902" className="imp-btn-glass"><Phone size={16}/> Call Now</a>
            <a href="https://wa.me/8801775227902" target="_blank" rel="noopener noreferrer" className="imp-btn-glass" style={{ color:'#25D366' }}><MessageCircle size={16}/> WhatsApp</a>
          </motion.div>
        </div>
        <div className="imp-scroll-indicator"><span>Scroll</span><div className="imp-scroll-line"/></div>
      </section>

      {/* ═══════════════ INTRODUCTION ═══════════════ */}
      <section className="imp-section imp-section-white">
        <div className="container">
          <div className="imp-what-grid">
            <FadeIn>
              <div className="imp-what-img">
                <Image src={kidsImg} alt="Special child receiving gentle dental care" fill sizes="(max-width:1024px) 100vw, 50vw" style={{ objectFit:'cover' }}/>
                <div className="imp-what-img-badge sc-img-badge">
                  <Heart size={14} fill="currentColor"/> Every Child is Special
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div className="imp-what-content">
                <span className="imp-label sc-label"><Info size={14}/> Our Commitment</span>
                <h2>Every Child Deserves a <span style={{ color:'#14b8a6' }}>Healthy Smile</span></h2>
                <p>At RH Dental Care, we understand that special children require extra care, patience, compassion, and a comfortable treatment environment. Our Special Child Dental Awareness &amp; Management Program is designed to provide safe, stress-free, and specialized dental care for children with special healthcare needs.</p>
                <p>We focus on creating a <strong>child-friendly and supportive atmosphere</strong> while ensuring proper communication with parents and caregivers throughout the treatment process.</p>

                <div style={{ background:'linear-gradient(135deg, #f0fdfa, #ccfbf1)', border:'1px solid rgba(20,184,166,0.2)', borderRadius:'1.25rem', padding:'1.5rem', marginTop:'1.5rem' }}>
                  <h4 style={{ color:'#134e4a', fontWeight:800, marginBottom:'0.5rem', display:'flex', alignItems:'center', gap:'0.5rem' }}><Heart size={16}/> Compassionate Care · Special Smiles · Better Tomorrow</h4>
                  <p style={{ margin:0, fontSize:'0.9rem', color:'#0f766e', lineHeight:1.75 }}>We provide specialized, gentle and comprehensive dental care for children with special healthcare needs in a safe, supportive and child-friendly environment — with love, patience and expertise.</p>
                </div>

                <div className="imp-anatomy-list" style={{ marginTop:'2rem' }}>
                  {['Behavior management & desensitization protocols', 'Parent counseling and continuous communication', 'Hospital-grade safety with MOU partner hospitals'].map((t, i) => (
                    <motion.div key={i} className="imp-anatomy-item" initial={{ opacity:0, x:-20 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ delay: i*0.1 }}>
                      <div className="imp-anatomy-icon" style={{ background:'linear-gradient(135deg, #14b8a6, #0d9488)' }}><CheckCircle2 size={16}/></div>
                      <div><div className="imp-anatomy-title">{t}</div></div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══════════════ PILLARS ═══════════════ */}
      <section className="imp-section imp-section-light">
        <div className="container">
          <FadeIn>
            <div className="imp-section-header">
              <span className="imp-label sc-label"><Award size={14}/> Program Pillars</span>
              <h2 className="imp-title">What Makes Our <span className="imp-accent" style={{ background:'linear-gradient(135deg, #14b8a6, #0d9488)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>Program Special</span></h2>
              <p className="imp-subtitle">A multi-dimensional approach combining clinical excellence, compassionate care, and family-centered support.</p>
            </div>
          </FadeIn>
          <motion.div className="imp-types-grid" variants={stagger} initial="hidden" whileInView="show" viewport={{ once:true, margin:'-60px' }}>
            {pillars.map((p, i) => (
              <motion.div key={i} className="imp-type-card" style={{ borderTop:`4px solid ${p.color}` }} variants={fadeUp}>
                <div className="imp-type-icon" style={{ background:p.bg, color:p.color }}>{p.icon}</div>
                <div className="imp-type-title">{p.title}</div>
                <p className="imp-type-desc">{p.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════ GA + MOU SPLIT ═══════════════ */}
      <section className="imp-section imp-section-alt">
        <div className="container">
          <div className="imp-what-grid" style={{ alignItems:'start' }}>
            {/* GA */}
            <FadeIn>
              <div>
                <span className="imp-label sc-label"><Stethoscope size={14}/> Advanced Treatment</span>
                <h3 style={{ fontSize:'1.6rem', fontWeight:900, color:'#0f172a', marginBottom:'1rem', lineHeight:1.2 }}>
                  Dental Care Under <span style={{ color:'#14b8a6' }}>General Anesthesia</span>
                </h3>
                <p style={{ color:'#475569', lineHeight:1.75, marginBottom:'1.5rem' }}>
                  For children who are extremely anxious, medically compromised, uncooperative, or require extensive dental treatment — we provide comprehensive dental management under <strong style={{ color:'#14b8a6' }}>General Anesthesia (GA)</strong>. Multiple procedures are completed safely and comfortably in a single session, minimizing fear, stress and trauma.
                </p>
                <div className="imp-gallery-checks">
                  {gaFeatures.map((t, i) => (
                    <div key={i} className="imp-gallery-check"><CheckCircle2 size={16} style={{ color:'#14b8a6' }}/>{t}</div>
                  ))}
                </div>
              </div>
            </FadeIn>

            {/* MOU */}
            <FadeIn delay={0.15}>
              <div>
                <span className="imp-label sc-label"><Building2 size={14}/> Hospital Collaboration</span>
                <h3 style={{ fontSize:'1.6rem', fontWeight:900, color:'#0f172a', marginBottom:'1rem', lineHeight:1.2 }}>
                  MOU with Multiple <span style={{ color:'#14b8a6' }}>Partner Hospitals</span>
                </h3>
                <p style={{ color:'#475569', lineHeight:1.75, marginBottom:'1.5rem' }}>
                  To ensure maximum patient safety, RH Dental Care has established <strong>MOU-based collaborations</strong> with multiple reputed hospitals for advanced patient management and dental treatment under GA. This integrated, multidisciplinary approach provides organized and safe care for every special child.
                </p>
                <div className="imp-gallery-checks">
                  {mouFeatures.map((t, i) => (
                    <div key={i} className="imp-gallery-check"><CheckCircle2 size={16} style={{ color:'#14b8a6' }}/>{t}</div>
                  ))}
                </div>
                <div style={{ marginTop:'1.5rem', background:'rgba(20,184,166,0.08)', border:'1px solid rgba(20,184,166,0.2)', borderRadius:'1rem', padding:'1.25rem', display:'flex', alignItems:'center', gap:'0.75rem' }}>
                  <Users size={20} style={{ color:'#14b8a6', flexShrink:0 }}/>
                  <p style={{ margin:0, fontSize:'0.88rem', fontWeight:700, color:'#134e4a' }}>Together for Safe, Specialized and Quality Dental Care.</p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══════════════ PROGRAM FLYER ═══════════════ */}
      <section className="imp-section imp-section-light" style={{ padding: '4rem 0' }}>
        <div className="container">
          <FadeIn>
            <div className="imp-section-header" style={{ marginBottom: '2.5rem' }}>
              <span className="imp-label sc-label"><Info size={14}/> At a Glance</span>
              <h2 className="imp-title">Special Child <span className="imp-accent" style={{ background:'linear-gradient(135deg, #14b8a6, #0d9488)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>Awareness Flyer</span></h2>
            </div>
            <div style={{ position:'relative', maxWidth:'800px', margin:'0 auto', borderRadius:'1.5rem', overflow:'hidden', boxShadow:'0 24px 64px rgba(20,184,166,0.15)', border:'1px solid rgba(20,184,166,0.2)' }}>
              <Image src={flyerImg} alt="Special Child Dental Awareness and Management Program Flyer" width={800} height={1131} style={{ width:'100%', height:'auto', display:'block' }}/>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════ OUR APPROACH ═══════════════ */}
      <section className="imp-section imp-section-white">
        <div className="container">
          <FadeIn>
            <div className="imp-section-header">
              <span className="imp-label sc-label"><Target size={14}/> Clinical Approach</span>
              <h2 className="imp-title">Our <span className="imp-accent" style={{ background:'linear-gradient(135deg, #14b8a6, #0d9488)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>5-Step Approach</span></h2>
              <p className="imp-subtitle">A systematic, compassionate, and clinically structured methodology designed around every child's unique needs.</p>
            </div>
          </FadeIn>
          <motion.div className="imp-types-grid"
            variants={stagger} initial="hidden" whileInView="show" viewport={{ once:true, margin:'-60px' }}>
            {approach.map((a, i) => (
              <motion.div key={i} className="imp-type-card" style={{ borderTop:`4px solid ${a.color}`, textAlign:'center' }} variants={fadeUp}>
                <div className="imp-type-icon" style={{ background:`${a.color}15`, color:a.color, margin:'0 auto 1rem' }}>{a.icon}</div>
                <div className="imp-type-title" style={{ fontSize:'0.9rem' }}>{a.title}</div>
                <p className="imp-type-desc" style={{ fontSize:'0.78rem' }}>{a.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════ GOALS ═══════════════ */}
      <section className="imp-section imp-section-light">
        <div className="container">
          <div className="imp-what-grid">
            <FadeIn>
              <div className="imp-what-content">
                <span className="imp-label sc-label"><Star size={14}/> Our Goals</span>
                <h2>Committed to <span style={{ color:'#14b8a6' }}>Every Child's Future</span></h2>
                <p>At RH Dental Care, we believe every child deserves a healthy smile, proper care, and a positive dental experience — regardless of their medical condition or special needs.</p>
                <div className="imp-gallery-checks" style={{ marginTop:'1.5rem' }}>
                  {goals.map((t, i) => (
                    <div key={i} className="imp-gallery-check"><CheckCircle2 size={16} style={{ color:'#14b8a6' }}/>{t}</div>
                  ))}
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div className="imp-payment-note sc-cta-box">
                <div className="imp-payment-icon" style={{ color:'#14b8a6' }}><Heart size={32}/></div>
                <div className="imp-payment-body">
                  <h4 style={{ color:'#134e4a', fontSize:'1.3rem' }}>Every Child is Special. Every Smile Matters.</h4>
                  <p style={{ color:'#0f766e' }}>We are here to care, support and bring healthy smiles to special children. Book a consultation today and give your child the best dental care with love, patience and expertise.</p>
                  <div style={{ display:'flex', gap:'1rem', flexWrap:'wrap', marginTop:'1.5rem' }}>
                    <Link href="/contact" className="imp-btn-primary" style={{ background:'linear-gradient(135deg, #14b8a6, #0d9488)', boxShadow:'0 8px 28px rgba(20,184,166,0.3)' }}>
                      Book Consultation <ArrowUpRight size={16}/>
                    </Link>
                    <a href="tel:+8801775227902" className="imp-btn-glass" style={{ color:'#14b8a6', borderColor:'rgba(20,184,166,0.3)' }}>
                      <Phone size={16}/> Call Us
                    </a>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══════════════ FINAL CTA ═══════════════ */}
      <section className="imp-video-section" style={{ background:'linear-gradient(135deg, #020617 0%, #042f2e 50%, #020617 100%)' }}>
        <div className="imp-video-orb imp-video-orb-1" style={{ background:'radial-gradient(circle, rgba(20,184,166,0.12), transparent 70%)' }}/>
        <div className="imp-video-orb imp-video-orb-2" style={{ background:'radial-gradient(circle, rgba(13,148,136,0.07), transparent 70%)' }}/>
        <div className="container">
          <FadeIn>
            <div className="imp-section-header" style={{ color:'#fff' }}>
              <span className="imp-label" style={{ background:'rgba(20,184,166,0.15)', borderColor:'rgba(20,184,166,0.3)', color:'#99f6e4' }}>
                <Heart size={14}/> Together for a Healthy Smile
              </span>
              <h2 className="imp-title" style={{ color:'#f1f5f9' }}>
                Give Your Child the <span style={{ background:'linear-gradient(135deg, #2dd4bf, #99f6e4)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>Care They Deserve</span>
              </h2>
              <p className="imp-subtitle" style={{ color:'rgba(203,213,225,0.8)' }}>
                Book a consultation today and take the first step towards a healthy, happy smile for your special child. RH Dental Care — Your Smile, Our Passion.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div className="imp-hero-cta-row" style={{ justifyContent:'center' }}>
              <Link href="/contact" className="imp-btn-primary" style={{ background:'linear-gradient(135deg, #14b8a6, #0d9488)', boxShadow:'0 8px 32px rgba(20,184,166,0.4)', padding:'1rem 2.5rem', fontSize:'1rem' }}>
                Book Appointment Now <ArrowUpRight size={18}/>
              </Link>
              <a href="tel:+8801775227902" className="imp-btn-glass"><Phone size={16}/> Call Now</a>
              <a href="https://wa.me/8801775227902" target="_blank" rel="noopener noreferrer" className="imp-btn-glass" style={{ color:'#25D366' }}><MessageCircle size={16}/> WhatsApp</a>
            </div>
          </FadeIn>
        </div>
      </section>

    </div>
  );
}
