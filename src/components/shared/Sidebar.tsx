// Sidebar Component - Shared Component
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/features/auth';
import { cn } from '@/lib/utils';
import {
  Calendar,
  Search,
  MessageSquare,
  FileText,
  User,
  Users,
  Clock,
  Stethoscope,
  Star,
  Settings,
  BarChart3
} from 'lucide-react';

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname();
  const { user } = useAuth();

  const getPatientNavItems = (userId: string) => [
    {
      title: 'Appointments',
      href: `/patient/${userId}/appointments`,
      icon: Calendar,
    },
    {
      title: 'Find Doctors',
      href: `/patient/${userId}/doctors`,
      icon: Search,
    },
    {
      title: 'Messages',
      href: `/patient/${userId}/messages`,
      icon: MessageSquare,
    },
    {
      title: 'Medical Records',
      href: `/patient/${userId}/medical-history`,
      icon: FileText,
    },
    {
      title: 'Profile',
      href: `/patient/${userId}/profile`,
      icon: User,
    },
  ];

  const getDoctorNavItems = (userId: string) => [
    {
      title: 'Appointments',
      href: `/doctor/${userId}/appointments`,
      icon: Calendar,
    },
    {
      title: 'Schedule',
      href: `/doctor/${userId}/schedule`,
      icon: Clock,
    },
    {
      title: 'Patients',
      href: `/doctor/${userId}/patients`,
      icon: Users,
    },
    {
      title: 'Messages',
      href: `/doctor/${userId}/messages`,
      icon: MessageSquare,
    },
    {
      title: 'Reviews',
      href: `/doctor/${userId}/reviews`,
      icon: Star,
    },
    {
      title: 'Profile',
      href: `/doctor/${userId}/profile`,
      icon: User,
    },
  ];

  const getAdminNavItems = (userId: string) => [
    {
      title: 'Analytics',
      href: `/admin/${userId}/analytics`,
      icon: BarChart3,
    },
    {
      title: 'Users',
      href: `/admin/${userId}/users`,
      icon: Users,
    },
    {
      title: 'Verify Doctors',
      href: `/admin/${userId}/verify-doctors`,
      icon: Stethoscope,
    },
    {
      title: 'Support',
      href: `/admin/${userId}/support`,
      icon: MessageSquare,
    },
    {
      title: 'Settings',
      href: `/admin/${userId}/settings`,
      icon: Settings,
    },
  ];

  const getNavItems = () => {
    if (!user?.id) return [];

    switch (user?.role) {
      case 'patient':
        return getPatientNavItems(user.id);
      case 'doctor':
        return getDoctorNavItems(user.id);
      case 'admin':
        return getAdminNavItems(user.id);
      default:
        return getPatientNavItems(user.id);
    }
  };

  const navItems = getNavItems();

  return (
    <div className={cn('pb-12 w-64 bg-sidebar border-r border-sidebar-border', className)}>
      <div className="space-y-4 py-6">
        <div className="px-4 py-2">
          <h2 className="mb-4 px-3 text-lg font-semibold tracking-tight text-sidebar-foreground">
            Navigation
          </h2>
          <div className="space-y-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'group flex items-center rounded-lg px-3 py-3 text-sm font-medium transition-all duration-200 hover:scale-[1.02]',
                    isActive
                      ? 'bg-sidebar-primary text-sidebar-primary-foreground shadow-lg shadow-sidebar-primary/20'
                      : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                  )}
                >
                  <div className={cn(
                    'mr-3 rounded-md p-1.5 transition-colors',
                    isActive
                      ? 'bg-sidebar-primary-foreground/20'
                      : 'bg-sidebar-accent group-hover:bg-sidebar-accent-foreground/10'
                  )}>
                    <item.icon className="h-4 w-4" />
                  </div>
                  <span className="flex-1">{item.title}</span>
                  {isActive && (
                    <div className="ml-auto h-2 w-2 rounded-full bg-sidebar-primary-foreground/60" />
                  )}
                </Link>
              );
            })}
          </div>
        </div>

        {/* User Role Badge */}
        <div className="px-4">
          <div className="rounded-lg bg-sidebar-accent/50 p-4 border border-sidebar-border">
            <div className="flex items-center space-x-3">
              <div className="rounded-full bg-sidebar-primary p-2">
                {user?.role === 'doctor' ? (
                  <Stethoscope className="h-4 w-4 text-sidebar-primary-foreground" />
                ) : user?.role === 'admin' ? (
                  <Settings className="h-4 w-4 text-sidebar-primary-foreground" />
                ) : (
                  <User className="h-4 w-4 text-sidebar-primary-foreground" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-sidebar-foreground capitalize">
                  {user?.role} Account
                </p>
                <p className="text-xs text-sidebar-foreground/60 truncate">
                  {user?.firstName} {user?.lastName}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
