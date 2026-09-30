import { NextResponse } from 'next/server';
import { verifyAdminAuth } from '@/lib/admin-auth';
import { disconnectGoogleIntegration } from '@/lib/seo-command/google-oauth';

export async function POST() {
  const admin = await verifyAdminAuth();
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await disconnectGoogleIntegration();
    return NextResponse.json({ success: true, message: 'Google integration disconnected successfully.' });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to disconnect integration.' },
      { status: 500 },
    );
  }
}
