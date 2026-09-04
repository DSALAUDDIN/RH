import type { Metadata } from 'next';
import { pageMeta } from '@/lib/metadata';
import JsonLd from '@/components/JsonLd';
import { breadcrumbSchema } from '@/lib/schema';

export const metadata: Metadata = pageMeta({
  title: 'About RH Dental Care',
  description: 'Two clinics in Dhaka, one clinical team: an appointment-only suite in Banani, a full-service hospital in Banasree. How they differ, and how they do not.',
  path: '/about',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd nodes={[breadcrumbSchema([{ name: 'RH Dental Care', path: '/' }, { name: 'About', path: '/about' }])]} />
      {children}
    </>
  );
}
