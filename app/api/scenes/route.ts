import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const configPath = path.join(process.cwd(), 'config', 'scenes.config.json');

export async function GET() {
  const data = fs.readFileSync(configPath, 'utf-8');
  return NextResponse.json(JSON.parse(data));
}

export async function POST(request: Request) {
  const scenes = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
  const newScene = await request.json();
  scenes.push(newScene);
  fs.writeFileSync(configPath, JSON.stringify(scenes, null, 2));
  return NextResponse.json({ success: true });
}

export async function PUT(request: Request) {
  const scenes = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
  const updatedScene = await request.json();
  const index = scenes.findIndex((s: any) => s.id === updatedScene.id);
  if (index !== -1) {
    scenes[index] = updatedScene;
    fs.writeFileSync(configPath, JSON.stringify(scenes, null, 2));
    return NextResponse.json({ success: true });
  }
  return NextResponse.json({ success: false }, { status: 404 });
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const scenes = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
  const filtered = scenes.filter((s: any) => s.id !== id);
  fs.writeFileSync(configPath, JSON.stringify(filtered, null, 2));
  return NextResponse.json({ success: true });
}
