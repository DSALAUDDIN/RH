'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function AudioPlayer() {
  const pathname = usePathname();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const allowedPaths = ['/', '/about', '/team'];

  // Handle playing/pausing logic strictly based on user interaction
  useEffect(() => {
    const handleInteraction = () => {
      setHasInteracted(true);
      
      // Clean up listeners after first interaction
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('scroll', handleInteraction);
      document.removeEventListener('keydown', handleInteraction);
      document.removeEventListener('touchstart', handleInteraction);
    };

    // Attach listeners for initial interaction
    document.addEventListener('click', handleInteraction);
    document.addEventListener('scroll', handleInteraction);
    document.addEventListener('keydown', handleInteraction);
    document.addEventListener('touchstart', handleInteraction);

    return () => {
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('scroll', handleInteraction);
      document.removeEventListener('keydown', handleInteraction);
      document.removeEventListener('touchstart', handleInteraction);
    };
  }, []);

  // Main audio control effect
  useEffect(() => {
    const shouldPlay = allowedPaths.includes(pathname);
    
    if (!audioRef.current) return;

    if (shouldPlay && hasInteracted && !isPlaying) {
      // Only attempt to play if we are on the right page AND the user has interacted
      const playPromise = audioRef.current.play();
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            if (audioRef.current) audioRef.current.muted = false;
          })
          .catch(error => {
            console.warn("Audio playback was prevented:", error);
            setIsPlaying(false);
          });
      }
    } else if (!shouldPlay && isPlaying) {
      // Stop audio if we navigate away
      audioRef.current.pause();
      setIsPlaying(false);
    }
  }, [pathname, hasInteracted, isPlaying]);

  return (
    <audio 
      ref={audioRef} 
      src="/sound.weba" 
      loop 
      preload="auto"
      // Note: We remove the 'muted' attribute on the element itself, 
      // as we handle playback only AFTER interaction now.
      style={{ display: 'none' }} 
    />
  );
}
