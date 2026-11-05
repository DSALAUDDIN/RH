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
import kidsClean from '@/assets/specialties/kids_clean.png';
import specialChildFlyer from '@/assets/specialties/special-child-flyer.jpg';

const SLUG = 'pediatric-dentistry-dhaka';
const data = SERVICE_PAGES[SLUG];

export const metadata: Metadata = pageMeta({
  title: data?.seoTitle || 'Pediatric Dentistry in Dhaka | RH Dental Care',
  description: data?.metaDescription || '',
  path: `/pediatric-dentistry-dhaka`,
});

export default function Page() {
  if (!data) return notFound();

  return (
    <>
      <JsonLd
        nodes={[
          medicalProcedureSchema({
            name: 'Pediatric Dental Care and Pulp Therapy',
            kind: 'TherapeuticProcedure',
            description: data.overview,
            path: data.url,
            bodyLocation: 'Primary and mixed dentition',
            howPerformed:
              'Child-friendly behavioral guidance, caries assessment, fluoride/sealant application, tooth-colored restorations, pulpotomy, and space maintainers.',
            followup: 'Six-month pediatric checkups, oral hygiene coaching, and diet guidance.',
          }),
          medicalWebPageSchema({
            name: data.seoTitle,
            description: data.metaDescription,
            path: data.url,
            about: ID.procedure(data.url),
            reviewedBy: 'dr-shimia',
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
        heroImage={kidsClean}
        heroImageAlt="Pediatric Dentistry in Dhaka with gentle care for kids at RH Dental Care"
        secondaryImage={specialChildFlyer}
        secondaryImageAlt="Specialized child dental care protocols and supportive environment"
        secondaryImageCaption="Compassionate and friendly pediatric dentistry designed to create positive dental experiences at RH Dental Care."
      />
    </>
  );
}
