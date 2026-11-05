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
import implantFacility from '@/assets/implants/implant_facility.png';
import digitalImplantPlanning from '@/assets/digital/digital_implant_planning.png';

const SLUG = 'dental-implant-banani';
const data = SERVICE_PAGES[SLUG];

export const metadata: Metadata = pageMeta({
  title: data?.seoTitle || 'Dental Implant in Banani | RH Dental Care',
  description: data?.metaDescription || '',
  path: `/dental-implant-banani`,
});

export default function Page() {
  if (!data) return notFound();

  return (
    <>
      <JsonLd
        nodes={[
          medicalProcedureSchema({
            name: 'Dental Implant in Banani',
            kind: 'SurgicalProcedure',
            description: data.overview,
            path: data.url,
            bodyLocation: 'Maxilla and mandible',
            howPerformed:
              'Private consultation in Banani Suite, 3D imaging assessment, coordinated surgical placement, and in-house CAD/CAM zirconia restoration.',
            followup:
              'Postoperative review in Banani, suture removal, and long-term restorative reviews.',
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
        heroImage={implantFacility}
        heroImageAlt="Banani private dental implant consultation and clinical suite at RH Dental Care"
        secondaryImage={digitalImplantPlanning}
        secondaryImageAlt="Digital 3D implant planning and surgical guide coordination"
        secondaryImageCaption="Private dental suite consultation in Banani Road 11 with synchronized digital laboratory workflows."
      />
    </>
  );
}
