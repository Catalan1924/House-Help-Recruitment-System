-- ============================================================
-- HouseConnect Kenya — Initial Database Schema
-- ============================================================
-- Run this migration first to create all tables, indexes,
-- and relationships for the platform.
-- ============================================================

-- 1. EXTENSIONS
-- ------------------------------------------------------------
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. PROFILES (base user table, 1:1 with auth.users)
-- ------------------------------------------------------------
-- Every user (worker, employer, admin) has ONE row here.
-- role: 'worker' | 'employer' | 'admin'
-- ------------------------------------------------------------
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'profiles' AND table_schema = 'public') THEN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND table_schema = 'public' AND column_name = 'avatar_url') THEN
      ALTER TABLE profiles ADD COLUMN avatar_url TEXT; END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND table_schema = 'public' AND column_name = 'county') THEN
      ALTER TABLE profiles ADD COLUMN county TEXT; END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND table_schema = 'public' AND column_name = 'town') THEN
      ALTER TABLE profiles ADD COLUMN town TEXT; END IF;
  END IF;
END $$;

CREATE TABLE IF NOT EXISTS profiles (
  id              UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name       TEXT NOT NULL,
  phone           TEXT,
  county          TEXT,
  town            TEXT,
  role            public.user_role NOT NULL,
  status          TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'suspended', 'deactivated')),
  avatar_url      TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_profiles_role ON profiles(role);
CREATE INDEX IF NOT EXISTS idx_profiles_county ON profiles(county);
CREATE INDEX IF NOT EXISTS idx_profiles_status ON profiles(status);


-- 3. HOUSE HELP (WORKER) PROFILES
-- ------------------------------------------------------------
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'house_help_profiles' AND table_schema = 'public') THEN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'house_help_profiles' AND table_schema = 'public' AND column_name = 'bio') THEN
      ALTER TABLE house_help_profiles ADD COLUMN bio TEXT; END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'house_help_profiles' AND table_schema = 'public' AND column_name = 'profile_photo_url') THEN
      ALTER TABLE house_help_profiles ADD COLUMN profile_photo_url TEXT; END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'house_help_profiles' AND table_schema = 'public' AND column_name = 'average_rating') THEN
      ALTER TABLE house_help_profiles ADD COLUMN average_rating NUMERIC(2,1) DEFAULT 0.0; END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'house_help_profiles' AND table_schema = 'public' AND column_name = 'total_reviews') THEN
      ALTER TABLE house_help_profiles ADD COLUMN total_reviews INTEGER DEFAULT 0; END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'house_help_profiles' AND table_schema = 'public' AND column_name = 'preferred_job_types') THEN
      ALTER TABLE house_help_profiles ADD COLUMN preferred_job_types TEXT[] DEFAULT '{}'; END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'house_help_profiles' AND table_schema = 'public' AND column_name = 'age') THEN
      ALTER TABLE house_help_profiles ADD COLUMN age INTEGER; END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'house_help_profiles' AND table_schema = 'public' AND column_name = 'gender') THEN
      ALTER TABLE house_help_profiles ADD COLUMN gender TEXT; END IF;
  END IF;
END $$;

CREATE TABLE IF NOT EXISTS house_help_profiles (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id           UUID NOT NULL UNIQUE REFERENCES profiles(id) ON DELETE CASCADE,
  experience        TEXT CHECK (experience IN ('0-1 year', '1-3 years', '3-5 years', '5-10 years', '10+ years')),
  expected_salary   INTEGER,
  skills            TEXT[] DEFAULT '{}',
  availability      TEXT DEFAULT 'Available' CHECK (availability IN ('Available', 'Employed', 'Not Available')),
  preferred_job_types TEXT[] DEFAULT '{}',
  age               INTEGER,
  gender            TEXT,
  bio               TEXT,
  profile_photo_url TEXT,
  verification_status TEXT NOT NULL DEFAULT 'not_submitted' CHECK (verification_status IN ('pending', 'verified', 'rejected', 'not_submitted')),
  average_rating    NUMERIC(2,1) DEFAULT 0.0,
  total_reviews     INTEGER DEFAULT 0,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_worker_user_id ON house_help_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_worker_county ON house_help_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_worker_availability ON house_help_profiles(availability);
CREATE INDEX IF NOT EXISTS idx_worker_verification ON house_help_profiles(verification_status);


-- 4. EMPLOYER PROFILES
-- ------------------------------------------------------------
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'employer_profiles' AND table_schema = 'public') THEN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'employer_profiles' AND table_schema = 'public' AND column_name = 'company_name') THEN
      ALTER TABLE employer_profiles ADD COLUMN company_name TEXT; END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'employer_profiles' AND table_schema = 'public' AND column_name = 'household_type') THEN
      ALTER TABLE employer_profiles ADD COLUMN household_type TEXT; END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'employer_profiles' AND table_schema = 'public' AND column_name = 'preferred_gender') THEN
      ALTER TABLE employer_profiles ADD COLUMN preferred_gender TEXT; END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'employer_profiles' AND table_schema = 'public' AND column_name = 'verified') THEN
      ALTER TABLE employer_profiles ADD COLUMN verified BOOLEAN DEFAULT false; END IF;
  END IF;
END $$;

CREATE TABLE IF NOT EXISTS employer_profiles (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id           UUID NOT NULL UNIQUE REFERENCES profiles(id) ON DELETE CASCADE,
  company_name      TEXT,
  household_type    TEXT,
  preferred_gender  TEXT,
  verified          BOOLEAN DEFAULT false,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_employer_user_id ON employer_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_employer_verified ON employer_profiles(verified);


-- 5. JOBS
-- ------------------------------------------------------------
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'jobs' AND table_schema = 'public') THEN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'jobs' AND table_schema = 'public' AND column_name = 'responsibilities') THEN
      ALTER TABLE jobs ADD COLUMN responsibilities TEXT[] DEFAULT '{}'; END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'jobs' AND table_schema = 'public' AND column_name = 'requirements') THEN
      ALTER TABLE jobs ADD COLUMN requirements TEXT[] DEFAULT '{}'; END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'jobs' AND table_schema = 'public' AND column_name = 'benefits') THEN
      ALTER TABLE jobs ADD COLUMN benefits TEXT[] DEFAULT '{}'; END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'jobs' AND table_schema = 'public' AND column_name = 'salary_min') THEN
      ALTER TABLE jobs ADD COLUMN salary_min INTEGER; END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'jobs' AND table_schema = 'public' AND column_name = 'salary_max') THEN
      ALTER TABLE jobs ADD COLUMN salary_max INTEGER; END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'jobs' AND table_schema = 'public' AND column_name = 'salary_currency') THEN
      ALTER TABLE jobs ADD COLUMN salary_currency TEXT DEFAULT 'KES'; END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'jobs' AND table_schema = 'public' AND column_name = 'view_count') THEN
      ALTER TABLE jobs ADD COLUMN view_count INTEGER DEFAULT 0; END IF;
  END IF;
END $$;

CREATE TABLE IF NOT EXISTS jobs (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  employer_id     UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title           TEXT NOT NULL,
  description     TEXT NOT NULL,
  responsibilities TEXT[] DEFAULT '{}',
  requirements    TEXT[] DEFAULT '{}',
  benefits        TEXT[] DEFAULT '{}',
  county          TEXT NOT NULL,
  town            TEXT,
  employment_type TEXT NOT NULL CHECK (employment_type IN ('Full-time', 'Part-time', 'Live-in', 'Live-out', 'Contract', 'Temporary')),
  salary_min      INTEGER,
  salary_max      INTEGER,
  salary_currency TEXT DEFAULT 'KES',
  status          TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'closed', 'filled', 'draft')),
  view_count      INTEGER DEFAULT 0,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_jobs_employer ON jobs(employer_id);
CREATE INDEX IF NOT EXISTS idx_jobs_county ON jobs(county);
CREATE INDEX IF NOT EXISTS idx_jobs_status ON jobs(status);
CREATE INDEX IF NOT EXISTS idx_jobs_employment_type ON jobs(employment_type);
CREATE INDEX IF NOT EXISTS idx_jobs_salary ON jobs(salary_min, salary_max);
CREATE INDEX IF NOT EXISTS idx_jobs_created ON jobs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_jobs_search ON jobs USING gin(
  to_tsvector('english', title || ' ' || description)
);


-- 6. APPLICATIONS
-- ------------------------------------------------------------
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'applications' AND table_schema = 'public') THEN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'applications' AND table_schema = 'public' AND column_name = 'job_id') THEN
      ALTER TABLE applications ADD COLUMN job_id UUID NOT NULL REFERENCES jobs(id) ON DELETE CASCADE; END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'applications' AND table_schema = 'public' AND column_name = 'worker_id') THEN
      ALTER TABLE applications ADD COLUMN worker_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE; END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'applications' AND table_schema = 'public' AND column_name = 'cover_letter') THEN
      ALTER TABLE applications ADD COLUMN cover_letter TEXT DEFAULT ''; END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'applications' AND table_schema = 'public' AND column_name = 'status') THEN
      ALTER TABLE applications ADD COLUMN status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'shortlisted', 'accepted', 'rejected', 'withdrawn')); END IF;
  END IF;
END $$;

CREATE TABLE IF NOT EXISTS applications (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  job_id          UUID NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
  worker_id       UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  cover_letter    TEXT DEFAULT '',
  status          TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'shortlisted', 'accepted', 'rejected', 'withdrawn')),
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(job_id, worker_id)
);

CREATE INDEX IF NOT EXISTS idx_applications_job ON applications(job_id);
CREATE INDEX IF NOT EXISTS idx_applications_worker ON applications(worker_id);
CREATE INDEX IF NOT EXISTS idx_applications_status ON applications(status);


-- 7. CONVERSATIONS
-- ------------------------------------------------------------
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'conversations' AND table_schema = 'public') THEN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'conversations' AND table_schema = 'public' AND column_name = 'participant1_id') THEN
      ALTER TABLE conversations ADD COLUMN participant1_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE; END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'conversations' AND table_schema = 'public' AND column_name = 'participant2_id') THEN
      ALTER TABLE conversations ADD COLUMN participant2_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE; END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'conversations' AND table_schema = 'public' AND column_name = 'last_message_id') THEN
      ALTER TABLE conversations ADD COLUMN last_message_id UUID; END IF;
  END IF;
END $$;

CREATE TABLE IF NOT EXISTS conversations (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  participant1_id   UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  participant2_id   UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  last_message_id   UUID,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT unique_conversation_pair UNIQUE(participant1_id, participant2_id),
  CONSTRAINT ordered_participants CHECK (participant1_id < participant2_id)
);

CREATE INDEX IF NOT EXISTS idx_conversations_p1 ON conversations(participant1_id);
CREATE INDEX IF NOT EXISTS idx_conversations_p2 ON conversations(participant2_id);
CREATE INDEX IF NOT EXISTS idx_conversations_updated ON conversations(updated_at DESC);


-- 8. MESSAGES
-- ------------------------------------------------------------
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'messages' AND table_schema = 'public') THEN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'messages' AND table_schema = 'public' AND column_name = 'conversation_id') THEN
      ALTER TABLE messages ADD COLUMN conversation_id UUID; END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'messages' AND table_schema = 'public' AND column_name = 'sender_id') THEN
      ALTER TABLE messages ADD COLUMN sender_id UUID REFERENCES profiles(id) ON DELETE CASCADE; END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'messages' AND table_schema = 'public' AND column_name = 'text') THEN
      ALTER TABLE messages ADD COLUMN text TEXT DEFAULT ''; END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'messages' AND table_schema = 'public' AND column_name = 'read') THEN
      ALTER TABLE messages ADD COLUMN read BOOLEAN DEFAULT false; END IF;
  END IF;
END $$;

CREATE TABLE IF NOT EXISTS messages (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  conversation_id   UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
  sender_id         UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  text              TEXT NOT NULL,
  read              BOOLEAN DEFAULT false,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_messages_conversation ON messages(conversation_id);
CREATE INDEX IF NOT EXISTS idx_messages_sender ON messages(sender_id);
CREATE INDEX IF NOT EXISTS idx_messages_read ON messages(conversation_id, read);
CREATE INDEX IF NOT EXISTS idx_messages_created ON messages(conversation_id, created_at);

-- FK for last_message_id on conversations (requires messages table to exist first)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints
    WHERE constraint_name = 'fk_conversations_last_message'
      AND table_name = 'conversations'
  ) THEN
    ALTER TABLE conversations
      ADD CONSTRAINT fk_conversations_last_message
      FOREIGN KEY (last_message_id) REFERENCES messages(id) ON DELETE SET NULL;
  END IF;
END $$;


-- 9. REVIEWS
-- ------------------------------------------------------------
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'reviews' AND table_schema = 'public') THEN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'reviews' AND table_schema = 'public' AND column_name = 'reviewer_id') THEN
      ALTER TABLE reviews ADD COLUMN reviewer_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE; END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'reviews' AND table_schema = 'public' AND column_name = 'reviewee_id') THEN
      ALTER TABLE reviews ADD COLUMN reviewee_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE; END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'reviews' AND table_schema = 'public' AND column_name = 'job_id') THEN
      ALTER TABLE reviews ADD COLUMN job_id UUID REFERENCES jobs(id) ON DELETE SET NULL; END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'reviews' AND table_schema = 'public' AND column_name = 'rating') THEN
      ALTER TABLE reviews ADD COLUMN rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5); END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'reviews' AND table_schema = 'public' AND column_name = 'comment') THEN
      ALTER TABLE reviews ADD COLUMN comment TEXT DEFAULT ''; END IF;
  END IF;
END $$;

CREATE TABLE IF NOT EXISTS reviews (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  reviewer_id     UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  reviewee_id     UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  job_id          UUID REFERENCES jobs(id) ON DELETE SET NULL,
  rating          INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment         TEXT DEFAULT '',
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(reviewer_id, reviewee_id)
);

CREATE INDEX IF NOT EXISTS idx_reviews_reviewee ON reviews(reviewee_id);
CREATE INDEX IF NOT EXISTS idx_reviews_reviewer ON reviews(reviewer_id);


-- 10. EMERGENCY ALERTS
-- ------------------------------------------------------------
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'emergency_alerts' AND table_schema = 'public') THEN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'emergency_alerts' AND table_schema = 'public' AND column_name = 'user_id') THEN
      ALTER TABLE emergency_alerts ADD COLUMN user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE; END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'emergency_alerts' AND table_schema = 'public' AND column_name = 'location') THEN
      ALTER TABLE emergency_alerts ADD COLUMN location TEXT; END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'emergency_alerts' AND table_schema = 'public' AND column_name = 'latitude') THEN
      ALTER TABLE emergency_alerts ADD COLUMN latitude NUMERIC; END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'emergency_alerts' AND table_schema = 'public' AND column_name = 'longitude') THEN
      ALTER TABLE emergency_alerts ADD COLUMN longitude NUMERIC; END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'emergency_alerts' AND table_schema = 'public' AND column_name = 'message') THEN
      ALTER TABLE emergency_alerts ADD COLUMN message TEXT; END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'emergency_alerts' AND table_schema = 'public' AND column_name = 'status') THEN
      ALTER TABLE emergency_alerts ADD COLUMN status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'acknowledged', 'resolved')); END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'emergency_alerts' AND table_schema = 'public' AND column_name = 'resolved_by') THEN
      ALTER TABLE emergency_alerts ADD COLUMN resolved_by UUID REFERENCES profiles(id) ON DELETE SET NULL; END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'emergency_alerts' AND table_schema = 'public' AND column_name = 'resolved_at') THEN
      ALTER TABLE emergency_alerts ADD COLUMN resolved_at TIMESTAMPTZ; END IF;
  END IF;
END $$;

CREATE TABLE IF NOT EXISTS emergency_alerts (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id         UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  location        TEXT,
  latitude        NUMERIC,
  longitude       NUMERIC,
  message         TEXT,
  status          TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'acknowledged', 'resolved')),
  resolved_by     UUID REFERENCES profiles(id) ON DELETE SET NULL,
  resolved_at     TIMESTAMPTZ,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_emergency_user ON emergency_alerts(user_id);
CREATE INDEX IF NOT EXISTS idx_emergency_status ON emergency_alerts(status);


-- 11. NOTIFICATIONS
-- ------------------------------------------------------------
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'notifications' AND table_schema = 'public') THEN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'notifications' AND table_schema = 'public' AND column_name = 'user_id') THEN
      ALTER TABLE notifications ADD COLUMN user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE; END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'notifications' AND table_schema = 'public' AND column_name = 'title') THEN
      ALTER TABLE notifications ADD COLUMN title TEXT NOT NULL; END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'notifications' AND table_schema = 'public' AND column_name = 'message') THEN
      ALTER TABLE notifications ADD COLUMN message TEXT NOT NULL; END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'notifications' AND table_schema = 'public' AND column_name = 'type') THEN
      ALTER TABLE notifications ADD COLUMN type TEXT NOT NULL DEFAULT 'general' CHECK (type IN ('general', 'application', 'message', 'review', 'emergency', 'verification', 'system')); END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'notifications' AND table_schema = 'public' AND column_name = 'read') THEN
      ALTER TABLE notifications ADD COLUMN read BOOLEAN DEFAULT false; END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'notifications' AND table_schema = 'public' AND column_name = 'metadata') THEN
      ALTER TABLE notifications ADD COLUMN metadata JSONB DEFAULT '{}'; END IF;
  END IF;
END $$;

CREATE TABLE IF NOT EXISTS notifications (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id         UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title           TEXT NOT NULL,
  message         TEXT NOT NULL,
  type            TEXT NOT NULL DEFAULT 'general' CHECK (type IN ('general', 'application', 'message', 'review', 'emergency', 'verification', 'system')),
  read            BOOLEAN DEFAULT false,
  metadata        JSONB DEFAULT '{}',
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_notifications_user ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_read ON notifications(user_id, read);
CREATE INDEX IF NOT EXISTS idx_notifications_created ON notifications(created_at DESC);


-- 12. VERIFICATION DOCUMENTS
-- ------------------------------------------------------------
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'verification_documents' AND table_schema = 'public') THEN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'verification_documents' AND table_schema = 'public' AND column_name = 'user_id') THEN
      ALTER TABLE verification_documents ADD COLUMN user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE; END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'verification_documents' AND table_schema = 'public' AND column_name = 'document_type') THEN
      ALTER TABLE verification_documents ADD COLUMN document_type TEXT NOT NULL CHECK (document_type IN ('id_card', 'good_conduct', 'reference_letter', 'medical_report', 'other')); END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'verification_documents' AND table_schema = 'public' AND column_name = 'document_url') THEN
      ALTER TABLE verification_documents ADD COLUMN document_url TEXT NOT NULL; END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'verification_documents' AND table_schema = 'public' AND column_name = 'document_name') THEN
      ALTER TABLE verification_documents ADD COLUMN document_name TEXT; END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'verification_documents' AND table_schema = 'public' AND column_name = 'status') THEN
      ALTER TABLE verification_documents ADD COLUMN status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')); END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'verification_documents' AND table_schema = 'public' AND column_name = 'reviewed_by') THEN
      ALTER TABLE verification_documents ADD COLUMN reviewed_by UUID REFERENCES profiles(id) ON DELETE SET NULL; END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'verification_documents' AND table_schema = 'public' AND column_name = 'review_notes') THEN
      ALTER TABLE verification_documents ADD COLUMN review_notes TEXT; END IF;
  END IF;
END $$;

CREATE TABLE IF NOT EXISTS verification_documents (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id         UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  document_type   TEXT NOT NULL CHECK (document_type IN ('id_card', 'good_conduct', 'reference_letter', 'medical_report', 'other')),
  document_url    TEXT NOT NULL,
  document_name   TEXT,
  status          TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  reviewed_by     UUID REFERENCES profiles(id) ON DELETE SET NULL,
  review_notes    TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_documents_user ON verification_documents(user_id);
CREATE INDEX IF NOT EXISTS idx_documents_status ON verification_documents(status);


-- 13. PAYMENTS (for future payment integration)
-- ------------------------------------------------------------
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'payments' AND table_schema = 'public') THEN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'payments' AND table_schema = 'public' AND column_name = 'employer_id') THEN
      ALTER TABLE payments ADD COLUMN employer_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE; END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'payments' AND table_schema = 'public' AND column_name = 'worker_id') THEN
      ALTER TABLE payments ADD COLUMN worker_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE; END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'payments' AND table_schema = 'public' AND column_name = 'job_id') THEN
      ALTER TABLE payments ADD COLUMN job_id UUID REFERENCES jobs(id) ON DELETE SET NULL; END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'payments' AND table_schema = 'public' AND column_name = 'amount') THEN
      ALTER TABLE payments ADD COLUMN amount INTEGER NOT NULL; END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'payments' AND table_schema = 'public' AND column_name = 'currency') THEN
      ALTER TABLE payments ADD COLUMN currency TEXT DEFAULT 'KES'; END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'payments' AND table_schema = 'public' AND column_name = 'payment_method') THEN
      ALTER TABLE payments ADD COLUMN payment_method TEXT DEFAULT 'mpesa'; END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'payments' AND table_schema = 'public' AND column_name = 'status') THEN
      ALTER TABLE payments ADD COLUMN status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'refunded')); END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'payments' AND table_schema = 'public' AND column_name = 'mpesa_reference') THEN
      ALTER TABLE payments ADD COLUMN mpesa_reference TEXT; END IF;
  END IF;
END $$;

CREATE TABLE IF NOT EXISTS payments (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  employer_id     UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  worker_id       UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  job_id          UUID REFERENCES jobs(id) ON DELETE SET NULL,
  amount          INTEGER NOT NULL,
  currency        TEXT DEFAULT 'KES',
  payment_method  TEXT DEFAULT 'mpesa',
  status          TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'refunded')),
  mpesa_reference TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_payments_employer ON payments(employer_id);
CREATE INDEX IF NOT EXISTS idx_payments_worker ON payments(worker_id);
CREATE INDEX IF NOT EXISTS idx_payments_status ON payments(status);
