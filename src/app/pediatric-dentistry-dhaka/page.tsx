import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ServicePageTemplate from '@/components/service-page/ServicePageTemplate';
import JsonLd from '@/components/seo/JsonLd';
import { pageMeta } from '@/lib/seo/metadata';
import { breadcrumbs, faqSchema, medicalWebPageSchema } from '@/lib/seo/schema';
import { SERVICE_PAGES } from '@/data/servicePagesContent';

const SLUG = 'pediatric-dentistry-dhaka';
const data = SERVICE_PAGES[SLUG];

export const metadata: Metadata = pageMeta({
  title: data?.seoTitle || 'Pediatric Dentistry in Dhaka | RH Dental Care',
  description: data?.metaDescription || '',
  path: `/pediatric-dentistry-dhaka`,
  noindex: true, // Staged / draft state awaiting final clinic photography
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
            reviewedBy: 'dr-shimia',
          }),
          breadcrumbs({ name: data.h1, path: data.url }),
          faqSchema(data.faqs),
        ]}
      />
      <ServicePageTemplate data={data} />
    </>
  );
}
