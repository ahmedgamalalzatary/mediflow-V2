'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useAuth, AuthRouteGuard } from '@/features/auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Heart,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowLeft,
  Shield,
  Stethoscope
} from 'lucide-react';

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: 'patient' as 'patient' | 'doctor'
  });
  const { signUp, isLoading, error, clearError } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();

    try {
      const result = await signUp(formData);
      if (result.type === 'auth/signUp/fulfilled') {
        // Show success message instead of redirecting
        alert('Account created successfully! Please check your email to verify your account, then sign in.');
        // Clear the form
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          role: 'patient'
        });
      }
    } catch (error) {
      console.error('Sign up error:', error);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <AuthRouteGuard>
      <div className="min-h-screen bg-background flex">{/* Left Side - Branding */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary via-primary to-primary/80 relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10 flex flex-col justify-center px-12 text-primary-foreground">
            <div className="max-w-md">
              <div className="flex items-center space-x-3 mb-8">
                <div className="bg-primary-foreground/20 p-3 rounded-xl backdrop-blur-sm border border-primary-foreground/20">
                  <Heart className="h-8 w-8 text-primary-foreground" />
                </div>
                <span className="text-2xl font-bold tracking-tight">Mediflow</span>
              </div>

              <h1 className="text-4xl font-bold mb-6 leading-tight tracking-tight">
                Join Our Healthcare Community
              </h1>

              <p className="text-xl text-primary-foreground/90 mb-8 leading-relaxed">
                Create your account to access personalized healthcare services and connect with medical professionals.
              </p>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary-foreground/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <Shield className="w-5 h-5" />
                  </div>
                  <span className="text-primary-foreground/90 font-medium">Secure and HIPAA compliant</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary-foreground/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <Stethoscope className="w-5 h-5" />
                  </div>
                  <span className="text-primary-foreground/90 font-medium">Access to verified healthcare providers</span>
                </div>
              </div>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-20 right-20 w-32 h-32 bg-primary-foreground/10 rounded-full blur-2xl"></div>
          <div className="absolute bottom-20 right-32 w-24 h-24 bg-primary-foreground/10 rounded-full blur-xl"></div>
          <div className="absolute top-1/2 right-10 w-16 h-16 bg-primary-foreground/10 rounded-full blur-lg"></div>
          <div className="absolute top-32 left-20 w-20 h-20 bg-primary-foreground/5 rounded-full blur-xl"></div>
        </div>

        {/* Right Side - Sign Up Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gradient-to-bl from-secondary/30 via-background to-background">
          <div className="w-full max-w-md space-y-8">
            <Link
              href="/"
              className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </Link>

            {/* Mobile Logo */}
            <div className="lg:hidden flex items-center justify-center space-x-2 mb-8">
              <div className="bg-gradient-to-r from-primary to-primary/80 p-3 rounded-xl shadow-lg">
                <Heart className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground tracking-tight">Mediflow</span>
            </div>

            <Card className="border border-border/50 shadow-2xl bg-card/95 backdrop-blur-sm">
              <CardHeader className="space-y-3 text-center pb-6">
                <CardTitle className="text-2xl font-bold text-foreground tracking-tight">
                  Create Your Account
                </CardTitle>
                <CardDescription className="text-muted-foreground text-base">
                  Join thousands managing their healthcare digitally
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6 pt-6">
                {error && (
                  <div className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-lg text-sm font-medium">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <Label htmlFor="firstName" className="text-foreground font-medium text-sm">First Name</Label>
                      <Input
                        id="firstName"
                        placeholder="John"
                        className="h-12 border-border/60 focus:border-primary focus:ring-2 focus:ring-primary/20 bg-background/50 transition-all duration-200"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="lastName" className="text-foreground font-medium text-sm">Last Name</Label>
                      <Input
                        id="lastName"
                        placeholder="Doe"
                        className="h-12 border-border/60 focus:border-primary focus:ring-2 focus:ring-primary/20 bg-background/50 transition-all duration-200"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="email" className="text-foreground font-medium text-sm">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        className="pl-10 h-12 border-border/60 focus:border-primary focus:ring-2 focus:ring-primary/20 bg-background/50 transition-all duration-200"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="password" className="text-foreground font-medium text-sm">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a strong password"
                        className="pl-10 pr-10 h-12 border-border/60 focus:border-primary focus:ring-2 focus:ring-primary/20 bg-background/50 transition-all duration-200"
                        value={formData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="role" className="text-foreground font-medium text-sm">I am a</Label>
                    <Select value={formData.role} onValueChange={(value: 'patient' | 'doctor') => handleInputChange('role', value)}>
                      <SelectTrigger className="h-12 border-border/60 focus:border-primary focus:ring-2 focus:ring-primary/20 bg-background/50 transition-all duration-200">
                        <SelectValue placeholder="Select your role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="patient">Patient</SelectItem>
                        <SelectItem value="doctor">Healthcare Provider</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground text-base font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5 mt-6"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Creating Account...' : 'Create Account'}
                  </Button>
                </form>

                <div className="text-center pt-4">
                  <span className="text-muted-foreground">Already have an account? </span>
                  <Link
                    href="/signin"
                    className="text-primary hover:text-primary/80 transition-colors font-semibold"
                  >
                    Sign in here
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Trust Indicators */}
            <div className="text-center space-y-3">
              <p className="text-xs text-muted-foreground font-medium">
                Protected by industry-standard encryption
              </p>
              <div className="flex items-center justify-center space-x-4 text-xs text-muted-foreground">
                <span className="flex items-center">
                  <Shield className="w-3 h-3 mr-1" />
                  HIPAA Compliant
                </span>
                <span>•</span>
                <span>SSL Secured</span>
                <span>•</span>
                <span>SOC 2 Certified</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthRouteGuard>
  );
}