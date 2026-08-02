-- ============================================================
-- Fix: handle_new_user() must include the email column
-- The remote profiles table has an email NOT NULL column
-- that our original migration didn't account for.
-- ============================================================

ALTER TABLE IF EXISTS public.profiles
  ADD COLUMN IF NOT EXISTS email TEXT;

UPDATE public.profiles p
SET email = u.email
FROM auth.users u
WHERE p.id = u.id AND p.email IS NULL;

ALTER TABLE IF EXISTS public.profiles
  ALTER COLUMN email SET NOT NULL;

CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'New User'),
    COALESCE(NEW.raw_user_meta_data->>'role', 'worker')
  );

  -- If worker, also create house_help_profile placeholder
  IF COALESCE(NEW.raw_user_meta_data->>'role', 'worker') = 'worker' THEN
    INSERT INTO public.house_help_profiles (user_id)
    VALUES (NEW.id);
  END IF;

  -- If employer, also create employer_profile placeholder
  IF COALESCE(NEW.raw_user_meta_data->>'role', 'worker') = 'employer' THEN
    INSERT INTO public.employer_profiles (user_id)
    VALUES (NEW.id);
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
