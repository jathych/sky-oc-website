import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
const MAX_SIZE = 5 * 1024 * 1024; // 5MB

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const uploadType = (formData.get('type') as string) || 'artworks';

    if (!file) {
      return NextResponse.json({ error: '未选择文件' }, { status: 400 });
    }

    // Validate file type
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: '只支持 JPG, PNG, WEBP 格式' },
        { status: 400 }
      );
    }

    // Validate file size
    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: '文件大小不能超过 5MB' },
        { status: 400 }
      );
    }

    // Clean filename and add timestamp
    const ext = file.name.split('.').pop();
    const cleanName = file.name
      .replace(/\.[^/.]+$/, '')
      .replace(/[^a-zA-Z0-9_-]/g, '_');
    const timestamp = Date.now();
    const filename = `${cleanName}_${timestamp}.${ext}`;

    // Ensure upload directory exists
    const uploadDir = join(process.cwd(), 'public', 'images', uploadType);
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }

    // Save file
    const buffer = Buffer.from(await file.arrayBuffer());
    const filepath = join(uploadDir, filename);
    await writeFile(filepath, buffer);

    // Return relative path for use in the application
    const imagePath = `/images/${uploadType}/${filename}`;

    return NextResponse.json({ path: imagePath });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: '上传失败，请重试' },
      { status: 500 }
    );
  }
}
