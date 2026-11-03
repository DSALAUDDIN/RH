import type { Metadata } from 'next';
import DentalTourism from './DentalTourism';
import JsonLd from '@/components/seo/JsonLd';
import { pageMeta } from '@/lib/seo/metadata';
import { breadcrumbs, faqSchema, medicalWebPageSchema } from '@/lib/seo/schema';
import { dentalTourismFaq } from '@/lib/treatment-faq';

const PATH = '/dental-tourism';

export const metadata: Metadata = pageMeta({
  title: 'Dental Tourism in Bangladesh · RH Dental Care Dhaka',
  description:
    'Quality dental care & travel support in Dhaka. RH Dental Care partners with Alif Global for international patients: airport transfer, hotel & dentistry.',
  path: PATH,
});

export default function Page() {
  return (
    <>
      <JsonLd
        nodes={[
          medicalWebPageSchema({
            name: 'Dental Tourism in Bangladesh | RH Dental Care Dhaka',
            description:
              'Quality dental care & travel support in Dhaka. RH Dental Care partners with Alif Global for international patients: airport transfer, hotel & dentistry.',
            path: PATH,
            reviewedBy: 'dr-hasan',
          }),
          breadcrumbs({ name: 'Dental Tourism', path: PATH }),
          faqSchema(dentalTourismFaq),
        ]}
      />
      <DentalTourism />
    </>
  );
}
