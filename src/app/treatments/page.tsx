'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, Search, ChevronDown, ChevronUp, Phone, Calendar,
  Activity, Scissors, Smile, Baby, Layers, Crown, Sparkles, Plus, Star,
  ShieldCheck, Award, Heart, Clock, CheckCircle2, TrendingUp, Users
} from 'lucide-react';
import './treatments.css';

/* ────────────────────────────────────────────────
   Treatment Data — All 8 Categories
──────────────────────────────────────────────── */
interface Treatment {
  name: string;
  description?: string;
  highlight?: boolean;
}

interface Category {
  id: string;
  title: string;
  focus: string;
  icon: React.ReactNode;
  color: string;
  colorLight: string;
  colorBg: string;
  treatments: Treatment[];
}

const categories: Category[] = [
  {
    id: 'periodontology',
    title: 'Periodontology',
    focus: 'Diagnosis, prevention, and treatment of gum diseases',
    icon: <Activity size={22} />,
    color: '#0ea5e9',
    colorLight: '#e0f2fe',
    colorBg: 'linear-gradient(135deg, #0ea5e9, #0284c7)',
    treatments: [
      { name: 'Deep Curettage', description: 'Non-surgical periodontal scaling and root planing. Removes plaque, tartar & bacterial toxins from deep pockets.' },
      { name: 'Scaling', description: 'Professional dental cleaning to remove plaque, tartar & stains. Prevents gum disease and improves oral hygiene.' },
      { name: 'Polishing', description: 'Tooth surface polishing to smooth enamel, resist future plaque and improve appearance.' },
      { name: 'Periodontal Therapy with Laser (Deep Curettage)', description: 'Laser-assisted therapy for precise, minimally invasive treatment of gum disease with faster healing.', highlight: true },
      { name: 'Perio Flap Surgery', description: 'Surgical treatment for advanced periodontitis. Lifts gums to access and clean deep pockets and bone.' },
      { name: 'Bone Graft', description: 'Rebuilds jawbone to support teeth and implants after disease-related bone loss.' },
    ],
  },
  {
    id: 'oral-surgery',
    title: 'Oral & Maxillofacial Surgery',
    focus: 'Surgical management of oral diseases, trauma, and reconstruction',
    icon: <Scissors size={22} />,
    color: '#ef4444',
    colorLight: '#fee2e2',
    colorBg: 'linear-gradient(135deg, #ef4444, #dc2626)',
    treatments: [
      { name: 'Tooth Extraction (Surgical)', description: 'Surgical removal of impacted, fractured, or severely decayed teeth under local anesthesia.' },
      { name: 'Minor OT (Oral Surgery)', description: 'Minor surgical procedures including frenectomy, biopsies, abscess removal and alveoloplasty.' },
      { name: 'Major Oral Surgery', description: 'Complex interventions for severe dental and facial issues by oral & maxillofacial surgeons.', highlight: true },
      { name: 'Operculectomy', description: 'Removal of soft tissue covering a partially erupted tooth to relieve pain and prevent infection.' },
      { name: 'Apicoectomy', description: 'Root-end surgery to remove the tip of a tooth root and infected tissue when root canal fails.' },
      { name: 'Cyst Removal', description: 'Surgical removal of fluid-filled dental cysts from around teeth or jawbone.' },
      { name: 'Orthognathic Surgery', description: 'Corrective jaw surgery to fix severe misalignments, improving bite, breathing, and facial aesthetics.', highlight: true },
      { name: 'Dental Implant (SA-SOI)', description: 'Surgically placed titanium posts to permanently replace missing teeth with natural-looking crowns.', highlight: true },
    ],
  },
  {
    id: 'conservative',
    title: 'Conservative Dentistry & Endodontics',
    focus: 'Preservation and restoration of natural teeth',
    icon: <Smile size={22} />,
    color: '#6366f1',
    colorLight: '#ede9fe',
    colorBg: 'linear-gradient(135deg, #6366f1, #4f46e5)',
    treatments: [
      { name: 'RCT / RE-RCT', description: 'Root canal treatment to remove infected pulp, clean canals and seal the tooth to save it from extraction.', highlight: true },
      { name: 'Single Visit RCT with Resin Crown Prosthesis', description: 'Complete root canal therapy + resin crown placed in one efficient appointment using advanced technology.', highlight: true },
      { name: 'Dental Fillings / Restoration', description: 'Composite or glass ionomer filling to restore cavities and damaged tooth structure.' },
      { name: 'RCT Tooth (Build-Up)', description: 'Rebuilds the internal structure of a tooth after RCT to prepare it for crown placement.' },
      { name: 'Core Build-Up with Lab Post', description: 'Custom lab post inserted into root canal to reinforce severely damaged tooth before crown placement.' },
      { name: 'Apexification / Apexogenesis', description: 'Induces root closure in immature teeth with open apexes or stimulates continued root development.' },
      { name: 'Pulp Capping with Diode Laser', description: 'Laser-assisted pulp protection to preserve tooth vitality and avoid root canal treatment.', highlight: true },
      { name: 'Inlay / Onlay', description: 'Custom-crafted porcelain or composite restorations for moderate decay that\'s too large for a filling.' },
      { name: 'Grinding of Sharp Teeth', description: 'Reshaping sharp or uneven tooth edges to prevent irritation and improve bite function.' },
      { name: 'Fracture Management of Tooth with Zirconia Crown', description: 'Management of fractured teeth with endodontic treatment and zirconia crown restoration.' },
    ],
  },
  {
    id: 'pediatric',
    title: 'Pediatric Dentistry',
    focus: 'Comprehensive dental care for children',
    icon: <Baby size={22} />,
    color: '#f97316',
    colorLight: '#ffedd5',
    colorBg: 'linear-gradient(135deg, #f97316, #ea580c)',
    treatments: [
      { name: 'Tooth Extraction (Child)', description: 'Gentle extraction of severely decayed, stubborn baby teeth or orthodontic preparation under local anesthesia.' },
      { name: 'Deciduous Filling', description: 'Composite or glass ionomer fillings to restore cavities in baby teeth and protect dental development.' },
      { name: 'Pulpectomy / Pulpotomy', description: 'Root canal-equivalent treatment for infected baby teeth — saving the tooth to maintain space for permanent teeth.', highlight: true },
    ],
  },
  {
    id: 'orthodontics',
    title: 'Orthodontics & Dentofacial Orthopedics',
    focus: 'Alignment of teeth and correction of jaw irregularities',
    icon: <Layers size={22} />,
    color: '#8b5cf6',
    colorLight: '#f3e8ff',
    colorBg: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
    treatments: [
      { name: 'Orthodontic Braces', description: 'Traditional or ceramic brackets and wires to straighten teeth. Custom-planned using 3D imaging.', highlight: true },
      { name: 'Orthodontic Aligner', description: 'Clear, removable custom trays for discreet teeth straightening — no brackets or wires.', highlight: true },
      { name: 'Removable Orthodontics', description: 'Removable appliances for mild to moderate alignment issues. Comfortable and easy to maintain.' },
      { name: 'Night Guard', description: 'Custom-fitted dental appliance to protect teeth from bruxism (grinding) and TMJ disorders during sleep.' },
    ],
  },
  {
    id: 'prosthodontics',
    title: 'Prosthodontics',
    focus: 'Restoration and replacement of missing teeth',
    icon: <Crown size={22} />,
    color: '#f59e0b',
    colorLight: '#fef3c7',
    colorBg: 'linear-gradient(135deg, #f59e0b, #d97706)',
    treatments: [
      { name: 'Re-insertion of Dislodged Crown', description: 'Re-cementing a crown that has fallen off or become loose back onto the prepared tooth.' },
      { name: 'Crown (Porcelain / Metal)', description: 'Ceramic or metal dental cap to fully cover and restore a damaged, decayed or root-canal-treated tooth.' },
      { name: 'Zirconium Crown', description: 'Premium ultra-strong, natural-looking ceramic crown. Biocompatible and stain-resistant.', highlight: true },
      { name: 'Gold Crown', description: 'Pure gold alloy crown offering exceptional longevity and durability for posterior teeth.', highlight: true },
      { name: 'Complete Denture (per jaw)', description: 'Full removable denture replacing all teeth in one jaw, restoring appearance and chewing function.' },
      { name: 'Partial Denture Per Unit', description: 'Removable prosthesis replacing one or a few missing teeth, attached to remaining natural teeth.' },
      { name: 'Flexible Denture (Partial)', description: 'Thermoplastic nylon-based partial denture — lightweight, comfortable and mercury-free.' },
      { name: 'Fiber Bridge (Per Unit)', description: 'Minimally invasive fiber-reinforced composite bridge for single front tooth replacement without surgery.' },
      { name: 'Full Mouth Rehabilitation (Per Jaw)', description: 'Comprehensive full-arch restoration for severely worn, damaged or missing teeth using crowns, implants and more.', highlight: true },
      { name: 'Smile Designing with Composite', description: 'Complete smile makeover using tooth-colored composite resin for veneers and reshaping.' },
      { name: 'Crown (Resin)', description: 'Tooth-colored resin crown offering aesthetics and strength, especially for anterior teeth.' },
      { name: 'Partial Denture (More Than 3 Units)', description: 'Removable partial denture replacing multiple missing teeth across more than 3 units.' },
    ],
  },
  {
    id: 'aesthetic',
    title: 'Aesthetic Dentistry',
    focus: 'Improving the appearance of teeth and smile',
    icon: <Sparkles size={22} />,
    color: '#ec4899',
    colorLight: '#fce7f3',
    colorBg: 'linear-gradient(135deg, #ec4899, #db2777)',
    treatments: [
      { name: 'Smile Designing', description: 'Comprehensive smile makeover blending art and science for a naturally perfect, camera-ready smile.', highlight: true },
      { name: 'Anterior Build-Up (Direct Veneer)', description: 'Composite resin applied to front teeth to improve shape, size, and color in a single visit.' },
      { name: 'Anterior Build-Up (Indirect Veneer)', description: 'Custom lab-crafted porcelain veneers for precise aesthetics and longer-lasting results.', highlight: true },
      { name: 'Dental Jewelry', description: 'Crystal or gem tooth jewelry bonded safely to a tooth for a sparkling, fashionable accent.' },
      { name: 'Tooth Whitening / Bleaching', description: 'Professional in-office laser whitening to remove deep stains and deliver a brighter smile in one hour.' },
      { name: 'Digital Impressions', description: 'State-of-the-art digital scanning for accurate, comfortable impressions without traditional trays.' },
      { name: 'Intraoral Scanning', description: '3D intraoral scanner for precise treatment planning and digital prosthetics fabrication.' },
      { name: 'Space Closer (Midline Diastema Closure)', description: 'Non-surgical closure of front tooth gap using composite bonding or orthodontic techniques.' },
    ],
  },
  {
    id: 'additional',
    title: 'Additional Treatments',
    focus: 'Cross-Departmental Focus',
    icon: <Plus size={22} />,
    color: '#10b981',
    colorLight: '#d1fae5',
    colorBg: 'linear-gradient(135deg, #10b981, #059669)',
    treatments: [
      { name: 'PRF (Platelet-Rich Fibrin)', description: 'Regenerative technique using patient\'s own blood to accelerate healing in grafts and periodontal procedures.' },
      { name: 'Dressing', description: 'Post-surgical wound dressing to protect surgical sites and support healing.' },
      { name: 'TMJ Therapy (Per Session)', description: 'Targeted therapy for temporomandibular joint disorders — relieves jaw pain, clicking, and stiffness.' },
      { name: 'Steroid Therapy (Per Session)', description: 'Corticosteroid injection or topical therapy to reduce oral inflammation and pain.' },
    ],
  },
];

/* ─── Signature Treatments ─── */
const signatureTreatments = [
  {
    sn: '01',
    name: 'Single-Visit Root Canal with Laser & Resin Crown',
    desc: 'Combines laser-assisted root canal therapy with intraoral scanner and 3D printer-fabricated resin crown — all in one day.',
    duration: '1 Day (3–4 hrs)',
    visits: '1',
    color: '#6366f1',
  },
  {
    sn: '02',
    name: 'Immediate Dental Implant with Prosthesis',
    desc: 'Same-day implant placement and prosthesis attachment. Minimizes treatment time, restores function and aesthetics quickly.',
    duration: '1 Day (7–21 hrs)',
    visits: '3+',
    color: '#0ea5e9',
  },
  {
    sn: '03',
    name: 'Laser Teeth Whitening',
    desc: 'Advanced laser-activated whitening gel removes deep stains. Safe, non-invasive, and delivers dramatic results in just 1 hour.',
    duration: '1 Hour',
    visits: '1',
    color: '#f59e0b',
  },
  {
    sn: '04',
    name: 'Use of PRF in Different Grafts',
    desc: 'Platelet-Rich Fibrin is applied in bone grafts, sinus lifts, and periodontal treatments to accelerate healing and tissue regeneration.',
    duration: '—',
    visits: '—',
    color: '#10b981',
  },
];

export default function TreatmentsPage() {
  const [openCategory, setOpenCategory] = useState<string | null>('periodontology');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCategories = searchQuery
    ? categories.map((cat) => ({
        ...cat,
        treatments: cat.treatments.filter((t) =>
          t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (t.description && t.description.toLowerCase().includes(searchQuery.toLowerCase()))
        ),
      })).filter((cat) => cat.treatments.length > 0)
    : categories;

  return (
    <div className="treatments-modern">
      {/* ── HERO: Emotion & Value Anchoring ── */}
      <section className="tr-hero">
        <div className="tr-hero-content">
          <Link href="/specialties" className="tr-back-link" onMouseEnter={(e) => e.currentTarget.style.color = '#fff'} onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.6)'}>
            <ArrowLeft size={16} />
            Back to Specialties
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="tr-badge pulse-glow">
              <Star size={14} fill="currentColor" />
              World-Class Dental Excellence
            </div>

            <h1 className="tr-hero-title">
              Your Confidence, <br />
              <span className="text-gradient">Architected to Perfection.</span>
            </h1>
            <p className="tr-hero-desc">
              Discover life-changing dental care. We combine agency-grade precision, advanced technology, and absolute comfort to deliver the smile you deserve.
            </p>

            {/* Social Proof & Authority Indicators */}
            <div className="tr-trust-row">
              <div className="tr-trust-item">
                <Users className="tr-trust-icon" size={24} />
                <div className="tr-trust-text">
                  <strong>Thousands of</strong>
                  <span>Happy Patients</span>
                </div>
              </div>
              <div className="tr-trust-item">
                <TrendingUp className="tr-trust-icon" size={24} />
                <div className="tr-trust-text">
                  <strong>99.8%</strong>
                  <span>Success Rate</span>
                </div>
              </div>
              <div className="tr-trust-item">
                <ShieldCheck className="tr-trust-icon" size={24} />
                <div className="tr-trust-text">
                  <strong>Lifetime</strong>
                  <span>Care Commitment</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="tr-container">

        {/* ── Search Bar: Cognitive Ease ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="tr-search-container"
        >
          <Search size={22} className="tr-search-icon" />
          <input
            type="text"
            placeholder="Search our premium treatments (e.g. Implants, Whitening...)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="tr-search-input"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="tr-search-clear"
            >
              ×
            </button>
          )}
        </motion.div>

        {/* ── Signature Treatments Bento (Authority & Contrast) ── */}
        {!searchQuery && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <div className="tr-section-header">
              <h2>Signature Transformations</h2>
              <p>Our most exclusive and highly requested life-changing procedures.</p>
            </div>

            <div className="tr-signature-grid">
              {signatureTreatments.map((st, i) => (
                <motion.div
                  key={st.sn}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: i * 0.1 }}
                  className="tr-bento-card glass-panel"
                >
                  <div className="tr-bento-glow" style={{ background: st.color }}></div>
                  <div className="tr-bento-header">
                    <span className="tr-bento-sn">{st.sn}</span>
                    <Award size={28} color={st.color} style={{ opacity: 0.8 }} />
                  </div>
                  <h3>{st.name}</h3>
                  <p>{st.desc}</p>
                  <div className="tr-bento-meta">
                    <div className="tr-bento-meta-item">
                      <Clock size={16} /> {st.duration}
                    </div>
                    <div className="tr-bento-meta-item">
                      <Calendar size={16} /> {st.visits} Visit{st.visits !== '1' ? 's' : ''}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* ── Category Accordions (Organized Exploration) ── */}
        <div className="tr-section-header" style={{ marginTop: searchQuery ? '0' : '5rem' }}>
          <h2>{searchQuery ? 'Search Results' : 'Comprehensive Care Menu'}</h2>
          {!searchQuery && <p>Explore our 8 specialized departments offering world-class solutions.</p>}
        </div>

        <div className="tr-accordion-wrapper">
          {filteredCategories.map((cat, catIdx) => {
            const isOpen = searchQuery ? true : openCategory === cat.id;
            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: catIdx * 0.05 }}
                className={`tr-category-card ${isOpen ? 'is-open' : ''}`}
                style={{
                  '--cat-color': cat.color,
                  '--cat-color-light': cat.colorLight,
                  '--cat-color-bg': cat.colorBg,
                } as React.CSSProperties}
              >
                <button
                  className="tr-category-btn"
                  onClick={() => !searchQuery && setOpenCategory(isOpen ? null : cat.id)}
                  style={{ cursor: searchQuery ? 'default' : 'pointer' }}
                >
                  <div className="tr-cat-info">
                    <div className="tr-cat-icon">
                      {cat.icon}
                    </div>
                    <div className="tr-cat-text-wrap">
                      <h2 className="tr-cat-title">{cat.title}</h2>
                      <div className="tr-cat-meta">
                        <span className="tr-cat-focus">{cat.focus}</span>
                        <span className="tr-cat-count">
                          {cat.treatments.length} Procedures
                        </span>
                      </div>
                    </div>
                  </div>
                  {!searchQuery && (
                    <div className="tr-cat-chevron">
                      <ChevronDown size={28} />
                    </div>
                  )}
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="tr-treatment-collapse"
                    >
                      <div className="tr-treatment-list">
                        <div className="tr-treatment-divider" />
                        {cat.treatments.map((treatment, tIdx) => (
                          <motion.div
                            key={tIdx}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: tIdx * 0.02 }}
                            className={`tr-treatment-item ${treatment.highlight ? 'highlight' : ''}`}
                          >
                            <div className="tr-treatment-content">
                              <div className="tr-treatment-head">
                                <h3 className="tr-treatment-name">
                                  {treatment.highlight && <CheckCircle2 size={16} className="tr-highlight-icon" />}
                                  {treatment.name}
                                </h3>
                                {treatment.highlight && (
                                  <span className="tr-badge-featured">
                                    PREMIUM
                                  </span>
                                )}
                              </div>
                              {treatment.description && (
                                <p className="tr-treatment-desc">{treatment.description}</p>
                              )}
                            </div>
                            <div className="tr-treatment-action">
                              <Link href="/contact" className="tr-inquire-btn">
                                Inquire <ArrowLeft size={14} style={{ transform: 'rotate(135deg)' }} />
                              </Link>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
        
        {/* ── CTA Section: Scarcity & Urgency (FOMO) ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="tr-cta-section glass-panel"
        >
          <div className="tr-cta-content">
            <div className="tr-cta-badge">Limited Availability</div>
            <h2>
              Ready for Your Transformation?
            </h2>
            <p>
              Due to high demand for our elite specialists, we have limited priority consultation slots remaining for this week. Secure your spot now and take the first step towards your perfect smile.
            </p>
            <div className="tr-cta-actions">
              <Link href="/contact" className="tr-btn-primary">
                Secure Priority Consultation <ArrowLeft size={18} style={{ transform: 'rotate(135deg)', marginLeft: '0.5rem' }} />
              </Link>
              <div className="tr-cta-note">
                <Clock size={14} /> Only 3 priority slots left this week
              </div>
            </div>
          </div>
          <div className="tr-cta-bg-fx"></div>
        </motion.div>

      </div>
    </div>
  );
}
