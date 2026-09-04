import type { Metadata } from 'next';
import { pageMeta } from '@/lib/metadata';
import JsonLd from '@/components/JsonLd';
import { breadcrumbSchema } from '@/lib/schema';

export const metadata: Metadata = pageMeta({
  title: 'Contact RH Dental Care',
  description: 'Two clinics in Dhaka, two numbers. Choose Banani for the appointment-only suite or Banasree for the full-service hospital, and reach the right reception.',
  path: '/contact',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd nodes={[breadcrumbSchema([{ name: 'RH Dental Care', path: '/' }, { name: 'Contact', path: '/contact' }])]} />
      {children}
    </>
  );
}
