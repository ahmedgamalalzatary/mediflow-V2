# Mediflow MVP Application Specification

## Overview

Mediflow is a healthcare management platform that connects patients with doctors for appointment booking and basic communication. This MVP focuses on core appointment management functionality with simple medical record storage and text-based communication.

## Target Users (MVP Scope)

- **Patients**: Instant registration and access to book appointments
- **Doctors**: Registration with basic verification (simplified for MVP)
- **Admins**: Backend only (no UI in MVP)

## Core MVP Features

### 1. Authentication & User Management

- **Patient Signup**: Instant registration and access
- **Doctor Signup**: Basic registration (verification simplified for MVP)
- **Role-based Access**: Patients and Doctors only
- **Profile Management**: Basic personal information updates

### 2. Doctor Discovery & Search

- Search and filter doctors by specialty
- View doctor profiles with:
  - Specializations
  - Basic qualifications
  - Availability schedule
  - Consultation rates
  - Ratings from previous patients

### 3. Appointment Management

**Patient Features:**

- Create appointment requests with specific doctors
- Edit appointment time/date (subject to doctor approval)
- Cancel booked appointments
- View appointment history

**Doctor Features:**

- Receive and manage appointment requests
- Accept, decline, or propose changes to appointments
- Update availability schedule
- Update consultation pricing

### 4. Basic Medical Records

- Save and view personal medical records (text-based)
- Simple file uploads (documents, images)
- Basic organization and management
- **Excluded from MVP**: OCR functionality

### 5. Communication System

- Text-only chat between patient and doctor
- Available after appointment confirmation
- Message history
- **Excluded from MVP**: Video/audio calls

### 6. Review & Rating System

- Post-appointment reviews (1-5 stars + comments)
- Display doctor ratings publicly
- Review history management

## Features Explicitly Excluded from MVP

To maintain focus on core functionality, the following are **NOT** included in this version:

- ❌ **Admin Panel UI** (backend only for future)
- ❌ **Payment System Integration** (manual payment coordination)
- ❌ **OCR Document Processing**
- ❌ **Video/Audio Consultations**
- ❌ **Advanced Analytics**
- ❌ **Complex Doctor Verification Process**
- ❌ **Advanced Search Filters** (location, popularity)
- ❌ **Real-time Notifications** (basic email notifications only)## Technical Requirements (MVP)

### Frontend

- Next.js 15+ with App Router
- TypeScript V5
- Tailwind CSS V4
- shadcn/ui component library
- Redux Toolkit for state management
- Supabase JavaScript client for database operations

### Backend

- Supabase Database (PostgreSQL)
- Supabase Auth for authentication and user management
- Supabase Storage for medical documents and file uploads
- **Simplified for MVP**: Basic Edge Functions only as needed
- **Excluded**: Complex OCR processing
- **Excluded**: Payment processing integration

### Security (MVP Scope)

- Basic data protection with Supabase RLS
- Supabase Auth with JWT tokens
- Secure file uploads via Supabase Storage
- **Future**: Full HIPAA/GDPR compliance

## Database Schema (MVP)

### Users Table (Supabase Auth + Custom Profile)

- Supabase Auth users table for authentication
- Custom profiles table for additional user data
- Profile information (name, contact details, bio)
- User type (patient/doctor)
- Basic verification status
- Account status

### Medical Records Table

- Patient medical history data (text-based)
- Document references (Supabase Storage URLs)
- **Excluded**: OCR extracted information
- Foreign key to user profiles

### Doctors Table

- Specialty information
- Basic qualifications
- Availability schedules
- Pricing information (hourly rates)
- Rating data (aggregated from reviews)
- Foreign key to user profiles

### Appointments Table

- Appointment details
- Status tracking (requested, accepted, declined, rescheduled, completed)
- **Excluded**: Payment information (manual coordination)
- Timestamps
- Foreign keys to patient and doctor profiles

### Messages Table

- Text-only chat history between patients and doctors
- Message metadata (timestamps, read status)
- **Simplified**: Basic real-time subscriptions
- Foreign keys to sender and receiver

### Reviews Table

- Rating details (1-5 stars)
- Review text
- Associated appointment reference
- Foreign keys to appointment and reviewer

## Feature Architecture Implementation

Based on the MVP requirements, we have implemented a **feature-based architecture** with the following structure:

### ✅ Implemented Features

#### 1. **Auth Feature** (`/features/auth/`)

- **Components**: SignInForm, SignUpForm, ForgotPasswordForm, ResetPasswordForm, VerifyEmailForm
- **Hooks**: useAuth, useAuthState
- **Services**: authService (Supabase Auth integration)
- **Store**: authSlice (Redux Toolkit)
- **Types**: Complete authentication type definitions

#### 2. **Appointments Feature** (`/features/appointments/`)

- **Components**: AppointmentList, BookingModal, AppointmentCard, DoctorRequestCard, AvailabilityCalendar
- **Hooks**: useAppointments, useBooking
- **Services**: appointmentsService
- **Store**: appointmentsSlice
- **Types**: Appointment management types

#### 3. **Doctor Search Feature** (`/features/doctor-search/`)

- **Components**: DoctorSearchFilters, DoctorResultCard, DoctorsList, DoctorProfile
- **Hooks**: useDoctorSearch
- **Services**: searchService
- **Store**: searchSlice
- **Types**: Doctor search and filtering types

#### 4. **User Profile Feature** (`/features/user-profile/`)

- **Components**: PatientProfileForm, DoctorProfileForm, ProfileSettings
- **Hooks**: useProfile
- **Services**: profileService
- **Store**: profileSlice
- **Types**: Profile management types

#### 5. **Medical Records Feature** (`/features/medical-records/`)

- **Components**: MedicalRecordCard, UploadRecordModal, RecordsList
- **Hooks**: useMedicalRecords
- **Services**: recordsService
- **Store**: recordsSlice
- **Types**: Medical records types (simplified, no OCR)

#### 6. **Reviews Feature** (`/features/reviews/`)

- **Components**: ReviewForm, DoctorReviewsList, ReviewCard
- **Hooks**: useReviews
- **Services**: reviewsService
- **Store**: reviewsSlice
- **Types**: Rating and review types

#### 7. **Chat Feature** (`/features/chat/`)

- **Components**: ChatWindow, MessageBubble, ChatList
- **Hooks**: useChat
- **Services**: chatService (text-only messaging)
- **Store**: chatSlice
- **Types**: Text-based chat types

### 🏗️ Shared Infrastructure

#### **Components**

- **UI Components**: shadcn/ui library (pre-built)
- **Shared Components**: Navbar, Sidebar, Footer

#### **Global Utilities**

- **Hooks**: useDebounce, useLocalStorage
- **Types**: database.types (Supabase generated)
- **Store**: Centralized Redux store with feature slice integration

## MVP Development Phases

### Phase 1: Foundation ✅ **COMPLETED**

- ✅ Feature-based architecture setup
- ✅ Component wireframes created
- ✅ Type definitions established
- ✅ Store structure configured
- 🔄 **Next**: Supabase project setup

### Phase 2: Authentication & Profiles

- 🔄 **In Progress**: Supabase Auth integration
- 🔄 **Next**: User registration and login flows
- 🔄 **Next**: Basic profile management

### Phase 3: Doctor Discovery

- 🔄 **Next**: Doctor search functionality
- 🔄 **Next**: Profile viewing and filtering
- 🔄 **Next**: Basic doctor verification

### Phase 4: Appointment System

- 🔄 **Next**: Appointment booking flow
- 🔄 **Next**: Doctor approval workflow
- 🔄 **Next**: Appointment management

### Phase 5: Communication & Records

- 🔄 **Next**: Text-based chat system
- 🔄 **Next**: Basic medical records
- 🔄 **Next**: Review system

### Phase 6: Polish & Testing

- 🔄 **Future**: UI/UX improvements
- 🔄 **Future**: Testing and bug fixes
- 🔄 **Future**: Basic accessibility compliance

## Future Considerations (Post-MVP)

Features planned for future releases:

- 🔮 **Admin Panel UI** (currently backend only)
- 🔮 **Payment System Integration** (Stripe/PayPal)
- 🔮 **OCR Document Processing** for medical records
- 🔮 **Video/Audio Consultations**
- 🔮 **Advanced Doctor Verification** workflow
- 🔮 **Real-time Notifications** system
- 🔮 **Advanced Search Filters** (location, popularity)
- 🔮 **Mobile Application**
- 🔮 **Analytics Dashboard**
- 🔮 **Full HIPAA/GDPR Compliance**
- 🔮 **Integration with third-party medical services**

## Key Architecture Benefits

✅ **Feature-Based Organization**: Each business domain is self-contained
✅ **Scalable Structure**: Easy to add new features without affecting existing ones
✅ **Developer Experience**: Intuitive file organization and clear boundaries
✅ **Team Collaboration**: Different developers can work on different features
✅ **Future-Ready**: Structure supports microservice extraction if needed

## Current Status

🏗️ **Architecture**: Complete wireframe structure implemented
🔄 **Implementation**: Ready for feature development
🎯 **Next Steps**: Begin with Authentication feature implementation and Supabase setup
