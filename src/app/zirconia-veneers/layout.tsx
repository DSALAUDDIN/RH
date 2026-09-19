import type { Metadata } from 'next';
import FAQ from '@/components/FAQ';
import JsonLd from '@/components/seo/JsonLd';
import { pageMeta } from '@/lib/seo/metadata';
import { breadcrumbs, ID, medicalProcedureSchema, medicalWebPageSchema } from '@/lib/seo/schema';
import { veneersFaq } from '@/lib/treatment-faq';

const PATH = '/zirconia-veneers';

// Metadata lives in the layout because the page is a client component.

export const metadata: Metadata = pageMeta({
  title: 'Zirconia & Ceramic Veneers in Dhaka',
  description:
    'Veneers at RH Dental Care, Dhaka: digital smile design, a mock-up you can see before preparation, and what is actually removed.',
  path: PATH,
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        nodes={[
          medicalProcedureSchema({
            name: 'Dental Veneers',
            kind: 'TherapeuticProcedure',
            description:
              'Thin ceramic or zirconia shells bonded to the front surface of teeth to change their shape, shade or alignment, planned with a digital smile design mock-up.',
            path: PATH,
            bodyLocation: 'Front teeth',
          }),
          medicalWebPageSchema({
            path: PATH,
            name: metadata.title as string,
            description: metadata.description as string,
            about: ID.procedure(PATH),
          }),
          breadcrumbs({ name: 'Veneers', path: PATH }),
        ]}
      />
      {children}
      <FAQ items={veneersFaq} title="Questions about veneers" id="zirconia-veneers-faq" />
    </>
  );
}
