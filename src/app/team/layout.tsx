import type { Metadata } from 'next';
import { pageMeta } from '@/lib/metadata';
import JsonLd from '@/components/JsonLd';
import { breadcrumbSchema } from '@/lib/schema';

export const metadata: Metadata = pageMeta({
  title: 'The Clinical Team',
  description: 'The dentists and specialists at RH Dental Care, Dhaka. The same clinicians see patients at both the Banani suite and the Banasree hospital.',
  path: '/team',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd nodes={[breadcrumbSchema([{ name: 'RH Dental Care', path: '/' }, { name: 'Team', path: '/team' }])]} />
      {children}
    </>
  );
}
