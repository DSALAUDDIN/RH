import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import {
  exchangeGoogleCodeForTokens,
  saveGoogleCredentials,
  verifyOAuthState,
} from '@/lib/seo-command/google-oauth';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const error = searchParams.get('error');
  const state = searchParams.get('state');

  const baseUrl = new URL('/admin/seo', request.url);

  // 1. Check for errors returned directly by Google
  if (error) {
    console.error('[Google OAuth Callback] Error returned from Google:', error);
    await prisma.seoSecurityLog.create({
      data: {
        event: 'sync_error',
        details: `OAuth callback error from Google: ${error}`,
      },
    });
    baseUrl.searchParams.set('error', `Google authorization denied: ${error}`);
    return NextResponse.redirect(baseUrl);
  }

  // 2. Validate signed CSRF state parameter
  const isStateValid = await verifyOAuthState(state);
  if (!isStateValid) {
    console.error('[Google OAuth Callback] CSRF State validation failed.');
    await prisma.seoSecurityLog.create({
      data: {
        event: 'sync_error',
        details: 'OAuth callback rejected: invalid or expired CSRF state token.',
      },
    });
    baseUrl.searchParams.set('error', 'Security check failed: invalid or expired OAuth state parameter.');
    return NextResponse.redirect(baseUrl);
  }

  // 3. Ensure authorization code is present
  if (!code) {
    baseUrl.searchParams.set('error', 'Missing authorization code from Google.');
    return NextResponse.redirect(baseUrl);
  }

  // 4. Exchange code for tokens (tokens are encrypted at rest on save)
  try {
    const tokens = await exchangeGoogleCodeForTokens(code);
    await saveGoogleCredentials(tokens);

    baseUrl.searchParams.set('connected', 'true');
    return NextResponse.redirect(baseUrl);
  } catch (err) {
    console.error('[Google OAuth Callback] Token exchange failed:', err);
    baseUrl.searchParams.set(
      'error',
      err instanceof Error ? err.message : 'Failed to complete authorization',
    );
    return NextResponse.redirect(baseUrl);
  }
}
