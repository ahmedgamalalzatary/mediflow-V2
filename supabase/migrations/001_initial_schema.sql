-- Mediflow Initial Database Schema
-- Healthcare Management Platform Database Structure

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Create custom types
CREATE TYPE user_role AS ENUM ('patient', 'doctor', 'admin');
CREATE TYPE appointment_status AS ENUM ('pending', 'confirmed', 'cancelled', 'completed', 'rescheduled');
CREATE TYPE verification_status AS ENUM ('pending', 'verified', 'rejected');
CREATE TYPE message_status AS ENUM ('sent', 'delivered', 'read');
CREATE TYPE record_type AS ENUM ('prescription', 'lab_result', 'diagnosis', 'treatment_plan', 'medical_history');

-- =============================================
-- PROFILES TABLE (extends auth.users)
-- =============================================
CREATE TABLE profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    avatar_url TEXT,
    phone TEXT,
    date_of_birth DATE,
    gender TEXT CHECK (gender IN ('male', 'female', 'other', 'prefer_not_to_say')),
    address JSONB, -- {street, city, state, zip, country}
    role user_role NOT NULL DEFAULT 'patient',
    is_active BOOLEAN DEFAULT true,
    email_verified BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- DOCTORS TABLE (doctor-specific information)
-- =============================================
CREATE TABLE doctors (
    id UUID REFERENCES profiles(id) ON DELETE CASCADE PRIMARY KEY,
    license_number TEXT UNIQUE NOT NULL,
    specialties TEXT[] NOT NULL, -- Array of specialties
    qualifications TEXT[] NOT NULL, -- Array of qualifications/degrees
    experience_years INTEGER DEFAULT 0,
    bio TEXT,
    consultation_fee DECIMAL(10,2) DEFAULT 0,
    verification_status verification_status DEFAULT 'pending',
    verification_documents JSONB, -- URLs to verification documents
    verified_at TIMESTAMPTZ,
    verified_by UUID REFERENCES profiles(id),
    rating DECIMAL(3,2) DEFAULT 0.0 CHECK (rating >= 0 AND rating <= 5),
    total_reviews INTEGER DEFAULT 0,
    languages TEXT[] DEFAULT ARRAY['English'],
    hospital_affiliations TEXT[],
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- DOCTOR AVAILABILITY TABLE
-- =============================================
CREATE TABLE doctor_availability (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    doctor_id UUID REFERENCES doctors(id) ON DELETE CASCADE NOT NULL,
    day_of_week INTEGER NOT NULL CHECK (day_of_week >= 0 AND day_of_week <= 6), -- 0=Sunday, 6=Saturday
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    is_available BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(doctor_id, day_of_week, start_time)
);

-- =============================================
-- APPOINTMENTS TABLE
-- =============================================
CREATE TABLE appointments (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    patient_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    doctor_id UUID REFERENCES doctors(id) ON DELETE CASCADE NOT NULL,
    appointment_date DATE NOT NULL,
    appointment_time TIME NOT NULL,
    duration_minutes INTEGER DEFAULT 30,
    status appointment_status DEFAULT 'pending',
    reason_for_visit TEXT,
    notes TEXT, -- Doctor's notes after appointment
    patient_notes TEXT, -- Patient's additional notes
    consultation_fee DECIMAL(10,2),
    cancelled_by UUID REFERENCES profiles(id),
    cancellation_reason TEXT,
    rescheduled_from UUID REFERENCES appointments(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    -- Ensure no double booking
    CONSTRAINT no_double_booking UNIQUE(doctor_id, appointment_date, appointment_time)
);

-- =============================================
-- MEDICAL RECORDS TABLE
-- =============================================
CREATE TABLE medical_records (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    patient_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    doctor_id UUID REFERENCES doctors(id), -- Optional: which doctor created this record
    appointment_id UUID REFERENCES appointments(id), -- Optional: related appointment
    title TEXT NOT NULL,
    description TEXT,
    record_type record_type NOT NULL,
    record_date DATE NOT NULL,
    file_urls TEXT[], -- Array of file URLs from Supabase Storage
    metadata JSONB, -- Additional structured data
    is_private BOOLEAN DEFAULT false, -- Patient can mark records as private
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- MESSAGES TABLE (Chat System)
-- =============================================
CREATE TABLE messages (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    conversation_id UUID NOT NULL, -- Unique ID for patient-doctor conversation
    sender_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    receiver_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    appointment_id UUID REFERENCES appointments(id), -- Optional: related appointment
    content TEXT NOT NULL,
    message_type TEXT DEFAULT 'text' CHECK (message_type IN ('text', 'file', 'image')),
    file_url TEXT, -- For file/image messages
    status message_status DEFAULT 'sent',
    read_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- REVIEWS TABLE
-- =============================================
CREATE TABLE reviews (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    patient_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    doctor_id UUID REFERENCES doctors(id) ON DELETE CASCADE NOT NULL,
    appointment_id UUID REFERENCES appointments(id) ON DELETE CASCADE NOT NULL,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    is_anonymous BOOLEAN DEFAULT false,
    is_published BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    -- One review per appointment
    UNIQUE(appointment_id)
);

-- =============================================
-- ADMIN LOGS TABLE (for admin actions tracking)
-- =============================================
CREATE TABLE admin_logs (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    admin_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    action TEXT NOT NULL,
    target_type TEXT NOT NULL, -- 'user', 'doctor', 'appointment', etc.
    target_id UUID NOT NULL,
    details JSONB,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- INDEXES for Performance
-- =============================================

-- Profiles indexes
CREATE INDEX idx_profiles_role ON profiles(role);
CREATE INDEX idx_profiles_email ON profiles(email);
CREATE INDEX idx_profiles_created_at ON profiles(created_at);

-- Doctors indexes
CREATE INDEX idx_doctors_specialties ON doctors USING GIN(specialties);
CREATE INDEX idx_doctors_verification_status ON doctors(verification_status);
CREATE INDEX idx_doctors_rating ON doctors(rating DESC);

-- Appointments indexes
CREATE INDEX idx_appointments_patient_id ON appointments(patient_id);
CREATE INDEX idx_appointments_doctor_id ON appointments(doctor_id);
CREATE INDEX idx_appointments_date ON appointments(appointment_date);
CREATE INDEX idx_appointments_status ON appointments(status);
CREATE INDEX idx_appointments_datetime ON appointments(appointment_date, appointment_time);

-- Medical records indexes
CREATE INDEX idx_medical_records_patient_id ON medical_records(patient_id);
CREATE INDEX idx_medical_records_doctor_id ON medical_records(doctor_id);
CREATE INDEX idx_medical_records_type ON medical_records(record_type);
CREATE INDEX idx_medical_records_date ON medical_records(record_date DESC);

-- Messages indexes
CREATE INDEX idx_messages_conversation_id ON messages(conversation_id);
CREATE INDEX idx_messages_sender_id ON messages(sender_id);
CREATE INDEX idx_messages_receiver_id ON messages(receiver_id);
CREATE INDEX idx_messages_created_at ON messages(created_at DESC);

-- Reviews indexes
CREATE INDEX idx_reviews_doctor_id ON reviews(doctor_id);
CREATE INDEX idx_reviews_patient_id ON reviews(patient_id);
CREATE INDEX idx_reviews_rating ON reviews(rating DESC);

-- =============================================
-- FUNCTIONS AND TRIGGERS
-- =============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply updated_at triggers to all tables
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_doctors_updated_at BEFORE UPDATE ON doctors FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_doctor_availability_updated_at BEFORE UPDATE ON doctor_availability FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_appointments_updated_at BEFORE UPDATE ON appointments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_medical_records_updated_at BEFORE UPDATE ON medical_records FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_messages_updated_at BEFORE UPDATE ON messages FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_reviews_updated_at BEFORE UPDATE ON reviews FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to update doctor rating when new review is added
CREATE OR REPLACE FUNCTION update_doctor_rating()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE doctors 
    SET 
        rating = (
            SELECT ROUND(AVG(rating)::numeric, 2)
            FROM reviews 
            WHERE doctor_id = NEW.doctor_id AND is_published = true
        ),
        total_reviews = (
            SELECT COUNT(*)
            FROM reviews 
            WHERE doctor_id = NEW.doctor_id AND is_published = true
        )
    WHERE id = NEW.doctor_id;
    
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to update doctor rating on review insert/update
CREATE TRIGGER update_doctor_rating_trigger 
    AFTER INSERT OR UPDATE ON reviews 
    FOR EACH ROW 
    EXECUTE FUNCTION update_doctor_rating();

-- Function to create profile when user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, email, full_name, role)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
        COALESCE(NEW.raw_user_meta_data->>'role', 'patient')::user_role
    );
    RETURN NEW;
END;
$$ language 'plpgsql' SECURITY DEFINER;

-- Trigger to create profile on user signup
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();