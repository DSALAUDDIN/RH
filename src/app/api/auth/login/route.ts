import { NextResponse } from 'next/server';
import { SignJWT } from 'jose';
import { cookies } from 'next/headers';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { getAuthSecret } from '@/lib/auth-secret';



export async function POST(req: Request) {
  const secret = getAuthSecret();
  if (!secret) {
    // Production with no JWT_SECRET. Refuse to issue a token rather than sign
    // one with a secret that is public in the repository.
    return NextResponse.json(
      { success: false, message: 'Admin login is not configured on this deployment.' },
      { status: 503 }
    );
  }

  try {
    const { username, password } = await req.json();

    // In a real app, you look up the admin in the database
    // For simplicity, if no admin exists, we allow a default login to initialize
    let admin = await prisma.admin.findUnique({ where: { username } });

    if (!admin) {
      // Create default admin if none exists (only for first-time setup!)
      if (username === 'admin' && password === 'admin123') {
        const hashedPassword = await bcrypt.hash('admin123', 10);
        admin = await prisma.admin.create({
          data: {
            username: 'admin',
            password: hashedPassword,
          },
        });
      } else {
        return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
      }
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
  } catch (error: any) {
    console.error('Login error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
