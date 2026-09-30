import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { verifyAdminAuth } from '@/lib/admin-auth';
import { getSeoCommandCenterData } from '@/lib/seo-command/sync-orchestrator';
import SeoCommandCenter from './SeoCommandCenter';

export const metadata: Metadata = {
  title: 'RH Dental SEO Command Center | Private Dashboard',
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default async function AdminSeoPage() {
  const admin = await verifyAdminAuth();
  if (!admin) {
    redirect('/admin');
  }

  const initialData = await getSeoCommandCenterData(28);

  return <SeoCommandCenter initialData={initialData} adminUsername={admin.username} />;
}
