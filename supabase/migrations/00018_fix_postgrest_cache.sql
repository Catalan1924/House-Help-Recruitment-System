-- ============================================================
-- Migration 00018: Fix PostgREST schema cache
-- ============================================================
-- After FK changes in 00015 and 00016, PostgREST holds a stale
-- schema cache and rejects valid flat queries with 400.
-- This forces a schema cache reload.
-- ============================================================

-- 1. Force PostgREST to reload its schema cache
-- (only works if PostgREST is connected and listening)
NOTIFY pgrst, 'reload schema';

-- 2. Diagnose: test a flat query that mirrors the frontend
-- This is EXACTLY what getEmployerApplicants sends:
--   GET /applications?select=id,job_id,worker_id,cover_letter,status,created_at,updated_at
--       &job_id=in.(<uuid>)&order=created_at.desc&limit=5
--
-- If this returns rows (or 0 rows) without error, PostgREST is fixed.
-- For the employer John Doe (c9d88757-...), we test one of their jobs.
SELECT 
    'flat-query-test' AS test_name,
    a.id,
    a.job_id,
    a.worker_id,
    a.cover_letter,
    a.status,
    a.created_at,
    a.updated_at
FROM applications a
JOIN jobs j ON a.job_id = j.id
WHERE j.employer_id = 'c9d88757-2245-4cb9-8c4f-1f5d15bc1b16'
ORDER BY a.created_at DESC
LIMIT 5;

-- 3. Diagnose: verify is_job_owned_by_user works
-- This is the RLS function used by the applications SELECT policy
SELECT 
    'rls-function-test' AS test_name,
    j.id AS job_id,
    j.employer_id,
    is_job_owned_by_user(j.id, 'c9d88757-2245-4cb9-8c4f-1f5d15bc1b16') AS is_owner
FROM jobs j
WHERE j.employer_id = 'c9d88757-2245-4cb9-8c4f-1f5d15bc1b16'
LIMIT 5;

-- 4. Diagnose: list RLS policies on applications
SELECT 
    schemaname,
    tablename,
    policyname,
    cmd,
    qual,
    with_check
FROM pg_policies
WHERE tablename = 'applications';
