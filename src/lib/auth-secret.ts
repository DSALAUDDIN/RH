// Admin JWT signing secret.
//
// Fails closed: in production a missing JWT_SECRET yields null and every admin
// route denies access. Development uses a local-only fallback.

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
        'environment (Vercel → Settings → Environment Variables).',
    );
    return null;
  }
  return new TextEncoder().encode(DEV_ONLY_SECRET);
}
