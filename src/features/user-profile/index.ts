// User Profile feature exports
// This file serves as the main entry point for the user profile feature

// Components (selective exports for better tree-shaking)
export { PatientProfileForm } from './components/PatientProfileForm';
export { DoctorProfileForm } from './components/DoctorProfileForm';
export { ProfileSettings } from './components/ProfileSettings';

// Hooks
export { useProfile } from './hooks/useProfile';

// Services
export { profileService } from './services/profileService';

// Store
export { profileSlice } from './store/profileSlice';

// Types
export type * from './types/profile.types';
