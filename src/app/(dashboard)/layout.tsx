'use client';

import { useEffect } from 'react';
import { useAuthState } from '@/features/auth';
import { Navbar } from '@/components/shared/Navbar';
import { Sidebar } from '@/components/shared/Sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Initialize auth state listener
  useAuthState();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="flex">
        <Sidebar className="fixed left-0 top-16 h-[calc(100vh-4rem)] bg-card border-r border-border" />
        <main className="flex-1 ml-64 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}