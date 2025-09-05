// authService - Auth Feature
// Service layer for authentication API calls

import { supabase } from '@/lib/supabase';
import type { SignUpData, AuthCredentials } from '../types/auth.types';

export class AuthService {
  async signIn(credentials: AuthCredentials) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password,
      });

      if (error) throw error;
      return { data, error: null };
    } catch (error: any) {
      return { data: null, error: error.message };
    }
  }
  
  async signUp(userData: SignUpData) {
    try {
      console.log('Attempting signup with data:', {
        email: userData.email,
        metadata: {
          full_name: `${userData.firstName} ${userData.lastName}`,
          first_name: userData.firstName,
          last_name: userData.lastName,
          role: userData.role,
        }
      });

      const { data, error } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
        options: {
          data: {
            full_name: `${userData.firstName} ${userData.lastName}`,
            first_name: userData.firstName,
            last_name: userData.lastName,
            role: userData.role,
          }
        }
      });

      console.log('Supabase signup response:', { data, error });

      if (error) {
        console.error('Supabase signup error:', error);
        throw error;
      }
      return { data, error: null };
    } catch (error: any) {
      console.error('Auth service signup error:', error);
      return { data: null, error: error.message };
    }
  }
  
  async signOut() {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      return { error: null };
    } catch (error: any) {
      return { error: error.message };
    }
  }
  
  async forgotPassword(email: string) {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (error) throw error;
      return { error: null };
    } catch (error: any) {
      return { error: error.message };
    }
  }
  
  async resetPassword(newPassword: string) {
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });
      if (error) throw error;
      return { error: null };
    } catch (error: any) {
      return { error: error.message };
    }
  }

  async getCurrentUser() {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) throw error;
      return { user, error: null };
    } catch (error: any) {
      return { user: null, error: error.message };
    }
  }

  async getUserProfile(userId: string) {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle(); // Use maybeSingle() instead of single() to handle missing profiles
      
      if (error) throw error;
      return { data, error: null };
    } catch (error: any) {
      return { data: null, error: error.message };
    }
  }
}

export const authService = new AuthService();
export default authService;
