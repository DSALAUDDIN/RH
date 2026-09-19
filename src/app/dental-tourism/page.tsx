import type { Metadata } from 'next';
import DentalTourism from './DentalTourism';
import JsonLd from '@/components/seo/JsonLd';
import { pageMeta } from '@/lib/seo/metadata';
import { breadcrumbs } from '@/lib/seo/schema';

export const metadata: Metadata = pageMeta({
  title: 'Dental Treatment in Dhaka for Overseas Patients',
  description:
    'Planning dental treatment in Dhaka from abroad: sending records ahead, what can be done in one trip, and which branch suits a short visit.',
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
