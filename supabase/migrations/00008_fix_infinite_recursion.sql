-- ============================================================
-- Fix: Infinite recursion in profiles RLS policies
-- ============================================================
-- Policies on "profiles" that query "profiles" themselves
-- cause infinite recursion. The fix is a SECURITY DEFINER
-- helper function that reads the role without triggering RLS.
-- ============================================================

-- 1. Helper function — reads current user's role, bypasses RLS
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

-- 2. Fix "Admins can view all profiles" — was self-referencing
-- ------------------------------------------------------------
DROP POLICY IF EXISTS "Admins can view all profiles" ON profiles;
CREATE POLICY "Admins can view all profiles"
  ON profiles FOR SELECT
  USING (public.current_user_role() = 'admin'::public.user_role);

-- 3. Fix "Users can update own profile" — was self-referencing
-- ------------------------------------------------------------
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id AND role = public.current_user_role());

-- 4. Update all other policies to use the helper too
--    (avoids subquery overhead and future recursion risk)
-- ------------------------------------------------------------

-- house_help_profiles
DROP POLICY IF EXISTS "Employers can view worker profiles" ON house_help_profiles;
CREATE POLICY "Employers can view worker profiles"
  ON house_help_profiles FOR SELECT
  USING (public.current_user_role() IN ('employer'::public.user_role, 'admin'::public.user_role));

DROP POLICY IF EXISTS "Admins can view all HH profiles" ON house_help_profiles;
CREATE POLICY "Admins can view all HH profiles"
  ON house_help_profiles FOR SELECT
  USING (public.current_user_role() = 'admin'::public.user_role);

-- employer_profiles
DROP POLICY IF EXISTS "Workers can view employer profiles" ON employer_profiles;
CREATE POLICY "Workers can view employer profiles"
  ON employer_profiles FOR SELECT
  USING (public.current_user_role() IN ('worker'::public.user_role, 'admin'::public.user_role));

-- jobs
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

-- applications
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

-- reviews
DROP POLICY IF EXISTS "Users can delete own reviews" ON reviews;
CREATE POLICY "Users can delete own reviews"
  ON reviews FOR DELETE
  USING (auth.uid() = reviewer_id OR public.current_user_role() = 'admin'::public.user_role);

-- emergency_alerts
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

-- notifications
DROP POLICY IF EXISTS "Admins can create notifications" ON notifications;
CREATE POLICY "Admins can create notifications"
  ON notifications FOR INSERT
  WITH CHECK (public.current_user_role() = 'admin'::public.user_role);

-- verification_documents
DROP POLICY IF EXISTS "Admins can view all documents" ON verification_documents;
CREATE POLICY "Admins can view all documents"
  ON verification_documents FOR SELECT
  USING (public.current_user_role() = 'admin'::public.user_role);

DROP POLICY IF EXISTS "Admins can review documents" ON verification_documents;
CREATE POLICY "Admins can review documents"
  ON verification_documents FOR UPDATE
  USING (public.current_user_role() = 'admin'::public.user_role);

-- payments
DROP POLICY IF EXISTS "Admins can view all payments" ON payments;
CREATE POLICY "Admins can view all payments"
  ON payments FOR SELECT
  USING (public.current_user_role() = 'admin'::public.user_role);
