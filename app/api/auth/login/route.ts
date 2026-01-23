import { NextRequest, NextResponse } from 'next/server';
import { verifyPassword, createSession } from '@/lib/auth';

const loginAttempts = new Map<string, { count: number; lastAttempt: number }>();

export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
  const now = Date.now();

  // Simple rate limiting
  const attempts = loginAttempts.get(ip);
  if (attempts && attempts.count >= 5 && now - attempts.lastAttempt < 60000) {
    return NextResponse.json(
      { error: '尝试次数过多，请稍后再试' },
      { status: 429 }
    );
  }

  const { password } = await request.json();

  if (!verifyPassword(password)) {
    // Update rate limiting
    loginAttempts.set(ip, {
      count: (attempts?.count || 0) + 1,
      lastAttempt: now
    });

    return NextResponse.json(
      { error: '密码错误' },
      { status: 401 }
    );
  }

  // Clear rate limiting on success
  loginAttempts.delete(ip);

  const token = await createSession();
  const response = NextResponse.json({ success: true });

  response.cookies.set('session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 24 * 60 * 60 // 24 hours
  });

  return response;
}
