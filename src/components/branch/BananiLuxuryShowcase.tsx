'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Phone,
  MessageCircle,
  Sparkles,
  Building2,
  CheckCircle2,
  ChevronRight,
} from 'lucide-react';
import { BRANCHES } from '@/lib/branches';
import './BananiLuxuryShowcase.css';

export type BranchKey = 'banani' | 'banasree';

interface BranchCinemaData {
  key: BranchKey;
  tabLabel: string;
  tabSubtitle: string;
  kicker: string;
  title: string;
  badgeText: string;
  badgeType: 'gold' | 'blue';
  videoSrc: string;
  poster: string;
  addressTitle: string;
  addressSub: string;
  phone: string;
  phoneDisplay: string;
  whatsapp: string;
  whatsappGreeting: string;
  features: string[];
}

const CINEMA_BRANCHES: Record<BranchKey, BranchCinemaData> = {
  banani: {
    key: 'banani',
    tabLabel: 'Banani Road 11 Suite',
    tabSubtitle: 'Private VIP Practice · 4K Tour',
    kicker: 'Banani Road 11 · Appointment-Only Private Suite',
    title: 'Executive VIP Suite & 3D CBCT Center',
    badgeText: '27s 4K Video Tour · Banani Suite',
    badgeType: 'gold',
    videoSrc: '/assets/videos/banani-suite.mp4',
    poster: '/assets/branches/banani/reception.webp',
    addressTitle: 'House 82, Road 11, Block D, Banani',
    addressSub:
      'In-house 3D CBCT, computer-guided implants, apex locators & private VIP operatory suite.',
    phone: BRANCHES.banani.phone,
    phoneDisplay: BRANCHES.banani.phoneDisplay,
    whatsapp: BRANCHES.banani.whatsapp,
    whatsappGreeting:
      'Hello RH Dental Care, I would like to book a private VIP appointment at your Banani Road 11 Suite.',
    features: [
      'In-House 3D CBCT Tomography',
      'Dedicated Basement & Valet Parking',
      '1 Patient at a Time · Zero Waiting',
    ],
  },
  banasree: {
    key: 'banasree',
    tabLabel: 'Banasree Flagship Hospital',
    tabSubtitle: 'Multidisciplinary Hospital · Full Tour',
    kicker: 'Banasree Block C · Multidisciplinary Hospital',
    title: 'Carl Zeiss Microscopic Center & 3 OTs',
    badgeText: 'Hospital Walkthrough · Banasree Flagship',
    badgeType: 'blue',
    videoSrc: '/assets/videos/hero.mp4',
    poster: '/assets/branches/banasree/reception.webp',
    addressTitle: 'House 20, Road 2, Block C, Banasree, Rampura',
    addressSub:
      'Carl Zeiss dental operating microscopes, 3 sterile surgery OTs, Class-B autoclaves & family care.',
    phone: BRANCHES.banasree.phone,
    phoneDisplay: BRANCHES.banasree.phoneDisplay,
    whatsapp: BRANCHES.banasree.whatsapp,
    whatsappGreeting:
      'Hello RH Dental Care, I would like to book an appointment at your Banasree Flagship Hospital.',
    features: [
      'Carl Zeiss Dental Operating Microscope',
      '3 Sterile Surgical Operating Theatres',
      'Class-B Autoclaves & Family Dental Wing',
    ],
  },
};

export default function BananiLuxuryShowcase() {
  const [activeBranch, setActiveBranch] = useState<BranchKey>('banani');
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [cardTilt, setCardTilt] = useState<React.CSSProperties>({});

  const videoRef = useRef<HTMLVideoElement>(null);
  const theaterRef = useRef<HTMLDivElement>(null);

  const current = CINEMA_BRANCHES[activeBranch];

  // Switch video source when branch changes and restart autoplay
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.currentTime = 0;
    v.play()
      .then(() => setIsPlaying(true))
      .catch(() => setIsPlaying(false));
  }, [activeBranch]);

  const togglePlay = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    } else {
      v.pause();
      setIsPlaying(false);
    }
  }, []);

  const toggleMute = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setIsMuted(v.muted);
  }, []);

  const toggleFullscreen = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    const el = theaterRef.current;
    if (!el) return;
    if (!document.fullscreenElement) {
      el.requestFullscreen?.().catch(() => {});
    } else {
      document.exitFullscreen?.().catch(() => {});
    }
  }, []);

  // 3D Parallax on mouse move
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!theaterRef.current || window.innerWidth < 1024) return;
    const rect = theaterRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    const rotX = -y * 6;
    const rotY = x * 6;
    setCardTilt({
      transform: `perspective(1400px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) translateZ(6px)`,
      transition: 'transform 0.1s ease-out',
    });
  };

  const handleMouseLeave = () => {
    setCardTilt({
      transform: 'perspective(1400px) rotateX(0deg) rotateY(0deg) translateZ(0px)',
      transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
    });
  };

  return (
    <section
      className="cinema-showcase-section"
      id="clinic-video-showcase"
      aria-labelledby="cinema-showcase-title"
    >
      {/* Dynamic ambient backlight aura */}
      <div
        className={`cinema-ambient-aura ${activeBranch === 'banani' ? 'aura-gold' : 'aura-blue'}`}
      />

      <div className="cinema-container">
        {/* Section Header */}
        <div className="cinema-header">
          <div className="cinema-pill">
            <Sparkles size={14} className="pill-icon" />
            <span>Cinematic Clinic Showcase</span>
            <span className="live-pulse" />
          </div>

          <h2 id="cinema-showcase-title" className="cinema-title">
            Step Inside Our <span className="gold-shimmer">Clinical Suites</span>
          </h2>

          <p className="cinema-lead">
            Experience Dhaka’s highest standard of dental care in motion. Switch seamlessly between
            our appointment-only Banani VIP Suite and our comprehensive Banasree Flagship Hospital.
          </p>

          {/* Interactive Branch Switcher Tabs */}
          <div
            className="cinema-switcher-wrapper"
            role="tablist"
            aria-label="Select Clinical Branch Video"
          >
            <button
              type="button"
              role="tab"
              aria-selected={activeBranch === 'banani'}
              className={`cinema-tab-btn banani ${activeBranch === 'banani' ? 'active' : ''}`}
              onClick={() => setActiveBranch('banani')}
            >
              <Sparkles size={16} className="tab-icon" />
              <div className="tab-meta">
                <span className="tab-name">{CINEMA_BRANCHES.banani.tabLabel}</span>
                <span className="tab-desc">{CINEMA_BRANCHES.banani.tabSubtitle}</span>
              </div>
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={activeBranch === 'banasree'}
              className={`cinema-tab-btn banasree ${activeBranch === 'banasree' ? 'active' : ''}`}
              onClick={() => setActiveBranch('banasree')}
            >
              <Building2 size={16} className="tab-icon" />
              <div className="tab-meta">
                <span className="tab-name">{CINEMA_BRANCHES.banasree.tabLabel}</span>
                <span className="tab-desc">{CINEMA_BRANCHES.banasree.tabSubtitle}</span>
              </div>
            </button>
          </div>
        </div>

        {/* 3D Masterpiece Cinema Theater */}
        <div
          className={`cinema-theater-frame ${activeBranch === 'banani' ? 'frame-gold' : 'frame-blue'}`}
          ref={theaterRef}
          style={cardTilt}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onClick={() => togglePlay()}
        >
          {/* Top specular lens flare reflection */}
          <div className="theater-lens-flare" />

          {/* Video Element */}
          <video
            ref={videoRef}
            key={current.videoSrc}
            className="theater-video"
            src={current.videoSrc}
            poster={current.poster}
            autoPlay
            loop
            muted={isMuted}
            playsInline
            preload="metadata"
            aria-label={`${current.title} video tour`}
          />

          {/* Top Info Badge */}
          <div className="theater-top-badge-bar" onClick={(e) => e.stopPropagation()}>
            <div className={`theater-tour-badge ${current.badgeType}`}>
              <span className={`radar-indicator ${current.badgeType}`} />
              <span>{current.badgeText}</span>
            </div>
          </div>

          {/* Center Play/Pause Overlay Cue */}
          {!isPlaying && (
            <div className="theater-play-cue" onClick={(e) => togglePlay(e)}>
              <div className="play-circle-glow">
                <Play size={36} fill="#ffffff" color="#ffffff" style={{ marginLeft: 3 }} />
              </div>
            </div>
          )}

          {/* Top Right Glass Controls */}
          <div className="theater-controls-cluster" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="theater-ctrl-btn"
              onClick={(e) => togglePlay(e)}
              aria-label={isPlaying ? 'Pause video' : 'Play video'}
              title={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause size={17} /> : <Play size={17} fill="white" />}
            </button>
            <button
              type="button"
              className={`theater-ctrl-btn sound-toggle ${!isMuted ? 'active' : ''}`}
              onClick={(e) => toggleMute(e)}
              aria-label={isMuted ? 'Unmute video sound' : 'Mute video sound'}
              title={isMuted ? 'Click for Sound' : 'Mute'}
            >
              {isMuted ? <VolumeX size={17} /> : <Volume2 size={17} />}
              <span className="ctrl-sound-text">{isMuted ? 'Sound Off' : 'Sound On'}</span>
            </button>
            <button
              type="button"
              className="theater-ctrl-btn"
              onClick={(e) => toggleFullscreen(e)}
              aria-label="Toggle Fullscreen"
              title="Fullscreen"
            >
              <Maximize2 size={17} />
            </button>
          </div>

          {/* Bottom Luxury Overlay */}
          <div className="theater-bottom-scrim" onClick={(e) => e.stopPropagation()}>
            <div className="theater-scrim-info">
              <span className={`theater-kicker ${current.badgeType}`}>{current.kicker}</span>
              <h3 className="theater-location-title">{current.addressTitle}</h3>
              <p className="theater-location-sub">{current.addressSub}</p>
            </div>

            <div className="theater-scrim-actions">
              <a
                href={`https://wa.me/${current.whatsapp}?text=${encodeURIComponent(current.whatsappGreeting)}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`theater-action-btn primary ${current.badgeType}`}
                aria-label={`Book appointment at ${current.tabLabel} via WhatsApp`}
              >
                <MessageCircle size={16} />
                <span>Book Appointment</span>
              </a>

              <a
                href={`tel:${current.phone}`}
                className="theater-action-btn secondary"
                aria-label={`Call ${current.tabLabel}`}
              >
                <Phone size={14} />
                <span>{current.phoneDisplay}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Dynamic Branch Features Pill Strip */}
        <div className="cinema-features-strip">
          {current.features.map((feat) => (
            <div key={feat} className="feature-pill-item">
              <CheckCircle2 size={15} className={`feature-pill-icon ${current.badgeType}`} />
              <span>{feat}</span>
            </div>
          ))}
        </div>

        {/* Transition Hint to Clinic Gallery */}
        <div className="gallery-transition-hint">
          <span>Explore our interior spaces &amp; clinical sterilization below</span>
          <ChevronRight size={14} />
        </div>
      </div>
    </section>
  );
}
