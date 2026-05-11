'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import './PromoModal.css';

import promoZirconia from '../assets/promotions/promo_zirconia.png';
import promoInvisalign from '../assets/promotions/promo_invisalign.png';
import promoClearAligners from '../assets/promotions/promo_clear_aligners.png';
import promoSurgery from '../assets/promotions/promo_surgery.png';
import promoWhitening from '../assets/promotions/promo_whitening.jpg';

const promotions = [
  { id: 5, src: promoWhitening, alt: 'Laser Tooth Whitening' },
  { id: 1, src: promoZirconia, alt: 'Zirconia Crown VS. Conventional Crown' },
  { id: 2, src: promoInvisalign, alt: 'Invisalign Clear Aligners' },
  { id: 3, src: promoClearAligners, alt: 'Clear Aligners' },
  { id: 4, src: promoSurgery, alt: 'Expert Dental Surgery' },
];

export default function PromoModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Show modal shortly after page loads, only if not shown in this session
    const hasSeenPromo = sessionStorage.getItem('promoSeen');
    if (!hasSeenPromo) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        sessionStorage.setItem('promoSeen', 'true');
      }, 1500); // 1.5 seconds delay
      return () => clearTimeout(timer);
    }
  }, []);

  // Auto-play
  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % promotions.length);
    }, 4000); // switch every 4 seconds
    return () => clearInterval(interval);
  }, [isOpen, currentIndex]);

  const close = () => setIsOpen(false);

  const prev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + promotions.length) % promotions.length);
  };

  const next = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % promotions.length);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="promo-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={close}
        >
          <motion.div
            className="promo-modal-content"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="promo-modal-close" onClick={close} aria-label="Close Promotion">
              <X size={20} strokeWidth={2.5} />
            </button>

            <div className="promo-carousel-wrapper">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="promo-image-container"
                >
                  <Image
                    src={promotions[currentIndex].src}
                    alt={promotions[currentIndex].alt}
                    fill
                    sizes="(max-width: 640px) 90vw, 50vw"
                    className="promo-image"
                    priority
                  />
                </motion.div>
              </AnimatePresence>

              {/* Navigation Arrows */}
              <button className="promo-nav-btn prev" onClick={prev}>
                <ChevronLeft size={24} />
              </button>
              <button className="promo-nav-btn next" onClick={next}>
                <ChevronRight size={24} />
              </button>

              {/* Indicators */}
              <div className="promo-indicators">
                {promotions.map((_, idx) => (
                  <button
                    key={idx}
                    className={`promo-dot ${idx === currentIndex ? 'active' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentIndex(idx);
                    }}
                  />
                ))}
              </div>
            </div>
            
            <div className="promo-modal-footer">
              <a href="/contact" className="promo-action-btn" onClick={close}>
                Book Appointment Now
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
