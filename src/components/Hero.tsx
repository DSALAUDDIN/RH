'use client';

import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
  Variants,
  AnimatePresence,
} from 'framer-motion';
import { useRef, useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, Phone, ShieldCheck, Clock, Activity, Star, Sparkles, CheckCircle2, Award, ChevronLeft, ChevronRight, Stethoscope, GraduationCap } from 'lucide-react';
import './Hero.css';
import doctorsCouple from '../assets/Hero/DoctorsCouple.png';
import herobanner from '../assets/Hero/herobanner.webp';

/* ─── Animated Counter ─── */
function Counter({ to, suffix = '' }: { to: number; suffix?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let c = 0;
    const inc = to / 70;
    const t = setInterval(() => {
      c += inc;
      if (c >= to) { setCount(to); clearInterval(t); }
      else setCount(Math.floor(c));
    }, 20);
    return () => clearInterval(t);
  }, [inView, to]);
  return <span ref={ref}>{count}{suffix}</span>;
}

/* ─── Staggered Word Reveal ─── */
const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
const wordVariant: Variants = {
  hidden: { y: '120%', opacity: 0, rotateX: -20 },
  show: { y: '0%', opacity: 1, rotateX: 0, transition: { type: "spring", stiffness: 60, damping: 15 } },
};

function RevealText({ text, className }: { text: string; className?: string }) {
  return (
    <motion.span className={className} variants={containerVariants} initial="hidden" animate="show" aria-label={text} style={{ perspective: "1000px" }}>
      {text.split(' ').map((w, i) => (
        <span key={i} style={{ display: 'inline-block', overflow: 'hidden', marginRight: '0.3em', paddingBottom: '0.1em' }}>
          <motion.span style={{ display: 'inline-block', transformOrigin: "top left" }} variants={wordVariant}>{w}</motion.span>
        </span>
      ))}
    </motion.span>
  );
}

const googleReviews = [
  { name: "Walid Mohammad", text: "Commendable work and great care. The environment here is truly premium." },
  { name: "Tanvir AHAMED", text: "One of the best doctors I have ever seen. The most modern dental clinic in Dhaka." },
  { name: "Nafisa Islam", text: "The most painless dental experience I've ever had. Highly recommended!" }
];

/* ─── Doctor Data ─── */
const doctors = [
  {
    name: "Dr. Shimia Binte Taher",
    title: "Expert in Exodontia | Microscopic Endodontics & Aesthetic Dentistry",
    role: "Senior Lecturer, MH Samorita Medical College & Hospital",
    bmdc: "BMDC: 8496",
    credentials: "BDS",
    specialties: ["Microscopic Endodontics", "Aesthetic Dentistry", "Exodontia"],
    highlight: "A Perfect Blend of Skill, Care & Leadership",
    philosophy: "Dedicated to female-oriented dental care, ensuring a safe, respectful, and comfortable environment.",
  },
  {
    name: "Dr. B.M. Rafiqul Hasan (Mehedi)",
    title: "Chief Consultant | Oral & Dental Surgeon",
    role: "Senior Lecturer, MH Samorita Medical College & Hospital",
    bmdc: "BMDC: 5169",
    credentials: "BDS, MPH, PGT",
    specialties: ["Advanced Implantology", "Full Mouth Rehabilitation", "Digital & 3D Dentistry"],
    highlight: "Pioneer in Digital Dentistry & Implant Surgery",
    philosophy: "Internationally trained with in-house lab for precision prosthesis and superior outcomes.",
  },
];

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const [reviewIdx, setReviewIdx] = useState(0);
  const [activeDoc, setActiveDoc] = useState(0);

  const docSpringX = useSpring(0, { stiffness: 45, damping: 25 });
  const docSpringY = useSpring(0, { stiffness: 45, damping: 25 });
  const bgSpringX  = useSpring(0, { stiffness: 30, damping: 25 });
  const bgSpringY  = useSpring(0, { stiffness: 30, damping: 25 });

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const mx = (e.clientX / window.innerWidth - 0.5) * 24;
      const my = (e.clientY / window.innerHeight - 0.5) * 24;
      docSpringX.set(mx * 0.6);
      docSpringY.set(my * 0.6);
      bgSpringX.set(mx * 0.15);
      bgSpringY.set(my * 0.15);
    };
    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, [docSpringX, docSpringY, bgSpringX, bgSpringY]);

  useEffect(() => {
    const t = setInterval(() => {
      setReviewIdx(prev => (prev + 1) % googleReviews.length);
    }, 6000);
    return () => clearInterval(t);
  }, []);

  // Auto-cycle doctors every 8 seconds
  useEffect(() => {
    const t = setInterval(() => {
      setActiveDoc(prev => (prev + 1) % doctors.length);
    }, 8000);
    return () => clearInterval(t);
  }, []);

  const nextDoc = useCallback(() => {
    setActiveDoc(prev => (prev + 1) % doctors.length);
  }, []);

  const prevDoc = useCallback(() => {
    setActiveDoc(prev => (prev - 1 + doctors.length) % doctors.length);
  }, []);

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] });
  const fadeOut = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scaleOut = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);



  // Keep home hero video in sync with the About screen tour video.
  const homeVideoUrl = 'https://res.cloudinary.com/dlaqtwoa3/video/upload/v1776535718/homeScreen_tai4jm.mp4';

  const stats = [
    { val: 13, suf: 'k+', lab: 'Happy Smiles' },
    { val: 12, suf: '+', lab: 'Years Exp.' },
    { val: 99,   suf: '%', lab: 'Success Rate' },
  ];

  const [particles, setParticles] = useState<{ left: string; top: string; duration: number; delay: number; size: number; xOffset: number }[]>([]);

  useEffect(() => {
    // Generate random particles on client side to avoid hydration mismatch
    const frame = requestAnimationFrame(() => {
      setParticles([...Array(20)].map(() => ({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        duration: 5 + Math.random() * 8,
        delay: Math.random() * 5,
        size: Math.random() * 3 + 1,
        xOffset: Math.random() * 50 - 25,
      })));
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  const doc = doctors[activeDoc];

  return (
    <section className="hero-v5" ref={containerRef} style={{ position: 'relative' }}>
      
      {/* Dynamic Background */}
      <motion.div className="hero-bg-layer" style={{ x: bgSpringX, y: bgSpringY }}>
        <video
          autoPlay
          muted
          loop
          playsInline
          className="hero-bg-video"
          poster={herobanner.src}
          aria-hidden="true"
        >
          {homeVideoUrl && <source src={homeVideoUrl} type="video/mp4" />}
          <track kind="captions" srcLang="en" label="English" default />
        </video>
        <div className="hero-mesh-1" />
        <div className="hero-mesh-2" />
        <div className="hero-noise" />
      </motion.div>

      {/* Cinematic Dust Particles */}
      <div className="hero-particles">
        {particles.map((p, i) => (
          <motion.div
            key={i}
            className="hero-particle"
            animate={{ 
              y: [0, -150, 0],
              opacity: [0, 0.6, 0],
              x: [0, p.xOffset, 0]
            }}
            transition={{ 
              duration: p.duration, 
              repeat: Infinity, 
              delay: p.delay,
              ease: "easeInOut"
            }}
            style={{ 
              left: p.left, top: p.top, 
              width: p.size, height: p.size 
            }}
          />
        ))}
      </div>

      <motion.div className="container hero-inner">
        
        {/* ================= LEFT SECTION ================= */}
        <div className="hero-left">
          
          <motion.div
            className="hero-kicker glass-badge"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="kicker-dot"><div className="kicker-pulse" /></div>
            <span className="kicker-text">Meet Our Expert Doctors</span>
          </motion.div>

          <h1 className="hero-title">
            <RevealText text="Your Smile is" />
            <br />
            <motion.span 
              className="text-gradient-accent"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              Our Happiness.
            </motion.span>
          </h1>

          <motion.p
            className="hero-desc"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            Experience dentistry redefined by two leading experts. From microscopic endodontics to advanced implant surgery, we deliver painless precision in a premium environment.
          </motion.p>

          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <Link href="/contact" className="btn-premium">
              Book Appointment
              <ArrowUpRight className="btn-icon" size={20} />
            </Link>
            
            <a href="tel:+8801234567890" className="btn-glass">
              <Phone size={18} className="btn-icon-glass" />
              Free Consultation
            </a>
          </motion.div>

          <motion.div
            className="hero-trust-bar"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1 }}
          >
            <div className="trust-item">
              <CheckCircle2 color="#4ade80" size={18} />
              <span>Pain-free Guarantee</span>
            </div>
            <div className="trust-sep" />
            <div className="trust-item">
              <Award color="#38bdf8" size={18} />
              <span>BMDC Certified</span>
            </div>
            <div className="trust-sep" />
            <div className="trust-item">
              <GraduationCap color="#a78bfa" size={18} />
              <span>Internationally Trained</span>
            </div>
          </motion.div>

          <motion.div
            className="hero-stats-glass"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 1 }}
          >
            {stats.map((s, i) => (
              <div key={i} className="stat-group">
                <span className="stat-val"><Counter to={s.val} suffix={s.suf} /></span>
                <span className="stat-lab">{s.lab}</span>
              </div>
            ))}
          </motion.div>

        </div>

        {/* ================= RIGHT SECTION ================= */}
        <div className="hero-right">
          <motion.div 
            className="hero-visual-wrap"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            
            {/* Elegant glowing rings behind doctor */}
            <div className="hero-glow-ring ring-1" />
            <div className="hero-glow-ring ring-2" />

            <motion.div 
              className="doc-img-container"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              <Image
                src={doctorsCouple}
                alt="Dr. Shimia Binte Taher & Dr. B.M. Rafiqul Hasan - RH Dental Care"
                fill priority
                sizes="(max-width: 768px) 100vw, 45vw"
                className="doc-img"
              />
              <div className="doc-gradient-fade" />
            </motion.div>

            {/* Aesthetic tags */}
            <motion.div 
              className="float-orb orb-top-left glass-pill"
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Sparkles size={14} className="accent-icon" />
              <span>Aesthetic Mastery</span>
            </motion.div>

            <motion.div 
              className="float-orb orb-bottom-right glass-pill"
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            >
              <ShieldCheck size={14} className="accent-icon" />
              <span>Implant Experts</span>
            </motion.div>

            {/* Dr. Shimia Card (Bottom Left) */}
            <motion.div
              className="premium-name-card card-shim"
              initial={{ opacity: 0, x: -30, y: 10 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ delay: 1.1, duration: 0.8, type: "spring", damping: 25 }}
            >
              <div className="card-header">
                <h3 className="doc-name">Dr. Shimia Binte Taher</h3>
              </div>
              <p className="doc-title">Endodontics & Aesthetic Dentistry</p>
              <div className="doc-creds-box">
                <span className="verified-badge"><CheckCircle2 size={10}/> BDS</span>
                <span className="dot">•</span>
                <span>BMDC: 8496</span>
              </div>
            </motion.div>

            {/* Dr. Hasan Card (Top Right) */}
            <motion.div
              className="premium-name-card card-hasan"
              initial={{ opacity: 0, x: 30, y: -10 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ delay: 1.3, duration: 0.8, type: "spring", damping: 25 }}
            >
              <div className="card-header">
                <h3 className="doc-name">Dr. B.M Rafiqul Hasan</h3>
              </div>
              <p className="doc-title">Chief Consultant – Oral Surgery</p>
              <div className="doc-creds-box">
                <span className="verified-badge"><CheckCircle2 size={10}/> MPH, PGT, BDS</span>
                <span className="dot">•</span>
                <span>BMDC: 5169</span>
              </div>
            </motion.div>

          </motion.div>
        </div>
      </motion.div>

      {/* Modern Integrated Marquee */}
      <div className="hero-bottom-border" />
      <div className="marquee-container">
        <div className="marquee-track">
          {[...Array(4)].fill([
            { t: 'Painless Root Canals', i: <Activity size={14} /> },
            { t: 'Premium Implants', i: <ShieldCheck size={14} /> },
            { t: 'Invisalign & Braces', i: <Star size={14} /> },
            { t: 'Aesthetic Veneers', i: <Sparkles size={14} /> },
            { t: 'Same Day Crowns', i: <Clock size={14} /> }
          ]).flat().map((item, i) => (
            <div key={i} className="marquee-item">
              <span className="marquee-icon">{item.i}</span>
              <span className="marquee-text">{item.t}</span>
              <span className="marquee-dot" />
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
