// Application Constants
// Business logic constants used throughout the application

// User Roles
export const USER_ROLES = {
  PATIENT: 'patient',
  DOCTOR: 'doctor',
  ADMIN: 'admin',
} as const;

// Appointment Status
export const APPOINTMENT_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  CANCELLED: 'cancelled',
  COMPLETED: 'completed',
  RESCHEDULED: 'rescheduled',
} as const;

// Message Status
export const MESSAGE_STATUS = {
  SENT: 'sent',
  DELIVERED: 'delivered',
  READ: 'read',
} as const;

// Doctor Verification Status
export const VERIFICATION_STATUS = {
  PENDING: 'pending',
  VERIFIED: 'verified',
  REJECTED: 'rejected',
} as const;

// Medical Record Types
export const RECORD_TYPES = {
  PRESCRIPTION: 'prescription',
  LAB_RESULT: 'lab_result',
  DIAGNOSIS: 'diagnosis',
  TREATMENT_PLAN: 'treatment_plan',
  MEDICAL_HISTORY: 'medical_history',
} as const;

// Review Ratings
export const REVIEW_RATINGS = {
  MIN: 1,
  MAX: 5,
} as const;

// File Upload Limits
export const FILE_LIMITS = {
  MAX_SIZE_MB: 10,
  ALLOWED_TYPES: ['image/jpeg', 'image/png', 'application/pdf', 'text/plain'],
} as const;

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 50,
} as const;

// Routes
export const ROUTES = {
  HOME: '/',
  SIGNIN: '/signin',
  SIGNUP: '/signup',
  DASHBOARD: {
    PATIENT: '/patient',
    DOCTOR: '/doctor',
    ADMIN: '/admin',
  },
  APPOINTMENTS: '/appointments',
  PROFILE: '/profile',
  MESSAGES: '/messages',
} as const;

// API Endpoints
export const API_ENDPOINTS = {
  AUTH: '/api/auth',
  APPOINTMENTS: '/api/appointments',
  USERS: '/api/users',
  MESSAGES: '/api/messages',
  REVIEWS: '/api/reviews',
} as const;