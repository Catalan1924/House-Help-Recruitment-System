-- ============================================================
-- Migration 00016: Fix applications FK & make RPC bulletproof
-- ============================================================
-- PROBLEM 1: Like jobs_employer_id_fkey (fixed in 00015), the
-- FK `applications_worker_id_fkey` on the live database likely
-- references a non-existent `workers` table instead of
-- `profiles(id)`. PostgREST then generates broken joins
-- (aliased as `workers_1`) that cause:
--   ERROR: column workers_1.full_name does not exist
--
-- PROBLEM 2: The `get_employer_stats` RPC still throws
-- "column reference employer_id is ambiguous" on some
-- deployments because unqualified column references collide
-- with the same-named function parameter.
--
-- PROBLEM 3: Other FKs may also be misdirected on the live DB
-- (same root cause as PROBLEM 1 -- the live DB was created
-- with different table names than the migration schema).
-- ============================================================

-- ------------------------------------------------------------
-- 1. Fix applications_worker_id_fkey (workers -> profiles)
-- ------------------------------------------------------------
DO $$
DECLARE
  fk_table  TEXT;
  fk_column TEXT;
BEGIN
  SELECT
    ccu.table_name,
    ccu.column_name
  INTO fk_table, fk_column
  FROM information_schema.table_constraints tc
  JOIN information_schema.constraint_column_usage ccu
    ON tc.constraint_name = ccu.constraint_name
  WHERE tc.constraint_name = 'applications_worker_id_fkey'
    AND tc.table_name = 'applications';

  IF fk_table IS NOT NULL AND (fk_table != 'profiles' OR fk_column != 'id') THEN
    EXECUTE 'ALTER TABLE public.applications DROP CONSTRAINT applications_worker_id_fkey';
    EXECUTE 'ALTER TABLE public.applications ADD CONSTRAINT applications_worker_id_fkey FOREIGN KEY (worker_id) REFERENCES public.profiles(id) ON DELETE CASCADE';
    RAISE NOTICE 'Fixed applications_worker_id_fkey: was referencing %.%, now references profiles.id', fk_table, fk_column;
  ELSIF fk_table IS NULL THEN
    EXECUTE 'ALTER TABLE public.applications ADD CONSTRAINT applications_worker_id_fkey FOREIGN KEY (worker_id) REFERENCES public.profiles(id) ON DELETE CASCADE';
    RAISE NOTICE 'Created applications_worker_id_fkey referencing profiles.id';
  ELSE
    RAISE NOTICE 'applications_worker_id_fkey already correct (references profiles.id)';
  END IF;
END $$;

-- ------------------------------------------------------------
-- 2. Fix applications_job_id_fkey (ensure it references jobs)
-- ------------------------------------------------------------
DO $$
DECLARE
  fk_table  TEXT;
  fk_column TEXT;
BEGIN
  SELECT
    ccu.table_name,
    ccu.column_name
  INTO fk_table, fk_column
  FROM information_schema.table_constraints tc
  JOIN information_schema.constraint_column_usage ccu
    ON tc.constraint_name = ccu.constraint_name
  WHERE tc.constraint_name = 'applications_job_id_fkey'
    AND tc.table_name = 'applications';

  IF fk_table IS NOT NULL AND (fk_table != 'jobs' OR fk_column != 'id') THEN
    EXECUTE 'ALTER TABLE public.applications DROP CONSTRAINT applications_job_id_fkey';
    EXECUTE 'ALTER TABLE public.applications ADD CONSTRAINT applications_job_id_fkey FOREIGN KEY (job_id) REFERENCES public.jobs(id) ON DELETE CASCADE';
    RAISE NOTICE 'Fixed applications_job_id_fkey: was referencing %.%, now references jobs.id', fk_table, fk_column;
  ELSIF fk_table IS NULL THEN
    EXECUTE 'ALTER TABLE public.applications ADD CONSTRAINT applications_job_id_fkey FOREIGN KEY (job_id) REFERENCES public.jobs(id) ON DELETE CASCADE';
    RAISE NOTICE 'Created applications_job_id_fkey referencing jobs.id';
  ELSE
    RAISE NOTICE 'applications_job_id_fkey already correct (references jobs.id)';
  END IF;
END $$;

-- ------------------------------------------------------------
-- 3. Fix emergency_alerts_user_id_fkey (users -> profiles)
-- ------------------------------------------------------------
DO $$
DECLARE
  fk_table  TEXT;
  fk_column TEXT;
BEGIN
  SELECT
    ccu.table_name,
    ccu.column_name
  INTO fk_table, fk_column
  FROM information_schema.table_constraints tc
  JOIN information_schema.constraint_column_usage ccu
    ON tc.constraint_name = ccu.constraint_name
  WHERE tc.constraint_name = 'emergency_alerts_user_id_fkey'
    AND tc.table_name = 'emergency_alerts';

  IF fk_table IS NOT NULL AND (fk_table != 'profiles' OR fk_column != 'id') THEN
    EXECUTE 'ALTER TABLE public.emergency_alerts DROP CONSTRAINT emergency_alerts_user_id_fkey';
    EXECUTE 'ALTER TABLE public.emergency_alerts ADD CONSTRAINT emergency_alerts_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE';
    RAISE NOTICE 'Fixed emergency_alerts_user_id_fkey: was referencing %.%, now references profiles.id', fk_table, fk_column;
  ELSIF fk_table IS NULL THEN
    EXECUTE 'ALTER TABLE public.emergency_alerts ADD CONSTRAINT emergency_alerts_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE';
    RAISE NOTICE 'Created emergency_alerts_user_id_fkey referencing profiles.id';
  ELSE
    RAISE NOTICE 'emergency_alerts_user_id_fkey already correct (references profiles.id)';
  END IF;
END $$;

-- ------------------------------------------------------------
-- 4. Fix notifications_user_id_fkey (users -> profiles)
-- ------------------------------------------------------------
DO $$
DECLARE
  fk_table  TEXT;
  fk_column TEXT;
BEGIN
  SELECT
    ccu.table_name,
    ccu.column_name
  INTO fk_table, fk_column
  FROM information_schema.table_constraints tc
  JOIN information_schema.constraint_column_usage ccu
    ON tc.constraint_name = ccu.constraint_name
  WHERE tc.constraint_name = 'notifications_user_id_fkey'
    AND tc.table_name = 'notifications';

  IF fk_table IS NOT NULL AND (fk_table != 'profiles' OR fk_column != 'id') THEN
    EXECUTE 'ALTER TABLE public.notifications DROP CONSTRAINT notifications_user_id_fkey';
    EXECUTE 'ALTER TABLE public.notifications ADD CONSTRAINT notifications_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE';
    RAISE NOTICE 'Fixed notifications_user_id_fkey: was referencing %.%, now references profiles.id', fk_table, fk_column;
  ELSIF fk_table IS NULL THEN
    EXECUTE 'ALTER TABLE public.notifications ADD CONSTRAINT notifications_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE';
    RAISE NOTICE 'Created notifications_user_id_fkey referencing profiles.id';
  ELSE
    RAISE NOTICE 'notifications_user_id_fkey already correct (references profiles.id)';
  END IF;
END $$;

-- ------------------------------------------------------------
-- 5. Fix payments_employer_id_fkey (employers -> profiles)
-- ------------------------------------------------------------
DO $$
DECLARE
  fk_table  TEXT;
  fk_column TEXT;
BEGIN
  SELECT
    ccu.table_name,
    ccu.column_name
  INTO fk_table, fk_column
  FROM information_schema.table_constraints tc
  JOIN information_schema.constraint_column_usage ccu
    ON tc.constraint_name = ccu.constraint_name
  WHERE tc.constraint_name = 'payments_employer_id_fkey'
    AND tc.table_name = 'payments';

  IF fk_table IS NOT NULL AND (fk_table != 'profiles' OR fk_column != 'id') THEN
    EXECUTE 'ALTER TABLE public.payments DROP CONSTRAINT payments_employer_id_fkey';
    EXECUTE 'ALTER TABLE public.payments ADD CONSTRAINT payments_employer_id_fkey FOREIGN KEY (employer_id) REFERENCES public.profiles(id) ON DELETE CASCADE';
    RAISE NOTICE 'Fixed payments_employer_id_fkey: was referencing %.%, now references profiles.id', fk_table, fk_column;
  ELSIF fk_table IS NULL THEN
    EXECUTE 'ALTER TABLE public.payments ADD CONSTRAINT payments_employer_id_fkey FOREIGN KEY (employer_id) REFERENCES public.profiles(id) ON DELETE CASCADE';
    RAISE NOTICE 'Created payments_employer_id_fkey referencing profiles.id';
  ELSE
    RAISE NOTICE 'payments_employer_id_fkey already correct (references profiles.id)';
  END IF;
END $$;

-- ------------------------------------------------------------
-- 6. Fix payments_worker_id_fkey (workers -> profiles)
-- ------------------------------------------------------------
DO $$
DECLARE
  fk_table  TEXT;
  fk_column TEXT;
BEGIN
  SELECT
    ccu.table_name,
    ccu.column_name
  INTO fk_table, fk_column
  FROM information_schema.table_constraints tc
  JOIN information_schema.constraint_column_usage ccu
    ON tc.constraint_name = ccu.constraint_name
  WHERE tc.constraint_name = 'payments_worker_id_fkey'
    AND tc.table_name = 'payments';

  IF fk_table IS NOT NULL AND (fk_table != 'profiles' OR fk_column != 'id') THEN
    EXECUTE 'ALTER TABLE public.payments DROP CONSTRAINT payments_worker_id_fkey';
    EXECUTE 'ALTER TABLE public.payments ADD CONSTRAINT payments_worker_id_fkey FOREIGN KEY (worker_id) REFERENCES public.profiles(id) ON DELETE CASCADE';
    RAISE NOTICE 'Fixed payments_worker_id_fkey: was referencing %.%, now references profiles.id', fk_table, fk_column;
  ELSIF fk_table IS NULL THEN
    EXECUTE 'ALTER TABLE public.payments ADD CONSTRAINT payments_worker_id_fkey FOREIGN KEY (worker_id) REFERENCES public.profiles(id) ON DELETE CASCADE';
    RAISE NOTICE 'Created payments_worker_id_fkey referencing profiles.id';
  ELSE
    RAISE NOTICE 'payments_worker_id_fkey already correct (references profiles.id)';
  END IF;
END $$;

-- ------------------------------------------------------------
-- 7. Bulletproof get_employer_stats
-- ------------------------------------------------------------
-- Uses function_name.param_name syntax to disambiguate the
-- parameter from column references.  This is the standard
-- PostgreSQL technique — no parameter renaming needed.
-- Added SET search_path = 'public' for security.
-- ------------------------------------------------------------
DROP FUNCTION IF EXISTS public.get_employer_stats(uuid);

CREATE FUNCTION public.get_employer_stats(employer_id uuid)
RETURNS jsonb
LANGUAGE plpgsql STABLE SECURITY DEFINER
SET search_path = 'public'
AS $$
DECLARE
  active_jobs_count   bigint;
  total_applicants    bigint;
  shortlisted_count   bigint;
  hired_count         bigint;
BEGIN
  -- Permission check: caller must own this profile
  IF auth.uid() IS DISTINCT FROM employer_id THEN
    RAISE EXCEPTION 'Permission denied';
  END IF;

  SELECT count(*) INTO active_jobs_count
    FROM public.jobs j
   WHERE j.employer_id = get_employer_stats.employer_id
     AND j.status = 'open';

  SELECT count(*) INTO total_applicants
    FROM public.applications a
    JOIN public.jobs j ON a.job_id = j.id
   WHERE j.employer_id = get_employer_stats.employer_id;

  SELECT count(*) INTO shortlisted_count
    FROM public.applications a
    JOIN public.jobs j ON a.job_id = j.id
   WHERE j.employer_id = get_employer_stats.employer_id
     AND a.status = 'shortlisted';

  SELECT count(*) INTO hired_count
    FROM public.applications a
    JOIN public.jobs j ON a.job_id = j.id
   WHERE j.employer_id = get_employer_stats.employer_id
     AND a.status = 'accepted';

  RETURN jsonb_build_object(
    'active_jobs',      active_jobs_count,
    'total_applicants', total_applicants,
    'shortlisted',      shortlisted_count,
    'hired',            hired_count
  );
END;
$$;

-- ------------------------------------------------------------
-- 8. Bulletproof get_worker_stats
-- ------------------------------------------------------------
DROP FUNCTION IF EXISTS public.get_worker_stats(uuid);

CREATE FUNCTION public.get_worker_stats(worker_id uuid)
RETURNS jsonb
LANGUAGE plpgsql STABLE SECURITY DEFINER
SET search_path = 'public'
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
    FROM public.jobs j WHERE j.status = 'open';

  SELECT count(*) INTO applications_count
    FROM public.applications a
   WHERE a.worker_id = get_worker_stats.worker_id;

  SELECT count(*) INTO unread_notifications
    FROM public.notifications n
   WHERE n.user_id = get_worker_stats.worker_id AND n.read = false;

  SELECT hp.average_rating INTO avg_rating
    FROM public.house_help_profiles hp
   WHERE hp.user_id = get_worker_stats.worker_id;

  RETURN jsonb_build_object(
    'available_jobs',       available_jobs_count,
    'applications_count',   applications_count,
    'unread_notifications', unread_notifications,
    'average_rating',       COALESCE(avg_rating, 0.0),
    'county',               (SELECT p.county FROM public.profiles p WHERE p.id = get_worker_stats.worker_id)
  );
END;
$$;
