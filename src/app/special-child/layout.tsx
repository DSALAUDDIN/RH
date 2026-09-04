import type { Metadata } from 'next';
import { pageMeta } from '@/lib/metadata';
import FAQ from '@/components/FAQ';
import { generalFaq } from '@/lib/treatment-faq';

/* This page is a client component, so its metadata lives here.
   The canonical is explicit — see docs/audit-report.md P0-1. */
export const metadata: Metadata = pageMeta({
  title: 'Dentistry for Children with Special Needs',
  description: "Dental care for children with special needs at RH Dental Care Banasree — unhurried appointments and a team used to working at the child's pace.",
  path: '/special-child',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <FAQ items={generalFaq} title='Questions patients ask' id="special-child-faq" />
    </>
  );
}
