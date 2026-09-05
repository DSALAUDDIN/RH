import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Star, HeartPulse, Sparkles, Microscope, Crown, Diamond, Baby, Syringe, MonitorPlay, Plane } from 'lucide-react';
import './specialties.css';

import { pageMeta } from '@/lib/metadata';

export const metadata: Metadata = pageMeta({
  title: 'Dental Specialties',
  description:
    'The clinical disciplines covered at RH Dental Care, Dhaka: implantology, orthodontics, endodontics, prosthodontics, paediatric dentistry and oral surgery.',
  path: '/specialties',
});

const specialtiesData = [
  {
    id: 'implants',
    title: 'Dental Implants',
    icon: <Sparkles size={32} color="#0ea5e9" />,
    desc: 'Permanent, natural-looking tooth replacements using advanced CBCT-guided placement for maximum precision and longevity.',
    path: '/implants',
    color: '#0ea5e9',
  },
  {
    id: 'orthodontics',
    title: 'Orthodontics & Braces',
    icon: <Star size={32} color="#f59e0b" />,
    desc: 'Align your smile with traditional braces or clear aligners. Expert care for complex bite issues and aesthetic alignment.',
    path: '/orthodontics',
    color: '#f59e0b',
  },
  {
    id: 'root-canal',
    title: 'Microscopic Root Canal',
    icon: <Microscope size={32} color="#10b981" />,
    desc: 'Single-visit root canal treatment under local anaesthetic, using an operating microscope to save severely damaged teeth.',
    path: '/root-canal',
    color: '#10b981',
  },
  {
    id: 'zirconia-crown',
    title: 'Zirconia Crowns',
    icon: <Crown size={32} color="#8b5cf6" />,
    desc: 'Premium, metal-free zirconia crowns that offer unmatched strength and perfectly mimic the translucency of natural teeth.',
    path: '/zirconia-crown',
    color: '#8b5cf6',
  },
  {
    id: 'zirconia-veneers',
    title: 'Zirconia Veneers',
    icon: <Diamond size={32} color="#ec4899" />,
    desc: 'Flawless Hollywood smile design. Ultra-thin, highly durable veneers to correct discoloration, gaps, and chips instantly.',
    path: '/zirconia-veneers',
    color: '#ec4899',
  },
  {
    id: 'kids-care',
    title: 'Kids Care (Pediatric)',
    icon: <Baby size={32} color="#f43f5e" />,
    desc: 'Gentle, fear-free dentistry for children. Including preventive care, habit breaking, and painless cavity treatments.',
    path: '/kids-care',
    color: '#f43f5e',
  },
  {
    id: 'dental-surgery',
    title: 'Oral & Maxillofacial Surgery',
    icon: <Syringe size={32} color="#ef4444" />,
    desc: 'Expert surgical extractions, wisdom tooth removal, bone grafting, and complex maxillofacial procedures by senior surgeons.',
    path: '/dental-surgery',
    color: '#ef4444',
  },
  {
    id: 'digital-dentistry',
    title: 'Digital Dentistry',
    icon: <MonitorPlay size={32} color="#3b82f6" />,
    desc: 'Experience the future of dental care with 3D intraoral scanning, CBCT imaging, and CAD/CAM same-day restorations.',
    path: '/digital-dentistry',
    color: '#3b82f6',
  },
  {
    id: 'dental-tourism',
    title: 'RH Dental Tourism',
    icon: <Plane size={32} color="#14b8a6" />,
    desc: 'Treatment planned before you fly and scheduled around a short stay — for international and expatriate patients.',
    path: '/dental-tourism',
    color: '#14b8a6',
  },
];

export default function SpecialtiesPage() {
  return (
    <div className="sp-root" style={{ background: '#f8fafc', minHeight: '100vh', color: '#0f172a' }}>
      
      {/* ── Hero Section ── */}
      <section style={{ 
        padding: 'clamp(6rem, 12vw, 10rem) 2rem 4rem', 
        background: 'linear-gradient(to bottom, #020617, #0f172a)',
        color: '#fff',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Subtle grid background */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          opacity: 0.5,
          zIndex: 0
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ 
            display: 'inline-flex', alignItems: 'center', gap: '8px', 
            background: 'rgba(14, 165, 233, 0.1)', border: '1px solid rgba(14, 165, 233, 0.2)',
            padding: '8px 16px', borderRadius: '50px', color: '#38bdf8',
            fontWeight: 700, fontSize: '0.875rem', marginBottom: '1.5rem'
          }}>
            <HeartPulse size={16} />
            <span>Comprehensive Care</span>
          </div>
          
          <h1 style={{ 
            fontSize: 'clamp(2.5rem, 6vw, 4rem)', 
            fontWeight: 900, 
            lineHeight: 1.1, 
            marginBottom: '1.5rem',
            letterSpacing: '-0.03em'
          }}>
            Our Dental <span style={{ color: '#0ea5e9' }}>Specialties</span>
          </h1>
          
          <p style={{ 
            fontSize: 'clamp(1.1rem, 2vw, 1.25rem)', 
            color: '#94a3b8', 
            maxWidth: '700px', 
            margin: '0 auto',
            lineHeight: 1.7
          }}>
            From routine checkups to complex full-mouth rehabilitation, our specialist departments cover the disciplines a complex case needs, in one clinical team.
          </p>
        </div>
      </section>

      {/* ── Specialties Grid ── */}
      <section style={{ padding: '6rem 0', background: '#f8fafc' }}>
        <div className="container">
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
            gap: '2rem' 
          }}>
            {specialtiesData.map((specialty, idx) => (
              <Link 
                key={specialty.id} 
                href={specialty.path}
                className="specialty-card-link"
              >
                <div 
                  className="specialty-card"
                  style={{ '--hover-color': specialty.color } as React.CSSProperties}
                >
                  <div style={{ 
                    width: '64px', height: '64px', borderRadius: '16px', 
                    background: `${specialty.color}15`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginBottom: '1.5rem'
                  }}>
                    {specialty.icon}
                  </div>

                  <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem', letterSpacing: '-0.02em' }}>
                    {specialty.title}
                  </h2>

                  <p style={{ color: '#64748b', lineHeight: 1.7, flexGrow: 1, marginBottom: '2rem' }}>
                    {specialty.desc}
                  </p>

                  <div style={{ 
                    display: 'flex', alignItems: 'center', gap: '8px', 
                    fontSize: '0.95rem', fontWeight: 700, color: '#0f172a',
                    marginTop: 'auto'
                  }}>
                    Explore Treatment 
                    <ArrowRight className="sp-arrow" size={18} color="#94a3b8" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer-like Strip ── */}
      <section style={{ 
        padding: '5rem 0', 
        background: '#020617', 
        textAlign: 'center',
      }}>
        <div className="container">
           <h3 style={{ fontSize: '2rem', fontWeight: 800, color: '#fff', marginBottom: '1.5rem' }}>
             Ready to book?
           </h3>
           <p style={{ color: '#94a3b8', fontSize: '1.1rem', marginBottom: '2rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
             Book an appointment with our specialists today and take the first step towards a healthier, brighter smile.
           </p>
           <Link href="/contact" className="sp-book-btn">
             Book Your Consultation
           </Link>
        </div>
      </section>
    </div>
  );
}
