import type { Metadata } from 'next';
import Link from 'next/link';
import Image, { StaticImageData } from 'next/image';
import { ArrowRight, HeartPulse, Sparkles } from 'lucide-react';
import './specialties.css';

import JsonLd from '@/components/seo/JsonLd';
import { pageMeta } from '@/lib/seo/metadata';
import { breadcrumbs } from '@/lib/seo/schema';

/* Authentic Clinical Instrument & Specialty Photography */
import implantOsstemKit from '@/assets/specialties/instruments/implant-osstem-kit.jpg';
import alignerTrayClinic from '@/assets/specialties/instruments/aligner-tray-clinic.jpg';
import bracesPliers from '@/assets/specialties/instruments/braces-orthodontic-pliers.jpg';
import crownShadeGuide from '@/assets/specialties/instruments/crown-shofu-shade-guide.jpg';
import fillingCompositeKit from '@/assets/specialties/instruments/filling-composite-kit.jpg';
import rootCanalImg from '@/assets/specialties/root-canal.jpg';
import gumCareImg from '@/assets/specialties/gum-care.jpg';
import kidsCareImg from '@/assets/specialties/kids-care.jpg';
import imagingImg from '@/assets/specialties/3d-imaging.jpg';
import dentalTourismImg from '@/assets/specialties/dental_tourism.png';
import surgeryImg from '@/assets/specialties/instruments/filling-polishing-handpiece.jpg';

export const metadata: Metadata = pageMeta({
  title: 'Dental Specialties & Clinical Disciplines in Dhaka',
  description:
    'The clinical disciplines covered at RH Dental Care, Dhaka: implantology, orthodontics, endodontics, prosthodontics, paediatric dentistry and oral surgery.',
  path: '/specialties',
});

interface SpecialtyCardItem {
  id: string;
  title: string;
  category: string;
  desc: string;
  path: string;
  color: string;
  image: StaticImageData;
  equipmentBadge: string;
}

const specialtiesData: SpecialtyCardItem[] = [
  {
    id: 'implants',
    title: 'Dental Implants',
    category: 'Surgical Care',
    desc: 'Long-term, natural-looking tooth replacements using advanced CBCT-guided placement and genuine Osstem titanium fixtures.',
    path: '/specialties/implants',
    color: '#0ea5e9',
    image: implantOsstemKit,
    equipmentBadge: 'Osstem Surgical Kit',
  },
  {
    id: 'clear-aligners',
    title: 'Clear Aligner Treatment',
    category: 'Orthodontics',
    desc: 'Discreet, removable clear aligners tailored to your digital scan for comfortable teeth straightening without metal wires.',
    path: '/clear-aligner-treatment-dhaka',
    color: '#8b5cf6',
    image: alignerTrayClinic,
    equipmentBadge: '3D Dental Stone Model',
  },
  {
    id: 'orthodontics',
    title: 'Orthodontics & Braces',
    category: 'Orthodontics',
    desc: 'Precision ceramic and metallic fixed braces for complex bite alignment, overbites, and aesthetic teeth correction.',
    path: '/specialties/braces',
    color: '#6366f1',
    image: bracesPliers,
    equipmentBadge: 'Orthodontic Pliers',
  },
  {
    id: 'zirconia-crown',
    title: 'Zirconia Crowns & Bridges',
    category: 'Prosthodontics',
    desc: 'Ultra-strong, natural-looking monolithic and layered zirconia crowns crafted in our in-house master digital CAD/CAM lab.',
    path: '/specialties/zirconia',
    color: '#f59e0b',
    image: crownShadeGuide,
    equipmentBadge: 'Shofu Shade Guide',
  },
  {
    id: 'root-canal',
    title: 'Microscopic Root Canal',
    category: 'Endodontics',
    desc: 'Single-visit microscopic root canal therapy under local anaesthetic, using operating magnification to save natural teeth.',
    path: '/specialties/root-canal',
    color: '#0073e6',
    image: rootCanalImg,
    equipmentBadge: 'Dental Microscope',
  },
  {
    id: 'aesthetics',
    title: 'Aesthetic Dentistry & Veneers',
    category: 'Cosmetic Dentistry',
    desc: 'Custom digital smile design, ultra-thin porcelain veneers, and multi-shade nanohybrid composite restorations.',
    path: '/specialties/aesthetics',
    color: '#ec4899',
    image: fillingCompositeKit,
    equipmentBadge: 'Composite Syringe Kit',
  },
  {
    id: 'gum-care',
    title: 'Advanced Periodontal Care',
    category: 'Periodontics',
    desc: 'Deep ultrasonic scaling, root surface debridement, and soft-tissue diode laser therapy to prevent tooth loss and bleeding.',
    path: '/specialties/gum-care',
    color: '#10b981',
    image: gumCareImg,
    equipmentBadge: 'Laser & Ultrasonic Unit',
  },
  {
    id: 'kids-care',
    title: 'Specialized Pediatric Care',
    category: 'Pedodontics',
    desc: 'Gentle, fear-free dentistry for children and patients with additional needs, including sensory adaptation and preventive fluoride.',
    path: '/specialties/kids-care',
    color: '#f43f5e',
    image: kidsCareImg,
    equipmentBadge: 'Child-Friendly Suite',
  },
  {
    id: 'dental-surgery',
    title: 'Oral & Maxillofacial Surgery',
    category: 'Oral Surgery',
    desc: 'Expert surgical impactions, wisdom tooth removal, bone grafting, and socket preservation under hospital-grade sterility.',
    path: '/dental-surgery',
    color: '#ef4444',
    image: surgeryImg,
    equipmentBadge: 'Surgical Handpiece',
  },
  {
    id: 'digital-imaging',
    title: 'Precision 3D Diagnostics',
    category: 'Diagnostics',
    desc: 'High-resolution, ultra-low-radiation 3D CBCT imaging for anatomical nerve tracking, sinus mapping, and bone density evaluation.',
    path: '/specialties/3d-imaging',
    color: '#0284c7',
    image: imagingImg,
    equipmentBadge: 'On-Site 3D CBCT',
  },
  {
    id: 'dental-tourism',
    title: 'RH Dental Tourism',
    category: 'Global Travel Care',
    desc: 'Pre-flight digital treatment planning, VIP airport transit, and priority clinical scheduling for expatriates and overseas patients.',
    path: '/specialties/dental-tourism',
    color: '#14b8a6',
    image: dentalTourismImg,
    equipmentBadge: 'International Care',
  },
];

export default function SpecialtiesPage() {
  return (
    <div
      className="sp-root"
      style={{ background: '#050e1e', minHeight: '100vh', color: '#eaf2fb' }}
    >
      <JsonLd nodes={[breadcrumbs({ name: 'Specialties', path: '/specialties' })]} />

      {/* Hero Section */}
      <section
        style={{
          padding: 'clamp(5rem, 10vw, 8rem) 2rem 3.5rem',
          background: 'linear-gradient(180deg, #020617 0%, #050e1e 100%)',
          color: '#fff',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
          borderBottom: '1px solid rgba(160, 200, 255, 0.12)',
        }}
      >
        <div className="container" style={{ position: 'relative', zIndex: 1, maxWidth: '900px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(0, 140, 255, 0.12)',
              border: '1px solid rgba(0, 140, 255, 0.28)',
              padding: '6px 14px',
              borderRadius: '50px',
              color: '#38aaff',
              fontWeight: 700,
              fontSize: '0.85rem',
              marginBottom: '1.25rem',
            }}
          >
            <HeartPulse size={16} />
            <span>Multi-Disciplinary Dental Disciplines</span>
          </div>

          <h1
            style={{
              fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
              fontWeight: 900,
              lineHeight: 1.15,
              marginBottom: '1.25rem',
              letterSpacing: '-0.02em',
              color: '#ffffff',
            }}
          >
            Clinical Specialties & Instrumentation{' '}
            <span style={{ color: '#008cff' }}>in Dhaka</span>
          </h1>

          <p
            style={{
              fontSize: 'clamp(1.05rem, 1.8vw, 1.2rem)',
              color: '#9db2cc',
              maxWidth: '750px',
              margin: '0 auto',
              lineHeight: 1.7,
            }}
          >
            Explore our specialized clinical departments across our Banani and Banasree facilities.
            Every treatment is supported by authentic hospital-grade instrumentation, 3D CBCT
            diagnostics, and our on-site CAD/CAM digital laboratory.
          </p>
        </div>
      </section>

      {/* Specialties Visual Bento Grid */}
      <section style={{ padding: 'clamp(3rem, 6vw, 5rem) 0', background: '#050e1e' }}>
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '1.75rem',
            }}
          >
            {specialtiesData.map((specialty) => (
              <Link key={specialty.id} href={specialty.path} className="specialty-card-link">
                <div
                  className="specialty-card"
                  style={{
                    background: '#0c1a30',
                    border: '1px solid rgba(160, 200, 255, 0.14)',
                    borderRadius: '1.5rem',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 8px 30px rgba(0,0,0,0.25)',
                  }}
                >
                  {/* Photo Container */}
                  <div
                    style={{
                      position: 'relative',
                      width: '100%',
                      aspectRatio: '16/10',
                      background: '#081426',
                      overflow: 'hidden',
                    }}
                  >
                    <Image
                      src={specialty.image}
                      alt={specialty.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      style={{ objectFit: 'cover' }}
                      className="specialty-photo-hover"
                    />
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background:
                          'linear-gradient(to top, rgba(12, 26, 48, 0.95) 0%, rgba(12, 26, 48, 0.15) 60%, transparent 100%)',
                      }}
                    />
                    {/* Badge */}
                    <div
                      style={{
                        position: 'absolute',
                        bottom: '12px',
                        left: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        background: 'rgba(5, 14, 30, 0.85)',
                        backdropFilter: 'blur(8px)',
                        border: '1px solid rgba(160, 200, 255, 0.25)',
                        padding: '4px 10px',
                        borderRadius: '9999px',
                        fontSize: '11px',
                        fontWeight: 700,
                        color: specialty.color,
                        letterSpacing: '0.04em',
                      }}
                    >
                      <Sparkles size={12} />
                      <span>{specialty.equipmentBadge}</span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div
                    style={{
                      padding: '1.5rem',
                      display: 'flex',
                      flexDirection: 'column',
                      flexGrow: 1,
                    }}
                  >
                    <span
                      style={{
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                        color: '#9db2cc',
                        marginBottom: '4px',
                      }}
                    >
                      {specialty.category}
                    </span>

                    <h2
                      style={{
                        fontSize: '1.35rem',
                        fontWeight: 800,
                        color: '#ffffff',
                        margin: '0 0 0.75rem',
                        letterSpacing: '-0.01em',
                      }}
                    >
                      {specialty.title}
                    </h2>

                    <p
                      style={{
                        color: '#9db2cc',
                        fontSize: '0.95rem',
                        lineHeight: 1.6,
                        flexGrow: 1,
                        margin: '0 0 1.5rem',
                      }}
                    >
                      {specialty.desc}
                    </p>

                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginTop: 'auto',
                        paddingTop: '1rem',
                        borderTop: '1px solid rgba(160, 200, 255, 0.1)',
                        color: '#38aaff',
                        fontWeight: 700,
                        fontSize: '0.9rem',
                      }}
                    >
                      <span>Explore Procedure & Setup</span>
                      <ArrowRight size={16} />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Booking CTA */}
      <section
        style={{
          padding: '4.5rem 0',
          background: 'linear-gradient(135deg, #081426 0%, #002347 100%)',
          textAlign: 'center',
          borderTop: '1px solid rgba(160, 200, 255, 0.14)',
        }}
      >
        <div className="container" style={{ maxWidth: '680px' }}>
          <h3
            style={{
              fontSize: 'clamp(1.75rem, 3.5vw, 2.25rem)',
              fontWeight: 800,
              color: '#ffffff',
              margin: '0 0 1rem',
            }}
          >
            Consult With Our Specialist Clinicians
          </h3>
          <p
            style={{
              color: '#9db2cc',
              fontSize: '1.05rem',
              lineHeight: 1.6,
              margin: '0 auto 2rem',
            }}
          >
            Arrange a dedicated consultation at RH Dental Care Banani or our Banasree flagship
            hospital. Experience individualized diagnosis, transparent pricing, and gentle clinical
            execution.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <Link
              href="/contact"
              style={{
                display: 'inline-block',
                padding: '0.9rem 2rem',
                borderRadius: '9999px',
                background: '#008cff',
                color: '#fff',
                fontWeight: 700,
                textDecoration: 'none',
                boxShadow: '0 4px 20px rgba(0, 140, 255, 0.4)',
              }}
            >
              Book Consultation Slot
            </Link>
            <Link
              href="/faq"
              style={{
                display: 'inline-block',
                padding: '0.9rem 2rem',
                borderRadius: '9999px',
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(160, 200, 255, 0.25)',
                color: '#ffffff',
                fontWeight: 700,
                textDecoration: 'none',
              }}
            >
              Browse 120 FAQs
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
