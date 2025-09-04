// profileSlice - User Profile Feature
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ProfileState {
  profile: any | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: ProfileState = {
  profile: null,
  isLoading: false,
  error: null,
};

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setProfile: (state, action: PayloadAction<any>) => {
      state.profile = action.payload;
      state.error = null;
    },
    updateProfile: (state, action: PayloadAction<Partial<any>>) => {
      if (state.profile) {
        state.profile = { ...state.profile, ...action.payload };
      }
    },
    clearProfile: (state) => {
      state.profile = null;
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

export const profileActions = profileSlice.actions;
export const profileSelectors = {
  selectProfile: (state: { profile: ProfileState }) => state.profile.profile,
  selectIsLoading: (state: { profile: ProfileState }) => state.profile.isLoading,
  selectError: (state: { profile: ProfileState }) => state.profile.error,
};
export default profileSlice;
