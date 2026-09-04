import type { Metadata } from 'next';
import { pageMeta } from '@/lib/metadata';
import JsonLd from '@/components/JsonLd';
import { physicianSchema, breadcrumbSchema } from '@/lib/schema';
import DoctorProfile from '@/components/DoctorProfile';
import { DOCTORS } from '@/lib/doctors';

const d = DOCTORS['dr-shimia'];

export const metadata: Metadata = pageMeta({
  title: 'Dr. Shimia Binte Taher — Dental Surgeon',
  description: 'Dental Surgeon at RH Dental Care, Dhaka. Sees patients at both the Banani appointment-only suite and the Banasree flagship hospital.',
  path: '/dr-shimia',
  image: d.image,
  imageAlt: d.imageAlt,
});

export default function Page() {
  return (
    <>
      <JsonLd
        nodes={[
          physicianSchema({
            slug: d.slug,
            name: d.fullName,
            jobTitle: d.role,
            description: d.bio[0] ?? d.role,
            image: d.image,
            // Only confirmed credentials reach the schema. See src/lib/doctors.ts.
            credentials: [...d.qualifications, ...(d.bmdc ? [`BMDC Reg. ${d.bmdc}`] : [])],
            knowsAbout: d.procedures.length ? d.procedures : undefined,
            worksAt: d.worksAt,
          }),
          breadcrumbSchema([
            { name: 'RH Dental Care', path: '/' },
            { name: 'Team', path: '/team' },
            { name: d.name, path: '/dr-shimia' },
          ]),
        ]}
      />
      <DoctorProfile doctor={d} />
    </>
  );
}
