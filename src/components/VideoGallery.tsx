'use client';

import { useState, useRef } from 'react';
import { Star, Play, Pause, ChevronDown } from 'lucide-react';

export default function VideoGallery({ videos }: { videos: any[] }) {
  const [visibleCount, setVisibleCount] = useState(6);
  const [playingId, setPlayingId] = useState<string | null>(null);
  
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});

  const handlePlayPause = (id: string) => {
    // If another video is playing, pause it
    if (playingId && playingId !== id) {
      const prevVideo = videoRefs.current[playingId];
      if (prevVideo) {
        prevVideo.pause();
      }
    }

    const currentVideo = videoRefs.current[id];
    if (currentVideo) {
      if (currentVideo.paused) {
        currentVideo.play();
        setPlayingId(id);
      } else {
        currentVideo.pause();
        setPlayingId(null);
      }
    }
  };

  const handleVideoEnded = () => {
    setPlayingId(null);
  };

  const loadMore = () => {
    setVisibleCount(prev => prev + 6);
  };

  if (!videos || videos.length === 0) return null;

  return (
    <section style={{ paddingTop: 'calc(var(--nav-height) + 4rem)', paddingBottom: '4rem', background: '#020617', color: '#fff' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 800, fontFamily: 'var(--font-display), sans-serif', letterSpacing: '-0.03em' }}>
            Real Patient <span style={{ color: '#0ea5e9' }}>Stories</span>
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '1.1rem', marginTop: '1rem', maxWidth: '600px', margin: '1rem auto 0' }}>
            Hear directly from our patients about their treatment and their results.
          </p>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
          {videos.slice(0, visibleCount).map((review) => (
            <div 
              key={review.id} 
              style={{ 
                background: '#0f172a', 
                borderRadius: '1.5rem', 
                overflow: 'hidden', 
                border: '1px solid rgba(255,255,255,0.05)', 
                boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                position: 'relative'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 30px 60px rgba(0,0,0,0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.3)';
              }}
            >
              <div style={{ position: 'relative', width: '100%', paddingTop: '133%', backgroundColor: '#000' }}>
                <video 
                  ref={el => { videoRefs.current[review.id] = el; }}
                  src={review.videoUrl} 
                  preload="metadata"
                  playsInline
                  onEnded={handleVideoEnded}
                  onPause={() => setPlayingId(null)}
                  onPlay={() => setPlayingId(review.id)}
                  style={{ 
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover',
                  }}
                  controls={playingId === review.id} // Only show native controls when playing
                />
                
                {/* Custom Play Overlay */}
                {playingId !== review.id && (
                  <div 
                    onClick={() => handlePlayPause(review.id)}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      background: 'rgba(0,0,0,0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      transition: 'background 0.3s'
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(0,0,0,0.5)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(0,0,0,0.3)'; }}
                  >
                    <div style={{
                      width: '64px',
                      height: '64px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(14, 165, 233, 0.9)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 0 30px rgba(14, 165, 233, 0.5)',
                      paddingLeft: '4px' // Optical alignment for play button
                    }}>
                      <Play fill="#fff" color="#fff" size={32} />
                    </div>
                  </div>
                )}
              </div>
              
              <div style={{ padding: '1.5rem', background: 'linear-gradient(to top, #0f172a, #1e293b)' }}>
                <div style={{ display: 'flex', gap: '4px', color: '#fbbf24', marginBottom: '0.75rem' }}>
                  {Array(review.rating).fill(0).map((_, i) => <Star key={i} size={16} fill="#fbbf24" />)}
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#f8fafc', margin: 0 }}>{review.patient}</h3>
              </div>
            </div>
          ))}
        </div>

        {visibleCount < videos.length && (
          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <button 
              onClick={loadMore}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 28px',
                backgroundColor: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '50px',
                color: '#f8fafc',
                fontSize: '1rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(14, 165, 233, 0.1)';
                e.currentTarget.style.borderColor = '#0ea5e9';
                e.currentTarget.style.color = '#0ea5e9';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                e.currentTarget.style.color = '#f8fafc';
              }}
            >
              Load More Videos <ChevronDown size={18} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
