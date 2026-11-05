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
import promoSurgery from '@/assets/promotions/promo_surgery.png';
import gumCareNew from '@/assets/specialties/gum-care_new.png';

const SLUG = 'laser-dentistry-dhaka';
const data = SERVICE_PAGES[SLUG];

export const metadata: Metadata = pageMeta({
  title: data?.seoTitle || 'Laser Dentistry in Dhaka | RH Dental Care',
  description: data?.metaDescription || '',
  path: `/laser-dentistry-dhaka`,
});

export default function Page() {
  if (!data) return notFound();

  return (
    <>
      <JsonLd
        nodes={[
          medicalProcedureSchema({
            name: 'Diode Laser Soft Tissue Dentistry',
            kind: 'TherapeuticProcedure',
            description: data.overview,
            path: data.url,
            bodyLocation: 'Oral mucosa, gingiva and periodontal pockets',
            howPerformed:
              'Safety eye protection, calibration of diode laser wavelength, focused soft tissue contouring, frenectomy or periodontal pocket decontamination with minimal bleeding.',
            followup:
              'Gingival healing check, warm salt water rinse guidelines, and routine periodontal maintenance.',
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
        heroImage={promoSurgery}
        heroImageAlt="Diode laser dentistry in Dhaka for soft tissue and periodontal care at RH Dental Care"
        secondaryImage={gumCareNew}
        secondaryImageAlt="Gingival aesthetic recontouring and periodontal pocket laser decontamination"
        secondaryImageCaption="Advanced diode laser dentistry for targeted soft tissue management and comfortable recovery at RH Dental Care."
      />
    </>
  );
}
