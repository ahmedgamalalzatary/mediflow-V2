// Next.js Middleware for Authentication and Route Protection
// Handles automatic redirects based on auth state and user roles

import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { USER_ROLES } from '@/lib/constants';

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: any) {
          request.cookies.set({
            name,
            value,
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value,
            ...options,
          });
        },
        remove(name: string, options: any) {
          request.cookies.set({
            name,
            value: '',
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value: '',
            ...options,
          });
        },
      },
    }
  );

  // Get the current session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { pathname } = request.nextUrl;

  // Public routes that don't require authentication
  const publicRoutes = [
    '/',
    '/signin',
    '/signup',
    '/forgot-password',
    '/reset-password',
    '/verify-email',
    '/about',
    '/contact',
    '/doctors',
    '/pricing',
    '/privacy',
    '/terms',
  ];

  // Check if current path is public
  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));

  // If user is not authenticated
  if (!session) {
    // Redirect to signin if trying to access protected routes
    if (!isPublicRoute) {
      const redirectUrl = new URL('/signin', request.url);
      redirectUrl.searchParams.set('redirectTo', pathname);
      return NextResponse.redirect(redirectUrl);
    }
    return response;
  }

  // User is authenticated - get user profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', session.user.id)
    .single();

  const userRole = profile?.role;

  // Redirect authenticated users away from auth pages
  if (pathname.startsWith('/signin') || pathname.startsWith('/signup')) {
    return NextResponse.redirect(new URL(getRoleBasedDashboard(userRole), request.url));
  }

  // Handle role-based dashboard routing
  if (pathname.startsWith('/patient') || pathname.startsWith('/doctor') || pathname.startsWith('/admin')) {
    const requestedRole = pathname.split('/')[1];
    
    // Check if user is accessing their correct role dashboard
    if (userRole !== requestedRole) {
      return NextResponse.redirect(new URL(getRoleBasedDashboard(userRole), request.url));
    }
  }

  // Handle dynamic role routing [role]
  if (pathname.includes('/[role]/')) {
    const correctedPath = pathname.replace('/[role]/', `/${userRole}/`);
    return NextResponse.redirect(new URL(correctedPath, request.url));
  }

  return response;
}

// Helper function to get dashboard URL based on user role
function getRoleBasedDashboard(role: string | undefined): string {
  switch (role) {
    case USER_ROLES.PATIENT:
      return '/patient';
    case USER_ROLES.DOCTOR:
      return '/doctor';
    case USER_ROLES.ADMIN:
      return '/admin';
    default:
      return '/signin';
  }
}

// Configure which routes this middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
};