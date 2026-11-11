import Link from 'next/link';
import {
  Award,
  ShieldCheck,
  Microscope,
  MapPin,
  Star,
  CheckCircle2,
  ArrowRight,
  Phone,
} from 'lucide-react';
import './DhakaAuthoritySection.css';

export default function DhakaAuthoritySection() {
  return (
    <section className="dhaka-auth-section" id="best-dental-clinic-dhaka">
      <div className="dhaka-auth-container">
        {/* Header Header */}
        <div className="dhaka-auth-header">
          <div className="dhaka-auth-badge">
            <Award size={14} className="dhaka-auth-badge-icon" />
            <span>Top-Rated Dental Care in Dhaka</span>
          </div>
          <h2 className="dhaka-auth-title">
            Why Patients &amp; Specialists Rank RH Dental Care Among the{' '}
            <span className="dhaka-auth-highlight">Best Dental Clinics in Dhaka</span>
          </h2>
          <p className="dhaka-auth-subtitle">
            Operating since 2014, RH Dental Care combines hospital-grade clinical precision,
            advanced surgical microscopy, and a patient-first ethos across two prime centers in
            Banani and Banasree.
          </p>
        </div>

        {/* 4 Core Pillars Grid */}
        <div className="dhaka-auth-grid">
          <div className="dhaka-auth-card">
            <div className="dhaka-auth-card-icon-wrap icon-gold">
              <Star size={24} />
            </div>
            <div className="dhaka-auth-card-rating">5.0 ★ Google Rating</div>
            <h3 className="dhaka-auth-card-title">200+ Verified Patient Reviews</h3>
            <p className="dhaka-auth-card-desc">
              Unanimously rated 5.0 stars across both Banani and Banasree listings for painless
              procedures, transparent treatment plans, and zero hidden costs.
            </p>
            <div className="dhaka-auth-card-meta">
              <span>✓ 48+ Reviews in Banani</span>
              <span>✓ 215+ Reviews in Banasree</span>
            </div>
          </div>

          <div className="dhaka-auth-card">
            <div className="dhaka-auth-card-icon-wrap icon-blue">
              <Microscope size={24} />
            </div>
            <div className="dhaka-auth-card-tag">Advanced Technology</div>
            <h3 className="dhaka-auth-card-title">Surgical Microscopy &amp; 3D Scanners</h3>
            <p className="dhaka-auth-card-desc">
              Equipped with Carl Zeiss &amp; Labomed operating microscopes for root canal precision,
              intraoral 3D scanners, and authentic Osstem implant surgical motor kits.
            </p>
            <div className="dhaka-auth-card-meta">
              <span>✓ Class-B Vacuum Autoclaves</span>
              <span>✓ Digital Apex Locators</span>
            </div>
          </div>

          <div className="dhaka-auth-card">
            <div className="dhaka-auth-card-icon-wrap icon-amber">
              <MapPin size={24} />
            </div>
            <div className="dhaka-auth-card-tag">Strategic Accessibility</div>
            <h3 className="dhaka-auth-card-title">Two Distinct Centers in Dhaka</h3>
            <p className="dhaka-auth-card-desc">
              A private appointment suite on Road 11 Banani for executive and NRB privacy, alongside
              our multi-chair flagship hospital in Block C Banasree for full-service care.
            </p>
            <div className="dhaka-auth-card-meta">
              <span>✓ Road 11, Banani</span>
              <span>✓ Block C, Banasree</span>
            </div>
          </div>

          <div className="dhaka-auth-card">
            <div className="dhaka-auth-card-icon-wrap icon-green">
              <ShieldCheck size={24} />
            </div>
            <div className="dhaka-auth-card-tag">Specialist Faculty</div>
            <h3 className="dhaka-auth-card-title">BSMMU &amp; PGT Qualified Doctors</h3>
            <p className="dhaka-auth-card-desc">
              Spearheaded by Dr. Mehedi Hasan and senior consultants holding postgraduate
              credentials from BSMMU and MICD training in Nepal, ensuring hospital-level standards.
            </p>
            <div className="dhaka-auth-card-meta">
              <span>✓ Microscopic Endodontists</span>
              <span>✓ Certified Implantologists</span>
            </div>
          </div>
        </div>

        {/* Quick Treatment Capabilities Bar */}
        <div className="dhaka-auth-treatments">
          <div className="dhaka-auth-treatments-title">
            Specialized Treatments Provided at RH Dental Care Dhaka:
          </div>
          <div className="dhaka-auth-treatments-pills">
            <Link href="/dental-implant-dhaka" className="dhaka-treatment-pill">
              <CheckCircle2 size={13} />
              <span>Dental Implants (Osstem)</span>
            </Link>
            <Link href="/clear-aligner-treatment-dhaka" className="dhaka-treatment-pill">
              <CheckCircle2 size={13} />
              <span>Clear Aligners &amp; Braces</span>
            </Link>
            <Link href="/root-canal-treatment-dhaka" className="dhaka-treatment-pill">
              <CheckCircle2 size={13} />
              <span>Microscopic Root Canal</span>
            </Link>
            <Link href="/zirconia-crown" className="dhaka-treatment-pill">
              <CheckCircle2 size={13} />
              <span>CAD/CAM Zirconia Crowns</span>
            </Link>
            <Link href="/smile-designing-bangladesh" className="dhaka-treatment-pill">
              <CheckCircle2 size={13} />
              <span>Porcelain Veneers &amp; Smile Design</span>
            </Link>
            <Link href="/kids-care" className="dhaka-treatment-pill">
              <CheckCircle2 size={13} />
              <span>Pediatric &amp; Special Child Care</span>
            </Link>
          </div>
        </div>

        {/* CTA Bar */}
        <div className="dhaka-auth-footer-cta">
          <div className="dhaka-auth-cta-text">
            <h4>Choosing the right dental clinic in Dhaka?</h4>
            <p>
              Consult directly with our specialist team for a clear clinical assessment and itemized
              plan.
            </p>
          </div>
          <div className="dhaka-auth-cta-actions">
            <Link href="/best-dental-clinic-in-dhaka" className="dhaka-cta-guide-btn">
              <span>View Full Dhaka Clinic Guide</span>
              <ArrowRight size={16} />
            </Link>
            <a href="tel:+8801721367622" className="dhaka-cta-phone-btn">
              <Phone size={15} />
              <span>Banani: 01721-367622</span>
            </a>
            <a href="tel:+8801775227902" className="dhaka-cta-phone-btn">
              <Phone size={15} />
              <span>Banasree: 01775-227902</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
