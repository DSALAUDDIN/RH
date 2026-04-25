'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  X, ZoomIn, MapPin, Phone, CalendarCheck,
  ShieldCheck, Clock, Star, ChevronRight, MessageCircle
} from 'lucide-react';

import img1  from '../assets/clinicGallery/1.jpeg';
import img2  from '../assets/clinicGallery/2.jpeg';
import img3  from '../assets/clinicGallery/3.jpeg';
import img4  from '../assets/clinicGallery/4.jpeg';
import img5  from '../assets/clinicGallery/5.jpeg';
import img60 from '../assets/clinicGallery/60.jpeg';
import img62 from '../assets/clinicGallery/62.jpeg';
import img63 from '../assets/clinicGallery/63.jpeg';
import img66 from '../assets/clinicGallery/66.jpeg';
import img67 from '../assets/clinicGallery/67.jpeg';

import './ClinicGallery.css';

/* ─── Types ─────────────────────────────────── */
type Category = 'all' | 'clinic' | 'surgery' | 'team';

interface Photo {
  src: typeof img1;
  alt: string;
  label: string;
  tag: string;
  area: string;
  objectPos?: string;
  category: Category[];
}

/* ─── Grid photos (explicit area placement) ──── */
const photos: Photo[] = [
  {
    src: img3,  alt: 'Comfortable waiting lounge at RH Dental Care',
    label: 'Waiting Lounge', tag: 'Premium Ambiance',
    area: 'r1a', objectPos: 'center', category: ['clinic'],
  },
  {
    src: img67, alt: 'State-of-the-art dental treatment suite',
    label: 'Treatment Suite', tag: 'Sterile Environment',
    area: 'r1b', objectPos: 'center', category: ['clinic'],
  },
  {
    src: img1,  alt: 'RH Dental Care expert dental team',
    label: 'Expert Team', tag: 'Clinical Excellence',
    area: 'r2a', objectPos: 'center 30%', category: ['team'],
  },
  {
    src: img63, alt: 'Microscopic endodontics with advanced technology',
    label: 'Precision Endodontics', tag: 'Advanced Tech',
    area: 'r2b', objectPos: 'center top', category: ['surgery'],
  },
  {
    src: img62, alt: 'Advanced implantology procedure in progress',
    label: 'Implantology', tag: 'Advanced Dentistry',
    area: 'r2c', objectPos: 'center', category: ['surgery'],
  },
  {
    src: img60, alt: 'Doctor consulting with a patient at RH Dental',
    label: 'Patient Consultation', tag: 'Personalized Care',
    area: 'r3a', objectPos: 'center', category: ['team'],
  },
  {
    src: img66, alt: 'Oral surgery being performed by specialist team',
    label: 'Oral Surgery', tag: 'Surgical Precision',
    area: 'r3b', objectPos: 'center', category: ['surgery'],
  },
  {
    src: img5,  alt: 'Surgical team performing oral surgery under theatre lights',
    label: 'Operation Theatre', tag: 'Advanced Surgery',
    area: 'r4a', objectPos: 'center', category: ['surgery'],
  },
  {
    src: img4,  alt: 'Modern clinic interior with premium dental chairs',
    label: 'Modern Interior', tag: 'Patient Comfort',
    area: 'r4b', objectPos: 'center', category: ['clinic'],
  },
];

/* ─── Lightbox pool (all images) ─────────────── */
const lightboxPhotos = [
  { src: img3,  label: 'Waiting Lounge',       tag: 'Premium Ambiance',    alt: 'Comfortable waiting lounge' },
  { src: img67, label: 'Treatment Suite',       tag: 'Sterile Environment', alt: 'Dental treatment suite' },
  { src: img1,  label: 'Expert Team',           tag: 'Clinical Excellence', alt: 'RH Dental expert team' },
  { src: img63, label: 'Precision Endodontics', tag: 'Advanced Tech',       alt: 'Microscopic endodontics' },
  { src: img62, label: 'Implantology',          tag: 'Advanced Dentistry',  alt: 'Implantology procedure' },
  { src: img60, label: 'Patient Consultation',  tag: 'Personalized Care',   alt: 'Doctor consultation' },
  { src: img66, label: 'Oral Surgery',          tag: 'Surgical Precision',  alt: 'Oral surgery' },
  { src: img5,  label: 'Operation Theatre',     tag: 'Advanced Surgery',    alt: 'Operation theatre' },
  { src: img4,  label: 'Modern Interior',       tag: 'Patient Comfort',     alt: 'Clinic interior' },
  { src: img2,  label: 'Aesthetic Dentistry',   tag: 'Smile Design',        alt: 'Aesthetic dental procedure' },
];

/* ─── Stats ───────────────────────────────────── */
const stats = [
  { icon: Star,         num: '5.0★',  lab: 'Google Rating',          color: '#f59e0b' },
  { icon: ShieldCheck,  num: '13k+',  lab: 'Happy Patients',         color: '#10b981' },
  { icon: Clock,        num: '12+',   lab: 'Years of Excellence',    color: '#6366f1' },
  { icon: CalendarCheck,num: 'Daily', lab: 'Appointments Available', color: '#0ea5e9' },
];

/* ─── Filter tabs ─────────────────────────────── */
const TABS: { id: Category; label: string }[] = [
  { id: 'all',     label: 'All Photos' },
  { id: 'clinic',  label: '🏥 Clinic' },
  { id: 'surgery', label: '🔬 Surgery' },
  { id: 'team',    label: '👨‍⚕️ Our Team' },
];

export default function ClinicGallery() {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<Category>('all');
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-60px' });

  const close = () => setLightbox(null);
  const prev  = () => setLightbox(l => l !== null ? (l - 1 + lightboxPhotos.length) % lightboxPhotos.length : 0);
  const next  = () => setLightbox(l => l !== null ? (l + 1) % lightboxPhotos.length : 0);

  /* Filtered list (grid layout preserved — hidden cells create gaps,
     so we keep all 9 cells and just dim the ones that don't match) */
  const isActive = (photo: Photo) =>
    activeTab === 'all' || photo.category.includes(activeTab);

  return (
    <section className="cg-section" ref={sectionRef} id="clinic-gallery">
      <div className="cg-container">

        {/* ── Header ── */}
        <motion.div
          className="cg-header"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="cg-kicker">
            <MapPin size={12} />
            <span>Step Inside Our World</span>
          </div>

          <h2 className="cg-title">
            Experience the Difference<br />
            <span className="cg-title-accent">Before You Even Arrive</span>
          </h2>

          <p className="cg-subtitle">
            From our state-of-the-art operating theatres to our calming lounges —
            every corner of RH Dental Care is designed around <em>you</em>.
          </p>

          {/* ── Filter Tabs ── */}
          <div className="cg-tabs" role="tablist" aria-label="Filter gallery photos">
            {TABS.map(tab => (
              <button
                key={tab.id}
                role="tab"
                aria-selected={activeTab === tab.id}
                className={`cg-tab ${activeTab === tab.id ? 'cg-tab--active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* ── Bento Grid ── */}
        <div className="cg-grid" role="tabpanel">
          {photos.map((photo, i) => {
            const active = isActive(photo);
            return (
              <motion.button
                key={photo.area}
                className={`cg-cell cg-cell--${photo.area} ${!active ? 'cg-cell--dimmed' : ''}`}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.55, delay: 0.06 * i, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => active && setLightbox(i)}
                aria-label={`View photo: ${photo.label}`}
                tabIndex={active ? 0 : -1}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 540px) 100vw, (max-width: 860px) 50vw, 33vw"
                  className="cg-img"
                  style={{ objectPosition: photo.objectPos ?? 'center' }}
                />
                <div className="cg-caption">
                  <span className="cg-caption-tag">{photo.tag}</span>
                  <span className="cg-caption-label">{photo.label}</span>
                </div>
                <div className="cg-zoom-hint" aria-hidden="true">
                  <ZoomIn size={14} />
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* ── Stats Bar ── */}
        <motion.div
          className="cg-stats"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.6 }}
        >
          {stats.map((s, i) => (
            <div key={s.lab} className="cg-stat-item">
              {i > 0 && <div className="cg-stat-sep" />}
              <div className="cg-stat-icon" style={{ color: s.color, background: `${s.color}18` }}>
                <s.icon size={18} />
              </div>
              <div>
                <p className="cg-stat-num">{s.num}</p>
                <p className="cg-stat-lab">{s.lab}</p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* ── CTA Block ── */}
        <motion.div
          className="cg-cta"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.75 }}
        >
          <div className="cg-cta-text">
            <p className="cg-cta-heading">Ready to experience this yourself?</p>
            <p className="cg-cta-sub">
              Book your appointment today — same-day slots available.
            </p>
          </div>
          <div className="cg-cta-actions">
            <a
              href="/contact"
              className="cg-btn-primary"
              aria-label="Book an appointment at RH Dental Care"
            >
              <CalendarCheck size={17} />
              Book Appointment
            </a>
            <a
              href="tel:+8801775227902"
              className="cg-btn-secondary"
              aria-label="Call RH Dental Care"
            >
              <Phone size={16} />
              Call Now
            </a>
            <a
              href="https://wa.me/8801775227902"
              target="_blank"
              rel="noopener noreferrer"
              className="cg-btn-secondary"
              aria-label="WhatsApp RH Dental Care"
              style={{ color: '#25D366', borderColor: 'rgba(37, 211, 102, 0.3)' }}
            >
              <MessageCircle size={16} />
              WhatsApp
            </a>
          </div>
        </motion.div>

      </div>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            className="cg-lb-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          >
            <motion.div
              className="cg-lb-panel"
              initial={{ scale: 0.93, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.93, opacity: 0 }}
              transition={{ type: 'spring', damping: 26, stiffness: 220 }}
              onClick={e => e.stopPropagation()}
            >
              <div className="cg-lb-img-wrap">
                <Image
                  src={lightboxPhotos[lightbox].src}
                  alt={lightboxPhotos[lightbox].alt}
                  fill
                  sizes="90vw"
                  className="cg-lb-img"
                  priority
                />
              </div>

              {/* In-lightbox CTA */}
              <div className="cg-lb-footer">
                <div className="cg-lb-meta-info">
                  <span className="cg-caption-tag">{lightboxPhotos[lightbox].tag}</span>
                  <p className="cg-lb-label">{lightboxPhotos[lightbox].label}</p>
                </div>
                <div className="cg-lb-footer-actions">
                  <a href="/contact" className="cg-lb-cta" onClick={close}>
                    Book a Visit <ChevronRight size={14} />
                  </a>
                  <span className="cg-lb-counter">{lightbox + 1} / {lightboxPhotos.length}</span>
                </div>
              </div>

              <button className="cg-lb-close" onClick={close} aria-label="Close"><X size={17} /></button>
              <button className="cg-lb-prev"  onClick={prev}  aria-label="Previous photo">&#8592;</button>
              <button className="cg-lb-next"  onClick={next}  aria-label="Next photo">&#8594;</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
