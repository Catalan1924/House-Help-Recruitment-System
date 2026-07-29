// ============================================================
// HouseConnect Kenya — Database Types
// ============================================================
// Generated from the Supabase schema.
// Use these types throughout the frontend for type safety.
// ============================================================

export interface Profile {
  id: string;
  full_name: string;
  phone: string | null;
  county: string | null;
  town: string | null;
  role: 'worker' | 'employer' | 'admin';
  status: 'active' | 'suspended' | 'deactivated';
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface HouseHelpProfile {
  id: string;
  user_id: string;
  experience: '0-1 year' | '1-3 years' | '3-5 years' | '5-10 years' | '10+ years' | null;
  expected_salary: number | null;
  skills: string[];
  availability: 'Available' | 'Employed' | 'Not Available';
  preferred_job_types: string[];
  age: number | null;
  gender: string | null;
  bio: string | null;
  profile_photo_url: string | null;
  verification_status: 'pending' | 'verified' | 'rejected' | 'not_submitted';
  average_rating: number;
  total_reviews: number;
  created_at: string;
  updated_at: string;
}

export interface EmployerProfile {
  id: string;
  user_id: string;
  company_name: string | null;
  household_type: string | null;
  preferred_gender: string | null;
  verified: boolean;
  created_at: string;
  updated_at: string;
}

export interface Job {
  id: string;
  employer_id: string;
  title: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
  county: string;
  town: string | null;
  employment_type: 'Full-time' | 'Part-time' | 'Live-in' | 'Live-out' | 'Contract' | 'Temporary';
  salary_min: number | null;
  salary_max: number | null;
  salary_currency: string;
  status: 'open' | 'closed' | 'filled' | 'draft';
  view_count: number;
  created_at: string;
  updated_at: string;
  employer?: Profile;
}

export interface Application {
  id: string;
  job_id: string;
  worker_id: string;
  cover_letter: string;
  status: 'pending' | 'reviewed' | 'shortlisted' | 'accepted' | 'rejected' | 'withdrawn';
  created_at: string;
  updated_at: string;
  job?: Job;
  worker?: Profile;
}

export interface Conversation {
  id: string;
  participant1_id: string;
  participant2_id: string;
  last_message_id: string | null;
  created_at: string;
  updated_at: string;
  participant1?: Pick<Profile, 'id' | 'full_name'>;
  participant2?: Pick<Profile, 'id' | 'full_name'>;
  last_message?: Message;
}

export interface Message {
  id: string;
  conversation_id: string;
  sender_id: string;
  text: string;
  read: boolean;
  created_at: string;
}

export interface Review {
  id: string;
  reviewer_id: string;
  reviewee_id: string;
  job_id: string | null;
  rating: number;
  comment: string;
  created_at: string;
  reviewer?: Pick<Profile, 'id' | 'full_name'>;
  reviewee?: Pick<Profile, 'id' | 'full_name'>;
}

export interface EmergencyAlert {
  id: string;
  user_id: string;
  location: string | null;
  latitude: number | null;
  longitude: number | null;
  message: string | null;
  status: 'active' | 'acknowledged' | 'resolved';
  resolved_by: string | null;
  resolved_at: string | null;
  created_at: string;
}

export interface Notification {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: 'general' | 'application' | 'message' | 'review' | 'emergency' | 'verification' | 'system';
  read: boolean;
  metadata: Record<string, unknown>;
  created_at: string;
}

export interface VerificationDocument {
  id: string;
  user_id: string;
  document_type: 'id_card' | 'good_conduct' | 'reference_letter' | 'medical_report' | 'other';
  document_url: string;
  document_name: string | null;
  status: 'pending' | 'approved' | 'rejected';
  reviewed_by: string | null;
  review_notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface Payment {
  id: string;
  employer_id: string;
  worker_id: string;
  job_id: string | null;
  amount: number;
  currency: string;
  payment_method: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  mpesa_reference: string | null;
  created_at: string;
  updated_at: string;
}

// Dashboard stats
export interface AdminStats {
  total_users: number;
  active_jobs: number;
  pending_verifications: number;
  active_emergencies: number;
}

export interface EmployerStats {
  active_jobs: number;
  total_applicants: number;
  shortlisted: number;
  hired: number;
}

export interface WorkerStats {
  available_jobs: number;
  applications_count: number;
  unread_notifications: number;
  average_rating: number;
}
