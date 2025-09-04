// Medical Records feature exports
// This file serves as the main entry point for the medical records feature

// Components (selective exports for better tree-shaking)
export { MedicalRecordCard } from './components/MedicalRecordCard';
export { UploadRecordModal } from './components/UploadRecordModal';
export { RecordsList } from './components/RecordsList';

// Hooks
export { useMedicalRecords } from './hooks/useMedicalRecords';

// Services
export { recordsService } from './services/recordsService';

// Store
export { recordsSlice } from './store/recordsSlice';

// Types
export type * from './types/records.types';
