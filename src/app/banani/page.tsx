import Link from 'next/link';
import { Award, ShieldCheck, Microscope, Star, ChevronRight, CheckCircle2, Clock } from 'lucide-react';
import './banani.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'RH Dental Clinic | Banani Branch - Premium Dental Care',
  description: 'Experience world-class, painless dental care at RH Dental Clinic Banani Branch.',
};

export default function BananiBranchPage() {
  return (
    <div className="banani-branch-page">
      
      {/* 1. Hero Section (Authority & Halo Effect) */}
      <section className="banani-hero">
        <div className="banani-hero-content">
          <div className="banani-badge">
            <Award size={16} /> Premium Dental Facility
          </div>
          <h1 className="banani-hero-title">
            Experience World-Class Dental Care in the <span className="text-gradient">Heart of Banani</span>
          </h1>
          <p className="banani-hero-subtitle">
            Advanced 3D CBCT imaging, completely painless laser treatments, and a luxurious VIP environment designed for your absolute comfort.
          </p>
        </div>
      </section>

      {/* 2. Branch Highlights (Cognitive Fluency) */}
      <section className="banani-section">
        <h2 className="banani-section-title">State-of-the-Art <span className="text-gradient-gold">Facilities</span></h2>
        <p className="banani-section-subtitle">International standard equipment ensuring precision and safety.</p>
        
        <div className="facilities-grid">
          <div className="facility-card">
            <div className="facility-icon-wrap">
              <Microscope size={28} />
            </div>
            <h3 className="facility-title">3D CBCT X-Ray</h3>
            <p className="facility-desc">High-resolution 3D imaging for perfect implant placement and complex root canals.</p>
          </div>
          
          <div className="facility-card">
            <div className="facility-icon-wrap">
              <ShieldCheck size={28} />
            </div>
            <h3 className="facility-title">Class-B Sterilization</h3>
            <p className="facility-desc">100% infection control protocol with European standard autoclaving.</p>
          </div>
          
          <div className="facility-card">
            <div className="facility-icon-wrap">
              <Star size={28} />
            </div>
            <h3 className="facility-title">VIP Patient Lounge</h3>
            <p className="facility-desc">Relaxing ambient environment with complimentary refreshments while you wait.</p>
          </div>
        </div>
      </section>

      {/* 3. The Specialists (Social Proof & Authority) */}
      <section className="banani-section">
        <h2 className="banani-section-title">Meet Our <span className="text-gradient">Specialists</span></h2>
        <p className="banani-section-subtitle">BMDC Certified elite dental surgeons at your service.</p>
        
        <div className="specialists-grid">
          {/* Dr Hasan */}
          <Link href="/dr-hasan" className="specialist-card">
            <div className="specialist-img-box">
              <img src="/assets/dr_hasan_office_notext.png" alt="Dr Hasan" className="specialist-img" />
              <div className="specialist-img-overlay"></div>
            </div>
            <div className="specialist-info">
              <h3 className="specialist-name">Dr. B. M. R. Hasan</h3>
              <p className="specialist-role">Chief Consultant & Implantologist</p>
              <div className="specialist-btn">
                View Profile <ChevronRight size={16} />
              </div>
            </div>
          </Link>

          {/* Dr Shimia */}
          <Link href="/dr-shimia" className="specialist-card">
            <div className="specialist-img-box">
              <img src="/assets/dr_shimia_no_text.png" alt="Dr Shimia" className="specialist-img" />
              <div className="specialist-img-overlay"></div>
            </div>
            <div className="specialist-info">
              <h3 className="specialist-name">Dr. Shimia B. Taher</h3>
              <p className="specialist-role">Expert Dental Surgeon</p>
              <div className="specialist-btn">
                View Profile <ChevronRight size={16} />
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* 4. Sticky Urgency CTA (Scarcity) */}
      <div className="banani-cta-bar">
        <div className="cta-text">
          <div className="pulse-dot"></div>
          <div>
            <div style={{fontWeight: 600, color: '#fff', fontSize: '1.1rem'}}>High Demand: Limited Slots Available</div>
            <div style={{color: '#94a3b8', fontSize: '0.9rem', marginTop: '4px'}}>
              <Clock size={14} style={{display: 'inline', marginRight: '4px'}}/> Banani Branch is currently accepting priority patients
            </div>
          </div>
        </div>
        <Link href="/contact" className="cta-primary-btn">
          Book Priority Consultation <ChevronRight size={18} />
        </Link>
      </div>

    </div>
  );
}
