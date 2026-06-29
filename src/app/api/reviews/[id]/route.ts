import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const SECRET_KEY = new TextEncoder().encode(
  process.env.JWT_SECRET || 'fallback_secret_key_for_dev'
);

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    // 1. Verify Admin token
    const cookieStore = await cookies();
    const token = cookieStore.get('admin_token')?.value;
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    await jwtVerify(token, SECRET_KEY);

    const { id } = await params;

    // 2. Fetch the review to get the video URL
    const review = await prisma.review.findUnique({ where: { id } });
    if (!review) return NextResponse.json({ error: 'Review not found' }, { status: 404 });

    // 3. Delete from Cloudinary (extract public_id)
    try {
      // URL format: .../upload/v12345/folder/filename.mp4
      const parts = review.videoUrl.split('/upload/');
      if (parts.length > 1) {
        let publicIdWithExtension = parts[1].split('/').slice(1).join('/'); // remove 'v12345'
        const publicId = publicIdWithExtension.substring(0, publicIdWithExtension.lastIndexOf('.'));
        if (publicId) {
          await cloudinary.uploader.destroy(publicId, { resource_type: 'video' });
        }
      }
    } catch (cloudErr) {
      console.error("Failed to delete from Cloudinary:", cloudErr);
      // We proceed to delete from DB even if Cloudinary fails
    }

    // 4. Delete from Database
    await prisma.review.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete error:', error);
    return NextResponse.json({ error: 'Failed to delete review' }, { status: 500 });
  }
}
