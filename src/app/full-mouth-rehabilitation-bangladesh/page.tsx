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
import zirconiaDigitalWorkflow from '@/assets/specialties/zirconia_digital_workflow.png';
import digitalGuidedSurgery from '@/assets/digital/digital_guided_surgery.jpg';

const SLUG = 'full-mouth-rehabilitation-bangladesh';
const data = SERVICE_PAGES[SLUG];

export const metadata: Metadata = pageMeta({
  title: data?.seoTitle || 'Full Mouth Rehabilitation in Bangladesh | RH Dental Care',
  description: data?.metaDescription || '',
  path: `/full-mouth-rehabilitation-bangladesh`,
});

export default function Page() {
  if (!data) return notFound();

  return (
    <>
      <JsonLd
        nodes={[
          medicalProcedureSchema({
            name: 'Full Mouth Rehabilitation and Reconstruction',
            kind: 'TherapeuticProcedure',
            description: data.overview,
            path: data.url,
            bodyLocation: 'Full dentition, occlusal plane and jaw joints',
            howPerformed:
              'Comprehensive occlusal diagnosis, digital jaw relationship recording, diagnostic wax-up, coordinated periodontal, surgical, and implant procedures, and precision in-house CAD/CAM zirconia crown and bridge placement.',
            followup:
              'Occlusal equilibrium checks, night guard fitting, and structured biannual reviews.',
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
        heroImage={zirconiaDigitalWorkflow}
        heroImageAlt="Full Mouth Rehabilitation in Bangladesh with in-house CAD/CAM zirconia laboratory at RH Dental Care"
        secondaryImage={digitalGuidedSurgery}
        secondaryImageAlt="Digital guided surgery, 3D jaw analysis and comprehensive oral rehabilitation"
        secondaryImageCaption="Comprehensive full-mouth reconstruction combining dental implants and in-house CAD/CAM zirconia restorations at RH Dental Care."
      />
    </>
  );
}
