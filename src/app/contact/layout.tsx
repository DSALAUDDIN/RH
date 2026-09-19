import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo/metadata';
import JsonLd from '@/components/seo/JsonLd';
import { breadcrumbs } from '@/lib/seo/schema';

export const metadata: Metadata = pageMeta({
  title: 'Contact RH Dental Care',
  description:
    'Two clinics in Dhaka, two numbers. Choose Banani for the appointment-only suite or Banasree for the full-service hospital, and reach the right reception.',
  path: '/contact',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd nodes={[breadcrumbs({ name: 'Contact', path: '/contact' })]} />
      {children}
    </>
  );
}
