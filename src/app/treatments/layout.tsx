import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo/metadata';
import JsonLd from '@/components/seo/JsonLd';
import { breadcrumbs } from '@/lib/seo/schema';

export const metadata: Metadata = pageMeta({
  title: 'Dental Treatments in Dhaka',
  description:
    'Implants, orthodontics, root canal, crowns, veneers, oral surgery and paediatric dentistry at RH Dental Care Banani and Banasree, Dhaka.',
  path: '/treatments',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd nodes={[breadcrumbs({ name: 'Treatments', path: '/treatments' })]} />
      {children}
    </>
  );
}
