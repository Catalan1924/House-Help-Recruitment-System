-- ============================================================
-- Backfill: Create profiles for auth.users that don't have one
-- ============================================================
-- The jobs.employer_id column references profiles(id).
-- If a user signed up before the handle_new_user() trigger was
-- deployed (or the trigger failed), they have no profile row.
-- This causes: "violates foreign key constraint jobs_employer_id_fkey"
-- when trying to create a job as that employer.
-- ============================================================

INSERT INTO public.profiles (id, email, full_name, role)
SELECT
  u.id,
  u.email,
  COALESCE(u.raw_user_meta_data->>'full_name', 'User'),
  COALESCE(
    (u.raw_user_meta_data->>'role')::public.user_role,
    'employer'::public.user_role
  )
FROM auth.users u
WHERE NOT EXISTS (
  SELECT 1 FROM public.profiles p WHERE p.id = u.id
);

-- Also create employer_profiles for any employer-role profiles
-- that don't have one yet
INSERT INTO public.employer_profiles (user_id)
SELECT p.id
FROM public.profiles p
WHERE p.role = 'employer'
  AND NOT EXISTS (
    SELECT 1 FROM public.employer_profiles ep WHERE ep.user_id = p.id
  );

-- Also create house_help_profiles for any worker-role profiles
-- that don't have one yet
INSERT INTO public.house_help_profiles (user_id)
SELECT p.id
FROM public.profiles p
WHERE p.role = 'worker'
  AND NOT EXISTS (
    SELECT 1 FROM public.house_help_profiles hp WHERE hp.user_id = p.id
  );
