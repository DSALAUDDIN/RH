import type { Metadata } from 'next';
import { pageMeta } from '@/lib/metadata';
import FAQ from '@/components/FAQ';
import { orthodonticsFaq } from '@/lib/treatment-faq';
import JsonLd from '@/components/JsonLd';
import { breadcrumbSchema, medicalProcedureSchema } from '@/lib/schema';

export const metadata: Metadata = pageMeta({
  title: 'Braces & Clear Aligners in Dhaka',
  description: 'Orthodontic treatment at RH Dental Care, Dhaka. Fixed braces and clear aligners, how long each takes, and how the choice between them is made.',
  path: '/orthodontics',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd nodes={[medicalProcedureSchema({ name: 'Orthodontic Treatment', description: 'Correction of crowding, spacing and bite discrepancies using fixed braces or clear aligners, followed by retainers.', path: '/orthodontics', bodyLocation: 'Teeth and jaws' }), breadcrumbSchema([{ name: 'RH Dental Care', path: '/' }, { name: 'Orthodontics', path: '/orthodontics' }])]} />
      {children}
      <FAQ items={orthodonticsFaq} title='Questions about braces and aligners' id="orthodontics-faq" />
    </>
  );
}
