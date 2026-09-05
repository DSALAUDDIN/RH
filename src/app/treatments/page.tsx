'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, Search, ChevronDown, Star, ArrowUpRight, Clock, Calendar, CheckCircle2,
  Sparkles, ShieldCheck, CreditCard, Building2, Phone, MessageCircle
} from 'lucide-react';
import './treatments.css';
import { useBranch } from '@/components/branch/BranchProvider';
import BranchCTA from '@/components/branch/BranchCTA';
import { BRANCHES } from '@/lib/branches';

/* ────────────────────────────────────────────────
   Custom Dental Icons
──────────────────────────────────────────────── */
const DentalPath = "M7 5C5 5 4 7 4 9C4 11 5 13 6 15L7 21C7 21 9 22 10 19L11 16C11.5 15 12.5 15 13 16L14 19C15 22 17 21 17 21L18 15C19 13 20 11 20 9C20 7 19 5 17 5C15 5 13.5 6.5 12 8C10.5 6.5 9 5 7 5Z";

const PerioIcon = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d={DentalPath} />
    <path d="M4.5 14c2 0 3-1.5 5-1.5s3 1.5 5 1.5 3-1.5 5-1.5" strokeOpacity="0.6" strokeDasharray="2 2" />
  </svg>
);

const SurgeryIcon = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d={DentalPath} />
    <path d="M16 4h4m-2-2v4" stroke="currentColor" strokeWidth="2.5" />
  </svg>
);

const EndoIcon = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d={DentalPath} />
    <path d="M9 11v6m6-6v6" strokeOpacity="0.5" />
    <circle cx="12" cy="8" r="1" fill="currentColor" stroke="none" />
  </svg>
);

const PediatricIcon = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d={DentalPath} />
    <circle cx="10" cy="10" r="1" fill="currentColor" stroke="none" />
    <circle cx="14" cy="10" r="1" fill="currentColor" stroke="none" />
    <path d="M10.5 12.5a2 2 0 0 0 3 0" strokeOpacity="0.8" />
  </svg>
);

const OrthoIcon = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d={DentalPath} />
    <path d="M5 11h14" strokeOpacity="0.7" />
    <rect x="8" y="9.5" width="2" height="3" fill="currentColor" stroke="none" />
    <rect x="14" y="9.5" width="2" height="3" fill="currentColor" stroke="none" />
  </svg>
);

const ProsthoIcon = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d={DentalPath} strokeOpacity="0.4" />
    <path d="M7 9l2.5-4 2.5 2 2.5-2 2.5 4v3H7V9z" fill="currentColor" stroke="none" />
  </svg>
);

const AestheticIcon = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d={DentalPath} />
    <path d="M19 4l1 2 2 1-2 1-1 2-1-2-2-1 2-1 1-2z" fill="currentColor" stroke="none" />
  </svg>
);

const AdditionalIcon = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d={DentalPath} />
    <path d="M12 8v4m-2-2h4" />
  </svg>
);

/* ────────────────────────────────────────────────
   Treatment Data — All 8 Categories
──────────────────────────────────────────────── */
interface Treatment {
  name: string;
    description?: string;
  highlight?: boolean;
  path?: string;
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
    icon: <PerioIcon size={26} />,
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
    icon: <SurgeryIcon size={26} />,
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
      { name: 'Dental Implant (Osstem/Nobel)', description: 'Advanced permanent tooth replacement. Packages available for Osstem SA, SOI, and Nobel Biocare.', highlight: true },
    ],
  },
  {
    id: 'conservative',
    title: 'Conservative Dentistry & Endodontics',
    focus: 'Preservation and restoration of natural teeth',
    icon: <EndoIcon size={26} />,
    color: '#6366f1',
    colorLight: '#ede9fe',
    colorBg: 'linear-gradient(135deg, #6366f1, #4f46e5)',
    treatments: [
      { name: 'RCT + Crown Packages', description: 'Complete root canal therapy including crown (PFM, Premium PFM, or Zirconia options).', highlight: true },
      { name: 'RCT / RE-RCT (Only Treatment)', description: 'Root canal treatment to remove infected pulp and seal canals. Crown placed separately.' },
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
    icon: <PediatricIcon size={26} />,
    color: '#f97316',
    colorLight: '#ffedd5',
    colorBg: 'linear-gradient(135deg, #f97316, #ea580c)',
    treatments: [
      { name: 'Tooth Extraction (Child)', description: 'Gentle extraction of severely decayed, stubborn baby teeth or orthodontic preparation under local anesthesia.' },
      { name: 'Deciduous Filling', description: 'Composite or glass ionomer fillings to restore cavities in baby teeth and protect dental development.' },
      { name: 'Pulpectomy / Pulpotomy', description: 'Root canal-equivalent treatment for infected baby teeth — saving the tooth to maintain space for permanent teeth.', highlight: true },
      { name: 'Special Child Program (GA)', description: 'Comprehensive dental management under General Anesthesia for special healthcare needs children. Multiple procedures in one safe session.', highlight: true, path: '/special-child' },
    ],
  },
  {
    id: 'orthodontics',
    title: 'Orthodontics & Dentofacial Orthopedics',
    focus: 'Alignment of teeth and correction of jaw irregularities',
    icon: <OrthoIcon size={26} />,
    color: '#8b5cf6',
    colorLight: '#f3e8ff',
    colorBg: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
    treatments: [
      { name: 'Orthodontic Braces', description: 'Effective, reliable, and transformative teeth alignment. Ideal for simple to complex cases.', highlight: true },
      { name: 'Orthodontic Aligner', description: 'Virtually invisible and removable clear aligners. Discreet innovation and everyday comfort.', highlight: true },
      { name: 'Removable Orthodontics', description: 'Removable appliances for mild to moderate alignment issues. Comfortable and easy to maintain.' },
      { name: 'Night Guard', description: 'Custom-fitted dental appliance to protect teeth from bruxism (grinding) and TMJ disorders during sleep.' },
    ],
  },
  {
    id: 'prosthodontics',
    title: 'Prosthodontics',
    focus: 'Restoration and replacement of missing teeth',
    icon: <ProsthoIcon size={26} />,
    color: '#f59e0b',
    colorLight: '#fef3c7',
    colorBg: 'linear-gradient(135deg, #f59e0b, #d97706)',
    treatments: [
      { name: 'Re-insertion of Dislodged Crown', description: 'Re-cementing a crown that has fallen off or become loose back onto the prepared tooth.' },
      { name: 'Crown (Porcelain / Metal)', description: 'Ceramic or metal dental cap to fully cover and restore a damaged, decayed or root-canal-treated tooth.' },
      { name: 'Zirconium Crown', description: 'Premium ultra-strong, natural-looking ceramic crown. Biocompatible and stain-resistant.', highlight: true, path: '/zirconia-crown' },
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
    icon: <AestheticIcon size={26} />,
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
    icon: <AdditionalIcon size={26} />,
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
    name: 'Clear Aligner (Invisible Braces) Transformation',
    desc: 'Discreet, removable clear aligners designed using advanced digital planning for a confident, wire-free smile transformation.',
    duration: '12–24 Months',
    visits: '10–20',
    color: '#8b5cf6',
  },
  {
    sn: '04',
    name: 'Laser Teeth Whitening',
    desc: 'Advanced laser-activated whitening gel removes deep stains. Safe, non-invasive, and delivers dramatic results in just 1 hour.',
    duration: '1 Hour',
    visits: '1',
    color: '#f59e0b',
  },
  {
    sn: '05',
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

  const patientConcerns = [
    { label: "I have a Toothache", icon: "😖", query: "root canal", color: "#ef4444" },
    { label: "I want a Brighter Smile", icon: "✨", query: "whitening", color: "#ec4899" },
    { label: "Replacing Missing Teeth", icon: "🦷", query: "implant", color: "#f59e0b" },
    { label: "My Gums are Bleeding", icon: "🩸", query: "scaling", color: "#0ea5e9" },
    { label: "Checkup for my Child", icon: "👶", query: "child", color: "#f97316" },
    { label: "Straightening Teeth", icon: "📐", query: "braces", color: "#8b5cf6" },
    { label: "Broken or Chipped Tooth", icon: "💥", query: "crown", color: "#6366f1" },
    { label: "Wisdom Tooth Pain", icon: "😩", query: "extraction", color: "#dc2626" },
    { label: "Jaw Pain or Clicking", icon: "🤕", query: "tmj", color: "#14b8a6" },
    { label: "I Think I Have a Cavity", icon: "🕳️", query: "filling", color: "#64748b" },
  ];

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
      {/* ── Hero Banner (Neuromarketing: Authority & Visual Impact) ── */}
      <section className="tr-hero">
        <div className="tr-hero-content">
          <Link href="/specialties" style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            color: 'rgba(255,255,255,0.6)', textDecoration: 'none',
            fontSize: '0.85rem', fontWeight: 600, marginBottom: '2rem',
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
            <div className="tr-badge pulse-glow">
              <Star size={14} fill="currentColor" />
              Complete Treatment Menu
            </div>

            <h1 className="tr-hero-title">
              Your Journey to a<br />
              <span className="text-gradient">Confident Smile</span>
            </h1>
            <p className="tr-hero-desc">
              Whether you are in pain, looking to restore missing teeth, or simply want a brighter smile, our compassionate experts are here to help. Explore our specialized treatments below.
            </p>

            {/* Social Proof (Neuromarketing: Trust) */}
            <div className="tr-stats-row">
              <div className="tr-stat">
                <div className="tr-stat-num">12+</div>
                <div className="tr-stat-label">Years Exp</div>
              </div>
              <div className="tr-stat">
                <div className="tr-stat-num">15+</div>
                <div className="tr-stat-label">Doctors</div>
              </div>
              <div className="tr-stat">
                <div className="tr-stat-num">10+</div>
                <div className="tr-stat-label">Staffs</div>
              </div>
              <div className="tr-stat">
                <div className="tr-stat-num">50+</div>
                <div className="tr-stat-label">Treatments</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="tr-container">

        {/* ── Search Bar (Cognitive Ease) ── */}
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

        {/* ── Patient Concerns Quick Filters (Empathy & Relevance) ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.12 }}
          style={{ marginBottom: '4rem' }}
        >
          <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <p style={{ color: '#94a3b8', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              What Brings You Here Today?
            </p>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: 'center', maxWidth: '850px', margin: '0 auto' }}>
            {patientConcerns.map(concern => (
              <button
                key={concern.label}
                onClick={() => setSearchQuery(concern.query)}
                className="tr-concern-btn"
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.5rem',
                  background: 'rgba(255, 255, 255, 0.03)', border: `1px solid rgba(255, 255, 255, 0.1)`,
                  padding: '0.75rem 1.25rem', borderRadius: '999px',
                  fontSize: '0.95rem', fontWeight: 600, color: '#f8fafc',
                  cursor: 'pointer', transition: 'all 0.3s ease',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.borderColor = concern.color;
                  e.currentTarget.style.background = `rgba(255, 255, 255, 0.08)`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = `rgba(255, 255, 255, 0.1)`;
                  e.currentTarget.style.background = `rgba(255, 255, 255, 0.03)`;
                }}
              >
                <span style={{ fontSize: '1.2rem' }}>{concern.icon}</span>
                {concern.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* ── Signature Treatments Bento (Premium Value Anchoring) ── */}
        {!searchQuery && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <div className="tr-section-header">
              <h2>Signature Services</h2>
              <p>Our most requested and highly specialized procedures.</p>
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

        {/* ── Category Accordions (Cognitive Ease) ── */}
        <div className="tr-section-header" style={{ marginTop: searchQuery ? '0' : '4rem' }}>
          <h2>{searchQuery ? 'Search Results' : 'Explore All Departments'}</h2>
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
                className={`tr-category-card ${isOpen ? 'is-open' : ''}`}
                style={{ '--cat-color': cat.color, '--cat-color-light': cat.colorLight, '--cat-color-bg': cat.colorBg } as React.CSSProperties}
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
                            transition={{ delay: tIdx * 0.03 }}
                            className={`tr-treatment-item ${treatment.highlight ? 'highlight' : ''}`}
                          >
                            <div className="tr-treatment-content">
                              <div className="tr-treatment-head">
                                <h3 className="tr-treatment-name">
                                  {treatment.name}
                                </h3>
                                {treatment.highlight && (
                                  <span className="tr-badge-featured">FEATURED</span>
                                )}
                              </div>
                              {treatment.description && (
                                <p className="tr-treatment-desc">{treatment.description}</p>
                              )}
                            </div>
                            
                            <div className="tr-treatment-action">
                              <Link 
                                href={treatment.path || '/contact'}
                                className="tr-inquire-btn"
                              >
                                {treatment.path ? 'Learn More' : 'Inquire Now'}
                                <ArrowUpRight size={16} />
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
        
        {/* ── Dual-Branch Treatment & Pricing Policy ── */}
        <section style={{ margin: '4rem 0', background: 'rgba(15, 23, 42, 0.7)', borderRadius: '24px', padding: '3rem 2rem', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(56, 189, 248, 0.1)', color: '#38bdf8', padding: '6px 14px', borderRadius: '50px', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.75rem' }}>
              <ShieldCheck size={14} /> Transparent Clinical Policy
            </span>
            <h2 style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', margin: '0 0 0.5rem 0' }}>
              Treatment Planning by Branch
            </h2>
            <p style={{ color: '#94a3b8', fontSize: '1rem', maxWidth: '650px', margin: '0 auto' }}>
              Every treatment plan begins with digital imaging and specialist diagnosis. Select your preferred branch below to schedule your consultation.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', maxWidth: '950px', margin: '0 auto' }}>
            {/* Banani Card */}
            <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(245, 158, 11, 0.3)', borderRadius: '20px', padding: '2rem', display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#fff', margin: 0 }}>Banani Branch</h3>
                <span style={{ background: 'rgba(245, 158, 11, 0.15)', color: '#fbbf24', padding: '4px 10px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase' }}>Private Suite</span>
              </div>
              <p style={{ color: '#cbd5e1', fontSize: '0.9rem', lineHeight: 1.5, marginBottom: '1.25rem' }}>
                Appointment-only care: your slot is booked so the room and the clinician are yours for its whole length, with 3D CBCT read in the same visit.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1.5rem 0', display: 'flex', flexDirection: 'column', gap: '8px', color: '#94a3b8', fontSize: '0.85rem' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><CheckCircle2 size={15} color="#fbbf24" /> Personalized package estimates at consultation</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><CheckCircle2 size={15} color="#fbbf24" /> Private 1-on-1 specialist session</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><CheckCircle2 size={15} color="#fbbf24" /> Priority executive scheduling</li>
              </ul>
              <div style={{ marginTop: 'auto', display: 'flex', gap: '10px' }}>
                <BranchCTA action="call" branch="banani" className="cg-btn-secondary" style={{ flex: 1, padding: '0.75rem', fontSize: '0.88rem' }}>
                  <Phone size={15} /> {BRANCHES.banani.phoneDisplay}
                </BranchCTA>
                <BranchCTA action="whatsapp" branch="banani" className="cg-btn-secondary" style={{ flex: 1, padding: '0.75rem', fontSize: '0.88rem', color: '#25D366' }}>
                  <MessageCircle size={15} /> WhatsApp
                </BranchCTA>
              </div>
            </div>

            {/* Banasree Card */}
            <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(2, 132, 199, 0.3)', borderRadius: '20px', padding: '2rem', display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#fff', margin: 0 }}>Banasree Branch</h3>
                <span style={{ background: 'rgba(2, 132, 199, 0.15)', color: '#38bdf8', padding: '4px 10px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase' }}>Flagship Hospital</span>
              </div>
              <p style={{ color: '#cbd5e1', fontSize: '0.9rem', lineHeight: 1.5, marginBottom: '1.25rem' }}>
                Full-service multi-chair hospital setup with on-site master digital lab, multi-specialty surgical team, and family treatment plans.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1.5rem 0', display: 'flex', flexDirection: 'column', gap: '8px', color: '#94a3b8', fontSize: '0.85rem' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><CheckCircle2 size={15} color="#38bdf8" /> 0% Interest EMI facilities available</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><CheckCircle2 size={15} color="#38bdf8" /> In-house CAD/CAM lab turnaround</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><CheckCircle2 size={15} color="#38bdf8" /> Complete multi-chair family capacity</li>
              </ul>
              <div style={{ marginTop: 'auto', display: 'flex', gap: '10px' }}>
                <BranchCTA action="call" branch="banasree" className="cg-btn-secondary" style={{ flex: 1, padding: '0.75rem', fontSize: '0.88rem' }}>
                  <Phone size={15} /> {BRANCHES.banasree.phoneDisplay}
                </BranchCTA>
                <BranchCTA action="whatsapp" branch="banasree" className="cg-btn-secondary" style={{ flex: 1, padding: '0.75rem', fontSize: '0.88rem', color: '#25D366' }}>
                  <MessageCircle size={15} /> WhatsApp
                </BranchCTA>
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA Section (Neuromarketing: Scarcity & Action) ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="tr-cta-section"
        >
          <div className="tr-cta-bg-fx"></div>
          <div className="tr-cta-content">
            <div className="tr-cta-badge">Two branches, one clinical team</div>
            <h2>Secure Your Brilliant Smile Today</h2>
            <p>
              Our elite specialists are ready to architect your personalized dental treatment plan. Experience dentistry at its highest level.
            </p>
            <div className="tr-cta-actions">
              <BranchCTA action="book" className="tr-btn-primary">
                Request an appointment
              </BranchCTA>
              <div className="tr-cta-note">
                <CheckCircle2 size={16} /> Instant Confirmation • No Wait Time
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
