// Root Reducer - Combines all feature reducers
// This file will combine all the feature slices

import { combineReducers } from '@reduxjs/toolkit';

// Import all feature slices
import { authSlice } from '@/features/auth/store/authSlice';
import { appointmentsSlice } from '@/features/appointments/store/appointmentsSlice';
import { chatSlice } from '@/features/chat/store/chatSlice';
import { searchSlice } from '@/features/doctor-search/store/searchSlice';
import { recordsSlice } from '@/features/medical-records/store/recordsSlice';
import { reviewsSlice } from '@/features/reviews/store/reviewsSlice';
import { profileSlice } from '@/features/user-profile/store/profileSlice';

export const rootReducer = combineReducers({
  auth: authSlice.reducer,
  appointments: appointmentsSlice.reducer,
  chat: chatSlice.reducer,
  search: searchSlice.reducer,
  records: recordsSlice.reducer,
  reviews: reviewsSlice.reducer,
  profile: profileSlice.reducer,
});

export default rootReducer;
