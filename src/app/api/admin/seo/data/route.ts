import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyAdminAuth } from '@/lib/admin-auth';
import { getSeoCommandCenterData } from '@/lib/seo-command/sync-orchestrator';

export async function GET(request: NextRequest) {
  const admin = await verifyAdminAuth();
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const rangeParam = searchParams.get('range') || '28';
  const rangeDays = [7, 28, 90].includes(parseInt(rangeParam, 10))
    ? parseInt(rangeParam, 10)
    : 28;

  try {
    const data = await getSeoCommandCenterData(rangeDays);
    return NextResponse.json(data);
  } catch (error) {
    console.error('[SEO Command Center] Error fetching data:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal Server Error' },
      { status: 500 },
    );
  }
}
