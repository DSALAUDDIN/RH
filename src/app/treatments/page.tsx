'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, Search, ChevronDown,
  Activity, Scissors, Smile, Baby, Layers, Crown, Sparkles, Plus, Star
} from 'lucide-react';
import './treatments.css';

/* ────────────────────────────────────────────────
   Treatment Data — All 8 Categories
──────────────────────────────────────────────── */
interface Treatment {
  name: string;
  price?: string;
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
      { name: 'Deep Curettage', price: '৳1,000', description: 'Non-surgical periodontal scaling and root planing. Removes plaque, tartar & bacterial toxins from deep pockets.' },
      { name: 'Scaling', price: '৳2,000', description: 'Professional dental cleaning to remove plaque, tartar & stains. Prevents gum disease and improves oral hygiene.' },
      { name: 'Polishing', price: '৳1,000', description: 'Tooth surface polishing to smooth enamel, resist future plaque and improve appearance.' },
      { name: 'Periodontal Therapy with Laser (Deep Curettage)', price: '৳2,000', description: 'Laser-assisted therapy for precise, minimally invasive treatment of gum disease with faster healing.', highlight: true },
      { name: 'Perio Flap Surgery', price: '৳15,000', description: 'Surgical treatment for advanced periodontitis. Lifts gums to access and clean deep pockets and bone.' },
      { name: 'Bone Graft', price: '৳10,000', description: 'Rebuilds jawbone to support teeth and implants after disease-related bone loss.' },
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
      { name: 'Tooth Extraction (Surgical)', price: '৳4,000 – 8,000', description: 'Surgical removal of impacted, fractured, or severely decayed teeth under local anesthesia.' },
      { name: 'Minor OT (Oral Surgery)', price: '৳10,000 – 15,000', description: 'Minor surgical procedures including frenectomy, biopsies, abscess removal and alveoloplasty.' },
      { name: 'Major Oral Surgery', price: '৳70,000', description: 'Complex interventions for severe dental and facial issues by oral & maxillofacial surgeons.', highlight: true },
      { name: 'Operculectomy', description: 'Removal of soft tissue covering a partially erupted tooth to relieve pain and prevent infection.' },
      { name: 'Apicoectomy', description: 'Root-end surgery to remove the tip of a tooth root and infected tissue when root canal fails.' },
      { name: 'Cyst Removal', price: '৳10,000', description: 'Surgical removal of fluid-filled dental cysts from around teeth or jawbone.' },
      { name: 'Orthognathic Surgery', price: '৳400,000', description: 'Corrective jaw surgery to fix severe misalignments, improving bite, breathing, and facial aesthetics.', highlight: true },
      { name: 'Dental Implant (SA-SOI)', price: '৳70,000 – 80,000', description: 'Surgically placed titanium posts to permanently replace missing teeth with natural-looking crowns.', highlight: true },
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
      { name: 'RCT / RE-RCT', price: '৳5,000 – 7,000', description: 'Root canal treatment to remove infected pulp, clean canals and seal the tooth to save it from extraction.', highlight: true },
      { name: 'Single Visit RCT with Resin Crown Prosthesis', price: '৳30,000', description: 'Complete root canal therapy + resin crown placed in one efficient appointment using advanced technology.', highlight: true },
      { name: 'Dental Fillings / Restoration', price: '৳2,500 – 3,000', description: 'Composite or glass ionomer filling to restore cavities and damaged tooth structure.' },
      { name: 'RCT Tooth (Build-Up)', price: '৳2,000', description: 'Rebuilds the internal structure of a tooth after RCT to prepare it for crown placement.' },
      { name: 'Core Build-Up with Lab Post', price: '৳2,000', description: 'Custom lab post inserted into root canal to reinforce severely damaged tooth before crown placement.' },
      { name: 'Apexification / Apexogenesis', price: '৳10,000', description: 'Induces root closure in immature teeth with open apexes or stimulates continued root development.' },
      { name: 'Pulp Capping with Diode Laser', price: '৳8,000', description: 'Laser-assisted pulp protection to preserve tooth vitality and avoid root canal treatment.', highlight: true },
      { name: 'Inlay / Onlay', price: '৳8,000', description: 'Custom-crafted porcelain or composite restorations for moderate decay that\'s too large for a filling.' },
      { name: 'Grinding of Sharp Teeth', price: '৳1,500', description: 'Reshaping sharp or uneven tooth edges to prevent irritation and improve bite function.' },
      { name: 'Fracture Management of Tooth with Zirconia Crown', price: '৳20,000', description: 'Management of fractured teeth with endodontic treatment and zirconia crown restoration.' },
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
      { name: 'Tooth Extraction (Child)', price: '৳400+', description: 'Gentle extraction of severely decayed, stubborn baby teeth or orthodontic preparation under local anesthesia.' },
      { name: 'Deciduous Filling', description: 'Composite or glass ionomer fillings to restore cavities in baby teeth and protect dental development.' },
      { name: 'Pulpectomy / Pulpotomy', price: '৳3,000', description: 'Root canal-equivalent treatment for infected baby teeth — saving the tooth to maintain space for permanent teeth.', highlight: true },
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
      { name: 'Orthodontic Braces', price: '৳80,000 – 1,20,000', description: 'Traditional or ceramic brackets and wires to straighten teeth. Custom-planned using 3D imaging.', highlight: true },
      { name: 'Orthodontic Aligner', price: '৳25,000 – 30,000', description: 'Clear, removable custom trays for discreet teeth straightening — no brackets or wires.', highlight: true },
      { name: 'Removable Orthodontics', description: 'Removable appliances for mild to moderate alignment issues. Comfortable and easy to maintain.' },
      { name: 'Night Guard', price: '৳4,000', description: 'Custom-fitted dental appliance to protect teeth from bruxism (grinding) and TMJ disorders during sleep.' },
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
      { name: 'Re-insertion of Dislodged Crown', price: '৳1,500', description: 'Re-cementing a crown that has fallen off or become loose back onto the prepared tooth.' },
      { name: 'Crown (Porcelain / Metal)', price: '৳6,000 – 8,000', description: 'Ceramic or metal dental cap to fully cover and restore a damaged, decayed or root-canal-treated tooth.' },
      { name: 'Zirconium Crown', price: '৳20,000', description: 'Premium ultra-strong, natural-looking ceramic crown. Biocompatible and stain-resistant.', highlight: true },
      { name: 'Gold Crown', price: '৳1,50,000', description: 'Pure gold alloy crown offering exceptional longevity and durability for posterior teeth.', highlight: true },
      { name: 'Complete Denture (per jaw)', price: '৳30,000', description: 'Full removable denture replacing all teeth in one jaw, restoring appearance and chewing function.' },
      { name: 'Partial Denture Per Unit', price: '৳6,000', description: 'Removable prosthesis replacing one or a few missing teeth, attached to remaining natural teeth.' },
      { name: 'Flexible Denture (Partial)', price: '৳20,000', description: 'Thermoplastic nylon-based partial denture — lightweight, comfortable and mercury-free.' },
      { name: 'Fiber Bridge (Per Unit)', price: '৳25,000', description: 'Minimally invasive fiber-reinforced composite bridge for single front tooth replacement without surgery.' },
      { name: 'Full Mouth Rehabilitation (Per Jaw)', price: '৳3,00,000', description: 'Comprehensive full-arch restoration for severely worn, damaged or missing teeth using crowns, implants and more.', highlight: true },
      { name: 'Smile Designing with Composite', price: '৳60,000', description: 'Complete smile makeover using tooth-colored composite resin for veneers and reshaping.' },
      { name: 'Crown (Resin)', price: '৳12,000', description: 'Tooth-colored resin crown offering aesthetics and strength, especially for anterior teeth.' },
      { name: 'Partial Denture (More Than 3 Units)', price: '৳15,000', description: 'Removable partial denture replacing multiple missing teeth across more than 3 units.' },
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
      { name: 'Smile Designing', price: '৳60,000', description: 'Comprehensive smile makeover blending art and science for a naturally perfect, camera-ready smile.', highlight: true },
      { name: 'Anterior Build-Up (Direct Veneer)', price: '৳8,000 – 12,000', description: 'Composite resin applied to front teeth to improve shape, size, and color in a single visit.' },
      { name: 'Anterior Build-Up (Indirect Veneer)', price: '৳20,000', description: 'Custom lab-crafted porcelain veneers for precise aesthetics and longer-lasting results.', highlight: true },
      { name: 'Dental Jewelry', price: '৳6,000', description: 'Crystal or gem tooth jewelry bonded safely to a tooth for a sparkling, fashionable accent.' },
      { name: 'Tooth Whitening / Bleaching', price: '৳12,000', description: 'Professional in-office laser whitening to remove deep stains and deliver a brighter smile in one hour.' },
      { name: 'Digital Impressions', price: '৳2,000', description: 'State-of-the-art digital scanning for accurate, comfortable impressions without traditional trays.' },
      { name: 'Intraoral Scanning', price: '৳2,000', description: '3D intraoral scanner for precise treatment planning and digital prosthetics fabrication.' },
      { name: 'Space Closer (Midline Diastema Closure)', price: '৳8,000 – 12,000', description: 'Non-surgical closure of front tooth gap using composite bonding or orthodontic techniques.' },
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
      { name: 'PRF (Platelet-Rich Fibrin)', price: '৳5,000', description: 'Regenerative technique using patient\'s own blood to accelerate healing in grafts and periodontal procedures.' },
      { name: 'Dressing', price: '৳500', description: 'Post-surgical wound dressing to protect surgical sites and support healing.' },
      { name: 'TMJ Therapy (Per Session)', price: '৳1,000', description: 'Targeted therapy for temporomandibular joint disorders — relieves jaw pain, clicking, and stiffness.' },
      { name: 'Steroid Therapy (Per Session)', price: '৳1,000', description: 'Corticosteroid injection or topical therapy to reduce oral inflammation and pain.' },
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
    price: '৳30,000',
    color: '#6366f1',
  },
  {
    sn: '02',
    name: 'Immediate Dental Implant with Prosthesis',
    desc: 'Same-day implant placement and prosthesis attachment. Minimizes treatment time, restores function and aesthetics quickly.',
    duration: '1 Day (7–21 hrs)',
    visits: '3+',
    price: '৳70,000 – 80,000',
    color: '#0ea5e9',
  },
  {
    sn: '03',
    name: 'Laser Teeth Whitening',
    desc: 'Advanced laser-activated whitening gel removes deep stains. Safe, non-invasive, and delivers dramatic results in just 1 hour.',
    duration: '1 Hour',
    visits: '1',
    price: '৳12,000',
    color: '#f59e0b',
  },
  {
    sn: '04',
    name: 'Use of PRF in Different Grafts',
    desc: 'Platelet-Rich Fibrin is applied in bone grafts, sinus lifts, and periodontal treatments to accelerate healing and tissue regeneration.',
    duration: '—',
    visits: '—',
    price: '৳5,000',
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
      {/* ── Hero Banner ── */}
      <section className="tr-hero">
        <div className="tr-hero-content">
          <Link href="/specialties" style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            color: 'rgba(255,255,255,0.6)', textDecoration: 'none',
            fontSize: '0.85rem', fontWeight: 600, marginBottom: '1.5rem',
            transition: 'color 0.3s ease',
          }} onMouseEnter={(e) => e.currentTarget.style.color = '#fff'} onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.6)'}>
            <ArrowLeft size={16} />
            Back to Specialties
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="tr-badge">
              <Star size={14} fill="currentColor" />
              Complete Treatment Menu
            </div>

            <h1 className="tr-hero-title">
              Precision Care &<br />
              <span style={{ color: '#38bdf8' }}>World-Class Solutions</span>
            </h1>
            <p className="tr-hero-desc">
              Explore our full spectrum of 50+ cutting-edge dental procedures across 8 specialized departments. Agency-grade precision, absolute comfort, and transparent pricing.
            </p>

            <div className="tr-stats-row">
              <div className="tr-stat">
                <div className="tr-stat-num">50+</div>
                <div className="tr-stat-label">Treatments</div>
              </div>
              <div className="tr-stat">
                <div className="tr-stat-num">08</div>
                <div className="tr-stat-label">Departments</div>
              </div>
              <div className="tr-stat">
                <div className="tr-stat-num">15+</div>
                <div className="tr-stat-label">Years Exp</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="tr-container">

        {/* ── Search Bar ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="tr-search-container"
        >
          <Search size={22} style={{
            position: 'absolute', left: '1.5rem', top: '50%',
            transform: 'translateY(-50%)', color: '#94a3b8', zIndex: 1
          }} />
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
              style={{
                position: 'absolute', right: '1.5rem', top: '50%',
                transform: 'translateY(-50%)',
                background: 'none', border: 'none', cursor: 'pointer',
                color: '#94a3b8', fontSize: '1.5rem', lineHeight: 1, zIndex: 1
              }}
            >
              ×
            </button>
          )}
        </motion.div>

        {/* ── Signature Treatments Bento ── */}
        {!searchQuery && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <h2 style={{ fontSize: '2.25rem', fontWeight: 900, color: 'var(--foreground)', letterSpacing: '-0.03em' }}>
                Signature Services
              </h2>
              <p style={{ color: 'var(--muted-foreground)', fontSize: '1.1rem', marginTop: '0.5rem' }}>Our most requested and highly specialized procedures.</p>
            </div>

            <div className="tr-signature-grid">
              {signatureTreatments.map((st, i) => (
                <motion.div
                  key={st.sn}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="tr-bento-card"
                >
                  <div className="tr-bento-header">
                    <span className="tr-bento-sn">{st.sn}</span>
                    <span className="tr-bento-price" style={{ background: `${st.color}15`, color: st.color }}>
                      {st.price}
                    </span>
                  </div>
                  <h3>{st.name}</h3>
                  <p>{st.desc}</p>
                  <div className="tr-bento-meta">
                    <div className="tr-bento-meta-item">
                      <span style={{ marginRight: '0.5rem' }}>⏱</span>{st.duration}
                    </div>
                    <div className="tr-bento-meta-item">
                      <span style={{ marginRight: '0.5rem' }}>📅</span>{st.visits} Visit{st.visits !== '1' ? 's' : ''}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* ── Category Accordions ── */}
        <div style={{ textAlign: 'center', marginBottom: '3rem', marginTop: searchQuery ? '0' : '4rem' }}>
          <h2 style={{ fontSize: '2.25rem', fontWeight: 900, color: 'var(--foreground)', letterSpacing: '-0.03em' }}>
            {searchQuery ? 'Search Results' : 'Explore All Departments'}
          </h2>
        </div>

        <div className="tr-accordion-wrapper">
          {filteredCategories.map((cat, catIdx) => {
            const isOpen = searchQuery ? true : openCategory === cat.id;
            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: catIdx * 0.05 }}
                className="tr-category-card"
                style={{
                  boxShadow: isOpen ? `0 15px 40px ${cat.color}15` : '0 4px 15px rgba(0,0,0,0.02)',
                  borderColor: isOpen ? `${cat.color}30` : ''
                }}
              >
                <button
                  className="tr-category-btn"
                  onClick={() => !searchQuery && setOpenCategory(isOpen ? null : cat.id)}
                  style={{ cursor: searchQuery ? 'default' : 'pointer' }}
                >
                  <div className="tr-cat-info">
                    <div className="tr-cat-icon" style={{ background: cat.colorBg, boxShadow: `0 10px 20px ${cat.color}40` }}>
                      {cat.icon}
                    </div>
                    <div>
                      <h2 className="tr-cat-title">{cat.title}</h2>
                      <div className="tr-cat-meta">
                        <span style={{ color: 'var(--muted-foreground)', fontSize: '0.95rem' }}>{cat.focus}</span>
                        <span className="tr-cat-count" style={{ background: cat.colorLight, color: cat.color }}>
                          {cat.treatments.length} Procedures
                        </span>
                      </div>
                    </div>
                  </div>
                  {!searchQuery && (
                    <div style={{
                      color: cat.color,
                      transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                      transform: isOpen ? 'rotate(180deg)' : 'none',
                    }}>
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
                      style={{ overflow: 'hidden' }}
                    >
                      <div className="tr-treatment-list">
                        <div style={{ height: '1px', background: `linear-gradient(90deg, ${cat.color}30, transparent)`, marginBottom: '1.5rem' }} />
                        {cat.treatments.map((treatment, tIdx) => (
                          <motion.div
                            key={tIdx}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: tIdx * 0.03 }}
                            className={`tr-treatment-item ${treatment.highlight ? 'highlight' : ''}`}
                            style={{
                              borderColor: treatment.highlight ? `${cat.color}30` : '',
                              background: treatment.highlight ? `${cat.color}05` : ''
                            }}
                          >
                            <div style={{ flex: 1, paddingRight: '1rem' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                                <h3 className="tr-treatment-name">{treatment.name}</h3>
                                {treatment.highlight && (
                                  <span style={{ background: cat.colorBg, color: 'white', padding: '0.2rem 0.6rem', borderRadius: '999px', fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.05em' }}>
                                    FEATURED
                                  </span>
                                )}
                              </div>
                              {treatment.description && (
                                <p className="tr-treatment-desc">{treatment.description}</p>
                              )}
                            </div>
                            {treatment.price && (
                              <div className="tr-treatment-price" style={{ background: cat.colorLight, color: cat.color }}>
                                {treatment.price}
                              </div>
                            )}
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
        
        {/* ── CTA Section ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{
            marginTop: '6rem',
            background: 'linear-gradient(135deg, #020617 0%, #0c4a6e 100%)',
            borderRadius: '2rem',
            padding: '5rem 3rem',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 30px 80px rgba(2,6,23,0.3)',
          }}
        >
          <div style={{ position: 'relative', zIndex: 1 }}>
            <h2 style={{ fontSize: 'clamp(2rem, 3vw, 3rem)', fontWeight: 900, color: '#fff', marginBottom: '1.25rem', letterSpacing: '-0.02em' }}>
              Secure Your Brilliant Smile Today
            </h2>
            <p style={{ fontSize: '1.15rem', color: 'rgba(255,255,255,0.8)', maxWidth: '600px', margin: '0 auto 3rem', lineHeight: 1.6 }}>
              Our elite specialists are ready to architect your personalized dental treatment plan. Experience dentistry at its highest level.
            </p>
            <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link
                href="/contact"
                className="btn btn-primary"
                style={{ padding: '1.1rem 2.5rem', borderRadius: '100px', fontSize: '1.1rem', background: '#38bdf8', color: '#0f172a', fontWeight: 800, border: 'none', boxShadow: '0 10px 30px rgba(56, 189, 248, 0.4)' }}
              >
                Book Priority Consultation
              </Link>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
