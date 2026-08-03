-- ============================================================
-- HouseConnect Kenya — Fix: Admin RLS + Stats
-- ============================================================
-- Fixes:
--   1. get_admin_stats RPC 404
--   2. Profiles RLS infinite recursion (2 remaining policies)
--   3. PostgREST schema reload
-- ============================================================

-- ----------------------------------------------------------
-- 1. Recreate get_admin_stats
-- ----------------------------------------------------------
CREATE OR REPLACE FUNCTION public.get_admin_stats()
RETURNS jsonb
LANGUAGE plpgsql STABLE SECURITY DEFINER
SET search_path = 'public'
AS $$
DECLARE
  total_users           bigint;
  active_jobs           bigint;
  pending_verifications bigint;
  active_emergencies    bigint;
  recent_activity       jsonb;
BEGIN
  IF public.current_user_role() IS DISTINCT FROM 'admin'::public.user_role THEN
    RAISE EXCEPTION 'Permission denied: admin role required';
  END IF;

  SELECT count(*) INTO total_users FROM public.profiles;
  SELECT count(*) INTO active_jobs FROM public.jobs WHERE status = 'open';
  SELECT count(*) INTO pending_verifications
    FROM public.verification_documents WHERE status = 'pending';
  SELECT count(*) INTO active_emergencies
    FROM public.emergency_alerts WHERE status = 'active';

  SELECT jsonb_agg(r) INTO recent_activity FROM (
    SELECT p.full_name AS user_name,
           'user_joined' AS activity_type,
           p.created_at AS occurred_at
      FROM public.profiles p
     ORDER BY p.created_at DESC LIMIT 5
  ) r;

  RETURN jsonb_build_object(
    'total_users',           total_users,
    'active_jobs',           active_jobs,
    'pending_verifications', pending_verifications,
    'active_emergencies',    active_emergencies,
    'recent_activity',       COALESCE(recent_activity, '[]'::jsonb)
  );
END;
$$;


-- ----------------------------------------------------------
-- 2. Fix profiles RLS infinite recursion
-- ----------------------------------------------------------
DROP POLICY IF EXISTS "Employers can view worker profiles" ON profiles;
CREATE POLICY "Employers can view worker profiles"
  ON profiles FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM house_help_profiles WHERE user_id = profiles.id
    )
    AND public.current_user_role() IN ('employer'::public.user_role, 'admin'::public.user_role)
  );

DROP POLICY IF EXISTS "Workers can view employer profiles" ON profiles;
CREATE POLICY "Workers can view employer profiles"
  ON profiles FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM employer_profiles WHERE user_id = profiles.id
    )
    AND public.current_user_role() IN ('worker'::public.user_role, 'admin'::public.user_role)
  );


-- ----------------------------------------------------------
-- 3. Reload PostgREST schema cache
-- ----------------------------------------------------------
NOTIFY pgrst, 'reload schema';
