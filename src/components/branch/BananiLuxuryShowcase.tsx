'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Phone,
  MessageCircle,
  Clock,
  ShieldCheck,
  Sparkles,
  Compass,
  ArrowRight,
  Car,
  Scan,
  ZoomIn,
  X,
  ChevronLeft,
  ChevronRight,
  Award,
  Stethoscope,
  CheckCircle,
} from 'lucide-react';
import { BRANCHES } from '@/lib/branches';
import './BananiLuxuryShowcase.css';

interface ActionStep {
  id: string;
  stepNumber: string;
  badge: string;
  title: string;
  subtitle: string;
  image: string;
  alt: string;
  features: string[];
  actionLabel: string;
  actionWaText: string;
}

const ACTION_STEPS: ActionStep[] = [
  {
    id: 'arrival',
    stepNumber: '01',
    badge: 'Discrete Arrival',
    title: 'Executive Reception & Zero-Wait Lobby',
    subtitle:
      'Arrive discretely on Road 11 with secure basement parking and lift access straight into our uncrowded VIP lounge.',
    image: '/assets/branches/banani/reception.webp',
    alt: 'RH Dental Care Banani Road 11 executive reception lounge',
    features: ['🚗 Reserved Basement Parking', '🛡️ 100% Patient Privacy', '⏱️ Zero Waiting Time'],
    actionLabel: 'Book VIP Arrival',
    actionWaText:
      'Hello RH Dental Care, I would like to book a private VIP appointment at your Banani Road 11 Suite.',
  },
  {
    id: 'consultation',
    stepNumber: '02',
    badge: '1-on-1 Discovery',
    title: 'Private Specialist Consultation Chamber',
    subtitle:
      'Sit face-to-face with Chief Dental Surgeon Dr. B.M. Rafiqul Hasan Mehedi (BMDC 5169) for digital diagnostics & personalized treatment planning.',
    image: '/assets/branches/banani/consultation.webp',
    alt: 'Private consultation desk with Dr. Hasan at Banani branch',
    features: [
      '👨‍⚕️ Dr. Hasan Mehedi (BMDC 5169)',
      '📊 Digital Smile Preview',
      '🗣️ Unhurried Discussion',
    ],
    actionLabel: 'Schedule Consultation',
    actionWaText:
      'Hello RH Dental Care, I would like to schedule a 1-on-1 private consultation with Dr. Hasan at your Banani Suite.',
  },
  {
    id: 'surgery',
    stepNumber: '03',
    badge: 'Surgical Precision',
    title: 'On-Site 3D CBCT & Sterile Operatory Suite',
    subtitle:
      'Experience computer-guided dental implants and microscopic endodontics with low-dose 3D jawbone tomography on the same floor.',
    image: '/assets/branches/banani/banani-treatment-ot.webp',
    alt: 'Banani sterile surgical operatory theatre with 3D CBCT and modern dental chair',
    features: [
      '🔬 On-Site 3D CBCT Tomography',
      '🦷 Computer-Guided Implants',
      '🏥 Hospital-Grade Sterilization',
    ],
    actionLabel: 'Explore Surgical Tech',
    actionWaText:
      'Hello RH Dental Care, I am interested in dental implants/surgical treatment at your Banani Suite.',
  },
  {
    id: 'recovery',
    stepNumber: '04',
    badge: 'VIP Recovery',
    title: 'Post-Procedure Recovery & Concierge Care',
    subtitle:
      'Relax comfortably in our dedicated recovery suite post-treatment with direct surgeon follow-up and digital aftercare instructions.',
    image: '/assets/branches/banani/lounge.webp',
    alt: 'Banani VIP patient recovery and waiting lounge',
    features: [
      '☕ Relaxed Executive Ambiance',
      '📱 24/7 Digital Aftercare',
      '🚗 Hassle-Free Departure',
    ],
    actionLabel: 'Reserve Treatment Slot',
    actionWaText:
      'Hello RH Dental Care, I would like to reserve an appointment slot at your Banani private clinic.',
  },
];

export default function BananiLuxuryShowcase() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoWrapperRef = useRef<HTMLDivElement>(null);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    const next = !isMuted;
    videoRef.current.muted = next;
    setIsMuted(next);
  };

  const toggleFullscreen = () => {
    if (!videoWrapperRef.current) return;
    if (!document.fullscreenElement) {
      videoWrapperRef.current.requestFullscreen?.().catch(() => {});
    } else {
      document.exitFullscreen?.().catch(() => {});
    }
  };

  const openLightbox = (index: number) => {
    setActiveLightboxIndex(index);
  };

  const closeLightbox = () => {
    setActiveLightboxIndex(null);
  };

  const nextLightbox = () => {
    if (activeLightboxIndex === null) return;
    setActiveLightboxIndex((activeLightboxIndex + 1) % ACTION_STEPS.length);
  };

  const prevLightbox = () => {
    if (activeLightboxIndex === null) return;
    setActiveLightboxIndex((activeLightboxIndex - 1 + ACTION_STEPS.length) % ACTION_STEPS.length);
  };

  return (
    <section
      className="banani-action-section"
      id="banani-suite-showcase"
      aria-labelledby="banani-showcase-heading"
    >
      <div className="banani-action-container">
        {/* Section Header */}
        <div className="banani-action-header">
          <div className="banani-prestige-pill">
            <Sparkles size={14} className="pill-sparkle" />
            <span>Banani Road 11 · Private Dental Suite</span>
            <span className="live-dot" />
          </div>

          <h2 id="banani-showcase-heading" className="banani-action-title">
            Take an Action Tour of Our <span className="gold-shimmer">Banani Executive Suite</span>
          </h2>

          <p className="banani-action-lead">
            Dhaka’s premier appointment-only dental retreat. From discrete basement parking on Road
            11 to in-house 3D CBCT surgical suites — explore what your private dental experience
            looks like.
          </p>

          {/* Quick Facts Strip */}
          <div className="banani-quick-facts">
            <div className="fact-item">
              <Scan size={16} className="fact-icon" />
              <span>In-House 3D CBCT</span>
            </div>
            <div className="fact-divider" />
            <div className="fact-item">
              <Car size={16} className="fact-icon" />
              <span>Basement & Valet Parking</span>
            </div>
            <div className="fact-divider" />
            <div className="fact-item">
              <ShieldCheck size={16} className="fact-icon" />
              <span>1 Patient at a Time</span>
            </div>
            <div className="fact-divider" />
            <div className="fact-item">
              <Clock size={16} className="fact-icon" />
              <span>Sun–Thu: 3:00 PM – 10:00 PM</span>
            </div>
          </div>
        </div>

        {/* Cinematic Video Walkthrough Hero */}
        <div className="banani-cinema-card" ref={videoWrapperRef}>
          <div className="cinema-media-frame">
            <video
              ref={videoRef}
              className="cinema-video"
              src="/assets/videos/banani-suite.mp4"
              poster="/assets/branches/banani/reception.webp"
              autoPlay
              loop
              muted={isMuted}
              playsInline
              preload="metadata"
              aria-label="Banani Private Dental Suite 27-second executive video walkthrough"
            />

            {/* Video Floating Overlays */}
            <div className="cinema-top-badges">
              <div className="cinema-live-badge">
                <span className="cinema-radar" />
                <span>27s Cinematic Tour · Banani Suite</span>
              </div>
            </div>

            <div className="cinema-controls">
              <button
                type="button"
                className="cinema-btn"
                onClick={togglePlay}
                aria-label={isPlaying ? 'Pause video' : 'Play video'}
              >
                {isPlaying ? <Pause size={18} /> : <Play size={18} fill="white" />}
              </button>
              <button
                type="button"
                className="cinema-btn"
                onClick={toggleMute}
                aria-label={isMuted ? 'Unmute video' : 'Mute video'}
              >
                {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
              </button>
              <button
                type="button"
                className="cinema-btn"
                onClick={toggleFullscreen}
                aria-label="Toggle full screen"
              >
                <Maximize2 size={18} />
              </button>
            </div>

            {/* Bottom Caption Overlay */}
            <div className="cinema-bottom-overlay">
              <div className="cinema-info">
                <span className="cinema-tag">Private Practice</span>
                <h3 className="cinema-title">House 82, Road 11, Block D, Banani</h3>
                <p className="cinema-sub">
                  Equipped with digital dentistry, apex locators, intraoral scanners, and private
                  surgical theatres.
                </p>
              </div>

              <div className="cinema-action-pills">
                <a
                  href={`tel:${BRANCHES.banani.phone}`}
                  className="cinema-pill-call"
                  aria-label={`Call Banani suite at ${BRANCHES.banani.phoneDisplay}`}
                >
                  <Phone size={15} />
                  <span>Call {BRANCHES.banani.phoneDisplay}</span>
                </a>
                <a
                  href={`https://wa.me/${BRANCHES.banani.whatsapp}?text=${encodeURIComponent(
                    'Hello RH Dental Care, I would like to book a private consultation at your Banani Road 11 Suite.',
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cinema-pill-wa"
                  aria-label="WhatsApp Banani Concierge"
                >
                  <MessageCircle size={16} />
                  <span>WhatsApp Concierge</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Action-Based 4-Step Patient Journey Grid */}
        <div className="banani-journey-header">
          <div className="journey-title-wrap">
            <span className="journey-eyebrow">Interactive Patient Journey</span>
            <h3 className="journey-heading">Your 4-Step VIP Experience at Banani</h3>
          </div>
          <span className="journey-hint">
            Click any step to inspect clinical facilities in high resolution
          </span>
        </div>

        <div className="banani-action-grid">
          {ACTION_STEPS.map((step, idx) => (
            <div
              key={step.id}
              className="action-card"
              onClick={() => openLightbox(idx)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && openLightbox(idx)}
              aria-label={`View ${step.title}`}
            >
              <div className="action-card-media">
                <Image
                  src={step.image}
                  alt={step.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  className="action-card-img"
                />
                <div className="action-card-gradient" />

                {/* Floating Step Tag */}
                <div className="action-step-badge">
                  <span className="step-num">{step.stepNumber}</span>
                  <span className="step-tag-text">{step.badge}</span>
                </div>

                {/* Zoom indicator on hover */}
                <div className="action-zoom-cue">
                  <ZoomIn size={18} />
                  <span>View Details</span>
                </div>
              </div>

              <div className="action-card-body">
                <h4 className="action-card-title">{step.title}</h4>
                <p className="action-card-desc">{step.subtitle}</p>

                <ul className="action-features-list">
                  {step.features.map((feat, fIdx) => (
                    <li key={fIdx}>
                      <CheckCircle size={14} className="feat-check" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                <div className="action-card-footer" onClick={(e) => e.stopPropagation()}>
                  <a
                    href={`https://wa.me/${BRANCHES.banani.whatsapp}?text=${encodeURIComponent(step.actionWaText)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="action-card-btn"
                  >
                    <span>{step.actionLabel}</span>
                    <ArrowRight size={14} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lead Doctor & Clinical Assurance Bar */}
        <div className="banani-trust-ribbon">
          <div className="trust-doctor-profile">
            <div className="doctor-monogram">
              <Award size={24} />
            </div>
            <div className="doctor-meta">
              <span className="doctor-badge">Clinical Lead · Banani Private Suite</span>
              <h4 className="doctor-title">Dr. B.M. Rafiqul Hasan Mehedi</h4>
              <p className="doctor-creds">
                Oral & Dental Surgeon (BSMMU PGT) · Certified Implantologist ·{' '}
                <strong>BMDC Reg: 5169</strong>
              </p>
            </div>
          </div>

          <div className="trust-actions">
            <a href={`tel:${BRANCHES.banani.phone}`} className="trust-btn-call">
              <Phone size={16} />
              <span>Direct Call: {BRANCHES.banani.phoneDisplay}</span>
            </a>
            <a
              href={BRANCHES.banani.mapLink}
              target="_blank"
              rel="noopener noreferrer"
              className="trust-btn-maps"
            >
              <Compass size={16} />
              <span>Directions on Maps</span>
            </a>
          </div>
        </div>

        {/* Banasree Flagship Hospital Bridge */}
        <div className="banani-hospital-bridge">
          <div className="bridge-icon-wrap">
            <Stethoscope size={22} />
          </div>
          <div className="bridge-info">
            <strong>Prefer our Banasree Flagship Hospital?</strong>
            <p>
              Full-service multi-chair clinic in Block C, Banasree. Specialized in family dental
              care, pediatric dentistry, and affordable restorations.
            </p>
          </div>
          <Link href="/banasree" className="bridge-cta-btn">
            <span>Explore Banasree Hospital</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      {/* Interactive Lightbox Modal */}
      {activeLightboxIndex !== null && (
        <div className="lightbox-overlay" onClick={closeLightbox}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="lightbox-close"
              onClick={closeLightbox}
              aria-label="Close modal"
            >
              <X size={24} />
            </button>

            <button
              type="button"
              className="lightbox-nav-btn lightbox-prev"
              onClick={prevLightbox}
              aria-label="Previous image"
            >
              <ChevronLeft size={28} />
            </button>

            <button
              type="button"
              className="lightbox-nav-btn lightbox-next"
              onClick={nextLightbox}
              aria-label="Next image"
            >
              <ChevronRight size={28} />
            </button>

            <div className="lightbox-media-box">
              <Image
                src={ACTION_STEPS[activeLightboxIndex].image}
                alt={ACTION_STEPS[activeLightboxIndex].alt}
                fill
                sizes="(max-width: 1200px) 95vw, 1100px"
                className="lightbox-img"
                priority
              />
            </div>

            <div className="lightbox-details">
              <div className="lightbox-step-pill">
                Step {ACTION_STEPS[activeLightboxIndex].stepNumber} ·{' '}
                {ACTION_STEPS[activeLightboxIndex].badge}
              </div>
              <h3 className="lightbox-title">{ACTION_STEPS[activeLightboxIndex].title}</h3>
              <p className="lightbox-desc">{ACTION_STEPS[activeLightboxIndex].subtitle}</p>

              <div className="lightbox-actions-row">
                <a
                  href={`https://wa.me/${BRANCHES.banani.whatsapp}?text=${encodeURIComponent(
                    ACTION_STEPS[activeLightboxIndex].actionWaText,
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="lightbox-btn-wa"
                >
                  <MessageCircle size={18} />
                  <span>Book for This Procedure via WhatsApp</span>
                </a>
                <a href={`tel:${BRANCHES.banani.phone}`} className="lightbox-btn-call">
                  <Phone size={17} />
                  <span>Call {BRANCHES.banani.phoneDisplay}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
