'use client';

import { useState, useCallback, useEffect } from 'react';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import {
  ArrowUpRight, Phone, CheckCircle2, Award, Zap,
  ScanLine, Monitor, Layers, ChevronRight, MessageCircle,
  Cpu, BarChart3, Globe, Sparkles, Shield, RefreshCw,
  ZoomIn, X, ChevronLeft, ChevronRight as ChevronRightIcon,
  PlayCircle
} from 'lucide-react';
import '../implants/implants.css';
import './digital-dentistry.css';
import BranchCTA from '@/components/branch/BranchCTA';

import heroImg    from '@/assets/specialties/3d-imaging.jpg';
import scannerImg from '@/assets/specialties/imaging.png';

/* ─── Real clinical case images ─── */
import drMehedinImg  from '@/assets/digital/dr_mehedi_digital.png';
import scan3shape    from '@/assets/digital/digital_3shape_abutment.png';
import implantPlan   from '@/assets/digital/digital_implant_planning.png';
import cbctAnalysis  from '@/assets/digital/digital_cbct_analysis.jpg';
import guidedSurgery from '@/assets/digital/digital_guided_surgery.jpg';

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
const scanAdvantages = [
  { icon: <ScanLine size={22}/>,   title: 'Highly Accurate Impressions',    desc: 'Millimeter-precision 3D digital impressions far exceeding traditional methods.', color: '#9C7C38', bg: '#F1EEE3' },
  { icon: <Sparkles size={22}/>,   title: 'Comfortable & Painless',         desc: 'No messy conventional impression materials — just a smooth, comfortable scan.', color: '#9C7C38', bg: '#DCE7D2' },
  { icon: <Cpu size={22}/>,        title: 'Better Fitting Prosthesis',       desc: 'Crowns, bridges, aligners, and implants fit with superior precision.', color: '#55684F', bg: '#DCE7D2' },
  { icon: <Zap size={22}/>,        title: 'Reduced Treatment Time',          desc: 'Faster chairside scanning, faster lab communication, faster delivery.', color: 'var(--rh-brass)', bg: '#EFE3CB' },
  { icon: <Globe size={22}/>,      title: 'Digital Lab Communication',       desc: 'Instant, accurate data transfer between our clinic and digital laboratories.', color: '#9C7C38', bg: '#f3e8ff' },
  { icon: <BarChart3 size={22}/>,  title: 'Long-Term Digital Records',       desc: 'Complete digital patient records for accurate comparison and monitoring.', color: '#9C7C38', bg: '#EFE3CB' },
];

const workflowBenefits = [
  'Diagnose dental conditions more accurately',
  'Plan treatments digitally with improved precision',
  'Reduce manual errors vs. traditional impressions',
  'Improve dentist–patient–laboratory communication',
  'Provide faster and more efficient treatments',
  'Maintain long-term digital patient records',
  'Enhance patient understanding via visual simulation',
];

const useCases = [
  {
    icon: <Monitor size={22}/>,
    title: 'Prosthodontic Treatment',
    color: '#9C7C38', bg: '#F1EEE3',
    points: [
      'Highly accurate crown, bridge & veneer design',
      'Superior restoration fit and precision',
      'Digital bite and occlusion analysis',
      'Improved esthetic smile rehabilitation',
      'Reduced adjustment and remake rates',
      'More predictable restorative outcomes',
    ],
  },
  {
    icon: <RefreshCw size={22}/>,
    title: 'Orthodontics & Clear Aligners',
    color: '#9C7C38', bg: '#f3e8ff',
    points: [
      'Accurate digital orthodontic model creation',
      'Virtual tooth movement simulation',
      'Visualize treatment outcomes before starting',
      'Precision-designed customized clear aligners',
      'Digital monitoring of treatment progress',
      'More interactive patient experience',
    ],
  },
  {
    icon: <Layers size={22}/>,
    title: 'Guided Dental Surgery',
    color: '#9C7C38', bg: '#DCE7D2',
    points: [
      'Digital implant planning with CBCT integration',
      'Guided implant surgery & surgical guide fabrication',
      'Bone graft and sinus lift planning',
      'Full mouth rehabilitation planning',
      'Accurate implant positioning',
      'Minimally invasive surgical procedures',
    ],
  },
];

const futureTech = [
  { icon: <ScanLine size={20}/>,   title: '3D Intraoral Scanning',      color: '#9C7C38' },
  { icon: <Monitor size={20}/>,    title: 'Digital Smile Design',        color: '#9C7C38' },
  { icon: <Cpu size={20}/>,        title: 'CAD/CAM Systems',             color: '#55684F' },
  { icon: <Layers size={20}/>,     title: 'Guided Surgery',              color: 'var(--rh-brass)' },
  { icon: <Sparkles size={20}/>,   title: 'AI-Assisted Diagnostics',     color: '#9C7C38' },
  { icon: <Globe size={20}/>,      title: '3D Printing Technology',      color: '#9C7C38' },
];

type GalleryItem = { src: StaticImageData; alt: string; label: string; desc: string };

const galleryItems: GalleryItem[] = [
  { src: drMehedinImg, alt: 'Dr. Mehedi performing digital implant planning on 3Shape software', label: 'Dr. Mehedi — Digital Planning', desc: 'Real-time 3D surgical planning for complex implant cases at RH Dental Care using 3Shape software.' },
  { src: scan3shape,   alt: '3Shape digital abutment design', label: '3Shape — Abutment Design', desc: 'Digital customized abutment planning for implant-supported prosthesis using 3Shape CAD/CAM.' },
  { src: implantPlan,  alt: '3D implant surgical planning', label: '3D Implant Positioning', desc: 'Full arch implant surgical guide planning with 3D visualization and CBCT overlay.' },
  { src: cbctAnalysis, alt: 'CBCT cross-sectional implant analysis', label: 'CBCT Cross-Section Analysis', desc: 'Detailed bone density and implant trajectory analysis derived from CBCT radiographic data.' },
  { src: guidedSurgery, alt: 'Digital bone density mapping', label: 'Bone Density Mapping', desc: 'Advanced bone quality (D1–D4) analysis for highly predictable and safe implant placement.' },
];

export default function DigitalDentistryPage() {
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const openLightbox = useCallback((idx: number) => {
    setLightboxIdx(idx);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxIdx(null);
    document.body.style.overflow = '';
  }, []);

  const navigate = useCallback((dir: 1 | -1) => {
    setLightboxIdx(prev => prev === null ? null : (prev + dir + galleryItems.length) % galleryItems.length);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') navigate(1);
      if (e.key === 'ArrowLeft') navigate(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [closeLightbox, navigate]);

  return (
    <>
    {/* ══ LIGHTBOX MODAL ══ */}
    <AnimatePresence>
      {lightboxIdx !== null && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          style={{ position:'fixed', inset:0, zIndex:9999, background:'rgba(247, 245, 238, 0.92)', display:'flex', alignItems:'center', justifyContent:'center', padding:'1.5rem' }}
          onClick={closeLightbox}
        >
          {/* Close */}
          <button onClick={closeLightbox} style={{ position:'absolute', top:'1.5rem', right:'1.5rem', width:48, height:48, borderRadius:'50%', background:'rgba(255,255,255,0.1)', border:'1px solid rgba(255,255,255,0.2)', color: 'var(--rh-ink)', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', backdropFilter:'blur(8px)', zIndex:10 }}>
            <X size={22}/>
          </button>
          {/* Prev */}
          <button onClick={e => { e.stopPropagation(); navigate(-1); }} style={{ position:'absolute', left:'1.5rem', top:'50%', transform:'translateY(-50%)', width:52, height:52, borderRadius:'50%', background:'rgba(255,255,255,0.1)', border:'1px solid rgba(255,255,255,0.15)', color: 'var(--rh-ink)', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', backdropFilter:'blur(8px)', zIndex:10 }}>
            <ChevronLeft size={24}/>
          </button>
          {/* Next */}
          <button onClick={e => { e.stopPropagation(); navigate(1); }} style={{ position:'absolute', right:'1.5rem', top:'50%', transform:'translateY(-50%)', width:52, height:52, borderRadius:'50%', background:'rgba(255,255,255,0.1)', border:'1px solid rgba(255,255,255,0.15)', color: 'var(--rh-ink)', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', backdropFilter:'blur(8px)', zIndex:10 }}>
            <ChevronRightIcon size={24}/>
          </button>
          {/* Image */}
          <motion.div
            key={lightboxIdx}
            initial={{ opacity:0, scale:0.92 }} animate={{ opacity:1, scale:1 }} exit={{ opacity:0, scale:0.95 }}
            transition={{ duration:0.3, ease:[0.16,1,0.3,1] }}
            onClick={e => e.stopPropagation()}
            style={{ position:'relative', width:'min(900px, 92vw)', height:'min(600px, 80vh)', borderRadius:'1.5rem', overflow:'hidden', boxShadow:'0 40px 100px rgba(43, 42, 28, 0.80)', border:'1px solid rgba(255,255,255,0.1)' }}
          >
            <Image src={galleryItems[lightboxIdx].src} alt={galleryItems[lightboxIdx].alt} fill style={{ objectFit:'contain', background:'#0a0a1a' }}/>
            <div style={{ position:'absolute', bottom:0, left:0, right:0, padding:'2rem', background:'linear-gradient(transparent, rgba(247, 245, 238, 0.92))', backdropFilter:'blur(2px)' }}>
              <div style={{ fontSize:'0.7rem', fontWeight: 600, letterSpacing:'0.12em', textTransform:'uppercase', color:'#a5b4fc', marginBottom:'0.4rem' }}>{lightboxIdx + 1} / {galleryItems.length} — {galleryItems[lightboxIdx].label}</div>
              <p style={{ margin:0, color: 'var(--rh-ink-soft)', fontSize:'0.9rem', lineHeight:1.6 }}>{galleryItems[lightboxIdx].desc}</p>
            </div>
          </motion.div>
          {/* Dots */}
          <div style={{ position:'absolute', bottom:'1.5rem', left:'50%', transform:'translateX(-50%)', display:'flex', gap:'0.5rem' }}>
            {galleryItems.map((_, i) => (
              <button key={i} onClick={e => { e.stopPropagation(); setLightboxIdx(i); }} style={{ width: i === lightboxIdx ? 24 : 8, height:8, borderRadius:4, background: i === lightboxIdx ? '#CDAE51' : 'rgba(255,255,255,0.3)', border:'none', cursor:'pointer', transition:'all 0.3s ease', padding:0 }}/>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>

    <div>

      {/* ═══════════════ HERO ═══════════════ */}
      <section className="imp-hero dd-hero">
        <div className="imp-hero-bg">
          <Image src={heroImg} alt="Digital Dentistry and 3D Intraoral Scanning at RH Dental Care" fill priority quality={90}/>
        </div>
        <div className="imp-hero-overlay dd-overlay"/>
        <div className="imp-hero-content">
          <motion.div initial={{ opacity:0, y:-14 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.6 }}>
            <Link href="/" style={{ color: 'var(--rh-ink-soft)', textDecoration:'none', fontSize:'0.85rem', fontWeight:600, display:'inline-flex', alignItems:'center', gap:'0.4rem', marginBottom:'1rem' }}>
              Home <ChevronRight size={12}/> <span style={{ color: 'var(--rh-ink-soft)' }}>Specialties</span> <ChevronRight size={12}/> <span style={{ color:'#c7d2fe' }}>Digital Dentistry</span>
            </Link>
          </motion.div>

          <motion.div className="imp-badge dd-badge" initial={{ opacity:0, scale:0.9 }} animate={{ opacity:1, scale:1 }} transition={{ duration:0.5, delay:0.1 }}>
            <Cpu size={14}/> Future-Ready · Precision-Driven · Digital
          </motion.div>

          <motion.h1 className="imp-hero-title" initial={{ opacity: 0.001, y:40 }} animate={{ opacity:1, y:0 }} transition={{ duration:1, delay:0.2, ease:[0.16,1,0.3,1] }}>
            Digital Dentistry & <span>3D Scanning</span>
          </motion.h1>

          <motion.p className="imp-hero-subtitle" initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.8, delay:0.4 }}>
            Modern 3D technology transforming the way we diagnose, plan, and perform dental treatments — for more precise, comfortable, and predictable outcomes.
          </motion.p>

          <motion.div className="imp-hero-cta-row" initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.8, delay:0.8 }}>
            <BranchCTA action="book" service="Digital Dentistry & 3D Scanning" className="imp-btn-primary" style={{ background:'linear-gradient(135deg, #9C7C38, #7E6329)', boxShadow:'0 8px 32px rgba(156,124,56,0.4)' }}>
              Book Digital Consultation <ArrowUpRight size={18}/>
            </BranchCTA>
            <BranchCTA action="call" service="Digital Dentistry & 3D Scanning" className="imp-btn-glass"><Phone size={16}/> Call Now</BranchCTA>
            <BranchCTA action="whatsapp" service="Digital Dentistry & 3D Scanning" className="imp-btn-glass" style={{ color:'#25D366' }}><MessageCircle size={16}/> WhatsApp</BranchCTA>
          </motion.div>
        </div>
        <div className="imp-scroll-indicator"><span>Scroll</span><div className="imp-scroll-line"/></div>
      </section>

      {/* ═══════════════ WHAT IS 3D SCANNING ═══════════════ */}
      <section className="imp-section imp-section-white">
        <div className="container">
          <div className="imp-what-grid">
            <FadeIn>
              <div className="imp-what-img">
                <Image src={scannerImg} alt="3D intraoral scanner capturing digital impression" fill sizes="(max-width:1024px) 100vw, 50vw" style={{ objectFit:'cover' }}/>
                <div className="imp-what-img-badge dd-img-badge">
                  <ScanLine size={14}/> Digital Precision
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div className="imp-what-content">
                <span className="imp-label dd-label"><ScanLine size={14}/> Advanced Technology</span>
                <h2>What is Dental <span style={{ color:'#9C7C38' }}>3D Intraoral Scanning?</span></h2>
                <p>Dental 3D intraoral scanning is an advanced digital technology that captures highly accurate three-dimensional images of the teeth, gums, bite, and surrounding oral structures using a small handheld scanner.</p>
                <p>This digital process <strong>replaces uncomfortable conventional impression techniques</strong>, instantly creating a virtual digital model of the patient's mouth — allowing dentists to diagnose and plan treatments with exceptional precision.</p>

                <div style={{ background:'linear-gradient(135deg, #eef2ff, #F1EEE3)', border:'1px solid rgba(156,124,56,0.2)', borderRadius:'1.25rem', padding:'1.5rem', marginTop:'1.5rem' }}>
                  <h4 style={{ color:'#3730a3', fontWeight: 600, marginBottom:'0.5rem', display:'flex', alignItems:'center', gap:'0.5rem' }}><Cpu size={16}/> At RH Dental Care</h4>
                  <p style={{ margin:0, fontSize:'0.9rem', color:'#4338ca', lineHeight:1.75 }}>We integrate Digital 3D Intraoral Scanning, CAD/CAM systems, digital smile designing, and digital surgical planning to provide more precise, comfortable, and predictable treatment experiences.</p>
                </div>

                <div className="imp-anatomy-list" style={{ marginTop:'1.75rem' }}>
                  {[
                    { n:'01', t:'Replaces messy conventional impression materials', c:'linear-gradient(135deg, #9C7C38, #7E6329)' },
                    { n:'02', t:'Instant virtual 3D model of the entire oral cavity', c:'linear-gradient(135deg, #9C7C38, #55684F)' },
                    { n:'03', t:'Digital data shared instantly with labs and surgeons', c:'linear-gradient(135deg, #55684F, #45543F)' },
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

      {/* ═══════════════ DIGITAL WORKFLOW BENEFITS ═══════════════ */}
      <section className="imp-section imp-section-alt">
        <div className="container">
          <div className="imp-what-grid" style={{ alignItems:'center' }}>
            <FadeIn>
              <div className="imp-what-content">
                <span className="imp-label dd-label"><BarChart3 size={14}/> Digital Workflow</span>
                <h2>How Digital Dentistry <span style={{ color:'#9C7C38' }}>Improves Treatment</span></h2>
                <p>Digital dentistry has revolutionized the complete dental workflow. With 3D scanning and digital planning, treatments become more efficient, minimally invasive, and highly predictable.</p>
                <div className="imp-gallery-checks" style={{ marginTop:'1.5rem' }}>
                  {workflowBenefits.map((t, i) => (
                    <div key={i} className="imp-gallery-check"><CheckCircle2 size={16} style={{ color:'#9C7C38' }}/>{t}</div>
                  ))}
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div>
                <span className="imp-label dd-label" style={{ marginBottom:'1.5rem', display:'inline-flex' }}><Sparkles size={14}/> Scanning Advantages</span>
                <div style={{ display:'flex', flexDirection:'column', gap:'1rem' }}>
                  {scanAdvantages.map((adv, i) => (
                    <motion.div key={i} initial={{ opacity:0, x:24 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ delay:i*0.08, duration:0.6 }}
                      style={{ display:'flex', alignItems:'flex-start', gap:'1rem', background:'#fff', padding:'1.25rem', borderRadius:'1.1rem', border:`1px solid ${adv.color}15`, boxShadow:'0 4px 16px rgba(0,0,0,0.02)' }}>
                      <div style={{ width:44, height:44, borderRadius:12, background:adv.bg, color:adv.color, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>{adv.icon}</div>
                      <div>
                        <div style={{ fontWeight: 600, color:'#2B2A1C', fontSize:'0.92rem', marginBottom:'0.2rem' }}>{adv.title}</div>
                        <p style={{ margin:0, fontSize:'0.8rem', color:'#6E6B57', lineHeight:1.5 }}>{adv.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══════════════ USE CASES ═══════════════ */}
      <section className="imp-section imp-section-light">
        <div className="container">
          <FadeIn>
            <div className="imp-section-header">
              <span className="imp-label dd-label"><Layers size={14}/> Clinical Applications</span>
              <h2 className="imp-title">Where We Apply <span className="imp-accent" style={{ background:'linear-gradient(135deg, #9C7C38, #7E6329)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>Digital Technology</span></h2>
              <p className="imp-subtitle">Our digital workflow enhances outcomes across all major dental disciplines — from crowns and aligners to complex surgical planning.</p>
            </div>
          </FadeIn>

          <div className="imp-types-grid" style={{ gap:'2rem' }}>
            {useCases.map((uc, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div style={{ background:'#fff', borderRadius:'1.75rem', padding:'2rem', border:`1px solid ${uc.color}15`, boxShadow:'0 4px 24px rgba(0,0,0,0.03)', borderTop:`5px solid ${uc.color}`, height:'100%' }}>
                  <div style={{ width:54, height:54, borderRadius:16, background:uc.bg, color:uc.color, display:'flex', alignItems:'center', justifyContent:'center', marginBottom:'1.25rem' }}>{uc.icon}</div>
                  <h3 style={{ fontSize:'1.15rem', fontWeight: 600, color:'#2B2A1C', marginBottom:'1.25rem' }}>{uc.title}</h3>
                  <div className="imp-gallery-checks">
                    {uc.points.map((p, j) => (
                      <div key={j} className="imp-gallery-check" style={{ fontSize:'0.82rem' }}><CheckCircle2 size={14} style={{ color:uc.color }}/>{p}</div>
                    ))}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ FUTURE OF DENTISTRY ═══════════════ */}
      <section className="imp-section imp-section-white">
        <div className="container">
          <FadeIn>
            <div className="imp-section-header">
              <span className="imp-label dd-label"><Globe size={14}/> The Digital Future</span>
              <h2 className="imp-title">The Future of <span className="imp-accent" style={{ background:'linear-gradient(135deg, #9C7C38, #7E6329)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>Dentistry is Digital</span></h2>
              <p className="imp-subtitle">Modern dentistry is rapidly moving toward fully digital workflows. At RH Dental Care, we are committed to staying at the forefront of dental innovation.</p>
            </div>
          </FadeIn>

          <motion.div className="imp-types-grid" variants={stagger} initial="hidden" whileInView="show" viewport={{ once:true, margin:'-60px' }}>
            {futureTech.map((t, i) => (
              <motion.div key={i} className="imp-type-card" style={{ borderTop:`4px solid ${t.color}`, textAlign:'center' }} variants={fadeUp}>
                <div className="imp-type-icon" style={{ background:`${t.color}15`, color:t.color, margin:'0 auto 1rem' }}>{t.icon}</div>
                <div className="imp-type-title">{t.title}</div>
              </motion.div>
            ))}
          </motion.div>

          <FadeIn delay={0.2}>
            <div className="imp-what-grid" style={{ background:'linear-gradient(135deg, #eef2ff, #F1EEE3)', border:'1px solid rgba(156,124,56,0.15)', borderRadius:'2rem', padding:'3rem', marginTop:'4rem', alignItems:'center' }}>
              <div>
                <h3 style={{ fontSize:'1.75rem', fontWeight: 600, color:'#2B2A1C', lineHeight:1.2, marginBottom:'1rem' }}>RH Dental Care — <span style={{ color:'#9C7C38' }}>Digitally Advanced</span></h3>
                <p style={{ color:'#4338ca', lineHeight:1.8, margin:0 }}>We are continuously upgrading our technologies to deliver dental services with greater accuracy and efficiency. Digital dentistry is the future — and we are already here.</p>
              </div>
              <div style={{ display:'flex', flexDirection:'column', gap:'0.75rem' }}>
                {['Advanced 3D scanning for all prosthetic work', 'Digital implant planning with CBCT', 'CAD/CAM crown and bridge fabrication', 'Clear aligner design and monitoring', 'Digital smile design visualization'].map((t, i) => (
                  <div key={i} style={{ display:'flex', alignItems:'center', gap:'0.75rem', background:'rgba(255,255,255,0.6)', padding:'0.75rem 1rem', borderRadius:'0.75rem', backdropFilter:'blur(8px)' }}>
                    <Shield size={16} style={{ color:'#9C7C38', flexShrink:0 }}/>
                    <span style={{ fontSize:'0.88rem', fontWeight:600, color:'#3730a3' }}>{t}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════ REAL CASES GALLERY ═══════════════ */}
      <section style={{ background: 'var(--rh-surface)', padding:'6rem 0', position:'relative', overflow:'hidden' }}>
        <div className="imp-video-orb imp-video-orb-1" style={{ background:'radial-gradient(circle, rgba(156,124,56,0.12), transparent 70%)' }}/>
        <div className="imp-video-orb imp-video-orb-2" style={{ background:'radial-gradient(circle, rgba(79,70,229,0.07), transparent 70%)' }}/>
        <div className="container">
          <FadeIn>
            <div className="imp-section-header" style={{ color: 'var(--rh-ink)' }}>
              <span className="imp-label" style={{ background:'rgba(156,124,56,0.15)', borderColor:'rgba(156,124,56,0.3)', color:'#c7d2fe' }}><Monitor size={14}/> Our Digital Lab</span>
              <h2 className="imp-title" style={{ color:'#F1EEE3' }}>Real Cases from <span style={{ background:'linear-gradient(135deg, #CDAE51, #c7d2fe)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>Our Digital Lab</span></h2>
              <p className="imp-subtitle" style={{ color:'rgba(201,197,178,0.7)' }}>Actual digital planning work by Dr. B.M. Rafiqul Hasan Mehedi — click any image to view in full screen.</p>
            </div>
          </FadeIn>

          {/* Feature card — Dr. Mehedi */}
          <FadeIn delay={0.1}>
            <motion.div
              onClick={() => openLightbox(0)}
              whileHover={{ scale:1.01 }}
              style={{ position:'relative', borderRadius:'2rem', overflow:'hidden', height:'480px', marginBottom:'2rem', boxShadow:'0 32px 80px rgba(43, 42, 28, 0.50)', border:'1px solid rgba(156,124,56,0.25)', cursor:'pointer' }}
            >
              <Image src={galleryItems[0].src} alt={galleryItems[0].alt} fill style={{ objectFit:'cover', objectPosition:'center 30%' }}/>
              <div style={{ position:'absolute', inset:0, background:'linear-gradient(180deg, rgba(247, 245, 238, 0.22) 0%, rgba(247, 245, 238, 0.92) 100%)' }}/>
              {/* Zoom badge */}
              <div style={{ position:'absolute', top:'1.5rem', right:'1.5rem', width:48, height:48, borderRadius:'50%', background:'rgba(156,124,56,0.8)', backdropFilter:'blur(8px)', border:'1px solid rgba(255,255,255,0.2)', display:'flex', alignItems:'center', justifyContent:'center', color: 'var(--rh-ink)', boxShadow:'0 8px 24px rgba(156,124,56,0.4)' }}>
                <ZoomIn size={20}/>
              </div>
              <div style={{ position:'absolute', top:'1.5rem', left:'1.5rem', background:'rgba(156,124,56,0.85)', backdropFilter:'blur(8px)', border:'1px solid rgba(255,255,255,0.15)', borderRadius: '4px', padding:'0.45rem 1.1rem', fontSize:'0.7rem', fontWeight: 600, letterSpacing:'0.1em', textTransform:'uppercase', color: 'var(--rh-ink)' }}>Featured</div>
              <div style={{ position:'absolute', bottom:'2.5rem', left:'2.5rem', color: 'var(--rh-ink)' }}>
                <div style={{ fontSize:'0.72rem', fontWeight: 600, textTransform:'uppercase', letterSpacing:'0.12em', color:'#c7d2fe', marginBottom:'0.5rem' }}>Digital Implant Planning — 3Shape</div>
                <h3 style={{ fontSize:'1.75rem', fontWeight: 600, margin:0, letterSpacing:'-0.02em' }}>Dr. Mehedi — Live Digital Planning</h3>
                <p style={{ margin:'0.5rem 0 0', color: 'var(--rh-ink-soft)', fontSize:'0.9rem' }}>Real-time 3D surgical planning for complex implant cases at RH Dental Care</p>
              </div>
            </motion.div>
          </FadeIn>

          {/* 4-image masonry grid */}
          <div className="imp-types-grid" style={{ gap:'1.25rem' }}>
            {galleryItems.slice(1).map((img, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <motion.div
                  onClick={() => openLightbox(i + 1)}
                  whileHover={{ scale:1.02, y:-4 }}
                  style={{ position:'relative', borderRadius:'1.5rem', overflow:'hidden', height: i === 0 ? '380px' : '300px', border:'1px solid rgba(156,124,56,0.2)', boxShadow:'0 12px 40px rgba(0,0,0,0.3)', cursor:'pointer' }}
                >
                  <Image src={img.src} alt={img.alt} fill style={{ objectFit:'cover' }}/>
                  <div style={{ position:'absolute', inset:0, background:'linear-gradient(180deg, transparent 30%, rgba(247, 245, 238, 0.92) 100%)' }}/>
                  {/* hover zoom icon */}
                  <motion.div
                    initial={{ opacity:0, scale:0.8 }} whileHover={{ opacity:1, scale:1 }}
                    style={{ position:'absolute', top:'1rem', right:'1rem', width:40, height:40, borderRadius:'50%', background:'rgba(156,124,56,0.8)', backdropFilter:'blur(8px)', display:'flex', alignItems:'center', justifyContent:'center', color: 'var(--rh-ink)' }}
                  >
                    <ZoomIn size={18}/>
                  </motion.div>
                  <div style={{ position:'absolute', bottom:'1.5rem', left:'1.5rem', right:'1.5rem' }}>
                    <div style={{ fontSize:'0.62rem', fontWeight: 600, textTransform:'uppercase', letterSpacing:'0.1em', color:'#a5b4fc', marginBottom:'0.4rem' }}>{img.label}</div>
                    <p style={{ margin:0, color: 'var(--rh-ink-soft)', fontSize:'0.82rem', fontWeight:500, lineHeight:1.5 }}>{img.desc}</p>
                  </div>
                </motion.div>
              </FadeIn>
            ))}
          </div>

          {/* 3Shape badge */}
          <FadeIn delay={0.25}>
            <div style={{ marginTop:'3rem', background:'rgba(255,255,255,0.04)', borderRadius:'1.5rem', border:'1px solid rgba(156,124,56,0.2)', padding:'2rem', display:'flex', alignItems:'center', gap:'2rem', flexWrap:'wrap', backdropFilter:'blur(8px)' }}>
              <div style={{ flex:1, minWidth:'250px' }}>
                <h4 style={{ fontWeight: 600, color:'#E4E0D2', marginBottom:'0.5rem', fontSize:'1.1rem' }}>Powered by 3Shape — World&apos;s Leading Dental Software</h4>
                <p style={{ margin:0, color:'rgba(148,163,184,0.85)', fontSize:'0.88rem', lineHeight:1.7 }}>All digital planning at RH Dental Care is performed using 3Shape — the world&apos;s most advanced dental CAD/CAM and implant planning platform.</p>
              </div>
              <div style={{ display:'flex', gap:'1.25rem', flexWrap:'wrap' }}>
                {['3Shape CAD/CAM', 'CBCT Integration', 'Implant Studio', 'Bone Analysis'].map((t, i) => (
                  <div key={i} style={{ textAlign:'center' }}>
                    <div style={{ width:48, height:48, borderRadius:14, background:'rgba(156,124,56,0.15)', border:'1px solid rgba(156,124,56,0.25)', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 0.5rem', color: 'var(--rh-brass)' }}>
                      <Cpu size={20}/>
                    </div>
                    <div style={{ fontSize:'0.72rem', fontWeight:700, color:'#8C8973' }}>{t}</div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════ VIDEO GALLERY POCKET ═══════════════ */}
      <section className="imp-section imp-section-light">
        <div className="container">
          <FadeIn>
            <div className="imp-section-header">
              <span className="imp-label dd-label"><PlayCircle size={14}/> Patient Experiences</span>
              <h2 className="imp-title">In their words <span className="imp-accent" style={{ background:'linear-gradient(135deg, #9C7C38, #7E6329)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>patients</span></h2>
              <p className="imp-subtitle">Watch real patient stories and clinical experiences from our digital dentistry workflow.</p>
            </div>
          </FadeIn>

          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <FadeIn>
              <div style={{ background: '#fff', borderRadius: '1.5rem', overflow: 'hidden', border: '1px solid rgba(156,124,56,0.1)', boxShadow: '0 12px 40px rgba(0,0,0,0.08)', position: 'relative' }}>
                <div style={{ position: 'relative', paddingTop: '56.25%' /* 16:9 Aspect Ratio */, backgroundColor: '#000' }}>
                  <video 
                    controls 
                    preload="metadata"
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'contain' }}
                    poster="https://res.cloudinary.com/dxrcufs8f/video/upload/so_0,f_auto,q_auto/v1778517737/WhatsApp_Video_2026-05-07_at_10.50.58_acsiog.jpg"
                  >
                    <source src="https://res.cloudinary.com/dxrcufs8f/video/upload/v1778517737/WhatsApp_Video_2026-05-07_at_10.50.58_acsiog.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
                <div style={{ padding: '1.5rem', textAlign: 'center' }}>
                  <div style={{ fontSize: '1.1rem', fontWeight: 600, color: '#2B2A1C', marginBottom: '0.25rem' }}>Our Happy Patient</div>
                  <p style={{ margin: 0, fontSize: '0.9rem', color: '#6E6B57' }}>Experience with Digital Dentistry at RH Dental Care</p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══════════════ CTA ═══════════════ */}
      <section className="imp-video-section" style={{ background:'linear-gradient(135deg, #1F1E14 0%, #0c0a2e 50%, #1F1E14 100%)' }}>
        <div className="imp-video-orb imp-video-orb-1" style={{ background:'radial-gradient(circle, rgba(156,124,56,0.15), transparent 70%)' }}/>
        <div className="imp-video-orb imp-video-orb-2" style={{ background:'radial-gradient(circle, rgba(79,70,229,0.08), transparent 70%)' }}/>
        <div className="container">
          <FadeIn>
            <div className="imp-section-header" style={{ color: 'var(--rh-ink)' }}>
              <span className="imp-label" style={{ background:'rgba(156,124,56,0.15)', borderColor:'rgba(156,124,56,0.3)', color:'#c7d2fe' }}>
                <Cpu size={14}/> Experience Digital Dentistry
              </span>
              <h2 className="imp-title" style={{ color:'#F1EEE3' }}>
                Experience the <span style={{ background:'linear-gradient(135deg, #CDAE51, #c7d2fe)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>Digital Difference</span>
              </h2>
              <p className="imp-subtitle" style={{ color:'rgba(201,197,178,0.8)' }}>
                Discover how our advanced digital dentistry workflow can transform your treatment experience — more accurate, more comfortable, and more predictable than ever before.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div className="imp-hero-cta-row" style={{ justifyContent:'center' }}>
              <BranchCTA action="book" service="Digital Dentistry & 3D Scanning" className="imp-btn-primary" style={{ background:'linear-gradient(135deg, #9C7C38, #7E6329)', boxShadow:'0 8px 32px rgba(156,124,56,0.4)', padding:'1rem 2.5rem', fontSize:'1rem' }}>
                Book a Consultation <ArrowUpRight size={18}/>
              </BranchCTA>
              <BranchCTA action="call" service="Digital Dentistry & 3D Scanning" className="imp-btn-glass"><Phone size={16}/> Call Now</BranchCTA>
              <BranchCTA action="whatsapp" service="Digital Dentistry & 3D Scanning" className="imp-btn-glass" style={{ color:'#25D366' }}><MessageCircle size={16}/> WhatsApp</BranchCTA>
            </div>
          </FadeIn>
        </div>
      </section>

    </div>
    </>
  );
}
