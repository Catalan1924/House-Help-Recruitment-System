-- ============================================================
-- Fix: Infinite recursion in jobs RLS policies
-- ============================================================
-- Problem: three helper functions defined in 00002/00003 are
-- broken in ways that cause circular RLS evaluation:
--
--   1. current_user_role() is LANGUAGE sql → PostgreSQL INLINES
--      the body, stripping SECURITY DEFINER. Runs with caller's
--      privileges → RLS is active → circular loop.
--
--   2. has_applied_to_job() & is_job_owned_by_user() try to use
--      "SET LOCAL row_level_security = off" which Supabase's
--      managed PostgreSQL does NOT support (error 42704).
--
--   3. They're also marked STABLE, which PostgreSQL 15+ rejects
--      for functions that use SET LOCAL.
--
-- The recursion chain (confirmed via Supabase logs):
--   INSERT jobs → RETURNING * → SELECT policies fire
--     → "Workers can view applied jobs" → has_applied_to_job()
--       → queries applications (RLS ON — SET LOCAL rejected!)
--         → "Employers can view apps" → is_job_owned_by_user()
--           → queries jobs (RLS ON — SET LOCAL rejected!)
--             → 💥 infinite recursion
--
-- Fix: plain LANGUAGE plpgsql + SECURITY DEFINER.
-- PL/pgSQL is NOT inlined → superuser privileges apply → RLS
-- is bypassed automatically. No SET LOCAL, no STABLE/VOLATILE.
-- ============================================================

CREATE OR REPLACE FUNCTION public.current_user_role()
RETURNS public.user_role
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
DECLARE
  result_role public.user_role;
BEGIN
  SELECT role INTO result_role FROM public.profiles WHERE id = auth.uid();
  RETURN result_role;
END;
$$;

CREATE OR REPLACE FUNCTION public.has_applied_to_job(job_uuid UUID, user_uuid UUID)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM applications
    WHERE job_id = job_uuid AND worker_id = user_uuid
  );
END;
$$;

CREATE OR REPLACE FUNCTION public.is_job_owned_by_user(job_uuid UUID, user_uuid UUID)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
DECLARE
  owner_uuid UUID;
BEGIN
  SELECT employer_id INTO owner_uuid FROM jobs WHERE id = job_uuid;
  RETURN owner_uuid = user_uuid;
END;
$$;
