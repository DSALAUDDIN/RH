import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Award, CheckCircle2, ChevronRight, MapPin, Clock, Calendar, 
  ShieldCheck, Microscope, Star, ArrowUpRight, Smile
} from 'lucide-react';
import '../doctor.css';

export const metadata: Metadata = {
  title: 'Dr. Shimia Binte Taher | RH Dental Clinic',
  description: 'Expert Dental Surgeon specializing in Comprehensive Oral Care.',
};

export default function DrShimiaPage() {
  return (
    <div className="doctor-profile-nm">
      
      {/* ── Hero Section (Halo Effect & Authority) ── */}
      <section className="doc-hero-nm">
        <div className="doc-hero-bg-glow" style={{ background: 'radial-gradient(circle, rgba(236, 72, 153, 0.2) 0%, transparent 60%)' }}></div>
        <div className="doc-hero-container">
          
          <div className="doc-hero-content">
            <div className="doc-trust-badge" style={{ color: '#f472b6', borderColor: 'rgba(244, 114, 182, 0.3)', background: 'rgba(244, 114, 182, 0.1)' }}>
              <ShieldCheck size={16} /> Certified Dental Expert
            </div>
            
            <h1 className="doc-hero-title">Dr. Shimia Binte Taher</h1>
            <h2 className="doc-hero-subtitle" style={{ color: '#f472b6' }}>Expert Dental Surgeon</h2>
            
            {/* Social Proof (Neuromarketing) */}
            <div className="doc-social-proof">
              <div className="doc-stars">
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
              </div>
              <div className="doc-sp-text">
                <strong>Gentle & Painless</strong> Dental Care
              </div>
            </div>

            <div className="doc-actions-wrap">
              <span className="doc-urgency-tag">
                <Clock size={16} /> High Demand - Limited Slots Available
              </span>
              <Link href="/contact" className="doc-btn-primary" style={{ background: 'linear-gradient(135deg, #f472b6, #db2777)', boxShadow: '0 10px 30px rgba(236, 72, 153, 0.4)' }}>
                Book Priority Consultation <ArrowUpRight size={20} />
              </Link>
            </div>
          </div>

          <div className="doc-hero-image-wrap">
            <img 
              src="/assets/dr_shimia_no_text.png" 
              alt="Dr. Shimia Binte Taher" 
              className="doc-cutout-img"
            />
          </div>

        </div>
      </section>

      {/* ── Info Bar (Cognitive Ease) ── */}
      <div className="doc-info-bar">
        <div className="doc-info-grid">
          <div className="doc-info-item">
            <Award size={32} className="doc-info-icon" style={{ color: '#f472b6' }} />
            <div className="doc-info-val">Expert</div>
            <div className="doc-info-lbl">Clinical Care</div>
          </div>
          <div className="doc-info-item">
            <CheckCircle2 size={32} className="doc-info-icon" style={{ color: '#f472b6' }} />
            <div className="doc-info-val">BDS</div>
            <div className="doc-info-lbl">Qualified Surgeon</div>
          </div>
          <div className="doc-info-item">
            <Smile size={32} className="doc-info-icon" style={{ color: '#f472b6' }} />
            <div className="doc-info-val">Painless</div>
            <div className="doc-info-lbl">Modern Dentistry</div>
          </div>
          <div className="doc-info-item">
            <Microscope size={32} className="doc-info-icon" style={{ color: '#f472b6' }} />
            <div className="doc-info-val">Precision</div>
            <div className="doc-info-lbl">Aesthetic Restorations</div>
          </div>
        </div>
      </div>

      {/* ── Content Section ── */}
      <div className="doc-content-nm">
        <div className="doc-main-col">
          
          <section className="doc-section">
            <h2 className="doc-section-title">The Expert Behind The Smile</h2>
            <div className="doc-bio-text">
              <p>
                Dr. Shimia Binte Taher is a highly skilled and compassionate dental professional dedicated to providing the highest quality of care to her patients. With a keen eye for aesthetics and a gentle approach, she ensures every patient leaves with a confident and healthy smile.
              </p>
              <p>
                Her practice focuses on delivering comprehensive dental treatments tailored to the unique needs of each individual. From routine preventive care to advanced cosmetic procedures, Dr. Shimia stays updated with the latest advancements in modern dentistry to ensure optimal outcomes.
              </p>
            </div>
          </section>

          <section className="doc-section" style={{ marginTop: '4rem' }}>
            <h2 className="doc-section-title">Signature Expertise</h2>
            <div className="doc-bento-grid">
              
              <div className="doc-bento-card">
                <div className="doc-bento-icon" style={{ color: '#f472b6', background: 'rgba(244, 114, 182, 0.1)' }}><Smile size={28} /></div>
                <h3>General & Preventive Dentistry</h3>
                <p>Comprehensive oral evaluations, cleanings, and patient education for long-term dental health.</p>
              </div>

              <div className="doc-bento-card">
                <div className="doc-bento-icon" style={{ color: '#f472b6', background: 'rgba(244, 114, 182, 0.1)' }}><ShieldCheck size={28} /></div>
                <h3>Aesthetic Restorations</h3>
                <p>High-quality tooth-colored fillings and aesthetic improvements to restore natural beauty.</p>
              </div>

              <div className="doc-bento-card">
                <div className="doc-bento-icon" style={{ color: '#f472b6', background: 'rgba(244, 114, 182, 0.1)' }}><CheckCircle2 size={28} /></div>
                <h3>Patient-Centric Care</h3>
                <p>Ensuring a comfortable, anxiety-free experience for patients of all ages with a gentle touch.</p>
              </div>

              <div className="doc-bento-card">
                <div className="doc-bento-icon" style={{ color: '#f472b6', background: 'rgba(244, 114, 182, 0.1)' }}><Microscope size={28} /></div>
                <h3>Modern Dental Techniques</h3>
                <p>Utilizing contemporary methods for efficient, effective, and predictable dental treatments.</p>
              </div>

            </div>
          </section>

        </div>

        {/* ── Sidebar (Authority & Proof) ── */}
        <div className="doc-sidebar-nm">
          
          <div className="doc-side-card">
            <h3>Academic Pedigree</h3>
            <ul className="doc-side-list">
              <li>
                <ChevronRight size={20} className="doc-side-icon" style={{ color: '#f472b6' }} />
                <div className="doc-side-content">
                  <span className="doc-side-title">BDS Degree</span>
                  <span className="doc-side-desc">Advanced Dental Surgery</span>
                </div>
              </li>
            </ul>
          </div>

          <div className="doc-side-card">
            <h3>Leadership & Experience</h3>
            <ul className="doc-side-list">
              <li>
                <CheckCircle2 size={20} className="doc-side-icon" style={{ color: '#f472b6' }} />
                <div className="doc-side-content">
                  <span className="doc-side-title">Expert Dental Surgeon</span>
                  <span className="doc-side-desc">RH Dental Clinic</span>
                </div>
              </li>
            </ul>
          </div>

          <div className="doc-side-card" style={{ borderColor: 'rgba(244, 114, 182, 0.3)' }}>
            <h3>Ready to Transform Your Smile?</h3>
            <p style={{ color: '#94a3b8', fontSize: '0.95rem', marginBottom: '1.5rem', lineHeight: 1.6 }}>
              Experience painless, modern dentistry with Dr. Shimia. Book your visit today.
            </p>
            <Link href="/contact" className="doc-btn-primary" style={{ width: '100%', fontSize: '1rem', padding: '1rem', background: 'linear-gradient(135deg, #f472b6, #db2777)', boxShadow: '0 10px 30px rgba(236, 72, 153, 0.4)' }}>
              Reserve Your Consultation
            </Link>
          </div>

        </div>
      </div>

    </div>
  );
}
