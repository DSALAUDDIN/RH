import type { Metadata } from 'next';
import { pageMeta } from '@/lib/metadata';
import FAQ from '@/components/FAQ';
import { implantFaq } from '@/lib/treatment-faq';
import JsonLd from '@/components/JsonLd';
import { breadcrumbSchema, medicalProcedureSchema } from '@/lib/schema';

export const metadata: Metadata = pageMeta({
  title: 'Dental Implants in Dhaka',
  description: 'Implant treatment at RH Dental Care, Dhaka: planned from a 3D CBCT scan, placed under local anaesthetic, restored with a crown from our in-house lab.',
  path: '/implants',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd nodes={[medicalProcedureSchema({ name: 'Dental Implant Surgery', description: 'Replacement of a missing tooth with a titanium implant fixture placed in the jaw, planned from a 3D CBCT scan and restored with a crown once the implant has integrated with bone.', path: '/implants', bodyLocation: 'Jaw', howPerformed: 'Implant placement under local anaesthesia, planned from a 3D CBCT scan and, where indicated, placed through a guided surgical stent.' }), breadcrumbSchema([{ name: 'RH Dental Care', path: '/' }, { name: 'Dental Implants', path: '/implants' }])]} />
      {children}
      <FAQ items={implantFaq} title='Questions about dental implants' id="implants-faq" />
    </>
  );
}
