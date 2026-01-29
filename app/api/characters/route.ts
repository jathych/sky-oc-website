import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const configPath = path.join(process.cwd(), 'config', 'characters.config.json');

export async function GET() {
  const data = fs.readFileSync(configPath, 'utf-8');
  return NextResponse.json(JSON.parse(data));
}

export async function POST(request: Request) {
  const characters = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
  const newCharacter = await request.json();

  // Check for duplicate ID
  if (characters.some((c: any) => c.id === newCharacter.id)) {
    return NextResponse.json({ success: false, error: '角色ID已存在' }, { status: 400 });
  }

  characters.push(newCharacter);
  fs.writeFileSync(configPath, JSON.stringify(characters, null, 2));
  return NextResponse.json({ success: true });
}

export async function PUT(request: Request) {
  const characters = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
  const updatedCharacter = await request.json();
  const index = characters.findIndex((c: any) => c.id === updatedCharacter.id);
  if (index !== -1) {
    characters[index] = updatedCharacter;
    fs.writeFileSync(configPath, JSON.stringify(characters, null, 2));
    return NextResponse.json({ success: true });
  }
  return NextResponse.json({ success: false }, { status: 404 });
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const characters = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
  const filtered = characters.filter((c: any) => c.id !== id);
  fs.writeFileSync(configPath, JSON.stringify(filtered, null, 2));
  return NextResponse.json({ success: true });
}
