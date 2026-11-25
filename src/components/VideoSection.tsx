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
  Building2,
  CheckCircle2,
  Stethoscope,
  Microscope,
} from 'lucide-react';
import { BRANCHES } from '@/lib/branches';
import './VideoSection.css';

export default function VideoSection() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [cardTilt, setCardTilt] = useState<React.CSSProperties>({});

  const videoRef = useRef<HTMLVideoElement>(null);
  const theaterRef = useRef<HTMLDivElement>(null);

  const videoSrc = '/assets/videos/hero.mp4';
  const poster = '/assets/branches/banasree/reception.webp';

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
      className="cinema-showcase-section banasree-hospital-theater-section"
      id="banasree-hospital-showcase"
      aria-labelledby="banasree-hospital-title"
    >
      {/* Ambient glowing blue projection aura */}
      <div className="cinema-ambient-aura aura-blue" />

      <div className="cinema-container">
        {/* Section Header */}
        <div className="cinema-header">
          <div className="cinema-pill blue">
            <Building2 size={14} className="pill-icon blue" />
            <span>Banasree Block C · Main Flagship Hospital</span>
            <span className="live-pulse green" />
          </div>

          <h2 id="banasree-hospital-title" className="cinema-title">
            Tour Dhaka’s Advanced <span className="blue-shimmer">Dental Hospital</span>
          </h2>

          <p className="cinema-lead">
            Explore our comprehensive multidisciplinary center in Banasree. Equipped with Carl Zeiss
            dental operating microscopes, 3 sterile surgery operating theatres, and complete family
            care.
          </p>
        </div>

        {/* 3D Masterpiece Cinema Theater */}
        <div
          className="cinema-theater-frame frame-blue"
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
            aria-label="Banasree Flagship Dental Hospital full video tour"
          />

          {/* Top Info Badge */}
          <div className="theater-top-badge-bar" onClick={(e) => e.stopPropagation()}>
            <div className="theater-tour-badge blue">
              <span className="radar-indicator blue" />
              <span>Hospital Walkthrough · Banasree Flagship</span>
            </div>
          </div>

          {/* Center Play/Pause Overlay Cue */}
          {!isPlaying && (
            <div className="theater-play-cue" onClick={(e) => togglePlay(e)}>
              <div className="play-circle-glow blue">
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
              <span className="theater-kicker blue">
                Multidisciplinary Center · House 20, Road 2, Block C, Banasree
              </span>
              <h3 className="theater-location-title">
                Carl Zeiss Microscopic Center &amp; 3 Surgery OTs
              </h3>
              <p className="theater-location-sub">
                Single-visit microscopic root canal therapy, hospital-grade Class-B sterilization,
                and dedicated oral surgery suites for complex treatments.
              </p>
            </div>

            <div className="theater-scrim-actions">
              <a
                href={`https://wa.me/${BRANCHES.banasree.whatsapp}?text=${encodeURIComponent(
                  'Hello RH Dental Care, I would like to book an appointment at your Banasree Flagship Hospital.',
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="theater-action-btn primary blue"
                aria-label="Book appointment at Banasree Hospital via WhatsApp"
              >
                <MessageCircle size={16} />
                <span>Book Hospital Visit</span>
              </a>

              <a
                href={`tel:${BRANCHES.banasree.phone}`}
                className="theater-action-btn secondary"
                aria-label="Call Banasree branch"
              >
                <Phone size={14} />
                <span>{BRANCHES.banasree.phoneDisplay}</span>
              </a>
            </div>
          </div>
        </div>

        {/* 3 Key Hospital Features Strip */}
        <div className="cinema-features-strip">
          <div className="feature-pill-item">
            <Microscope size={15} className="feature-pill-icon blue" />
            <span>Carl Zeiss Dental Operating Microscope</span>
          </div>
          <div className="feature-pill-item">
            <Stethoscope size={15} className="feature-pill-icon blue" />
            <span>3 Sterile Surgical Operating Theatres</span>
          </div>
          <div className="feature-pill-item">
            <CheckCircle2 size={15} className="feature-pill-icon blue" />
            <span>Class-B Vacuum Autoclaves &amp; Family Care</span>
          </div>
        </div>
      </div>
    </section>
  );
}
