import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import { jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { getAuthSecret } from '@/lib/auth-secret';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


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

    // 2. Parse FormData
    const formData = await req.formData();
    const file = formData.get('file') as File;
    if (!file) return NextResponse.json({ error: 'No file provided' }, { status: 400 });

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // 3. Upload to Cloudinary via stream
    const uploadResult = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { resource_type: 'video', folder: 'rhdental_reviews' },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      uploadStream.end(buffer);
    });

    return NextResponse.json({ success: true, result: uploadResult });
  } catch (error) {
    console.error('Upload Error:', error);
    return NextResponse.json({ error: 'Failed to upload video' }, { status: 500 });
  }
}
