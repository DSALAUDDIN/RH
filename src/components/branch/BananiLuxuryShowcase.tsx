'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Phone,
  MessageCircle,
  Sparkles,
  ArrowRight,
  ZoomIn,
  X,
  ChevronLeft,
  ChevronRight,
  Award,
  Stethoscope,
  CheckCircle,
  Building2,
} from 'lucide-react';
import { BRANCHES } from '@/lib/branches';
import './BananiLuxuryShowcase.css';

export type BranchKey = 'banani' | 'banasree';

export interface ActionStep {
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

interface CinemaScreenData {
  key: BranchKey;
  name: string;
  tagline: string;
  kicker: string;
  liveBadge: string;
  videoSrc: string;
  poster: string;
  addressTitle: string;
  addressSub: string;
  phone: string;
  phoneDisplay: string;
  whatsapp: string;
  mapLink: string;
  badgeColor: string;
  quickFacts: string[];
}

const CINEMA_SCREENS: Record<BranchKey, CinemaScreenData> = {
  banani: {
    key: 'banani',
    name: 'Banani Executive Suite',
    tagline: 'Private Practice · In-House 3D CBCT · Zero-Wait VIP',
    kicker: 'Banani Road 11 · Private Suite',
    liveBadge: '27s 4K Tour · Banani VIP Suite',
    videoSrc: '/assets/videos/banani-suite.mp4',
    poster: '/assets/branches/banani/reception.webp',
    addressTitle: 'House 82, Road 11, Block D, Banani',
    addressSub:
      'In-house 3D CBCT, computer-guided implants, apex locators & private VIP operatory suite.',
    phone: BRANCHES.banani.phone,
    phoneDisplay: BRANCHES.banani.phoneDisplay,
    whatsapp: BRANCHES.banani.whatsapp,
    mapLink: BRANCHES.banani.mapLink,
    badgeColor: '#e5b869',
    quickFacts: ['In-House 3D CBCT', 'Basement & Valet Parking', '1 Patient at a Time'],
  },
  banasree: {
    key: 'banasree',
    name: 'Banasree Flagship Hospital',
    tagline: 'Multidisciplinary Center · Carl Zeiss Microscope · 3 OTs',
    kicker: 'Banasree Block C · Main Hospital',
    liveBadge: 'Full Hospital Tour · Banasree Flagship',
    videoSrc: '/assets/videos/hero.mp4',
    poster: '/assets/branches/banasree/reception.webp',
    addressTitle: 'House 20, Road 2, Block C, Banasree, Rampura',
    addressSub:
      'Carl Zeiss dental operating microscopes, 3 sterile surgery OTs, Class-B autoclaves & family care.',
    phone: BRANCHES.banasree.phone,
    phoneDisplay: BRANCHES.banasree.phoneDisplay,
    whatsapp: BRANCHES.banasree.whatsapp,
    mapLink: BRANCHES.banasree.mapLink,
    badgeColor: '#38bdf8',
    quickFacts: ['Carl Zeiss Microscope', '3 Surgery OTs', 'Front Parking'],
  },
};

const ACTION_STEPS: Record<BranchKey, ActionStep[]> = {
  banani: [
    {
      id: 'banani-arrival',
      stepNumber: '01',
      badge: 'Discrete Arrival',
      title: 'Executive Reception & Zero-Wait Lobby',
      subtitle:
        'Arrive discretely on Road 11 with secure basement parking and direct lift access straight into our private uncrowded VIP lounge.',
      image: '/assets/branches/banani/reception.webp',
      alt: 'RH Dental Care Banani Road 11 executive reception lounge',
      features: ['🚗 Reserved Basement Parking', '🛡️ 100% Patient Privacy', '⏱️ Zero Waiting Time'],
      actionLabel: 'Book VIP Arrival',
      actionWaText:
        'Hello RH Dental Care, I would like to book a private VIP appointment at your Banani Road 11 Suite.',
    },
    {
      id: 'banani-consultation',
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
      id: 'banani-surgery',
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
      id: 'banani-recovery',
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
  ],

  banasree: [
    {
      id: 'banasree-arrival',
      stepNumber: '01',
      badge: 'Central Arrival',
      title: 'Spacious Reception & Triage Lounge',
      subtitle:
        'Warm, patient-friendly reception on Main Road, Block C Banasree with designated registration and a comfortable family waiting area.',
      image: '/assets/branches/banasree/reception.webp',
      alt: 'RH Dental Care Banasree reception and triage lounge',
      features: [
        '🏢 Main Road Block C Location',
        '👨‍👩‍👧 Family-Friendly Lounge',
        '📋 Swift Digital Registration',
      ],
      actionLabel: 'Book at Banasree',
      actionWaText:
        'Hello RH Dental Care, I would like to book an appointment at your Banasree Flagship Hospital.',
    },
    {
      id: 'banasree-microscope',
      stepNumber: '02',
      badge: 'Microscopic Tech',
      title: 'Carl Zeiss Microscopic Operatory Suite',
      subtitle:
        'Specialized in high-magnification endodontics and single-visit root canal treatments saving natural teeth with pinpoint accuracy.',
      image: '/assets/branches/banasree/microscope.webp',
      alt: 'Carl Zeiss dental operating microscope at RH Dental Care Banasree',
      features: [
        '🔬 Carl Zeiss Optical Magnification',
        '⚡ Single-Visit Root Canals',
        '🦷 Maximum Tooth Structure Saved',
      ],
      actionLabel: 'Consult on Root Canal',
      actionWaText:
        'Hello RH Dental Care, I am inquiring about microscopic root canal treatment at your Banasree Center.',
    },
    {
      id: 'banasree-surgery',
      stepNumber: '03',
      badge: 'Sterile Theatre',
      title: 'Dedicated Oral Surgery & Implant OT',
      subtitle:
        'Class-B hospital-grade sterilization protocols with advanced surgical operatory chairs for implants, wisdom tooth extractions, and bone grafting.',
      image: '/assets/branches/banasree/surgical-room.webp',
      alt: 'Banasree dedicated surgical operating theatre and dental implant suite',
      features: [
        '🏥 3 Dedicated Surgical OTs',
        '🛡️ Class-B Vacuum Autoclaves',
        '🦷 Swiss & Korean Implants',
      ],
      actionLabel: 'Explore Implant Care',
      actionWaText:
        'Hello RH Dental Care, I would like to discuss dental implant or oral surgery at your Banasree Center.',
    },
    {
      id: 'banasree-recovery',
      stepNumber: '04',
      badge: 'Patient Care',
      title: 'VIP Consultation & Post-Op Recovery Wing',
      subtitle:
        'Dedicated recovery rooms and child-friendly dental zones where patients relax with personalized post-treatment care and medication guidance.',
      image: '/assets/branches/banasree/waiting.webp',
      alt: 'Banasree VIP waiting and recovery lounge',
      features: [
        '☕ Relaxing Patient Lounge',
        '🧸 Child-Friendly Atmosphere',
        '💊 Comprehensive Post-Op Care',
      ],
      actionLabel: 'Reserve Consultation',
      actionWaText:
        'Hello RH Dental Care, I would like to reserve a consultation slot at your Banasree hospital.',
    },
  ],
};

export default function BananiLuxuryShowcase() {
  const [activeJourneyBranch, setActiveJourneyBranch] = useState<BranchKey>('banani');

  // Video 1 (Banani)
  const videoBananiRef = useRef<HTMLVideoElement>(null);
  const [isBananiPlaying, setIsBananiPlaying] = useState(true);
  const [isBananiMuted, setIsBananiMuted] = useState(true);

  // Video 2 (Banasree)
  const videoBanasreeRef = useRef<HTMLVideoElement>(null);
  const [isBanasreePlaying, setIsBanasreePlaying] = useState(true);
  const [isBanasreeMuted, setIsBanasreeMuted] = useState(true);

  // Lightbox
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  // 3D Tilt State
  const [bananiTilt, setBananiTilt] = useState<React.CSSProperties>({});
  const [banasreeTilt, setBanasreeTilt] = useState<React.CSSProperties>({});

  const cardBananiRef = useRef<HTMLDivElement>(null);
  const cardBanasreeRef = useRef<HTMLDivElement>(null);

  const toggleBananiPlay = () => {
    if (!videoBananiRef.current) return;
    if (isBananiPlaying) {
      videoBananiRef.current.pause();
      setIsBananiPlaying(false);
    } else {
      videoBananiRef.current.play();
      setIsBananiPlaying(true);
    }
  };

  const toggleBananiMute = () => {
    if (!videoBananiRef.current) return;
    const next = !isBananiMuted;
    videoBananiRef.current.muted = next;
    setIsBananiMuted(next);
  };

  const toggleBananiFullscreen = () => {
    if (!cardBananiRef.current) return;
    if (!document.fullscreenElement) {
      cardBananiRef.current.requestFullscreen?.().catch(() => {});
    } else {
      document.exitFullscreen?.().catch(() => {});
    }
  };

  const toggleBanasreePlay = () => {
    if (!videoBanasreeRef.current) return;
    if (isBanasreePlaying) {
      videoBanasreeRef.current.pause();
      setIsBanasreePlaying(false);
    } else {
      videoBanasreeRef.current.play();
      setIsBanasreePlaying(true);
    }
  };

  const toggleBanasreeMute = () => {
    if (!videoBanasreeRef.current) return;
    const next = !isBanasreeMuted;
    videoBanasreeRef.current.muted = next;
    setIsBanasreeMuted(next);
  };

  const toggleBanasreeFullscreen = () => {
    if (!cardBanasreeRef.current) return;
    if (!document.fullscreenElement) {
      cardBanasreeRef.current.requestFullscreen?.().catch(() => {});
    } else {
      document.exitFullscreen?.().catch(() => {});
    }
  };

  // 3D Parallax on mouse move
  const handleCardMouseMove = (
    e: React.MouseEvent<HTMLDivElement>,
    ref: React.RefObject<HTMLDivElement | null>,
    setter: React.Dispatch<React.SetStateAction<React.CSSProperties>>,
  ) => {
    if (!ref.current || window.innerWidth < 1024) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    const rotX = -y * 8;
    const rotY = x * 8;
    setter({
      transform: `perspective(1200px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) translateZ(8px)`,
      transition: 'transform 0.1s ease-out',
    });
  };

  const handleCardMouseLeave = (
    setter: React.Dispatch<React.SetStateAction<React.CSSProperties>>,
  ) => {
    setter({
      transform: 'perspective(1200px) rotateX(0deg) rotateY(0deg) translateZ(0px)',
      transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
    });
  };

  const currentJourneySteps = ACTION_STEPS[activeJourneyBranch];

  const closeLightbox = useCallback(() => {
    setActiveLightboxIndex(null);
  }, []);

  const nextLightbox = useCallback(() => {
    setActiveLightboxIndex((prevIdx) => {
      if (prevIdx === null) return null;
      return (prevIdx + 1) % currentJourneySteps.length;
    });
  }, [currentJourneySteps.length]);

  const prevLightbox = useCallback(() => {
    setActiveLightboxIndex((prevIdx) => {
      if (prevIdx === null) return null;
      return (prevIdx - 1 + currentJourneySteps.length) % currentJourneySteps.length;
    });
  }, [currentJourneySteps.length]);

  useEffect(() => {
    if (activeLightboxIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextLightbox();
      if (e.key === 'ArrowLeft') prevLightbox();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeLightboxIndex, closeLightbox, nextLightbox, prevLightbox]);

  return (
    <section
      className="banani-action-section dual-cinema-showcase"
      id="flagship-cinema-showcase"
      aria-labelledby="flagship-showcase-heading"
    >
      {/* 3D Ambient project auras */}
      <div className="cinema-ambient-glow glow-banani" style={{ left: '25%' }} />
      <div className="cinema-ambient-glow glow-banasree" style={{ left: '75%' }} />

      <div className="banani-action-container">
        {/* Section Header */}
        <div className="banani-action-header">
          <div className="banani-prestige-pill">
            <Sparkles size={14} className="pill-sparkle" />
            <span>Dual-Flagship Cinematic Showcase · Banani &amp; Banasree</span>
            <span className="live-dot" />
          </div>

          <h2 id="flagship-showcase-heading" className="banani-action-title">
            Experience Both Our Flagships <span className="gold-shimmer">In Action</span>
          </h2>

          <p className="banani-action-lead">
            Explore Dhaka’s two premier dental destinations side-by-side. From our appointment-only
            executive suite in Banani to our comprehensive multi-OT hospital in Banasree — witness
            the standard of care before your first visit.
          </p>
        </div>

        {/* DUAL 3D CINEMA THEATERS (Side-by-side on desktop, stacked on mobile) */}
        <div className="dual-cinema-grid">
          {/* THEATER 1: BANANI ROAD 11 SUITE */}
          <div
            className="cinema-col-theater"
            onMouseMove={(e) => handleCardMouseMove(e, cardBananiRef, setBananiTilt)}
            onMouseLeave={() => handleCardMouseLeave(setBananiTilt)}
          >
            <div className="theater-label-bar">
              <span className="theater-badge gold">
                <Sparkles size={13} />
                <span>Banani Road 11 · Private Suite</span>
              </span>
              <span className="theater-sub-spec">In-House 3D CBCT · Zero-Wait</span>
            </div>

            <div className="banani-cinema-card card-banani" ref={cardBananiRef} style={bananiTilt}>
              <div className="cinema-lens-flare" />
              <div className="cinema-media-frame">
                <video
                  ref={videoBananiRef}
                  className="cinema-video"
                  src={CINEMA_SCREENS.banani.videoSrc}
                  poster={CINEMA_SCREENS.banani.poster}
                  autoPlay
                  loop
                  muted={isBananiMuted}
                  playsInline
                  preload="metadata"
                  aria-label="Banani Road 11 executive suite video tour"
                />

                <div className="cinema-top-badges">
                  <div className="cinema-live-badge">
                    <span className="cinema-radar" />
                    <span>27s 4K Tour · Banani</span>
                  </div>
                </div>

                <div className="cinema-controls">
                  <button
                    type="button"
                    className="cinema-btn"
                    onClick={toggleBananiPlay}
                    aria-label={isBananiPlaying ? 'Pause Banani video' : 'Play Banani video'}
                    title={isBananiPlaying ? 'Pause' : 'Play'}
                  >
                    {isBananiPlaying ? <Pause size={17} /> : <Play size={17} fill="white" />}
                  </button>
                  <button
                    type="button"
                    className="cinema-btn"
                    onClick={toggleBananiMute}
                    aria-label={isBananiMuted ? 'Unmute Banani video' : 'Mute Banani video'}
                    title={isBananiMuted ? 'Unmute' : 'Mute'}
                  >
                    {isBananiMuted ? <VolumeX size={17} /> : <Volume2 size={17} />}
                  </button>
                  <button
                    type="button"
                    className="cinema-btn"
                    onClick={toggleBananiFullscreen}
                    aria-label="Fullscreen Banani video"
                    title="Fullscreen"
                  >
                    <Maximize2 size={17} />
                  </button>
                </div>

                <div className="cinema-bottom-overlay">
                  <div className="cinema-info">
                    <span className="cinema-tag">Private Practice</span>
                    <h3 className="cinema-title">{CINEMA_SCREENS.banani.addressTitle}</h3>
                    <p className="cinema-sub">{CINEMA_SCREENS.banani.addressSub}</p>
                  </div>

                  <div className="cinema-action-pills">
                    <a
                      href={`tel:${CINEMA_SCREENS.banani.phone}`}
                      className="cinema-pill-call"
                      aria-label="Call Banani Suite"
                    >
                      <Phone size={14} />
                      <span>{CINEMA_SCREENS.banani.phoneDisplay}</span>
                    </a>
                    <a
                      href={`https://wa.me/${CINEMA_SCREENS.banani.whatsapp}?text=${encodeURIComponent(
                        'Hello RH Dental Care, I would like to book a private VIP appointment at your Banani Suite.',
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cinema-pill-wa"
                      aria-label="WhatsApp Banani Concierge"
                    >
                      <MessageCircle size={15} />
                      <span>WhatsApp VIP</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* THEATER 2: BANASREE BLOCK C FLAGSHIP HOSPITAL */}
          <div
            className="cinema-col-theater"
            onMouseMove={(e) => handleCardMouseMove(e, cardBanasreeRef, setBanasreeTilt)}
            onMouseLeave={() => handleCardMouseLeave(setBanasreeTilt)}
          >
            <div className="theater-label-bar">
              <span className="theater-badge blue">
                <Stethoscope size={13} />
                <span>Banasree Block C · Main Hospital</span>
              </span>
              <span className="theater-sub-spec">Carl Zeiss Microscope · 3 OTs</span>
            </div>

            <div
              className="banani-cinema-card card-banasree"
              ref={cardBanasreeRef}
              style={banasreeTilt}
            >
              <div className="cinema-lens-flare" />
              <div className="cinema-media-frame">
                <video
                  ref={videoBanasreeRef}
                  className="cinema-video"
                  src={CINEMA_SCREENS.banasree.videoSrc}
                  poster={CINEMA_SCREENS.banasree.poster}
                  autoPlay
                  loop
                  muted={isBanasreeMuted}
                  playsInline
                  preload="metadata"
                  aria-label="Banasree Block C flagship hospital video tour"
                />

                <div className="cinema-top-badges">
                  <div className="cinema-live-badge blue-glow">
                    <span className="cinema-radar green" />
                    <span>Hospital Tour · Banasree</span>
                  </div>
                </div>

                <div className="cinema-controls">
                  <button
                    type="button"
                    className="cinema-btn"
                    onClick={toggleBanasreePlay}
                    aria-label={isBanasreePlaying ? 'Pause Banasree video' : 'Play Banasree video'}
                    title={isBanasreePlaying ? 'Pause' : 'Play'}
                  >
                    {isBanasreePlaying ? <Pause size={17} /> : <Play size={17} fill="white" />}
                  </button>
                  <button
                    type="button"
                    className="cinema-btn"
                    onClick={toggleBanasreeMute}
                    aria-label={isBanasreeMuted ? 'Unmute Banasree video' : 'Mute Banasree video'}
                    title={isBanasreeMuted ? 'Unmute' : 'Mute'}
                  >
                    {isBanasreeMuted ? <VolumeX size={17} /> : <Volume2 size={17} />}
                  </button>
                  <button
                    type="button"
                    className="cinema-btn"
                    onClick={toggleBanasreeFullscreen}
                    aria-label="Fullscreen Banasree video"
                    title="Fullscreen"
                  >
                    <Maximize2 size={17} />
                  </button>
                </div>

                <div className="cinema-bottom-overlay">
                  <div className="cinema-info">
                    <span className="cinema-tag blue">Multidisciplinary Center</span>
                    <h3 className="cinema-title">{CINEMA_SCREENS.banasree.addressTitle}</h3>
                    <p className="cinema-sub">{CINEMA_SCREENS.banasree.addressSub}</p>
                  </div>

                  <div className="cinema-action-pills">
                    <a
                      href={`tel:${CINEMA_SCREENS.banasree.phone}`}
                      className="cinema-pill-call"
                      aria-label="Call Banasree Hospital"
                    >
                      <Phone size={14} />
                      <span>{CINEMA_SCREENS.banasree.phoneDisplay}</span>
                    </a>
                    <a
                      href={`https://wa.me/${CINEMA_SCREENS.banasree.whatsapp}?text=${encodeURIComponent(
                        'Hello RH Dental Care, I would like to book an appointment at your Banasree Hospital.',
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cinema-pill-wa"
                      aria-label="WhatsApp Banasree Concierge"
                    >
                      <MessageCircle size={15} />
                      <span>WhatsApp Hospital</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action-Based 4-Step Patient Journey Header & Branch Toggle */}
        <div className="banani-journey-header">
          <div className="journey-title-wrap">
            <span className="journey-eyebrow">Interactive Patient Journey</span>
            <h3 className="journey-heading">
              Step Inside Our Clinical Suites (
              {activeJourneyBranch === 'banani' ? 'Banani Road 11' : 'Banasree Block C'})
            </h3>
          </div>

          {/* Toggle between Banani and Banasree Action Steps */}
          <div
            className="journey-branch-tabs"
            role="tablist"
            aria-label="Select Patient Journey Branch"
          >
            <button
              type="button"
              role="tab"
              aria-selected={activeJourneyBranch === 'banani'}
              className={`journey-tab ${activeJourneyBranch === 'banani' ? 'active' : ''}`}
              onClick={() => setActiveJourneyBranch('banani')}
            >
              <Sparkles size={14} />
              <span>Banani VIP Suite (4 Steps)</span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeJourneyBranch === 'banasree'}
              className={`journey-tab ${activeJourneyBranch === 'banasree' ? 'active' : ''}`}
              onClick={() => setActiveJourneyBranch('banasree')}
            >
              <Building2 size={14} />
              <span>Banasree Hospital (4 Steps)</span>
            </button>
          </div>
        </div>

        {/* 4-Column Action Grid with 3D Depth */}
        <div className="banani-action-grid">
          {currentJourneySteps.map((step, idx) => (
            <div
              key={step.id}
              className="action-card"
              onClick={() => setActiveLightboxIndex(idx)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && setActiveLightboxIndex(idx)}
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

                <div className="action-step-badge">
                  <span className="step-num">{step.stepNumber}</span>
                  <span className="step-tag-text">{step.badge}</span>
                </div>

                <div className="action-zoom-cue">
                  <ZoomIn size={16} />
                  <span>Inspect Suite</span>
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
                    href={`https://wa.me/${CINEMA_SCREENS[activeJourneyBranch].whatsapp}?text=${encodeURIComponent(
                      step.actionWaText,
                    )}`}
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

        {/* Lead Doctor & Clinical Assurance Ribbon */}
        <div className="banani-trust-ribbon">
          <div className="trust-doctor-profile">
            <div className="doctor-monogram">
              <Award size={24} />
            </div>
            <div className="doctor-meta">
              <span className="doctor-badge">Clinical Leadership · Banani &amp; Banasree</span>
              <h4 className="doctor-title">Dr. B.M. Rafiqul Hasan Mehedi &amp; Specialist Team</h4>
              <p className="doctor-creds">
                Oral &amp; Dental Surgeon (BSMMU PGT) · Certified Implantologist ·{' '}
                <strong>BMDC Reg: 5169</strong>
              </p>
            </div>
          </div>

          <div className="trust-actions">
            <a href={`tel:${BRANCHES.banani.phone}`} className="trust-btn-call">
              <Phone size={15} />
              <span>Banani: {BRANCHES.banani.phoneDisplay}</span>
            </a>
            <a href={`tel:${BRANCHES.banasree.phone}`} className="trust-btn-call blue">
              <Phone size={15} />
              <span>Banasree: {BRANCHES.banasree.phoneDisplay}</span>
            </a>
          </div>
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
                src={currentJourneySteps[activeLightboxIndex].image}
                alt={currentJourneySteps[activeLightboxIndex].alt}
                fill
                sizes="(max-width: 1200px) 95vw, 1100px"
                className="lightbox-img"
                priority
              />
            </div>

            <div className="lightbox-details">
              <div className="lightbox-step-pill">
                Step {currentJourneySteps[activeLightboxIndex].stepNumber} ·{' '}
                {currentJourneySteps[activeLightboxIndex].badge} ·{' '}
                {activeJourneyBranch === 'banani' ? 'Banani VIP Suite' : 'Banasree Flagship'}
              </div>
              <h3 className="lightbox-title">{currentJourneySteps[activeLightboxIndex].title}</h3>
              <p className="lightbox-desc">{currentJourneySteps[activeLightboxIndex].subtitle}</p>

              <div className="lightbox-actions-row">
                <a
                  href={`https://wa.me/${CINEMA_SCREENS[activeJourneyBranch].whatsapp}?text=${encodeURIComponent(
                    currentJourneySteps[activeLightboxIndex].actionWaText,
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="lightbox-btn-wa"
                >
                  <MessageCircle size={18} />
                  <span>Book for This Procedure via WhatsApp</span>
                </a>
                <a
                  href={`tel:${CINEMA_SCREENS[activeJourneyBranch].phone}`}
                  className="lightbox-btn-call"
                >
                  <Phone size={17} />
                  <span>Call {CINEMA_SCREENS[activeJourneyBranch].phoneDisplay}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
