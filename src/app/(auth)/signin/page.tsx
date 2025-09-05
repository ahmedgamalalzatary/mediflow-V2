'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useAuth, AuthRouteGuard } from '@/features/auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
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

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn, isLoading, error, clearError } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();

    try {
      const result = await signIn({ email, password });
      if (result.type === 'auth/signIn/fulfilled') {
        const user = result.payload;
        // Redirect based on user role and ID
        router.push(`/${user.role}/${user.id}`);
      }
    } catch (error) {
      console.error('Sign in error:', error);
    }
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
                Welcome Back to Your Health Journey
              </h1>

              <p className="text-xl text-primary-foreground/90 mb-8 leading-relaxed">
                Access your medical records, connect with doctors, and manage your healthcare all in one secure platform.
              </p>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary-foreground/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <Shield className="w-5 h-5" />
                  </div>
                  <span className="text-primary-foreground/90 font-medium">Bank-level security for your data</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary-foreground/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <Stethoscope className="w-5 h-5" />
                  </div>
                  <span className="text-primary-foreground/90 font-medium">Connect with verified healthcare providers</span>
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

        {/* Right Side - Sign In Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gradient-to-bl from-secondary/30 via-background to-background">
          <div className="w-full max-w-md space-y-8">
            {/* Back to Home Link */}
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
                  Sign In to Your Account
                </CardTitle>
                <CardDescription className="text-muted-foreground text-base">
                  Enter your credentials to access your healthcare dashboard
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6 pt-6">
                {error && (
                  <div className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-lg text-sm font-medium">
                    {error}
                  </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-3">
                    <Label htmlFor="email" className="text-foreground font-medium text-sm">
                      Email Address
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        className="pl-10 h-12 border-border/60 focus:border-primary focus:ring-2 focus:ring-primary/20 bg-background/50 transition-all duration-200"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="password" className="text-foreground font-medium text-sm">
                      Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        className="pl-10 pr-10 h-12 border-border/60 focus:border-primary focus:ring-2 focus:ring-primary/20 bg-background/50 transition-all duration-200"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center space-x-2">
                      <input
                        id="remember"
                        type="checkbox"
                        className="w-4 h-4 text-primary border-border/60 rounded focus:ring-primary/20 focus:ring-2"
                      />
                      <Label htmlFor="remember" className="text-sm text-muted-foreground font-medium">
                        Remember me
                      </Label>
                    </div>
                    <Link
                      href="/forgot-password"
                      className="text-sm text-primary hover:text-primary/80 transition-colors font-medium"
                    >
                      Forgot password?
                    </Link>
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground text-base font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Signing In...' : 'Sign In to Dashboard'}
                  </Button>
                </form>

                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <Separator className="w-full bg-border/60" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-3 text-muted-foreground font-medium">Or continue with</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" className="h-11 border-border/60 hover:border-border hover:bg-accent/50 transition-all duration-200">
                    <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                      <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                    Google
                  </Button>
                  <Button variant="outline" className="h-11 border-border/60 hover:border-border hover:bg-accent/50 transition-all duration-200">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                    Facebook
                  </Button>
                </div>

                <div className="text-center pt-4">
                  <span className="text-muted-foreground">Don&apos;t have an account? </span>
                  <Link
                    href="/signup"
                    className="text-primary hover:text-primary/80 transition-colors font-semibold"
                  >
                    Sign up here
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