// Appointments feature exports
// This file serves as the main entry point for the appointments feature

// Components (selective exports for better tree-shaking)
export { AppointmentList } from './components/AppointmentList';
export { BookingModal } from './components/BookingModal';
export { AppointmentCard } from './components/AppointmentCard';
export { DoctorRequestCard } from './components/DoctorRequestCard';
export { AvailabilityCalendar } from './components/AvailabilityCalendar';

// Hooks
export { useAppointments } from './hooks/useAppointments';
export { useBooking } from './hooks/useBooking';

// Services
export { appointmentsService } from './services/appointmentsService';

// Store
export { appointmentsSlice } from './store/appointmentsSlice';

// Types
export type * from './types/appointment.types';
