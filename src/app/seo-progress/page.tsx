import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'RH Dental SEO Command Center',
  robots: {
    index: false,
    follow: false,
  },
};

export default function SeoProgressPage() {
  redirect('/admin/seo');
}
