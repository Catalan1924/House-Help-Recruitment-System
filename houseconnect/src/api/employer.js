// ============================================================
// HouseConnect Kenya — Employer-Specific API
// ============================================================

import { supabase } from "../lib/supabase";

/**
 * Get recent applicants across all jobs posted by an employer.
 */
export const getEmployerApplicants = async (employerId, limit = 6) => {
  const { data, error } = await supabase
    .from("applications")
    .select("*, job:job_id(title, status, county), worker:worker_id(full_name, phone, county, avatar_url)")
    .eq("job.employer_id", employerId)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data;
};

/**
 * Get employer's jobs with applicant counts.
 */
export const getEmployerJobsWithCounts = async (employerId, limit = 5) => {
  const { data: jobs, error: jobsError } = await supabase
    .from("jobs")
    .select("*, applications:applications(count)")
    .eq("employer_id", employerId)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (jobsError) throw jobsError;

  return jobs.map((job) => ({
    ...job,
    applicant_count: job.applications?.[0]?.count ?? 0,
  }));
};
