// ============================================================
// HouseConnect Kenya — Employer-Specific API
// ============================================================

import { supabase } from "../lib/supabase";

/**
 * Get recent applicants across all jobs posted by an employer.
 *
 * Uses a two-step query to avoid PostgREST embedded-filter pitfalls
 * (ambiguous column references, FK resolution to wrong table names).
 */
export const getEmployerApplicants = async (employerId, limit = 6) => {
  // Step 1: Get all job IDs belonging to this employer
  const { data: jobs, error: jobsError } = await supabase
    .from("jobs")
    .select("id, title, status, county")
    .eq("employer_id", employerId);

  if (jobsError) throw jobsError;
  if (!jobs?.length) return [];

  const jobIds = jobs.map((j) => j.id);
  const jobMap = Object.fromEntries(jobs.map((j) => [j.id, j]));

  // Step 2: Get applications for those jobs (flat select, no embedding)
  const { data: applications, error: appsError } = await supabase
    .from("applications")
    .select("id, job_id, worker_id, cover_letter, status, created_at, updated_at")
    .in("job_id", jobIds)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (appsError) throw appsError;
  if (!applications?.length) return [];

  // Step 3: Batch fetch worker profiles for all applicants
  const workerIds = [...new Set(applications.map((a) => a.worker_id))];
  const { data: workers } = await supabase
    .from("profiles")
    .select("id, full_name, phone, county, avatar_url")
    .in("id", workerIds);

  const workerMap = Object.fromEntries((workers || []).map((w) => [w.id, w]));

  // Stitch job + worker info into each application
  return applications.map((app) => ({
    ...app,
    job: jobMap[app.job_id] || null,
    worker: workerMap[app.worker_id] || null,
  }));
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
