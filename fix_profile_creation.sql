-- Fix the profile creation issue
-- Run this once to fix the trigger

-- 1. Check what's in the profiles table
SELECT COUNT(*) as profile_count FROM public.profiles;

-- 2. Check what's in auth.users
SELECT COUNT(*) as user_count FROM auth.users;

-- 3. Create profiles for existing users who don't have them
INSERT INTO public.profiles (id, email, full_name, role)
SELECT 
    au.id,
    au.email,
    COALESCE(au.raw_user_meta_data->>'full_name', au.email),
    COALESCE((au.raw_user_meta_data->>'role')::user_role, 'patient'::user_role)
FROM auth.users au
LEFT JOIN public.profiles p ON au.id = p.id
WHERE p.id IS NULL;

-- 4. Fix the trigger to actually work
CREATE OR REPLACE FUNCTION public.handle_new_user_fixed()
RETURNS TRIGGER AS $$
BEGIN
    -- Insert with proper error handling
    INSERT INTO public.profiles (id, email, full_name, role)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
        COALESCE((NEW.raw_user_meta_data->>'role')::user_role, 'patient'::user_role)
    )
    ON CONFLICT (id) DO NOTHING; -- Prevent duplicate key errors
    
    RETURN NEW;
EXCEPTION
    WHEN others THEN
        -- Log but don't fail
        RAISE LOG 'Profile creation error for user %: %', NEW.id, SQLERRM;
        RETURN NEW;
END;
$$ language 'plpgsql' SECURITY DEFINER;

-- 5. Update the trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user_fixed();

-- 6. Show results
SELECT 'Profile creation fix applied' as result;