'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Maximize, Cpu, Heart } from 'lucide-react';
import './VideoSection.css';

export default function VideoSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [showControls, setShowControls] = useState(false);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* ── autoplay on mount (muted for browser policy) ── */
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    v.play()
      .then(() => setIsPlaying(true))
      .catch(() => setIsPlaying(false));
  }, []);

  /* ── show controls briefly then hide ── */
  const revealControls = useCallback(() => {
    setShowControls(true);
    if (hideTimer.current) clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => setShowControls(false), 2500);
  }, []);

  const keepControls = useCallback(() => {
    setShowControls(true);
    if (hideTimer.current) clearTimeout(hideTimer.current);
  }, []);

  const hideControls = useCallback(() => {
    if (hideTimer.current) clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => setShowControls(false), 1200);
  }, []);

  /* ── play / pause ── */
  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    const v = videoRef.current;
    if (!v) return;
    if (isPlaying) {
      v.pause();
      setIsPlaying(false);
      setShowControls(true); // keep visible when paused
    } else {
      v.play();
      setIsPlaying(true);
      revealControls();
    }
  };

  /* ── mute / unmute ── */
  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const v = videoRef.current;
    if (!v) return;
    const next = !isMuted;
    v.muted = next;
    setIsMuted(next);
    revealControls();
  };

  /* ── fullscreen ── */
  const toggleFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    const el = wrapperRef.current;
    if (!el) return;
    if (!document.fullscreenElement) {
      el.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  useEffect(() => {
    // We don't need to track isFullscreen state if it's not used
    const onChange = () => {};
    document.addEventListener('fullscreenchange', onChange);
    return () => document.removeEventListener('fullscreenchange', onChange);
  }, []);

  /* ── click on the video body = toggle play ── */
  const handleVideoClick = (e: React.MouseEvent) => {
    // only if clicking directly on the video area (not buttons)
    if ((e.target as HTMLElement).closest('button')) return;
    togglePlay(e);
  };

  return (
    <section className="section video-highlight">
      <div className="container">

        {/* Section header */}
        <div className="vs-header">
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="vs-subtitle"
          >
            Inside Our Clinic
          </motion.span>
          <motion.h2
            className="vs-title"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Experience Premium Care
          </motion.h2>
        </div>

        {/* Player shell */}
        <motion.div
          className="vs-player-shell"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          {/* Video area */}
          <div
            ref={wrapperRef}
            className="vs-video-area"
            onMouseMove={revealControls}
            onMouseEnter={keepControls}
            onMouseLeave={hideControls}
            onClick={handleVideoClick}
          >
            <video
              ref={videoRef}
              className="vs-video"
              autoPlay
              muted
              loop
              playsInline
            >
              <source src="https://res.cloudinary.com/dlaqtwoa3/video/upload/v1776535718/homeScreen_tai4jm.mp4" type="video/mp4" />
            </video>

            {/* Big centre play button (shows when paused OR hovered) */}
            <AnimatePresence>
              {(!isPlaying || showControls) && (
                <motion.div
                  className="vs-centre-overlay"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  {!isPlaying && (
                    <motion.button
                      className="vs-big-play"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.92 }}
                      onClick={togglePlay}
                    >
                      <Play size={40} fill="white" style={{ marginLeft: 4 }} />
                    </motion.button>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Bottom control bar */}
            <AnimatePresence>
              {(!isPlaying || showControls) && (
                <motion.div
                  className="vs-control-bar"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.2 }}
                  onClick={e => e.stopPropagation()}
                >
                  {/* Left: play + mute */}
                  <div className="vs-ctrl-left">
                    <button className="vs-ctrl-btn" onClick={togglePlay} title={isPlaying ? 'Pause' : 'Play'}>
                      {isPlaying ? <Pause size={18} fill="white" /> : <Play size={18} fill="white" style={{ marginLeft: 2 }} />}
                    </button>
                    <button className="vs-ctrl-btn" onClick={toggleMute} title={isMuted ? 'Unmute' : 'Mute'}>
                      {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                    </button>
                    <span className="vs-ctrl-label">
                      {isMuted ? 'Tap to unmute' : 'Sound on'}
                    </span>
                  </div>

                  {/* Right: fullscreen */}
                  <div className="vs-ctrl-right">
                    <button className="vs-ctrl-btn" onClick={toggleFullscreen} title="Fullscreen">
                      <Maximize size={18} />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Stats row — BELOW the video, never overlapping */}
          <div className="vs-stats-row">
            <div className="vs-stat">
              <div className="vs-stat-icon"><Cpu size={18} /></div>
              <div>
                <div className="vs-stat-title">Advanced Tech</div>
                <div className="vs-stat-desc">State-of-the-art facilities</div>
              </div>
            </div>
            <div className="vs-stat-divider" />
            <div className="vs-stat">
              <div className="vs-stat-icon"><Heart size={18} /></div>
              <div>
                <div className="vs-stat-title">Comfort First</div>
                <div className="vs-stat-desc">Relaxing environment</div>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
