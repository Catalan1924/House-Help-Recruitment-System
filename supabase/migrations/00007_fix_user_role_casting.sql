-- ============================================================
-- Fix: user_role enum + casting for handle_new_user & RLS
-- ============================================================
-- The remote profiles.role column is already of type user_role
-- but our functions/policies pass bare TEXT, causing:
--   42804: column "role" is of type public.user_role but
--          expression is of type text
--   25P02: current transaction is aborted (cascade)
-- ============================================================

-- 1. Ensure the user_role enum exists (safe to re-run)
-- ------------------------------------------------------------
DO $func$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_role') THEN
    CREATE TYPE public.user_role AS ENUM ('worker', 'employer', 'admin');
  ELSE
    BEGIN EXECUTE 'ALTER TYPE public.user_role ADD VALUE ''worker''';    EXCEPTION WHEN duplicate_object THEN NULL; END;
    BEGIN EXECUTE 'ALTER TYPE public.user_role ADD VALUE ''employer''';  EXCEPTION WHEN duplicate_object THEN NULL; END;
    BEGIN EXECUTE 'ALTER TYPE public.user_role ADD VALUE ''admin''';     EXCEPTION WHEN duplicate_object THEN NULL; END;
  END IF;
END $func$;

-- 2. If profiles.role is still TEXT, convert it to user_role
-- ------------------------------------------------------------
DO $$
DECLARE
  col_type TEXT;
BEGIN
  SELECT data_type INTO col_type
  FROM information_schema.columns
  WHERE table_schema = 'public'
    AND table_name = 'profiles'
    AND column_name = 'role';

  IF col_type = 'text' OR col_type = 'character varying' THEN
    -- Cast existing TEXT values to the enum (must match allowed values)
    ALTER TABLE public.profiles
      ALTER COLUMN role TYPE public.user_role
      USING role::public.user_role;
  END IF;
END $$;

-- 3. Re-create handle_new_user() with proper ::user_role casting
-- ------------------------------------------------------------
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
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

-- 4. Helper function — reads current user's role, bypasses RLS
--    (avoids infinite recursion in policies that query profiles)
-- ------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.current_user_role()
RETURNS public.user_role
LANGUAGE sql
SECURITY DEFINER
SET search_path = 'public'
STABLE
AS $$
  SELECT role FROM public.profiles WHERE id = auth.uid();
$$;

-- 5. Re-create RLS policies that compare role (using helper, no recursion)
-- ------------------------------------------------------------
-- Profiles
DROP POLICY IF EXISTS "Admins can view all profiles" ON profiles;
CREATE POLICY "Admins can view all profiles"
  ON profiles FOR SELECT
  USING (public.current_user_role() = 'admin'::public.user_role);

DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id AND role = public.current_user_role());

-- House help profiles
DROP POLICY IF EXISTS "Employers can view worker profiles" ON house_help_profiles;
CREATE POLICY "Employers can view worker profiles"
  ON house_help_profiles FOR SELECT
  USING (public.current_user_role() IN ('employer'::public.user_role, 'admin'::public.user_role));

DROP POLICY IF EXISTS "Admins can view all HH profiles" ON house_help_profiles;
CREATE POLICY "Admins can view all HH profiles"
  ON house_help_profiles FOR SELECT
  USING (public.current_user_role() = 'admin'::public.user_role);

-- Employer profiles
DROP POLICY IF EXISTS "Workers can view employer profiles" ON employer_profiles;
CREATE POLICY "Workers can view employer profiles"
  ON employer_profiles FOR SELECT
  USING (public.current_user_role() IN ('worker'::public.user_role, 'admin'::public.user_role));

-- Jobs
DROP POLICY IF EXISTS "Anyone can view open jobs" ON jobs;
CREATE POLICY "Anyone can view open jobs"
  ON jobs FOR SELECT
  USING (status::text = 'open' OR public.current_user_role() = 'admin'::public.user_role);

DROP POLICY IF EXISTS "Employers can create jobs" ON jobs;
CREATE POLICY "Employers can create jobs"
  ON jobs FOR INSERT
  WITH CHECK (
    auth.uid() = employer_id
    AND public.current_user_role() IN ('employer'::public.user_role, 'admin'::public.user_role)
  );

DROP POLICY IF EXISTS "Admins can manage all jobs" ON jobs;
CREATE POLICY "Admins can manage all jobs"
  ON jobs FOR ALL
  USING (public.current_user_role() = 'admin'::public.user_role);

-- Applications
DROP POLICY IF EXISTS "Workers can create applications" ON applications;
CREATE POLICY "Workers can create applications"
  ON applications FOR INSERT
  WITH CHECK (
    auth.uid() = worker_id
    AND public.current_user_role() = 'worker'::public.user_role
  );

DROP POLICY IF EXISTS "Admins can manage all applications" ON applications;
CREATE POLICY "Admins can manage all applications"
  ON applications FOR ALL
  USING (public.current_user_role() = 'admin'::public.user_role);

-- Reviews
DROP POLICY IF EXISTS "Users can delete own reviews" ON reviews;
CREATE POLICY "Users can delete own reviews"
  ON reviews FOR DELETE
  USING (auth.uid() = reviewer_id OR public.current_user_role() = 'admin'::public.user_role);

-- Emergency alerts
DROP POLICY IF EXISTS "Admins can view all emergency alerts" ON emergency_alerts;
CREATE POLICY "Admins can view all emergency alerts"
  ON emergency_alerts FOR SELECT
  USING (public.current_user_role() = 'admin'::public.user_role);

DROP POLICY IF EXISTS "Workers can create emergency alerts" ON emergency_alerts;
CREATE POLICY "Workers can create emergency alerts"
  ON emergency_alerts FOR INSERT
  WITH CHECK (
    auth.uid() = user_id
    AND public.current_user_role() = 'worker'::public.user_role
  );

DROP POLICY IF EXISTS "Admins can update emergency alerts" ON emergency_alerts;
CREATE POLICY "Admins can update emergency alerts"
  ON emergency_alerts FOR UPDATE
  USING (public.current_user_role() = 'admin'::public.user_role);

-- Notifications
DROP POLICY IF EXISTS "Admins can create notifications" ON notifications;
CREATE POLICY "Admins can create notifications"
  ON notifications FOR INSERT
  WITH CHECK (public.current_user_role() = 'admin'::public.user_role);

-- Verification documents
DROP POLICY IF EXISTS "Admins can view all documents" ON verification_documents;
CREATE POLICY "Admins can view all documents"
  ON verification_documents FOR SELECT
  USING (public.current_user_role() = 'admin'::public.user_role);

DROP POLICY IF EXISTS "Admins can review documents" ON verification_documents;
CREATE POLICY "Admins can review documents"
  ON verification_documents FOR UPDATE
  USING (public.current_user_role() = 'admin'::public.user_role);

-- Payments
DROP POLICY IF EXISTS "Admins can view all payments" ON payments;
CREATE POLICY "Admins can view all payments"
  ON payments FOR SELECT
  USING (public.current_user_role() = 'admin'::public.user_role);
