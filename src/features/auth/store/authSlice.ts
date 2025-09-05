// authSlice - Auth Feature
// Redux slice for authentication state management

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { authService } from '../services/authService';
import type { User, AuthCredentials, SignUpData } from '../types/auth.types';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isLoading: false,
  isAuthenticated: false,
  error: null,
};

// Async thunks
export const signIn = createAsyncThunk(
  'auth/signIn',
  async (credentials: AuthCredentials, { rejectWithValue }) => {
    const { data, error } = await authService.signIn(credentials);
    if (error) return rejectWithValue(error);
    
    // Get user profile
    if (data.user) {
      const { data: profile, error: profileError } = await authService.getUserProfile(data.user.id);
      if (profileError) return rejectWithValue(profileError);
      
      return {
        id: data.user.id,
        email: data.user.email!,
        firstName: profile?.first_name || '',
        lastName: profile?.last_name || '',
        role: profile?.role || 'patient',
        isEmailVerified: data.user.email_confirmed_at !== null,
        createdAt: data.user.created_at,
        updatedAt: data.user.updated_at || data.user.created_at,
      } as User;
    }
    return rejectWithValue('User data not found');
  }
);

export const signUp = createAsyncThunk(
  'auth/signUp',
  async (userData: SignUpData, { rejectWithValue }) => {
    const { data, error } = await authService.signUp(userData);
    if (error) return rejectWithValue(error);
    return data;
  }
);

export const signOut = createAsyncThunk(
  'auth/signOut',
  async (_, { rejectWithValue }) => {
    const { error } = await authService.signOut();
    if (error) return rejectWithValue(error);
    return null;
  }
);

export const getCurrentUser = createAsyncThunk(
  'auth/getCurrentUser',
  async (_, { rejectWithValue }) => {
    const { user, error } = await authService.getCurrentUser();
    if (error) return rejectWithValue(error);
    
    if (user) {
      const { data: profile, error: profileError } = await authService.getUserProfile(user.id);
      
      // If no profile exists, create a basic user object with defaults
      if (profileError || !profile) {
        return {
          id: user.id,
          email: user.email!,
          firstName: user.user_metadata?.first_name || '',
          lastName: user.user_metadata?.last_name || '',
          role: user.user_metadata?.role || 'patient',
          isEmailVerified: user.email_confirmed_at !== null,
          createdAt: user.created_at,
          updatedAt: user.updated_at || user.created_at,
        } as User;
      }
      
      return {
        id: user.id,
        email: user.email!,
        firstName: profile.full_name?.split(' ')[0] || '',
        lastName: profile.full_name?.split(' ').slice(1).join(' ') || '',
        role: profile.role || 'patient',
        isEmailVerified: user.email_confirmed_at !== null,
        createdAt: user.created_at,
        updatedAt: user.updated_at || user.created_at,
      } as User;
    }
    return null;
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Sign In
      .addCase(signIn.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.isAuthenticated = false;
        state.user = null;
      })
      // Sign Up
      .addCase(signUp.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signUp.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Sign Out
      .addCase(signOut.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signOut.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = null;
      })
      .addCase(signOut.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Get Current User
      .addCase(getCurrentUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = !!action.payload;
        state.error = null;
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.isAuthenticated = false;
        state.user = null;
      });
  },
});

export const { clearError, setUser } = authSlice.actions;
export { authSlice };
export default authSlice.reducer;