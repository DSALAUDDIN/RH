import type { Metadata } from 'next';
import { pageMeta } from '@/lib/metadata';
import FAQ from '@/components/FAQ';
import { generalFaq } from '@/lib/treatment-faq';

/* This page is a client component, so its metadata lives here.
   The canonical is explicit — see docs/audit-report.md P0-1. */
export const metadata: Metadata = pageMeta({
  title: 'Digital Dentistry: CBCT, Scanning & CAD/CAM',
  description: 'Intraoral scanning, 3D CBCT planning, guided implant surgery and CAD/CAM restorations at RH Dental Care in Dhaka.',
  path: '/digital-dentistry',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <FAQ items={generalFaq} title='Questions patients ask' id="digital-dentistry-faq" />
    </>
  );
}
