'use client';

import { useParams } from 'next/navigation';
import { useAuth } from '@/features/auth';
import { useEffect } from 'react';
import { redirect } from 'next/navigation';

export default function UserDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useParams();
  const { user, isAuthenticated } = useAuth();
  const role = params.role as string;
  const id = params.id as string;

  useEffect(() => {
    // Redirect if not authenticated
    if (!isAuthenticated) {
      redirect('/signin');
      return;
    }

    // Redirect if user is trying to access wrong role or wrong ID
    if (user && (user.role !== role || user.id !== id)) {
      redirect(`/${user.role}/${user.id}`);
      return;
    }
  }, [isAuthenticated, user, role, id]);

  // Don't render if not authenticated or wrong user
  if (!isAuthenticated || !user || user.role !== role || user.id !== id) {
    return null;
  }

  return <>{children}</>;
}