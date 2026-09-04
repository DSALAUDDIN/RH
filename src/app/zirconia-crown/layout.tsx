import type { Metadata } from 'next';
import { pageMeta } from '@/lib/metadata';
import FAQ from '@/components/FAQ';
import { zirconiaFaq } from '@/lib/treatment-faq';

/* This page is a client component, so its metadata lives here.
   The canonical is explicit — see docs/audit-report.md P0-1. */
export const metadata: Metadata = pageMeta({
  title: 'Zirconia Crowns in Dhaka',
  description: 'Zirconia crowns designed and milled in our Banasree in-house lab. What they cost, how many visits, and how long they last.',
  path: '/zirconia-crown',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <FAQ items={zirconiaFaq} title='Questions about zirconia crowns' id="zirconia-crown-faq" />
    </>
  );
}
