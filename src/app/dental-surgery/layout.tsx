import type { Metadata } from 'next';
import { pageMeta } from '@/lib/metadata';
import FAQ from '@/components/FAQ';
import { generalFaq } from '@/lib/treatment-faq';

/* This page is a client component, so its metadata lives here.
   The canonical is explicit — see docs/audit-report.md P0-1. */
export const metadata: Metadata = pageMeta({
  title: 'Oral & Dental Surgery in Dhaka',
  description: 'Wisdom teeth, impactions and minor oral surgery at RH Dental Care, Banani and Banasree. Planned from a 3D CBCT scan, not a flat X-ray.',
  path: '/dental-surgery',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <FAQ items={generalFaq} title='Questions patients ask' id="dental-surgery-faq" />
    </>
  );
}
