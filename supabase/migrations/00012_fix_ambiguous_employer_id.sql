-- ============================================================
-- Fix: ambiguous column references in dashboard RPC functions
-- ============================================================
-- `employer_id` and `worker_id` in SELECT queries conflict
-- with function parameter names when not table-qualified:
--   ERROR: column reference "employer_id" is ambiguous
-- ============================================================

-- 1. Fix get_employer_stats
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
  IF auth.uid() IS DISTINCT FROM employer_id THEN
    RAISE EXCEPTION 'Permission denied';
  END IF;

  SELECT count(*) INTO active_jobs_count
    FROM public.jobs j WHERE j.employer_id = get_employer_stats.employer_id AND j.status = 'open';

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


-- 2. Fix get_worker_stats
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
  IF auth.uid() IS DISTINCT FROM worker_id THEN
    RAISE EXCEPTION 'Permission denied';
  END IF;

  SELECT count(*) INTO available_jobs_count
    FROM public.jobs WHERE status = 'open';

  SELECT count(*) INTO applications_count
    FROM public.applications a WHERE a.worker_id = get_worker_stats.worker_id;

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
