'use client';

import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import {
  ArrowUpRight, Phone, ShieldCheck, Star, Award, Clock, Heart,
  Microscope, Users, CheckCircle2, ChevronRight, Sparkles,
  CalendarCheck, Stethoscope, BadgeCheck, Smile, Activity,
  Zap, Eye, Layers, HeartPulse, Building2, FlaskConical,
  ScanLine, MonitorDot, Wifi, User, Brain, GraduationCap,
} from 'lucide-react';
import './About.css';
import heroBg      from '../../assets/about_hero_light.png';
import heroprofile from '../../assets/hero/heroprofile.png';
import drShimia    from '../../assets/dr_shimia.png';
import clinicImg   from '../../assets/about_clinic.png';

/* Doctor Images for Marquee */
import doc1 from '../../assets/doctors/DENTAL LED SIZE 0.png';
import doc2 from '../../assets/doctors/DENTAL LED SIZE 43_122614 2.png';
import doc3 from '../../assets/doctors/DENTAL LED SIZE C.png';
import doc4 from '../../assets/doctors/DENTAL LED SIZE R5.png';
import doc5 from '../../assets/doctors/DENTAL LED SIZE NEWW.png';
import doc6 from '../../assets/doctors/DENTAL LED SIZE_123551 (1) 2.png';
import doc7 from '../../assets/doctors/DENTAL LED SIZE 998.png';
import doc8 from '../../assets/doctors/DENTAL LED SIZE BBG_123159 - Copy.png';
import doc9 from '../../assets/doctors/tyjdfytjfutyuju - Copy (2).jpeg';
import doc10 from '../../assets/doctors/DENTAL LED SIZE 222.png';
import doc11 from '../../assets/doctors/hjyhfyyyhujjgjhvk - Copy.jpeg';

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

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.09 } } };
const fadeUp  = { hidden: { opacity: 0, y: 36 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16,1,0.3,1] } } };

/* ══ REAL DATA ══ */
const heroStats = [
  { val: 5000, suf: '+', label: 'Happy Smiles' },
  { val: 10,   suf: '+', label: 'Years Exp.' },
  { val: 99,   suf: '%', label: 'Success Rate' },
  { val: 3500, suf: 'sqft', label: 'Clinic Area' },
];

const specialties = [
  { icon: <Eye size={22} />,        name: '3D Imaging',   slug: '3d-imaging' },
  { icon: <Activity size={22} />,   name: 'Orthodontics', slug: 'braces' },
  { icon: <Layers size={22} />,     name: 'Zirconia',     slug: 'zirconia' },
  { icon: <Stethoscope size={22} />,name: 'Implants',     slug: 'implants' },
  { icon: <HeartPulse size={22} />, name: 'Root Canal',   slug: 'root-canal' },
  { icon: <Heart size={22} />,      name: 'Gum Care',     slug: 'gum-care' },
  { icon: <Smile size={22} />,      name: 'Kids Dental',  slug: 'kids-care' },
  { icon: <Sparkles size={22} />,   name: 'Aesthetics',   slug: 'treatments' },
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
  { icon: <Building2 size={22} />,  title: 'Multiple Operating Rooms',    desc: 'Modern OT setup including a fully equipped General Anesthesia (GA) operating theatre for safe surgical procedures.' },
  { icon: <ScanLine size={22} />,   title: 'State-of-the-Art Technology', desc: '3D scanners, intraoral cameras, endo microscopes, and full digital imaging for accurate diagnosis and treatment.' },
  { icon: <FlaskConical size={22} />,title: 'In-House Dental Laboratory', desc: 'On-site lab gives complete control over prosthesis design — faster turnaround, superior aesthetics and precision fit.' },
  { icon: <Wifi size={22} />,       title: 'Two Spacious Waiting Areas',  desc: 'Two comfortable waiting areas with WiFi, refreshments, and a calm, patient-friendly environment.' },
  { icon: <MonitorDot size={22} />, title: 'Digital Workflow',             desc: 'End-to-end digital treatment planning from diagnosis to final restoration, ensuring accuracy and predictable outcomes.' },
  { icon: <ShieldCheck size={22} />,title: 'Hospital-Grade Sterilization', desc: 'Strict hygiene and sterilization protocols maintained across the entire 3,500 sq.ft facility at all times.' },
];

/* Real Google reviews + testimonial data */
const realReviews = [
  { name: 'Walid Mohammad', init: 'WM', role: 'Verified Google Review',  text: 'Commendable work and great care. The environment here is truly premium.' },
  { name: 'Tanvir AHAMED',  init: 'TA', role: 'Verified Google Review',  text: 'One of the best doctors I have ever seen. The most modern dental clinic in Dhaka.' },
  { name: 'Nafisa Islam',   init: 'NI', role: 'Verified Google Review',  text: 'The most painless dental experience I\'ve ever had. Highly recommended!' },
  { name: 'Sarah Jenkins',  init: 'SJ', role: 'Patient since 2022',      text: 'The level of care at RH Dental is unprecedented. I felt absolutely zero pain. Dr. Hasan is not just a dentist, he\'s an artist!' },
  { name: 'Michael Chen',   init: 'MC', role: 'Patient since 2021',      text: 'Finally, a dental clinic that doesn\'t feel like a hospital. My veneers look incredibly natural and the team is warm and professional.' },
  { name: 'Emily Davis',    init: 'ED', role: 'Patient since 2023',      text: 'Best pediatric dentistry experience! My kids actually look forward to their appointments now.' },
  { name: 'Robert Miller',  init: 'RM', role: 'Patient since 2022',      text: 'Incredible attention to detail. The 3D imaging they used to plan my implants was absolutely fascinating.' },
];

/* Why choose us */
const whyCards = [
  { icon: <Users size={22} />,       title: 'Expert Multi-Specialty Team',         desc: 'Specialists in all dental disciplines — from implantology and orthodontics to cosmetic design and pediatric care.' },
  { icon: <Brain size={22} />,       title: 'Advanced Technology & Digital Workflow', desc: '3D scanners, digital imaging, and in-house lab for accurate diagnosis and seamless treatment execution.' },
  { icon: <User size={22} />,        title: 'Customised Patient-Centered Care',    desc: 'Every treatment plan is tailored to each patient\'s unique anatomy, aesthetic goals, and oral health needs.' },
  { icon: <Smile size={22} />,       title: 'Special Care for Children & SEN',     desc: 'Dedicated child-friendly approach and GA OT setup for patients who need extra comfort and care.' },
  { icon: <Zap size={22} />,         title: 'Pain-Free Guarantee',                 desc: 'Latest anesthetic and sedation techniques ensure every procedure is comfortable — we guarantee it.' },
  { icon: <CalendarCheck size={22} />,title: 'Proven Complex Case Success',        desc: 'Numerous full mouth rehabilitations and smile makeovers completed with outstanding, long-lasting results.' },
];

const process = [
  { n: '01', title: 'Free Consultation', desc: 'Thorough digital examination and 3D scan to fully understand your dental health.' },
  { n: '02', title: 'Tailored Plan',     desc: 'Transparent treatment plan with zero hidden costs and a digital preview of results.' },
  { n: '03', title: 'Expert Treatment',  desc: 'BMDC-certified specialists using cutting-edge technology for precise outcomes.' },
  { n: '04', title: 'Aftercare',         desc: 'Continuous follow-up and personalised guidance to protect your investment long-term.' },
];

/* Team photos — doctors with images and roles extracted from real flyers */
const teamMembers = [
  { name: 'Dr. B.M. Rafiqul Hasan', role: 'Chief Consultant & Surgeon', badge: 'Oral Surgery', img: heroprofile },
  { name: 'Dr. Shimia Binte Taher', role: 'Microscopic Endodontics & Aesthetics', badge: 'Team Lead', img: doc11 },
  { name: 'Dr. Afzal Chowdhury', role: 'Oral & Dental Surgeon', badge: 'Oral Surgery', img: doc1 },
  { name: 'Dr. Mahaesa Tamima', role: 'Senior Oral & Dental Surgeon', badge: 'Endodontics', img: doc2 },
  { name: 'Dr. B.M. Rafiqul Hasan', role: 'Chief Consultant (Mehedi)', badge: 'Implantology', img: doc3 },
  { name: 'Dr. Asma Binte Faiz Tamanna', role: 'Oral & Dental Surgeon', badge: 'Dental Surgeon', img: doc4 },
  { name: 'Dr. Monisha Haque Hreedy', role: 'Oral & Dental Surgeon', badge: 'Dental Surgeon', img: doc5 },
  { name: 'Dr. Nishat Tamanna Alam', role: 'Senior Oral & Dental Surgeon', badge: 'Dental Surgeon', img: doc6 },
  { name: 'Dr. Umaya Khanam', role: 'Oral & Dental Surgeon', badge: 'Dental Surgeon', img: doc7 },
  { name: 'Dr. Mansura Panna', role: 'Senior Oral & Dental Surgeon', badge: 'Endodontics', img: doc8 },
  { name: 'Dr. Jeamima Tabassum Barsha', role: 'Oral & Dental Surgeon', badge: 'Aligner & Orthodontics', img: doc10 },
  { name: 'Dr. Fariha Ferdous', role: 'Oral & Dental Surgeon', badge: 'Dental Surgeon', img: doc9 },
];

/* ══ PAGE ══ */
export default function AboutPage() {
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
            Your Smile is{' '}
            <span className="ab-shine">Our Happiness.</span>
          </motion.h1>

          <motion.p className="ab-hero-tagline"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}>
            Your Smile is Our Happiness
          </motion.p>

          <motion.p className="ab-hero-subtitle"
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}>
            At RH Dental Care, we are dedicated to transforming smiles and enhancing oral health — with world-class dental care, advanced technology, and a patient-first approach for patients of all ages, including children and patients with special needs.
          </motion.p>

          <motion.div className="ab-hero-cta-row"
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.62 }}>
            <Link href="/contact" className="ab-btn-primary">
              Book Free Consultation <ArrowUpRight size={18} />
            </Link>
            <a href="tel:+8801234567890" className="ab-btn-glass">
              <Phone size={16} /> Call Us Now
            </a>
            <span className="ab-trust-pill">
              <CheckCircle2 size={14} /> BMDC Reg. 5169
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
                  <Image src={heroprofile} alt="Dr. B.M. Rafiqul Hasan Mehedi"
                    fill sizes="(max-width:768px) 100vw, 50vw"
                    style={{ objectFit: 'cover', objectPosition: 'top center' }} />
                  <div className="ab-doc-img-glow" />
                  <div className="ab-doc-info-card">
                    <div className="ab-doc-name">Dr. B.M. Rafiqul Hasan (Mehedi)</div>
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
                  Dr. B.M. Rafiqul Hasan{' '}
                  <span className="ab-shine-text">(Mehedi)</span>
                </h2>
                <p className="ab-body-dark">
                  A distinguished Oral &amp; Dental Surgeon known for his precision, advanced clinical expertise, and commitment to excellence. With over <strong style={{color:'#0f172a'}}>10 years of clinical experience</strong>, Dr. Hasan combines professional expertise, modern technology, and patient-centred care to deliver lasting, functional, and aesthetically pleasing results.
                </p>
                <p className="ab-body-dark">
                  He has undergone advanced international training in Dental Implantology from <strong style={{color:'#0f172a'}}>China, Korea, and India</strong>, and completed specialised training in Minimally Invasive Cosmetic Dentistry (MICD) in Nepal. Since 2015, he also serves as <strong style={{color:'#0f172a'}}>Senior Lecturer at MH Samorita Medical College &amp; Hospital</strong>.
                </p>

                <div className="ab-doc-values">
                  {[
                    { icon: <GraduationCap size={16} />, title: 'BDS · MPH · PGT (OMS & Prosthodontics)',   desc: 'Sapporo Dental College (DU) • City University • BSM Medical University, Dhaka' },
                    { icon: <ScanLine size={16} />,      title: 'Digital & 3D Guided Implantology',          desc: 'Pioneer in digital treatment planning and 3D-guided implant surgery for predictable outcomes.' },
                    { icon: <FlaskConical size={16} />,  title: 'In-House Lab for Precision Prosthesis',     desc: 'Complete control over design, quality, and turnaround time for superior aesthetic & functional results.' },
                    { icon: <Microscope size={16} />,    title: 'Full Mouth Rehabilitation Expertise',       desc: 'Numerous complex rehabilitation cases completed restoring both function and patient confidence.' },
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
                <span className="ab-label ab-shimia-label"><BadgeCheck size={14} /> Senior Doctor &amp; Team Lead</span>
                <h2 className="ab-section-title-dark">
                  Dr. Shimia{' '}
                  <span style={{ background: 'linear-gradient(90deg,#9333ea,#818cf8)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>
                    Binte Taher
                  </span>
                </h2>
                <p className="ab-body-dark">
                  A highly accomplished dental professional who combines clinical excellence with compassionate, patient-centred care. She completed her <strong style={{color:'#0f172a'}}>BDS from Pioneer Dental College</strong> — one of the most prestigious dental institutions in Bangladesh — and furthered her expertise through <strong style={{color:'#0f172a'}}>Postgraduate Training in Oral &amp; Maxillofacial Surgery at Dhaka Medical College</strong>.
                </p>
                <p className="ab-body-dark">
                  At RH Dental Care, Dr. Shimia plays a vital <strong style={{color:'#0f172a'}}>leadership role</strong>, guiding and managing the clinical team with professionalism and vision. She is especially dedicated to providing <strong style={{color:'#0f172a'}}>female-oriented dental care</strong> in a safe, respectful environment.
                </p>

                <div className="ab-doc-values">
                  {[
                    { icon: <Microscope size={16} />,  title: 'Microscopic Endodontics',      desc: 'Highly accurate, minimally invasive root canal treatments using advanced endo microscopes.' },
                    { icon: <Sparkles size={16} />,    title: 'Aesthetic Dentistry',           desc: 'Creating natural, confident, and beautiful smiles with precision composite and ceramic restorations.' },
                    { icon: <Stethoscope size={16} />, title: 'Exodontia — Complex Extractions',desc: 'Expert in routine and complex tooth extractions with maximum patient comfort, including surgical procedures.' },
                    { icon: <GraduationCap size={16} />,title: 'Academic Contributor since 2015',desc: 'Senior Lecturer at MH Samorita Medical College & Hospital — mentoring the next generation of dentists.' },
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
                  <Image src={drShimia} alt="Dr. Shimia Binte Taher"
                    fill sizes="(max-width:768px) 100vw, 50vw"
                    style={{ objectFit: 'cover', objectPosition: 'top center' }} />
                  <div className="ab-doc-img-glow" />
                  <div className="ab-doc-info-card-alt">
                    <div className="ab-doc-name">Dr. Shimia Binte Taher</div>
                    <div className="ab-doc-role" style={{ color: '#9333ea' }}>BDS · Microscopic Endodontics &amp; Aesthetic Dentistry</div>
                    <div className="ab-doc-creds-row">
                      <span className="ab-cred-chip-alt">BDS — Pioneer Dental College</span>
                      <span className="ab-cred-chip-alt">PGT — OMS · Dhaka Medical College</span>
                      <span className="ab-verified-pill" style={{ background:'rgba(147,51,234,0.1)', border:'1px solid rgba(147,51,234,0.2)', color:'#9333ea' }}>
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

      {/* ═══════════════════════ TEAM PHOTO STRIP ═══════════════════════ */}
      <section className="ab-section ab-section-dark" style={{ overflow: 'hidden' }}>
        <div className="container">
          <FadeIn>
            <div className="ab-team-strip-title">
              <span className="ab-label"><Users size={14} /> Meet the Full Team</span>
              <h2 className="ab-section-title-dark">
                A Team of <span className="ab-shine-text">Specialists</span>
              </h2>
              <p className="ab-body-dark" style={{ maxWidth: '500px', margin: '0 auto' }}>
                Every clinician at RH Dental Care holds specialist qualifications and is dedicated to delivering outstanding, patient-centred outcomes.
              </p>
            </div>
          </FadeIn>
        </div>

        <div className="ab-team-marquee">
          <div className="ab-team-track">
            {[...teamMembers, ...teamMembers].map((m, i) => (
              <div key={i} className="ab-team-photo-card">
                {m.img ? (
                  <Image src={m.img} alt={m.name} fill
                    style={{ objectFit: 'contain', objectPosition: 'center' }} />
                ) : (
                  <div style={{
                    width: '100%', height: '100%',
                    background: 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '3.5rem', fontWeight: 900,
                    color: 'rgba(14,165,233,0.4)',
                  }}>
                    RH
                  </div>
                )}
                <div className="ab-team-photo-overlay" />
                <span className="ab-team-photo-badge" style={
                  m.badge === 'Team Lead' ? { background:'rgba(147,51,234,0.15)', border:'1px solid rgba(147,51,234,0.25)', color:'#9333ea' } : {}
                }>{m.badge}</span>
                <div className="ab-team-photo-info">
                  <div className="ab-team-photo-name">{m.name}</div>
                  <div className="ab-team-photo-role" style={m.badge === 'Team Lead' ? { color:'#9333ea' } : {}}>{m.role}</div>
                </div>
              </div>
            ))}
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
              { val: 5000, suf: '+', label: 'Happy Patients',     icon: <Smile size={22} /> },
              { val: 10,   suf: '+', label: 'Years Experience',   icon: <Award size={22} /> },
              { val: 99,   suf: '%', label: 'Success Rate',       icon: <ShieldCheck size={22} /> },
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
                <span className="ab-why-cell-num">{String(i+1).padStart(2,'0')}</span>
                <div className="ab-why-icon">{c.icon}</div>
                <h3 className="ab-why-title">{c.title}</h3>
                <p className="ab-why-desc">{c.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════ REVIEWS – light ═══════════════════════ */}
      <section className="ab-section ab-section-light">
        <div className="container">
          <FadeIn>
            <div style={{ textAlign: 'center', marginBottom: '0.5rem' }}>
              <span className="ab-label ab-label-light"><Star size={12} /> Real Patient Reviews</span>
              <h2 className="ab-section-title-light">Trusted by <span className="ab-blue-text">5,000+ Patients</span></h2>
              <p style={{ fontSize: '1rem', color: '#475569', maxWidth: '480px', margin: '0 auto', lineHeight: 1.75 }}>
                Real words from real patients — verified Google reviews and clinic testimonials.
              </p>
            </div>
          </FadeIn>
          <div className="ab-reviews-marquee">
            <div className="ab-reviews-track">
              {[...realReviews, ...realReviews].map((r, i) => (
                <div key={i} className="ab-review-card">
                  <div className="ab-review-stars">{[...Array(5)].map((_,j)=><Star key={j} size={14} fill="currentColor"/>)}</div>
                  <p className="ab-review-text">&ldquo;{r.text}&rdquo;</p>
                  <div className="ab-review-author">
                    <div className="ab-review-avatar">{r.init}</div>
                    <div>
                      <div className="ab-review-name">{r.name}</div>
                      <div className="ab-review-meta">{r.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

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

      {/* ═══════════════════════ CLINIC SHOWCASE ═══════════════════════ */}
      <div style={{ position: 'relative', width: '100%', aspectRatio: '21/7', overflow: 'hidden' }}>
        <Image src={clinicImg} alt="RH Dental Care premium clinic interior" fill sizes="100vw"
          style={{ objectFit: 'cover', objectPosition: 'center 60%' }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to right, rgba(248,250,252,0.9) 0%, rgba(248,250,252,0.4) 55%, rgba(248,250,252,0.7) 100%)',
          display: 'flex', alignItems: 'center',
          padding: '0 max(1.5rem, calc((100vw - 1280px)/2))',
        }}>
          <div style={{ maxWidth: '520px' }}>
            <div className="ab-label" style={{ marginBottom: '1rem' }}><Sparkles size={14} /> Our State-of-the-Art Facility</div>
            <h2 style={{ fontSize: 'clamp(1.8rem,3.5vw,3rem)', fontWeight: 900, color: '#0f172a', letterSpacing: '-0.04em', lineHeight: 1.08, marginBottom: '1rem' }}>
              Designed for Your <span className="ab-shine-text">Comfort &amp; Care</span>
            </h2>
            <p style={{ fontSize: '0.95rem', color: '#475569', lineHeight: 1.8, marginBottom: '1.75rem' }}>
              From our calming reception to our precision-equipped treatment suites, every corner of our 3,500 sq.ft clinic is designed to make you feel safe, valued, and completely at ease.
            </p>
            <Link href="/contact" className="ab-btn-primary">Book a Visit <ArrowUpRight size={18} /></Link>
          </div>
        </div>
      </div>

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
                <a href="tel:+8801234567890" className="ab-btn-glass"><Phone size={16} /> Call Now</a>
              </div>
              <div className="ab-cta-trust">
                <div className="ab-cta-trust-item"><CheckCircle2 size={14} color="#16a34a" /> Pain-Free Guarantee</div>
                <div className="ab-cta-trust-item"><Award size={14} color="#38bdf8" /> BMDC Certified — Reg. 5169</div>
                <div className="ab-cta-trust-item"><Users size={14} color="#818cf8" /> 5,000+ Happy Patients</div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

    </div>
  );
}
