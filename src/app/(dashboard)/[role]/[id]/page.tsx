'use client';

import { useAuth } from '@/features/auth';
import { useParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, MessageSquare, FileText, Clock, Heart, Users, Star, Stethoscope } from 'lucide-react';
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
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Welcome Section */}
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            {role === 'doctor' ? `Welcome, Dr. ${user?.lastName}!` : `Welcome back, ${user?.firstName}!`}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            {role === 'patient' && 'Manage your healthcare journey from your personal dashboard. Access appointments, medical records, and communicate with your healthcare providers.'}
            {role === 'doctor' && 'Manage your practice and provide excellent patient care. View your schedule, patient records, and track your performance.'}
            {role === 'admin' && 'Oversee the healthcare platform and manage system operations. Monitor analytics, manage users, and maintain system health.'}
          </p>
        </div>
        <div className="bg-gradient-to-br from-primary to-primary/80 p-6 rounded-2xl shadow-lg">
          {role === 'doctor' ? (
            <Stethoscope className="h-10 w-10 text-primary-foreground" />
          ) : role === 'admin' ? (
            <Users className="h-10 w-10 text-primary-foreground" />
          ) : (
            <Heart className="h-10 w-10 text-primary-foreground" />
          )}
        </div>
      </div>

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickActions.map((action, index) => (
          <Card
            key={action.title}
            className="group hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border-border/50 bg-gradient-to-br from-card to-card/50"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                {action.title}
              </CardTitle>
              <div className={`bg-gradient-to-br ${index === 0 ? 'from-blue-500 to-blue-600' :
                  index === 1 ? 'from-green-500 to-green-600' :
                    index === 2 ? 'from-purple-500 to-purple-600' :
                      'from-orange-500 to-orange-600'
                } p-3 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110`}>
                <action.icon className="h-5 w-5 text-white" />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <CardDescription className="text-sm text-muted-foreground leading-relaxed">
                {action.description}
              </CardDescription>
              <Button
                asChild
                size="sm"
                className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Link href={action.href} className="font-medium">
                  Get Started
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Dashboard Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 border-border/50 bg-gradient-to-br from-card to-card/50">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-semibold text-foreground">
                  {role === 'patient' && 'Recent Appointments'}
                  {role === 'doctor' && 'Today\'s Schedule'}
                  {role === 'admin' && 'System Overview'}
                </CardTitle>
                <CardDescription className="text-muted-foreground mt-1">
                  {role === 'patient' && 'Your upcoming and recent appointments'}
                  {role === 'doctor' && 'Your appointments for today'}
                  {role === 'admin' && 'Platform statistics and activity'}
                </CardDescription>
              </div>
              <div className="bg-muted/50 p-3 rounded-xl">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-muted/50 to-muted/30 rounded-xl border border-border/50">
              <div className="space-y-1">
                <p className="font-semibold text-foreground">
                  {role === 'patient' && 'No appointments scheduled'}
                  {role === 'doctor' && 'No appointments today'}
                  {role === 'admin' && 'System running smoothly'}
                </p>
                <p className="text-sm text-muted-foreground">
                  {role === 'patient' && 'Book your first appointment with a trusted healthcare provider'}
                  {role === 'doctor' && 'Set your availability to start receiving appointments'}
                  {role === 'admin' && 'All systems operational - 99.9% uptime'}
                </p>
              </div>
              <Button
                asChild
                size="sm"
                className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-md hover:shadow-lg transition-all duration-300"
              >
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
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-gradient-to-br from-card to-card/50">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-semibold text-foreground">
                  {role === 'patient' && 'Health Overview'}
                  {role === 'doctor' && 'Patient Reviews'}
                  {role === 'admin' && 'Recent Activity'}
                </CardTitle>
                <CardDescription className="text-muted-foreground mt-1">
                  {role === 'patient' && 'Your health summary'}
                  {role === 'doctor' && 'Patient feedback'}
                  {role === 'admin' && 'Latest activities'}
                </CardDescription>
              </div>
              <div className="bg-muted/50 p-3 rounded-xl">
                {role === 'patient' ? (
                  <Heart className="h-6 w-6 text-primary" />
                ) : role === 'doctor' ? (
                  <Star className="h-6 w-6 text-primary" />
                ) : (
                  <FileText className="h-6 w-6 text-primary" />
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gradient-to-r from-muted/50 to-muted/30 rounded-lg border border-border/50">
                <div className="space-y-1">
                  <p className="font-semibold text-sm text-foreground">
                    {role === 'patient' && 'Profile Complete'}
                    {role === 'doctor' && 'No reviews yet'}
                    {role === 'admin' && 'All systems updated'}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {role === 'patient' && 'Keep information up to date'}
                    {role === 'doctor' && 'Complete appointments to get reviews'}
                    {role === 'admin' && 'Platform running latest version'}
                  </p>
                </div>
              </div>
              <Button
                asChild
                size="sm"
                variant="outline"
                className="w-full hover:bg-accent hover:text-accent-foreground transition-all duration-300"
              >
                <Link href={
                  role === 'patient' ? `/${role}/${userId}/profile` :
                    role === 'doctor' ? `/${role}/${userId}/reviews` :
                      `/${role}/${userId}/settings`
                }>
                  {role === 'patient' && 'Update Profile'}
                  {role === 'doctor' && 'View All Reviews'}
                  {role === 'admin' && 'Manage Settings'}
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}