// Doctor Search feature exports
// This file serves as the main entry point for the doctor search feature

// Components (selective exports for better tree-shaking)
export { DoctorSearchFilters } from './components/DoctorSearchFilters';
export { DoctorResultCard } from './components/DoctorResultCard';
export { DoctorsList } from './components/DoctorsList';
export { DoctorProfile } from './components/DoctorProfile';

// Hooks
export { useDoctorSearch } from './hooks/useDoctorSearch';

// Services
export { searchService } from './services/searchService';

// Store
export { searchSlice } from './store/searchSlice';

// Types
export type * from './types/search.types';
