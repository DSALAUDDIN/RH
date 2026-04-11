'use client';

import { useParams } from 'next/navigation';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useCallback } from 'react';
import { ArrowLeft, CheckCircle2, Clock, Award, Shield, Sparkles, X, Download, ZoomIn, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './detail.css';

/* ── Import all banner images ── */
import imagingBanner from '@/assets/specialties/3d-imaging.jpg';
import bracesBanner from '@/assets/specialties/braces.jpg';
import zirconiaBanner from '@/assets/specialties/zirconia.jpg';
import rootCanalBanner from '@/assets/specialties/root-canal.jpg';
import gumCareBanner from '@/assets/specialties/gum-care.jpg';
import kidsCareBanner from '@/assets/specialties/kids-care.jpg';
import implantImg from '@/assets/specialties/implant.png';

/* ── Import flyer images (high-res promotional designs) ── */
import imagingFlyer from '@/assets/specialties/imaging.png';
import bracesFlyer from '@/assets/specialties/braces_clean.png';
import zirconiaFlyer from '@/assets/specialties/zirconia.png';
import rootCanalFlyer from '@/assets/specialties/rootcanal_clean.png';
import gumCareFlyer from '@/assets/specialties/gum_clean.png';
import kidsCareFlyer from '@/assets/specialties/kids_clean.png';

interface SpecialtyDetail {
  title: string;
  category: string;
  tagline: string;
  bannerImg: StaticImageData;
  flyerImg: StaticImageData;
  flyerFileName: string;
  description: string;
  benefits: string[];
  process: { step: string; desc: string }[];
  duration: string;
  recovery: string;
  warranty: string;
  accentColor: string;
  accentLight: string;
}

const specialtiesData: Record<string, SpecialtyDetail> = {
  '3d-imaging': {
    title: 'Precision 3D Dental Imaging',
    category: 'Elite Diagnostics',
    tagline: 'Ultra-accurate 360° diagnostics with 90% less radiation',
    bannerImg: imagingBanner,
    flyerImg: imagingFlyer,
    flyerFileName: 'RH-Dental-3D-Imaging.png',
    description: 'Our state-of-the-art 3D imaging technology provides unparalleled diagnostic accuracy. With cone beam CT scanning, we can visualize your entire oral structure in stunning detail, enabling precise treatment planning and exceptional outcomes.',
    benefits: [
      '90% less radiation than traditional CT scans',
      'Complete 360° view of teeth, jaw, and sinuses',
      'Instant digital results for faster diagnosis',
      'Perfect for implant planning and complex cases',
      'Non-invasive and completely painless',
    ],
    process: [
      { step: 'Quick Scan', desc: 'Single 20-second rotation captures everything' },
      { step: 'AI Analysis', desc: 'Advanced software processes 3D data instantly' },
      { step: 'Detailed Review', desc: 'Dentist examines high-resolution images' },
      { step: 'Treatment Plan', desc: 'Precision planning based on exact measurements' },
    ],
    duration: '20 seconds',
    recovery: 'None required',
    warranty: 'Digital records stored for life',
    accentColor: '#0ea5e9',
    accentLight: '#e0f2fe',
  },
  'braces': {
    title: 'Advanced Orthodontic Braces',
    category: 'Orthodontics',
    tagline: 'Modern ceramic and invisible solutions for perfect alignment',
    bannerImg: bracesBanner,
    flyerImg: bracesFlyer,
    flyerFileName: 'RH-Dental-Braces.png',
    description: 'Transform your smile with our cutting-edge orthodontic solutions. From traditional metal braces to ceramic and invisible aligners, we offer personalized treatment plans that fit your lifestyle and deliver stunning results.',
    benefits: [
      'Multiple options: metal, ceramic, or clear aligners',
      'Custom treatment plans using 3D imaging',
      'Regular monitoring and adjustments',
      'Comfortable modern brackets and wires',
      'Beautiful, long-lasting results',
    ],
    process: [
      { step: 'Consultation', desc: '3D scan and personalized assessment' },
      { step: 'Custom Planning', desc: 'Digital smile preview and timeline' },
      { step: 'Placement', desc: 'Gentle, precise bracket application' },
      { step: 'Regular Visits', desc: 'Progress tracking every 4-6 weeks' },
    ],
    duration: '12-24 months',
    recovery: '2-3 days adjustment',
    warranty: 'Lifetime retention guarantee',
    accentColor: '#6366f1',
    accentLight: '#ede9fe',
  },
  'zirconia': {
    title: 'Premium Zirconia Restoration',
    category: 'Prosthetics',
    tagline: 'The gold standard in flawless dental crowns',
    bannerImg: zirconiaBanner,
    flyerImg: zirconiaFlyer,
    flyerFileName: 'RH-Dental-Zirconia.png',
    description: 'Experience the pinnacle of dental restoration with biocompatible zirconia crowns. These ultra-strong, natural-looking restorations combine exceptional durability with aesthetic perfection, giving you confidence that lasts.',
    benefits: [
      'Strongest ceramic material available',
      'Natural translucency matches real teeth',
      'Metal-free and biocompatible',
      'Stain-resistant and long-lasting',
      'Custom-crafted for perfect fit',
    ],
    process: [
      { step: 'Preparation', desc: 'Gentle tooth shaping and digital scan' },
      { step: 'Design', desc: 'CAD/CAM custom crown creation' },
      { step: 'Temporary', desc: 'Protective temporary crown placed' },
      { step: 'Final Fit', desc: 'Permanent zirconia crown bonded' },
    ],
    duration: '2-3 visits',
    recovery: 'Same day function',
    warranty: '10-year guarantee',
    accentColor: '#f59e0b',
    accentLight: '#fef3c7',
  },
  'implants': {
    title: 'Advanced Dental Implantology',
    category: 'Surgical Care',
    tagline: 'Permanent solutions that feel like natural teeth',
    bannerImg: implantImg,
    flyerImg: implantImg,
    flyerFileName: 'RH-Dental-Implants.png',
    description: 'Restore your smile permanently with precision-guided dental implants. Our advanced surgical techniques and premium materials ensure successful integration, giving you teeth that look, feel, and function naturally.',
    benefits: [
      'Permanent tooth replacement solution',
      'Prevents bone loss and maintains facial structure',
      'Functions exactly like natural teeth',
      '3D guided surgery for precision placement',
      '98% success rate with proper care',
    ],
    process: [
      { step: '3D Planning', desc: 'Precise implant positioning using CT scans' },
      { step: 'Surgical Placement', desc: 'Minimally invasive titanium post insertion' },
      { step: 'Healing Period', desc: '3-6 months for osseointegration' },
      { step: 'Crown Placement', desc: 'Custom crown attached to implant' },
    ],
    duration: '3-6 months total',
    recovery: '7-10 days',
    warranty: 'Lifetime implant guarantee',
    accentColor: '#10b981',
    accentLight: '#d1fae5',
  },
  'root-canal': {
    title: 'Painless Root Canal Therapy',
    category: 'Endodontics',
    tagline: 'Stress-free treatment using microscopic technology',
    bannerImg: rootCanalBanner,
    flyerImg: rootCanalFlyer,
    flyerFileName: 'RH-Dental-RootCanal.png',
    description: 'Save your natural tooth with our advanced endodontic care. Using dental microscopes and modern techniques, we make root canal therapy completely comfortable while preserving your tooth for decades to come.',
    benefits: [
      'Completely painless with advanced anesthesia',
      'Microscopic precision for thorough cleaning',
      'Single-visit treatment available',
      'Saves your natural tooth structure',
      '95% long-term success rate',
    ],
    process: [
      { step: 'Diagnosis', desc: 'Digital X-rays identify infection' },
      { step: 'Anesthesia', desc: 'Complete numbing for zero pain' },
      { step: 'Cleaning', desc: 'Microscopic removal of infection' },
      { step: 'Sealing', desc: 'Biocompatible filling and crown prep' },
    ],
    duration: '60-90 minutes',
    recovery: '1-2 days mild soreness',
    warranty: '5-year success guarantee',
    accentColor: '#ef4444',
    accentLight: '#fee2e2',
  },
  'gum-care': {
    title: 'Advanced Periodontal Care',
    category: 'Periodontics',
    tagline: 'Healthy gums for a healthy smile',
    bannerImg: gumCareBanner,
    flyerImg: gumCareFlyer,
    flyerFileName: 'RH-Dental-GumCare.png',
    description: 'Protect your oral health with expert periodontal treatment. From deep cleaning to advanced gum therapy, we treat gum disease at every stage, ensuring your smile stays healthy and beautiful for life.',
    benefits: [
      'Prevent tooth loss from gum disease',
      'Reduce inflammation and bleeding',
      'Laser therapy for faster healing',
      'Improved overall health connections',
      'Beautiful, healthy pink gums',
    ],
    process: [
      { step: 'Assessment', desc: 'Comprehensive gum health evaluation' },
      { step: 'Deep Cleaning', desc: 'Scaling and root planing treatment' },
      { step: 'Laser Therapy', desc: 'Advanced healing stimulation' },
      { step: 'Maintenance', desc: 'Regular monitoring and prevention' },
    ],
    duration: '2-4 sessions',
    recovery: '3-5 days',
    warranty: 'Ongoing care program',
    accentColor: '#ec4899',
    accentLight: '#fce7f3',
  },
  'kids-care': {
    title: 'Specialized Pediatric Dentistry',
    category: 'Pedodontics',
    tagline: 'Fun, friendly, and fear-free dental care',
    bannerImg: kidsCareBanner,
    flyerImg: kidsCareFlyer,
    flyerFileName: 'RH-Dental-KidsCare.png',
    description: 'Give your child a lifetime of healthy smiles. Our gentle, experienced team creates a positive dental experience that makes kids excited about oral health while providing expert preventive and restorative care.',
    benefits: [
      'Child-friendly environment and staff',
      'Gentle techniques for anxiety-free visits',
      'Preventive care and education',
      'Early orthodontic assessment',
      'Building lifelong healthy habits',
    ],
    process: [
      { step: 'Welcome', desc: 'Fun introduction to the dental office' },
      { step: 'Gentle Exam', desc: 'Friendly check-up and cleaning' },
      { step: 'Education', desc: 'Teaching proper brushing techniques' },
      { step: 'Prevention', desc: 'Fluoride and sealants as needed' },
    ],
    duration: '30-45 minutes',
    recovery: 'None required',
    warranty: 'Growing smile program',
    accentColor: '#f97316',
    accentLight: '#ffedd5',
  },
};

/* ── Lightbox Modal Component ── */
function FlyerLightbox({
  isOpen,
  flyerImg,
  title,
  flyerFileName,
  onClose,
}: {
  isOpen: boolean;
  flyerImg: StaticImageData;
  title: string;
  flyerFileName: string;
  onClose: () => void;
}) {
  const handleDownload = useCallback(async () => {
    try {
      const response = await fetch(flyerImg.src);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = flyerFileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch {
      // Fallback: open in new tab
      window.open(flyerImg.src, '_blank');
    }
  }, [flyerImg.src, flyerFileName]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: 'rgba(2,6,23,0.92)',
            backdropFilter: 'blur(16px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem',
          }}
        >
          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 30 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'relative',
              maxWidth: '540px',
              width: '100%',
              maxHeight: '90vh',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
            }}
          >
            {/* Top bar */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0 0.25rem',
            }}>
              <div>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', margin: 0 }}>Treatment Flyer</p>
                <p style={{ color: '#fff', fontSize: '1rem', fontWeight: 700, margin: 0 }}>{title}</p>
              </div>
              <button
                onClick={onClose}
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.1)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  color: '#fff',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.2s ease',
                  flexShrink: 0,
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.2)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Flyer Image */}
            <div style={{
              position: 'relative',
              width: '100%',
              flex: 1,
              maxHeight: 'calc(90vh - 130px)',
              borderRadius: '1rem',
              overflow: 'hidden',
              boxShadow: '0 30px 80px rgba(0,0,0,0.6)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}>
              <Image
                src={flyerImg}
                alt={`${title} Flyer`}
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                  maxHeight: 'calc(90vh - 130px)',
                  objectFit: 'contain',
                }}
                width={flyerImg.width}
                height={flyerImg.height}
                priority
              />
            </div>

            {/* Download Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleDownload}
              style={{
                width: '100%',
                padding: '1rem',
                background: 'linear-gradient(135deg, #0ea5e9, #0284c7)',
                color: '#fff',
                border: 'none',
                borderRadius: '0.875rem',
                fontWeight: 700,
                fontSize: '1rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.75rem',
                boxShadow: '0 8px 30px rgba(14,165,233,0.4)',
                transition: 'all 0.2s ease',
                letterSpacing: '-0.01em',
              }}
            >
              <Download size={20} />
              Download Flyer
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function SpecialtyDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const specialty = specialtiesData[slug];
  const [lightboxOpen, setLightboxOpen] = useState(false);

  if (!specialty) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#020617',
        color: '#fff',
        fontSize: '2rem',
        fontWeight: 800
      }}>
        <div>
          <h1 style={{ marginBottom: '2rem' }}>Specialty Not Found</h1>
          <Link href="/specialties" style={{ color: '#0ea5e9', fontSize: '1.2rem' }}>
            ← Back to Specialties
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* ── Flyer Lightbox ── */}
      <FlyerLightbox
        isOpen={lightboxOpen}
        flyerImg={specialty.flyerImg}
        title={specialty.title}
        flyerFileName={specialty.flyerFileName}
        onClose={() => setLightboxOpen(false)}
      />

      <div style={{ background: '#f8fafc', minHeight: '100vh', paddingTop: 'var(--nav-height, 80px)' }}>

        {/* ── Sticky Top Nav Bar ── */}
        <div style={{
          background: 'rgba(255,255,255,0.95)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(0,0,0,0.07)',
          position: 'sticky',
          top: 0,
          zIndex: 100,
          padding: '0.875rem 2rem',
        }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Link
              href="/specialties"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: '#64748b',
                textDecoration: 'none',
                fontSize: '0.9rem',
                fontWeight: 600,
                transition: 'color 0.3s ease',
                padding: '0.4rem 0.75rem',
                borderRadius: '0.5rem',
                border: '1px solid rgba(0,0,0,0.08)',
                background: '#f8fafc',
              }}
            >
              <ArrowLeft size={16} />
              All Treatments
            </Link>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <motion.span
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{
                  color: specialty.accentColor,
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  background: specialty.accentLight,
                  padding: '0.35rem 0.875rem',
                  borderRadius: '100px',
                }}
              >
                <Sparkles size={12} />
                {specialty.category}
              </motion.span>

              {/* Download Flyer quick action */}
              <motion.button
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                onClick={() => setLightboxOpen(true)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.4rem 1rem',
                  background: 'linear-gradient(135deg, #0ea5e9, #0284c7)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '100px',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(14,165,233,0.3)',
                  transition: 'all 0.2s ease',
                }}
              >
                <Download size={13} />
                Get Flyer
              </motion.button>
            </div>
          </div>
        </div>

        {/* ── Main Content Container ── */}
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '3rem 2rem 5rem',
        }}>

          {/* ── Two Column Layout: Flyer + Content ── */}
          <div
            className="detail-grid"
            style={{ marginBottom: '5rem' }}
          >
            {/* ── LEFT: Flyer Display (clickable) ── */}
            <motion.div
              className="flyer-container"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              {/* Flyer Card */}
              <div style={{
                background: '#fff',
                borderRadius: '2rem',
                padding: '1.25rem',
                boxShadow: '0 25px 70px rgba(0,0,0,0.1)',
                border: `2px solid ${specialty.accentLight}`,
              }}>
                {/* Clickable image */}
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => setLightboxOpen(true)}
                  style={{
                    position: 'relative',
                    width: '100%',
                    aspectRatio: '3/4',
                    borderRadius: '1.5rem',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    boxShadow: '0 10px 40px rgba(0,0,0,0.12)',
                  }}
                >
                  <Image
                    src={specialty.bannerImg}
                    alt={specialty.title}
                    fill
                    priority
                    style={{ objectFit: 'cover' }}
                  />

                  {/* Hover overlay with icons */}
                  <div className="flyer-hover-overlay">
                    <div className="flyer-hover-content">
                      <div className="flyer-icon-btn">
                        <Eye size={22} />
                      </div>
                      <p className="flyer-hover-text">View & Download Flyer</p>
                    </div>
                  </div>
                </motion.div>

                {/* Flyer action strip */}
                <div style={{
                  marginTop: '1rem',
                  display: 'flex',
                  gap: '0.75rem',
                }}>
                  <motion.button
                    whileHover={{ scale: 1.02, y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setLightboxOpen(true)}
                    style={{
                      flex: 1,
                      padding: '0.85rem 1rem',
                      background: `linear-gradient(135deg, ${specialty.accentColor}15 0%, ${specialty.accentColor}08 100%)`,
                      border: `1.5px solid ${specialty.accentColor}30`,
                      borderRadius: '0.875rem',
                      color: specialty.accentColor,
                      fontWeight: 700,
                      fontSize: '0.85rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <ZoomIn size={16} />
                    View Flyer
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02, y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setLightboxOpen(true)}
                    style={{
                      flex: 1,
                      padding: '0.85rem 1rem',
                      background: 'linear-gradient(135deg, #0ea5e9, #0284c7)',
                      border: 'none',
                      borderRadius: '0.875rem',
                      color: '#fff',
                      fontWeight: 700,
                      fontSize: '0.85rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                      boxShadow: '0 6px 20px rgba(14,165,233,0.3)',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <Download size={16} />
                    Download
                  </motion.button>
                </div>

                {/* Caption */}
                <p style={{
                  textAlign: 'center',
                  fontSize: '0.75rem',
                  color: '#94a3b8',
                  fontWeight: 500,
                  marginTop: '0.75rem',
                  marginBottom: 0,
                  letterSpacing: '0.02em',
                }}>
                  Click image or buttons to view full-size flyer
                </p>
              </div>
            </motion.div>

            {/* ── RIGHT: Treatment Details ── */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              {/* Category badge */}
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: specialty.accentLight,
                color: specialty.accentColor,
                padding: '0.4rem 1rem',
                borderRadius: '100px',
                fontSize: '0.78rem',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                marginBottom: '1.5rem',
              }}>
                <Sparkles size={12} />
                {specialty.category}
              </div>

              {/* Title Section */}
              <div style={{ marginBottom: '2.5rem' }}>
                <h1 style={{
                  fontSize: 'clamp(2rem, 4vw, 3.2rem)',
                  fontWeight: 900,
                  color: '#0f172a',
                  marginBottom: '1rem',
                  letterSpacing: '-0.04em',
                  lineHeight: 1.1,
                }}>
                  {specialty.title}
                </h1>

                <p style={{
                  fontSize: '1.15rem',
                  color: specialty.accentColor,
                  fontWeight: 600,
                  marginBottom: '1.25rem',
                  lineHeight: 1.6,
                }}>
                  {specialty.tagline}
                </p>

                {/* Divider */}
                <div style={{
                  width: '60px',
                  height: '4px',
                  background: `linear-gradient(90deg, ${specialty.accentColor}, ${specialty.accentColor}40)`,
                  borderRadius: '100px',
                  marginBottom: '1.5rem',
                }} />

                <p style={{
                  fontSize: '1.05rem',
                  color: '#475569',
                  lineHeight: 1.9,
                }}>
                  {specialty.description}
                </p>
              </div>

              {/* ── Quick Stats ── */}
              <div
                className="stats-grid"
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '1rem',
                  marginBottom: '2.5rem',
                }}
              >
                {[
                  { icon: <Clock size={22} />, label: 'Duration', value: specialty.duration, bg: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)', color: '#0369a1', border: 'rgba(14,165,233,0.2)' },
                  { icon: <Shield size={22} />, label: 'Recovery', value: specialty.recovery, bg: 'linear-gradient(135deg, #e9d5ff 0%, #d8b4fe 100%)', color: '#7e22ce', border: 'rgba(139,92,246,0.2)' },
                  { icon: <Award size={22} />, label: 'Warranty', value: specialty.warranty, bg: 'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)', color: '#047857', border: 'rgba(16,185,129,0.2)' },
                ].map(({ icon, label, value, bg, color, border }) => (
                  <motion.div
                    key={label}
                    whileHover={{ y: -4, boxShadow: '0 12px 30px rgba(0,0,0,0.1)' }}
                    style={{
                      padding: '1.25rem',
                      background: bg,
                      borderRadius: '1.25rem',
                      border: `2px solid ${border}`,
                      transition: 'all 0.3s ease',
                    }}
                  >
                    <div style={{ color, marginBottom: '0.6rem' }}>{icon}</div>
                    <div style={{ fontSize: '0.7rem', color, fontWeight: 700, marginBottom: '0.25rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{label}</div>
                    <div style={{ fontSize: '1.05rem', fontWeight: 900, color: '#0f172a', lineHeight: 1.3 }}>{value}</div>
                  </motion.div>
                ))}
              </div>

              {/* ── Key Benefits ── */}
              <div>
                <h2 style={{
                  fontSize: '1.6rem',
                  fontWeight: 900,
                  color: '#0f172a',
                  marginBottom: '1.25rem',
                  letterSpacing: '-0.03em',
                }}>
                  Key Benefits
                </h2>
                <div style={{ display: 'grid', gap: '0.75rem' }}>
                  {specialty.benefits.map((benefit, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.07 }}
                      whileHover={{ x: 5 }}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '0.875rem',
                        padding: '1rem 1.25rem',
                        background: '#fff',
                        borderRadius: '0.875rem',
                        border: `1.5px solid ${specialty.accentColor}15`,
                        boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
                        transition: 'all 0.25s ease',
                      }}
                    >
                      <CheckCircle2
                        size={20}
                        style={{
                          color: specialty.accentColor,
                          flexShrink: 0,
                          marginTop: '0.15rem',
                        }}
                      />
                      <span style={{
                        fontSize: '0.97rem',
                        color: '#334155',
                        lineHeight: 1.7,
                        fontWeight: 500,
                      }}>
                        {benefit}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* ── Treatment Process (Full Width) ── */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            style={{ marginBottom: '5rem' }}
          >
            {/* Section header */}
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <span style={{
                display: 'inline-block',
                background: specialty.accentLight,
                color: specialty.accentColor,
                padding: '0.35rem 1rem',
                borderRadius: '100px',
                fontSize: '0.75rem',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                marginBottom: '1rem',
              }}>
                Step by Step
              </span>
              <h2 style={{
                fontSize: '2.25rem',
                fontWeight: 900,
                color: '#0f172a',
                letterSpacing: '-0.03em',
              }}>
                Treatment Process
              </h2>
            </div>

            <div
              className="process-grid-responsive"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: '1.5rem',
              }}
            >
              {specialty.process.map((step, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ y: -6, boxShadow: '0 20px 50px rgba(0,0,0,0.1)' }}
                  style={{
                    padding: '2rem',
                    background: '#fff',
                    borderRadius: '1.5rem',
                    border: `2px solid ${specialty.accentColor}15`,
                    position: 'relative',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.05)',
                    transition: 'all 0.35s ease',
                    overflow: 'hidden',
                  }}
                >
                  {/* Accent top bar */}
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '4px',
                    background: `linear-gradient(90deg, ${specialty.accentColor}, ${specialty.accentColor}60)`,
                    borderRadius: '0 0 0 0',
                  }} />

                  {/* Step number */}
                  <div style={{
                    width: '3rem',
                    height: '3rem',
                    borderRadius: '50%',
                    background: `linear-gradient(135deg, ${specialty.accentColor}, ${specialty.accentColor}cc)`,
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 900,
                    fontSize: '1.15rem',
                    boxShadow: `0 8px 24px ${specialty.accentColor}50`,
                    marginBottom: '1.25rem',
                    marginTop: '0.5rem',
                  }}>
                    {idx + 1}
                  </div>

                  <h3 style={{
                    fontSize: '1.2rem',
                    fontWeight: 800,
                    color: '#0f172a',
                    marginBottom: '0.75rem',
                    letterSpacing: '-0.02em',
                  }}>
                    {step.step}
                  </h3>
                  <p style={{
                    color: '#64748b',
                    fontSize: '0.97rem',
                    lineHeight: 1.7,
                    margin: 0,
                  }}>
                    {step.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ── Flyer CTA Banner ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{
              background: `linear-gradient(135deg, ${specialty.accentColor}15 0%, ${specialty.accentColor}05 100%)`,
              border: `2px solid ${specialty.accentColor}20`,
              borderRadius: '2rem',
              padding: '2.5rem 3rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '2rem',
              marginBottom: '4rem',
              flexWrap: 'wrap',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '1rem',
                overflow: 'hidden',
                position: 'relative',
                flexShrink: 0,
                boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
              }}>
                <Image
                  src={specialty.bannerImg}
                  alt={specialty.title}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div>
                <p style={{ margin: 0, fontWeight: 800, fontSize: '1.1rem', color: '#0f172a' }}>
                  📋 Treatment Flyer Available
                </p>
                <p style={{ margin: 0, color: '#64748b', fontSize: '0.9rem', marginTop: '0.25rem' }}>
                  Download or view our complete {specialty.title.toLowerCase()} information sheet
                </p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '0.875rem', flexShrink: 0, flexWrap: 'wrap' }}>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setLightboxOpen(true)}
                style={{
                  padding: '0.875rem 1.75rem',
                  background: 'transparent',
                  border: `2px solid ${specialty.accentColor}`,
                  color: specialty.accentColor,
                  borderRadius: '0.875rem',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  whiteSpace: 'nowrap',
                }}
              >
                <ZoomIn size={16} />
                View Flyer
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setLightboxOpen(true)}
                style={{
                  padding: '0.875rem 1.75rem',
                  background: `linear-gradient(135deg, ${specialty.accentColor}, ${specialty.accentColor}cc)`,
                  border: 'none',
                  color: '#fff',
                  borderRadius: '0.875rem',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  boxShadow: `0 6px 20px ${specialty.accentColor}40`,
                  whiteSpace: 'nowrap',
                }}
              >
                <Download size={16} />
                Download Flyer
              </motion.button>
            </div>
          </motion.div>

          {/* ── CTA Section ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            style={{
              background: 'linear-gradient(135deg, #020617 0%, #0f172a 100%)',
              borderRadius: '2rem',
              padding: '4rem 3rem',
              textAlign: 'center',
              boxShadow: '0 30px 70px rgba(2,6,23,0.3)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Glow blobs */}
            <div style={{
              position: 'absolute', top: '-10%', left: '10%',
              width: '300px', height: '300px',
              background: `radial-gradient(circle, ${specialty.accentColor}30 0%, transparent 70%)`,
              borderRadius: '50%', filter: 'blur(50px)',
            }} />
            <div style={{
              position: 'absolute', bottom: '-10%', right: '10%',
              width: '300px', height: '300px',
              background: 'radial-gradient(circle, rgba(56,189,248,0.2) 0%, transparent 70%)',
              borderRadius: '50%', filter: 'blur(50px)',
            }} />

            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                background: `${specialty.accentColor}20`,
                color: specialty.accentColor,
                padding: '0.4rem 1rem', borderRadius: '100px',
                fontSize: '0.75rem', fontWeight: 800,
                textTransform: 'uppercase', letterSpacing: '0.1em',
                marginBottom: '1.5rem',
              }}>
                <Sparkles size={12} />
                {specialty.category}
              </div>

              <h3 style={{
                fontSize: 'clamp(1.75rem, 3vw, 2.75rem)',
                fontWeight: 900, color: '#fff',
                marginBottom: '1.25rem', letterSpacing: '-0.03em',
              }}>
                Ready to Transform Your Smile?
              </h3>
              <p style={{
                fontSize: '1.1rem', color: 'rgba(255,255,255,0.7)',
                marginBottom: '2.5rem', maxWidth: '520px',
                margin: '0 auto 2.5rem', lineHeight: 1.7,
              }}>
                Book your consultation today and experience world-class dental care
              </p>

              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                  <Link
                    href="/contact"
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: '0.75rem',
                      padding: '1.1rem 2.75rem',
                      background: `linear-gradient(135deg, ${specialty.accentColor}, ${specialty.accentColor}cc)`,
                      color: '#fff', borderRadius: '100px',
                      fontWeight: 800, fontSize: '1rem', textDecoration: 'none',
                      boxShadow: `0 15px 40px ${specialty.accentColor}50`,
                      transition: 'all 0.3s ease',
                    }}
                  >
                    <Sparkles size={18} />
                    Book Consultation
                  </Link>
                </motion.div>

                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setLightboxOpen(true)}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '0.75rem',
                    padding: '1.1rem 2.25rem',
                    background: 'rgba(255,255,255,0.1)',
                    border: '1.5px solid rgba(255,255,255,0.2)',
                    color: '#fff', borderRadius: '100px',
                    fontWeight: 700, fontSize: '1rem', cursor: 'pointer',
                    backdropFilter: 'blur(10px)',
                    transition: 'all 0.3s ease',
                  }}
                >
                  <Download size={18} />
                  Get Flyer
                </motion.button>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </>
  );
}
