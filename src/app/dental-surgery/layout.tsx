import type { Metadata } from 'next';
import FAQ from '@/components/FAQ';
import JsonLd from '@/components/seo/JsonLd';
import { pageMeta } from '@/lib/seo/metadata';
import { breadcrumbs, ID, medicalProcedureSchema, medicalWebPageSchema } from '@/lib/seo/schema';
import { generalFaq } from '@/lib/treatment-faq';

const PATH = '/dental-surgery';

// Metadata lives in the layout because the page is a client component.

export const metadata: Metadata = pageMeta({
  title: 'Oral & Dental Surgery in Dhaka',
  description:
    'Wisdom teeth, impactions and minor oral surgery at RH Dental Care, Banani and Banasree. Planned from a 3D CBCT scan, not a flat X-ray.',
  path: PATH,
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        nodes={[
          medicalProcedureSchema({
            name: 'Oral Surgery',
            kind: 'SurgicalProcedure',
            description:
              'Surgical removal of impacted or wisdom teeth and minor oral surgical procedures, planned from a 3D CBCT scan.',
            path: PATH,
            bodyLocation: 'Jaw and oral cavity',
          }),
          medicalWebPageSchema({
            path: PATH,
            name: metadata.title as string,
            description: metadata.description as string,
            about: ID.procedure(PATH),
          }),
          breadcrumbs({ name: 'Oral Surgery', path: PATH }),
        ]}
      />
      {children}
      <FAQ
        items={generalFaq}
        title="Questions patients ask"
        id="dental-surgery-faq"
        emitSchema={false}
      />
    </>
  );
}
