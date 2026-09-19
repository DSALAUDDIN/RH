import type { Metadata } from 'next';
import FAQ from '@/components/FAQ';
import JsonLd from '@/components/seo/JsonLd';
import { pageMeta } from '@/lib/seo/metadata';
import { breadcrumbs, ID, medicalProcedureSchema, medicalWebPageSchema } from '@/lib/seo/schema';
import { zirconiaFaq } from '@/lib/treatment-faq';

const PATH = '/zirconia-crown';

// Metadata lives in the layout because the page is a client component.

export const metadata: Metadata = pageMeta({
  title: 'Zirconia Crowns in Dhaka',
  description:
    'Zirconia crowns designed and milled in our Banasree in-house lab. What they cost, how many visits, and how long they last.',
  path: PATH,
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        nodes={[
          medicalProcedureSchema({
            name: 'Zirconia Crown',
            kind: 'TherapeuticProcedure',
            description:
              'A full-coverage crown milled from zirconia to restore a damaged or root-treated tooth, designed digitally and fitted over a prepared tooth.',
            path: PATH,
            bodyLocation: 'Tooth',
          }),
          medicalWebPageSchema({
            path: PATH,
            name: metadata.title as string,
            description: metadata.description as string,
            about: ID.procedure(PATH),
          }),
          breadcrumbs({ name: 'Zirconia Crowns', path: PATH }),
        ]}
      />
      {children}
      <FAQ items={zirconiaFaq} title="Questions about zirconia crowns" id="zirconia-crown-faq" />
    </>
  );
}
