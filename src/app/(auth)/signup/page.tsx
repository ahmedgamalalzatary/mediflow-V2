'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useAuth } from '@/features/auth';
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
  User,
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
  const router = useRouter();

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
    <div className="min-h-screen bg-background flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 healthcare-gradient-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 flex flex-col justify-center px-12 text-white">
          <div className="max-w-md">
            <div className="flex items-center space-x-3 mb-8">
              <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <span className="text-2xl font-bold">Mediflow</span>
            </div>
            
            <h1 className="text-4xl font-bold mb-6 leading-tight">
              Join Our Healthcare Community
            </h1>
            
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Create your account to access personalized healthcare services and connect with medical professionals.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <Shield className="w-4 h-4" />
                </div>
                <span className="text-white/90">Secure and HIPAA compliant</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <Stethoscope className="w-4 h-4" />
                </div>
                <span className="text-white/90">Access to verified healthcare providers</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Sign Up Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          <Link 
            href="/" 
            className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>

          <Card className="healthcare-card border-0 shadow-xl">
            <CardHeader className="space-y-2 text-center">
              <CardTitle className="text-2xl font-bold text-foreground">
                Create Your Account
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Join thousands managing their healthcare digitally
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {error && (
                <div className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-md text-sm">
                  {error}
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      placeholder="John"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      placeholder="Doe"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a strong password"
                      className="pr-10"
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="role">I am a</Label>
                  <Select value={formData.role} onValueChange={(value: 'patient' | 'doctor') => handleInputChange('role', value)}>
                    <SelectTrigger>
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
                  className="w-full healthcare-button-primary"
                  disabled={isLoading}
                >
                  {isLoading ? 'Creating Account...' : 'Create Account'}
                </Button>
              </form>

              <div className="text-center">
                <span className="text-muted-foreground">Already have an account? </span>
                <Link 
                  href="/signin" 
                  className="text-primary hover:text-primary/80 transition-colors font-medium"
                >
                  Sign in here
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}