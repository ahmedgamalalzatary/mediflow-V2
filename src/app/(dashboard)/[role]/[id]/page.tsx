'use client';

import { useAuth } from '@/features/auth';
import { useParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Search, MessageSquare, FileText, Clock, Heart, Users, Star, Stethoscope } from 'lucide-react';
import Link from 'next/link';

export default function UserDashboard() {
  const { user } = useAuth();
  const params = useParams();
  const role = params.role as string;
  const userId = params.id as string;

  const getQuickActions = () => {
    if (role === 'patient') {
      return [
        {
          title: 'Book Appointment',
          description: 'Find and book with available doctors',
          icon: Calendar,
          href: `/${role}/${userId}/doctors`,
          color: 'bg-blue-500',
        },
        {
          title: 'View Appointments',
          description: 'Manage your scheduled appointments',
          icon: Clock,
          href: `/${role}/${userId}/appointments`,
          color: 'bg-green-500',
        },
        {
          title: 'Messages',
          description: 'Chat with your healthcare providers',
          icon: MessageSquare,
          href: `/${role}/${userId}/messages`,
          color: 'bg-purple-500',
        },
        {
          title: 'Medical Records',
          description: 'Access your medical history',
          icon: FileText,
          href: `/${role}/${userId}/medical-history`,
          color: 'bg-orange-500',
        },
      ];
    } else if (role === 'doctor') {
      return [
        {
          title: 'Today\'s Appointments',
          description: 'View and manage today\'s schedule',
          icon: Calendar,
          href: `/${role}/${userId}/appointments`,
          color: 'bg-blue-500',
        },
        {
          title: 'Manage Schedule',
          description: 'Set your availability and time slots',
          icon: Clock,
          href: `/${role}/${userId}/schedule`,
          color: 'bg-green-500',
        },
        {
          title: 'Patient Messages',
          description: 'Respond to patient inquiries',
          icon: MessageSquare,
          href: `/${role}/${userId}/messages`,
          color: 'bg-purple-500',
        },
        {
          title: 'Patient Records',
          description: 'Access patient medical histories',
          icon: Users,
          href: `/${role}/${userId}/patients`,
          color: 'bg-orange-500',
        },
      ];
    } else {
      return [
        {
          title: 'Analytics',
          description: 'View system analytics and reports',
          icon: Calendar,
          href: `/${role}/${userId}/analytics`,
          color: 'bg-blue-500',
        },
        {
          title: 'Manage Users',
          description: 'Manage patients and doctors',
          icon: Users,
          href: `/${role}/${userId}/users`,
          color: 'bg-green-500',
        },
        {
          title: 'Support',
          description: 'Handle support tickets',
          icon: MessageSquare,
          href: `/${role}/${userId}/support`,
          color: 'bg-purple-500',
        },
        {
          title: 'Settings',
          description: 'System configuration',
          icon: FileText,
          href: `/${role}/${userId}/settings`,
          color: 'bg-orange-500',
        },
      ];
    }
  };

  const quickActions = getQuickActions();

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            {role === 'doctor' ? `Welcome, Dr. ${user?.lastName}!` : `Welcome back, ${user?.firstName}!`}
          </h1>
          <p className="text-muted-foreground mt-2">
            {role === 'patient' && 'Manage your healthcare journey from your personal dashboard'}
            {role === 'doctor' && 'Manage your practice and provide excellent patient care'}
            {role === 'admin' && 'Oversee the healthcare platform and manage system operations'}
          </p>
        </div>
        <div className="healthcare-gradient-primary p-4 rounded-xl">
          {role === 'doctor' ? (
            <Stethoscope className="h-8 w-8 text-white" />
          ) : role === 'admin' ? (
            <Users className="h-8 w-8 text-white" />
          ) : (
            <Heart className="h-8 w-8 text-white" />
          )}
        </div>
      </div>

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickActions.map((action) => (
          <Card key={action.title} className="healthcare-card hover:shadow-lg transition-all duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {action.title}
              </CardTitle>
              <div className={`${action.color} p-2 rounded-md`}>
                <action.icon className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-xs text-muted-foreground mb-4">
                {action.description}
              </CardDescription>
              <Button asChild size="sm" className="w-full">
                <Link href={action.href}>
                  Get Started
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="healthcare-card">
          <CardHeader>
            <CardTitle>
              {role === 'patient' && 'Recent Appointments'}
              {role === 'doctor' && 'Today\'s Schedule'}
              {role === 'admin' && 'System Overview'}
            </CardTitle>
            <CardDescription>
              {role === 'patient' && 'Your upcoming and recent appointments'}
              {role === 'doctor' && 'Your appointments for today'}
              {role === 'admin' && 'Platform statistics and activity'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div>
                  <p className="font-medium">
                    {role === 'patient' && 'No appointments scheduled'}
                    {role === 'doctor' && 'No appointments today'}
                    {role === 'admin' && 'System running smoothly'}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {role === 'patient' && 'Book your first appointment'}
                    {role === 'doctor' && 'Set your availability'}
                    {role === 'admin' && 'All systems operational'}
                  </p>
                </div>
                <Button asChild size="sm">
                  <Link href={
                    role === 'patient' ? `/${role}/${userId}/doctors` :
                    role === 'doctor' ? `/${role}/${userId}/schedule` :
                    `/${role}/${userId}/analytics`
                  }>
                    {role === 'patient' && 'Book Now'}
                    {role === 'doctor' && 'Set Schedule'}
                    {role === 'admin' && 'View Details'}
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="healthcare-card">
          <CardHeader>
            <CardTitle>
              {role === 'patient' && 'Health Overview'}
              {role === 'doctor' && 'Patient Reviews'}
              {role === 'admin' && 'Recent Activity'}
            </CardTitle>
            <CardDescription>
              {role === 'patient' && 'Your health summary and reminders'}
              {role === 'doctor' && 'Your recent patient feedback'}
              {role === 'admin' && 'Latest platform activities'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div>
                  <p className="font-medium">
                    {role === 'patient' && 'Profile Complete'}
                    {role === 'doctor' && 'No reviews yet'}
                    {role === 'admin' && 'All systems updated'}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {role === 'patient' && 'Keep your information up to date'}
                    {role === 'doctor' && 'Complete appointments to get reviews'}
                    {role === 'admin' && 'Platform running latest version'}
                  </p>
                </div>
                <Button asChild size="sm" variant="outline">
                  <Link href={
                    role === 'patient' ? `/${role}/${userId}/profile` :
                    role === 'doctor' ? `/${role}/${userId}/reviews` :
                    `/${role}/${userId}/settings`
                  }>
                    {role === 'patient' && 'Update'}
                    {role === 'doctor' && 'View All'}
                    {role === 'admin' && 'Manage'}
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}