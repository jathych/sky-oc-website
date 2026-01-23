import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const configPath = path.join(process.cwd(), 'config', 'photos.config.json');

export async function GET() {
  const data = fs.readFileSync(configPath, 'utf-8');
  return NextResponse.json(JSON.parse(data));
}

export async function POST(request: Request) {
  const photos = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
  const newPhoto = await request.json();
  photos.push(newPhoto);
  fs.writeFileSync(configPath, JSON.stringify(photos, null, 2));
  return NextResponse.json({ success: true });
}

export async function PUT(request: Request) {
  const photos = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
  const updatedPhoto = await request.json();
  const index = photos.findIndex((p: any) => p.id === updatedPhoto.id);
  if (index !== -1) {
    photos[index] = updatedPhoto;
    fs.writeFileSync(configPath, JSON.stringify(photos, null, 2));
    return NextResponse.json({ success: true });
  }
  return NextResponse.json({ success: false }, { status: 404 });
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const photos = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
  const filtered = photos.filter((p: any) => p.id !== id);
  fs.writeFileSync(configPath, JSON.stringify(filtered, null, 2));
  return NextResponse.json({ success: true });
}
