// src/lib/auth-secret.ts
//
// The admin JWT secret, resolved once, safely.
//
// It used to be `process.env.JWT_SECRET || 'fallback_secret_key_for_dev'`, in
// two files. That fallback string is committed to a GitHub repository, so if
// JWT_SECRET is ever unset in production — which is exactly what happens the
// first time you deploy and forget to add the variable — anyone who can read the
// repo can forge an `admin_token` cookie and walk into /admin/dashboard.
//
// Now: in production a missing JWT_SECRET means NO valid token exists, so admin
// routes reject everyone rather than accepting anyone. The public site is
// unaffected. In development a clearly-labelled local secret is used so nobody
// has to configure anything to run `npm run dev`.

const DEV_ONLY_SECRET = 'dev-only-not-for-production-do-not-deploy-without-JWT_SECRET';

/** True when a usable secret is configured. */
export function hasAuthSecret(): boolean {
  if (process.env.JWT_SECRET) return true;
  return process.env.NODE_ENV !== 'production';
}

/**
 * Returns the signing key, or null in production when JWT_SECRET is not set.
 * Callers MUST treat null as "authentication is unavailable — deny".
 */
export function getAuthSecret(): Uint8Array | null {
  const raw = process.env.JWT_SECRET;
  if (raw) return new TextEncoder().encode(raw);
  if (process.env.NODE_ENV === 'production') {
    console.error(
      '[auth] JWT_SECRET is not set. Admin authentication is disabled — every ' +
      'admin request will be rejected. Set JWT_SECRET in your hosting ' +
      'environment (Vercel → Settings → Environment Variables).'
    );
    return null;
  }
  return new TextEncoder().encode(DEV_ONLY_SECRET);
}
