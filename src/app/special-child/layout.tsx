import type { Metadata } from 'next';
import FAQ from '@/components/FAQ';
import JsonLd from '@/components/seo/JsonLd';
import { pageMeta } from '@/lib/seo/metadata';
import { breadcrumbs, medicalWebPageSchema } from '@/lib/seo/schema';
import { generalFaq } from '@/lib/treatment-faq';

const PATH = '/special-child';

// Metadata lives in the layout because the page is a client component.

export const metadata: Metadata = pageMeta({
  title: 'Dentistry for Children with Special Needs',
  description:
    "Dental care for children with special needs at RH Dental Care Banasree, with unhurried appointments and a team used to working at the child's pace.",
  path: PATH,
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        nodes={[
          medicalWebPageSchema({
            path: PATH,
            name: metadata.title as string,
            description: metadata.description as string,
          }),
          breadcrumbs({ name: 'Special Needs Dentistry', path: PATH }),
        ]}
      />
      {children}
      <FAQ
        items={generalFaq}
        title="Questions patients ask"
        id="special-child-faq"
        emitSchema={false}
      />
    </>
  );
}
