'use client';

import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
  Variants,
} from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, Phone, ShieldCheck, Clock, Activity, Star } from 'lucide-react';
import './Hero.css';
import heroprofile from '../assets/hero/heroprofile.png';
import herobanner from '../assets/hero/herobanner.webp';

/* ─── Animated Counter ─── */
function Counter({ to, suffix = '' }: { to: number; suffix?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
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
const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};
const word: Variants = {
  hidden: { y: '110%', opacity: 0 },
  show: { y: '0%', opacity: 1, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
};

function RevealText({ text, className }: { text: string; className?: string }) {
  return (
    <motion.span className={className} variants={container} initial="hidden" animate="show" aria-label={text}>
      {text.split(' ').map((w, i) => (
        <span key={i} style={{ display: 'inline-block', overflow: 'hidden', marginRight: '0.3em' }}>
          <motion.span style={{ display: 'inline-block' }} variants={word}>{w}</motion.span>
        </span>
      ))}
    </motion.span>
  );
}

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth - 0.5) * 24,
        y: (e.clientY / window.innerHeight - 0.5) * 24,
      });
    };
    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, []);

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] });
  const bgY    = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const docY   = useTransform(scrollYProgress, [0, 1], ['0%', '12%']);
  const fadeOut = useTransform(scrollYProgress, [0, 0.45], [1, 0]);

  const docSpringX = useSpring(mouse.x * 0.45, { stiffness: 55, damping: 20 });
  const docSpringY = useSpring(mouse.y * 0.45, { stiffness: 55, damping: 20 });
  const bgSpringX  = useSpring(mouse.x * 0.12, { stiffness: 40, damping: 20 });

  const stats = [
    { val: 5000, suf: '+', lab: 'Happy Patients' },
    { val: 15,   suf: '+', lab: 'Years of Care' },
    { val: 99,   suf: '%', lab: 'Success Rate' },
  ];

  return (
    <section className="h-root" ref={containerRef}>

      {/* ── Scroll progress thin bar ── */}
      <motion.div className="h-scroll-bar" style={{ scaleX: scrollYProgress }} />

      {/* ── Background image — slow parallax ── */}
      <motion.div className="h-bg" style={{ y: bgY, x: bgSpringX }}>
        <Image
          src={herobanner}
          alt="RH Dental Care Interior"
          fill priority
          className="h-bg-img"
        />
      </motion.div>

      {/* ── Overlays ── */}
      <div className="h-ov-dark" />
      <div className="h-ov-blue" />

      {/* ── Main layout ── */}
      {/* ── Cinematic Dust Particles ── */}
      <div className="h-particles">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="h-particle"
            animate={{ 
              y: [0, -100, 0],
              opacity: [0, 0.5, 0],
              scale: [0.5, 1, 0.5]
            }}
            transition={{ 
              duration: 8 + Math.random() * 10, 
              repeat: Infinity, 
              delay: Math.random() * 5 
            }}
            style={{ 
              left: `${Math.random() * 100}%`, 
              top: `${Math.random() * 100}%` 
            }}
          />
        ))}
      </div>

      <motion.div className="container h-inner" style={{ opacity: fadeOut }}>

        {/* LEFT */}
        <div className="h-left">

          <motion.div
            className="h-kicker"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <span className="h-kicker-dot" />
            RH Dental Care — Multi-Disciplinary Centre
          </motion.div>

          <h1 className="h-headline">
            <span className="h-line-clip"><RevealText text="Where Every" /></span>
            <span className="h-line-clip h-line-accent"><RevealText text="Smile Matters." /></span>
          </h1>

          <motion.p
            className="h-sub"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            Advanced dental implants, orthodontics & cosmetic dentistry — 
            led by expert consultants at the heart of the city.
          </motion.p>

          <motion.div
            className="h-pills"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.7 }}
          >
            <span className="h-pill"><ShieldCheck size={13} /> BMDC Certified</span>
            <span className="h-pill"><Clock size={13} /> Fri–Wed · 3:30–10 PM</span>
          </motion.div>

          <motion.div
            className="h-ctas"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.05, duration: 0.8 }}
          >
            <Link href="/contact" className="h-btn-primary">
              Book Appointment
              <span className="h-btn-icon"><ArrowUpRight size={18} /></span>
            </Link>
            <a href="tel:+8801234567890" className="h-btn-ghost">
              <Phone size={17} /> Call Now
            </a>
          </motion.div>

          <motion.div
            className="h-stats"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.25, duration: 0.8 }}
          >
            {stats.map((s, i) => (
              <div key={i} className="h-stat">
                <span className="h-stat-n"><Counter to={s.val} suffix={s.suf} /></span>
                <span className="h-stat-l">{s.lab}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* RIGHT — Doctor presence (no card box) */}
        <div className="h-right">
          <motion.div
            className="h-doc-wrap"
            style={{ x: docSpringX, y: useTransform(docY, v => v) }}
            initial={{ opacity: 0, scale: 0.96, x: 40 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Pulse Digital Grid behind doctor — Fills space accurately */}
            <div className="h-doc-grid-pattern" />
            <div className="h-doc-aura" />
            <div className="h-doc-halo" />

            {/* Doctor transparent PNG with Breathing Animation */}
            <motion.div 
              className="h-doc-img-box"
              animate={{ 
                scale: [1, 1.02, 1],
                y: [0, -5, 0]
              }}
              transition={{ 
                duration: 6, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            >
              <Image
                src={heroprofile}
                alt="Dr. B.M Rafiqual Hasan (Mehedi)"
                fill priority
                className="h-doc-img"
              />
              <div className="h-doc-mist" />
            </motion.div>

            {/* Floating Specialist Chips — Integrated Luxury Style */}
            <motion.div 
              className="h-float-chip chip-upper"
              animate={{ y: [0, -12, 0], x: [0, 5, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <div className="chip-glass">
                <span className="chip-icon-blue">✦</span>
                <p>Oral Surgeon</p>
              </div>
            </motion.div>

            <motion.div 
              className="h-float-chip chip-lower"
              animate={{ y: [0, 10, 0], x: [0, -8, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            >
              <div className="chip-glass">
                <span className="chip-icon-blue">◈</span>
                <p>Implant Expert</p>
              </div>
            </motion.div>

            {/* Small Detail Icons to fill space around the image */}
            <motion.div className="h-detail-icon d-icon-1" animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}>
              <ShieldCheck size={20} className="icon-glow" />
            </motion.div>
            <motion.div className="h-detail-icon d-icon-2" animate={{ y: [0, -15, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}>
              <Activity size={18} className="icon-glow" />
            </motion.div>
            <motion.div className="h-detail-icon d-icon-3" animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 3, repeat: Infinity }}>
              <Star size={16} fill="#3b9eff" className="icon-glow" />
            </motion.div>

            {/* Elegant name badge — floats beside doctor */}
            <motion.div
              className="h-name-badge"
              initial={{ opacity: 0, x: 30, scale: 0.93 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ delay: 1.1, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="badge-accent-bar" />
              <div className="badge-body">
                <p className="badge-name">Dr. B.M Rafiqual Hasan</p>
                <p className="badge-role">Chief Consultant · Oral & Dental Surgery</p>
                <div className="badge-tags">
                  <span>MPH, BDS, PGT</span>
                  <span>BMDC 5169</span>
                </div>
              </div>
            </motion.div>

          </motion.div>
        </div>
      </motion.div>

      {/* Bottom marquee */}
      <div className="h-marquee-wrap">
        <div className="h-marquee">
          {[...Array(3)].fill(['Painless Treatment', 'Dental Implants', 'Advanced Orthodontics', 'Cosmetic Dentistry', 'Same Day Results', 'State-of-the-Art']).flat().map((item, i) => (
            <span key={i} className="h-marq-item">
              <span className="h-marq-dot" />
              {item}
            </span>
          ))}
        </div>
      </div>

    </section>
  );
}
