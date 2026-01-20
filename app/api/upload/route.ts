import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const productId = formData.get('productId') as string;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create images directory if it doesn't exist
    const imagesDir = join(process.cwd(), 'public', 'images', 'products');
    if (!existsSync(imagesDir)) {
      await mkdir(imagesDir, { recursive: true });
    }

    // Generate filename
    const timestamp = Date.now();
    const extension = file.name.split('.').pop();
    const imageIndex = formData.get('imageIndex');
    const filename = productId 
      ? imageIndex 
        ? `${productId}-${imageIndex}-${timestamp}.${extension}`
        : `${productId}-${timestamp}.${extension}`
      : `upload-${timestamp}.${extension}`;
    
    const filepath = join(imagesDir, filename);

    // Write file
    await writeFile(filepath, buffer);

    // Return the public URL
    const publicUrl = `/images/products/${filename}`;

    return NextResponse.json({ 
      success: true, 
      url: publicUrl,
      filename: filename 
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    );
  }
}

