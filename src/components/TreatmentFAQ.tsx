import React from 'react';
import { Info, MapPin } from 'lucide-react';
import BranchCTA from '@/components/branch/BranchCTA';

export default function TreatmentFAQ() {
  return (
    <div style={{ marginTop: '3rem', padding: '2rem', background: '#f8fafc', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
      <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#0f172a' }}>
        <Info size={24} color="#0ea5e9" /> Frequently Asked Questions (Logistics)
      </h3>
      
      <div style={{ display: 'grid', gap: '1.5rem' }}>
        <div>
          <h4 style={{ fontWeight: 600, color: '#1e293b', marginBottom: '0.5rem' }}>Are prices the same across both branches?</h4>
          <p style={{ color: '#475569', lineHeight: 1.6 }}>
            No. Our <strong>Banasree Flagship Hospital</strong> offers accessible, comprehensive care suitable for families. The <strong>Banani Private Suite</strong> operates on a premium, appointment-only model offering absolute privacy, 3D CBCT on-site, and exclusive executive care.
          </p>
        </div>
        
        <div>
          <h4 style={{ fontWeight: 600, color: '#1e293b', marginBottom: '0.5rem' }}>Do I need to book in advance?</h4>
          <p style={{ color: '#475569', lineHeight: 1.6 }}>
            Walk-ins are accommodated at our Banasree hospital depending on availability. The Banani Private Suite is strictly <strong>appointment-only</strong> to guarantee zero waiting time.
          </p>
        </div>
        
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', flexWrap: 'wrap' }}>
          <BranchCTA action="book" branch="banasree" variant="ghost" style={{ background: '#e0f2fe', color: '#0284c7', padding: '0.75rem 1.25rem', borderRadius: '8px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <MapPin size={18} /> Book at Banasree
          </BranchCTA>
          <BranchCTA action="book" branch="banani" variant="ghost" style={{ background: '#e9eee9', color: '#6e8677', padding: '0.75rem 1.25rem', borderRadius: '8px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <MapPin size={18} /> Book at Banani
          </BranchCTA>
        </div>
      </div>
    </div>
  );
}
