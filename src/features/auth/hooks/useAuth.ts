// useAuth - Auth Feature
// Custom hook for authentication

import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { signIn, signUp, signOut, getCurrentUser, clearError } from '../store/authSlice';
import type { AuthCredentials, SignUpData } from '../types/auth.types';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const { user, isLoading, isAuthenticated, error } = useAppSelector((state) => state.auth);

  const handleSignIn = async (credentials: AuthCredentials) => {
    return dispatch(signIn(credentials));
  };

  const handleSignUp = async (userData: SignUpData) => {
    return dispatch(signUp(userData));
  };

  const handleSignOut = async () => {
    return dispatch(signOut());
  };

  const handleGetCurrentUser = async () => {
    return dispatch(getCurrentUser());
  };

  const handleClearError = () => {
    dispatch(clearError());
  };

  return {
    user,
    isLoading,
    isAuthenticated,
    error,
    signIn: handleSignIn,
    signUp: handleSignUp,
    signOut: handleSignOut,
    getCurrentUser: handleGetCurrentUser,
    clearError: handleClearError,
  };
};

export default useAuth;