import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';
import { getAuthSecret } from '@/lib/auth-secret';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only protect routes under /admin/dashboard
  if (pathname.startsWith('/admin/dashboard')) {
    const token = request.cookies.get('admin_token')?.value;
    const secret = getAuthSecret();

    // No secret configured in production → no token can be trusted. Deny,
    // rather than fall back to a secret that is public in the repository.
    if (!token || !secret) {
      return NextResponse.redirect(new URL('/admin', request.url));
    }

    try {
      await jwtVerify(token, secret);
      return NextResponse.next();
    } catch (error) {
      // Invalid or expired token
      const response = NextResponse.redirect(new URL('/admin', request.url));
      response.cookies.delete('admin_token');
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/dashboard/:path*'],
};
