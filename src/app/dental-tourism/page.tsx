import type { Metadata } from 'next';
import DentalTourism from './DentalTourism';
import { pageMeta } from '@/lib/metadata';

export const metadata: Metadata = pageMeta({
  title: 'Dental Treatment in Dhaka for Overseas Patients',
  description: 'Planning dental treatment in Dhaka from abroad: sending records ahead, what can be done in one trip, and which branch suits a short visit.',
  path: '/dental-tourism',
});


export default function Page() {
  return <DentalTourism />;
}
