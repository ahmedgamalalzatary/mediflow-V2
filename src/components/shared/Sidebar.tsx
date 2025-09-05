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
    <div className={cn('pb-12 w-64', className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex items-center rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors',
                    isActive 
                      ? 'bg-primary text-primary-foreground hover:bg-primary/90' 
                      : 'text-muted-foreground'
                  )}
                >
                  <item.icon className="mr-3 h-4 w-4" />
                  {item.title}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
