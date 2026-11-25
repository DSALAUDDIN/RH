'use client';

import React, { useState, useRef, useCallback } from 'react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Phone,
  MessageCircle,
  Sparkles,
  Car,
  Scan,
  ShieldCheck,
} from 'lucide-react';
import { BRANCHES } from '@/lib/branches';
import './BananiLuxuryShowcase.css';

export default function BananiLuxuryShowcase() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [cardTilt, setCardTilt] = useState<React.CSSProperties>({});

  const videoRef = useRef<HTMLVideoElement>(null);
  const theaterRef = useRef<HTMLDivElement>(null);

  const videoSrc = '/assets/videos/banani-suite.mp4';
  const poster = '/assets/branches/banani/reception.webp';

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
      className="cinema-showcase-section banani-vip-theater-section"
      id="banani-vip-showcase"
      aria-labelledby="banani-vip-title"
    >
      {/* Ambient glowing gold projection aura */}
      <div className="cinema-ambient-aura aura-gold" />

      <div className="cinema-container">
        {/* Section Header */}
        <div className="cinema-header">
          <div className="cinema-pill gold">
            <Sparkles size={14} className="pill-icon gold" />
            <span>Banani Road 11 · Private VIP Practice</span>
            <span className="live-pulse gold" />
          </div>

          <h2 id="banani-vip-title" className="cinema-title">
            Step Inside Our <span className="gold-shimmer">Banani VIP Suite</span>
          </h2>

          <p className="cinema-lead">
            Dhaka’s premier appointment-only dental destination. Experience discrete 1-on-1
            consultations with Dr. Hasan Mehedi (BMDC 5169), on-site 3D CBCT diagnostics, and zero
            waiting time.
          </p>
        </div>

        {/* 3D Masterpiece Cinema Theater */}
        <div
          className="cinema-theater-frame frame-gold"
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
            className="theater-video"
            src={videoSrc}
            poster={poster}
            autoPlay
            loop
            muted={isMuted}
            playsInline
            preload="metadata"
            aria-label="Banani Road 11 VIP Executive Suite 4K video tour"
          />

          {/* Top Info Badge */}
          <div className="theater-top-badge-bar" onClick={(e) => e.stopPropagation()}>
            <div className="theater-tour-badge gold">
              <span className="radar-indicator gold" />
              <span>27s 4K Video Tour · Banani Suite</span>
            </div>
          </div>

          {/* Center Play/Pause Overlay Cue */}
          {!isPlaying && (
            <div className="theater-play-cue" onClick={(e) => togglePlay(e)}>
              <div className="play-circle-glow gold">
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
              <span className="theater-kicker gold">
                Private Practice · House 82, Road 11, Banani
              </span>
              <h3 className="theater-location-title">Executive Operatory &amp; 3D CBCT Suite</h3>
              <p className="theater-location-sub">
                In-house 3D CBCT tomography, computer-guided implants, reserved basement parking,
                and strict 1-patient-at-a-time scheduling.
              </p>
            </div>

            <div className="theater-scrim-actions">
              <a
                href={`https://wa.me/${BRANCHES.banani.whatsapp}?text=${encodeURIComponent(
                  'Hello RH Dental Care, I would like to book a private VIP appointment at your Banani Road 11 Suite.',
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="theater-action-btn primary gold"
                aria-label="Book VIP appointment at Banani via WhatsApp"
              >
                <MessageCircle size={16} />
                <span>Book VIP Suite</span>
              </a>

              <a
                href={`tel:${BRANCHES.banani.phone}`}
                className="theater-action-btn secondary"
                aria-label="Call Banani branch"
              >
                <Phone size={14} />
                <span>{BRANCHES.banani.phoneDisplay}</span>
              </a>
            </div>
          </div>
        </div>

        {/* 3 Key Luxury Features Strip */}
        <div className="cinema-features-strip">
          <div className="feature-pill-item">
            <Scan size={15} className="feature-pill-icon gold" />
            <span>In-House 3D CBCT Diagnostics</span>
          </div>
          <div className="feature-pill-item">
            <Car size={15} className="feature-pill-icon gold" />
            <span>Dedicated Basement &amp; Valet Parking</span>
          </div>
          <div className="feature-pill-item">
            <ShieldCheck size={15} className="feature-pill-icon gold" />
            <span>1 Patient at a Time · Zero Waiting</span>
          </div>
        </div>
      </div>
    </section>
  );
}
