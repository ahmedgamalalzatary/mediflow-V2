// authSlice - Auth Feature
// Redux slice for authentication state management

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { User } from '../types/auth.types';

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.error = null;
    },
    clearUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const authActions = authSlice.actions;

export const authSelectors = {
  selectUser: (state: { auth: AuthState }) => state.auth.user,
  selectIsAuthenticated: (state: { auth: AuthState }) => state.auth.isAuthenticated,
  selectIsLoading: (state: { auth: AuthState }) => state.auth.isLoading,
  selectError: (state: { auth: AuthState }) => state.auth.error,
};

export default authSlice;
