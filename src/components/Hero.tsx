'use client';

import { motion, useSpring, useInView, type Variants } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowUpRight,
  ShieldCheck,
  Clock,
  Activity,
  Star,
  Sparkles,
  CheckCircle2,
  Award,
  Stethoscope,
  GraduationCap,
} from 'lucide-react';
import './Hero.css';
import herobanner from '../assets/Hero/herobanner.webp';

/* Animated Counter */
function Counter({ to, suffix = '' }: { to: number; suffix?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let c = 0;
    const inc = to / 70;
    const t = setInterval(() => {
      c += inc;
      if (c >= to) {
        setCount(to);
        clearInterval(t);
      } else setCount(Math.floor(c));
    }, 20);
    return () => clearInterval(t);
  }, [inView, to]);
  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

/* Staggered Word Reveal */
const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
const wordVariant: Variants = {
  hidden: { y: '120%', opacity: 0, rotateX: -20 },
  show: {
    y: '0%',
    opacity: 1,
    rotateX: 0,
    transition: { type: 'spring', stiffness: 60, damping: 15 },
  },
};

function RevealText({ text, className }: { text: string; className?: string }) {
  return (
    <motion.span
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate="show"
      aria-label={text}
      style={{ perspective: '1000px' }}
    >
      {text.split(' ').map((w, i) => (
        <span
          key={i}
          style={{
            display: 'inline-block',
            overflow: 'hidden',
            marginRight: '0.3em',
            paddingBottom: '0.1em',
          }}
        >
          <motion.span
            style={{ display: 'inline-block', transformOrigin: 'top left' }}
            variants={wordVariant}
          >
            {w}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);

  const docSpringX = useSpring(0, { stiffness: 45, damping: 25 });
  const docSpringY = useSpring(0, { stiffness: 45, damping: 25 });
  const bgSpringX = useSpring(0, { stiffness: 30, damping: 25 });
  const bgSpringY = useSpring(0, { stiffness: 30, damping: 25 });

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

  // Keep home hero video in sync with the About screen tour video.
  const homeVideoUrl =
    'https://res.cloudinary.com/dxrcufs8f/video/upload/v1778516898/Untitled_design_1_1_whreqj.mp4';

  const stats = [
    { val: 2, suf: '', lab: 'Branches in Dhaka' },
    { val: 2, suf: '', lab: 'Clinicians at both' },
    { val: 3, suf: 'D', lab: 'CBCT on site' },
  ];

  const [particles, setParticles] = useState<
    { left: string; top: string; duration: number; delay: number; size: number; xOffset: number }[]
  >([]);

  useEffect(() => {
    // Generated after mount to avoid a hydration mismatch.
    const frame = requestAnimationFrame(() => {
      setParticles(
        [...Array(10)].map(() => ({
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          duration: 5 + Math.random() * 8,
          delay: Math.random() * 5,
          size: Math.random() * 3 + 1,
          xOffset: Math.random() * 50 - 25,
        })),
      );
    });
    return () => cancelAnimationFrame(frame);
  }, []);

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
              x: [0, p.xOffset, 0],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: 'easeInOut',
            }}
            style={{
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
            }}
          />
        ))}
      </div>

      <motion.div className="container hero-inner">
        {/* Left section */}
        <div className="hero-left">
          <motion.div
            className="hero-kicker glass-badge"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <div className="kicker-dot">
              <div className="kicker-pulse" />
            </div>
            <span className="kicker-text">Meet Our Expert Doctors</span>
          </motion.div>

          <h1 className="hero-title">
            <RevealText text="Two clinics." />
            <br />
            <span className="text-gradient-accent" style={{ opacity: 1, transform: 'none' }}>
              One clinical team.
            </span>
          </h1>

          <motion.p
            className="hero-desc"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6 }}
          >
            Two clinics in Dhaka run by the same clinical team: an appointment-only private suite in
            Banani, and a full-service flagship hospital in Banasree. Choose the one that suits how
            you want to be seen.
          </motion.p>

          <motion.div
            className="hero-actions hero-dual-branch-actions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <Link href="/banani" className="btn-hero-banani">
              <span>Banani — Private Suite</span>
              <ArrowUpRight size={18} />
            </Link>

            <Link href="/banasree" className="btn-hero-banasree">
              <span>Banasree — Flagship Hospital</span>
              <ArrowUpRight size={18} />
            </Link>

            <a href="#choose-branch" className="btn-hero-compare">
              Choose Branch ↓
            </a>
          </motion.div>

          <motion.div
            className="hero-trust-bar"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <div className="trust-item">
              <CheckCircle2 color="#4ade80" size={18} />
              <span>Comfort-focused care</span>
            </div>
            <div className="trust-sep" />
            <div className="trust-item">
              <Award color="#38bdf8" size={18} />
              <span>BMDC registered</span>
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
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            {stats.map((s, i) => (
              <div key={i} className="stat-group">
                <span className="stat-val">
                  <Counter to={s.val} suffix={s.suf} />
                </span>
                <span className="stat-lab">{s.lab}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right section - doctor profiles */}
        <div className="hero-right">
          <motion.div
            className="hero-doctors-panel"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          >
            {/* Decorative glowing rings */}
            <div className="hero-glow-ring ring-1" />
            <div className="hero-glow-ring ring-2" />

            {/* Panel Label */}
            <motion.div
              className="doctors-panel-label"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <Stethoscope size={13} className="accent-icon" />
              <span>Meet Our Expert Doctors</span>
            </motion.div>

            {/* Dr. Hasan Card */}
            <motion.div
              className="hero-doc-card"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6, type: 'spring', damping: 22 }}
              whileHover={{ y: -4, transition: { duration: 0.3 } }}
            >
              <div className="hero-doc-card-accent hasan-accent" />
              <div className="hero-doc-card-inner">
                <div className="hero-doc-avatar hasan-avatar">
                  <Image
                    src="/assets/team/portraits/hasan-avatar.webp"
                    alt="Dr. B.M. Rafiqul Hasan"
                    width={112}
                    height={112}
                  />
                </div>
                <div className="hero-doc-info">
                  <div className="hero-doc-name-row">
                    <p className="hero-doc-fullname">Dr. B. M. Rafiqul Hasan Mehedi</p>
                    <span className="hero-doc-verified">
                      <CheckCircle2 size={14} />
                    </span>
                  </div>
                  <p className="hero-doc-specialty">Chief Consultant — Oral Surgery</p>
                  <div className="hero-doc-credentials">
                    <span className="hero-doc-badge">
                      <GraduationCap size={11} /> BDS, MPH, PGT
                    </span>
                    <span className="hero-doc-bmdc">BMDC 5169</span>
                  </div>
                  <div className="hero-doc-tags">
                    <span>Implantology</span>
                    <span>3D Dentistry</span>
                    <span>Full Mouth Rehab</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Divider */}
            <div className="hero-docs-divider">
              <div className="divider-line" />
              <div className="divider-icon">
                <Sparkles size={12} className="accent-icon" />
              </div>
              <div className="divider-line" />
            </div>

            {/* Dr. Shimia Card */}
            <motion.div
              className="hero-doc-card"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6, type: 'spring', damping: 22 }}
              whileHover={{ y: -4, transition: { duration: 0.3 } }}
            >
              <div className="hero-doc-card-accent shimia-accent" />
              <div className="hero-doc-card-inner">
                <div className="hero-doc-avatar shimia-avatar">
                  <Image
                    src="/assets/team/portraits/shimia-avatar.webp"
                    alt="Dr. Shimia Binte Taher"
                    width={112}
                    height={112}
                  />
                </div>
                <div className="hero-doc-info">
                  <div className="hero-doc-name-row">
                    <p className="hero-doc-fullname">Dr. Shimia Binte Taher</p>
                    <span className="hero-doc-verified">
                      <CheckCircle2 size={14} />
                    </span>
                  </div>
                  <p className="hero-doc-specialty">Endodontics & Aesthetic Dentistry</p>
                  <div className="hero-doc-credentials">
                    <span className="hero-doc-badge">
                      <GraduationCap size={11} /> BDS
                    </span>
                    <span className="hero-doc-bmdc">BMDC 8496</span>
                  </div>
                  <div className="hero-doc-tags">
                    <span>Microscopic Endodontics</span>
                    <span>Veneers</span>
                    <span>Exodontia</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Bottom floating pill */}
            <motion.div
              className="hero-panel-footer-pill"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <ShieldCheck size={13} className="accent-icon" />
              <span>Both BMDC registered · the same team at both branches</span>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Modern Integrated Marquee */}
      <div className="hero-bottom-border" />
      <div className="marquee-container">
        <div className="marquee-track">
          {[...Array(4)]
            .fill([
              { t: 'Microscope Root Canals', i: <Activity size={14} /> },
              { t: 'Premium Implants', i: <ShieldCheck size={14} /> },
              { t: 'Invisalign & Braces', i: <Star size={14} /> },
              { t: 'Aesthetic Veneers', i: <Sparkles size={14} /> },
              { t: 'Same Day Crowns', i: <Clock size={14} /> },
            ])
            .flat()
            .map((item, i) => (
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
