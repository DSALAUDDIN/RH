import type { Metadata } from 'next';
import FAQ from '@/components/FAQ';
import JsonLd from '@/components/seo/JsonLd';
import { pageMeta } from '@/lib/seo/metadata';
import { breadcrumbs, medicalWebPageSchema } from '@/lib/seo/schema';
import { generalFaq } from '@/lib/treatment-faq';

const PATH = '/digital-dentistry';

// Metadata lives in the layout because the page is a client component.

export const metadata: Metadata = pageMeta({
  title: 'Digital Dentistry: CBCT, Scanning & CAD/CAM',
  description:
    'Intraoral scanning, 3D CBCT planning, guided implant surgery and CAD/CAM restorations at RH Dental Care in Dhaka.',
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
          breadcrumbs({ name: 'Digital Dentistry', path: PATH }),
        ]}
      />
      {children}
      <FAQ
        items={generalFaq}
        title="Questions patients ask"
        id="digital-dentistry-faq"
        emitSchema={false}
      />
    </>
  );
}
