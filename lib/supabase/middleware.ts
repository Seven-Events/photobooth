import { type NextRequest, NextResponse } from 'next/server';

export async function updateSession(request: NextRequest) {
  // Middleware in Next.js 16 with Supabase
  // Just pass through - auth is handled by individual route handlers
  return NextResponse.next({
    request,
  });
}
