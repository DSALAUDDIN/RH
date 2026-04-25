'use client';

import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import Image, { StaticImageData } from 'next/image';
import { motion, useInView, AnimatePresence, Variants } from 'framer-motion';
import {
  ArrowUpRight, Phone, ShieldCheck, Award, Heart,
  Microscope, Users, CheckCircle2, ChevronRight, Sparkles,
  CalendarCheck, Stethoscope, BadgeCheck, Smile, Activity,
  Zap, Eye, Layers, HeartPulse, Building2, FlaskConical,
  ScanLine, MonitorDot, Wifi, User, Brain, GraduationCap, X, Play, MessageCircle,
} from 'lucide-react';
import './About.css';
import heroBg from '../../assets/Hero/DoctorsCouple.png';

import Testimonials from '@/components/Testimonials';
import EvolutionTimeline from '@/components/EvolutionTimeline';
import FamilyTrustSection from '@/components/FamilyTrustSection';

import imgMehedi from '../../assets/Doctor_List/Mehedi.jpeg';
import imgMehediClean from '../../assets/doctors/mehedi_clean.jpeg';
import imgShimia from '../../assets/Doctor_List/shimia_flyer.jpeg';
import imgShimiaClean from '../../assets/doctors/shimia_clean.jpeg';
import imgAfzal from '../../assets/Doctor_List/Afzal.jpeg';
import imgTamima from '../../assets/Doctor_List/Tamima.jpeg';
import imgTamanna from '../../assets/Doctor_List/Tamanna.jpeg';
import imgHreedy from '../../assets/Doctor_List/Hreedy.jpeg';
import imgNabil from '../../assets/Doctor_List/Nabil.jpeg';
import imgUmaya from '../../assets/Doctor_List/Umaya.jpeg';
import imgPanna from '../../assets/Doctor_List/Panna.jpeg';
import imgBarsha from '../../assets/Doctor_List/Barsha.jpeg';
import imgFariha from '../../assets/Doctor_List/Fariha.jpeg';

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

/* ══ REAL DATA ══ */
const heroStats = [
  { val: 13, suf: 'k+', label: 'Happy Smiles' },
  { val: 12, suf: '+', label: 'Years Exp.' },
  { val: 99, suf: '%', label: 'Success Rate' },
  { val: 3500, suf: 'sqft', label: 'Clinic Area' },
];

const specialties = [
  { icon: <Eye size={22} />, name: '3D Imaging', slug: '3d-imaging' },
  { icon: <Activity size={22} />, name: 'Orthodontics', slug: 'braces' },
  { icon: <Layers size={22} />, name: 'Zirconia', slug: 'zirconia' },
  { icon: <Stethoscope size={22} />, name: 'Implants', slug: 'implants' },
  { icon: <HeartPulse size={22} />, name: 'Root Canal', slug: 'root-canal' },
  { icon: <Heart size={22} />, name: 'Gum Care', slug: 'gum-care' },
  { icon: <Smile size={22} />, name: 'Kids Dental', slug: 'kids-care' },
  { icon: <Sparkles size={22} />, name: 'Aesthetics', slug: 'aesthetics' },
];

/* Real services from About text */
const services = [
  {
    icon: <ShieldCheck size={22} />,
    title: 'Preventive & General Dentistry',
    items: ['Routine check-ups and cleaning', 'Fillings and cavity treatment', 'Gum care and periodontal treatment'],
  },
  {
    icon: <Sparkles size={22} />,
    title: 'Cosmetic & Smile Designing',
    items: ['Digital smile analysis and design', 'Veneers (Porcelain, Zirconia, Composite)', 'Teeth whitening and aesthetic restorations'],
  },
  {
    icon: <Activity size={22} />,
    title: 'Orthodontics',
    items: ['Traditional braces', 'Clear aligners for adults and teens', 'Bite and alignment correction'],
  },
  {
    icon: <HeartPulse size={22} />,
    title: 'Root Canal & Endodontic Care',
    items: ['Single-visit root canal treatment', 'Advanced microscopic & digital techniques', 'Pain-free, precise procedures'],
  },
  {
    icon: <Stethoscope size={22} />,
    title: 'Dental Implants & Rehabilitation',
    items: ['Single & multiple dental implants', 'Full mouth rehabilitation with digital planning', '7-day surgery & prosthesis option', 'Custom abutments for perfect aesthetics'],
  },
  {
    icon: <Layers size={22} />,
    title: 'Prosthetics, Crowns & Specialized Care',
    items: ['Zirconia and metal-free crowns', '3D-scanned impressions for precise fit', 'GA OT setup for surgical procedures', 'Special care for children & special needs patients'],
  },
];

/* Real facilities */
const facilities = [
  { icon: <Building2 size={22} />, title: 'Multiple Operating Rooms', desc: 'Modern OT setup including a fully equipped General Anesthesia (GA) operating theatre for safe surgical procedures.' },
  { icon: <ScanLine size={22} />, title: 'State-of-the-Art Technology', desc: '3D scanners, intraoral cameras, endo microscopes, and full digital imaging for accurate diagnosis and treatment.' },
  { icon: <FlaskConical size={22} />, title: 'In-House Dental Laboratory', desc: 'On-site lab gives complete control over prosthesis design — faster turnaround, superior aesthetics and precision fit.' },
  { icon: <Wifi size={22} />, title: 'Two Spacious Waiting Areas', desc: 'Two comfortable waiting areas with WiFi, refreshments, and a calm, patient-friendly environment.' },
  { icon: <MonitorDot size={22} />, title: 'Digital Workflow', desc: 'End-to-end digital treatment planning from diagnosis to final restoration, ensuring accuracy and predictable outcomes.' },
  { icon: <ShieldCheck size={22} />, title: 'Hospital-Grade Sterilization', desc: 'Strict hygiene and sterilization protocols maintained across the entire 3,500 sq.ft facility at all times.' },
];

/* Why choose us */
const whyCards = [
  { icon: <Users size={22} />, title: 'Expert Multi-Specialty Team', desc: 'Specialists in all dental disciplines — from implantology and orthodontics to cosmetic design and pediatric care.' },
  { icon: <Brain size={22} />, title: 'Advanced Technology & Digital Workflow', desc: '3D scanners, digital imaging, and in-house lab for accurate diagnosis and seamless treatment execution.' },
  { icon: <User size={22} />, title: 'Customised Patient-Centered Care', desc: 'Every treatment plan is tailored to each patient\'s unique anatomy, aesthetic goals, and oral health needs.' },
  { icon: <Smile size={22} />, title: 'Special Care for Children & SEN', desc: 'Dedicated child-friendly approach and GA OT setup for patients who need extra comfort and care.' },
  { icon: <Zap size={22} />, title: 'Pain-Free Guarantee', desc: 'Latest anesthetic and sedation techniques ensure every procedure is comfortable — we guarantee it.' },
  { icon: <CalendarCheck size={22} />, title: 'Proven Complex Case Success', desc: 'Numerous full mouth rehabilitations and smile makeovers completed with outstanding, long-lasting results.' },
];

const process = [
  { n: '01', title: 'Free Consultation', desc: 'Thorough digital examination and 3D scan to fully understand your dental health.' },
  { n: '02', title: 'Tailored Plan', desc: 'Transparent treatment plan with zero hidden costs and a digital preview of results.' },
  { n: '03', title: 'Expert Treatment', desc: 'BMDC-certified specialists using cutting-edge technology for precise outcomes.' },
  { n: '04', title: 'Aftercare', desc: 'Continuous follow-up and personalised guidance to protect your investment long-term.' },
];

/* Team photos — doctors with images and roles extracted from real flyers */
const teamMembers = [
  { name: 'Dr. B. M. Rafiqul Hasan Mehedi', role: 'Chief Consultant & Surgeon', badge: 'Oral Surgery', img: imgMehedi, cleanImg: imgMehediClean, isFlyer: true },
  { name: 'Dr. Shimia Binte Taher', role: 'Microscopic Endodontics & Aesthetics', badge: 'Team Lead', img: imgShimia, cleanImg: imgShimiaClean, isFlyer: true },
  { name: 'Dr. Afzal Chowdhury', role: 'Oral & Dental Surgeon', badge: 'Oral Surgery', img: imgAfzal, isFlyer: true },
  { name: 'Dr. Mahaesa Tamima', role: 'Senior Oral & Dental Surgeon', badge: 'Endodontics', img: imgTamima, isFlyer: true },
  { name: 'Dr. Asma Binte Faiz Tamanna', role: 'Oral & Dental Surgeon', badge: 'Dental Surgeon', img: imgTamanna, isFlyer: true },
  { name: 'Dr. Monisha Haque Hreedy', role: 'Oral & Dental Surgeon', badge: 'Dental Surgeon', img: imgHreedy, isFlyer: true },
  { name: 'Dr. Nabil', role: 'Oral & Dental Surgeon', badge: 'Dental Surgeon', img: imgNabil, isFlyer: true },
  { name: 'Dr. Umaya Khanam', role: 'Oral & Dental Surgeon', badge: 'Dental Surgeon', img: imgUmaya, isFlyer: true },
  { name: 'Dr. Mansura Panna', role: 'Senior Oral & Dental Surgeon', badge: 'OMFS', img: imgPanna, isFlyer: true },
  { name: 'Dr. Jeamima Tabassum Barsha', role: 'Oral & Dental Surgeon', badge: 'Aligner & Orthodontics', img: imgBarsha, isFlyer: true },
  { name: 'Dr. Fariha Ferdous', role: 'Oral & Dental Surgeon', badge: 'Dental Surgeon', img: imgFariha, isFlyer: true },
];

/* ══ CLINIC VIDEO TOUR BANNER ══ */
function VideoTourBanner({ onOpen }: { onOpen: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { amount: 0.25 });

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (isInView) {
      v.play().catch(() => { });
    } else {
      v.pause();
    }
  }, [isInView]);

  return (
    <motion.div
      ref={sectionRef}
      initial="rest"
      whileHover="hover"
      className="ab-video-tour-banner"
      style={{ position: 'relative', width: '100%', aspectRatio: '21/9', overflow: 'hidden', cursor: 'pointer', minHeight: '220px', maxHeight: '460px' }}
      onClick={onOpen}
    >
      {/* Auto-playing muted background video */}
      <video
        ref={videoRef}
        src="https://res.cloudinary.com/dlaqtwoa3/video/upload/v1776535718/homeScreen_tai4jm.mp4"
        muted
        loop
        playsInline
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          objectFit: 'cover', objectPosition: 'center',
        }}
      />

      {/* Cinematic dark overlay + copy */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to right, rgba(15,23,42,0.85) 0%, rgba(15,23,42,0.55) 50%, rgba(15,23,42,0.85) 100%)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '1.5rem clamp(1rem, 5vw, 3rem)',
      }}>
        <div style={{ maxWidth: '560px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <motion.div
            variants={{
              rest: { scale: 1, boxShadow: '0 0 0 0 rgba(14,165,233,0)' },
              hover: { scale: 1.1, boxShadow: '0 0 0 14px rgba(255,255,255,0.05)' }
            }}
            style={{
              width: 'clamp(52px, 10vw, 80px)', height: 'clamp(52px, 10vw, 80px)', borderRadius: '50%',
              background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.4)',
              backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginBottom: 'clamp(1rem, 2vw, 1.75rem)', color: '#fff',
            }}
          >
            <Play size={24} fill="currentColor" style={{ marginLeft: '3px' }} />
          </motion.div>
          <div className="ab-label" style={{ marginBottom: 'clamp(0.75rem, 1.5vw, 1.25rem)', background: 'rgba(255,255,255,0.1)', color: '#fff', borderColor: 'rgba(255,255,255,0.2)' }}>
            <Building2 size={14} /> Full Clinic Virtual Tour
          </div>
          <h2 style={{ fontSize: 'clamp(1.4rem, 3.5vw, 3rem)', fontWeight: 900, color: '#fff', letterSpacing: '-0.04em', lineHeight: 1.1, marginBottom: 'clamp(0.75rem, 1.5vw, 1.25rem)' }}>
            Take a Tour of{' '}
            <span style={{ background: 'linear-gradient(90deg, #38bdf8, #818cf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Our Facility
            </span>
          </h2>
          <p style={{ fontSize: 'clamp(0.82rem, 1.2vw, 1.05rem)', color: '#cbd5e1', lineHeight: 1.65, marginBottom: 0 }}>
            Experience our 3,500 sq.ft premium clinic from the comfort of your home. Explore our modern OT setups, digital technology, and inviting reception area.
          </p>
        </div>
      </div>
    </motion.div>
  );
}

/* ══ PAGE ══ */
export default function AboutPage() {
  const [selectedImage, setSelectedImage] = useState<string | StaticImageData | null>(null);
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <div>

      {/* ═══════════════════════ HERO ═══════════════════════ */}
      <section className="ab-hero">
        <div className="ab-hero-bg">
          <Image src={heroBg} alt="RH Dental Care clinic" fill priority quality={90} />
        </div>
        <div className="ab-mesh-1" />
        <div className="ab-hero-overlay" />
        <div className="ab-hero-noise" />

        <div className="container ab-hero-inner">
          <motion.div className="ab-breadcrumb"
            initial={{ opacity: 0, y: -14 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}>
            <Link href="/">Home</Link>
            <ChevronRight size={12} className="ab-breadcrumb-sep" />
            <span className="ab-breadcrumb-current">About Us</span>
          </motion.div>

          <motion.div className="ab-hero-kicker"
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}>
            <span className="ab-kicker-dot" />
            RH Dental Care · Dhaka, Bangladesh
          </motion.div>

          <motion.h1 className="ab-hero-title"
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}>
            Meet Our{' '}
            <span className="ab-shine">Experts.</span>
          </motion.h1>

          <motion.p className="ab-hero-tagline"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}>
            Your Smile is Our Happiness
          </motion.p>

          <motion.p className="ab-hero-subtitle"
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}>
            At RH Dental Care, two exceptional doctors lead a team dedicated to transforming smiles and enhancing oral health — with world-class dental care, advanced technology, and a patient-first approach for patients of all ages, including children and patients with special needs.
          </motion.p>

          <motion.div className="ab-hero-cta-row"
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.62 }}>
            <Link href="/contact" className="ab-btn-primary">
              Book Free Consultation <ArrowUpRight size={18} />
            </Link>
            <a href="tel:+8801775227902" className="ab-btn-glass">
              <Phone size={16} /> Call Us Now
            </a>
            <a href="https://wa.me/8801775227902" target="_blank" rel="noopener noreferrer" className="ab-btn-glass" style={{ color: '#25D366' }}>
              <MessageCircle size={16} /> WhatsApp
            </a>
            <span className="ab-trust-pill">
              <CheckCircle2 size={14} /> BMDC 5169 &amp; 8496
            </span>
          </motion.div>

          <motion.div className="ab-hero-stats"
            initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1, delay: 0.75 }}>
            {heroStats.map((s, i) => (
              <div key={i} className="ab-stat-item">
                <span className="ab-stat-val"><Counter to={s.val} suffix={s.suf} /></span>
                <span className="ab-stat-label">{s.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════ DR. HASAN — light ═══════════════════════ */}
      <section className="ab-section ab-section-dark">
        <div className="container">
          <div className="ab-doc-grid">

            {/* Photo */}
            <FadeIn>
              <div className="ab-doc-visual">
                <div className="ab-doc-ring" />
                <div className="ab-doc-img-frame">
                  <Image src={imgMehediClean} alt="Dr. B. M. Rafiqul Hasan Mehedi"
                    fill sizes="(max-width:768px) 100vw, 50vw"
                    style={{ objectFit: 'cover', objectPosition: 'top center' }} />
                  <div className="ab-doc-img-glow" />
                  <div className="ab-doc-info-card">
                    <div className="ab-doc-name">Dr. B. M. Rafiqul Hasan Mehedi</div>
                    <div className="ab-doc-role">Chief Consultant Oral &amp; Dental Surgeon</div>
                    <div className="ab-doc-creds-row">
                      <span className="ab-cred-chip">BDS — Sapporo Dental College</span>
                      <span className="ab-cred-chip">MPH — City University</span>
                      <span className="ab-cred-chip">BMDC 5169</span>
                      <span className="ab-verified-pill"><CheckCircle2 size={10} /> Verified</span>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Bio */}
            <FadeIn delay={0.15}>
              <div className="ab-doc-content">
                <span className="ab-label"><Award size={14} /> Chief Consultant &amp; Founder</span>
                <h2 className="ab-section-title-dark">
                  Dr. B. M. Rafiqul Hasan Mehedi
                </h2>
                <p className="ab-body-dark">
                  A distinguished Oral &amp; Dental Surgeon known for his precision, advanced clinical expertise, and commitment to excellence in modern dentistry. With a strong academic background and extensive international training, he has established himself as a trusted name in <strong style={{ color: '#0f172a' }}>advanced dental implant surgery</strong> and <strong style={{ color: '#0f172a' }}>full mouth rehabilitation</strong>.
                </p>
                <p className="ab-body-dark">
                  Dr. Hasan has undergone advanced international training in Dental Implantology from <strong style={{ color: '#0f172a' }}>China, Korea, and India</strong>, equipping him with skills to manage complex implant cases with predictable, long-term success. He also completed specialised training in <strong style={{ color: '#0f172a' }}>Minimally Invasive Cosmetic Dentistry (MICD)</strong> in Nepal, Basic Orthodontics, and Advanced Implant Procedures &amp; Digital Workflow.
                </p>
                <p className="ab-body-dark">
                  His practice is supported by a fully equipped <strong style={{ color: '#0f172a' }}>in-house dental laboratory</strong>, allowing complete control over prosthesis design, precision, and quality — ensuring enhanced accuracy, faster turnaround, and superior aesthetic outcomes. Since 2015, he also serves as <strong style={{ color: '#0f172a' }}>Senior Lecturer at MH Samorita Medical College &amp; Hospital</strong>.
                </p>

                <div className="ab-doc-values">
                  {[
                    { icon: <GraduationCap size={16} />, title: 'BDS · MPH · PGT (OMS & Prosthodontics)', desc: 'Sapporo Dental College (DU) • City University • BSM Medical University, Dhaka' },
                    { icon: <ScanLine size={16} />, title: 'Digital & 3D Guided Implantology', desc: 'Pioneer in digital treatment planning and 3D-guided implant surgery for predictable, long-term outcomes.' },
                    { icon: <FlaskConical size={16} />, title: 'In-House Lab for Precision Prosthesis', desc: 'Complete control over design, quality, and turnaround time for superior aesthetic & functional results.' },
                    { icon: <Microscope size={16} />, title: 'Full Mouth Rehabilitation Expertise', desc: 'Numerous complex rehabilitation cases completed with implants — restoring both function and patient confidence.' },
                    { icon: <Stethoscope size={16} />, title: 'Immediate Implant Placement & Loading', desc: 'Single & multiple dental implants with complex bone management and aesthetic zone expertise.' },
                  ].map((v, i) => (
                    <motion.div key={i} className="ab-doc-value-row"
                      initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }}>
                      <div className="ab-val-icon">{v.icon}</div>
                      <div>
                        <div className="ab-val-title">{v.title}</div>
                        <div className="ab-val-desc">{v.desc}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Specialties strip */}
          <FadeIn delay={0.1}>
            <motion.div className="ab-spec-strip" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
              {specialties.map((s, i) => (
                <Link key={i} href={`/specialties/${s.slug}`} className="ab-spec-item">
                  <div className="ab-spec-icon">{s.icon}</div>
                  <span className="ab-spec-name">{s.name}</span>
                </Link>
              ))}
            </motion.div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════ DR. SHIMIA — mid light, reversed ═══════════════════════ */}
      <section className="ab-section ab-section-mid">
        <div className="container">
          <div className="ab-doc-grid-alt">

            {/* Content left */}
            <FadeIn>
              <div className="ab-doc-content">
                <span className="ab-label ab-shimia-label"><BadgeCheck size={14} /> Senior Doctor &amp; Team Lead · BMDC 8496</span>
                <h2 className="ab-section-title-dark">
                  Dr. Shimia{' '}
                  <span style={{ background: 'linear-gradient(90deg,#9333ea,#818cf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                    Binte Taher
                  </span>
                </h2>
                <p className="ab-body-dark">
                  A highly accomplished dental professional who combines clinical excellence with compassionate, patient-centred care. She completed her <strong style={{ color: '#0f172a' }}>Bachelor of Dental Surgery (BDS) from Pioneer Dental College</strong> — one of the most prestigious dental institutions in Bangladesh — and furthered her expertise through <strong style={{ color: '#0f172a' }}>Postgraduate Training in Oral &amp; Maxillofacial Surgery at Dhaka Medical College</strong>, where she gained extensive experience in managing complex surgical cases with precision and confidence.
                </p>
                <p className="ab-body-dark">
                  At RH Dental Care, Dr. Shimia plays a vital <strong style={{ color: '#0f172a' }}>leadership role</strong>, strongly guiding and managing her team of doctors with professionalism, confidence, and vision. She is especially dedicated to providing <strong style={{ color: '#0f172a' }}>female-oriented dental care</strong>, ensuring a safe, respectful, and comfortable environment tailored to the unique needs of women patients.
                </p>
                <p className="ab-body-dark">
                  Renowned for her gentle approach and friendly demeanour, Dr. Shimia is deeply committed to patient comfort and trust. Her dedication, empathy, and attention to detail ensure that every patient receives personalised, ethical, and high-quality dental care.
                </p>

                <div className="ab-doc-values">
                  {[
                    { icon: <Microscope size={16} />, title: 'Microscopic Endodontics', desc: 'Delivering highly accurate and minimally invasive root canal treatments using advanced endo microscopes.' },
                    { icon: <Sparkles size={16} />, title: 'Aesthetic Dentistry', desc: 'Creating natural, confident, and beautiful smiles with precision composite and ceramic restorations.' },
                    { icon: <Stethoscope size={16} />, title: 'Exodontia — Complex Extractions', desc: 'Recognised expertise in both routine and complex tooth extractions with maximum patient comfort, including surgical procedures.' },
                    { icon: <GraduationCap size={16} />, title: 'Academic Contributor since 2015', desc: 'Senior Lecturer at MH Samorita Medical College & Hospital — contributing to the development and mentorship of future dental professionals.' },
                    { icon: <Heart size={16} />, title: 'Patient-Centred Philosophy', desc: 'Your Comfort. Your Confidence. Your Smile — committed to delivering excellence in every treatment.' },
                  ].map((v, i) => (
                    <motion.div key={i} className="ab-doc-value-row"
                      initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }}>
                      <div className="ab-val-icon" style={{ background: 'rgba(147,51,234,0.1)', color: '#9333ea' }}>{v.icon}</div>
                      <div>
                        <div className="ab-val-title">{v.title}</div>
                        <div className="ab-val-desc">{v.desc}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </FadeIn>

            {/* Photo right */}
            <FadeIn delay={0.15}>
              <div className="ab-doc-visual">
                <div className="ab-doc-ring-alt" />
                <div className="ab-doc-img-frame">
                  <Image src={imgShimiaClean} alt="Dr. Shimia Binte Taher"
                    fill sizes="(max-width:768px) 100vw, 50vw"
                    style={{ objectFit: 'cover', objectPosition: 'top center' }} />
                  <div className="ab-doc-img-glow" />
                  <div className="ab-doc-info-card-alt">
                    <div className="ab-doc-name">Dr. Shimia Binte Taher</div>
                    <div className="ab-doc-role" style={{ color: '#9333ea' }}>BDS · Exodontia · Microscopic Endodontics &amp; Aesthetic Dentistry</div>
                    <div className="ab-doc-creds-row">
                      <span className="ab-cred-chip-alt">BDS — Pioneer Dental College</span>
                      <span className="ab-cred-chip-alt">PGT — OMS · Dhaka Medical College</span>
                      <span className="ab-cred-chip-alt">BMDC 8496</span>
                      <span className="ab-verified-pill" style={{ background: 'rgba(147,51,234,0.1)', border: '1px solid rgba(147,51,234,0.2)', color: '#9333ea' }}>
                        <CheckCircle2 size={10} /> Team Lead
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══════════════════════ TEAM PHOTO SHOWCASE ═══════════════════════ */}
      <section className="ab-section ab-section-white" style={{ position: 'relative', overflow: 'hidden', paddingBottom: '7rem' }}>
        <div className="ab-team-bg-glow" />
        <div className="container" style={{ position: 'relative', zIndex: 3 }}>
          <FadeIn>
            <div className="ab-team-header-premium">
              <motion.span
                className="ab-label ab-label-light"
                whileHover={{ scale: 1.05 }}
              >
                <Users size={14} /> Meet the Specialists
              </motion.span>
              <h2 className="ab-section-title-light">
                A Team of <span className="ab-blue-text">Specialists</span>
              </h2>
              <p className="ab-team-subtitle">
                Every clinician at RH Dental Care holds specialist qualifications and is dedicated to delivering outstanding, patient-centred outcomes. We bring together diverse expertise to provide complete, world-class dental care.
              </p>
            </div>
          </FadeIn>
        </div>

        <div className="ab-team-marquee-container">
          <div className="ab-team-marquee-fade left"></div>
          <div className="ab-team-marquee-fade right"></div>
          <div className="ab-team-marquee">
            <div className="ab-team-track">
              {[...teamMembers, ...teamMembers, ...teamMembers].map((m, i) => (
                <div
                  key={i}
                  className="ab-team-card-premium"
                  onClick={() => m.img && setSelectedImage(m.img)}
                >
                  <div className="ab-team-card-inner">
                    {m.img ? (
                      <Image src={m.img} alt={m.name} fill
                        sizes="(max-width: 768px) 360px, 460px"
                        className={m.isFlyer ? 'flyer-img' : ''}
                        style={{ objectFit: 'cover', objectPosition: 'center' }} />
                    ) : (
                      <div className="ab-team-placeholder">RH</div>
                    )}
                    <div className="ab-team-card-overlay" />

                    {/* Badge */}
                    <div className={`ab-team-badge ${m.badge === 'Team Lead' ? 'lead' : ''}`}>
                      {m.badge === 'Team Lead' && <Sparkles size={10} style={{ marginRight: '4px' }} />}
                      {m.badge}
                    </div>

                    {/* Info Panel */}
                    <div className="ab-team-info-panel">
                      <div className="ab-team-info-bg"></div>
                      <div className="ab-team-info-content">
                        <div className="ab-team-name">{m.name}</div>
                        <div className="ab-team-role">{m.role}</div>
                        <div className="ab-team-action">
                          <span className="ab-team-action-text">View Full Profile Flyer</span>
                          <ArrowUpRight size={14} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════ STATS – white ═══════════════════════ */}
      <section className="ab-section ab-section-white">
        <div className="container">
          <FadeIn>
            <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
              <span className="ab-label ab-label-light"><Sparkles size={12} /> By the Numbers</span>
              <h2 className="ab-section-title-light">Results that <span className="ab-blue-text">Speak for Themselves</span></h2>
            </div>
          </FadeIn>
          <motion.div className="ab-stats-bento" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }}>
            {[
              { val: 13, suf: 'k+', label: 'Happy Patients', icon: <Smile size={22} /> },
              { val: 12, suf: '+', label: 'Years Experience', icon: <Award size={22} /> },
              { val: 99, suf: '%', label: 'Success Rate', icon: <ShieldCheck size={22} /> },
              { val: 3500, suf: 'sqft', label: 'Clinic Facility', icon: <Building2 size={22} /> },
            ].map((s, i) => (
              <motion.div key={i} className="ab-stat-card" variants={fadeUp}>
                <div className="ab-stat-card-icon">{s.icon}</div>
                <div className="ab-stat-card-number"><Counter to={s.val} suffix={s.suf} /></div>
                <div className="ab-stat-card-label">{s.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════ SERVICES – white ═══════════════════════ */}
      <section className="ab-section ab-section-light">
        <div className="container">
          <FadeIn>
            <span className="ab-label ab-label-light"><HeartPulse size={12} /> Our Services</span>
            <h2 className="ab-section-title-light">Comprehensive Care <span className="ab-blue-text">Under One Roof</span></h2>
            <p style={{ fontSize: '1rem', color: '#475569', maxWidth: '560px', lineHeight: 1.75, marginBottom: 0 }}>
              A full spectrum of dental services tailored to meet every patient&apos;s needs — from routine prevention to complex full-mouth rehabilitation.
            </p>
          </FadeIn>

          <motion.div className="ab-services-grid" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }}>
            {services.map((s, i) => (
              <motion.div key={i} className="ab-service-card" variants={fadeUp}>
                <div className="ab-service-icon">{s.icon}</div>
                <div className="ab-service-title">{s.title}</div>
                <ul className="ab-service-list">
                  {s.items.map((item, j) => <li key={j}>{item}</li>)}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════ EVOLUTION TIMELINE ═══════════════════════ */}
      <EvolutionTimeline />

      {/* ═══════════════════════ FAMILY TRUST SECTION ═══════════════════════ */}
      <FamilyTrustSection />

      {/* ═══════════════════════ FACILITIES – dark ═══════════════════════ */}
      <section className="ab-section ab-section-dark">
        <div className="container">
          <FadeIn>
            <span className="ab-label"><Building2 size={14} /> Our Facility</span>
            <h2 className="ab-section-title-dark">
              3,500 sq.ft of <span className="ab-shine-text">Clinical Excellence</span>
            </h2>
            <p className="ab-body-dark" style={{ maxWidth: '560px' }}>
              Our clinic is purpose-designed for comfort, safety, and efficiency — housing everything needed for world-class dental care in one premium space.
            </p>
          </FadeIn>

          <motion.div className="ab-facility-grid" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }}>
            {facilities.map((f, i) => (
              <motion.div key={i} className="ab-facility-cell" variants={fadeUp}>
                <div className="ab-facility-icon">{f.icon}</div>
                <div>
                  <div className="ab-facility-title">{f.title}</div>
                  <div className="ab-facility-desc">{f.desc}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════ WHY CHOOSE US – mid dark ═══════════════════════ */}
      <section className="ab-section ab-section-mid">
        <div className="container">
          <FadeIn>
            <span className="ab-label"><CheckCircle2 size={14} /> Why RH Dental Care</span>
            <h2 className="ab-section-title-dark">The Difference You Can <span className="ab-shine-text">Feel</span></h2>
            <p className="ab-body-dark" style={{ maxWidth: '560px' }}>
              Proven expertise, advanced technology, and a culture of genuine care — that&apos;s why thousands of patients across Dhaka choose us and keep coming back.
            </p>
          </FadeIn>
          <motion.div className="ab-why-grid-dark" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }}>
            {whyCards.map((c, i) => (
              <motion.div key={i} className="ab-why-cell" variants={fadeUp}>
                <span className="ab-why-cell-num">{String(i + 1).padStart(2, '0')}</span>
                <div className="ab-why-icon">{c.icon}</div>
                <h3 className="ab-why-title">{c.title}</h3>
                <p className="ab-why-desc">{c.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════ REVIEWS – imported component ═══════════════════════ */}
      <Testimonials />

      {/* ═══════════════════════ PROCESS – white ═══════════════════════ */}
      <section className="ab-section ab-section-white">
        <div className="container">
          <FadeIn>
            <div style={{ textAlign: 'center' }}>
              <span className="ab-label ab-label-light"><CalendarCheck size={12} /> How It Works</span>
              <h2 className="ab-section-title-light">Your Journey to a <span className="ab-blue-text">Perfect Smile</span></h2>
              <p style={{ fontSize: '1rem', color: '#475569', maxWidth: '500px', margin: '0 auto', lineHeight: 1.75 }}>
                Our streamlined 4-step process ensures clarity, comfort, and outstanding results at every stage.
              </p>
            </div>
          </FadeIn>
          <motion.div className="ab-process-row" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }}>
            {process.map((s, i) => (
              <motion.div key={i} className="ab-process-step" variants={fadeUp}>
                <div className="ab-process-num">{s.n}</div>
                <div>
                  <div className="ab-process-title">{s.title}</div>
                  <p className="ab-process-desc">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════ CLINIC VIDEO TOUR ═══════════════════════ */}
      <VideoTourBanner onOpen={() => setIsVideoOpen(true)} />

      {/* ═══════════════════════ CTA – dark ═══════════════════════ */}
      <section className="ab-cta">
        <div className="ab-cta-orb" />
        <div className="ab-cta-orb-2" />
        <div className="container">
          <FadeIn>
            <div className="ab-cta-inner">
              <div className="ab-cta-tag"><Sparkles size={12} /> Start Your Journey</div>
              <h2 className="ab-cta-title">
                Ready for Your <span className="ab-shine-text">Dream Smile?</span>
              </h2>
              <p className="ab-cta-sub">
                Book a free consultation with Dhaka&apos;s most trusted dental team. No pressure, no hidden fees — just expert advice and the warmest welcome.
              </p>
              <div className="ab-cta-btns">
                <Link href="/contact" className="ab-btn-primary">Book Free Consultation <ArrowUpRight size={18} /></Link>
                <a href="tel:+8801775227902" className="ab-btn-glass"><Phone size={16} /> Call Now</a>
                <a href="https://wa.me/8801775227902" target="_blank" rel="noopener noreferrer" className="ab-btn-glass" style={{ color: '#25D366' }}><MessageCircle size={16} /> WhatsApp</a>
              </div>
              <div className="ab-cta-trust">
                <div className="ab-cta-trust-item"><CheckCircle2 size={14} color="#16a34a" /> Pain-Free Guarantee</div>
                <div className="ab-cta-trust-item"><Award size={14} color="#38bdf8" /> BMDC Certified — Reg. 5169</div>
                <div className="ab-cta-trust-item"><Users size={14} color="#818cf8" /> 13k+ Happy Patients</div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════ LIGHTBOX MODAL ═══════════════════════ */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'fixed',
              top: 0, left: 0, right: 0, bottom: 0,
              backgroundColor: 'rgba(15, 23, 42, 0.92)',
              backdropFilter: 'blur(15px)',
              WebkitBackdropFilter: 'blur(15px)',
              zIndex: 99999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '2rem'
            }}
            onClick={() => setSelectedImage(null)}
          >
            {/* Close Button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ delay: 0.1 }}
              onClick={() => setSelectedImage(null)}
              style={{
                position: 'absolute', top: '2rem', right: '2rem',
                background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)',
                color: '#fff', width: '50px', height: '50px', borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', zIndex: 100000,
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.25)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
            >
              <X size={26} strokeWidth={2.5} />
            </motion.button>

            {/* Image Container */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              style={{ position: 'relative', width: '100%', maxWidth: '1400px', height: '90vh' }}
              onClick={(e) => e.stopPropagation()} // Prevent click to close when clicking the image
            >
              <Image
                src={selectedImage}
                alt="Full Profile"
                fill
                style={{ objectFit: 'contain', filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.4))' }}
                quality={100}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══════════════════════ VIDEO LIGHTBOX MODAL ═══════════════════════ */}
      <AnimatePresence>
        {isVideoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'fixed',
              top: 0, left: 0, right: 0, bottom: 0,
              backgroundColor: 'rgba(15, 23, 42, 0.95)',
              backdropFilter: 'blur(15px)',
              WebkitBackdropFilter: 'blur(15px)',
              zIndex: 99999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 'clamp(1rem, 5vw, 4rem)'
            }}
            onClick={() => setIsVideoOpen(false)}
          >
            {/* Close Button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ delay: 0.1 }}
              onClick={() => setIsVideoOpen(false)}
              style={{
                position: 'absolute', top: '2rem', right: '2rem',
                background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)',
                color: '#fff', width: '50px', height: '50px', borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', zIndex: 100000,
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.25)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
            >
              <X size={26} strokeWidth={2.5} />
            </motion.button>

            {/* Video Container */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              style={{
                position: 'relative', width: '100%', maxWidth: '1200px', aspectRatio: '16/9',
                background: '#000', borderRadius: '1.5rem', overflow: 'hidden',
                boxShadow: '0 20px 40px rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.15)'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Local clinic tour video */}
              <video
                src="https://res.cloudinary.com/dlaqtwoa3/video/upload/v1776535718/homeScreen_tai4jm.mp4"
                autoPlay
                muted
                controls
                playsInline
                style={{ width: '100%', height: '100%', objectFit: 'contain', background: '#000' }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
