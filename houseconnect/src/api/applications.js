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
 */
export const getMyApplications = async (workerId) => {
  const { data, error } = await supabase
    .from("applications")
    .select("*, job:job_id(*)")
    .eq("worker_id", workerId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
};

/**
 * Get all applications for a specific job (employer view).
 */
export const getJobApplications = async (jobId) => {
  const { data, error } = await supabase
    .from("applications")
    .select("*, worker:worker_id(*)")
    .eq("job_id", jobId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
};

/**
 * Get a single application by ID.
 */
export const getApplicationById = async (id) => {
  const { data, error } = await supabase
    .from("applications")
    .select("*, job:job_id(*), worker:worker_id(*)")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
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
