-- ============================================================
-- Diagnostic: find references to "verification_requests"
-- Run each query separately in SQL Editor
-- ============================================================

-- Query 1: Search all function definitions (plain SELECT, no DO block)
SELECT
  n.nspname AS schema_name,
  p.proname AS function_name
FROM pg_proc p
JOIN pg_namespace n ON n.oid = p.pronamespace
WHERE lower(pg_get_functiondef(p.oid)) LIKE '%verification_requests%';

-- Query 2: Search views
SELECT
  schemaname AS schema_name,
  viewname AS view_name
FROM pg_views
WHERE lower(definition) LIKE '%verification_requests%';

-- Query 3: Check for a table named verification_requests
SELECT EXISTS (
  SELECT 1 FROM information_schema.tables
  WHERE table_name = 'verification_requests'
) AS table_exists;
