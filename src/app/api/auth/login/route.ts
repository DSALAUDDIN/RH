import { NextResponse } from 'next/server';
import { SignJWT } from 'jose';
import { cookies } from 'next/headers';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { getAuthSecret } from '@/lib/auth-secret';

export async function POST(req: Request) {
  const secret = getAuthSecret();
  if (!secret) {
    // JWT_SECRET is not configured: refuse to issue tokens.
    return NextResponse.json(
      { success: false, message: 'Admin login is not configured on this deployment.' },
      { status: 503 },
    );
  }

  try {
    const { username, password } = await req.json();

    let admin = await prisma.admin.findUnique({ where: { username } });

    /*
     * First-run bootstrap. Disabled unless both are set:
     *   ADMIN_BOOTSTRAP=true
     *   ADMIN_BOOTSTRAP_PASSWORD=<at least 12 characters>
     * Unset both once the admin account exists.
     */
    if (!admin) {
      const bootstrapEnabled = process.env.ADMIN_BOOTSTRAP === 'true';
      const bootstrapPassword = process.env.ADMIN_BOOTSTRAP_PASSWORD;

      if (!bootstrapEnabled || !bootstrapPassword || bootstrapPassword.length < 12) {
        return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
      }
      if (password !== bootstrapPassword) {
        return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
      }

      console.warn(`[auth] bootstrapping admin account "${username}". Unset ADMIN_BOOTSTRAP now.`);
      admin = await prisma.admin.create({
        data: { username, password: await bcrypt.hash(bootstrapPassword, 12) },
      });
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const token = await new SignJWT({ id: admin.id, username: admin.username })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('24h')
      .sign(secret);

    const cookieStore = await cookies();
    cookieStore.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24, // 24 hours
      path: '/',
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[auth] login failed:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
