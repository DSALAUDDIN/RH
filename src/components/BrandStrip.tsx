'use client';

import { motion } from 'framer-motion';

export default function BrandStrip() {
  return (
    <div style={{
      padding: '2rem 0',
      background: '#fff',
      borderBottom: '1px solid #F1EEE3',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <p style={{
        fontSize: '0.85rem',
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        color: '#8C8973',
        fontWeight: 700,
        marginBottom: '1.5rem'
      }}>
        Trusted by Global Dental Leaders
      </p>

      {/* Marquee Container */}
      <div style={{
        display: 'flex',
        width: '100%',
        overflow: 'hidden',
        position: 'relative'
      }}>
        {/* Gradient fades for edges */}
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '100px', background: 'linear-gradient(to right, #fff, transparent)', zIndex: 2 }} />
        <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '100px', background: 'linear-gradient(to left, #fff, transparent)', zIndex: 2 }} />

        <motion.div
          style={{
            display: 'flex',
            gap: '4rem',
            alignItems: 'center',
            paddingLeft: '2rem',
            whiteSpace: 'nowrap'
          }}
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 25, ease: 'linear', repeat: Infinity }}
        >
          {/* Double array for seamless loop */}
          {[1, 2].map((group) => (
            <div key={group} style={{ display: 'flex', gap: '4rem', alignItems: 'center' }}>
              <span style={{ fontSize: '1.5rem', fontWeight: 600, color: '#C9C5B2', letterSpacing: '-0.03em' }}>straumann</span>
              <span style={{ fontSize: '1.5rem', fontWeight: 600, color: '#C9C5B2', fontStyle: 'italic' }}>Nobel Biocare</span>
              <span style={{ fontSize: '1.5rem', fontWeight: 600, color: '#C9C5B2', letterSpacing: '0.05em' }}>invisalign</span>
              <span style={{ fontSize: '1.5rem', fontWeight: 600, color: '#C9C5B2' }}>3M</span>
              <span style={{ fontSize: '1.5rem', fontWeight: 600, color: '#C9C5B2', fontFamily: 'serif' }}>Ivoclar Vivadent</span>
              <span style={{ fontSize: '1.5rem', fontWeight: 600, color: '#C9C5B2' }}>Dentsply Sirona</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
