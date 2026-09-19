import type { Metadata } from 'next';
import JsonLd from '@/components/seo/JsonLd';
import { pageMeta } from '@/lib/seo/metadata';
import { breadcrumbs, ID, medicalProcedureSchema, medicalWebPageSchema } from '@/lib/seo/schema';

const PATH = '/root-canal';

export const metadata: Metadata = pageMeta({
  title: 'Root Canal Treatment in Dhaka',
  description:
    'Microscope-assisted root canal treatment at RH Dental Care, Dhaka. How many visits it takes and whether the tooth needs a crown afterwards.',
  path: PATH,
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        nodes={[
          medicalProcedureSchema({
            name: 'Root Canal Treatment',
            kind: 'TherapeuticProcedure',
            description:
              'Removal of infected or inflamed pulp from the root canal system, disinfection and sealing of the canals, usually followed by a crown on posterior teeth.',
            path: PATH,
            bodyLocation: 'Tooth',
            howPerformed:
              'Access, cleaning and shaping of the canal system under an operating microscope, then obturation and coronal seal.',
          }),
          medicalWebPageSchema({
            path: PATH,
            name: metadata.title as string,
            description: metadata.description as string,
            about: ID.procedure(PATH),
          }),
          breadcrumbs({ name: 'Root Canal Treatment', path: PATH }),
        ]}
      />
      {children}
    </>
  );
}
