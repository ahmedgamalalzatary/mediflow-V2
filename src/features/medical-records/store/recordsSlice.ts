// recordsSlice - Medical Records Feature
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface RecordsState {
  records: any[];
  isLoading: boolean;
  error: string | null;
}

const initialState: RecordsState = {
  records: [],
  isLoading: false,
  error: null,
};

export const recordsSlice = createSlice({
  name: 'records',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setRecords: (state, action: PayloadAction<any[]>) => {
      state.records = action.payload;
    },
    addRecord: (state, action: PayloadAction<any>) => {
      state.records.push(action.payload);
    },
    updateRecord: (state, action: PayloadAction<any>) => {
      const index = state.records.findIndex(record => record.id === action.payload.id);
      if (index !== -1) {
        state.records[index] = action.payload;
      }
    },
    removeRecord: (state, action: PayloadAction<string>) => {
      state.records = state.records.filter(record => record.id !== action.payload);
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const recordsActions = recordsSlice.actions;
export const recordsSelectors = {
  selectRecords: (state: { records: RecordsState }) => state.records.records,
  selectIsLoading: (state: { records: RecordsState }) => state.records.isLoading,
  selectError: (state: { records: RecordsState }) => state.records.error,
};
export default recordsSlice;
