import type { Metadata } from 'next';
import DentalTourism from './DentalTourism';
import JsonLd from '@/components/seo/JsonLd';
import { pageMeta } from '@/lib/seo/metadata';
import { breadcrumbs } from '@/lib/seo/schema';

export const metadata: Metadata = pageMeta({
  title: 'Dental Tourism in Bangladesh | RH Dental Care × Alif Global Tours & Travels',
  description:
    'Quality Dental Care & Complete Travel Support in Dhaka. RH Dental Care partners with Alif Global Tours & Travels for international patients: visa, airport transfers, hotels & expert dentistry.',
  path: '/dental-tourism',
});

export default function Page() {
  return (
    <>
      <JsonLd nodes={[breadcrumbs({ name: 'Dental Tourism', path: '/dental-tourism' })]} />
      <DentalTourism />
    </>
  );
}
