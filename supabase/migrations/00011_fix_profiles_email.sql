-- ============================================================
-- Fix: NULL email in profiles on registration
-- ============================================================
-- Two separate code paths insert into profiles:
--   1. DB trigger handle_new_user() — uses NEW.email (correct)
--   2. JS createProfile() upsert — was MISSING email in payload
--
-- If the trigger doesn't fire (doesn't exist, or old version),
-- the JS upsert becomes an INSERT with NULL email → error.
--
-- This migration:
--   1. Ensures profiles.email column exists
--   2. Backfills NULL emails from auth.users
--   3. Re-creates handle_new_user() with COALESCE safety
--   4. Ensures the trigger exists
-- ============================================================

-- 1. Add email column if missing (safe to re-run)
-- ------------------------------------------------------------
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'profiles'
      AND column_name = 'email'
  ) THEN
    ALTER TABLE public.profiles ADD COLUMN email TEXT;
  END IF;
END $$;

-- 2. Backfill NULL emails from auth.users
-- ------------------------------------------------------------
UPDATE public.profiles p
SET email = u.email
FROM auth.users u
WHERE p.id = u.id
  AND p.email IS NULL
  AND u.email IS NOT NULL;

-- 3. Re-create handle_new_user() with safe COALESCE
--    Uses NEW.email primarily; falls back to metadata (belt-and-suspenders)
-- ------------------------------------------------------------
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.email, NEW.raw_user_meta_data->>'email'),
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'New User'),
    COALESCE(NEW.raw_user_meta_data->>'role', 'worker')::public.user_role
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

-- 4. Ensure the trigger exists (drop + recreate)
-- ------------------------------------------------------------
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION handle_new_user();
