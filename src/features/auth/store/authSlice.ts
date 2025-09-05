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
  lastAuthCheck: number | null; // Add timestamp for auth caching
}

const initialState: AuthState = {
  user: null,
  isLoading: false,
  isAuthenticated: false,
  error: null,
  lastAuthCheck: null,
};

// Async thunks
export const signIn = createAsyncThunk(
  'auth/signIn',
  async (credentials: AuthCredentials, { rejectWithValue }) => {
    const { data, error } = await authService.signIn(credentials);
    if (error) return rejectWithValue(error);
    
    // Get user profile
    if (data?.user) {
      const { data: profile, error: profileError } = await authService.getUserProfile(data.user.id);
      if (profileError) return rejectWithValue(profileError);
      
      return {
        id: data.user.id,
        email: data.user.email!,
        firstName: profile?.full_name?.split(' ')[0] || '',
        lastName: profile?.full_name?.split(' ').slice(1).join(' ') || '',
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
  async (_, { rejectWithValue, getState }) => {
    // Check if we recently fetched auth state (cache for 5 minutes)
    const state = getState() as { auth: AuthState };
    const now = Date.now();
    const fiveMinutes = 5 * 60 * 1000;
    
    if (state.auth.lastAuthCheck && 
        state.auth.user && 
        (now - state.auth.lastAuthCheck) < fiveMinutes) {
      // Return cached user data
      return state.auth.user;
    }

    const { user, error } = await authService.getCurrentUser();
    if (error) return rejectWithValue(error);
    
    if (user) {
      const { data: profile, error: profileError } = await authService.getUserProfile(user.id);
      
      // If no profile exists, create a basic user object with defaults
      if (profileError || !profile) {
        console.log('No profile found, using metadata:', user.user_metadata);
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
      state.lastAuthCheck = Date.now();
      
      // Persist auth state to local storage for navigation recovery
      if (typeof window !== 'undefined') {
        if (action.payload) {
          localStorage.setItem('mediflow_auth_cache', JSON.stringify({
            user: action.payload,
            timestamp: Date.now()
          }));
        } else {
          localStorage.removeItem('mediflow_auth_cache');
        }
      }
    },
    // Add new action to hydrate from localStorage
    hydrateAuthState: (state) => {
      if (typeof window !== 'undefined') {
        const cached = localStorage.getItem('mediflow_auth_cache');
        if (cached) {
          try {
            const { user, timestamp } = JSON.parse(cached);
            const fiveMinutes = 5 * 60 * 1000;
            
            if (Date.now() - timestamp < fiveMinutes) {
              state.user = user;
              state.isAuthenticated = true;
              state.lastAuthCheck = timestamp;
            } else {
              localStorage.removeItem('mediflow_auth_cache');
            }
          } catch (error) {
            console.warn('Failed to parse auth cache:', error);
            localStorage.removeItem('mediflow_auth_cache');
          }
        }
      }
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
        state.lastAuthCheck = Date.now(); // Update auth check timestamp
        
        // Persist to localStorage
        if (typeof window !== 'undefined' && action.payload) {
          localStorage.setItem('mediflow_auth_cache', JSON.stringify({
            user: action.payload,
            timestamp: Date.now()
          }));
        }
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
        
        // Clear localStorage on sign out
        if (typeof window !== 'undefined') {
          localStorage.removeItem('mediflow_auth_cache');
        }
      })
      .addCase(signOut.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Get Current User
      .addCase(getCurrentUser.pending, (state) => {
        // Only show loading if we don't have any existing auth state
        if (!state.user && !state.isAuthenticated) {
          state.isLoading = true;
        }
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = !!action.payload;
        state.error = null;
        state.lastAuthCheck = Date.now(); // Update auth check timestamp
        
        // Persist to localStorage
        if (typeof window !== 'undefined') {
          if (action.payload) {
            localStorage.setItem('mediflow_auth_cache', JSON.stringify({
              user: action.payload,
              timestamp: Date.now()
            }));
          } else {
            localStorage.removeItem('mediflow_auth_cache');
          }
        }
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.isAuthenticated = false;
        state.user = null;
      });
  },
});

export const { clearError, setUser, hydrateAuthState } = authSlice.actions;
export { authSlice };
export default authSlice.reducer;