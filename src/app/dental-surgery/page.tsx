'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import {
  ArrowUpRight, Phone, CheckCircle2, Award, ShieldCheck,
  Zap, Building2, ChevronRight, MessageCircle, Stethoscope,
  Layers, FlaskConical, Target, Scissors, RefreshCw, AlignJustify
} from 'lucide-react';
import '../implants/implants.css';
import './dental-surgery.css';
import BranchCTA from '@/components/branch/BranchCTA';

import heroImg    from '@/assets/specialties/dental_surgery_hero.png';
import surgeonImg from '@/assets/specialties/microscope-loupes.png';
import gumImg     from '@/assets/specialties/gum-care.jpg';

/* ─── variants ─── */
const stagger: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.09 } } };
const fadeUp: Variants  = { hidden: { opacity:0, y:36 }, show: { opacity:1, y:0, transition:{ duration:0.7, ease:[0.16,1,0.3,1] } } };

function FadeIn({ children, delay=0, className }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div className={className} initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }}
      viewport={{ once:true, margin:'-100px' }} transition={{ duration:0.8, delay, ease:[0.16,1,0.3,1] }}>
      {children}
    </motion.div>
  );
}

/* ─── data ─── */
const services = [
  {
    icon: <Stethoscope size={22}/>,
    title: 'Extensive Surgery Under General Anesthesia',
    desc: 'For medically compromised patients, anxious individuals, special children, or extensive procedures — we perform comprehensive dental surgeries under GA in collaboration with reputed hospitals and experienced anesthesia teams.',
    color: '#8A3B2A', bg: '#F0E0D8',
    features: ['Complete safety monitoring throughout', 'Multiple procedures in one session', 'Collaboration with certified hospitals', 'Expert anesthesia team on standby'],
  },
  {
    icon: <Scissors size={22}/>,
    title: 'Oral & Maxillofacial Fracture Management',
    desc: 'Expert diagnosis and surgical management of fractures involving the oral and facial region — jaw fractures, traumatic injuries — with proper surgical stabilization, functional rehabilitation, and aesthetic care.',
    color: '#9C7C38', bg: '#F1EEE3',
    features: ['Jaw and facial fracture stabilization', 'Functional rehabilitation planning', 'Aesthetic care post-surgery', 'Advanced imaging for diagnosis'],
  },
  {
    icon: <Target size={22}/>,
    title: 'Oral Cancer, Tumors & Cystic Lesions',
    desc: 'Our surgical team manages various oral pathological conditions including cystic lesions, benign tumors, impacted lesions, and selected oral cancer-related surgical procedures with proper evaluation and post-operative care.',
    color: 'var(--rh-brass)', bg: '#EFE3CB',
    features: ['Comprehensive pre-surgical evaluation', 'Benign tumor & cyst management', 'Selected oral cancer procedures', 'Thorough post-operative monitoring'],
  },
  {
    icon: <Zap size={22}/>,
    title: 'Impacted Wisdom Tooth Extraction',
    desc: 'Safe and advanced surgical removal of impacted wisdom teeth using modern surgical techniques — designed for reduced pain, minimal trauma, and faster recovery.',
    color: '#9C7C38', bg: '#DCE7D2',
    features: ['Advanced surgical techniques', 'Minimal trauma approach', 'Faster healing protocol', 'Post-extraction care guidance'],
  },
  {
    icon: <RefreshCw size={22}/>,
    title: 'Full Mouth Tooth Rehabilitation',
    desc: 'Comprehensive full mouth rehabilitation for patients with severely damaged, missing, worn, or functionally compromised teeth. Our multidisciplinary approach restores oral function, aesthetics, bite balance, and smile confidence.',
    color: '#55684F', bg: '#DCE7D2',
    features: ['Complete oral function restoration', 'Aesthetic smile reconstruction', 'Bite balance correction', 'Multidisciplinary team approach'],
  },
  {
    icon: <FlaskConical size={22}/>,
    title: 'Advanced Bone Grafting & Regeneration',
    desc: 'Utilizing different types of advanced graft materials and regenerative techniques to improve healing, bone preservation, implant support, and long-term treatment outcomes.',
    color: '#9C7C38', bg: '#f3e8ff',
    features: ['Bone graft & collagen membranes', 'Xenograft materials', 'PRF / CGF support', 'Guided Bone Regeneration (GBR)'],
  },
];

const whyUs = [
  'Experienced Dental & Surgical Team',
  'Advanced Surgical Instruments & Technology',
  'Safe Surgical Protocols & Sterilization',
  'Surgical Management Under GA',
  'Multidisciplinary Treatment Approach',
  'Advanced Grafting & Regenerative Support',
  'Patient-Centered Care & Comfort',
  'Comprehensive Surgical Solutions Under One Roof',
];

const otFeatures = [
  { icon: <ShieldCheck size={20}/>, title: 'Hospital-Grade Sterilization', desc: 'Strict infection control protocols maintained at every step of every procedure.', color: '#8A3B2A', bg: '#F0E0D8' },
  { icon: <Stethoscope size={20}/>, title: 'Pre-Operative Assessment', desc: 'Complete medical evaluation before every surgical procedure for maximum safety.', color: '#9C7C38', bg: '#F1EEE3' },
  { icon: <Layers size={20}/>,     title: 'Intraoperative Monitoring', desc: 'Continuous vital sign monitoring by experienced anesthesiology team throughout.', color: '#9C7C38', bg: '#DCE7D2' },
  { icon: <AlignJustify size={20}/>, title: 'Post-Operative Care', desc: 'Detailed recovery guidelines, follow-ups, and support until full healing is achieved.', color: '#55684F', bg: '#DCE7D2' },
];

export default function DentalSurgeryPage() {
  return (
    <div>

      {/* ═══════════════ HERO ═══════════════ */}
      <section className="imp-hero ds-hero">
        <div className="imp-hero-bg">
          <Image src={heroImg} alt="Advanced Dental Surgery at RH Dental Care" fill priority quality={90}/>
        </div>
        <div className="imp-hero-overlay ds-overlay"/>
        <div className="imp-hero-content">
          <motion.div initial={{ opacity:0, y:-14 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.6 }}>
            <Link href="/" style={{ color: 'var(--rh-ink-soft)', textDecoration:'none', fontSize:'0.85rem', fontWeight:600, display:'inline-flex', alignItems:'center', gap:'0.4rem', marginBottom:'1rem' }}>
              Home <ChevronRight size={12}/> <span style={{ color: 'var(--rh-ink-soft)' }}>Specialties</span> <ChevronRight size={12}/> <span style={{ color:'#fca5a5' }}>Dental Surgery</span>
            </Link>
          </motion.div>

          <motion.div className="imp-badge ds-badge" initial={{ opacity:0, scale:0.9 }} animate={{ opacity:1, scale:1 }} transition={{ duration:0.5, delay:0.1 }}>
            <Scissors size={14}/> Precision · Safety · Expertise
          </motion.div>

          <motion.h1 className="imp-hero-title" initial={{ opacity: 0.001, y:40 }} animate={{ opacity:1, y:0 }}
            transition={{ duration:1, delay:0.2, ease:[0.16,1,0.3,1] }}>
            Advanced <span>Dental Surgery</span>
          </motion.h1>

          <motion.p className="imp-hero-subtitle" initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.8, delay:0.4 }}>
            Comprehensive oral and maxillofacial surgical solutions — from wisdom tooth removal to complex reconstructive procedures — delivered with precision, safety, and compassionate care.
          </motion.p>

          <motion.div className="imp-hero-cta-row" initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.8, delay:0.8 }}>
            <BranchCTA action="book" service="Dental & Oral Surgery" className="imp-btn-primary" style={{ background:'linear-gradient(135deg, #8A3B2A, #7A3325)', boxShadow:'0 8px 32px rgba(239,68,68,0.4)' }}>
              Book Surgical Consultation <ArrowUpRight size={18}/>
            </BranchCTA>
            <BranchCTA action="call" service="Dental & Oral Surgery" className="imp-btn-glass"><Phone size={16}/> Call Now</BranchCTA>
            <BranchCTA action="whatsapp" service="Dental & Oral Surgery" className="imp-btn-glass" style={{ color:'#25D366' }}><MessageCircle size={16}/> WhatsApp</BranchCTA>
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
                <Image src={surgeonImg} alt="Dental surgeon with surgical loupes" fill sizes="(max-width:1024px) 100vw, 50vw" style={{ objectFit:'cover' }}/>
                <div className="imp-what-img-badge ds-img-badge">
                  <ShieldCheck size={14}/> Safe · Precise · Expert
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div className="imp-what-content">
                <span className="imp-label ds-label"><Award size={14}/> Clinical Excellence</span>
                <h2>Comprehensive Surgical <span style={{ color:'#8A3B2A' }}>Excellence</span></h2>
                <p>At RH Dental Care, we provide advanced and comprehensive dental surgical solutions with a strong focus on patient safety, precision, comfort, and long-term treatment success.</p>
                <p>Our experienced surgical team, modern OT support, and <strong>multidisciplinary treatment approach</strong> allow us to manage simple to highly complex oral and maxillofacial surgical cases with confidence.</p>
                <p>We are committed to delivering <strong>safe, ethical, and evidence-based surgical care</strong> using modern techniques, advanced instruments, and proper surgical protocols.</p>

                <div className="imp-anatomy-list" style={{ marginTop:'1.75rem' }}>
                  {[
                    { n:'01', t:'Simple to complex oral surgical cases', c:'linear-gradient(135deg, #8A3B2A, #7A3325)' },
                    { n:'02', t:'Hospital-grade OT & sterilization protocols', c:'linear-gradient(135deg, #9C7C38, #7E6329)' },
                    { n:'03', t:'GA management with certified hospital partners', c:'linear-gradient(135deg, #9C7C38, #55684F)' },
                  ].map((item, i) => (
                    <motion.div key={i} className="imp-anatomy-item" initial={{ opacity:0, x:-20 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ delay:i*0.1 }}>
                      <div className="imp-anatomy-icon" style={{ background:item.c }}>{item.n}</div>
                      <div><div className="imp-anatomy-title">{item.t}</div></div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══════════════ SERVICES ═══════════════ */}
      <section className="imp-section imp-section-light">
        <div className="container">
          <FadeIn>
            <div className="imp-section-header">
              <span className="imp-label ds-label"><Layers size={14}/> Surgical Services</span>
              <h2 className="imp-title">Our Dental <span className="imp-accent" style={{ background:'linear-gradient(135deg, #8A3B2A, #7A3325)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>Surgical Services</span></h2>
              <p className="imp-subtitle">A full spectrum of oral and maxillofacial surgical care — managed by experienced specialists with advanced technology and strict safety protocols.</p>
            </div>
          </FadeIn>

          <div style={{ display:'flex', flexDirection:'column', gap:'2rem' }}>
            {services.map((svc, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div style={{ background:'#fff', borderRadius:'1.75rem', padding:'2.25rem', border:`1px solid ${svc.color}20`, boxShadow:'0 4px 24px rgba(0,0,0,0.03)', borderLeft:`5px solid ${svc.color}` }}>
                  <div className="imp-what-grid" style={{ alignItems:'start', gap:'2rem' }}>
                    <div>
                      <div style={{ display:'flex', alignItems:'center', gap:'1rem', marginBottom:'1rem' }}>
                        <div className="imp-type-icon" style={{ background:svc.bg, color:svc.color, width:52, height:52, borderRadius:14, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>{svc.icon}</div>
                        <h3 style={{ fontSize:'1.2rem', fontWeight: 600, color:'#2B2A1C', margin:0, letterSpacing:'-0.01em' }}>{svc.title}</h3>
                      </div>
                      <p style={{ color:'#5A5747', lineHeight:1.75, margin:0, fontSize:'0.92rem' }}>{svc.desc}</p>
                    </div>
                    <div className="imp-gallery-checks">
                      {svc.features.map((f, j) => (
                        <div key={j} className="imp-gallery-check"><CheckCircle2 size={15} style={{ color:svc.color }}/>{f}</div>
                      ))}
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ OT TEAM ═══════════════ */}
      <section className="imp-section imp-section-alt">
        <div className="container">
          <div className="imp-what-grid" style={{ alignItems:'center' }}>
            <FadeIn>
              <div className="imp-what-content">
                <span className="imp-label ds-label"><Building2 size={14}/> Operation Theater</span>
                <h2>Experienced OT & <span style={{ color:'#8A3B2A' }}>Surgical Team</span></h2>
                <p>Our highly experienced Operation Theater (OT) team follows strict sterilization and infection control protocols to maintain the highest standards of patient safety and surgical excellence.</p>
                <p>From <strong>pre-operative assessment</strong> to <strong>post-operative care</strong>, every procedure is carefully monitored and professionally managed by our dedicated surgical team.</p>

                <motion.div className="imp-types-grid" style={{ marginTop:'2rem' }}
                  variants={stagger} initial="hidden" whileInView="show" viewport={{ once:true }}>
                  {otFeatures.map((f, i) => (
                    <motion.div key={i} className="imp-type-card" style={{ borderTop:`3px solid ${f.color}`, padding:'1.25rem' }} variants={fadeUp}>
                      <div className="imp-type-icon" style={{ background:f.bg, color:f.color, width:44, height:44, borderRadius:12, marginBottom:'0.75rem' }}>{f.icon}</div>
                      <div className="imp-type-title" style={{ fontSize:'0.88rem', marginBottom:'0.3rem' }}>{f.title}</div>
                      <p className="imp-type-desc" style={{ fontSize:'0.77rem' }}>{f.desc}</p>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div className="imp-what-img" style={{ height:'420px', borderRadius:'2rem', overflow:'hidden' }}>
                <Image src={gumImg} alt="RH Dental Care surgical team and OT" fill sizes="50vw" style={{ objectFit:'cover' }}/>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══════════════ WHY CHOOSE US ═══════════════ */}
      <section className="imp-section imp-section-white">
        <div className="container">
          <FadeIn>
            <div className="imp-section-header">
              <span className="imp-label ds-label"><Award size={14}/> Our Advantage</span>
              <h2 className="imp-title">Why Choose <span className="imp-accent" style={{ background:'linear-gradient(135deg, #8A3B2A, #7A3325)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>RH Dental Care?</span></h2>
              <p className="imp-subtitle">We are dedicated to providing advanced dental surgical care with compassion, precision, and modern technology to ensure the best possible treatment outcomes.</p>
            </div>
          </FadeIn>
          <div className="imp-types-grid">
            {whyUs.map((t, i) => (
              <FadeIn key={i} delay={i * 0.07}>
                <div style={{ background:'#fff', border:'1px solid rgba(239,68,68,0.08)', borderRadius:'1.25rem', padding:'1.5rem', textAlign:'center', boxShadow:'0 4px 20px rgba(0,0,0,0.02)', transition:'all 0.3s ease' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform='translateY(-6px)'; (e.currentTarget as HTMLDivElement).style.boxShadow='0 16px 40px rgba(239,68,68,0.1)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform='translateY(0)'; (e.currentTarget as HTMLDivElement).style.boxShadow='0 4px 20px rgba(0,0,0,0.02)'; }}>
                  <div style={{ width:44, height:44, borderRadius:12, background:'#F0E0D8', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 1rem', color:'#8A3B2A' }}>
                    <CheckCircle2 size={20}/>
                  </div>
                  <p style={{ margin:0, fontSize:'0.85rem', fontWeight:700, color:'#2B2A1C', lineHeight:1.4 }}>{t}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ CTA ═══════════════ */}
      <section className="imp-video-section" style={{ background:'linear-gradient(135deg, #1F1E14 0%, #1c0a0a 50%, #1F1E14 100%)' }}>
        <div className="imp-video-orb imp-video-orb-1" style={{ background:'radial-gradient(circle, rgba(239,68,68,0.12), transparent 70%)' }}/>
        <div className="imp-video-orb imp-video-orb-2" style={{ background:'radial-gradient(circle, rgba(220,38,38,0.07), transparent 70%)' }}/>
        <div className="container">
          <FadeIn>
            <div className="imp-section-header" style={{ color: 'var(--rh-ink)' }}>
              <span className="imp-label" style={{ background:'rgba(239,68,68,0.15)', borderColor:'rgba(239,68,68,0.3)', color:'#fca5a5' }}>
                <Stethoscope size={14}/> Advanced Surgical Care
              </span>
              <h2 className="imp-title" style={{ color:'#F1EEE3' }}>
                Trust Your Surgery to <span style={{ background:'linear-gradient(135deg, #f87171, #fca5a5)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>Expert Hands</span>
              </h2>
              <p className="imp-subtitle" style={{ color:'rgba(201,197,178,0.8)' }}>
                At RH Dental Care, every surgical procedure is performed with the highest level of precision, care, and patient safety. Book a consultation today and let our expert team guide you toward the best surgical solution.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div className="imp-hero-cta-row" style={{ justifyContent:'center' }}>
              <BranchCTA action="book" service="Dental & Oral Surgery" className="imp-btn-primary" style={{ background:'linear-gradient(135deg, #8A3B2A, #7A3325)', boxShadow:'0 8px 32px rgba(239,68,68,0.4)', padding:'1rem 2.5rem', fontSize:'1rem' }}>
                Book Surgical Consultation <ArrowUpRight size={18}/>
              </BranchCTA>
              <BranchCTA action="call" service="Dental & Oral Surgery" className="imp-btn-glass"><Phone size={16}/> Call Now</BranchCTA>
              <BranchCTA action="whatsapp" service="Dental & Oral Surgery" className="imp-btn-glass" style={{ color:'#25D366' }}><MessageCircle size={16}/> WhatsApp</BranchCTA>
            </div>
          </FadeIn>
        </div>
      </section>

    </div>
  );
}
