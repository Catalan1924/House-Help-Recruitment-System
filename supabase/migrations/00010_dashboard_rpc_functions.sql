-- ============================================================
-- HouseConnect Kenya — Dashboard Stats RPC Functions
-- ============================================================
-- The three dashboard pages call these via supabase.rpc().
-- Without them, every dashboard load throws a 42883 (function
-- not found) error which cascades into an auth-looking failure.
-- ============================================================

-- Helper: current user's role (reused from 00008, kept here
-- for standalone safety — uses IF NOT EXISTS).
DO $do$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_proc WHERE proname = 'current_user_role'
  ) THEN
    CREATE FUNCTION public.current_user_role()
    RETURNS public.user_role
    LANGUAGE sql STABLE SECURITY DEFINER
    AS $func$
      SELECT role FROM public.profiles WHERE id = auth.uid()
    $func$;
  END IF;
END $do$;


-- 1. get_admin_stats()
-- ------------------------------------------------------------
DROP FUNCTION IF EXISTS public.get_admin_stats();

CREATE FUNCTION public.get_admin_stats()
RETURNS jsonb
LANGUAGE plpgsql STABLE SECURITY DEFINER
AS $$
DECLARE
  total_users          bigint;
  active_jobs          bigint;
  pending_verifications bigint;
  active_emergencies   bigint;
  recent_activity      jsonb;
BEGIN
  -- Permission check
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


-- 2. get_employer_stats(employer_id UUID)
-- ------------------------------------------------------------
DROP FUNCTION IF EXISTS public.get_employer_stats(uuid);

CREATE FUNCTION public.get_employer_stats(employer_id uuid)
RETURNS jsonb
LANGUAGE plpgsql STABLE SECURITY DEFINER
AS $$
DECLARE
  active_jobs_count   bigint;
  total_applicants    bigint;
  shortlisted_count   bigint;
  hired_count         bigint;
BEGIN
  -- Permission check: the caller must own this profile
  IF auth.uid() IS DISTINCT FROM employer_id THEN
    RAISE EXCEPTION 'Permission denied';
  END IF;

  SELECT count(*) INTO active_jobs_count
    FROM public.jobs WHERE employer_id = get_employer_stats.employer_id AND status = 'open';

  SELECT count(*) INTO total_applicants
    FROM public.applications a
    JOIN public.jobs j ON a.job_id = j.id
   WHERE j.employer_id = get_employer_stats.employer_id;

  SELECT count(*) INTO shortlisted_count
    FROM public.applications a
    JOIN public.jobs j ON a.job_id = j.id
   WHERE j.employer_id = get_employer_stats.employer_id AND a.status = 'shortlisted';

  SELECT count(*) INTO hired_count
    FROM public.applications a
    JOIN public.jobs j ON a.job_id = j.id
   WHERE j.employer_id = get_employer_stats.employer_id AND a.status = 'accepted';

  RETURN jsonb_build_object(
    'active_jobs',      active_jobs_count,
    'total_applicants', total_applicants,
    'shortlisted',      shortlisted_count,
    'hired',            hired_count
  );
END;
$$;


-- 3. get_worker_stats(worker_id UUID)
-- ------------------------------------------------------------
DROP FUNCTION IF EXISTS public.get_worker_stats(uuid);

CREATE FUNCTION public.get_worker_stats(worker_id uuid)
RETURNS jsonb
LANGUAGE plpgsql STABLE SECURITY DEFINER
AS $$
DECLARE
  available_jobs_count  bigint;
  applications_count    bigint;
  unread_notifications  bigint;
  avg_rating            numeric;
BEGIN
  -- Permission check
  IF auth.uid() IS DISTINCT FROM worker_id THEN
    RAISE EXCEPTION 'Permission denied';
  END IF;

  SELECT count(*) INTO available_jobs_count
    FROM public.jobs WHERE status = 'open';

  SELECT count(*) INTO applications_count
    FROM public.applications WHERE worker_id = get_worker_stats.worker_id;

  SELECT count(*) INTO unread_notifications
    FROM public.notifications
   WHERE user_id = get_worker_stats.worker_id AND read = false;

  SELECT average_rating INTO avg_rating
    FROM public.house_help_profiles WHERE user_id = get_worker_stats.worker_id;

  RETURN jsonb_build_object(
    'available_jobs',       available_jobs_count,
    'applications_count',   applications_count,
    'unread_notifications', unread_notifications,
    'average_rating',       COALESCE(avg_rating, 0.0),
    'county',               (SELECT county FROM public.profiles WHERE id = get_worker_stats.worker_id)
  );
END;
$$;
