'use client';

import { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Maximize2 } from 'lucide-react';
import './BananiHeroVideo.css';

interface BananiHeroVideoProps {
  src: string;
  poster: string;
  title?: string;
}

export default function BananiHeroVideo({
  src,
  poster,
  title = 'Banani Private Suite Tour',
}: BananiHeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    v.play().catch(() => {});
  }, []);

  const toggleSound = () => {
    if (!videoRef.current) return;
    const nextMuted = !isMuted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  const handleFullscreen = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.requestFullscreen) {
      v.requestFullscreen();
    } else if ((v as unknown as { webkitRequestFullscreen?: () => void }).webkitRequestFullscreen) {
      (v as unknown as { webkitRequestFullscreen: () => void }).webkitRequestFullscreen();
    }
  };

  return (
    <div className="bn-hero-video-wrapper">
      <video
        ref={videoRef}
        className="bn-hero-video"
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Floating Tour Tag */}
      <div className="bn-video-tag" aria-hidden="true">
        <span className="bn-video-dot" />
        <span>{title}</span>
      </div>

      {/* Control Buttons */}
      <div className="bn-video-controls">
        <button
          type="button"
          onClick={toggleSound}
          className="bn-video-btn"
          aria-label={isMuted ? 'Unmute video' : 'Mute video'}
          title={isMuted ? 'Turn sound on' : 'Mute sound'}
        >
          {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
          <span>{isMuted ? 'Sound on' : 'Sound off'}</span>
        </button>
        <button
          type="button"
          onClick={handleFullscreen}
          className="bn-video-btn bn-video-btn-icon"
          aria-label="Watch fullscreen"
          title="Fullscreen"
        >
          <Maximize2 size={15} />
        </button>
      </div>
    </div>
  );
}
