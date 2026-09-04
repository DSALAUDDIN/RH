import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { getAuthSecret } from '@/lib/auth-secret';


export async function GET() {
  const secret = getAuthSecret();
  if (!secret) {
    return NextResponse.json({ success: false, message: 'Not configured.' }, { status: 503 });
  }

  try {
    const reviews = await prisma.review.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json({ reviews });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch reviews' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const secret = getAuthSecret();
  if (!secret) {
    return NextResponse.json({ success: false, message: 'Not configured.' }, { status: 503 });
  }

  try {
    // 1. Verify Admin token
    const cookieStore = await cookies();
    const token = cookieStore.get('admin_token')?.value;
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    await jwtVerify(token, secret);

    // 2. Parse request
    const { patient, rating, videoUrl } = await req.json();

    if (!patient || !videoUrl) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // 3. Save to database
    const review = await prisma.review.create({
      data: {
        patient,
        rating: rating || 5,
        videoUrl,
      },
    });

    return NextResponse.json({ success: true, review });
  } catch (error) {
    console.error('Review Save Error:', error);
    return NextResponse.json({ error: 'Failed to save review' }, { status: 500 });
  }
}
