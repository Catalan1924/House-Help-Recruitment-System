-- ============================================================
-- HouseConnect Kenya — Database Triggers & Functions
-- ============================================================
-- Run after 00002_rls_policies.sql
-- ============================================================

-- ------------------------------------------------------------
-- 1. Auto-create profile on auth.users insert
--    When a user signs up via Supabase Auth, a trigger creates
--    the corresponding row in the profiles table.
-- ------------------------------------------------------------
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'New User'),
    COALESCE(NEW.raw_user_meta_data->>'role', 'worker')::public.user_role
  );

  -- If worker, also create house_help_profile placeholder
  IF COALESCE(NEW.raw_user_meta_data->>'role', 'worker') = 'worker' THEN
    INSERT INTO public.house_help_profiles (user_id)
    VALUES (NEW.id);
  END IF;

  -- If employer, also create employer_profile placeholder
  IF COALESCE(NEW.raw_user_meta_data->>'role', 'worker') = 'employer' THEN
    INSERT INTO public.employer_profiles (user_id)
    VALUES (NEW.id);
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop existing trigger if re-running
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION handle_new_user();


-- ------------------------------------------------------------
-- 1.1 Helper functions for RLS checks
-- ------------------------------------------------------------
CREATE OR REPLACE FUNCTION has_applied_to_job(job_uuid UUID, user_uuid UUID)
RETURNS BOOLEAN AS $$
BEGIN
  SET LOCAL row_level_security = off;
  RETURN EXISTS (
    SELECT 1 FROM applications
    WHERE job_id = job_uuid AND worker_id = user_uuid
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

CREATE OR REPLACE FUNCTION is_job_owned_by_user(job_uuid UUID, user_uuid UUID)
RETURNS BOOLEAN AS $$
DECLARE
  owner_uuid UUID;
BEGIN
  SET LOCAL row_level_security = off;
  SELECT employer_id INTO owner_uuid FROM jobs WHERE id = job_uuid;
  RETURN owner_uuid = user_uuid;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;


-- ------------------------------------------------------------
-- 2. Update updated_at timestamp automatically
-- ------------------------------------------------------------
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply to all tables with updated_at
DROP TRIGGER IF EXISTS trg_profiles_updated ON profiles;
CREATE TRIGGER trg_profiles_updated
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_timestamp();

DROP TRIGGER IF EXISTS trg_house_help_updated ON house_help_profiles;
CREATE TRIGGER trg_house_help_updated
  BEFORE UPDATE ON house_help_profiles
  FOR EACH ROW EXECUTE FUNCTION update_timestamp();

DROP TRIGGER IF EXISTS trg_employer_updated ON employer_profiles;
CREATE TRIGGER trg_employer_updated
  BEFORE UPDATE ON employer_profiles
  FOR EACH ROW EXECUTE FUNCTION update_timestamp();

DROP TRIGGER IF EXISTS trg_jobs_updated ON jobs;
CREATE TRIGGER trg_jobs_updated
  BEFORE UPDATE ON jobs
  FOR EACH ROW EXECUTE FUNCTION update_timestamp();

DROP TRIGGER IF EXISTS trg_applications_updated ON applications;
CREATE TRIGGER trg_applications_updated
  BEFORE UPDATE ON applications
  FOR EACH ROW EXECUTE FUNCTION update_timestamp();

DROP TRIGGER IF EXISTS trg_conversations_updated ON conversations;
CREATE TRIGGER trg_conversations_updated
  BEFORE UPDATE ON conversations
  FOR EACH ROW EXECUTE FUNCTION update_timestamp();

DROP TRIGGER IF EXISTS trg_verification_docs_updated ON verification_documents;
CREATE TRIGGER trg_verification_docs_updated
  BEFORE UPDATE ON verification_documents
  FOR EACH ROW EXECUTE FUNCTION update_timestamp();

DROP TRIGGER IF EXISTS trg_payments_updated ON payments;
CREATE TRIGGER trg_payments_updated
  BEFORE UPDATE ON payments
  FOR EACH ROW EXECUTE FUNCTION update_timestamp();


-- ------------------------------------------------------------
-- 3. Update worker average_rating when a review is created/updated/deleted
-- ------------------------------------------------------------
CREATE OR REPLACE FUNCTION update_worker_rating()
RETURNS TRIGGER AS $$
DECLARE
  avg_r NUMERIC;
  cnt INTEGER;
BEGIN
  -- Calculate new average for the reviewee
  SELECT AVG(rating)::NUMERIC(2,1), COUNT(*)
  INTO avg_r, cnt
  FROM reviews
  WHERE reviewee_id = COALESCE(NEW.reviewee_id, OLD.reviewee_id);

  UPDATE house_help_profiles
  SET
    average_rating = COALESCE(avg_r, 0.0),
    total_reviews = COALESCE(cnt, 0)
  WHERE user_id = COALESCE(NEW.reviewee_id, OLD.reviewee_id);

  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_review_rating ON reviews;

CREATE TRIGGER trg_review_rating
  AFTER INSERT OR UPDATE OR DELETE ON reviews
  FOR EACH ROW EXECUTE FUNCTION update_worker_rating();


-- ------------------------------------------------------------
-- 4. Notify workers when their application status changes
-- ------------------------------------------------------------
CREATE OR REPLACE FUNCTION notify_application_status_change()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status != OLD.status THEN
    INSERT INTO notifications (user_id, title, message, type, metadata)
    VALUES (
      NEW.worker_id,
      CASE NEW.status
        WHEN 'reviewed' THEN 'Application Reviewed'
        WHEN 'shortlisted' THEN 'You''ve Been Shortlisted! 🎉'
        WHEN 'accepted' THEN 'Congratulations! You''ve Been Hired! 🎉'
        WHEN 'rejected' THEN 'Application Update'
        ELSE 'Application Status Updated'
      END,
      CASE NEW.status
        WHEN 'reviewed' THEN 'Your application has been reviewed by the employer.'
        WHEN 'shortlisted' THEN 'Great news! You have been shortlisted for a job.'
        WHEN 'accepted' THEN 'Congratulations! The employer has accepted your application.'
        WHEN 'rejected' THEN 'Unfortunately, the employer has moved forward with other candidates.'
        ELSE 'Your application status has been updated to: ' || NEW.status
      END,
      'application',
      jsonb_build_object('application_id', NEW.id, 'job_id', NEW.job_id, 'status', NEW.status)
    );
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_application_status_notify ON applications;

CREATE TRIGGER trg_application_status_notify
  AFTER UPDATE ON applications
  FOR EACH ROW
  WHEN (OLD.status IS DISTINCT FROM NEW.status)
  EXECUTE FUNCTION notify_application_status_change();


-- ------------------------------------------------------------
-- 5. Notify employers when someone applies to their job
-- ------------------------------------------------------------
CREATE OR REPLACE FUNCTION notify_new_application()
RETURNS TRIGGER AS $$
DECLARE
  employer_uid UUID;
  job_title TEXT;
  worker_name TEXT;
BEGIN
  -- Get job title and employer
  SELECT j.title, j.employer_id INTO job_title, employer_uid
  FROM jobs j WHERE j.id = NEW.job_id;

  -- Get worker name
  SELECT p.full_name INTO worker_name
  FROM profiles p WHERE p.id = NEW.worker_id;

  INSERT INTO notifications (user_id, title, message, type, metadata)
  VALUES (
    employer_uid,
    'New Application Received',
    worker_name || ' has applied for "' || job_title || '"',
    'application',
    jsonb_build_object('application_id', NEW.id, 'job_id', NEW.job_id, 'worker_id', NEW.worker_id)
  );

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_new_application_notify ON applications;

CREATE TRIGGER trg_new_application_notify
  AFTER INSERT ON applications
  FOR EACH ROW
  EXECUTE FUNCTION notify_new_application();


-- ------------------------------------------------------------
-- 6. Notify users when they receive a new message
-- ------------------------------------------------------------
CREATE OR REPLACE FUNCTION notify_new_message()
RETURNS TRIGGER AS $$
DECLARE
  receiver_id UUID;
  sender_name TEXT;
BEGIN
  -- Determine the receiver (the participant who is NOT the sender)
  SELECT CASE
    WHEN c.participant1_id = NEW.sender_id THEN c.participant2_id
    ELSE c.participant1_id
  END INTO receiver_id
  FROM conversations c WHERE c.id = NEW.conversation_id;

  -- Get sender's name
  SELECT full_name INTO sender_name
  FROM profiles WHERE id = NEW.sender_id;

  INSERT INTO notifications (user_id, title, message, type, metadata)
  VALUES (
    receiver_id,
    'New Message',
    sender_name || ' sent you a message',
    'message',
    jsonb_build_object('conversation_id', NEW.conversation_id, 'sender_id', NEW.sender_id)
  );

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_new_message_notify ON messages;

CREATE TRIGGER trg_new_message_notify
  AFTER INSERT ON messages
  FOR EACH ROW
  EXECUTE FUNCTION notify_new_message();


-- ------------------------------------------------------------
-- 7. Notify admins on emergency alert
-- ------------------------------------------------------------
CREATE OR REPLACE FUNCTION notify_emergency_alert()
RETURNS TRIGGER AS $$
DECLARE
  admin_record RECORD;
  worker_name TEXT;
BEGIN
  -- Get worker name
  SELECT full_name INTO worker_name
  FROM profiles WHERE id = NEW.user_id;

  -- Notify all admins
  FOR admin_record IN SELECT id FROM profiles WHERE role = 'admin'::public.user_role LOOP
    INSERT INTO notifications (user_id, title, message, type, metadata)
    VALUES (
      admin_record.id,
      '🚨 EMERGENCY ALERT',
      worker_name || ' has sent an emergency SOS alert from ' || COALESCE(NEW.location, 'Unknown location'),
      'emergency',
      jsonb_build_object('alert_id', NEW.id, 'user_id', NEW.user_id, 'location', NEW.location)
    );
  END LOOP;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS trg_emergency_notify ON emergency_alerts;

CREATE TRIGGER trg_emergency_notify
  AFTER INSERT ON emergency_alerts
  FOR EACH ROW
  EXECUTE FUNCTION notify_emergency_alert();


-- ------------------------------------------------------------
-- 8. Increment job view_count
-- ------------------------------------------------------------
CREATE OR REPLACE FUNCTION increment_job_view(job_id UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE jobs SET view_count = view_count + 1 WHERE id = job_id;
END;
$$ LANGUAGE plpgsql;


-- ------------------------------------------------------------
-- 9. Search function for jobs (full-text)
-- ------------------------------------------------------------
CREATE OR REPLACE FUNCTION search_jobs(
  search_term TEXT,
  county_filter TEXT DEFAULT NULL,
  employment_type_filter TEXT DEFAULT NULL,
  min_salary_filter INTEGER DEFAULT NULL,
  max_salary_filter INTEGER DEFAULT NULL,
  page_num INTEGER DEFAULT 1,
  page_size INTEGER DEFAULT 20
)
RETURNS TABLE(
  id UUID,
  employer_id UUID,
  title TEXT,
  description TEXT,
  county TEXT,
  town TEXT,
  employment_type TEXT,
  salary_min INTEGER,
  salary_max INTEGER,
  salary_currency TEXT,
  status TEXT,
  view_count INTEGER,
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ,
  employer_name TEXT,
  employer_county TEXT,
  total_count BIGINT
) AS $$
BEGIN
  RETURN QUERY
  WITH filtered AS (
    SELECT j.*, p.full_name AS employer_name, p.county AS employer_county
    FROM jobs j
    JOIN profiles p ON p.id = j.employer_id
    WHERE j.status::text = 'open'
      AND (search_term IS NULL OR search_term = '' OR
           to_tsvector('english', j.title || ' ' || j.description) @@ plainto_tsquery('english', search_term))
      AND (county_filter IS NULL OR j.county = county_filter)
      AND (employment_type_filter IS NULL OR j.employment_type = employment_type_filter)
      AND (min_salary_filter IS NULL OR j.salary_max >= min_salary_filter)
      AND (max_salary_filter IS NULL OR j.salary_min <= max_salary_filter)
  ),
  counted AS (
    SELECT COUNT(*) AS total FROM filtered
  )
  SELECT f.*, c.total AS total_count
  FROM filtered f, counted c
  ORDER BY f.created_at DESC
  LIMIT page_size
  OFFSET (page_num - 1) * page_size;
END;
$$ LANGUAGE plpgsql;


-- ------------------------------------------------------------
-- 10. Get dashboard stats for admin
-- ------------------------------------------------------------
CREATE OR REPLACE FUNCTION get_admin_stats()
RETURNS JSON AS $$
DECLARE
  total_users INTEGER;
  active_jobs INTEGER;
  pending_verifications INTEGER;
  active_emergencies INTEGER;
BEGIN
  SELECT COUNT(*) INTO total_users FROM profiles;
  SELECT COUNT(*) INTO active_jobs FROM jobs WHERE status::text = 'open';
  SELECT COUNT(*) INTO pending_verifications FROM verification_documents WHERE status::text = 'pending';
  SELECT COUNT(*) INTO active_emergencies FROM emergency_alerts WHERE status::text = 'active';

  RETURN json_build_object(
    'total_users', total_users,
    'active_jobs', active_jobs,
    'pending_verifications', pending_verifications,
    'active_emergencies', active_emergencies
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


-- ------------------------------------------------------------
-- 11. Get dashboard stats for employer
-- ------------------------------------------------------------
CREATE OR REPLACE FUNCTION get_employer_stats(employer_id UUID)
RETURNS JSON AS $$
DECLARE
  active_jobs_count INTEGER;
  total_applicants INTEGER;
  shortlisted_count INTEGER;
  hired_count INTEGER;
BEGIN
  SELECT COUNT(*) INTO active_jobs_count FROM jobs WHERE employer_id = $1 AND status::text = 'open';
  SELECT COUNT(*) INTO total_applicants FROM applications a JOIN jobs j ON a.job_id = j.id WHERE j.employer_id = $1;
  SELECT COUNT(*) INTO shortlisted_count FROM applications a JOIN jobs j ON a.job_id = j.id WHERE j.employer_id = $1 AND a.status::text = 'shortlisted';
  SELECT COUNT(*) INTO hired_count FROM applications a JOIN jobs j ON a.job_id = j.id WHERE j.employer_id = $1 AND a.status::text = 'accepted';

  RETURN json_build_object(
    'active_jobs', active_jobs_count,
    'total_applicants', total_applicants,
    'shortlisted', shortlisted_count,
    'hired', hired_count
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


-- ------------------------------------------------------------
-- 12. Get dashboard stats for worker
-- ------------------------------------------------------------
CREATE OR REPLACE FUNCTION get_worker_stats(worker_id UUID)
RETURNS JSON AS $$
DECLARE
  available_jobs INTEGER;
  applications_count INTEGER;
  unread_notifications INTEGER;
  avg_rating NUMERIC;
BEGIN
  SELECT COUNT(*) INTO available_jobs FROM jobs WHERE status::text = 'open';
  SELECT COUNT(*) INTO applications_count FROM applications WHERE worker_id = $1;
  SELECT COUNT(*) INTO unread_notifications FROM notifications WHERE user_id = $1 AND read = false;
  SELECT average_rating INTO avg_rating FROM house_help_profiles WHERE user_id = $1;

  RETURN json_build_object(
    'available_jobs', available_jobs,
    'applications_count', applications_count,
    'unread_notifications', unread_notifications,
    'average_rating', COALESCE(avg_rating, 0.0)
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
