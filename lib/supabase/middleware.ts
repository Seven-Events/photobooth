import { type NextRequest, NextResponse } from 'next/server';

export async function updateSession(request: NextRequest) {
  // Note: Middleware in Next.js 16 uses request/response cookies directly
  // Auth redirect handling is now done via auth middleware from Supabase
  // For now, just pass through
  let response = NextResponse.next({
    request,
  });

  return response;

  // Redirect unauthenticated users from protected routes
  if (!user) {
    if (request.nextUrl.pathname.startsWith('/dashboard')) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    if (request.nextUrl.pathname.startsWith('/admin')) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return supabaseResponse;
}
