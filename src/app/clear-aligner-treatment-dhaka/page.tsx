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
import promoClearAligners from '@/assets/promotions/promo_clear_aligners.png';
import invisalignFlyer from '@/assets/ortho/invisalign_flyer.png';

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
        heroImage={promoClearAligners}
        heroImageAlt="Clear aligner treatment and 3D intraoral digital planning at RH Dental Care Dhaka"
        secondaryImage={invisalignFlyer}
        secondaryImageAlt="Clear aligner treatment sequential stages and orthodontic consultation overview"
        secondaryImageCaption="Sequential aligner wear, digital monitoring, and retention planning at RH Dental Care Banani and Banasree branches."
      />
    </>
  );
}
