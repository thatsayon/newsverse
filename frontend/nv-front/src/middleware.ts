// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const userToken = request.cookies.get('token')?.value;
  console.log(userToken)

  if (!userToken) {
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

// Specify the paths where this middleware should run
export const config = {
  matcher: ['/bookmark/:path*', '/profile/:path*'], // Add paths that require authentication
};
