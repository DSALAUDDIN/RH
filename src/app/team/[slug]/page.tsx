import { notFound } from 'next/navigation';
import { ROSTER, clinicianSlug, clinicianPath } from '@/lib/doctors';
import { pageMeta } from '@/lib/seo/metadata';
import { physicianSchema, breadcrumbSchema } from '@/lib/seo/schema';
import JsonLd from '@/components/seo/JsonLd';
import DoctorProfile from '@/components/DoctorProfile';

type Props = { params: Promise<{ slug: string }> };

function findDoctor(slug: string) {
  const doctor = ROSTER.find((d) => clinicianSlug(d) === slug);
  if (!doctor) notFound();
  return doctor;
}

export function generateStaticParams() {
  return ROSTER.map((d) => ({ slug: clinicianSlug(d) }));
}

export async function generateMetadata({ params }: Props) {
  const d = findDoctor((await params).slug);
  return pageMeta({
    title: d.name,
    description: `${d.name}, ${d.role ?? 'Dental Surgeon'} at RH Dental Care, Dhaka. View qualifications, clinic details and request an appointment.`,
    path: clinicianPath(d),
    image: d.image ?? undefined,
    imageAlt: d.imageAlt ?? d.name,
  });
}

export default async function Page({ params }: Props) {
  const d = findDoctor((await params).slug);
  const path = clinicianPath(d);
  return (
    <>
      <JsonLd nodes={[
        physicianSchema({
          slug: path.slice(1),
          name: d.fullName,
          jobTitle: d.role ?? 'Dental Surgeon',
          description: d.bio[0] ?? `${d.name} at RH Dental Care, Dhaka.`,
          image: d.image ?? undefined,
          credentials: [...d.qualifications, ...(d.bmdc ? [`BMDC Reg. ${d.bmdc}`] : [])],
          knowsAbout: d.procedures.length ? d.procedures : undefined,
          worksAt: d.postings.map((p) => p.branch),
        }),
        breadcrumbSchema([
          { name: 'RH Dental Care', path: '/' },
          { name: 'Team', path: '/team' },
          { name: d.name, path },
        ]),
      ]} />
      <DoctorProfile doctor={d} />
    </>
  );
}
