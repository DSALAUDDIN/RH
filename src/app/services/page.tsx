import { Metadata } from 'next';
import ServicesList from '@/components/ServicesList';
import Link from 'next/link';
import { Sparkles, ArrowLeft, CheckCircle2, ShieldCheck, Star } from 'lucide-react';
import './services.css';

export const metadata: Metadata = {
  title: 'Dental Services in Dhaka — Implants, Braces, Root Canal & More | RH Dental Care',
  description:
    'Explore all dental services at RH Dental Care, Dhaka — dental implants, orthodontics (braces & aligners), painless root canal, cosmetic smile design, teeth whitening, zirconia crowns, gum care, pediatric dentistry & full-mouth rehabilitation. BMDC-certified specialists.',
  keywords: [
    'dental services Dhaka',
    'dental implants Dhaka',
    'orthodontics braces Dhaka',
    'clear aligners Bangladesh',
    'root canal treatment Dhaka',
    'teeth whitening Dhaka',
    'smile design Dhaka',
    'zirconia crown Dhaka',
    'gum treatment Dhaka',
    'pediatric dentistry Dhaka',
    'cosmetic dentistry Bangladesh',
    'full mouth rehabilitation Dhaka',
    'dental clinic services Bangladesh',
    'RH Dental Care services',
  ],
  alternates: { canonical: '/services' },
  openGraph: {
    title: 'Dental Services — Implants, Braces, Root Canal & More | RH Dental Care Dhaka',
    description:
      'Comprehensive dental care under one roof in Dhaka. Advanced implants, orthodontics, cosmetic dentistry & painless treatments by BMDC-certified specialists.',
    url: 'https://www.rhdentalcare.com/services',
    images: [{ url: '/rhlogo.jpeg', width: 1200, height: 630, alt: 'RH Dental Care Services Dhaka' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dental Services | RH Dental Care Dhaka',
    description: 'All dental services at RH Dental Care — implants, orthodontics, root canal, cosmetic care & more.',
    images: ['/rhlogo.jpeg'],
  },
};

const BASE_URL = 'https://www.rhdentalcare.com';

const servicesBreadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
    { '@type': 'ListItem', position: 2, name: 'Services', item: `${BASE_URL}/services` },
  ],
};

const detailedServices = [
  {
    id: 'aesthetic',
    title: 'Aesthetic Dentistry',
    desc: 'Your smile is your signature. Our aesthetic dentistry services aim to perfect the appearance of your teeth using minimally invasive techniques. We offer custom porcelain veneers, cosmetic bonding, and complete smile makeovers designed mathematically to suit your facial proportions.',
    points: ['Porcelain & Composite Veneers', 'Gum Contouring', 'Cosmetic Bonding', 'Digital Smile Design (DSD)'],
    icon: <Sparkles size={56} strokeWidth={1.5} />
  },
  {
    id: 'orthodontics',
    title: 'Orthodontics',
    desc: 'Straight teeth not only look better but are easier to keep clean, reducing the risk of decay and gum disease. We provide modern orthodontic solutions that fit your lifestyle, prioritizing aesthetics without compromising on results.',
    points: ['Invisalign & Clear Aligners', 'Ceramic Braces', 'Lingual Braces', 'Early Interceptive Orthodontics'],
    icon: <Star size={56} strokeWidth={1.5} />
  },
  {
    id: 'implants',
    title: 'Dental Implants',
    desc: 'Replace missing teeth permanently. Implants are the gold standard for tooth replacement, offering a foundation that looks, feels, and functions like natural teeth.',
    points: ['Single Tooth Implants', 'All-on-4® Treatment Concept', 'Implant-Supported Bridges', 'Bone Grafting & Sinus Lifts'],
    icon: <ShieldCheck size={56} strokeWidth={1.5} />
  },
  {
    id: 'whitening',
    title: 'Professional Teeth Whitening',
    desc: 'Over time, teeth can become stained by coffee, tea, wine, and aging. Our professional whitening treatments are safe, fast, and deliver dramatically brighter results than over-the-counter options.',
    points: ['In-Office Laser Whitening (1 hr)', 'Custom Take-Home Kits', 'Internal Bleaching', 'Stain Removal'],
    icon: <Sparkles size={56} strokeWidth={1.5} />
  }
];

export default function ServicesPage() {
  return (
    <div className="srv-page-bg">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesBreadcrumb).replace(/</g, '\\u003c') }}
      />
      {/* ── Dark Hero Section ── */}
      <section className="srv-hero">
        <div className="srv-hero-content">
          <div className="srv-badge"><Sparkles size={14} /> Comprehensive Dental Care</div>
          <Link href="/" style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            color: 'rgba(255,255,255,0.6)', textDecoration: 'none',
            fontSize: '0.85rem', fontWeight: 600, marginBottom: '1.5rem',
            transition: 'color 0.3s ease', position: 'absolute', top: '-4rem', left: '0'
          }}>
            <ArrowLeft size={16} /> Back to Home
          </Link>
          <h1 className="srv-title">Premium Dental <br/><span style={{ color: '#38bdf8' }}>Services</span></h1>
          <p className="srv-subtitle">
            We provide a full spectrum of dental treatments tailored to give you the perfect healthy smile. Explore our specialties below.
          </p>
        </div>
      </section>

      {/* ── Overview List (Modernized previously) ── */}
      <div className="srv-list-wrapper">
        <ServicesList limit={4} />
      </div>

      {/* ── Deep Dive Blocks ── */}
      <div className="srv-details">
        {detailedServices.map((service) => (
          <div key={service.id} id={service.id} className="srv-detail-card" style={{ scrollMarginTop: 'var(--nav-height)' }}>
            <div className="srv-dc-visual">
              <div className="srv-dc-icon">
                {service.icon}
              </div>
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
