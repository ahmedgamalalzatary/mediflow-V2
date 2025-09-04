-- Mediflow Seed Data
-- Sample data for development and testing

-- =============================================
-- SAMPLE PROFILES (Test Users)
-- =============================================

-- Note: These will be created via Supabase Auth signup
-- This is just for reference of what test data we'll have

-- Sample Admin User
-- Email: admin@mediflow.com
-- Password: admin123456
-- Role: admin

-- Sample Doctor Users
-- Email: dr.smith@mediflow.com
-- Password: doctor123456
-- Role: doctor

-- Email: dr.johnson@mediflow.com  
-- Password: doctor123456
-- Role: doctor

-- Sample Patient Users
-- Email: patient1@mediflow.com
-- Password: patient123456
-- Role: patient

-- Email: patient2@mediflow.com
-- Password: patient123456
-- Role: patient

-- =============================================
-- SAMPLE DOCTOR SPECIALTIES (for reference)
-- =============================================

-- Common medical specialties that will be used:
-- 'Cardiology', 'Dermatology', 'Endocrinology', 'Gastroenterology', 
-- 'General Practice', 'Neurology', 'Oncology', 'Orthopedics', 
-- 'Pediatrics', 'Psychiatry', 'Radiology', 'Surgery'

-- =============================================
-- SAMPLE DOCTOR AVAILABILITY PATTERNS
-- =============================================

-- Typical availability patterns for doctors:
-- Monday-Friday: 9:00 AM - 5:00 PM
-- Saturday: 9:00 AM - 1:00 PM
-- Sunday: Closed

-- =============================================
-- DEVELOPMENT NOTES
-- =============================================

-- To create test data:
-- 1. Sign up users through the application
-- 2. Manually insert doctor records for doctor users
-- 3. Set up doctor availability schedules
-- 4. Create sample appointments
-- 5. Add sample medical records
-- 6. Create sample reviews

-- This seed file is intentionally minimal to avoid
-- conflicts with the authentication system.
-- Real data should be created through the application
-- or via separate scripts after user authentication.