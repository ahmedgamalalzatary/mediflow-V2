-- Mediflow Storage Buckets and Policies
-- File storage for medical records, profile images, and documents

-- =============================================
-- CREATE STORAGE BUCKETS
-- =============================================

-- Medical records bucket (for patient medical documents)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'medical-records',
    'medical-records',
    false, -- Private bucket
    10485760, -- 10MB limit
    ARRAY['image/jpeg', 'image/png', 'image/webp', 'application/pdf', 'text/plain']
);

-- Profile images bucket (for user avatars)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'profile-images',
    'profile-images',
    true, -- Public bucket for avatars
    2097152, -- 2MB limit
    ARRAY['image/jpeg', 'image/png', 'image/webp']
);

-- Doctor verification documents bucket (for license, certificates)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'doctor-verification',
    'doctor-verification',
    false, -- Private bucket
    10485760, -- 10MB limit
    ARRAY['image/jpeg', 'image/png', 'application/pdf']
);

-- Chat attachments bucket (for message files)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'chat-attachments',
    'chat-attachments',
    false, -- Private bucket
    5242880, -- 5MB limit
    ARRAY['image/jpeg', 'image/png', 'image/webp', 'application/pdf', 'text/plain']
);

-- =============================================
-- STORAGE POLICIES - MEDICAL RECORDS BUCKET
-- =============================================

-- Patients can upload their own medical records
CREATE POLICY "Patients can upload own medical records" ON storage.objects
    FOR INSERT WITH CHECK (
        bucket_id = 'medical-records' AND
        auth.role() = 'authenticated' AND
        (storage.foldername(name))[1] = auth.uid()::text
    );

-- Patients can view their own medical records
CREATE POLICY "Patients can view own medical records" ON storage.objects
    FOR SELECT USING (
        bucket_id = 'medical-records' AND
        auth.role() = 'authenticated' AND
        (storage.foldername(name))[1] = auth.uid()::text
    );

-- Patients can update their own medical records
CREATE POLICY "Patients can update own medical records" ON storage.objects
    FOR UPDATE USING (
        bucket_id = 'medical-records' AND
        auth.role() = 'authenticated' AND
        (storage.foldername(name))[1] = auth.uid()::text
    );

-- Patients can delete their own medical records
CREATE POLICY "Patients can delete own medical records" ON storage.objects
    FOR DELETE USING (
        bucket_id = 'medical-records' AND
        auth.role() = 'authenticated' AND
        (storage.foldername(name))[1] = auth.uid()::text
    );

-- Doctors can view medical records of their patients (with appointments)
CREATE POLICY "Doctors can view patient medical records" ON storage.objects
    FOR SELECT USING (
        bucket_id = 'medical-records' AND
        auth.role() = 'authenticated' AND
        EXISTS (
            SELECT 1 FROM profiles p1
            WHERE p1.id = auth.uid() AND p1.role = 'doctor'
        ) AND
        (storage.foldername(name))[1]::uuid IN (
            SELECT patient_id::text::uuid
            FROM appointments
            WHERE doctor_id = auth.uid()
            AND status IN ('confirmed', 'completed')
        )
    );

-- Admins can manage all medical records
CREATE POLICY "Admins can manage all medical records" ON storage.objects
    FOR ALL USING (
        bucket_id = 'medical-records' AND
        auth.role() = 'authenticated' AND
        EXISTS (
            SELECT 1 FROM profiles
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- =============================================
-- STORAGE POLICIES - PROFILE IMAGES BUCKET
-- =============================================

-- Users can upload their own profile images
CREATE POLICY "Users can upload own profile images" ON storage.objects
    FOR INSERT WITH CHECK (
        bucket_id = 'profile-images' AND
        auth.role() = 'authenticated' AND
        (storage.foldername(name))[1] = auth.uid()::text
    );

-- Anyone can view profile images (public bucket)
CREATE POLICY "Anyone can view profile images" ON storage.objects
    FOR SELECT USING (bucket_id = 'profile-images');

-- Users can update their own profile images
CREATE POLICY "Users can update own profile images" ON storage.objects
    FOR UPDATE USING (
        bucket_id = 'profile-images' AND
        auth.role() = 'authenticated' AND
        (storage.foldername(name))[1] = auth.uid()::text
    );

-- Users can delete their own profile images
CREATE POLICY "Users can delete own profile images" ON storage.objects
    FOR DELETE USING (
        bucket_id = 'profile-images' AND
        auth.role() = 'authenticated' AND
        (storage.foldername(name))[1] = auth.uid()::text
    );

-- =============================================
-- STORAGE POLICIES - DOCTOR VERIFICATION BUCKET
-- =============================================

-- Doctors can upload their verification documents
CREATE POLICY "Doctors can upload verification documents" ON storage.objects
    FOR INSERT WITH CHECK (
        bucket_id = 'doctor-verification' AND
        auth.role() = 'authenticated' AND
        (storage.foldername(name))[1] = auth.uid()::text AND
        EXISTS (
            SELECT 1 FROM profiles
            WHERE id = auth.uid() AND role = 'doctor'
        )
    );

-- Doctors can view their own verification documents
CREATE POLICY "Doctors can view own verification documents" ON storage.objects
    FOR SELECT USING (
        bucket_id = 'doctor-verification' AND
        auth.role() = 'authenticated' AND
        (storage.foldername(name))[1] = auth.uid()::text
    );

-- Doctors can update their verification documents
CREATE POLICY "Doctors can update own verification documents" ON storage.objects
    FOR UPDATE USING (
        bucket_id = 'doctor-verification' AND
        auth.role() = 'authenticated' AND
        (storage.foldername(name))[1] = auth.uid()::text
    );

-- Doctors can delete their verification documents
CREATE POLICY "Doctors can delete own verification documents" ON storage.objects
    FOR DELETE USING (
        bucket_id = 'doctor-verification' AND
        auth.role() = 'authenticated' AND
        (storage.foldername(name))[1] = auth.uid()::text
    );

-- Admins can view all verification documents
CREATE POLICY "Admins can view all verification documents" ON storage.objects
    FOR SELECT USING (
        bucket_id = 'doctor-verification' AND
        auth.role() = 'authenticated' AND
        EXISTS (
            SELECT 1 FROM profiles
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- =============================================
-- STORAGE POLICIES - CHAT ATTACHMENTS BUCKET
-- =============================================

-- Users can upload chat attachments
CREATE POLICY "Users can upload chat attachments" ON storage.objects
    FOR INSERT WITH CHECK (
        bucket_id = 'chat-attachments' AND
        auth.role() = 'authenticated' AND
        (storage.foldername(name))[1] = auth.uid()::text
    );

-- Users can view chat attachments they're involved in
CREATE POLICY "Users can view relevant chat attachments" ON storage.objects
    FOR SELECT USING (
        bucket_id = 'chat-attachments' AND
        auth.role() = 'authenticated' AND
        (
            -- Own attachments
            (storage.foldername(name))[1] = auth.uid()::text OR
            -- Attachments from conversations they're part of
            (storage.foldername(name))[1]::uuid IN (
                SELECT sender_id FROM messages
                WHERE receiver_id = auth.uid()
                UNION
                SELECT receiver_id FROM messages
                WHERE sender_id = auth.uid()
            )
        )
    );

-- Users can delete their own chat attachments
CREATE POLICY "Users can delete own chat attachments" ON storage.objects
    FOR DELETE USING (
        bucket_id = 'chat-attachments' AND
        auth.role() = 'authenticated' AND
        (storage.foldername(name))[1] = auth.uid()::text
    );

-- Admins can view all chat attachments
CREATE POLICY "Admins can view all chat attachments" ON storage.objects
    FOR SELECT USING (
        bucket_id = 'chat-attachments' AND
        auth.role() = 'authenticated' AND
        EXISTS (
            SELECT 1 FROM profiles
            WHERE id = auth.uid() AND role = 'admin'
        )
    );