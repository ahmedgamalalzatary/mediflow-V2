// searchSlice - Doctor Search Feature
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface SearchState {
  doctors: any[];
  filters: any;
  isLoading: boolean;
  error: string | null;
}

const initialState: SearchState = {
  doctors: [],
  filters: {},
  isLoading: false,
  error: null,
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setDoctors: (state, action: PayloadAction<any[]>) => {
      state.doctors = action.payload;
    },
    setFilters: (state, action: PayloadAction<any>) => {
      state.filters = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const searchActions = searchSlice.actions;
export const searchSelectors = {
  selectDoctors: (state: { search: SearchState }) => state.search.doctors,
  selectFilters: (state: { search: SearchState }) => state.search.filters,
  selectIsLoading: (state: { search: SearchState }) => state.search.isLoading,
  selectError: (state: { search: SearchState }) => state.search.error,
};
export default searchSlice;
