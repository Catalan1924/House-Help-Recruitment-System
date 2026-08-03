-- ============================================================
-- Migration 00015: Fix jobs_employer_id_fkey & backfill profiles
-- ============================================================
-- PROBLEM: The FK `jobs_employer_id_fkey` on the live database
-- references an `employers` table that doesn't exist in any
-- migration. The original schema defines it as:
--     employer_id UUID REFERENCES profiles(id)
--
-- FIX: Drop the broken FK, recreate it referencing profiles(id),
-- and backfill any missing profile rows so the FK doesn't fail.
-- ============================================================

-- 1. Backfill missing profiles for any auth.users without one
-- ------------------------------------------------------------
INSERT INTO public.profiles (id, email, full_name, role)
SELECT
  u.id,
  u.email,
  COALESCE(u.raw_user_meta_data->>'full_name', 'User'),
  COALESCE(
    (u.raw_user_meta_data->>'role')::public.user_role,
    CASE
      WHEN u.raw_user_meta_data->>'role' = 'employer' THEN 'employer'::public.user_role
      WHEN u.raw_user_meta_data->>'role' = 'worker'   THEN 'worker'::public.user_role
      ELSE 'employer'::public.user_role
    END
  )
FROM auth.users u
WHERE NOT EXISTS (
  SELECT 1 FROM public.profiles p WHERE p.id = u.id
);

-- 2. Backfill employer_profiles where missing
-- ------------------------------------------------------------
INSERT INTO public.employer_profiles (user_id)
SELECT p.id
FROM public.profiles p
WHERE p.role = 'employer'
  AND NOT EXISTS (
    SELECT 1 FROM public.employer_profiles ep WHERE ep.user_id = p.id
  );

-- 3. Backfill house_help_profiles where missing
-- ------------------------------------------------------------
INSERT INTO public.house_help_profiles (user_id)
SELECT p.id
FROM public.profiles p
WHERE p.role = 'worker'
  AND NOT EXISTS (
    SELECT 1 FROM public.house_help_profiles hp WHERE hp.user_id = p.id
  );

-- 4. Fix the FK to reference profiles(id) as the schema intends
-- ------------------------------------------------------------
DO $$
DECLARE
  fk_table  TEXT;
  fk_column TEXT;
BEGIN
  -- Find what the FK currently references
  SELECT
    ccu.table_name,
    ccu.column_name
  INTO fk_table, fk_column
  FROM information_schema.table_constraints tc
  JOIN information_schema.constraint_column_usage ccu
    ON tc.constraint_name = ccu.constraint_name
  WHERE tc.constraint_name = 'jobs_employer_id_fkey'
    AND tc.table_name = 'jobs';

  -- If it references something other than profiles.id, fix it
  IF fk_table IS NOT NULL AND (fk_table != 'profiles' OR fk_column != 'id') THEN
    -- Drop the broken FK
    EXECUTE 'ALTER TABLE public.jobs DROP CONSTRAINT jobs_employer_id_fkey';
    
    -- Recreate it referencing profiles(id)
    EXECUTE 'ALTER TABLE public.jobs ADD CONSTRAINT jobs_employer_id_fkey FOREIGN KEY (employer_id) REFERENCES public.profiles(id) ON DELETE CASCADE';
    
    RAISE NOTICE 'Fixed jobs_employer_id_fkey: was referencing %.%, now references profiles.id', fk_table, fk_column;
  ELSIF fk_table IS NULL THEN
    -- FK doesn't exist at all, create it
    EXECUTE 'ALTER TABLE public.jobs ADD CONSTRAINT jobs_employer_id_fkey FOREIGN KEY (employer_id) REFERENCES public.profiles(id) ON DELETE CASCADE';
    
    RAISE NOTICE 'Created jobs_employer_id_fkey referencing profiles.id';
  ELSE
    RAISE NOTICE 'jobs_employer_id_fkey is already correct (references profiles.id)';
  END IF;
END $$;
