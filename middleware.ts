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
        set(name: string, value: string, options: Record<string, unknown>) {
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
        remove(name: string, options: Record<string, unknown>) {
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

  // Get the current session with better error handling
  let session = null;
  try {
    const {
      data: { session: currentSession },
      error
    } = await supabase.auth.getSession();
    
    if (error) {
      console.warn('Middleware session error:', error);
    } else {
      session = currentSession;
    }
  } catch (error) {
    console.warn('Middleware session fetch failed:', error);
  }

  const { pathname } = request.nextUrl;

  // Public routes that don't require authentication
  const publicRoutes = [
    '/',
    '/signin',
    '/signup',
    '/forgot-password',
    '/reset-password',
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

  // User is authenticated - get user profile with error handling
  let profile = null;
  try {
    const { data: userProfile, error: profileError } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', session.user.id)
      .single();
    
    if (profileError) {
      console.warn('Middleware profile fetch error:', profileError);
    } else {
      profile = userProfile;
    }
  } catch (error) {
    console.warn('Middleware profile fetch failed:', error);
  }

  const userRole = profile?.role;

  // Redirect authenticated users away from auth pages and home page
  if (pathname === '/' || pathname.startsWith('/signin') || pathname.startsWith('/signup')) {
    return NextResponse.redirect(new URL(getRoleBasedDashboard(userRole, session.user.id), request.url));
  }

  // Handle role-based dashboard routing
  if (pathname.startsWith('/patient') || pathname.startsWith('/doctor') || pathname.startsWith('/admin')) {
    const pathParts = pathname.split('/');
    const requestedRole = pathParts[1];
    const requestedUserId = pathParts[2];
    
    // Check if user is accessing their correct role dashboard and their own ID
    if (userRole !== requestedRole || session.user.id !== requestedUserId) {
      return NextResponse.redirect(new URL(getRoleBasedDashboard(userRole, session.user.id), request.url));
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
function getRoleBasedDashboard(role: string | undefined, userId?: string): string {
  if (!userId) return '/signin';
  
  switch (role) {
    case USER_ROLES.PATIENT:
      return `/patient/${userId}`;
    case USER_ROLES.DOCTOR:
      return `/doctor/${userId}`;
    case USER_ROLES.ADMIN:
      return `/admin/${userId}`;
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