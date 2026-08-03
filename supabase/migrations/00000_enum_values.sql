-- ============================================================
-- HouseConnect Kenya — Enum Value Migration (MUST RUN FIRST)
-- ============================================================
-- This file runs in its OWN transaction.  After it commits,
-- all enum values are visible to 00001-00005.
-- PostgreSQL error 55P04 prevents using ALTER TYPE ADD VALUE
-- and the new value in the same transaction.
-- ============================================================

-- application_status
DO $func$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'application_status') THEN
    CREATE TYPE application_status AS ENUM ('pending', 'reviewed', 'shortlisted', 'accepted', 'rejected');
  ELSE
    BEGIN EXECUTE 'ALTER TYPE application_status ADD VALUE ''pending''';   EXCEPTION WHEN duplicate_object THEN NULL; END;
    BEGIN EXECUTE 'ALTER TYPE application_status ADD VALUE ''reviewed''';  EXCEPTION WHEN duplicate_object THEN NULL; END;
    BEGIN EXECUTE 'ALTER TYPE application_status ADD VALUE ''shortlisted''';EXCEPTION WHEN duplicate_object THEN NULL; END;
    BEGIN EXECUTE 'ALTER TYPE application_status ADD VALUE ''accepted''';  EXCEPTION WHEN duplicate_object THEN NULL; END;
    BEGIN EXECUTE 'ALTER TYPE application_status ADD VALUE ''rejected''';  EXCEPTION WHEN duplicate_object THEN NULL; END;
  END IF;
END $func$;

-- job_status
DO $func$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'job_status') THEN
    CREATE TYPE job_status AS ENUM ('open', 'closed', 'draft');
  ELSE
    BEGIN EXECUTE 'ALTER TYPE job_status ADD VALUE ''open''';    EXCEPTION WHEN duplicate_object THEN NULL; END;
    BEGIN EXECUTE 'ALTER TYPE job_status ADD VALUE ''closed''';  EXCEPTION WHEN duplicate_object THEN NULL; END;
    BEGIN EXECUTE 'ALTER TYPE job_status ADD VALUE ''draft''';   EXCEPTION WHEN duplicate_object THEN NULL; END;
  END IF;
END $func$;

-- document_status
DO $func$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'document_status') THEN
    CREATE TYPE document_status AS ENUM ('pending', 'approved', 'rejected');
  ELSE
    BEGIN EXECUTE 'ALTER TYPE document_status ADD VALUE ''pending''';   EXCEPTION WHEN duplicate_object THEN NULL; END;
    BEGIN EXECUTE 'ALTER TYPE document_status ADD VALUE ''approved''';  EXCEPTION WHEN duplicate_object THEN NULL; END;
    BEGIN EXECUTE 'ALTER TYPE document_status ADD VALUE ''rejected''';  EXCEPTION WHEN duplicate_object THEN NULL; END;
  END IF;
END $func$;

-- alert_status
DO $func$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'alert_status') THEN
    CREATE TYPE alert_status AS ENUM ('active', 'acknowledged', 'resolved');
  ELSE
    BEGIN EXECUTE 'ALTER TYPE alert_status ADD VALUE ''active''';        EXCEPTION WHEN duplicate_object THEN NULL; END;
    BEGIN EXECUTE 'ALTER TYPE alert_status ADD VALUE ''acknowledged''';  EXCEPTION WHEN duplicate_object THEN NULL; END;
    BEGIN EXECUTE 'ALTER TYPE alert_status ADD VALUE ''resolved''';      EXCEPTION WHEN duplicate_object THEN NULL; END;
  END IF;
END $func$;

-- payment_status
DO $func$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'payment_status') THEN
    CREATE TYPE payment_status AS ENUM ('pending', 'completed', 'cancelled');
  ELSE
    BEGIN EXECUTE 'ALTER TYPE payment_status ADD VALUE ''pending''';    EXCEPTION WHEN duplicate_object THEN NULL; END;
    BEGIN EXECUTE 'ALTER TYPE payment_status ADD VALUE ''completed''';  EXCEPTION WHEN duplicate_object THEN NULL; END;
    BEGIN EXECUTE 'ALTER TYPE payment_status ADD VALUE ''cancelled''';  EXCEPTION WHEN duplicate_object THEN NULL; END;
  END IF;
END $func$;

-- user_role
DO $func$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_role') THEN
    CREATE TYPE user_role AS ENUM ('worker', 'employer', 'admin');
  ELSE
    BEGIN EXECUTE 'ALTER TYPE user_role ADD VALUE ''worker''';    EXCEPTION WHEN duplicate_object THEN NULL; END;
    BEGIN EXECUTE 'ALTER TYPE user_role ADD VALUE ''employer''';  EXCEPTION WHEN duplicate_object THEN NULL; END;
    BEGIN EXECUTE 'ALTER TYPE user_role ADD VALUE ''admin''';     EXCEPTION WHEN duplicate_object THEN NULL; END;
  END IF;
END $func$;

-- user_status
DO $func$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_status') THEN
    CREATE TYPE user_status AS ENUM ('active', 'suspended', 'deactivated');
  ELSE
    BEGIN EXECUTE 'ALTER TYPE user_status ADD VALUE ''active''';       EXCEPTION WHEN duplicate_object THEN NULL; END;
    BEGIN EXECUTE 'ALTER TYPE user_status ADD VALUE ''suspended''';    EXCEPTION WHEN duplicate_object THEN NULL; END;
    BEGIN EXECUTE 'ALTER TYPE user_status ADD VALUE ''deactivated''';  EXCEPTION WHEN duplicate_object THEN NULL; END;
  END IF;
END $func$;
