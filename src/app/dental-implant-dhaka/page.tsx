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
import aiImplants from '@/assets/promotions/ai_implants.png';
import implantTypes from '@/assets/implants/implant_types.png';

const SLUG = 'dental-implant-dhaka';
const data = SERVICE_PAGES[SLUG];

export const metadata: Metadata = pageMeta({
  title: data?.seoTitle || 'Dental Implant in Dhaka | RH Dental Care',
  description: data?.metaDescription || '',
  path: `/dental-implant-dhaka`,
});

export default function Page() {
  if (!data) return notFound();

  return (
    <>
      <JsonLd
        nodes={[
          medicalProcedureSchema({
            name: 'Dental Implant Surgery and Restoration',
            kind: 'SurgicalProcedure',
            description: data.overview,
            path: data.url,
            bodyLocation: 'Maxilla and mandible',
            howPerformed:
              'CBCT 3D planning, surgical fixture placement under local anesthesia, osseointegration period, abutment placement, and in-house CAD/CAM zirconia crown restoration.',
            followup:
              'Postoperative review, osseointegration assessment, and routine annual maintenance.',
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
        heroImage={aiImplants}
        heroImageAlt="Dental implant consultation, surgical placement and CAD/CAM restoration in Dhaka at RH Dental Care"
        secondaryImage={implantTypes}
        secondaryImageAlt="Dental implant fixture and restorative components overview"
        secondaryImageCaption="Biocompatible international implant fixtures and custom CAD/CAM zirconia crown restorations at RH Dental Care."
      />
    </>
  );
}
