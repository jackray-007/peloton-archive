import { NextRequest, NextResponse } from 'next/server';
import { put } from '@vercel/blob';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const productId = (formData.get('productId') as string) || '';
    const imageIndex = formData.get('imageIndex');

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const extension = file.name.split('.').pop() || 'jpg';
    const timestamp = Date.now();
    const filename = productId
      ? imageIndex
        ? `${productId}-${imageIndex}-${timestamp}.${extension}`
        : `${productId}-${timestamp}.${extension}`
      : `upload-${timestamp}.${extension}`;

    // Prefer Vercel Blob (works in production; persists across deploys)
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      const blob = await put(`peloton-archive/images/${filename}`, buffer, {
        access: 'public',
        contentType: file.type || `image/${extension}`,
      });
      return NextResponse.json({
        success: true,
        url: blob.url,
        filename: blob.pathname || filename,
      });
    }

    // Fallback: write to public folder (works locally only)
    const imagesDir = join(process.cwd(), 'public', 'images', 'products');
    if (!existsSync(imagesDir)) {
      await mkdir(imagesDir, { recursive: true });
    }
    const filepath = join(imagesDir, filename);
    await writeFile(filepath, buffer);
    const publicUrl = `/images/products/${filename}`;
    return NextResponse.json({
      success: true,
      url: publicUrl,
      filename,
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    );
  }
}
