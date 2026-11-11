import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ServicePageTemplate from '@/components/service-page/ServicePageTemplate';
import JsonLd from '@/components/seo/JsonLd';
import { pageMeta } from '@/lib/seo/metadata';
import { breadcrumbs, faqSchema, ID, medicalWebPageSchema } from '@/lib/seo/schema';
import { SERVICE_PAGES } from '@/data/servicePagesContent';
import implantOsstemKit from '@/assets/specialties/instruments/implant-osstem-kit.jpg';
import alignerTrayClinic from '@/assets/specialties/instruments/aligner-tray-clinic.jpg';

const SLUG = 'best-dental-clinic-in-dhaka';
const data = SERVICE_PAGES[SLUG];

export const metadata: Metadata = pageMeta({
  title: data?.seoTitle || 'Best Dental Clinic in Dhaka | RH Dental Care',
  description: data?.metaDescription || '',
  path: `/best-dental-clinic-in-dhaka`,
});

export default function Page() {
  if (!data) return notFound();

  return (
    <>
      <JsonLd
        nodes={[
          medicalWebPageSchema({
            name: data.seoTitle,
            description: data.metaDescription,
            path: data.url,
            about: ID.organization,
            reviewedBy: 'dr-hasan',
            lastReviewed: '2026-11-11',
          }),
          breadcrumbs({ name: 'Home', path: '/' }, { name: data.h1, path: data.url }),
          faqSchema(data.faqs),
        ]}
      />
      <ServicePageTemplate
        data={data}
        heroImage={implantOsstemKit}
        heroImageAlt="Surgical precision instruments at RH Dental Care, recognized as the best dental clinic in Dhaka"
        secondaryImage={alignerTrayClinic}
        secondaryImageAlt="Clear aligners and digital orthodontic trays at RH Dental Care Dhaka"
      />
    </>
  );
}
