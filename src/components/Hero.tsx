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
import { ArrowUpRight, Phone, ShieldCheck, Clock, Activity, Star, Sparkles, CheckCircle2, Award } from 'lucide-react';
import './Hero.css';
import heroprofile from '../assets/Hero/heroprofile.png';
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
const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
const word: Variants = {
  hidden: { y: '120%', opacity: 0, rotateX: -20 },
  show: { y: '0%', opacity: 1, rotateX: 0, transition: { type: "spring", stiffness: 60, damping: 15 } },
};

function RevealText({ text, className }: { text: string; className?: string }) {
  return (
    <motion.span className={className} variants={container} initial="hidden" animate="show" aria-label={text} style={{ perspective: "1000px" }}>
      {text.split(' ').map((w, i) => (
        <span key={i} style={{ display: 'inline-block', overflow: 'hidden', marginRight: '0.3em', paddingBottom: '0.1em' }}>
          <motion.span style={{ display: 'inline-block', transformOrigin: "top left" }} variants={word}>{w}</motion.span>
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

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [reviewIdx, setReviewIdx] = useState(0);

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

  useEffect(() => {
    const t = setInterval(() => {
      setReviewIdx(prev => (prev + 1) % googleReviews.length);
    }, 6000);
    return () => clearInterval(t);
  }, []);

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] });
  const bgY    = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const fadeOut = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scaleOut = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  const docSpringX = useSpring(mouse.x * 0.6, { stiffness: 45, damping: 25 });
  const docSpringY = useSpring(mouse.y * 0.6, { stiffness: 45, damping: 25 });
  const bgSpringX  = useSpring(mouse.x * 0.15, { stiffness: 30, damping: 25 });
  const bgSpringY  = useSpring(mouse.y * 0.15, { stiffness: 30, damping: 25 });

  const stats = [
    { val: 5000, suf: '+', lab: 'Happy Smiles' },
    { val: 10,   suf: '+', lab: 'Years Exp.' },
    { val: 99,   suf: '%', lab: 'Success Rate' },
  ];

  const [particles, setParticles] = useState<{ left: string; top: string; duration: number; delay: number; size: number }[]>([]);

  useEffect(() => {
    setParticles([...Array(20)].map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      duration: 5 + Math.random() * 8,
      delay: Math.random() * 5,
      size: Math.random() * 3 + 1,
    })));
  }, []);

  return (
    <section className="hero-v5" ref={containerRef}>
      
      {/* Dynamic Background */}
      <motion.div className="hero-bg-layer" style={{ x: bgSpringX, y: bgSpringY }}>
        <Image
          src={herobanner}
          alt="RH Dental Care Interior"
          fill priority
          className="hero-bg-img"
        />
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
              x: [0, Math.random() * 50 - 25, 0]
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

      <motion.div className="container hero-inner" style={{ opacity: fadeOut, scale: scaleOut }}>
        
        {/* ================= LEFT SECTION ================= */}
        <div className="hero-left">
          
          <motion.div
            className="hero-kicker glass-badge"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="kicker-dot"><div className="kicker-pulse" /></div>
            <span className="kicker-text">World Class Dental Experience</span>
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
            Experience dentistry redefined. From routine care to complex cosmetic transformations, we deliver painless precision in a premium environment.
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
            initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
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
            style={{ x: docSpringX, y: docSpringY }}
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
                src={heroprofile}
                alt="Dr. B.M Rafiqual Hasan"
                fill priority
                className="doc-img"
              />
              <div className="doc-gradient-fade" />
            </motion.div>

            {/* Orbiting Elements */}
            <motion.div 
              className="float-orb orb-top-left glass-pill"
              animate={{ y: [0, -15, 0], x: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Sparkles size={14} className="accent-icon" />
              <span>Oral Surgeon</span>
            </motion.div>

            <motion.div 
              className="float-orb orb-bottom-right glass-pill"
              animate={{ y: [0, 15, 0], x: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            >
              <ShieldCheck size={14} className="accent-icon" />
              <span>Implant Expert</span>
            </motion.div>
            
            {/* Real Google Review Snippet */}
            <motion.div 
              className="float-review glass-card"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.5, duration: 0.8 }}
            >
              <div className="review-stars">
                {[...Array(5)].map((_,i) => <Star key={i} size={10} fill="#fbbf24" color="#fbbf24" />)}
                <span className="review-score">5.0</span>
              </div>
              <motion.div
                key={reviewIdx} /* forces re-animation on change */
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                <p className="review-text" style={{ fontSize: '0.75rem', fontWeight: 500, fontStyle: 'italic', marginBottom: '8px', lineHeight: 1.4, color: '#f1f5f9' }}>"{googleReviews[reviewIdx].text}"</p>
                <div className="review-author" style={{ fontSize: '0.65rem', fontWeight: 700, color: '#94a3b8', textAlign: 'right' }}>- {googleReviews[reviewIdx].name}</div>
              </motion.div>
            </motion.div>

            {/* Premium Apple-style Name Card */}
            <motion.div
              className="premium-name-card glass-panel"
              initial={{ opacity: 0, y: 30, rotateX: 20 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ delay: 1.1, duration: 1, type: "spring", damping: 20 }}
              style={{ perspective: "1000px" }}
            >
              <div className="card-pinstripe" />
              <div className="card-content">
                <div className="card-header">
                  <h3 className="doc-name">Dr. B.M Rafiqual Hasan</h3>
                  <div className="verified-badge"><CheckCircle2 size={12}/> Verified</div>
                </div>
                <p className="doc-title">Chief Consultant – Oral & Dental Surgery</p>
                <div className="doc-creds">
                  <span>MPH, BDS, PGT</span>
                  <span className="dot">•</span>
                  <span>BMDC 5169</span>
                </div>
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
