// useAuthState - Auth Feature
// Hook for auth state management

import { useEffect } from 'react';
import { useAuth } from './useAuth';
import { supabase } from '@/lib/supabase';

export const useAuthState = () => {
  const { getCurrentUser, signOut } = useAuth();

  useEffect(() => {
    // Get initial session
    getCurrentUser();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session) {
          getCurrentUser();
        } else if (event === 'SIGNED_OUT') {
          signOut();
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [getCurrentUser, signOut]);
};

export default useAuthState;