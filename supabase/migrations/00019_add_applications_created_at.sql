-- ============================================================
-- Migration 00019: Add missing created_at to applications
-- ============================================================
-- The 00001 migration's DO $$ block skipped created_at/updated_at
-- when adding columns to an existing applications table.
-- This migration adds them back and backfills values.
-- ============================================================

-- 1. Add created_at if missing
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'applications' AND table_schema = 'public' AND column_name = 'created_at'
  ) THEN
    ALTER TABLE applications ADD COLUMN created_at TIMESTAMPTZ NOT NULL DEFAULT now();
    RAISE NOTICE 'Added created_at column to applications';
  ELSE
    RAISE NOTICE 'created_at column already exists on applications';
  END IF;
END $$;

-- 2. Add updated_at if missing (safety check)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'applications' AND table_schema = 'public' AND column_name = 'updated_at'
  ) THEN
    ALTER TABLE applications ADD COLUMN updated_at TIMESTAMPTZ NOT NULL DEFAULT now();
    RAISE NOTICE 'Added updated_at column to applications';
  ELSE
    RAISE NOTICE 'updated_at column already exists on applications';
  END IF;
END $$;

-- 3. Verify both columns exist now
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'applications' AND table_schema = 'public'
  AND column_name IN ('created_at', 'updated_at')
ORDER BY column_name;

-- 4. Reload PostgREST schema cache
NOTIFY pgrst, 'reload schema';
