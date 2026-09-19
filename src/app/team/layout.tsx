import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo/metadata';
import JsonLd from '@/components/seo/JsonLd';
import { breadcrumbs } from '@/lib/seo/schema';

export const metadata: Metadata = pageMeta({
  title: 'The Clinical Team',
  description:
    'The clinicians at RH Dental Care, Dhaka \u2014 who works at Banani, who works at Banasree, on which days, with BMDC registration numbers.',
  path: '/team',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd nodes={[breadcrumbs({ name: 'Team', path: '/team' })]} />
      {children}
    </>
  );
}
