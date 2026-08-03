-- ============================================================
-- Migration 00017: Reload PostgREST schema cache + diagnostic
-- ============================================================
-- PROBLEM: After FK changes in 00015/00016, PostgREST caches
-- the old schema. Queries against `applications` return 400
-- because PostgREST's cached FK graph doesn't match reality.
--
-- FIX: Reload the schema cache, then verify the FK state.
-- ============================================================

-- 1. Force PostgREST to reload its schema cache
-- ------------------------------------------------------------
NOTIFY pgrst, 'reload schema';

-- 2. Check applications FK state
-- ------------------------------------------------------------
SELECT
  tc.constraint_name,
  kcu.column_name,
  ccu.table_name  AS referenced_table,
  ccu.column_name AS referenced_column
FROM information_schema.table_constraints tc
JOIN information_schema.key_column_usage kcu
  ON tc.constraint_name = kcu.constraint_name
 AND tc.table_name = kcu.table_name
JOIN information_schema.constraint_column_usage ccu
  ON tc.constraint_name = ccu.constraint_name
WHERE tc.table_name = 'applications'
  AND tc.constraint_type = 'FOREIGN KEY'
ORDER BY tc.constraint_name;

-- 3. Check if is_job_owned_by_user works for the failing job
-- ------------------------------------------------------------
-- Replace with the actual job_id from check.md
SELECT public.is_job_owned_by_user(
  '6b11db51-1319-4989-b1d0-a0fed13661c5'::uuid,
  'c9d88757-2245-4cb9-8c4f-1f5d15bc1b16'::uuid
) AS is_owner;

-- 4. Check that the job actually exists and who owns it
-- ------------------------------------------------------------
SELECT id, title, employer_id, status
FROM public.jobs
WHERE id = '6b11db51-1319-4989-b1d0-a0fed13661c5'::uuid;

-- 5. Check the user's profile and role
-- ------------------------------------------------------------
SELECT id, email, full_name, role, status
FROM public.profiles
WHERE id = 'c9d88757-2245-4cb9-8c4f-1f5d15bc1b16'::uuid;
