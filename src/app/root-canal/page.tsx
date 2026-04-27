'use client';

import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useInView, AnimatePresence, Variants } from 'framer-motion';
import {
  ArrowUpRight, Phone, ShieldCheck, Award, CheckCircle2,
  Sparkles, Clock, Stethoscope, Zap, Heart,
  ScanLine, MessageCircle, ChevronRight, ChevronDown,
  Activity, Target, Globe, User, Microscope, Layers,
  Play, Pause, Volume2, VolumeX, Maximize
} from 'lucide-react';
import '../implants/implants.css';
import './root-canal.css';

import heroImg from '@/assets/implants/implant-hero.jpg';
import contentImg from '@/assets/specialties/microscope-loupes.png';

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
  { val: '1 Visit', label: 'Complete Treatment' },
  { val: '99%', label: 'Pain-Free Rate' },
  { val: '12+', label: 'Years Expertise' },
  { val: '6 Tech', label: 'Advanced Systems' },
];

/* ── Portrait Video Player — Autoplay ── */
function RCVideo() {
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
    <div className="rc-video-wrapper">
      <video ref={videoRef} className="rc-video" loop muted={muted} playsInline autoPlay preload="auto">
        <source src="/rootcanal_video.mp4" type="video/mp4" />
      </video>
      <div className="rc-video-controls">
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
  { q: 'Is a root canal painful?', a: 'With modern local anaesthesia and microscope-guided techniques, root canal treatment is virtually painless. Most patients report the procedure feels no different from a routine filling.' },
  { q: 'Can it really be done in one visit?', a: 'Yes — for most cases including vital teeth and early-stage infections, single-visit root canal is entirely safe and clinically superior. Only complex cases or active abscesses may require two visits.' },
  { q: 'How do I know if I need a root canal?', a: 'Common signs include severe toothache, prolonged sensitivity to hot/cold, darkening of the tooth, and swelling. However, some infected teeth cause no pain — regular check-ups matter.' },
  { q: 'Will I need a crown after treatment?', a: 'In most cases, yes. A root-canal-treated tooth becomes more brittle. A crown restores full strength, protects from fracture, and can last a lifetime with proper care.' },
  { q: 'How long does a treated tooth last?', a: 'With a well-placed crown and proper oral hygiene, a root-canal-treated tooth can function for decades — even a lifetime. Our success rates are consistently above 95%.' },
  { q: 'Is it suitable for international patients?', a: 'Absolutely. Our single-visit protocol is purpose-built for medical tourism. Complete treatment in one appointment with digital follow-up support.' },
];

export default function RootCanalPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div>

      {/* ═══════════════ HERO ═══════════════ */}
      <section className="imp-hero rc-hero">
        <div className="imp-hero-bg">
          <Image src={heroImg} alt="Root Canal Treatment at RH Dental Care" fill priority quality={90} />
        </div>
        <div className="imp-hero-overlay rc-overlay" />
        <div className="imp-hero-content">
          <motion.div initial={{ opacity: 0, y: -14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Link href="/" className="rc-breadcrumb">Home <ChevronRight size={12} /> <span>Specialties</span> <ChevronRight size={12} /> <span className="rc-breadcrumb-active">Root Canal</span></Link>
          </motion.div>
          <motion.div className="imp-badge rc-badge" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.1 }}>
            <Sparkles size={14} /> Precision Endodontics
          </motion.div>
          <motion.h1 className="imp-hero-title" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}>
            Root Canal <span>Treatment</span>
          </motion.h1>
          <motion.p className="imp-hero-subtitle" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}>
            Single-visit, microscope-guided, virtually painless. Modern endodontics that saves your natural tooth — completed in one precise appointment.
          </motion.p>
          <motion.div className="rc-hero-stats" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.55 }}>
            {heroStats.map((s, i) => (
              <div key={i} className="rc-stat-pill">
                <span className="rc-stat-val">{s.val}</span>
                <span className="rc-stat-label">{s.label}</span>
              </div>
            ))}
          </motion.div>
          <motion.div className="imp-hero-cta-row" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.7 }}>
            <Link href="/contact" className="imp-btn-primary">Book Consultation <ArrowUpRight size={18} /></Link>
            <a href="tel:+8801775227902" className="imp-btn-glass"><Phone size={16} /> Call Now</a>
            <a href="https://wa.me/8801775227902" target="_blank" rel="noopener noreferrer" className="imp-btn-glass" style={{ color: '#25D366' }}><MessageCircle size={16} /> WhatsApp</a>
          </motion.div>
        </div>
        <div className="imp-scroll-indicator"><span>Scroll</span><div className="imp-scroll-line" /></div>
      </section>

      {/* ═══════════════ TRUST STRIP ═══════════════ */}
      <section className="rc-trust-strip">
        <div className="container">
          <div className="rc-trust-inner">
            {[
              { icon: <ShieldCheck size={20} />, text: 'Painless Under Local Anaesthesia' },
              { icon: <Clock size={20} />, text: 'Single Visit — Full Treatment' },
              { icon: <Microscope size={20} />, text: 'Microscope-Guided Precision' },
              { icon: <Globe size={20} />, text: 'Optimised for International Patients' },
            ].map((t, i) => (
              <FadeIn key={i} delay={i * 0.06}>
                <div className="rc-trust-item">
                  <div className="rc-trust-icon">{t.icon}</div>
                  <span>{t.text}</span>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ LOCAL vs INTERNATIONAL ═══════════════ */}
      <section className="imp-section imp-section-white">
        <div className="container">
          <FadeIn>
            <div className="imp-section-header">
              <span className="imp-label"><Heart size={14} /> Tailored for Everyone</span>
              <h2 className="imp-title">Care Designed <span className="imp-accent">for You</span></h2>
              <p className="imp-subtitle">Whether you are a local patient or traveling from abroad — our single-visit protocol delivers world-class results within your timeline.</p>
            </div>
          </FadeIn>
          <div className="rc-patient-grid">
            <FadeIn delay={0.1}>
              <div className="rc-patient-card rc-local-card">
                <div className="rc-patient-header">
                  <div className="rc-patient-icon rc-local-icon"><User size={28} /></div>
                  <div>
                    <div className="rc-patient-tag rc-local-tag">Local Patients</div>
                    <h3 className="rc-patient-title">Fast, Comfortable &amp; Reliable Care</h3>
                  </div>
                </div>
                <p className="rc-patient-desc">We understand the demands of a busy lifestyle. Our single visit root canal ensures you receive efficient, pain-relieving treatment in a single sitting—so you can return to your routine without delay.</p>
                <div className="rc-patient-benefits">
                  {['One visit solution', 'Immediate relief from pain and infection', 'Fewer injections and reduced chair time', 'Safe, predictable, and modern technique'].map((b, i) => (
                    <div key={i} className="rc-patient-benefit"><CheckCircle2 size={15} /> <span>{b}</span></div>
                  ))}
                </div>
                <Link href="/contact" className="rc-patient-cta rc-local-cta">Book Appointment <ArrowUpRight size={16} /></Link>
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="rc-patient-card rc-intl-card">
                <div className="rc-patient-header">
                  <div className="rc-patient-icon rc-intl-icon"><Globe size={28} /></div>
                  <div>
                    <div className="rc-patient-tag rc-intl-tag">International Patients</div>
                    <h3 className="rc-patient-title">World-Class Dentistry, Optimized for Your Time</h3>
                  </div>
                </div>
                <p className="rc-patient-desc">For patients traveling abroad, every day matters. Our single visit protocol is designed to deliver premium-quality treatment within a limited stay, without compromising clinical excellence.</p>
                <div className="rc-patient-benefits">
                  {['Complete treatment in one appointment', 'International standard sterilization and protocols', 'Advanced digital and minimally invasive techniques', 'Exceptional value compared to global treatment costs'].map((b, i) => (
                    <div key={i} className="rc-patient-benefit rc-intl-benefit"><CheckCircle2 size={15} /> <span>{b}</span></div>
                  ))}
                </div>
                <Link href="/contact" className="rc-patient-cta rc-intl-cta">Plan Your Visit <ArrowUpRight size={16} /></Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══════════════ TECHNOLOGY — 3 CATEGORIES ═══════════════ */}
      <section className="imp-section rc-tech-section">
        <div className="container">
          <FadeIn>
            <div className="imp-section-header">
              <span className="imp-label"><Zap size={14} /> Technology-Driven Endodontics</span>
              <h2 className="imp-title">Precision at <span className="imp-accent">Every Level</span></h2>
              <p className="imp-subtitle">Technology is not an addition — it is the foundation. Every root canal is performed using a comprehensive digital and microscopic workflow.</p>
            </div>
          </FadeIn>

          {/* Diagnostics */}
          <FadeIn>
            <div className="rc-tech-category">
              <div className="rc-tech-cat-label"><ScanLine size={16} /> Advanced Diagnostic &amp; Imaging</div>
            </div>
          </FadeIn>
          <motion.div className="rc-tech-grid rc-tech-grid-2" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }}>
            <motion.div className="rc-tech-card" variants={fadeUp} style={{ '--card-color': '#0ea5e9', '--card-bg': '#e0f2fe' } as React.CSSProperties}>
              <div className="rc-tech-icon" style={{ background: '#e0f2fe', color: '#0ea5e9' }}><ScanLine size={26} /></div>
              <div className="rc-tech-title">CBCT (3D Imaging)</div>
              <p className="rc-tech-desc">Detailed three-dimensional view of tooth anatomy, infections, and surrounding bone — ensuring accurate diagnosis and precise treatment planning.</p>
              <div className="rc-tech-line" style={{ background: '#0ea5e9' }} />
            </motion.div>
            <motion.div className="rc-tech-card" variants={fadeUp} style={{ '--card-color': '#6366f1', '--card-bg': '#ede9fe' } as React.CSSProperties}>
              <div className="rc-tech-icon" style={{ background: '#ede9fe', color: '#6366f1' }}><Activity size={26} /></div>
              <div className="rc-tech-title">RVG (Digital X-Ray)</div>
              <p className="rc-tech-desc">Instant, high-resolution imaging with minimal radiation exposure, allowing real-time evaluation and monitoring throughout the procedure.</p>
              <div className="rc-tech-line" style={{ background: '#6366f1' }} />
            </motion.div>
          </motion.div>

          {/* Clinical Precision */}
          <FadeIn>
            <div className="rc-tech-category" style={{ marginTop: '3rem' }}>
              <div className="rc-tech-cat-label"><Target size={16} /> Enhanced Clinical Precision</div>
            </div>
          </FadeIn>
          <motion.div className="rc-tech-grid rc-tech-grid-2" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }}>
            <motion.div className="rc-tech-card" variants={fadeUp} style={{ '--card-color': '#f59e0b', '--card-bg': '#fef3c7' } as React.CSSProperties}>
              <div className="rc-tech-icon" style={{ background: '#fef3c7', color: '#f59e0b' }}><Microscope size={26} /></div>
              <div className="rc-tech-title">Dental Operating Microscope</div>
              <p className="rc-tech-desc">High magnification and illumination enable detection of complex or hidden canals, cracks, and anatomical variations — significantly improving treatment accuracy.</p>
              <div className="rc-tech-line" style={{ background: '#f59e0b' }} />
            </motion.div>
            <motion.div className="rc-tech-card" variants={fadeUp} style={{ '--card-color': '#10b981', '--card-bg': '#d1fae5' } as React.CSSProperties}>
              <div className="rc-tech-icon" style={{ background: '#d1fae5', color: '#10b981' }}><Target size={26} /></div>
              <div className="rc-tech-title">Apex Locator</div>
              <p className="rc-tech-desc">Electronic working length measurement ensures precise canal preparation and reduces the risk of procedural errors.</p>
              <div className="rc-tech-line" style={{ background: '#10b981' }} />
            </motion.div>
          </motion.div>

          {/* Modern Systems */}
          <FadeIn>
            <div className="rc-tech-category" style={{ marginTop: '3rem' }}>
              <div className="rc-tech-cat-label"><Zap size={16} /> Modern Endodontic Systems</div>
            </div>
          </FadeIn>
          <motion.div className="rc-tech-grid rc-tech-grid-2" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }}>
            <motion.div className="rc-tech-card" variants={fadeUp} style={{ '--card-color': '#ef4444', '--card-bg': '#fee2e2' } as React.CSSProperties}>
              <div className="rc-tech-icon" style={{ background: '#fee2e2', color: '#ef4444' }}><Zap size={26} /></div>
              <div className="rc-tech-title">Rotary Endodontics</div>
              <p className="rc-tech-desc">Advanced flexible instruments allow efficient, smooth, and minimally invasive canal shaping.</p>
              <div className="rc-tech-line" style={{ background: '#ef4444' }} />
            </motion.div>
            <motion.div className="rc-tech-card" variants={fadeUp} style={{ '--card-color': '#8b5cf6', '--card-bg': '#ede9fe' } as React.CSSProperties}>
              <div className="rc-tech-icon" style={{ background: '#ede9fe', color: '#8b5cf6' }}><Layers size={26} /></div>
              <div className="rc-tech-title">Advanced Irrigation &amp; Disinfection</div>
              <p className="rc-tech-desc">Enhanced protocols ensure deep cleaning of even the most complex canal systems, eliminating bacteria effectively.</p>
              <div className="rc-tech-line" style={{ background: '#8b5cf6' }} />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════ VIDEO — PORTRAIT ═══════════════ */}
      <section className="rc-video-section">
        <div className="rc-vid-orb rc-vid-orb-1" />
        <div className="rc-vid-orb rc-vid-orb-2" />
        <div className="container">
          <FadeIn>
            <div className="imp-section-header" style={{ color: '#fff' }}>
              <span className="imp-label" style={{ background: 'rgba(16,185,129,0.15)', borderColor: 'rgba(16,185,129,0.3)', color: '#6ee7b7' }}><Play size={14} /> Watch the Procedure</span>
              <h2 className="imp-title" style={{ color: '#f1f5f9' }}>See Precision <span style={{ background: 'linear-gradient(135deg, #6ee7b7, #34d399)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>in Action</span></h2>
              <p className="imp-subtitle" style={{ color: 'rgba(203,213,225,0.8)' }}>Watch a real single-visit root canal treatment performed at RH Dental Care with microscope guidance and digital workflow.</p>
            </div>
          </FadeIn>
          <FadeIn delay={0.15}>
            <RCVideo />
          </FadeIn>
          <FadeIn delay={0.25}>
            <div className="imp-video-badges">
              {[
                { icon: <Microscope size={16} />, text: 'Microscope-Guided' },
                { icon: <ShieldCheck size={16} />, text: 'Single Visit Protocol' },
                { icon: <Zap size={16} />, text: 'Rotary Endodontics' },
              ].map((b, i) => (
                <div key={i} className="imp-video-badge-item" style={{ borderColor: 'rgba(16,185,129,0.15)' }}>
                  <span style={{ color: '#6ee7b7' }}>{b.icon}</span> <span>{b.text}</span>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════ RESTORATION + CANDIDATE ═══════════════ */}
      <section className="imp-section imp-section-white">
        <div className="container">
          <div className="imp-what-grid">
            <FadeIn>
              <div className="imp-what-img">
                <Image src={contentImg} alt="Root canal restoration" fill sizes="(max-width:1024px) 100vw, 50vw" />
                <div className="rc-img-badge"><Microscope size={14} /> Microscope-Guided</div>
              </div>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div className="imp-what-content">
                <span className="imp-label"><ShieldCheck size={14} /> Long-Term Success</span>
                <h2>Save Your Natural <span style={{ color: '#059669' }}>Tooth for Life</span></h2>
                <p>Following root canal treatment, a dental crown is strongly recommended to restore structural integrity and function. With proper care, a treated tooth can last many years — even a lifetime.</p>
                <div className="imp-anatomy-list">
                  {[
                    { icon: <Layers size={18} />, title: 'Biocompatible Filling', desc: 'Ensures a durable, hermetic seal to prevent reinfection permanently.', bg: 'linear-gradient(135deg, #0ea5e9, #0284c7)' },
                    { icon: <Award size={18} />, title: 'Post-Endodontic Crown', desc: 'Restores strength, function, and long-term durability of the treated tooth.', bg: 'linear-gradient(135deg, #6366f1, #4f46e5)' },
                    { icon: <Activity size={18} />, title: 'Digital Follow-Up', desc: 'Remote monitoring ensures smooth healing — especially for international patients.', bg: 'linear-gradient(135deg, #10b981, #059669)' },
                  ].map((item, i) => (
                    <motion.div key={i} className="imp-anatomy-item" initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                      <div className="imp-anatomy-icon" style={{ background: item.bg }}>{item.icon}</div>
                      <div>
                        <div className="imp-anatomy-title">{item.title}</div>
                        <p className="imp-anatomy-desc">{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
                <div className="rc-candidate-box">
                  <div className="rc-candidate-title"><Target size={16} /> Is Single Visit Right for You?</div>
                  <p className="rc-candidate-desc">Ideal for vital teeth, early-stage infections, and patients without severe swelling or active abscess. For more complex conditions, a multi-visit approach may be recommended for optimal healing.</p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══════════════ TECHNOLOGY FLYER ═══════════════ */}
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
              border: '2px solid rgba(16,185,129,0.1)'
            }}>
              <Image 
                src={require('@/assets/specialties/root-canal-flyer.jpg').default} 
                alt="Precision Root Canal Technology" 
                fill 
                style={{ objectFit: 'contain', background: '#fff' }} 
              />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════ FAQ ═══════════════ */}
      <section className="imp-section imp-section-light">
        <div className="container">
          <FadeIn>
            <div className="imp-section-header">
              <span className="imp-label"><Stethoscope size={14} /> Common Questions</span>
              <h2 className="imp-title">Root Canal <span className="imp-accent">FAQs</span></h2>
            </div>
          </FadeIn>
          <div className="ortho-faq-list" style={{ maxWidth: 800, margin: '0 auto' }}>
            {faqs.map((faq, i) => (
              <FadeIn key={i} delay={i * 0.04}>
                <div className={`ortho-faq-item rc-faq-item ${openFaq === i ? 'open' : ''}`}>
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
        <div className="imp-cta-orb" />
        <div className="imp-cta-orb" style={{ top: 'auto', bottom: -120, left: -80, right: 'auto', background: 'radial-gradient(circle, rgba(16,185,129,0.1), transparent 70%)' }} />
        <div className="container">
          <FadeIn>
            <div className="imp-cta-inner">
              <div className="imp-badge" style={{ margin: '0 auto 1.5rem', background: 'rgba(16,185,129,0.15)', borderColor: 'rgba(16,185,129,0.3)', color: '#6ee7b7' }}>
                <Sparkles size={14} /> Experience the Future of Dentistry
              </div>
              <h2 className="imp-cta-title">
                Faster Treatment. Greater Precision.{' '}
                <span style={{ background: 'linear-gradient(135deg, #6ee7b7, #34d399)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Exceptional Results.</span>
              </h2>
              <p className="imp-cta-sub">At RH Dental Care, we combine advanced technology, clinical precision, and patient-focused care to deliver dentistry that meets international standards.</p>
              <div className="imp-cta-btns">
                <Link href="/contact" className="imp-btn-primary" style={{ background: 'linear-gradient(135deg, #10b981, #059669)' }}>Book Your Appointment <ArrowUpRight size={18} /></Link>
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
