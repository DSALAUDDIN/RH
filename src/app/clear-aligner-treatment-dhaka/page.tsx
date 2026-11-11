import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ServicePageTemplate from '@/components/service-page/ServicePageTemplate';
import JsonLd from '@/components/seo/JsonLd';
import { pageMeta } from '@/lib/seo/metadata';
import {
  breadcrumbs,
  faqSchema,
  ID,
  medicalProcedureSchema,
  medicalWebPageSchema,
} from '@/lib/seo/schema';
import { SERVICE_PAGES } from '@/data/servicePagesContent';
import alignerTrayClinic from '@/assets/specialties/instruments/aligner-tray-clinic.jpg';
import alignerTrayMirror from '@/assets/specialties/instruments/aligner-tray-mirror.jpg';

const SLUG = 'clear-aligner-treatment-dhaka';
const data = SERVICE_PAGES[SLUG];

export const metadata: Metadata = pageMeta({
  title: data?.seoTitle || 'Clear Aligner Treatment in Dhaka | RH Dental Care',
  description: data?.metaDescription || '',
  path: `/clear-aligner-treatment-dhaka`,
});

export default function Page() {
  if (!data) return notFound();

  return (
    <>
      <JsonLd
        nodes={[
          medicalProcedureSchema({
            name: 'Clear Aligner Treatment',
            kind: 'TherapeuticProcedure',
            description: data.overview,
            path: data.url,
            bodyLocation: 'Teeth and dental arches',
            howPerformed:
              'Digital intraoral 3D scanning, customized biomechanical clear aligner series fabrication, sequential wearing 20-22 hours daily, and clinical monitoring with retention.',
            followup:
              'Routine orthodontic tracking visits, refinement trays where indicated, and custom retention protocol.',
          }),
          medicalWebPageSchema({
            name: data.seoTitle,
            description: data.metaDescription,
            path: data.url,
            about: ID.procedure(data.url),
            reviewedBy: 'dr-hasan',
            lastReviewed: '2026-11-05',
          }),
          breadcrumbs(
            { name: 'Treatments', path: '/treatments' },
            { name: data.h1, path: data.url },
          ),
          faqSchema(data.faqs),
        ]}
      />
      <ServicePageTemplate
        data={data}
        heroImage={alignerTrayClinic}
        heroImageAlt="Clear aligner custom 3D dental stone model and sequential movement tray at RH Dental Care Dhaka"
        secondaryImage={alignerTrayMirror}
        secondaryImageAlt="Clear aligner transparent orthodontic tray clinical presentation"
        secondaryImageCaption="Custom clear aligner digital scanning, 3D model fabrication, and discreet orthodontic realignment at RH Dental Care Banani and Banasree branches."
      />
    </>
  );
}
