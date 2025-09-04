// reviewsSlice - Reviews Feature
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ReviewsState {
  reviews: any[];
  isLoading: boolean;
  error: string | null;
}

const initialState: ReviewsState = {
  reviews: [],
  isLoading: false,
  error: null,
};

export const reviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setReviews: (state, action: PayloadAction<any[]>) => {
      state.reviews = action.payload;
    },
    addReview: (state, action: PayloadAction<any>) => {
      state.reviews.push(action.payload);
    },
    updateReview: (state, action: PayloadAction<any>) => {
      const index = state.reviews.findIndex(review => review.id === action.payload.id);
      if (index !== -1) {
        state.reviews[index] = action.payload;
      }
    },
    removeReview: (state, action: PayloadAction<string>) => {
      state.reviews = state.reviews.filter(review => review.id !== action.payload);
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const reviewsActions = reviewsSlice.actions;
export const reviewsSelectors = {
  selectReviews: (state: { reviews: ReviewsState }) => state.reviews.reviews,
  selectIsLoading: (state: { reviews: ReviewsState }) => state.reviews.isLoading,
  selectError: (state: { reviews: ReviewsState }) => state.reviews.error,
};
export default reviewsSlice;
