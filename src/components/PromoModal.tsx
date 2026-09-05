'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, MapPin, ArrowRight, ShieldCheck, Clock } from 'lucide-react';
import Link from 'next/link';

export default function PromoModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Show modal shortly after page loads, only if not shown in this session
    const hasSeenPromo = sessionStorage.getItem('bananiPromoSeen');
    if (!hasSeenPromo) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        sessionStorage.setItem('bananiPromoSeen', 'true');
      }, 2000); // 2 seconds delay to let user see the hero first
      return () => clearTimeout(timer);
    }
  }, []);

  const close = () => setIsOpen(false);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(2, 6, 23, 0.85)',
            backdropFilter: 'blur(8px)',
            zIndex: 99999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem'
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={close}
        >
          <motion.div
            style={{
              background: 'linear-gradient(145deg, #0f172a, #020617)',
              borderRadius: '24px',
              border: '1px solid rgba(139, 92, 246, 0.3)', // Subtle purple/premium border
              boxShadow: '0 25px 50px -12px rgba(139, 92, 246, 0.25)',
              width: '100%',
              maxWidth: '550px',
              position: 'relative',
              overflow: 'hidden',
              color: '#fff'
            }}
            initial={{ scale: 0.95, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top decorative gradient line */}
            <div style={{ height: '4px', width: '100%', background: 'linear-gradient(90deg, #8b5cf6, #3b82f6)' }} />

            <button 
              onClick={close} 
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: 'rgba(255,255,255,0.1)',
                border: 'none',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#cbd5e1',
                cursor: 'pointer',
                zIndex: 10,
                transition: 'background 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
              aria-label="Close Promotion"
            >
              <X size={18} strokeWidth={2.5} />
            </button>

            <div style={{ padding: '2.5rem 2.5rem 2rem' }}>
              
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(139, 92, 246, 0.15)', padding: '6px 14px', borderRadius: '50px', color: '#c4b5fd', fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1.5rem', border: '1px solid rgba(139, 92, 246, 0.3)' }}>
                <Sparkles size={14} /> VIP Access
              </div>

              <h2 style={{ fontSize: '2rem', fontWeight: 900, lineHeight: 1.1, marginBottom: '1rem', letterSpacing: '-0.02em' }}>
                Experience the Pinnacle of <span style={{ color: '#a78bfa' }}>Premium Dentistry.</span>
              </h2>

              <p style={{ color: '#94a3b8', fontSize: '1.05rem', lineHeight: 1.6, marginBottom: '2rem' }}>
                Our exclusive <strong style={{ color: '#fff' }}>Banani Premium Center</strong> is now accepting a limited number of high-priority patients for advanced aesthetic and implant procedures.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '2.5rem', background: 'rgba(255,255,255,0.03)', padding: '1.5rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <ShieldCheck size={20} color="#4ade80" />
                  <span style={{ fontSize: '0.95rem', fontWeight: 600 }}>Zero Wait Time & Private Lounge</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <MapPin size={20} color="#a78bfa" />
                  <span style={{ fontSize: '0.95rem', fontWeight: 600 }}>Prime Location: Level 7, Road 11, Banani</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Clock size={20} color="#fcd34d" />
                  <span style={{ fontSize: '0.95rem', fontWeight: 600, color: '#fcd34d' }}>Only 8 Priority Slots Left This Week</span>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <Link 
                  href="/banani" 
                  onClick={close}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    width: '100%',
                    padding: '1rem',
                    background: '#8b5cf6',
                    color: '#fff',
                    borderRadius: '12px',
                    fontWeight: 800,
                    fontSize: '1.1rem',
                    textDecoration: 'none',
                    boxShadow: '0 10px 25px rgba(139, 92, 246, 0.4)',
                    transition: 'transform 0.2s, box-shadow 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 15px 35px rgba(139, 92, 246, 0.5)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 10px 25px rgba(139, 92, 246, 0.4)';
                  }}
                >
                  Claim VIP Consultation <ArrowRight size={20} />
                </Link>
                <button 
                  onClick={close}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#64748b',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    textDecoration: 'underline'
                  }}
                >
                  No thanks, I'll explore first
                </button>
              </div>

            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
