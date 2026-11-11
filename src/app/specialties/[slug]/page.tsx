'use client';

import { useParams } from 'next/navigation';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useCallback } from 'react';
import {
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  X,
  Download,
  ZoomIn,
  Camera,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './detail.css';

/* Banner & clinical images */
import imagingBanner from '@/assets/specialties/3d-imaging.jpg';
import rootCanalBanner from '@/assets/specialties/root-canal.jpg';
import gumCareBanner from '@/assets/specialties/gum-care.jpg';
import kidsCareBanner from '@/assets/specialties/kids-care.jpg';
import dentalTourismBanner from '@/assets/specialties/dental_tourism.png';

/* Authentic Clinical Instrument & Procedure Photos */
import implantOsstemKit from '@/assets/specialties/instruments/implant-osstem-kit.jpg';
import crownShadeGuide from '@/assets/specialties/instruments/crown-shofu-shade-guide.jpg';
import crownShadeMatchingPatient from '@/assets/specialties/instruments/crown-shade-matching-patient.jpg';
import bracesPliers from '@/assets/specialties/instruments/braces-orthodontic-pliers.jpg';
import alignerTrayClinic from '@/assets/specialties/instruments/aligner-tray-clinic.jpg';
import alignerTrayMirror from '@/assets/specialties/instruments/aligner-tray-mirror.jpg';
import fillingCompositeKit from '@/assets/specialties/instruments/filling-composite-kit.jpg';
import fillingPolishingHandpiece from '@/assets/specialties/instruments/filling-polishing-handpiece.jpg';

export interface GalleryPhoto {
  img: StaticImageData;
  title: string;
  caption: string;
}

interface SpecialtyDetail {
  title: string;
  category: string;
  tagline: string;
  bannerImg: StaticImageData;
  gallery: GalleryPhoto[];
  flyerFileName: string;
  videoUrl?: string;
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
    tagline: 'Ultra-accurate 360° diagnostics — significantly lower dose than conventional CT',
    bannerImg: imagingBanner,
    gallery: [
      {
        img: imagingBanner,
        title: 'Low-Dose 3D CBCT Scanner',
        caption: 'On-site cone beam CT scanning for 3D volumetric diagnosis at RH Dental Care.',
      },
    ],
    flyerFileName: 'RH-Dental-3D-Imaging.png',
    description:
      'Our state-of-the-art 3D imaging technology provides unparalleled diagnostic accuracy. With cone beam CT scanning, we can visualize your entire oral structure in stunning detail, enabling precise treatment planning and exceptional outcomes.',
    benefits: [
      'Significantly lower dose than conventional medical CT',
      'Complete 360° view of teeth, jaw, and sinuses',
      'Instant digital results for faster diagnosis',
      'Ideal for implant planning and complex cases',
      'Non-invasive — no drilling, no anaesthetic needed',
    ],
    process: [
      { step: 'Quick Scan', desc: 'Single 20-second rotation captures everything' },
      { step: 'AI Analysis', desc: 'Advanced software processes 3D data instantly' },
      { step: 'Detailed Review', desc: 'Dentist examines high-resolution images' },
      { step: 'Treatment Plan', desc: 'Precision planning based on exact measurements' },
    ],
    duration: '20 seconds',
    recovery: 'None required',
    warranty: 'Digital records retained on file',
    accentColor: '#0ea5e9',
    accentLight: '#e0f2fe',
  },
  braces: {
    title: 'Orthodontics & Clear Aligners',
    category: 'Orthodontics',
    tagline: 'Straighten your smile with braces or clear aligners',
    bannerImg: alignerTrayClinic,
    gallery: [
      {
        img: alignerTrayClinic,
        title: '3D Clear Aligner Dental Model',
        caption:
          'Precision-fabricated clear aligner tray seated on orthodontic dental stone model.',
      },
      {
        img: alignerTrayMirror,
        title: 'Transparent Aligner Presentation',
        caption:
          'Discreet, nearly invisible clear aligners custom engineered for patient aesthetics.',
      },
      {
        img: bracesPliers,
        title: 'German-Grade Orthodontic Pliers',
        caption:
          'Specialized stainless steel archwire, bracket placement and loop-forming instruments.',
      },
    ],
    flyerFileName: 'RH-Dental-Orthodontics.jpg',
    videoUrl: '/assets/videos/orthodontics.mp4',
    description:
      'Achieve the aligned smile you have always wanted. We offer both traditional precision braces and modern, nearly invisible clear aligners tailored to your lifestyle, delivering lasting results with maximum comfort.',
    benefits: [
      'Corrects crooked teeth and bite issues',
      'Improves overall facial aesthetics',
      'Invisible aligner options available',
      'Easier to clean and maintain oral hygiene',
      'Boosts long-term confidence',
    ],
    process: [
      { step: 'Consultation', desc: 'Digital scan and smile assessment' },
      { step: 'Planning', desc: '3D preview of your future smile' },
      { step: 'Fitting', desc: 'Braces application or first aligner fitting' },
      { step: 'Adjustment', desc: 'Regular check-ups to track progress' },
    ],
    duration: '6-18 months',
    recovery: 'Immediate',
    warranty: 'Retainer included',
    accentColor: '#8b5cf6',
    accentLight: '#ede9fe',
  },
  zirconia: {
    title: 'Premium Zirconia Restoration',
    category: 'Prosthetics',
    tagline: 'Strong, natural-looking zirconia crowns',
    bannerImg: crownShadeGuide,
    gallery: [
      {
        img: crownShadeGuide,
        title: 'Shofu Vintage Shade Guide',
        caption:
          'Authentic porcelain shade guide for matching individual tooth translucency and hue.',
      },
      {
        img: crownShadeMatchingPatient,
        title: 'Chairside Shade Matching',
        caption:
          'Direct clinical shade selection under calibrated clinical lighting at the dental chair.',
      },
    ],
    flyerFileName: 'RH-Dental-Zirconia-Shade-Guide.jpg',
    description:
      'Experience high-quality dental restoration with biocompatible zirconia crowns. These ultra-strong, natural-looking restorations combine exceptional durability with aesthetic precision, crafted in our on-site master digital lab.',
    benefits: [
      'One of the strongest ceramic materials available',
      'Natural translucency matches surrounding teeth',
      'Metal-free and biocompatible',
      'Stain-resistant and long-lasting',
      'Custom-crafted in our on-site lab for perfect fit',
    ],
    process: [
      { step: 'Preparation', desc: 'Gentle tooth shaping and digital scan' },
      { step: 'Design', desc: 'CAD/CAM custom crown creation' },
      { step: 'Temporary', desc: 'Protective temporary crown placed' },
      { step: 'Final Fit', desc: 'Permanent zirconia crown bonded' },
    ],
    duration: '2-3 visits',
    recovery: 'Same day function',
    warranty: 'Ask your clinician about longevity expectations',
    accentColor: '#f59e0b',
    accentLight: '#fef3c7',
  },
  implants: {
    title: 'Advanced Dental Implantology',
    category: 'Surgical Care',
    tagline: 'Long-term tooth replacement with precision-guided implants',
    bannerImg: implantOsstemKit,
    gallery: [
      {
        img: implantOsstemKit,
        title: 'Osstem Dental Implant Surgical Kit',
        caption:
          'Genuine Osstem titanium fixture surgical instrumentation and guided drill system.',
      },
    ],
    flyerFileName: 'RH-Dental-Implants-Osstem-Kit.jpg',
    videoUrl: '/assets/videos/implant.mp4',
    description:
      'Restore your smile with precision-guided dental implants. Our CBCT-planned surgical approach and premium materials support successful integration, providing a long-term solution that looks, feels and functions naturally.',
    benefits: [
      'Long-term tooth replacement solution',
      'Helps preserve bone and maintain facial structure',
      'Designed to look, feel and function naturally',
      '3D guided surgery for precision placement',
      'Planned from a 3D CBCT scan',
    ],
    process: [
      { step: '3D Planning', desc: 'Precise implant positioning using CT scans' },
      { step: 'Surgical Placement', desc: 'Minimally invasive titanium post insertion' },
      { step: 'Healing Period', desc: '3-6 months for osseointegration' },
      { step: 'Crown Placement', desc: 'Custom crown attached to implant' },
    ],
    duration: '3-6 months total',
    recovery: '7-10 days',
    warranty: 'Ask your clinician about implant longevity',
    accentColor: '#10b981',
    accentLight: '#d1fae5',
  },
  'root-canal': {
    title: 'Microscope Root Canal Treatment',
    category: 'Endodontics',
    tagline: 'Comfortable endodontic treatment using microscopic technology',
    bannerImg: rootCanalBanner,
    gallery: [
      {
        img: rootCanalBanner,
        title: 'Operating Microscope Endodontics',
        caption: 'Direct visual magnification for negotiating curved, calcified root canals.',
      },
    ],
    flyerFileName: 'RH-Dental-RootCanal.png',
    videoUrl: '/assets/videos/rootcanal.mp4',
    description:
      'Save your natural tooth with our advanced endodontic care. Using an operating microscope and modern techniques, we make root canal therapy as comfortable as possible while preserving your tooth for years to come.',
    benefits: [
      'Performed under local anaesthesia for your comfort',
      'Microscopic precision for thorough canal cleaning',
      'Single-visit treatment available for straightforward cases',
      'Saves your natural tooth structure',
      'High long-term success rates when well maintained',
    ],
    process: [
      { step: 'Diagnosis', desc: 'Digital X-rays identify infection' },
      { step: 'Anaesthesia', desc: 'Local anaesthesia for your comfort' },
      { step: 'Cleaning', desc: 'Microscopic removal of infection' },
      { step: 'Sealing', desc: 'Biocompatible filling and crown prep' },
    ],
    duration: '60-90 minutes',
    recovery: '1-2 days mild soreness',
    warranty: 'Ask your clinician about prognosis',
    accentColor: '#ef4444',
    accentLight: '#fee2e2',
  },
  'gum-care': {
    title: 'Advanced Periodontal Care',
    category: 'Periodontics',
    tagline: 'Healthy gums for a healthy smile',
    bannerImg: gumCareBanner,
    gallery: [
      {
        img: gumCareBanner,
        title: 'Ultrasonic & Laser Gum Therapy',
        caption: 'Deep pocket decontamination and periodontal rehabilitation suite.',
      },
    ],
    flyerFileName: 'RH-Dental-GumCare.png',
    description:
      'Protect your oral health with expert periodontal treatment. From deep cleaning to advanced gum therapy, we treat gum disease at every stage, supporting the long-term health of your smile.',
    benefits: [
      'Helps prevent tooth loss from gum disease',
      'Reduces inflammation and bleeding',
      'Advanced therapies for faster healing',
      'Connections to overall systemic health',
      'Healthier, more comfortable gums',
    ],
    process: [
      { step: 'Assessment', desc: 'Comprehensive gum health evaluation' },
      { step: 'Deep Cleaning', desc: 'Scaling and root planing treatment' },
      { step: 'Therapy', desc: 'Advanced healing support' },
      { step: 'Maintenance', desc: 'Regular monitoring and prevention' },
    ],
    duration: '2-4 sessions',
    recovery: '3-5 days',
    warranty: 'Ongoing maintenance programme',
    accentColor: '#ec4899',
    accentLight: '#fce7f3',
  },
  'kids-care': {
    title: 'Specialized Pediatric Dentistry',
    category: 'Pedodontics',
    tagline: 'Gentle, friendly dental care for children',
    bannerImg: kidsCareBanner,
    gallery: [
      {
        img: kidsCareBanner,
        title: 'Pediatric Dental Care Operatory',
        caption: 'Child-friendly environment with gentle desensitization and comfort protocols.',
      },
    ],
    flyerFileName: 'RH-Dental-KidsCare.png',
    description:
      'Give your child a lifetime of healthy smiles. Our gentle, experienced team creates a positive dental experience that helps children feel comfortable while providing expert preventive and restorative care.',
    benefits: [
      'Child-friendly environment and staff',
      'Gentle techniques for comfortable visits',
      'Preventive care and education',
      'Early orthodontic assessment',
      'Building lifelong healthy habits',
    ],
    process: [
      { step: 'Welcome', desc: 'Friendly introduction to the dental office' },
      { step: 'Gentle Exam', desc: 'Friendly check-up and cleaning' },
      { step: 'Education', desc: 'Teaching proper brushing techniques' },
      { step: 'Prevention', desc: 'Fluoride and sealants as needed' },
    ],
    duration: '30-45 minutes',
    recovery: 'None required',
    warranty: 'Growing smile programme',
    accentColor: '#f97316',
    accentLight: '#ffedd5',
  },
  aesthetics: {
    title: 'Aesthetic Dentistry & Smile Design',
    category: 'Aesthetics',
    tagline: 'Crafting your confident, natural-looking smile',
    bannerImg: fillingCompositeKit,
    gallery: [
      {
        img: fillingCompositeKit,
        title: 'Composite Restorative Syringe Kit',
        caption:
          'Multi-layer composite resins with nanohybrid fillers for anterior cosmetic restorations.',
      },
      {
        img: fillingPolishingHandpiece,
        title: 'Finishing & High-Gloss Handpiece',
        caption:
          'Micro-polishing tools for creating natural tooth surface texture and enamel shine.',
      },
    ],
    flyerFileName: 'RH-Dental-Aesthetic-Composite-Kit.jpg',
    description:
      'Enhance your smile with our premium aesthetic treatments. From zirconia veneers to professional teeth whitening and full smile makeovers, we blend precision and artistry to create a natural-looking smile designed around your face.',
    benefits: [
      'Custom-designed smile transformations',
      'Ultra-thin, natural-looking zirconia veneers',
      'Professional, safe teeth whitening',
      'Minimally invasive aesthetic procedures',
      'Renewed confidence with a well-designed smile',
    ],
    process: [
      { step: 'Consultation', desc: 'Digital smile design and comprehensive evaluation' },
      { step: 'Preparation', desc: 'Minimally invasive tooth preparation if needed' },
      { step: 'Mockup', desc: 'Try-in your new smile before final placement' },
      { step: 'Final Delivery', desc: 'Bonding of custom-crafted aesthetic restorations' },
    ],
    duration: '1-3 visits',
    recovery: 'Immediate',
    warranty: 'Ask your clinician about longevity',
    accentColor: '#ec4899',
    accentLight: '#fce7f3',
  },
  'dental-tourism': {
    title: 'RH Dental Tourism',
    category: 'Global Travel Care',
    tagline: 'Considered Dental Care & Beautiful Bangladesh',
    bannerImg: dentalTourismBanner,
    gallery: [
      {
        img: dentalTourismBanner,
        title: 'Dental Tourism Concierge Service',
        caption:
          'Coordinated travel, airport pickup, and multi-visit appointments for overseas patients.',
      },
    ],
    flyerFileName: 'RH-Dental-Tourism.png',
    description:
      'Combine specialist dental care with a visit to Bangladesh. We provide complete travel assistance including airport pickups, lodging coordination, private local transit, and guided tours.',
    benefits: [
      'Coordinated implant and cosmetic care for overseas patients',
      'Comprehensive treatment planned before arrival via digital scans',
      'Substantial savings compared to UK, US, and Middle East private rates',
      'Priority scheduling to fit your visit timeline',
      'Concierge support for hotels, transport, and leisure excursions',
    ],
    process: [
      { step: 'Virtual Consultation', desc: 'Case review and preliminary plan before flying' },
      { step: 'Arrival & Welcome', desc: 'Airport pickup and check-in assistance' },
      { step: 'Clinical Care', desc: 'Dedicated treatment sessions at our flagship facilities' },
      { step: 'Explore & Tour', desc: 'Guided leisure activities arranged during recovery' },
      { step: 'Departure & Aftercare', desc: 'Comprehensive handover and records provided' },
    ],
    duration: '5-14 days',
    recovery: 'Varies by procedure',
    warranty: 'Written records and international component codes provided',
    accentColor: '#14b8a6',
    accentLight: '#ccfbf1',
  },
};

/* Lightbox Modal Component */
function FlyerLightbox({
  isOpen,
  photo,
  flyerFileName,
  onClose,
}: {
  isOpen: boolean;
  photo: GalleryPhoto;
  flyerFileName: string;
  onClose: () => void;
}) {
  const handleDownload = useCallback(async () => {
    try {
      const response = await fetch(photo.img.src);
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
      window.open(photo.img.src, '_blank');
    }
  }, [photo.img.src, flyerFileName]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
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
            background: 'rgba(2,6,23,0.95)',
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
              maxWidth: '680px',
              width: '100%',
              maxHeight: '92vh',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
            }}
          >
            {/* Top bar */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 0.25rem',
              }}
            >
              <div>
                <p
                  style={{
                    color: 'rgba(255,255,255,0.6)',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    margin: 0,
                  }}
                >
                  Clinical Photography & Equipment
                </p>
                <p
                  style={{ color: '#fff', fontSize: '1.1rem', fontWeight: 700, margin: '2px 0 0' }}
                >
                  {photo.title}
                </p>
              </div>
              <button
                onClick={onClose}
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.12)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  color: '#fff',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.2s ease',
                  flexShrink: 0,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.25)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.12)';
                }}
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            {/* Image Container */}
            <div
              style={{
                position: 'relative',
                width: '100%',
                maxHeight: '65vh',
                borderRadius: '1.25rem',
                overflow: 'hidden',
                boxShadow: '0 25px 70px rgba(0,0,0,0.5)',
                border: '1px solid rgba(255,255,255,0.15)',
                background: '#020617',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Image
                src={photo.img}
                alt={photo.title}
                style={{
                  width: '100%',
                  height: 'auto',
                  maxHeight: '65vh',
                  objectFit: 'contain',
                }}
                priority
              />
            </div>

            {/* Caption & Download strip */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '1rem',
                padding: '0 0.25rem',
              }}
            >
              <p
                style={{
                  color: 'rgba(255,255,255,0.8)',
                  fontSize: '0.85rem',
                  lineHeight: 1.5,
                  margin: 0,
                }}
              >
                {photo.caption}
              </p>
              <button
                onClick={handleDownload}
                style={{
                  padding: '0.6rem 1.2rem',
                  background: '#0ea5e9',
                  border: 'none',
                  borderRadius: '9999px',
                  color: '#fff',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  flexShrink: 0,
                  boxShadow: '0 4px 15px rgba(14,165,233,0.4)',
                }}
              >
                <Download size={14} />
                Download
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function SpecialtyDetailPage() {
  const params = useParams();
  const slug = (params.slug as string) || '';
  const specialty = specialtiesData[slug];
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);

  if (!specialty) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          gap: '1.5rem',
          background: '#020617',
          color: '#fff',
        }}
      >
        <h1 style={{ fontSize: '2rem', fontWeight: 800 }}>Specialty Not Found</h1>
        <p style={{ color: '#94a3b8' }}>The requested clinical specialty page does not exist.</p>
        <Link
          href="/specialties"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.875rem 1.75rem',
            background: '#0ea5e9',
            color: '#fff',
            borderRadius: '9999px',
            textDecoration: 'none',
            fontWeight: 700,
          }}
        >
          <ArrowLeft size={18} /> Back to Specialties
        </Link>
      </div>
    );
  }

  const activePhoto = specialty.gallery[activePhotoIdx] || specialty.gallery[0];

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', color: '#0f172a' }}>
      <FlyerLightbox
        isOpen={lightboxOpen}
        photo={activePhoto}
        flyerFileName={specialty.flyerFileName}
        onClose={() => setLightboxOpen(false)}
      />

      {/* Top Navigation Bar */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          background: 'rgba(255,255,255,0.85)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid #e2e8f0',
          padding: '0.875rem 0',
        }}
      >
        <div
          className="container"
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
        >
          <Link
            href="/specialties"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: '#64748b',
              textDecoration: 'none',
              fontWeight: 600,
              fontSize: '0.9rem',
              transition: 'color 0.2s',
            }}
          >
            <ArrowLeft size={16} /> All Specialties
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span
              style={{
                background: specialty.accentLight,
                color: specialty.accentColor,
                padding: '0.25rem 0.75rem',
                borderRadius: '50px',
                fontSize: '0.75rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              {specialty.category}
            </span>
            <Link
              href="/contact"
              style={{
                background: specialty.accentColor,
                color: '#fff',
                padding: '0.5rem 1.25rem',
                borderRadius: '50px',
                textDecoration: 'none',
                fontWeight: 700,
                fontSize: '0.875rem',
                boxShadow: `0 4px 15px ${specialty.accentColor}40`,
              }}
            >
              Book Consultation
            </Link>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section
        style={{
          background: 'linear-gradient(135deg, #020617 0%, #0f172a 100%)',
          color: '#fff',
          padding: 'clamp(3rem, 6vw, 5rem) 0',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ maxWidth: '800px' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.15)',
                padding: '0.4rem 1rem',
                borderRadius: '50px',
                color: '#38bdf8',
                fontWeight: 700,
                fontSize: '0.8rem',
                marginBottom: '1.25rem',
                backdropFilter: 'blur(10px)',
              }}
            >
              <Sparkles size={14} />
              <span>{specialty.category}</span>
            </div>
            <h1
              style={{
                fontSize: 'clamp(2rem, 5vw, 3.25rem)',
                fontWeight: 900,
                lineHeight: 1.15,
                letterSpacing: '-0.02em',
                marginBottom: '1rem',
              }}
            >
              {specialty.title}
            </h1>
            <p
              style={{
                fontSize: 'clamp(1.05rem, 2vw, 1.25rem)',
                color: '#94a3b8',
                lineHeight: 1.6,
                maxWidth: '650px',
              }}
            >
              {specialty.tagline}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <section style={{ padding: 'clamp(2.5rem, 5vw, 4rem) 0' }}>
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 1fr) minmax(320px, 420px)',
              gap: 'clamp(2rem, 4vw, 3.5rem)',
              alignItems: 'start',
            }}
          >
            {/* Left: Detailed Information */}
            <div>
              {/* Overview */}
              <div
                style={{
                  background: '#fff',
                  borderRadius: '1.5rem',
                  padding: 'clamp(1.5rem, 3vw, 2.5rem)',
                  border: '1px solid #e2e8f0',
                  marginBottom: '2rem',
                  boxShadow: '0 4px 6px -1px rgba(0,0,0,0.03)',
                }}
              >
                <h2
                  style={{
                    fontSize: '1.5rem',
                    fontWeight: 800,
                    marginBottom: '1rem',
                    letterSpacing: '-0.02em',
                  }}
                >
                  Procedure Overview
                </h2>
                <p style={{ color: '#475569', lineHeight: 1.8, fontSize: '1.05rem' }}>
                  {specialty.description}
                </p>
              </div>

              {/* Clinical Benefits */}
              <div
                style={{
                  background: '#fff',
                  borderRadius: '1.5rem',
                  padding: 'clamp(1.5rem, 3vw, 2.5rem)',
                  border: '1px solid #e2e8f0',
                  marginBottom: '2rem',
                  boxShadow: '0 4px 6px -1px rgba(0,0,0,0.03)',
                }}
              >
                <h2
                  style={{
                    fontSize: '1.5rem',
                    fontWeight: 800,
                    marginBottom: '1.5rem',
                    letterSpacing: '-0.02em',
                  }}
                >
                  Key Clinical Benefits
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {specialty.benefits.map((benefit, i) => (
                    <div
                      key={i}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '0.875rem',
                      }}
                    >
                      <CheckCircle2
                        size={20}
                        color={specialty.accentColor}
                        style={{ flexShrink: 0, marginTop: '2px' }}
                      />
                      <span style={{ color: '#334155', lineHeight: 1.6, fontWeight: 500 }}>
                        {benefit}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Treatment Process */}
              <div
                style={{
                  background: '#fff',
                  borderRadius: '1.5rem',
                  padding: 'clamp(1.5rem, 3vw, 2.5rem)',
                  border: '1px solid #e2e8f0',
                  marginBottom: '2rem',
                  boxShadow: '0 4px 6px -1px rgba(0,0,0,0.03)',
                }}
              >
                <h2
                  style={{
                    fontSize: '1.5rem',
                    fontWeight: 800,
                    marginBottom: '1.5rem',
                    letterSpacing: '-0.02em',
                  }}
                >
                  Step-by-Step Treatment Journey
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  {specialty.process.map((p, i) => (
                    <div
                      key={i}
                      style={{
                        display: 'flex',
                        gap: '1.25rem',
                        alignItems: 'flex-start',
                      }}
                    >
                      <div
                        style={{
                          width: '36px',
                          height: '36px',
                          borderRadius: '10px',
                          background: specialty.accentLight,
                          color: specialty.accentColor,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 800,
                          fontSize: '0.9rem',
                          flexShrink: 0,
                        }}
                      >
                        {i + 1}
                      </div>
                      <div>
                        <h3 style={{ fontSize: '1.05rem', fontWeight: 700, margin: '0 0 0.25rem' }}>
                          {p.step}
                        </h3>
                        <p
                          style={{
                            color: '#64748b',
                            margin: 0,
                            lineHeight: 1.6,
                            fontSize: '0.95rem',
                          }}
                        >
                          {p.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Authentic Clinical Photography & Equipment Card */}
            <div>
              <div
                style={{
                  background: '#fff',
                  borderRadius: '2rem',
                  padding: '1.5rem',
                  boxShadow: '0 20px 50px rgba(0,0,0,0.08)',
                  border: `2px solid ${specialty.accentLight}`,
                  position: 'sticky',
                  top: '90px',
                }}
              >
                {/* Header */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '1rem',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Camera size={16} color={specialty.accentColor} />
                    <span
                      style={{
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                        color: specialty.accentColor,
                      }}
                    >
                      Authentic Clinic Equipment
                    </span>
                  </div>
                  <span
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      color: '#64748b',
                      background: '#f1f5f9',
                      padding: '2px 8px',
                      borderRadius: '9999px',
                    }}
                  >
                    Photo {activePhotoIdx + 1} of {specialty.gallery.length}
                  </span>
                </div>

                {/* Main Interactive Showcase Image */}
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                  className="interactive-banner"
                  onClick={() => setLightboxOpen(true)}
                  style={{
                    position: 'relative',
                    width: '100%',
                    aspectRatio: '4/3',
                    borderRadius: '1.25rem',
                    overflow: 'hidden',
                    cursor: 'zoom-in',
                    background: '#091528',
                    border: '1px solid #e2e8f0',
                  }}
                >
                  <Image
                    src={activePhoto.img}
                    alt={activePhoto.title}
                    fill
                    priority
                    style={{ objectFit: 'contain' }}
                  />
                  <div className="banner-overlay">
                    <ZoomIn size={32} className="zoom-icon" />
                    <span>View High-Resolution</span>
                  </div>
                </motion.div>

                {/* Thumbnail Selector (if multiple photos exist) */}
                {specialty.gallery.length > 1 && (
                  <div
                    style={{
                      display: 'flex',
                      gap: '0.5rem',
                      marginTop: '0.875rem',
                      overflowX: 'auto',
                      paddingBottom: '4px',
                    }}
                  >
                    {specialty.gallery.map((gPhoto, gIdx) => (
                      <button
                        key={gIdx}
                        type="button"
                        onClick={() => setActivePhotoIdx(gIdx)}
                        style={{
                          position: 'relative',
                          width: '64px',
                          height: '52px',
                          borderRadius: '8px',
                          overflow: 'hidden',
                          border:
                            activePhotoIdx === gIdx
                              ? `2px solid ${specialty.accentColor}`
                              : '1px solid #cbd5e1',
                          background: '#091528',
                          cursor: 'pointer',
                          padding: 0,
                          flexShrink: 0,
                          opacity: activePhotoIdx === gIdx ? 1 : 0.65,
                          transition: 'all 0.2s',
                        }}
                      >
                        <Image
                          src={gPhoto.img}
                          alt={gPhoto.title}
                          fill
                          style={{ objectFit: 'cover' }}
                        />
                      </button>
                    ))}
                  </div>
                )}

                {/* Photo Title & Caption */}
                <div style={{ marginTop: '1rem' }}>
                  <h4
                    style={{
                      margin: '0 0 4px',
                      fontSize: '1rem',
                      fontWeight: 700,
                      color: '#0f172a',
                    }}
                  >
                    {activePhoto.title}
                  </h4>
                  <p
                    style={{
                      margin: 0,
                      fontSize: '0.85rem',
                      color: '#64748b',
                      lineHeight: 1.5,
                    }}
                  >
                    {activePhoto.caption}
                  </p>
                </div>

                {/* Action button */}
                <motion.button
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setLightboxOpen(true)}
                  style={{
                    width: '100%',
                    marginTop: '1.25rem',
                    padding: '0.85rem 1rem',
                    background: `linear-gradient(135deg, ${specialty.accentColor}18 0%, ${specialty.accentColor}08 100%)`,
                    border: `1.5px solid ${specialty.accentColor}40`,
                    borderRadius: '0.875rem',
                    color: specialty.accentColor,
                    fontWeight: 700,
                    fontSize: '0.875rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <ZoomIn size={16} />
                  Enlarge High-Res Clinical Photo
                </motion.button>

                {/* Quick Consultation CTA */}
                <div
                  style={{
                    marginTop: '1.5rem',
                    paddingTop: '1.25rem',
                    borderTop: '1px solid #f1f5f9',
                    textAlign: 'center',
                  }}
                >
                  <p style={{ fontSize: '0.85rem', color: '#64748b', margin: '0 0 0.75rem' }}>
                    Need specialist evaluation for this procedure?
                  </p>
                  <Link
                    href="/contact"
                    style={{
                      display: 'block',
                      width: '100%',
                      padding: '0.85rem 1rem',
                      background: specialty.accentColor,
                      color: '#fff',
                      borderRadius: '0.875rem',
                      fontWeight: 700,
                      fontSize: '0.9rem',
                      textDecoration: 'none',
                      boxShadow: `0 4px 15px ${specialty.accentColor}35`,
                    }}
                  >
                    Book Specialist Slot
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
