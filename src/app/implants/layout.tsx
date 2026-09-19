import type { Metadata } from 'next';
import JsonLd from '@/components/seo/JsonLd';
import { pageMeta } from '@/lib/seo/metadata';
import { breadcrumbs, ID, medicalProcedureSchema, medicalWebPageSchema } from '@/lib/seo/schema';

const PATH = '/implants';

export const metadata: Metadata = pageMeta({
  title: 'Dental Implants in Dhaka',
  description:
    'Implant treatment at RH Dental Care, Dhaka: planned from a 3D CBCT scan, placed under local anaesthetic, restored with a crown from our in-house lab.',
  path: PATH,
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        nodes={[
          medicalProcedureSchema({
            name: 'Dental Implant Surgery',
            kind: 'SurgicalProcedure',
            description:
              'Replacement of a missing tooth with a titanium implant fixture placed in the jaw, planned from a 3D CBCT scan and restored with a crown once the implant has integrated with bone.',
            path: PATH,
            bodyLocation: 'Jaw',
            howPerformed:
              'Implant placement under local anaesthesia, planned from a 3D CBCT scan and, where indicated, placed through a guided surgical stent.',
          }),
          medicalWebPageSchema({
            path: PATH,
            name: metadata.title as string,
            description: metadata.description as string,
            about: ID.procedure(PATH),
          }),
          breadcrumbs({ name: 'Dental Implants', path: PATH }),
        ]}
      />
      {children}
    </>
  );
}
