// useAuthState - Auth Feature
// Hook for auth state management

import { useEffect } from 'react';
import { useAppDispatch } from '@/hooks/redux';
import { getCurrentUser, signOut } from '../store/authSlice';
import { supabase } from '@/lib/supabase';

export const useAuthState = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Get initial session
    const initAuth = async () => {
      try {
        console.log('Initializing auth state...');
        dispatch(getCurrentUser());
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
  }, [dispatch]); // Only depend on dispatch, which is stable
};

export default useAuthState;