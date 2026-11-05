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
import rootCanalFlyer from '@/assets/specialties/root-canal-flyer.jpg';
import microscopeLoupes from '@/assets/specialties/microscope-loupes.png';

const SLUG = 'root-canal-treatment-dhaka';
const data = SERVICE_PAGES[SLUG];

export const metadata: Metadata = pageMeta({
  title: data?.seoTitle || 'Root Canal Treatment in Dhaka | RH Dental Care',
  description: data?.metaDescription || '',
  path: `/root-canal-treatment-dhaka`,
});

export default function Page() {
  if (!data) return notFound();

  return (
    <>
      <JsonLd
        nodes={[
          medicalProcedureSchema({
            name: 'Root Canal Treatment',
            kind: 'TherapeuticProcedure',
            description: data.overview,
            path: data.url,
            bodyLocation: 'Dental pulp and root canals',
            howPerformed:
              'Diagnostic radiograph assessment, local anesthesia, rubber dam isolation, microscopic canal chemo-mechanical debridement, 3D obturation, and restorative core/crown placement.',
            followup:
              'Post-endodontic clinical review, periapical radiograph, and permanent crown protection.',
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
        heroImage={rootCanalFlyer}
        heroImageAlt="Root canal treatment in Dhaka with microscope endodontics at RH Dental Care"
        secondaryImage={microscopeLoupes}
        secondaryImageAlt="High magnification surgical loupes and dental operating microscope instrumentation"
        secondaryImageCaption="Endodontic canal cleaning under magnification with rotary nickel-titanium instrumentation at RH Dental Care."
      />
    </>
  );
}
