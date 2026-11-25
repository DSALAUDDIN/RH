'use client';

import React, { useState, useRef, useEffect } from 'react';
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
  Film,
  Compass,
  ArrowRight,
  Car,
  Scan,
} from 'lucide-react';
import { BRANCHES } from '@/lib/branches';
import './BananiLuxuryShowcase.css';

interface GallerySlide {
  id: string;
  type: 'video' | 'image';
  title: string;
  subtitle: string;
  src: string;
  tag: string;
  alt: string;
}

const MEDIA_ITEMS: GallerySlide[] = [
  {
    id: 'video-tour',
    type: 'video',
    title: 'Banani Private Suite Tour',
    subtitle: '27-second executive walkthrough of our Road 11 dental suite',
    src: '/assets/videos/banani-suite.mp4',
    tag: 'Live Video Walkthrough',
    alt: 'Banani private dental suite video walkthrough tour',
  },
  {
    id: 'reception',
    type: 'image',
    title: 'Executive Reception & Lounge',
    subtitle: 'Quiet, discrete reception area designed for executive patient privacy',
    src: '/assets/branches/banani/reception.webp',
    tag: 'Executive Reception',
    alt: 'RH Dental Care Banani reception desk and waiting lounge',
  },
  {
    id: 'operatory',
    type: 'image',
    title: 'Surgical Operatory & 3D CBCT',
    subtitle: 'Equipped with on-site digital CBCT scanning and sterile surgical theatre',
    src: '/assets/branches/banani/banani-treatment-ot.webp',
    tag: 'Surgical Theatre',
    alt: 'RH Dental Care Banani advanced surgical operatory theatre',
  },
  {
    id: 'consultation',
    type: 'image',
    title: 'Private Consultation Chamber',
    subtitle: 'Dedicated space for one-on-one digital diagnosis & treatment planning',
    src: '/assets/branches/banani/consultation.webp',
    tag: '1-on-1 Consultation',
    alt: 'Private doctor consultation desk at Banani branch',
  },
  {
    id: 'lounge',
    type: 'image',
    title: 'VIP Patient Recovery Lounge',
    subtitle: 'Plush ambiance for relaxed pre-treatment and post-op care',
    src: '/assets/branches/banani/lounge.webp',
    tag: 'VIP Lounge',
    alt: 'VIP waiting lounge at RH Dental Care Banani Road 11',
  },
];

export default function BananiLuxuryShowcase() {
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentMedia = MEDIA_ITEMS[activeMediaIndex];

  // Sync video play/pause
  useEffect(() => {
    if (currentMedia.type === 'video' && videoRef.current) {
      videoRef.current.muted = isMuted;
      videoRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    } else if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }, [activeMediaIndex, isMuted, currentMedia.type]);

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

  const handleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen?.().catch(() => {});
    } else {
      document.exitFullscreen?.().catch(() => {});
    }
  };

  return (
    <section
      className="banani-showcase-section"
      id="banani-suite-showcase"
      aria-labelledby="banani-showcase-heading"
    >
      <div className="banani-showcase-container">
        {/* Section Heading */}
        <div className="banani-showcase-header">
          <div className="banani-header-pill">
            <Sparkles size={14} className="pill-icon" />
            <span>Banani Executive Dental Suite · Road 11</span>
          </div>
          <h2 id="banani-showcase-heading" className="banani-showcase-title">
            Take a Look Inside Our <span className="title-gradient">Banani Private Suite</span>
          </h2>
          <p className="banani-showcase-subtitle">
            An appointment-only dental retreat designed for diplomats, executives, and discerning
            patients. Step inside our 3D CBCT diagnostic suite and private consultation chambers in
            the heart of Dhaka.
          </p>
        </div>

        {/* Masterpiece Dual Grid: Visual Theatre on Left, VIP Details on Right */}
        <div className="banani-stage-grid">
          {/* Main Visual Screen */}
          <div className="banani-screen-column">
            <div className="banani-media-screen" ref={containerRef}>
              {currentMedia.type === 'video' ? (
                <div className="banani-video-wrapper">
                  <video
                    ref={videoRef}
                    className="banani-main-video"
                    src={currentMedia.src}
                    poster="/assets/branches/banani/reception.webp"
                    autoPlay
                    loop
                    muted={isMuted}
                    playsInline
                    preload="metadata"
                    aria-label={currentMedia.alt}
                  />

                  {/* Video Overlays & Controls */}
                  <div className="banani-video-badge">
                    <span className="live-pulse" />
                    <span>Banani Suite Tour (HD)</span>
                  </div>

                  <div className="banani-video-controls">
                    <button
                      type="button"
                      className="control-btn"
                      onClick={togglePlay}
                      aria-label={isPlaying ? 'Pause video' : 'Play video'}
                    >
                      {isPlaying ? <Pause size={18} /> : <Play size={18} />}
                    </button>
                    <button
                      type="button"
                      className="control-btn"
                      onClick={toggleMute}
                      aria-label={isMuted ? 'Unmute video' : 'Mute video'}
                    >
                      {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                    </button>
                    <button
                      type="button"
                      className="control-btn control-btn-fullscreen"
                      onClick={handleFullscreen}
                      aria-label="Toggle fullscreen view"
                    >
                      <Maximize2 size={18} />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="banani-image-wrapper">
                  <Image
                    src={currentMedia.src}
                    alt={currentMedia.alt}
                    fill
                    sizes="(max-width: 900px) 100vw, 55vw"
                    className="banani-main-image"
                    priority
                  />
                  <div className="banani-image-badge">{currentMedia.tag}</div>
                </div>
              )}

              {/* Caption Bar */}
              <div className="banani-caption-bar">
                <div className="caption-text">
                  <span className="caption-tag">{currentMedia.tag}</span>
                  <h3 className="caption-title">{currentMedia.title}</h3>
                  <p className="caption-desc">{currentMedia.subtitle}</p>
                </div>
              </div>
            </div>

            {/* Media Selector Thumbnails */}
            <div
              className="banani-thumbnails-strip"
              role="tablist"
              aria-label="Banani clinic tour media selector"
            >
              {MEDIA_ITEMS.map((item, idx) => {
                const isSelected = activeMediaIndex === idx;
                return (
                  <button
                    key={item.id}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    className={`thumb-button ${isSelected ? 'is-active' : ''}`}
                    onClick={() => setActiveMediaIndex(idx)}
                  >
                    <div className="thumb-media-box">
                      {item.type === 'video' ? (
                        <div className="thumb-video-placeholder">
                          <Film size={18} />
                          <span className="thumb-video-label">Video</span>
                        </div>
                      ) : (
                        <Image
                          src={item.src}
                          alt={item.title}
                          fill
                          sizes="120px"
                          className="thumb-img"
                        />
                      )}
                    </div>
                    <span className="thumb-title">{item.tag}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Executive Suite Details & Direct Booking */}
          <div className="banani-details-column">
            <div className="suite-specs-card">
              <div className="suite-specs-top">
                <span className="suite-branch-badge">Banani Road 11 · Suite #301</span>
                <h3 className="suite-card-title">Exclusive Clinical Highlights</h3>
                <p className="suite-card-intro">
                  Designed exclusively for singular patient focus with complete confidentiality and
                  zero waiting time.
                </p>
              </div>

              {/* Spec Items */}
              <div className="suite-specs-list">
                <div className="spec-item">
                  <div className="spec-icon-box">
                    <Scan size={20} />
                  </div>
                  <div className="spec-text">
                    <h4>On-Site 3D CBCT Imaging</h4>
                    <p>
                      Low-dose 3D cross-sectional jawbone scanning performed right inside the clinic
                      for immediate implant & bone diagnostics.
                    </p>
                  </div>
                </div>

                <div className="spec-item">
                  <div className="spec-icon-box">
                    <ShieldCheck size={20} />
                  </div>
                  <div className="spec-text">
                    <h4>One Patient at a Time</h4>
                    <p>
                      Strictly scheduled individual appointments ensuring absolute clinical focus,
                      zero lobby crowding, and full privacy.
                    </p>
                  </div>
                </div>

                <div className="spec-item">
                  <div className="spec-icon-box">
                    <Car size={20} />
                  </div>
                  <div className="spec-text">
                    <h4>Basement & Valet Parking</h4>
                    <p>
                      Effortless arrival on Road 11 with secure building parking and elevator access
                      straight to the dental suite floor.
                    </p>
                  </div>
                </div>

                <div className="spec-item">
                  <div className="spec-icon-box">
                    <Clock size={20} />
                  </div>
                  <div className="spec-text">
                    <h4>Doctor Session Hours</h4>
                    <p>
                      <strong>Sunday to Thursday: 3:00 PM – 10:00 PM</strong> (Friday & Saturday by
                      prior VIP reservation).
                    </p>
                  </div>
                </div>
              </div>

              {/* Chief Doctor Attending */}
              <div className="suite-doctor-bar">
                <div className="doctor-avatar">
                  <span>DR</span>
                </div>
                <div className="doctor-info">
                  <span className="doctor-role">Consulting Dental Surgeon</span>
                  <strong className="doctor-name">Dr. B.M. Rafiqul Hasan (Mehedi)</strong>
                  <span className="doctor-reg">BMDC Reg. No: 5169 · Certified Implantologist</span>
                </div>
              </div>

              {/* Direct Banani Booking Actions */}
              <div className="suite-actions-block">
                <div className="suite-buttons-row">
                  <a
                    href={`tel:${BRANCHES.banani.phone}`}
                    className="suite-btn-primary"
                    aria-label={`Call Banani branch at ${BRANCHES.banani.phoneDisplay}`}
                  >
                    <Phone size={17} />
                    <span>Call {BRANCHES.banani.phoneDisplay}</span>
                  </a>

                  <a
                    href={`https://wa.me/${BRANCHES.banani.whatsapp}?text=${encodeURIComponent(
                      'Hello RH Dental Care, I would like to book a private consultation at your Banani Road 11 Suite.',
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="suite-btn-whatsapp"
                    aria-label="Message Banani Suite on WhatsApp"
                  >
                    <MessageCircle size={18} />
                    <span>WhatsApp Suite</span>
                  </a>
                </div>

                <div className="suite-directions-row">
                  <a
                    href={BRANCHES.banani.mapLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="suite-link-maps"
                  >
                    <Compass size={15} />
                    <span>Get Directions: House 82, Road 11, Block D, Banani</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Sub-card: Looking for Banasree Hospital? */}
            <div className="banasree-bridge-box">
              <div className="bridge-text">
                <strong>Need our Banasree Flagship Hospital?</strong>
                <span>
                  Multi-chair clinic for general dental treatments, root canals, and family dental
                  care.
                </span>
              </div>
              <Link href="/banasree" className="bridge-link">
                <span>View Banasree</span>
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
