import type { Metadata } from 'next';
import { pageMeta } from '@/lib/metadata';
import JsonLd from '@/components/JsonLd';
import { breadcrumbSchema } from '@/lib/schema';

export const metadata: Metadata = pageMeta({
  title: 'Dental Treatments in Dhaka',
  description: 'Implants, orthodontics, root canal, crowns, veneers, oral surgery and paediatric dentistry at RH Dental Care Banani and Banasree, Dhaka.',
  path: '/treatments',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd nodes={[breadcrumbSchema([{ name: 'RH Dental Care', path: '/' }, { name: 'Treatments', path: '/treatments' }])]} />
      {children}
    </>
  );
}
