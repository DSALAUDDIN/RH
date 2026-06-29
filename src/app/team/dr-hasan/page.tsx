import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Award, CheckCircle2, ChevronRight, MapPin, Clock, Calendar, 
  ShieldCheck, Microscope, Star, ArrowUpRight
} from 'lucide-react';
import '../doctor.css';

export const metadata: Metadata = {
  title: 'Dr. B. M. Rafiqul Hasan Mehedi | RH Dental Clinic',
  description: 'Senior Oral & Dental Surgeon specializing in Digital & 3D Guided Implantology and Full Mouth Rehabilitation.',
};

export default function DrHasanPage() {
  return (
    <div className="doctor-profile-nm">
      
      {/* ── Hero Section (Halo Effect & Authority) ── */}
      <section className="doc-hero-nm">
        <div className="doc-hero-bg-glow"></div>
        <div className="doc-hero-container">
          
          <div className="doc-hero-content">
            <div className="doc-trust-badge">
              <ShieldCheck size={16} /> BMDC Verified Specialist (8496)
            </div>
            
            <h1 className="doc-hero-title">Dr. B. M. Rafiqul Hasan Mehedi</h1>
            <h2 className="doc-hero-subtitle">Senior Oral & Dental Surgeon</h2>
            
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
                <strong>5,000+</strong> Smiles Restored
              </div>
            </div>

            <div className="doc-actions-wrap">
              <span className="doc-urgency-tag">
                <Clock size={16} /> Limited Consultation Slots Available This Week
              </span>
              <Link href="/contact" className="doc-btn-primary">
                Book Priority Consultation <ArrowUpRight size={20} />
              </Link>
            </div>
          </div>

          <div className="doc-hero-image-wrap">
            <img 
              src="/assets/dr_hasan_office_notext.png" 
              alt="Dr. B. M. Rafiqul Hasan Mehedi" 
              className="doc-cutout-img"
            />
          </div>

        </div>
      </section>

      {/* ── Info Bar (Cognitive Ease) ── */}
      <div className="doc-info-bar">
        <div className="doc-info-grid">
          <div className="doc-info-item">
            <Award size={32} className="doc-info-icon" />
            <div className="doc-info-val">12+ Years</div>
            <div className="doc-info-lbl">Clinical Excellence</div>
          </div>
          <div className="doc-info-item">
            <CheckCircle2 size={32} className="doc-info-icon" />
            <div className="doc-info-val">BDS, MPH, PGT</div>
            <div className="doc-info-lbl">Advanced Qualifications</div>
          </div>
          <div className="doc-info-item">
            <MapPin size={32} className="doc-info-icon" />
            <div className="doc-info-val">Intl. Trained</div>
            <div className="doc-info-lbl">China, Korea, India</div>
          </div>
          <div className="doc-info-item">
            <Microscope size={32} className="doc-info-icon" />
            <div className="doc-info-val">3D Guided</div>
            <div className="doc-info-lbl">Digital Implantology</div>
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
                A distinguished Oral & Dental Surgeon known for his precision, advanced clinical expertise, and commitment to excellence in modern dentistry. With a strong academic background and extensive international training, he has established himself as a trusted name in advanced dental implant surgery and full mouth rehabilitation.
              </p>
              <p>
                Dr. Hasan has undergone advanced international training in Dental Implantology from China, Korea, and India, equipping him with skills to manage complex implant cases with predictable, long-term success. He also completed specialised training in Minimally Invasive Cosmetic Dentistry (MICD) in Nepal, Basic Orthodontics, and Advanced Implant Procedures & Digital Workflow.
              </p>
              <p>
                His practice is supported by a fully equipped in-house dental laboratory, allowing complete control over prosthesis design, precision, and quality — ensuring enhanced accuracy, faster turnaround, and superior aesthetic outcomes.
              </p>
            </div>
          </section>

          <section className="doc-section" style={{ marginTop: '4rem' }}>
            <h2 className="doc-section-title">Signature Expertise</h2>
            <div className="doc-bento-grid">
              
              <div className="doc-bento-card">
                <div className="doc-bento-icon"><Microscope size={28} /></div>
                <h3>Digital & 3D Guided Implantology</h3>
                <p>Pioneer in digital treatment planning and 3D-guided implant surgery for predictable, long-term outcomes.</p>
              </div>

              <div className="doc-bento-card">
                <div className="doc-bento-icon"><ShieldCheck size={28} /></div>
                <h3>In-House Lab for Precision Prosthesis</h3>
                <p>Complete control over design, quality, and turnaround time for superior aesthetic & functional results.</p>
              </div>

              <div className="doc-bento-card">
                <div className="doc-bento-icon"><Award size={28} /></div>
                <h3>Full Mouth Rehabilitation Expertise</h3>
                <p>Numerous complex rehabilitation cases completed with implants — restoring both function and patient confidence.</p>
              </div>

              <div className="doc-bento-card">
                <div className="doc-bento-icon"><CheckCircle2 size={28} /></div>
                <h3>Immediate Implant Placement & Loading</h3>
                <p>Single & multiple dental implants with complex bone management and aesthetic zone expertise.</p>
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
                <ChevronRight size={20} className="doc-side-icon" />
                <div className="doc-side-content">
                  <span className="doc-side-title">Sapporo Dental College (DU)</span>
                  <span className="doc-side-desc">BDS Degree</span>
                </div>
              </li>
              <li>
                <ChevronRight size={20} className="doc-side-icon" />
                <div className="doc-side-content">
                  <span className="doc-side-title">City University</span>
                  <span className="doc-side-desc">MPH Degree</span>
                </div>
              </li>
              <li>
                <ChevronRight size={20} className="doc-side-icon" />
                <div className="doc-side-content">
                  <span className="doc-side-title">BSM Medical University, Dhaka</span>
                  <span className="doc-side-desc">PGT (OMS & Prosthodontics)</span>
                </div>
              </li>
            </ul>
          </div>

          <div className="doc-side-card">
            <h3>Leadership & Experience</h3>
            <ul className="doc-side-list">
              <li>
                <Award size={20} className="doc-side-icon" />
                <div className="doc-side-content">
                  <span className="doc-side-title">Senior Lecturer (Since 2014)</span>
                  <span className="doc-side-desc">Saphena Women’s Dental College</span>
                </div>
              </li>
              <li>
                <CheckCircle2 size={20} className="doc-side-icon" />
                <div className="doc-side-content">
                  <span className="doc-side-title">Senior Oral & Dental Surgeon</span>
                  <span className="doc-side-desc">Labaid Dental Clinic, Gulshan</span>
                </div>
              </li>
            </ul>
          </div>

          <div className="doc-side-card" style={{ borderColor: 'rgba(56, 189, 248, 0.3)' }}>
            <h3>Ready to Transform Your Smile?</h3>
            <p style={{ color: '#94a3b8', fontSize: '0.95rem', marginBottom: '1.5rem', lineHeight: 1.6 }}>
              Join the thousands of patients who trust Dr. Hasan for their most complex dental needs.
            </p>
            <Link href="/contact" className="doc-btn-primary" style={{ width: '100%', fontSize: '1rem', padding: '1rem' }}>
              Reserve Your Consultation
            </Link>
          </div>

        </div>
      </div>

    </div>
  );
}
