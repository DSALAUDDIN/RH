import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo/metadata';
import JsonLd from '@/components/seo/JsonLd';
import { breadcrumbs } from '@/lib/seo/schema';

export const metadata: Metadata = pageMeta({
  title: 'About RH Dental Care',
  description:
    'Two clinics in Dhaka, one clinical team: an appointment-only suite in Banani, a full-service hospital in Banasree. How they differ, and how they do not.',
  path: '/about',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd nodes={[breadcrumbs({ name: 'About', path: '/about' })]} />
      {children}
    </>
  );
}
