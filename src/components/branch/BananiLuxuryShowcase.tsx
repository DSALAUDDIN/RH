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
  Building2,
} from 'lucide-react';
import { BRANCHES } from '@/lib/branches';
import { useBranch } from './BranchProvider';
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

interface BranchShowcaseData {
  key: BranchKey;
  name: string;
  tagline: string;
  kicker: string;
  liveBadge: string;
  videoSrc: string;
  poster: string;
  title: string;
  highlightWord: string;
  lead: string;
  addressTitle: string;
  addressSub: string;
  phone: string;
  phoneDisplay: string;
  whatsapp: string;
  mapLink: string;
  quickFacts: { icon: typeof Scan; text: string }[];
  actionSteps: ActionStep[];
  leadDoctor: {
    badge: string;
    name: string;
    creds: string;
    bmdc: string;
  };
  bridge: {
    prompt: string;
    desc: string;
    targetKey: BranchKey;
    targetName: string;
    targetLink: string;
  };
}

const SHOWCASE_DATA: Record<BranchKey, BranchShowcaseData> = {
  banani: {
    key: 'banani',
    name: 'Banani Executive Suite',
    tagline: 'Private Practice · In-House 3D CBCT · Zero-Wait VIP',
    kicker: 'Banani Road 11 · Private Dental Suite',
    liveBadge: '27s 4K Tour · Banani Private Suite',
    videoSrc: '/assets/videos/banani-suite.mp4',
    poster: '/assets/branches/banani/reception.webp',
    title: 'Take an Action Tour of Our',
    highlightWord: 'Banani Executive Suite',
    lead: 'Dhaka’s premier appointment-only dental retreat. From discrete basement parking on Road 11 to in-house 3D CBCT surgical suites — explore what your private dental experience looks like.',
    addressTitle: 'House 82, Road 11, Block D, Banani',
    addressSub:
      'Equipped with in-house 3D CBCT, computer-guided implants, apex locators, intraoral scanners, and VIP suites.',
    phone: BRANCHES.banani.phone,
    phoneDisplay: BRANCHES.banani.phoneDisplay,
    whatsapp: BRANCHES.banani.whatsapp,
    mapLink: BRANCHES.banani.mapLink,
    quickFacts: [
      { icon: Scan, text: 'In-House 3D CBCT' },
      { icon: Car, text: 'Basement & Valet Parking' },
      { icon: ShieldCheck, text: '1 Patient at a Time' },
      { icon: Clock, text: 'Sun–Thu: 3:00 PM – 10:00 PM' },
    ],
    actionSteps: [
      {
        id: 'banani-arrival',
        stepNumber: '01',
        badge: 'Discrete Arrival',
        title: 'Executive Reception & Zero-Wait Lobby',
        subtitle:
          'Arrive discretely on Road 11 with secure basement parking and direct lift access straight into our private uncrowded VIP lounge.',
        image: '/assets/branches/banani/reception.webp',
        alt: 'RH Dental Care Banani Road 11 executive reception lounge',
        features: [
          '🚗 Reserved Basement Parking',
          '🛡️ 100% Patient Privacy',
          '⏱️ Zero Waiting Time',
        ],
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
    leadDoctor: {
      badge: 'Clinical Lead · Banani Private Suite',
      name: 'Dr. B.M. Rafiqul Hasan Mehedi',
      creds: 'Oral & Dental Surgeon (BSMMU PGT) · Certified Implantologist',
      bmdc: '5169',
    },
    bridge: {
      prompt: 'Prefer our Banasree Flagship Hospital?',
      desc: 'Full-service multi-chair hospital in Block C, Banasree. Specialized in Carl Zeiss microscopic root canals, family dental care & pediatric dentistry.',
      targetKey: 'banasree',
      targetName: 'Switch to Banasree Flagship',
      targetLink: '/banasree',
    },
  },

  banasree: {
    key: 'banasree',
    name: 'Banasree Flagship Hospital',
    tagline: 'Multidisciplinary Center · Carl Zeiss Microscope · 3 OTs',
    kicker: 'Banasree Block C · Main Dental Hospital',
    liveBadge: 'Live Flagship Tour · Banasree Center',
    videoSrc:
      'https://res.cloudinary.com/dxrcufs8f/video/upload/v1778516898/Untitled_design_1_1_whreqj.mp4',
    poster: '/assets/branches/banasree/reception.webp',
    title: 'Experience Our Advanced',
    highlightWord: 'Banasree Flagship Hospital',
    lead: 'Our comprehensive multidisciplinary dental hospital in Banasree. Featuring Carl Zeiss surgical microscopes, 3 sterile operating theatres, and family dental suites serving Dhaka since 2014.',
    addressTitle: 'House 20, Road 2, Block C, Banasree, Rampura',
    addressSub:
      'Equipped with Carl Zeiss dental operating microscopes, 3 sterile surgery OTs, Class-B vacuum autoclaves, and dedicated recovery lounge.',
    phone: BRANCHES.banasree.phone,
    phoneDisplay: BRANCHES.banasree.phoneDisplay,
    whatsapp: BRANCHES.banasree.whatsapp,
    mapLink: BRANCHES.banasree.mapLink,
    quickFacts: [
      { icon: Scan, text: 'Carl Zeiss Microscopes' },
      { icon: Car, text: 'Front & Valet Parking' },
      { icon: ShieldCheck, text: '3 Dedicated Surgical OTs' },
      { icon: Clock, text: 'Sat–Wed: 3:30 PM – 10:00 PM (Thu Closed)' },
    ],
    actionSteps: [
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
    leadDoctor: {
      badge: 'Clinical Leadership · Banasree & Banani',
      name: 'Dr. B.M. Rafiqul Hasan Mehedi & Dr. Shimia Sharmin',
      creds: 'Oral & Dental Surgeon & Maxillofacial Specialist Team · Female Dental Care Lead',
      bmdc: '5169',
    },
    bridge: {
      prompt: 'Looking for our Banani Private Suite?',
      desc: 'Appointment-only VIP executive clinic on Road 11, Banani. Featuring on-site 3D CBCT, basement parking, and strict 1-patient-at-a-time privacy.',
      targetKey: 'banani',
      targetName: 'Switch to Banani VIP Suite',
      targetLink: '/banani',
    },
  },
};

export default function BananiLuxuryShowcase() {
  const branchContext = useBranch();
  const initialBranch: BranchKey = branchContext.branch === 'banasree' ? 'banasree' : 'banani';

  const [activeBranchKey, setActiveBranchKey] = useState<BranchKey>(initialBranch);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  /* 3D Tilt State */
  const [tiltStyle, setTiltStyle] = useState<React.CSSProperties>({});
  const videoRef = useRef<HTMLVideoElement>(null);
  const cinemaWrapperRef = useRef<HTMLDivElement>(null);

  const activeBranch = SHOWCASE_DATA[activeBranchKey];

  // Switch branch seamlessly
  const handleSelectBranch = useCallback((key: BranchKey) => {
    setActiveBranchKey(key);
    if (videoRef.current) {
      videoRef.current.src = SHOWCASE_DATA[key].videoSrc;
      videoRef.current.load();
      videoRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  }, []);

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
    if (!cinemaWrapperRef.current) return;
    if (!document.fullscreenElement) {
      cinemaWrapperRef.current.requestFullscreen?.().catch(() => {});
    } else {
      document.exitFullscreen?.().catch(() => {});
    }
  };

  /* 3D Mouse Parallax Effect on the Cinema Theater */
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cinemaWrapperRef.current || window.innerWidth < 1024) return;
    const rect = cinemaWrapperRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    const rotX = -y * 8; // subtle 3D tilt
    const rotY = x * 8;

    setTiltStyle({
      transform: `perspective(1200px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) translateZ(10px)`,
      transition: 'transform 0.1s ease-out',
    });
  };

  const handleMouseLeave = () => {
    setTiltStyle({
      transform: 'perspective(1200px) rotateX(0deg) rotateY(0deg) translateZ(0px)',
      transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
    });
  };

  const openLightbox = (index: number) => {
    setActiveLightboxIndex(index);
  };

  const closeLightbox = useCallback(() => {
    setActiveLightboxIndex(null);
  }, []);

  const nextLightbox = useCallback(() => {
    setActiveLightboxIndex((prevIdx) => {
      if (prevIdx === null) return null;
      return (prevIdx + 1) % activeBranch.actionSteps.length;
    });
  }, [activeBranch.actionSteps.length]);

  const prevLightbox = useCallback(() => {
    setActiveLightboxIndex((prevIdx) => {
      if (prevIdx === null) return null;
      return (prevIdx - 1 + activeBranch.actionSteps.length) % activeBranch.actionSteps.length;
    });
  }, [activeBranch.actionSteps.length]);

  // Keyboard navigation for lightbox
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
      className={`banani-action-section branch-theme-${activeBranchKey}`}
      id="flagship-cinema-showcase"
      aria-labelledby="flagship-showcase-heading"
    >
      {/* Dynamic 3D ambient aura matching active branch */}
      <div className={`cinema-ambient-glow glow-${activeBranchKey}`} />

      <div className="banani-action-container">
        {/* Section Header */}
        <div className="banani-action-header">
          <div className="banani-prestige-pill">
            <Sparkles size={14} className="pill-sparkle" />
            <span>{activeBranch.kicker}</span>
            <span className="live-dot" />
          </div>

          <h2 id="flagship-showcase-heading" className="banani-action-title">
            {activeBranch.title} <span className="gold-shimmer">{activeBranch.highlightWord}</span>
          </h2>

          <p className="banani-action-lead">{activeBranch.lead}</p>

          {/* Dual-Branch Switcher Tabs with 3D Pill Navigation */}
          <div
            className="cinema-branch-switcher"
            role="tablist"
            aria-label="Select Clinic Video Tour"
          >
            <button
              type="button"
              role="tab"
              aria-selected={activeBranchKey === 'banani'}
              className={`cinema-branch-tab ${activeBranchKey === 'banani' ? 'active banani' : ''}`}
              onClick={() => handleSelectBranch('banani')}
            >
              <Sparkles size={16} />
              <div className="tab-text-wrap">
                <span className="tab-title">Banani VIP Suite</span>
                <span className="tab-sub">Road 11 · 3D CBCT</span>
              </div>
              <span className="cinema-tab-badge">27s 4K Tour</span>
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={activeBranchKey === 'banasree'}
              className={`cinema-branch-tab ${activeBranchKey === 'banasree' ? 'active banasree' : ''}`}
              onClick={() => handleSelectBranch('banasree')}
            >
              <Stethoscope size={16} />
              <div className="tab-text-wrap">
                <span className="tab-title">Banasree Flagship</span>
                <span className="tab-sub">Block C · Microscope OTs</span>
              </div>
              <span className="cinema-tab-badge">Hospital Tour</span>
            </button>
          </div>

          {/* Quick Facts Strip for Active Branch */}
          <div className="banani-quick-facts">
            {activeBranch.quickFacts.map((fact, idx) => {
              const IconComp = fact.icon;
              return (
                <React.Fragment key={idx}>
                  {idx > 0 && <div className="fact-divider" />}
                  <div className="fact-item">
                    <IconComp size={16} className="fact-icon" />
                    <span>{fact.text}</span>
                  </div>
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* 3D Cinematic Video Walkthrough Hero */}
        <div
          className="banani-cinema-3d-wrap"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <div
            className={`banani-cinema-card card-${activeBranchKey}`}
            ref={cinemaWrapperRef}
            style={tiltStyle}
          >
            {/* Top metallic flare line */}
            <div className="cinema-lens-flare" />

            <div className="cinema-media-frame">
              <video
                ref={videoRef}
                key={activeBranchKey}
                className="cinema-video"
                src={activeBranch.videoSrc}
                poster={activeBranch.poster}
                autoPlay
                loop
                muted={isMuted}
                playsInline
                preload="metadata"
                aria-label={`${activeBranch.name} live cinematic video walkthrough`}
              />

              {/* Floating Top Badges */}
              <div className="cinema-top-badges">
                <div className="cinema-live-badge">
                  <span className="cinema-radar" />
                  <span>{activeBranch.liveBadge}</span>
                </div>
              </div>

              {/* Floating Custom Controls */}
              <div className="cinema-controls">
                <button
                  type="button"
                  className="cinema-btn"
                  onClick={togglePlay}
                  aria-label={isPlaying ? 'Pause video' : 'Play video'}
                  title={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? <Pause size={18} /> : <Play size={18} fill="white" />}
                </button>
                <button
                  type="button"
                  className="cinema-btn"
                  onClick={toggleMute}
                  aria-label={isMuted ? 'Unmute video' : 'Mute video'}
                  title={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                </button>
                <button
                  type="button"
                  className="cinema-btn"
                  onClick={toggleFullscreen}
                  aria-label="Toggle full screen"
                  title="Fullscreen"
                >
                  <Maximize2 size={18} />
                </button>
              </div>

              {/* Bottom Caption Overlay */}
              <div className="cinema-bottom-overlay">
                <div className="cinema-info">
                  <span className="cinema-tag">{activeBranch.tagline}</span>
                  <h3 className="cinema-title">{activeBranch.addressTitle}</h3>
                  <p className="cinema-sub">{activeBranch.addressSub}</p>
                </div>

                <div className="cinema-action-pills">
                  <a
                    href={`tel:${activeBranch.phone}`}
                    className="cinema-pill-call"
                    aria-label={`Call ${activeBranch.name} at ${activeBranch.phoneDisplay}`}
                  >
                    <Phone size={15} />
                    <span>Call {activeBranch.phoneDisplay}</span>
                  </a>
                  <a
                    href={`https://wa.me/${activeBranch.whatsapp}?text=${encodeURIComponent(
                      `Hello RH Dental Care, I would like to book a consultation at your ${activeBranch.name}.`,
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cinema-pill-wa"
                    aria-label={`WhatsApp ${activeBranch.name} Concierge`}
                  >
                    <MessageCircle size={16} />
                    <span>WhatsApp Concierge</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action-Based 4-Step Patient Journey Grid */}
        <div className="banani-journey-header">
          <div className="journey-title-wrap">
            <span className="journey-eyebrow">Interactive Patient Journey</span>
            <h3 className="journey-heading">
              Your 4-Step VIP Experience at {activeBranchKey === 'banani' ? 'Banani' : 'Banasree'}
            </h3>
          </div>
          <span className="journey-hint">
            Click any step to inspect clinical facilities in high resolution
          </span>
        </div>

        <div className="banani-action-grid">
          {activeBranch.actionSteps.map((step, idx) => (
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

                {/* 3D Zoom indicator on hover */}
                <div className="action-zoom-cue">
                  <ZoomIn size={18} />
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
                    href={`https://wa.me/${activeBranch.whatsapp}?text=${encodeURIComponent(
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

        {/* Lead Doctor & Clinical Assurance Bar */}
        <div className="banani-trust-ribbon">
          <div className="trust-doctor-profile">
            <div className="doctor-monogram">
              <Award size={24} />
            </div>
            <div className="doctor-meta">
              <span className="doctor-badge">{activeBranch.leadDoctor.badge}</span>
              <h4 className="doctor-title">{activeBranch.leadDoctor.name}</h4>
              <p className="doctor-creds">
                {activeBranch.leadDoctor.creds} ·{' '}
                <strong>BMDC Reg: {activeBranch.leadDoctor.bmdc}</strong>
              </p>
            </div>
          </div>

          <div className="trust-actions">
            <a href={`tel:${activeBranch.phone}`} className="trust-btn-call">
              <Phone size={16} />
              <span>Direct Call: {activeBranch.phoneDisplay}</span>
            </a>
            <a
              href={activeBranch.mapLink}
              target="_blank"
              rel="noopener noreferrer"
              className="trust-btn-maps"
            >
              <Compass size={16} />
              <span>Directions on Maps</span>
            </a>
          </div>
        </div>

        {/* Dual Branch Bridge */}
        <div className="banani-hospital-bridge">
          <div className="bridge-icon-wrap">
            {activeBranch.bridge.targetKey === 'banasree' ? (
              <Building2 size={22} />
            ) : (
              <Sparkles size={22} />
            )}
          </div>
          <div className="bridge-info">
            <strong>{activeBranch.bridge.prompt}</strong>
            <p>{activeBranch.bridge.desc}</p>
          </div>
          <button
            type="button"
            onClick={() => handleSelectBranch(activeBranch.bridge.targetKey)}
            className="bridge-cta-btn"
          >
            <span>{activeBranch.bridge.targetName}</span>
            <ArrowRight size={16} />
          </button>
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
                src={activeBranch.actionSteps[activeLightboxIndex].image}
                alt={activeBranch.actionSteps[activeLightboxIndex].alt}
                fill
                sizes="(max-width: 1200px) 95vw, 1100px"
                className="lightbox-img"
                priority
              />
            </div>

            <div className="lightbox-details">
              <div className="lightbox-step-pill">
                Step {activeBranch.actionSteps[activeLightboxIndex].stepNumber} ·{' '}
                {activeBranch.actionSteps[activeLightboxIndex].badge} · {activeBranch.name}
              </div>
              <h3 className="lightbox-title">
                {activeBranch.actionSteps[activeLightboxIndex].title}
              </h3>
              <p className="lightbox-desc">
                {activeBranch.actionSteps[activeLightboxIndex].subtitle}
              </p>

              <div className="lightbox-actions-row">
                <a
                  href={`https://wa.me/${activeBranch.whatsapp}?text=${encodeURIComponent(
                    activeBranch.actionSteps[activeLightboxIndex].actionWaText,
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="lightbox-btn-wa"
                >
                  <MessageCircle size={18} />
                  <span>Book for This Procedure via WhatsApp</span>
                </a>
                <a href={`tel:${activeBranch.phone}`} className="lightbox-btn-call">
                  <Phone size={17} />
                  <span>Call {activeBranch.phoneDisplay}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
