-- ============================================================
-- 00009 — Fix: user_status enum missing "active" value
-- ============================================================
-- Error: invalid input value for enum user_status: "active"
--
-- Root cause: profiles.status is type user_status enum on
-- production, but the enum lacks the 'active' value.  When
-- handle_new_user() inserts (id, email, full_name, role)
-- without an explicit status, the DEFAULT 'active' fails
-- because PostgreSQL cannot cast the text 'active' to the
-- user_status enum.
--
-- Fix: add all three valid values to the user_status enum.
-- ============================================================

-- 1. Ensure user_status enum exists with all needed values
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_status') THEN
    CREATE TYPE user_status AS ENUM ('active', 'suspended', 'deactivated');
  ELSE
    BEGIN EXECUTE 'ALTER TYPE user_status ADD VALUE ''active''';       EXCEPTION WHEN duplicate_object THEN NULL; END;
    BEGIN EXECUTE 'ALTER TYPE user_status ADD VALUE ''suspended''';    EXCEPTION WHEN duplicate_object THEN NULL; END;
    BEGIN EXECUTE 'ALTER TYPE user_status ADD VALUE ''deactivated''';  EXCEPTION WHEN duplicate_object THEN NULL; END;
  END IF;
END $$;

-- 2. If profiles.status is the user_status enum, fix its default
--    so that DEFAULT 'active' is properly cast.
DO $$
DECLARE
  col_type TEXT;
BEGIN
  SELECT data_type INTO col_type
  FROM information_schema.columns
  WHERE table_schema = 'public'
    AND table_name = 'profiles'
    AND column_name = 'status';

  -- If the column is the user-defined enum (not plain TEXT or
  -- character varying), re-anchor the default with a cast.
  IF col_type = 'USER-DEFINED' THEN
    EXECUTE 'ALTER TABLE public.profiles ALTER COLUMN status SET DEFAULT ''active''::public.user_status';
  END IF;
END $$;
