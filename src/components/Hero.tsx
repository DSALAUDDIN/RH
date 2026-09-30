'use client';

import { motion, useSpring, type Variants } from 'framer-motion';
import { useRef, useEffect } from 'react';
import Link from 'next/link';
import {
  ArrowUpRight,
  ShieldCheck,
  Clock,
  Activity,
  Star,
  Sparkles,
  CheckCircle2,
  Stethoscope,
  GraduationCap,
  Award,
} from 'lucide-react';
import './Hero.css';
import herobanner from '../assets/Hero/herobanner.webp';

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
  const homeVideoUrl = '/assets/videos/hero.mp4';

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

      </motion.div>

      {/* Cinematic Dust Particles */}

      <motion.div className="container hero-inner">
        {/* Left section */}
        <div className="hero-left">
          {/* Large Bold Heroic Since 2014 Showcase */}
          <motion.div
            className="hero-since-heroic"
            initial={{ opacity: 0, y: -16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            <div className="heroic-year-box">
              <span className="heroic-est">ESTD</span>
              <span className="heroic-year-num">2014</span>
            </div>
            <div className="heroic-text-content">
              <div className="heroic-title-row">
                <Award size={16} className="heroic-award-icon" />
                <span className="heroic-title">12+ Years of Clinical Excellence</span>
              </div>
              <span className="heroic-sub">Dhaka’s Trusted Dental Care & Implant Center</span>
            </div>
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

          {/* Prominently Highlighted Trust Metrics */}
          <motion.div
            className="hero-trust-bar"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.6 }}
          >
            <div className="trust-item trust-item-since">
              <div className="trust-since-block">
                <span className="trust-since-badge-label">SINCE</span>
                <span className="trust-since-badge-year">2014</span>
              </div>
              <div className="trust-text-stack">
                <span className="trust-title-highlight">12+ Years Clinical Heritage</span>
                <span className="trust-desc-dim">Over 15,000+ Treated Patients</span>
              </div>
            </div>
            <span className="trust-sep" />
            <div className="trust-item">
              <div className="trust-icon-box cyan-glow">
                <CheckCircle2 size={16} />
              </div>
              <div className="trust-text-stack">
                <span className="trust-title">2 Specialized Clinics</span>
                <span className="trust-desc-dim">Banani & Banasree</span>
              </div>
            </div>
            <span className="trust-sep" />
            <div className="trust-item">
              <div className="trust-icon-box purple-glow">
                <Sparkles size={16} />
              </div>
              <div className="trust-text-stack">
                <span className="trust-title">13 Specialist Doctors</span>
                <span className="trust-desc-dim">Multidisciplinary Care</span>
              </div>
            </div>
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
            <Link
              href="/dr-hasan"
              style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}
            >
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
                    <span>RH</span>
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
            </Link>

            {/* Divider */}
            <div className="hero-docs-divider">
              <div className="divider-line" />
              <div className="divider-icon">
                <Sparkles size={12} className="accent-icon" />
              </div>
              <div className="divider-line" />
            </div>

            {/* Dr. Shimia Card */}
            <Link
              href="/dr-shimia"
              style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}
            >
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
                    <span>ST</span>
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
            </Link>

            {/* Bottom floating pill */}

          </motion.div>
        </div>
      </motion.div>

      {/* Modern Integrated Marquee */}
      <div className="hero-bottom-border" />
      <div className="marquee-container">
        <div className="marquee-track">
          {[...Array(4)]
            .fill([
              { t: '✦ SERVING SMILES SINCE 2014 ✦', i: <Award size={14} className="marquee-award-icon" /> },
              { t: 'Microscope Root Canals', i: <Activity size={14} /> },
              { t: 'Premium Implants', i: <ShieldCheck size={14} /> },
              { t: 'Clear Aligners & Braces', i: <Star size={14} /> },
              { t: 'Zirconia Smile Design', i: <Sparkles size={14} /> },
              { t: 'Digital Lab On Site', i: <Clock size={14} /> },
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
