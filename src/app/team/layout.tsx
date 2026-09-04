import type { Metadata } from 'next';
import { pageMeta } from '@/lib/metadata';
import JsonLd from '@/components/JsonLd';
import { breadcrumbSchema } from '@/lib/schema';

export const metadata: Metadata = pageMeta({
  title: 'The Clinical Team',
  description: 'The clinicians at RH Dental Care, Dhaka \u2014 who works at Banani, who works at Banasree, on which days, with BMDC registration numbers.',
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
