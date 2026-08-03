import { supabase } from "../lib/supabase";

/**
 * Apply to a job (worker only).
 */
export const applyToJob = async (jobId, workerId, applicationData) => {
  const { data, error } = await supabase
    .from("applications")
    .insert({
      job_id: jobId,
      worker_id: workerId,
      cover_letter: applicationData.cover_letter || "",
      status: "pending",
    })
    .select()
    .single();

  if (error) throw error;
  return data;
};

/**
 * Get all applications for the current worker.
 * Uses flat select + batch lookup to avoid PostgREST FK embedding issues.
 */
export const getMyApplications = async (workerId) => {
  const { data: apps, error } = await supabase
    .from("applications")
    .select("*, job:job_id(*)")
    .eq("worker_id", workerId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return apps;
};

/**
 * Get all applications for a specific job (employer view).
 * Uses flat select + batch profile lookup to avoid broken FK embedding.
 */
export const getJobApplications = async (jobId) => {
  const { data: applications, error } = await supabase
    .from("applications")
    .select("id, job_id, worker_id, cover_letter, status, created_at, updated_at")
    .eq("job_id", jobId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  if (!applications?.length) return [];

  // Batch fetch worker profiles
  const workerIds = [...new Set(applications.map((a) => a.worker_id))];
  const { data: workers } = await supabase
    .from("profiles")
    .select("id, full_name, phone, county, avatar_url, email, role, status, created_at, updated_at")
    .in("id", workerIds);

  const workerMap = Object.fromEntries((workers || []).map((w) => [w.id, w]));

  return applications.map((app) => ({
    ...app,
    worker: workerMap[app.worker_id] || null,
  }));
};

/**
 * Get a single application by ID.
 * Uses flat select + batch lookups to avoid broken FK embedding.
 */
export const getApplicationById = async (id) => {
  const { data: app, error } = await supabase
    .from("applications")
    .select("id, job_id, worker_id, cover_letter, status, created_at, updated_at")
    .eq("id", id)
    .single();

  if (error) throw error;
  if (!app) return null;

  // Batch fetch both job and worker
  const [jobRes, workerRes] = await Promise.all([
    supabase.from("jobs").select("*").eq("id", app.job_id).single(),
    supabase.from("profiles").select("id, full_name, phone, county, avatar_url, email, role, status, created_at, updated_at").eq("id", app.worker_id).single(),
  ]);

  return {
    ...app,
    job: jobRes.data || null,
    worker: workerRes.data || null,
  };
};

/**
 * Update application status (employer: accept/reject).
 * Valid statuses: pending, reviewed, shortlisted, accepted, rejected, withdrawn
 */
export const updateApplicationStatus = async (id, status) => {
  const validStatuses = [
    "pending",
    "reviewed",
    "shortlisted",
    "accepted",
    "rejected",
    "withdrawn",
  ];

  if (!validStatuses.includes(status)) {
    throw new Error(`Invalid status: ${status}`);
  }

  const { data, error } = await supabase
    .from("applications")
    .update({ status })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

/**
 * Withdraw an application (worker only).
 */
export const withdrawApplication = async (id) => {
  return updateApplicationStatus(id, "withdrawn");
};

/**
 * Get application count for a job.
 */
export const getApplicationCount = async (jobId) => {
  const { count, error } = await supabase
    .from("applications")
    .select("*", { count: "exact", head: true })
    .eq("job_id", jobId);

  if (error) throw error;
  return count;
};
