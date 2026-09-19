import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import JsonLd from '@/components/seo/JsonLd';
import { pageMeta } from '@/lib/seo/metadata';
import {
  SPECIALTY_CANONICAL,
  SPECIALTY_SLUGS,
  isSpecialtySlug,
  type SpecialtySlug,
} from '@/lib/seo/routes';
import { breadcrumbs } from '@/lib/seo/schema';

interface SpecialtyMeta {
  title: string;
  description: string;
  crumb: string;
}

const SPECIALTY_META: Record<SpecialtySlug, SpecialtyMeta> = {
  '3d-imaging': {
    title: '3D CBCT Dental Imaging in Dhaka',
    description:
      'Cone beam CT (CBCT) dental imaging at RH Dental Care, Dhaka, used to plan implants, surgery and complex root canal cases in three dimensions.',
    crumb: '3D Imaging',
  },
  braces: {
    title: 'Braces & Clear Aligners in Dhaka',
    description:
      'Fixed braces and clear aligners at RH Dental Care, Dhaka, with digital treatment planning and retainers after treatment.',
    crumb: 'Orthodontics',
  },
  zirconia: {
    title: 'Zirconia Crowns & Restorations in Dhaka',
    description:
      'Metal-free zirconia crowns and restorations designed with CAD/CAM at RH Dental Care, Dhaka.',
    crumb: 'Zirconia',
  },
  implants: {
    title: 'Dental Implants in Dhaka',
    description:
      'Single implants, implant bridges and full-arch options at RH Dental Care, Dhaka, planned from a 3D CBCT scan.',
    crumb: 'Dental Implants',
  },
  'root-canal': {
    title: 'Root Canal Treatment in Dhaka',
    description:
      'Microscope-assisted root canal treatment with rotary instruments at RH Dental Care, Dhaka.',
    crumb: 'Root Canal',
  },
  'gum-care': {
    title: 'Gum Disease Treatment in Dhaka',
    description:
      'Periodontal care at RH Dental Care, Dhaka: deep cleaning, laser therapy and gum surgery to treat gum disease and protect teeth.',
    crumb: 'Gum Care',
  },
  'kids-care': {
    title: "Children's Dentistry in Dhaka",
    description:
      'Preventive and restorative dental care for children at RH Dental Care, Dhaka, including early orthodontic assessment.',
    crumb: 'Kids Care',
  },
  aesthetics: {
    title: 'Cosmetic Dentistry & Smile Design in Dhaka',
    description:
      'Digital smile design, veneers, whitening and composite bonding at RH Dental Care, Dhaka.',
    crumb: 'Aesthetic Dentistry',
  },
  'dental-tourism': {
    title: 'Dental Treatment in Dhaka for Overseas Patients',
    description:
      'Planning dental treatment in Dhaka from abroad with RH Dental Care: records reviewed in advance and treatment scheduled around your trip.',
    crumb: 'Dental Tourism',
  },
};

export const dynamicParams = false;

export function generateStaticParams() {
  return SPECIALTY_SLUGS.map((slug) => ({ slug }));
}

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  if (!isSpecialtySlug(slug)) return {};

  const meta = SPECIALTY_META[slug];
  return pageMeta({
    title: meta.title,
    description: meta.description,
    path: `/specialties/${slug}`,
    canonical: SPECIALTY_CANONICAL[slug],
  });
}

export default async function SpecialtyLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Params;
}) {
  const { slug } = await params;
  if (!isSpecialtySlug(slug)) notFound();

  return (
    <>
      <JsonLd
        nodes={[
          breadcrumbs(
            { name: 'Specialties', path: '/specialties' },
            { name: SPECIALTY_META[slug].crumb, path: `/specialties/${slug}` },
          ),
        ]}
      />
      {children}
    </>
  );
}
