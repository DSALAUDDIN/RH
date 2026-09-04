import type { Metadata } from 'next';
import { pageMeta } from '@/lib/metadata';
import DoctorProfile from '@/components/DoctorProfile';
import { DOCTORS } from '@/lib/doctors';

const d = DOCTORS['dr-hasan'];

/* This URL duplicates /dr-hasan, which is the canonical clinician page.
   Rather than delete a live URL (brief rule 4), it canonicalises to /dr-hasan and
   is kept out of the index and the sitemap, so Google consolidates the two
   instead of choosing between them.
   TODO(client): once you confirm nothing links here, replace this route with a
   301 redirect to /dr-hasan in next.config.ts. */
export const metadata: Metadata = {
  ...pageMeta({
    title: d.name,
    description: `${d.name}, ${d.role} at RH Dental Care, Dhaka.`,
    path: '/dr-hasan',
  }),
  robots: { index: false, follow: true },
};

export default function Page() {
  return <DoctorProfile doctor={d} />;
}
