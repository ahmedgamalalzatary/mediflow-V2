// useAuthState - Auth Feature
// Hook for auth state management

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { getCurrentUser, signOut } from '../store/authSlice';
import { supabase } from '@/lib/supabase';

export const useAuthState = () => {
  const dispatch = useAppDispatch();
  const { user, isAuthenticated, isLoading, lastAuthCheck } = useAppSelector((state) => state.auth);

  useEffect(() => {
    // Get initial session only if we don't have valid auth state
    const initAuth = async () => {
      try {
        // Skip if we already have recent auth data (within 5 minutes)
        const now = Date.now();
        const fiveMinutes = 5 * 60 * 1000;
        
        if (user && isAuthenticated && lastAuthCheck && (now - lastAuthCheck) < fiveMinutes) {
          console.log('Using cached auth state, skipping initialization');
          return;
        }

        // Check if we already have a session before making API call
        const { data: { session } } = await supabase.auth.getSession();
        if (session && !isLoading) {
          console.log('Initializing auth state...');
          dispatch(getCurrentUser());
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
      }
    };

    initAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state change:', event, session?.user?.id);
        if (event === 'SIGNED_IN' && session) {
          dispatch(getCurrentUser());
        } else if (event === 'SIGNED_OUT') {
          dispatch(signOut());
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [dispatch, user, isAuthenticated, lastAuthCheck, isLoading]); // Include auth state dependencies
};

export default useAuthState;