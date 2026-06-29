import type { Metadata } from 'next';

const BASE_URL = 'https://www.rhdentalcare.com';

const specialtyMeta: Record<string, { title: string; description: string; keywords: string[] }> = {
  '3d-imaging': {
    title: '3D Dental Imaging in Dhaka — CBCT Cone Beam Scanning | RH Dental Care',
    description:
      'Get precise 3D CBCT dental imaging at RH Dental Care, Dhaka. 90% less radiation, instant digital results, perfect for implant planning and complex cases. BMDC-certified specialists.',
    keywords: ['3D dental imaging Dhaka', 'CBCT dental scan Bangladesh', 'cone beam CT Dhaka', 'dental X-ray Dhaka', '3D dental scan Bangladesh'],
  },
  braces: {
    title: 'Orthodontics & Clear Aligners in Dhaka — Braces Specialist | RH Dental Care',
    description:
      'Straighten your teeth with braces or invisible clear aligners at RH Dental Care, Dhaka. BMDC-certified orthodontist, digital smile preview, 6–18 month treatment. Free consultation.',
    keywords: ['orthodontics Dhaka', 'braces Dhaka Bangladesh', 'clear aligners Dhaka', 'invisible braces Dhaka', 'orthodontist Bangladesh'],
  },
  zirconia: {
    title: 'Zirconia Crown & Dental Restoration in Dhaka | RH Dental Care',
    description:
      'Premium zirconia crowns and dental restorations at RH Dental Care, Dhaka. Metal-free, biocompatible, 10-year guarantee. CAD/CAM precision crafted. BMDC-certified prosthodontist.',
    keywords: ['zirconia crown Dhaka', 'dental crown Bangladesh', 'porcelain crown Dhaka', 'CAD CAM crown Dhaka', 'dental restoration Bangladesh'],
  },
  implants: {
    title: 'Dental Implants in Dhaka — Advanced Implantology | RH Dental Care',
    description:
      'Permanent dental implants at RH Dental Care, Dhaka. 3D-guided surgery, lifetime implant guarantee, 98% success rate. Single implant, All-on-4/6, implant bridges. BMDC-certified oral surgeon.',
    keywords: ['dental implants Dhaka', 'dental implant Bangladesh', 'All-on-4 implants Dhaka', 'implant dentist Dhaka', 'permanent tooth replacement Dhaka'],
  },
  'root-canal': {
    title: 'Painless Root Canal Treatment in Dhaka | RH Dental Care',
    description:
      'Painless root canal therapy at RH Dental Care, Dhaka using dental microscopes and rotary endodontics. Single-visit available, 5-year guarantee. BMDC-certified endodontist.',
    keywords: ['root canal treatment Dhaka', 'painless root canal Bangladesh', 'endodontics Dhaka', 'root canal specialist Bangladesh', 'root canal dentist Dhaka'],
  },
  'gum-care': {
    title: 'Gum Disease Treatment & Periodontal Care in Dhaka | RH Dental Care',
    description:
      'Expert gum disease treatment and periodontal care at RH Dental Care, Dhaka. Laser therapy, deep cleaning, gum surgery by BMDC-certified periodontist. Prevent tooth loss today.',
    keywords: ['gum disease treatment Dhaka', 'periodontal care Bangladesh', 'gum surgery Dhaka', 'periodontist Bangladesh', 'gum treatment Dhaka'],
  },
  'kids-care': {
    title: 'Pediatric Dentistry in Dhaka — Kids Dentist | RH Dental Care',
    description:
      'Gentle, fear-free pediatric dentistry for children at RH Dental Care, Dhaka. Fun environment, preventive care, early orthodontic assessment. BMDC-certified kids dentist. Book now.',
    keywords: ['kids dentist Dhaka', 'pediatric dentist Bangladesh', 'children dentist Dhaka', 'pediatric dentistry Dhaka', 'child dental care Bangladesh'],
  },
  aesthetics: {
    title: 'Cosmetic Dentistry & Smile Design in Dhaka | RH Dental Care',
    description:
      'Transform your smile with cosmetic dentistry at RH Dental Care, Dhaka. Digital smile design (DSD), veneers, teeth whitening, composite bonding & full smile makeovers. BMDC-certified cosmetic dentist.',
    keywords: ['cosmetic dentistry Dhaka', 'smile design Dhaka', 'dental veneers Bangladesh', 'teeth whitening Dhaka', 'smile makeover Dhaka'],
  },
};

const defaultMeta = {
  title: 'Dental Specialty | RH Dental Care Dhaka',
  description: 'Expert dental specialty care at RH Dental Care, Dhaka — BMDC-certified specialists in implants, orthodontics, root canal, cosmetic dentistry and more.',
  keywords: ['dental specialty Dhaka', 'dental care Bangladesh', 'RH Dental Care'],
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const meta = specialtyMeta[slug] ?? defaultMeta;

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: { canonical: `/specialties/${slug}` },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `${BASE_URL}/specialties/${slug}`,
      images: [{ url: '/rhlogo.jpeg', width: 1200, height: 630, alt: `RH Dental Care — ${meta.title}` }],
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description,
      images: ['/rhlogo.jpeg'],
    },
  };
}

export default function SpecialtySlugLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}