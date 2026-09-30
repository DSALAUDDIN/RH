import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import { getAuthSecret } from '@/lib/auth-secret';

export interface AdminSession {
  id: string;
  username: string;
}

/**
 * Server-side helper to verify admin authentication from HTTP-only cookie.
 * Returns the decoded admin session or null if unauthenticated.
 */
export async function verifyAdminAuth(): Promise<AdminSession | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_token')?.value;
  const secret = getAuthSecret();

  if (!token || !secret) {
    return null;
  }

  try {
    const { payload } = await jwtVerify(token, secret);
    return {
      id: (payload.id as string) || 'admin',
      username: (payload.username as string) || 'admin',
    };
  } catch {
    return null;
  }
}
