import type { Metadata } from 'next';
import FAQ from '@/components/FAQ';
import JsonLd from '@/components/seo/JsonLd';
import { pageMeta } from '@/lib/seo/metadata';
import { breadcrumbs, ID, medicalProcedureSchema, medicalWebPageSchema } from '@/lib/seo/schema';
import { orthodonticsFaq } from '@/lib/treatment-faq';

const PATH = '/orthodontics';

export const metadata: Metadata = pageMeta({
  title: 'Braces & Clear Aligners in Dhaka',
  description:
    'Orthodontic treatment at RH Dental Care, Dhaka. Fixed braces and clear aligners, how long each takes, and how the choice between them is made.',
  path: PATH,
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        nodes={[
          medicalProcedureSchema({
            name: 'Orthodontic Treatment',
            kind: 'TherapeuticProcedure',
            description:
              'Correction of crowding, spacing and bite discrepancies using fixed braces or clear aligners, followed by retainers.',
            path: PATH,
            bodyLocation: 'Teeth and jaws',
          }),
          medicalWebPageSchema({
            path: PATH,
            name: metadata.title as string,
            description: metadata.description as string,
            about: ID.procedure(PATH),
          }),
          breadcrumbs({ name: 'Orthodontics', path: PATH }),
        ]}
      />
      {children}
      <FAQ
        items={orthodonticsFaq}
        title="Questions about braces and aligners"
        id="orthodontics-faq"
      />
    </>
  );
}
