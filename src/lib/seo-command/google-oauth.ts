import crypto from 'node:crypto';
import { SignJWT, jwtVerify } from 'jose';
import { prisma } from '@/lib/prisma';
import { getAuthSecret } from '@/lib/auth-secret';
import { encryptToken, decryptToken } from './crypto';

const GOOGLE_AUTH_ENDPOINT = 'https://accounts.google.com/o/oauth2/v2/auth';
const GOOGLE_TOKEN_ENDPOINT = 'https://oauth2.googleapis.com/token';

/**
 * Required OAuth Scopes for RH Dental SEO Command Center.
 * Note on business.manage: Google provides no read-only scope for the Business Profile
 * Performance API. business.manage is a management-capable scope strictly required by Google
 * for Performance API access; RH Dental's application operates strictly in read-only mode
 * by behavior (monitoring search views, calls, directions; no edits, posts, or mutations).
 */
export const REQUIRED_GOOGLE_SCOPES = [
  'https://www.googleapis.com/auth/webmasters.readonly',
  'https://www.googleapis.com/auth/analytics.readonly',
  'https://www.googleapis.com/auth/business.manage',
];

export function getGoogleOAuthEnv() {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const redirectUri =
    process.env.GOOGLE_REDIRECT_URI || 'https://rhdentalcare.com/api/admin/seo/auth/google/callback';

  return {
    clientId: clientId || null,
    clientSecret: clientSecret || null,
    redirectUri,
    isConfigured: Boolean(clientId && clientSecret),
  };
}

/**
 * Generate a cryptographically signed CSRF state token for Google OAuth flow.
 * Valid for 15 minutes.
 */
export async function generateSignedOAuthState(adminUsername: string): Promise<string> {
  const secret = getAuthSecret();
  if (!secret) {
    throw new Error('Server auth secret is missing; cannot generate signed OAuth state.');
  }

  return new SignJWT({
    action: 'seo-command-oauth',
    admin: adminUsername,
    nonce: crypto.randomUUID(),
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('15m')
    .sign(secret);
}

/**
 * Verify the signed CSRF state token from the Google OAuth callback.
 */
export async function verifyOAuthState(state: string | null): Promise<boolean> {
  if (!state) return false;
  const secret = getAuthSecret();
  if (!secret) return false;

  try {
    const { payload } = await jwtVerify(state, secret);
    return payload.action === 'seo-command-oauth';
  } catch {
    return false;
  }
}

/**
 * Generate Google OAuth 2.0 consent URL with mandatory CSRF state
 */
export function generateGoogleAuthUrl(state: string): string {
  const { clientId, redirectUri, isConfigured } = getGoogleOAuthEnv();

  if (!isConfigured || !clientId) {
    throw new Error('Google OAuth environment variables (GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET) are not configured.');
  }

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: 'code',
    scope: REQUIRED_GOOGLE_SCOPES.join(' '),
    access_type: 'offline', // Requests refresh_token
    prompt: 'consent', // Ensures refresh_token is returned on every grant
    include_granted_scopes: 'true',
    state,
  });

  return `${GOOGLE_AUTH_ENDPOINT}?${params.toString()}`;
}

/**
 * Exchange OAuth authorization code for access and refresh tokens
 */
export async function exchangeGoogleCodeForTokens(code: string): Promise<{
  accessToken: string;
  refreshToken?: string;
  expiresIn: number;
  scope: string;
}> {
  const { clientId, clientSecret, redirectUri, isConfigured } = getGoogleOAuthEnv();

  if (!isConfigured || !clientId || !clientSecret) {
    throw new Error('Google OAuth credentials not configured on server.');
  }

  const response = await fetch(GOOGLE_TOKEN_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      code,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri,
      grant_type: 'authorization_code',
    }),
  });

  if (!response.ok) {
    console.error('[Google OAuth] Token exchange error occurred (details omitted for security)');
    throw new Error(`Failed to exchange Google OAuth code: ${response.statusText}`);
  }

  const data = await response.json();
  return {
    accessToken: data.access_token,
    refreshToken: data.refresh_token,
    expiresIn: data.expires_in,
    scope: data.scope,
  };
}

/**
 * Retrieve a valid Google Access Token (refreshing if expired).
 * Tokens stored in database are encrypted at rest using AES-256-GCM.
 */
export async function getValidGoogleAccessToken(): Promise<string | null> {
  const integration = await prisma.googleIntegration.findUnique({
    where: { id: 'primary' },
  });

  if (!integration || !integration.connected || !integration.refreshToken) {
    return null;
  }

  const plainRefreshToken = decryptToken(integration.refreshToken);
  if (!plainRefreshToken) {
    console.error('[Google OAuth] Failed to decrypt refresh token. Please re-authenticate.');
    return null;
  }

  // Check if existing token is valid (with 5-minute buffer)
  const now = new Date();
  const bufferMs = 5 * 60 * 1000;
  if (
    integration.accessToken &&
    integration.tokenExpiry &&
    integration.tokenExpiry.getTime() - bufferMs > now.getTime()
  ) {
    return decryptToken(integration.accessToken);
  }

  // Refresh token
  const { clientId, clientSecret, isConfigured } = getGoogleOAuthEnv();
  if (!isConfigured || !clientId || !clientSecret) {
    console.warn('[Google OAuth] Client credentials missing during token refresh.');
    return null;
  }

  try {
    const response = await fetch(GOOGLE_TOKEN_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        refresh_token: plainRefreshToken,
        grant_type: 'refresh_token',
      }),
    });

    if (!response.ok) {
      console.error('[Google OAuth] Token refresh failed with status:', response.status);
      await prisma.googleIntegration.update({
        where: { id: 'primary' },
        data: {
          lastError: 'Token refresh failed. Re-authorization required.',
          lastSyncStatus: 'error',
        },
      });
      return null;
    }

    const data = await response.json();
    const newExpiry = new Date(Date.now() + data.expires_in * 1000);

    // Save newly refreshed access token encrypted at rest
    await prisma.googleIntegration.update({
      where: { id: 'primary' },
      data: {
        accessToken: encryptToken(data.access_token),
        tokenExpiry: newExpiry,
        lastError: null,
      },
    });

    return data.access_token;
  } catch (error) {
    console.error('[Google OAuth] Refresh network error occurred');
    return null;
  }
}

/**
 * Save newly authorized Google credentials and log security event.
 * Tokens are encrypted at rest with AES-256-GCM before writing to the database.
 */
export async function saveGoogleCredentials(tokens: {
  accessToken: string;
  refreshToken?: string;
  expiresIn: number;
  scope: string;
}): Promise<void> {
  const tokenExpiry = new Date(Date.now() + tokens.expiresIn * 1000);

  const existing = await prisma.googleIntegration.findUnique({
    where: { id: 'primary' },
  });

  const encryptedAccessToken = encryptToken(tokens.accessToken);
  const rawRefreshToken = tokens.refreshToken || (existing?.refreshToken ? decryptToken(existing.refreshToken) : null);
  const encryptedRefreshToken = rawRefreshToken ? encryptToken(rawRefreshToken) : null;

  await prisma.googleIntegration.upsert({
    where: { id: 'primary' },
    update: {
      connected: true,
      accessToken: encryptedAccessToken,
      refreshToken: encryptedRefreshToken,
      tokenExpiry,
      scope: tokens.scope,
      lastError: null,
    },
    create: {
      id: 'primary',
      connected: true,
      accessToken: encryptedAccessToken,
      refreshToken: encryptedRefreshToken,
      tokenExpiry,
      scope: tokens.scope,
      gscSiteUrl: process.env.GSC_SITE_URL || 'sc-domain:rhdentalcare.com',
      ga4PropertyId: process.env.GA4_PROPERTY_ID || null,
      gbpBananiLocationId: process.env.GBP_BANANI_LOCATION_ID || null,
      gbpBanasreeLocationId: process.env.GBP_BANASREE_LOCATION_ID || null,
    },
  });

  await prisma.seoSecurityLog.create({
    data: {
      event: 'connect',
      details: 'Google account authorized with encrypted token storage.',
    },
  });
}

/**
 * Disconnect and revoke Google credentials
 */
export async function disconnectGoogleIntegration(): Promise<void> {
  const integration = await prisma.googleIntegration.findUnique({
    where: { id: 'primary' },
  });

  if (integration?.accessToken) {
    const plainAccessToken = decryptToken(integration.accessToken);
    if (plainAccessToken) {
      try {
        await fetch(`https://oauth2.googleapis.com/revoke?token=${encodeURIComponent(plainAccessToken)}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        });
      } catch {
        // Best-effort revocation
      }
    }
  }

  await prisma.googleIntegration.update({
    where: { id: 'primary' },
    data: {
      connected: false,
      accessToken: null,
      refreshToken: null,
      tokenExpiry: null,
      lastSyncStatus: null,
      lastError: null,
    },
  });

  await prisma.seoSecurityLog.create({
    data: {
      event: 'disconnect',
      details: 'Google integration disconnected and tokens purged from database.',
    },
  });
}
