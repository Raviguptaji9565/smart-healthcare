import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/dashboard')) {
    const userRoleCookie = request.cookies.get('smart_health_role')?.value;

    if (pathname.startsWith('/dashboard/doctor')) {
      if (userRoleCookie && userRoleCookie.toLowerCase() !== 'doctor') {
        const redirectUrl = new URL('/dashboard/patient', request.url);
        redirectUrl.searchParams.set('unauthorized', 'doctor_only');
        return NextResponse.redirect(redirectUrl);
      }
    }

    if (pathname.startsWith('/dashboard/patient')) {
      if (userRoleCookie && userRoleCookie.toLowerCase() === 'doctor') {
        const redirectUrl = new URL('/dashboard/doctor', request.url);
        return NextResponse.redirect(redirectUrl);
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
