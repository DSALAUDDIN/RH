import { Metadata } from 'next';
import ServicesList from '@/components/ServicesList';
import Link from 'next/link';
import { Sparkles, ArrowLeft, CheckCircle2, ShieldCheck, Star } from 'lucide-react';
import './services.css';
import Image from 'next/image';
import imgAesthetic from '@/assets/specialties/aesthetic_new.png';
import imgOrtho from '@/assets/specialties/braces_new.png';
import imgImplants from '@/assets/specialties/implant_new.png';
import imgWhitening from '@/assets/specialties/gum-care_new.png';
import JsonLd from '@/components/seo/JsonLd';
import { pageMeta } from '@/lib/seo/metadata';
import { breadcrumbs } from '@/lib/seo/schema';

export const metadata: Metadata = pageMeta({
  title: 'Dental Services in Dhaka',
  description:
    'What RH Dental Care treats, at the Banani appointment-only suite and the Banasree flagship hospital in Dhaka.',
  path: '/services',
});

const detailedServices = [
  {
    id: 'aesthetic',
    image: imgAesthetic,
    title: 'Aesthetic Dentistry',
    desc: 'Your smile is your signature. Our aesthetic dentistry services aim to perfect the appearance of your teeth using minimally invasive techniques. We offer custom porcelain veneers, cosmetic bonding, and complete smile makeovers designed mathematically to suit your facial proportions.',
    points: [
      'Porcelain & Composite Veneers',
      'Gum Contouring',
      'Cosmetic Bonding',
      'Digital Smile Design (DSD)',
    ],
    icon: <Sparkles size={28} strokeWidth={1.75} />,
  },
  {
    id: 'orthodontics',
    image: imgOrtho,
    title: 'Orthodontics',
    desc: 'Straight teeth not only look better but are easier to keep clean, reducing the risk of decay and gum disease. We provide modern orthodontic solutions that fit your lifestyle, prioritizing aesthetics without compromising on results.',
    points: [
      'Invisalign & Clear Aligners',
      'Ceramic Braces',
      'Lingual Braces',
      'Early Interceptive Orthodontics',
    ],
    icon: <Star size={28} strokeWidth={1.75} />,
  },
  {
    id: 'implants',
    image: imgImplants,
    title: 'Dental Implants',
    desc: 'Replace missing teeth permanently. Implants are the gold standard for tooth replacement, offering a foundation that looks, feels, and functions like natural teeth.',
    points: [
      'Single Tooth Implants',
      'All-on-4® Treatment Concept',
      'Implant-Supported Bridges',
      'Bone Grafting & Sinus Lifts',
    ],
    icon: <ShieldCheck size={28} strokeWidth={1.75} />,
  },
  {
    id: 'whitening',
    image: imgWhitening,
    title: 'Professional Teeth Whitening',
    desc: 'Over time, teeth can become stained by coffee, tea, wine, and aging. Our professional whitening treatments are safe, fast, and deliver dramatically brighter results than over-the-counter options.',
    points: [
      'In-Office Laser Whitening (1 hr)',
      'Custom Take-Home Kits',
      'Internal Bleaching',
      'Stain Removal',
    ],
    icon: <Sparkles size={28} strokeWidth={1.75} />,
  },
];

export default function ServicesPage() {
  return (
    <div className="srv-page-bg">
      <JsonLd nodes={[breadcrumbs({ name: 'Services', path: '/services' })]} />
      {/* Dark Hero Section */}
      <section className="srv-hero">
        <div className="srv-hero-content">
          <div className="srv-badge">
            <Sparkles size={14} /> Comprehensive Dental Care
          </div>
          <Link
            href="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: 'rgba(255,255,255,0.6)',
              textDecoration: 'none',
              fontSize: '0.85rem',
              fontWeight: 600,
              marginBottom: '1.5rem',
              transition: 'color 0.3s ease',
              position: 'absolute',
              top: '-4rem',
              left: '0',
            }}
          >
            <ArrowLeft size={16} /> Back to Home
          </Link>
          <h1 className="srv-title">
            Premium Dental <br />
            <span style={{ color: '#38bdf8' }}>Services</span>
          </h1>
          <p className="srv-subtitle">
            We provide a full spectrum of dental treatments tailored to give you the perfect healthy
            smile. Explore our specialties below.
          </p>
        </div>
      </section>

      {/* Overview list */}
      <div className="srv-list-wrapper">
        <ServicesList limit={4} />
      </div>

      {/* Deep Dive Blocks */}
      <div className="srv-details">
        {detailedServices.map((service) => (
          <div
            key={service.id}
            id={service.id}
            className="srv-detail-card"
            style={{ scrollMarginTop: 'var(--nav-height)' }}
          >
            <div className="srv-dc-visual">
              <Image
                src={service.image}
                alt={service.title}
                fill
                sizes="(max-width: 900px) 100vw, 45vw"
                className="srv-dc-img"
              />
              <div className="srv-dc-icon">{service.icon}</div>
            </div>
            <div className="srv-dc-content">
              <h2 className="srv-dc-title">{service.title}</h2>
              <p className="srv-dc-desc">{service.desc}</p>
              <ul className="srv-dc-list">
                {service.points.map((pt, i) => (
                  <li key={i} className="srv-dc-list-item">
                    <CheckCircle2 size={18} /> {pt}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
