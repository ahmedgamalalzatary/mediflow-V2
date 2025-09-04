// Reviews feature exports
// This file serves as the main entry point for the reviews feature

// Components (selective exports for better tree-shaking)
export { ReviewForm } from './components/ReviewForm';
export { DoctorReviewsList } from './components/DoctorReviewsList';
export { ReviewCard } from './components/ReviewCard';

// Hooks
export { useReviews } from './hooks/useReviews';

// Services
export { reviewsService } from './services/reviewsService';

// Store
export { reviewsSlice } from './store/reviewsSlice';

// Types
export type * from './types/reviews.types';
