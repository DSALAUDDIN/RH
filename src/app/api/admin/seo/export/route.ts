import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyAdminAuth } from '@/lib/admin-auth';
import { getSeoCommandCenterData } from '@/lib/seo-command/sync-orchestrator';
import {
  exportQueriesToCsv,
  exportPagesToCsv,
  exportAuthorityContentToCsv,
  exportLocalPerformanceToCsv,
} from '@/lib/seo-command/export-helper';

export async function GET(request: NextRequest) {
  const admin = await verifyAdminAuth();
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type') || 'queries';
  const rangeParam = searchParams.get('range') || '28';
  const rangeDays = [7, 28, 90].includes(parseInt(rangeParam, 10))
    ? parseInt(rangeParam, 10)
    : 28;

  try {
    const data = await getSeoCommandCenterData(rangeDays);
    const dateStr = new Date().toISOString().split('T')[0];
    let csvContent = '';
    const filename = `rh-dental-seo-${type}-${dateStr}.csv`;

    if (type === 'queries') {
      csvContent = exportQueriesToCsv(data.keywords);
    } else if (type === 'pages') {
      csvContent = exportPagesToCsv(data.pages);
    } else if (type === 'content') {
      csvContent = exportAuthorityContentToCsv(data.authorityContent);
    } else if (type === 'local') {
      csvContent = exportLocalPerformanceToCsv(data.local.banani, data.local.banasree);
    } else {
      return NextResponse.json({ error: 'Invalid export type' }, { status: 400 });
    }

    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    });
  } catch (error) {
    console.error('[SEO Export] Error generating CSV:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Export failed' },
      { status: 500 },
    );
  }
}
