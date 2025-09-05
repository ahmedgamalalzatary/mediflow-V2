// AuthRouteGuard - Client-side protection for auth routes
// Prevents authenticated users from accessing signin/signup/home routes

'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/features/auth';

interface AuthRouteGuardProps {
    children: React.ReactNode;
}

export function AuthRouteGuard({ children }: AuthRouteGuardProps) {
    const { isAuthenticated, user, isLoading } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        // Only redirect if user is authenticated and has a valid user object
        if (isAuthenticated && user && !isLoading) {
            const authRoutes = ['/', '/signin', '/signup'];

            // Check if current path is an auth route
            if (authRoutes.includes(pathname)) {
                console.log('AuthRouteGuard: Redirecting authenticated user from auth route');
                // Redirect to user's role-based dashboard
                router.replace(`/${user.role}/${user.id}`);
                return;
            }
        }
    }, [isAuthenticated, user, isLoading, pathname, router]);

    // If user is authenticated and on an auth route, show loading while redirecting
    if (isAuthenticated && user && !isLoading) {
        const authRoutes = ['/', '/signin', '/signup'];
        if (authRoutes.includes(pathname)) {
            return (
                <div className="min-h-screen bg-background flex items-center justify-center">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                        <p className="mt-2 text-muted-foreground">Redirecting to dashboard...</p>
                    </div>
                </div>
            );
        }
    }

    // Render children for non-authenticated users or non-auth routes
    return <>{children}</>;
}

export default AuthRouteGuard;
