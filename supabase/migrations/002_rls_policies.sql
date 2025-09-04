-- Mediflow Row Level Security (RLS) Policies
-- Secure access control for all tables based on user roles

-- =============================================
-- ENABLE RLS ON ALL TABLES
-- =============================================

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE doctors ENABLE ROW LEVEL SECURITY;
ALTER TABLE doctor_availability ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE medical_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_logs ENABLE ROW LEVEL SECURITY;

-- =============================================
-- HELPER FUNCTIONS FOR RLS
-- =============================================

-- Function to get current user's role
CREATE OR REPLACE FUNCTION get_user_role()
RETURNS user_role AS $$
BEGIN
    RETURN (
        SELECT role 
        FROM profiles 
        WHERE id = auth.uid()
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to check if user is admin
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN get_user_role() = 'admin';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to check if user is doctor
CREATE OR REPLACE FUNCTION is_doctor()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN get_user_role() = 'doctor';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to check if user is patient
CREATE OR REPLACE FUNCTION is_patient()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN get_user_role() = 'patient';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =============================================
-- PROFILES TABLE POLICIES
-- =============================================

-- Users can view their own profile
CREATE POLICY "Users can view own profile" ON profiles
    FOR SELECT USING (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "Users can update own profile" ON profiles
    FOR UPDATE USING (auth.uid() = id);

-- Admins can view all profiles
CREATE POLICY "Admins can view all profiles" ON profiles
    FOR SELECT USING (is_admin());

-- Admins can update all profiles
CREATE POLICY "Admins can update all profiles" ON profiles
    FOR UPDATE USING (is_admin());

-- Patients can view doctor profiles (for search)
CREATE POLICY "Patients can view doctor profiles" ON profiles
    FOR SELECT USING (
        is_patient() AND role = 'doctor'
    );

-- Doctors can view patient profiles (for appointments)
CREATE POLICY "Doctors can view patient profiles" ON profiles
    FOR SELECT USING (
        is_doctor() AND role = 'patient'
    );

-- =============================================
-- DOCTORS TABLE POLICIES
-- =============================================

-- Doctors can view and update their own doctor record
CREATE POLICY "Doctors can manage own record" ON doctors
    FOR ALL USING (auth.uid() = id);

-- Patients can view verified doctor records
CREATE POLICY "Patients can view verified doctors" ON doctors
    FOR SELECT USING (
        is_patient() AND verification_status = 'verified'
    );

-- Admins can view and manage all doctor records
CREATE POLICY "Admins can manage all doctors" ON doctors
    FOR ALL USING (is_admin());

-- =============================================
-- DOCTOR AVAILABILITY POLICIES
-- =============================================

-- Doctors can manage their own availability
CREATE POLICY "Doctors can manage own availability" ON doctor_availability
    FOR ALL USING (auth.uid() = doctor_id);

-- Patients can view doctor availability
CREATE POLICY "Patients can view doctor availability" ON doctor_availability
    FOR SELECT USING (is_patient());

-- Admins can view all availability
CREATE POLICY "Admins can view all availability" ON doctor_availability
    FOR SELECT USING (is_admin());

-- =============================================
-- APPOINTMENTS TABLE POLICIES
-- =============================================

-- Patients can view their own appointments
CREATE POLICY "Patients can view own appointments" ON appointments
    FOR SELECT USING (
        is_patient() AND auth.uid() = patient_id
    );

-- Patients can create appointments
CREATE POLICY "Patients can create appointments" ON appointments
    FOR INSERT WITH CHECK (
        is_patient() AND auth.uid() = patient_id
    );

-- Patients can update their own pending appointments
CREATE POLICY "Patients can update own pending appointments" ON appointments
    FOR UPDATE USING (
        is_patient() AND 
        auth.uid() = patient_id AND 
        status = 'pending'
    );

-- Doctors can view their appointments
CREATE POLICY "Doctors can view own appointments" ON appointments
    FOR SELECT USING (
        is_doctor() AND auth.uid() = doctor_id
    );

-- Doctors can update their appointments
CREATE POLICY "Doctors can update own appointments" ON appointments
    FOR UPDATE USING (
        is_doctor() AND auth.uid() = doctor_id
    );

-- Admins can view and manage all appointments
CREATE POLICY "Admins can manage all appointments" ON appointments
    FOR ALL USING (is_admin());

-- =============================================
-- MEDICAL RECORDS POLICIES
-- =============================================

-- Patients can view and manage their own medical records
CREATE POLICY "Patients can manage own medical records" ON medical_records
    FOR ALL USING (
        is_patient() AND auth.uid() = patient_id
    );

-- Doctors can view patient records for their appointments
CREATE POLICY "Doctors can view patient records for appointments" ON medical_records
    FOR SELECT USING (
        is_doctor() AND 
        patient_id IN (
            SELECT patient_id 
            FROM appointments 
            WHERE doctor_id = auth.uid() 
            AND status IN ('confirmed', 'completed')
        ) AND
        is_private = false
    );

-- Doctors can create records for their patients
CREATE POLICY "Doctors can create patient records" ON medical_records
    FOR INSERT WITH CHECK (
        is_doctor() AND 
        patient_id IN (
            SELECT patient_id 
            FROM appointments 
            WHERE doctor_id = auth.uid() 
            AND status IN ('confirmed', 'completed')
        )
    );

-- Admins can view all medical records
CREATE POLICY "Admins can view all medical records" ON medical_records
    FOR SELECT USING (is_admin());

-- =============================================
-- MESSAGES TABLE POLICIES
-- =============================================

-- Users can view messages where they are sender or receiver
CREATE POLICY "Users can view own messages" ON messages
    FOR SELECT USING (
        auth.uid() = sender_id OR auth.uid() = receiver_id
    );

-- Users can send messages to their appointment counterparts
CREATE POLICY "Users can send messages to appointment counterparts" ON messages
    FOR INSERT WITH CHECK (
        auth.uid() = sender_id AND
        (
            -- Patient sending to doctor
            (is_patient() AND receiver_id IN (
                SELECT doctor_id 
                FROM appointments 
                WHERE patient_id = auth.uid()
                AND status IN ('confirmed', 'completed')
            )) OR
            -- Doctor sending to patient
            (is_doctor() AND receiver_id IN (
                SELECT patient_id 
                FROM appointments 
                WHERE doctor_id = auth.uid()
                AND status IN ('confirmed', 'completed')
            ))
        )
    );

-- Users can update their own messages (for read status)
CREATE POLICY "Users can update own messages" ON messages
    FOR UPDATE USING (
        auth.uid() = sender_id OR auth.uid() = receiver_id
    );

-- Admins can view all messages
CREATE POLICY "Admins can view all messages" ON messages
    FOR SELECT USING (is_admin());

-- =============================================
-- REVIEWS TABLE POLICIES
-- =============================================

-- Patients can view all published reviews
CREATE POLICY "Patients can view published reviews" ON reviews
    FOR SELECT USING (
        is_patient() AND is_published = true
    );

-- Patients can create reviews for their completed appointments
CREATE POLICY "Patients can create reviews for completed appointments" ON reviews
    FOR INSERT WITH CHECK (
        is_patient() AND 
        auth.uid() = patient_id AND
        appointment_id IN (
            SELECT id 
            FROM appointments 
            WHERE patient_id = auth.uid() 
            AND status = 'completed'
        )
    );

-- Patients can update their own reviews
CREATE POLICY "Patients can update own reviews" ON reviews
    FOR UPDATE USING (
        is_patient() AND auth.uid() = patient_id
    );

-- Doctors can view reviews about them
CREATE POLICY "Doctors can view own reviews" ON reviews
    FOR SELECT USING (
        is_doctor() AND auth.uid() = doctor_id
    );

-- Admins can manage all reviews
CREATE POLICY "Admins can manage all reviews" ON reviews
    FOR ALL USING (is_admin());

-- =============================================
-- ADMIN LOGS POLICIES
-- =============================================

-- Only admins can view and create admin logs
CREATE POLICY "Only admins can manage admin logs" ON admin_logs
    FOR ALL USING (is_admin());

-- =============================================
-- STORAGE POLICIES (for file uploads)
-- =============================================

-- Medical records bucket policies will be created in the next migration
-- Profile images bucket policies will be created in the next migration