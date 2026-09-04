import type { Metadata } from 'next';
import { pageMeta } from '@/lib/metadata';
import FAQ from '@/components/FAQ';
import { veneersFaq } from '@/lib/treatment-faq';

/* This page is a client component, so its metadata lives here.
   The canonical is explicit — see docs/audit-report.md P0-1. */
export const metadata: Metadata = pageMeta({
  title: 'Zirconia & Ceramic Veneers in Dhaka',
  description: 'Veneers at RH Dental Care, Dhaka: digital smile design, a mock-up you can see before preparation, and what is actually removed.',
  path: '/zirconia-veneers',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <FAQ items={veneersFaq} title='Questions about veneers' id="zirconia-veneers-faq" />
    </>
  );
}
