import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const configPath = path.join(process.cwd(), 'config', 'artworks.config.json');

export async function GET() {
  const data = fs.readFileSync(configPath, 'utf-8');
  return NextResponse.json(JSON.parse(data));
}

export async function POST(request: Request) {
  const artworks = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
  const newArtwork = await request.json();
  artworks.push(newArtwork);
  fs.writeFileSync(configPath, JSON.stringify(artworks, null, 2));
  return NextResponse.json({ success: true });
}

export async function PUT(request: Request) {
  const artworks = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
  const updatedArtwork = await request.json();
  const index = artworks.findIndex((a: any) => a.id === updatedArtwork.id);
  if (index !== -1) {
    artworks[index] = updatedArtwork;
    fs.writeFileSync(configPath, JSON.stringify(artworks, null, 2));
    return NextResponse.json({ success: true });
  }
  return NextResponse.json({ success: false }, { status: 404 });
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const artworks = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
  const filtered = artworks.filter((a: any) => a.id !== id);
  fs.writeFileSync(configPath, JSON.stringify(filtered, null, 2));
  return NextResponse.json({ success: true });
}
