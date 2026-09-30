import { NextResponse } from 'next/server';
import { verifyAdminAuth } from '@/lib/admin-auth';
import { generateGoogleAuthUrl, getGoogleOAuthEnv, generateSignedOAuthState } from '@/lib/seo-command/google-oauth';

export async function GET() {
  const admin = await verifyAdminAuth();
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { isConfigured } = getGoogleOAuthEnv();
  if (!isConfigured) {
    return NextResponse.json(
      {
        error:
          'Google OAuth is not configured on this server. Please set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET in environment variables.',
      },
      { status: 400 },
    );
  }

  try {
    const state = await generateSignedOAuthState(admin.username);
    const authUrl = generateGoogleAuthUrl(state);
    return NextResponse.json({ authUrl });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to generate auth URL' },
      { status: 500 },
    );
  }
}
