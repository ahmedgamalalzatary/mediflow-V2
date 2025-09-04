# Mediflow Application Specification

## Overview

Mediflow is a healthcare management platform that connects patients with doctors for online consultations. The platform allows patients to maintain their medical history, search for doctors, schedule appointments, and communicate securely.

## Target Users

- Patients (instant signup)
- Doctors (verification required)
- Admins (platform management)

## Core Features

### 1. User Management

- **Patient Signup**: Instant registration and access
- **Doctor Signup**: Requires document verification (diploma/certification)
- **Doctor Verification**: Document upload + admin review process
- **Account Activation**: Doctors receive email after verification
- **Role-based Access**: Patients, Doctors, Admins

### 2. Patient History Management

- Comprehensive medical history recording
- Document/image upload capability
- OCR functionality to extract information from medical documents
- Medical record organization and management

### 3. Doctor Profiles & Search

- Detailed doctor profiles with specialties, qualifications, experience
- Doctor ratings and reviews (1-5 stars + comments)
- Advanced search and filtering:
    - Specialty
    - Availability
    - Ratings
    - Popularity
    - Location

### 4. Appointment System

- Patient-driven appointment requests
- Doctor workflow:
    - Accept appointments
    - Request changes to appointment data
    - Decline appointments
- Appointment details include:
    - Patient illness
    - Specific needs
    - Questions
    - Time and date preferences

### 5. Payment System

- Appointment-based payments
- Variable pricing per doctor/service
- Integrated payment processing

### 6. Communication System

- Real-time private messaging between patients and doctors
- Message history and notifications

### 7. Rating & Review System

- Post-appointment rating submission (1-5 stars)
- Written reviews and comments
- Public display of doctor ratings

### 8. Admin Panel

- Doctor verification workflow
- User management
- Support ticket system
- Analytics dashboard

## Technical Requirements

### Frontend

- Next.js 15+ with App Router
- TypeScript V5
- Tailwind CSS V4
- chadcn/ui component library
- RTX + RTXQ ecosystem for state management
- Supabase JavaScript client for database operations

### Backend

- Supabase Database (PostgreSQL)
- Supabase Auth for authentication and user management
- Supabase Storage for medical documents and file uploads
- Supabase Edge Functions for serverless API logic
- Supabase Realtime for live messaging and notifications
- OCR processing (Tesseract.js or integrated via Edge Functions)
- Payment processing (Stripe integration via Edge Functions)

### Accessibility

- 100% compliance with accessibility standards
- Support for disabled users

### Security

- HIPAA/GDPR compliant data handling
- Supabase Row Level Security (RLS) for data protection
- Supabase Auth with JWT tokens
- Encrypted data storage via Supabase
- Secure file uploads via Supabase Storage

## Database Schema

### Users Table (Supabase Auth + Custom Profile)

- Supabase Auth users table for authentication
- Custom profiles table for additional user data
- Profile information (name, contact details, etc.)
- User type (patient/doctor/admin)
- Verification status
- Account status

### Medical Records Table

- Patient medical history data
- Document references (Supabase Storage URLs)
- OCR extracted information
- Foreign key to user profiles

### Doctors Table

- Specialty information
- Qualifications and experience
- Availability schedules
- Pricing information
- Rating data
- Foreign key to user profiles

### Appointments Table

- Appointment details
- Status tracking (requested, accepted, declined, rescheduled)
- Payment information
- Timestamps
- Foreign keys to patient and doctor profiles

### Messages Table

- Chat history between patients and doctors
- Message metadata (timestamps, read status)
- Real-time subscriptions via Supabase Realtime
- Foreign keys to sender and receiver

### Reviews Table

- Rating details (1-5 stars)
- Review text
- Associated appointment reference
- Foreign keys to appointment and reviewer

## Development Phases

### Phase 1: Foundation

- Supabase project setup and configuration
- Supabase Auth integration
- Basic UI with chadcn/ui components
- Database schema creation with RLS policies
- Landing, login, and signup pages

### Phase 2: Core Functionality

- Patient history management with Supabase Storage
- Doctor profiles and verification workflow
- Search and filtering with Supabase queries

### Phase 3: Appointment System

- Appointment requests with Supabase database
- Doctor approval workflow
- Payment integration via Supabase Edge Functions

### Phase 4: Communication & Reviews

- Real-time messaging with Supabase Realtime
- Rating and review system

### Phase 5: Admin Panel

- Doctor verification
- User management
- Support system

### Phase 6: Polish & Optimization

- Accessibility compliance
- Performance optimization
- Testing and bug fixes

## Future Considerations

- Video consultation capabilities
- Integration with third-party services
- Mobile application development
- Advanced analytics and reporting
