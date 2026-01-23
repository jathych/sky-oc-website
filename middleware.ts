import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifySession } from './lib/auth';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('session')?.value;

  // Allow access to login page
  if (request.nextUrl.pathname === '/admin/login') {
    return NextResponse.next();
  }

  // Allow public GET requests to artworks and scenes API
  if ((request.nextUrl.pathname === '/api/artworks' || request.nextUrl.pathname === '/api/scenes' || request.nextUrl.pathname === '/api/photos') && request.method === 'GET') {
    return NextResponse.next();
  }

  // Check authentication for protected routes
  if (!token || !(await verifySession(token))) {
    // For API routes, return 401
    if (request.nextUrl.pathname.startsWith('/api/')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    // For admin pages, redirect to login
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/artworks/:path*', '/api/scenes/:path*', '/api/photos/:path*', '/api/upload/:path*']
};
