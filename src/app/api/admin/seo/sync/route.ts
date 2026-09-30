import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyAdminAuth } from '@/lib/admin-auth';
import { prisma } from '@/lib/prisma';
import { getSeoCommandCenterData } from '@/lib/seo-command/sync-orchestrator';

export async function POST(request: NextRequest) {
  // Allow authorized admin OR scheduler cron token
  const authHeader = request.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;
  const isCronAuthorized = cronSecret && authHeader === `Bearer ${cronSecret}`;

  if (!isCronAuthorized) {
    const admin = await verifyAdminAuth();
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  }

  try {
    const data = await getSeoCommandCenterData(28);
    const today = new Date().toISOString().split('T')[0];

    // Persist daily snapshot
    await prisma.seoDailySnapshot.upsert({
      where: { date: today },
      update: {
        healthScore: data.healthScore.totalScore,
        scoreConfidence: data.healthScore.dataCoveragePercentage,
        techScore: data.healthScore.subScores.technicalHealth.score,
        contentScore: data.healthScore.subScores.contentArchitecture.score,
        visibilityScore: data.healthScore.subScores.searchVisibility.score,
        uxScore: data.healthScore.subScores.userExperience.score,
        localScore: data.healthScore.subScores.localPresence.score,
        gscImpressions: data.visibility.impressions.current,
        gscClicks: data.visibility.clicks.current,
        gscCtr: data.visibility.ctr.current,
        gscAvgPosition: data.visibility.avgPosition.current,
        conversionsPhone: data.conversions.phoneClicks,
        conversionsWhatsapp: data.conversions.whatsappClicks,
        conversionsBooking: data.conversions.appointmentSubmissions,
        conversionsTotal: data.conversions.totalConversions,
        gbpBananiActions: data.local.banani.totalActions,
        gbpBanasreeActions: data.local.banasree.totalActions,
        authorityLivePages: data.audit.enLiveCount + data.audit.bnLiveCount,
        authorityTotalPages: 80,
        auditErrors: data.audit.criticalErrors,
        auditWarnings: data.audit.warnings,
      },
      create: {
        date: today,
        healthScore: data.healthScore.totalScore,
        scoreConfidence: data.healthScore.dataCoveragePercentage,
        techScore: data.healthScore.subScores.technicalHealth.score,
        contentScore: data.healthScore.subScores.contentArchitecture.score,
        visibilityScore: data.healthScore.subScores.searchVisibility.score,
        uxScore: data.healthScore.subScores.userExperience.score,
        localScore: data.healthScore.subScores.localPresence.score,
        gscImpressions: data.visibility.impressions.current,
        gscClicks: data.visibility.clicks.current,
        gscCtr: data.visibility.ctr.current,
        gscAvgPosition: data.visibility.avgPosition.current,
        conversionsPhone: data.conversions.phoneClicks,
        conversionsWhatsapp: data.conversions.whatsappClicks,
        conversionsBooking: data.conversions.appointmentSubmissions,
        conversionsTotal: data.conversions.totalConversions,
        gbpBananiActions: data.local.banani.totalActions,
        gbpBanasreeActions: data.local.banasree.totalActions,
        authorityLivePages: data.audit.enLiveCount + data.audit.bnLiveCount,
        authorityTotalPages: 80,
        auditErrors: data.audit.criticalErrors,
        auditWarnings: data.audit.warnings,
      },
    });

    // Update integration last sync timestamp
    await prisma.googleIntegration.upsert({
      where: { id: 'primary' },
      update: {
        lastSyncAt: new Date(),
        lastSyncStatus: 'success',
        lastError: null,
      },
      create: {
        id: 'primary',
        connected: false,
        lastSyncAt: new Date(),
        lastSyncStatus: 'success',
      },
    });

    await prisma.seoSecurityLog.create({
      data: {
        event: 'manual_sync',
        details: `Sync executed. Health Score: ${data.healthScore.totalScore}/100`,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'SEO metrics synchronized successfully.',
      timestamp: new Date().toISOString(),
      healthScore: data.healthScore.totalScore,
    });
  } catch (error) {
    console.error('[SEO Sync] Error during sync execution:', error);
    await prisma.googleIntegration.update({
      where: { id: 'primary' },
      data: {
        lastSyncStatus: 'error',
        lastError: error instanceof Error ? error.message : 'Unknown sync failure',
      },
    }).catch(() => {});

    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Sync failed' },
      { status: 500 },
    );
  }
}
