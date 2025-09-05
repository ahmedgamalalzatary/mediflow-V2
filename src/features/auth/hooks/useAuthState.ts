// useAuthState - Auth Feature
// Hook for auth state management

'use client';

import { useEffect, useRef } from 'react';
import { useAppDispatch } from '@/hooks/redux';
import { getCurrentUser, setUser, hydrateAuthState } from '../store/authSlice';
import { supabase } from '@/lib/supabase';

export const useAuthState = () => {
  const dispatch = useAppDispatch();
  const initialized = useRef(false);

  // Effect 1: Initialize auth state (runs once)
  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    // First, try to hydrate from localStorage cache
    dispatch(hydrateAuthState());
    
    // Get initial session after a small delay
    const initAuth = async () => {
      try {
        // Small delay to allow hydration to complete first
        await new Promise(resolve => setTimeout(resolve, 100));
        
        // Check if we already have a session before making API call
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          console.log('Initializing auth state...');
          dispatch(getCurrentUser());
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
      }
    };

    initAuth();
  }, [dispatch]); // Only depend on dispatch

  // Effect 2: Auth state change listener (runs once)
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state change:', event, session?.user?.id);
        
        if (event === 'SIGNED_IN' && session) {
          dispatch(getCurrentUser());
        } else if (event === 'SIGNED_OUT') {
          // Don't dispatch signOut() to avoid circular dependency
          // Just update the state directly
          dispatch(setUser(null));
        } else if (event === 'TOKEN_REFRESHED' && session) {
          // Token refreshed - just dispatch getCurrentUser if needed
          dispatch(getCurrentUser());
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [dispatch]); // Only depend on stable dispatch
};

export default useAuthState;