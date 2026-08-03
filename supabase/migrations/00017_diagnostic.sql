-- ============================================================
-- Diagnostic: Check applications table + FKs + RLS health
-- Run in Supabase SQL Editor to diagnose 400 errors on
-- GET /rest/v1/applications queries.
-- ============================================================

-- 1. Check if applications table exists with expected columns
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_schema = 'public' AND table_name = 'applications'
ORDER BY ordinal_position;

-- 2. Check all FK constraints on applications
SELECT
  tc.constraint_name,
  kcu.column_name,
  ccu.table_schema AS foreign_table_schema,
  ccu.table_name   AS foreign_table_name,
  ccu.column_name  AS foreign_column_name
FROM information_schema.table_constraints tc
JOIN information_schema.key_column_usage kcu
  ON tc.constraint_name = kcu.constraint_name
JOIN information_schema.constraint_column_usage ccu
  ON tc.constraint_name = ccu.constraint_name
WHERE tc.constraint_type = 'FOREIGN KEY'
  AND tc.table_schema = 'public'
  AND tc.table_name = 'applications';

-- 3. Test is_job_owned_by_user directly (replace UUID with a real job ID)
-- This is the RLS function called by the applications SELECT policy.
-- If this throws an error, RLS will fail for every applications query.

-- First check if the function exists:
SELECT proname, prosrc
FROM pg_proc p
JOIN pg_namespace n ON p.pronamespace = n.oid
WHERE n.nspname = 'public' AND proname = 'is_job_owned_by_user';

-- 4. Check RLS policies on applications
SELECT policyname, cmd, qual, with_check
FROM pg_policies
WHERE schemaname = 'public' AND tablename = 'applications';

-- 5. Check if jobs table has employer_id column
SELECT column_name
FROM information_schema.columns
WHERE table_schema = 'public' AND table_name = 'jobs'
  AND column_name = 'employer_id';

-- 6. Check what tables actually exist (NOT views)
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public' AND table_type = 'BASE TABLE'
ORDER BY table_name;
