'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import aiImplants from '../assets/promotions/ai_implants.png';
import aiVeneers from '../assets/promotions/ai_veneers.png';

export default function BeforeAfter() {
  return (
    <section style={{ padding: '6rem 0', background: '#f8fafc' }}>
      <div className="container">
        
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div style={{ 
            display: 'inline-flex', alignItems: 'center', gap: '8px', 
            background: 'rgba(14, 165, 233, 0.1)', color: '#0ea5e9',
            padding: '6px 14px', borderRadius: '50px', 
            fontWeight: 700, fontSize: '0.85rem', marginBottom: '1rem'
          }}>
            <Sparkles size={16} />
            <span>Real Results</span>
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em' }}>
            Transforming Smiles, <br/>Changing Lives
          </h2>
          <p style={{ color: '#64748b', fontSize: '1.1rem', marginTop: '1rem', maxWidth: '600px', margin: '1rem auto 0' }}>
            See the difference our advanced cosmetic and restorative treatments can make. Your dream smile is closer than you think.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
          
          {/* Case 1: Implants */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ background: '#fff', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0' }}
          >
            <div style={{ position: 'relative', width: '100%', height: '250px' }}>
              <Image 
                src={aiImplants} 
                alt="Full Mouth Dental Implants" 
                fill 
                style={{ objectFit: 'cover' }}
              />
              <div style={{ position: 'absolute', top: '16px', right: '16px', background: 'rgba(255,255,255,0.9)', padding: '6px 14px', borderRadius: '50px', fontSize: '0.75rem', fontWeight: 800, color: '#0f172a', backdropFilter: 'blur(4px)' }}>
                Full Mouth Rehab
              </div>
            </div>
            <div style={{ padding: '2rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>Full Mouth Dental Implants</h3>
              <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                Complete restoration of missing teeth using advanced All-on-6 implants. The patient regained 100% chewing function and a natural aesthetic smile.
              </p>
              <Link href="/implants" style={{ color: '#0ea5e9', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.95rem', textDecoration: 'none' }}>
                Learn about Implants <ArrowRight size={16} />
              </Link>
            </div>
          </motion.div>

          {/* Case 2: Veneers */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            style={{ background: '#fff', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0' }}
          >
            <div style={{ position: 'relative', width: '100%', height: '250px' }}>
              <Image 
                src={aiVeneers} 
                alt="Hollywood Smile with Zirconia Veneers" 
                fill 
                style={{ objectFit: 'cover' }}
              />
              <div style={{ position: 'absolute', top: '16px', right: '16px', background: 'rgba(255,255,255,0.9)', padding: '6px 14px', borderRadius: '50px', fontSize: '0.75rem', fontWeight: 800, color: '#0f172a', backdropFilter: 'blur(4px)' }}>
                Smile Design
              </div>
            </div>
            <div style={{ padding: '2rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>Hollywood Smile with Zirconia Veneers</h3>
              <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                Corrected severe discoloration and gaps using ultra-thin premium zirconia veneers. A completely painless transformation in just 2 visits.
              </p>
              <Link href="/zirconia-veneers" style={{ color: '#ec4899', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.95rem', textDecoration: 'none' }}>
                Explore Veneers <ArrowRight size={16} />
              </Link>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
