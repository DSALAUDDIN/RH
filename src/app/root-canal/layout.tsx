import type { Metadata } from 'next';
import { pageMeta } from '@/lib/metadata';
import FAQ from '@/components/FAQ';
import { rootCanalFaq } from '@/lib/treatment-faq';
import JsonLd from '@/components/JsonLd';
import { breadcrumbSchema, medicalProcedureSchema } from '@/lib/schema';

export const metadata: Metadata = pageMeta({
  title: 'Root Canal Treatment in Dhaka',
  description: 'Microscope-assisted root canal treatment at RH Dental Care, Dhaka. How many visits it takes and whether the tooth needs a crown afterwards.',
  path: '/root-canal',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd nodes={[medicalProcedureSchema({ name: 'Root Canal Treatment', description: 'Removal of infected or inflamed pulp from the root canal system, disinfection and sealing of the canals, usually followed by a crown on posterior teeth.', path: '/root-canal', bodyLocation: 'Tooth', howPerformed: 'Access, cleaning and shaping of the canal system under an operating microscope, then obturation and coronal seal.' }), breadcrumbSchema([{ name: 'RH Dental Care', path: '/' }, { name: 'Root Canal', path: '/root-canal' }])]} />
      {children}
      <FAQ items={rootCanalFaq} title='Questions about root canal treatment' id="root-canal-faq" />
    </>
  );
}
