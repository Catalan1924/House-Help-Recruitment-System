-- ============================================================
-- HouseConnect Kenya — Row Level Security Policies
-- ============================================================
-- Run after 00001_initial_schema.sql
-- All policies use DROP IF EXISTS + CREATE for safe re-runs.
-- ============================================================

-- Enable RLS on ALL tables (safe to re-run)
-- ------------------------------------------------------------
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE house_help_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE employer_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE emergency_alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE verification_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;


-- ============================================================
-- 1. PROFILES
-- ============================================================

-- Everyone can read their own profile
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

-- Admins can view all profiles
DROP POLICY IF EXISTS "Admins can view all profiles" ON profiles;
CREATE POLICY "Admins can view all profiles"
  ON profiles FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
  ));

-- Workers/employers can view profiles of people they interact with
-- (conversation participants, job posters, etc.) — handled by join policies.

-- Users can update their own profile (but NOT their role)
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id AND role = (SELECT role FROM profiles WHERE id = auth.uid()));

-- Users can insert their own profile
DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;
CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- No deletions from profiles (handled via auth.users cascade)


-- ============================================================
-- 2. HOUSE HELP (WORKER) PROFILES
-- ============================================================

-- Workers can read their own profile
DROP POLICY IF EXISTS "Workers can view own HH profile" ON house_help_profiles;
CREATE POLICY "Workers can view own HH profile"
  ON house_help_profiles FOR SELECT
  USING (auth.uid() = user_id);

-- Employers can read all worker profiles (to find workers)
DROP POLICY IF EXISTS "Employers can view worker profiles" ON house_help_profiles;
CREATE POLICY "Employers can view worker profiles"
  ON house_help_profiles FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('employer', 'admin')
  ));

-- Admins can view all
DROP POLICY IF EXISTS "Admins can view all HH profiles" ON house_help_profiles;
CREATE POLICY "Admins can view all HH profiles"
  ON house_help_profiles FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
  ));

-- Workers can update their own HH profile
DROP POLICY IF EXISTS "Workers can update own HH profile" ON house_help_profiles;
CREATE POLICY "Workers can update own HH profile"
  ON house_help_profiles FOR UPDATE
  USING (auth.uid() = user_id);

-- Workers can insert their own HH profile
DROP POLICY IF EXISTS "Workers can insert own HH profile" ON house_help_profiles;
CREATE POLICY "Workers can insert own HH profile"
  ON house_help_profiles FOR INSERT
  WITH CHECK (auth.uid() = user_id);


-- ============================================================
-- 3. EMPLOYER PROFILES
-- ============================================================

-- Employer can read own profile
DROP POLICY IF EXISTS "Employers can view own profile" ON employer_profiles;
CREATE POLICY "Employers can view own profile"
  ON employer_profiles FOR SELECT
  USING (auth.uid() = user_id);

-- Workers can view employer profiles (to see who posted a job)
DROP POLICY IF EXISTS "Workers can view employer profiles" ON employer_profiles;
CREATE POLICY "Workers can view employer profiles"
  ON employer_profiles FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('worker', 'admin')
  ));

-- Employer can update own profile
DROP POLICY IF EXISTS "Employers can update own profile" ON employer_profiles;
CREATE POLICY "Employers can update own profile"
  ON employer_profiles FOR UPDATE
  USING (auth.uid() = user_id);

-- Employer can insert own profile
DROP POLICY IF EXISTS "Employers can insert own profile" ON employer_profiles;
CREATE POLICY "Employers can insert own profile"
  ON employer_profiles FOR INSERT
  WITH CHECK (auth.uid() = user_id);


-- ============================================================
-- 4. JOBS
-- ============================================================

-- Everyone can read open jobs
DROP POLICY IF EXISTS "Anyone can view open jobs" ON jobs;
CREATE POLICY "Anyone can view open jobs"
  ON jobs FOR SELECT
  USING (status::text = 'open' OR EXISTS (
    SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
  ));

-- Employer can read their own jobs (all statuses)
DROP POLICY IF EXISTS "Employers can view own jobs" ON jobs;
CREATE POLICY "Employers can view own jobs"
  ON jobs FOR SELECT
  USING (auth.uid() = employer_id);

-- Workers can view jobs they've applied to
DROP POLICY IF EXISTS "Workers can view applied jobs" ON jobs;
CREATE POLICY "Workers can view applied jobs"
  ON jobs FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM applications
    WHERE job_id = jobs.id AND worker_id = auth.uid()
  ));

-- Employer can create jobs
DROP POLICY IF EXISTS "Employers can create jobs" ON jobs;
CREATE POLICY "Employers can create jobs"
  ON jobs FOR INSERT
  WITH CHECK (
    auth.uid() = employer_id
    AND EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('employer', 'admin'))
  );

-- Employer can update own jobs
DROP POLICY IF EXISTS "Employers can update own jobs" ON jobs;
CREATE POLICY "Employers can update own jobs"
  ON jobs FOR UPDATE
  USING (auth.uid() = employer_id)
  WITH CHECK (auth.uid() = employer_id);

-- Employer can delete own jobs
DROP POLICY IF EXISTS "Employers can delete own jobs" ON jobs;
CREATE POLICY "Employers can delete own jobs"
  ON jobs FOR DELETE
  USING (auth.uid() = employer_id);

-- Admins can manage all jobs
DROP POLICY IF EXISTS "Admins can manage all jobs" ON jobs;
CREATE POLICY "Admins can manage all jobs"
  ON jobs FOR ALL
  USING (EXISTS (
    SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
  ));


-- ============================================================
-- 5. APPLICATIONS
-- ============================================================

-- Worker can read own applications
DROP POLICY IF EXISTS "Workers can view own applications" ON applications;
CREATE POLICY "Workers can view own applications"
  ON applications FOR SELECT
  USING (auth.uid() = worker_id);

-- Employer can read applications for their jobs
DROP POLICY IF EXISTS "Employers can view applications for their jobs" ON applications;
CREATE POLICY "Employers can view applications for their jobs"
  ON applications FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM jobs WHERE id = applications.job_id AND employer_id = auth.uid()
  ));

-- Worker can create applications
DROP POLICY IF EXISTS "Workers can create applications" ON applications;
CREATE POLICY "Workers can create applications"
  ON applications FOR INSERT
  WITH CHECK (
    auth.uid() = worker_id
    AND EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'worker')
  );

-- Employer can update application status
DROP POLICY IF EXISTS "Employers can update application status" ON applications;
CREATE POLICY "Employers can update application status"
  ON applications FOR UPDATE
  USING (EXISTS (
    SELECT 1 FROM jobs WHERE id = applications.job_id AND employer_id = auth.uid()
  ));

-- Worker can withdraw own applications
DROP POLICY IF EXISTS "Workers can withdraw own applications" ON applications;
CREATE POLICY "Workers can withdraw own applications"
  ON applications FOR UPDATE
  USING (auth.uid() = worker_id AND status::text = 'pending');

-- Admins can manage all applications
DROP POLICY IF EXISTS "Admins can manage all applications" ON applications;
CREATE POLICY "Admins can manage all applications"
  ON applications FOR ALL
  USING (EXISTS (
    SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
  ));


-- ============================================================
-- 6. CONVERSATIONS
-- ============================================================

-- Participants can read their conversations
DROP POLICY IF EXISTS "Participants can view conversations" ON conversations;
CREATE POLICY "Participants can view conversations"
  ON conversations FOR SELECT
  USING (auth.uid() = participant1_id OR auth.uid() = participant2_id);

-- Participants can create conversations
DROP POLICY IF EXISTS "Users can create conversations" ON conversations;
CREATE POLICY "Users can create conversations"
  ON conversations FOR INSERT
  WITH CHECK (auth.uid() = participant1_id OR auth.uid() = participant2_id);

-- No direct updates/deletes — handled by triggers and application logic


-- ============================================================
-- 7. MESSAGES
-- ============================================================

-- Participants can read messages in their conversations
DROP POLICY IF EXISTS "Participants can view messages" ON messages;
CREATE POLICY "Participants can view messages"
  ON messages FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM conversations
    WHERE id = messages.conversation_id
    AND (participant1_id = auth.uid() OR participant2_id = auth.uid())
  ));

-- Participants can send messages
DROP POLICY IF EXISTS "Participants can send messages" ON messages;
CREATE POLICY "Participants can send messages"
  ON messages FOR INSERT
  WITH CHECK (
    auth.uid() = sender_id
    AND EXISTS (
      SELECT 1 FROM conversations
      WHERE id = messages.conversation_id
      AND (participant1_id = auth.uid() OR participant2_id = auth.uid())
    )
  );

-- Recipient marks OTHER people's messages as read:
DROP POLICY IF EXISTS "Recipient can mark messages as read" ON messages;
CREATE POLICY "Recipient can mark messages as read"
  ON messages FOR UPDATE
  USING (EXISTS (
    SELECT 1 FROM conversations
    WHERE id = messages.conversation_id
    AND (participant1_id = auth.uid() OR participant2_id = auth.uid())
    AND sender_id != auth.uid()
  ));


-- ============================================================
-- 8. REVIEWS
-- ============================================================

-- Everyone can read all reviews
DROP POLICY IF EXISTS "Anyone can view reviews" ON reviews;
CREATE POLICY "Anyone can view reviews"
  ON reviews FOR SELECT
  USING (true);

-- Authenticated users can create reviews
DROP POLICY IF EXISTS "Authenticated users can create reviews" ON reviews;
CREATE POLICY "Authenticated users can create reviews"
  ON reviews FOR INSERT
  WITH CHECK (auth.uid() = reviewer_id);

-- Users can update their own reviews
DROP POLICY IF EXISTS "Users can update own reviews" ON reviews;
CREATE POLICY "Users can update own reviews"
  ON reviews FOR UPDATE
  USING (auth.uid() = reviewer_id);

-- Users can delete their own reviews; admins can delete any
DROP POLICY IF EXISTS "Users can delete own reviews" ON reviews;
CREATE POLICY "Users can delete own reviews"
  ON reviews FOR DELETE
  USING (auth.uid() = reviewer_id OR EXISTS (
    SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
  ));


-- ============================================================
-- 9. EMERGENCY ALERTS
-- ============================================================

-- Worker can view own alerts
DROP POLICY IF EXISTS "Workers can view own emergency alerts" ON emergency_alerts;
CREATE POLICY "Workers can view own emergency alerts"
  ON emergency_alerts FOR SELECT
  USING (auth.uid() = user_id);

-- Admins can view all alerts
DROP POLICY IF EXISTS "Admins can view all emergency alerts" ON emergency_alerts;
CREATE POLICY "Admins can view all emergency alerts"
  ON emergency_alerts FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
  ));

-- Workers can create alerts
DROP POLICY IF EXISTS "Workers can create emergency alerts" ON emergency_alerts;
CREATE POLICY "Workers can create emergency alerts"
  ON emergency_alerts FOR INSERT
  WITH CHECK (
    auth.uid() = user_id
    AND EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'worker')
  );

-- Admins can update alert status
DROP POLICY IF EXISTS "Admins can update emergency alerts" ON emergency_alerts;
CREATE POLICY "Admins can update emergency alerts"
  ON emergency_alerts FOR UPDATE
  USING (EXISTS (
    SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
  ));


-- ============================================================
-- 10. NOTIFICATIONS
-- ============================================================

-- Users can view own notifications
DROP POLICY IF EXISTS "Users can view own notifications" ON notifications;
CREATE POLICY "Users can view own notifications"
  ON notifications FOR SELECT
  USING (auth.uid() = user_id);

-- Admins can create notifications
DROP POLICY IF EXISTS "Admins can create notifications" ON notifications;
CREATE POLICY "Admins can create notifications"
  ON notifications FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
  ));

-- Users can mark own notifications as read
DROP POLICY IF EXISTS "Users can update own notifications" ON notifications;
CREATE POLICY "Users can update own notifications"
  ON notifications FOR UPDATE
  USING (auth.uid() = user_id);

-- Users can delete own notifications
DROP POLICY IF EXISTS "Users can delete own notifications" ON notifications;
CREATE POLICY "Users can delete own notifications"
  ON notifications FOR DELETE
  USING (auth.uid() = user_id);


-- ============================================================
-- 11. VERIFICATION DOCUMENTS
-- ============================================================

-- Users can view own documents
DROP POLICY IF EXISTS "Users can view own documents" ON verification_documents;
CREATE POLICY "Users can view own documents"
  ON verification_documents FOR SELECT
  USING (auth.uid() = user_id);

-- Admins can view all documents
DROP POLICY IF EXISTS "Admins can view all documents" ON verification_documents;
CREATE POLICY "Admins can view all documents"
  ON verification_documents FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
  ));

-- Users can upload documents
DROP POLICY IF EXISTS "Users can upload documents" ON verification_documents;
CREATE POLICY "Users can upload documents"
  ON verification_documents FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Admins can review documents (update status)
DROP POLICY IF EXISTS "Admins can review documents" ON verification_documents;
CREATE POLICY "Admins can review documents"
  ON verification_documents FOR UPDATE
  USING (EXISTS (
    SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
  ));


-- ============================================================
-- 12. PAYMENTS
-- ============================================================

-- Employers can view own payments
DROP POLICY IF EXISTS "Employers can view own payments" ON payments;
CREATE POLICY "Employers can view own payments"
  ON payments FOR SELECT
  USING (auth.uid() = employer_id);

-- Workers can view payments to them
DROP POLICY IF EXISTS "Workers can view received payments" ON payments;
CREATE POLICY "Workers can view received payments"
  ON payments FOR SELECT
  USING (auth.uid() = worker_id);

-- Admins can view all payments
DROP POLICY IF EXISTS "Admins can view all payments" ON payments;
CREATE POLICY "Admins can view all payments"
  ON payments FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
  ));

-- Employers can create payments
DROP POLICY IF EXISTS "Employers can create payments" ON payments;
CREATE POLICY "Employers can create payments"
  ON payments FOR INSERT
  WITH CHECK (auth.uid() = employer_id);


-- ============================================================
-- STORAGE BUCKET POLICIES
-- (Run these via Supabase Dashboard SQL Editor or migrations)
-- ============================================================

-- Note: Storage RLS policies must be created separately via
-- the Supabase dashboard or using the storage API.
-- Required buckets:
--   1. 'avatars'    — Profile pictures (public read)
--   2. 'documents'  — Verification documents (authenticated read, owner upload)
