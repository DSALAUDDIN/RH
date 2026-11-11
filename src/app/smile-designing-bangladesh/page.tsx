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
import aiVeneers from '@/assets/promotions/ai_veneers.png';
import crownShadeMatchingPatient from '@/assets/specialties/instruments/crown-shade-matching-patient.jpg';

const SLUG = 'smile-designing-bangladesh';
const data = SERVICE_PAGES[SLUG];

export const metadata: Metadata = pageMeta({
  title: data?.seoTitle || 'Smile Designing in Bangladesh | RH Dental Care',
  description: data?.metaDescription || '',
  path: `/smile-designing-bangladesh`,
});

export default function Page() {
  if (!data) return notFound();

  return (
    <>
      <JsonLd
        nodes={[
          medicalProcedureSchema({
            name: 'Aesthetic Smile Designing and Veneers',
            kind: 'TherapeuticProcedure',
            description: data.overview,
            path: data.url,
            bodyLocation: 'Anterior teeth and smile zone',
            howPerformed:
              'Facial aesthetic assessment, 3D digital smile simulation, diagnostic mock-up, minimally invasive preparation, and custom in-house CAD/CAM veneer or crown bonding.',
            followup:
              'Post-bonding bite verification, polishing check, and routine aesthetic maintenance.',
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
        heroImage={aiVeneers}
        heroImageAlt="Smile Designing in Bangladesh with custom digital veneers and aesthetic smile harmony at RH Dental Care"
        secondaryImage={crownShadeMatchingPatient}
        secondaryImageAlt="Chairside tooth shade matching for custom veneers and aesthetic restorations"
        secondaryImageCaption="Direct clinical shade matching and high-translucency ceramic finishing at RH Dental Care Banani and Banasree branches."
      />
    </>
  );
}
