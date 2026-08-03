// ============================================================
// HouseConnect Kenya — Dashboard Stats API
// ============================================================
// Fetches real-time dashboard statistics for each role.
// ============================================================

import { supabase } from "../lib/supabase";

/**
 * Fetch admin dashboard stats using the stored function.
 */
export const getAdminStats = async () => {
  const { data, error } = await supabase.rpc("get_admin_stats");
  if (error) throw error;
  return data;
};

/**
 * Fetch employer dashboard stats using the stored function.
 */
export const getEmployerStats = async (employerId) => {
  const { data, error } = await supabase.rpc("get_employer_stats", {
    employer_id: employerId,
  });
  if (error) throw error;
  return data;
};

/**
 * Fetch worker dashboard stats using the stored function.
 */
export const getWorkerStats = async (workerId) => {
  const { data, error } = await supabase.rpc("get_worker_stats", {
    worker_id: workerId,
  });
  if (error) throw error;
  return data;
};

/**
 * Fetch recent emergency alerts (admin).
 */
export const getEmergencyAlerts = async (limit = 10) => {
  const { data: alerts, error } = await supabase
    .from("emergency_alerts")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) throw error;
  if (!alerts?.length) return [];

  // Batch fetch user profiles
  const userIds = [...new Set(alerts.map((a) => a.user_id))];
  const { data: users } = await supabase
    .from("profiles")
    .select("id, full_name, phone, county")
    .in("id", userIds);
  const userMap = Object.fromEntries((users || []).map((u) => [u.id, u]));

  return alerts.map((alert) => ({
    ...alert,
    user: userMap[alert.user_id] || null,
  }));
};

/**
 * Create an emergency alert (worker SOS).
 */
export const createEmergencyAlert = async (alertData) => {
  const { data, error } = await supabase
    .from("emergency_alerts")
    .insert({
      user_id: alertData.user_id,
      location: alertData.location || "Unknown",
      latitude: alertData.latitude || null,
      longitude: alertData.longitude || null,
      message: alertData.message || "Emergency SOS triggered",
      status: "active",
    })
    .select()
    .single();

  if (error) throw error;
  return data;
};

/**
 * Update emergency alert status (admin).
 */
export const updateEmergencyAlert = async (id, status, resolvedBy) => {
  const updates = { status };
  if (status === "resolved") {
    updates.resolved_by = resolvedBy;
    updates.resolved_at = new Date().toISOString();
  }

  const { data, error } = await supabase
    .from("emergency_alerts")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

/**
 * Get admin dashboard recent activity (combined feed).
 */
export const getRecentActivity = async (limit = 20) => {
  // Fetch recent applications, jobs, reviews as a combined feed.
  // Use flat selects with manual stitching to avoid PostgREST
  // embedded-filter pitfalls (ambiguous columns, wrong FK table names).
  const [appsRes, jobsRes, reviewsRes] = await Promise.all([
    supabase
      .from("applications")
      .select("id, worker_id, job_id, status, created_at")
      .order("created_at", { ascending: false })
      .limit(limit),
    supabase
      .from("jobs")
      .select("id, employer_id, title, created_at")
      .order("created_at", { ascending: false })
      .limit(limit),
    supabase
      .from("reviews")
      .select("id, reviewer_id, reviewee_id, rating, created_at")
      .order("created_at", { ascending: false })
      .limit(limit),
  ]);

  const applications = appsRes.data || [];
  const jobs = jobsRes.data || [];
  const reviews = reviewsRes.data || [];

  // Collect unique IDs for batch lookups
  const workerIds = [...new Set(applications.map((a) => a.worker_id))];
  const jobIds = [...new Set(applications.map((a) => a.job_id))];
  const employerIds = [...new Set(jobs.map((j) => j.employer_id))];
  const allUserIds = [...new Set([...workerIds, ...employerIds, ...reviews.map((r) => r.reviewer_id), ...reviews.map((r) => r.reviewee_id)])];

  // Batch fetch all referenced profiles
  let profilesMap = {};
  if (allUserIds.length > 0) {
    const { data: profiles } = await supabase
      .from("profiles")
      .select("id, full_name")
      .in("id", allUserIds);
    profilesMap = Object.fromEntries((profiles || []).map((p) => [p.id, p]));
  }

  // Batch fetch all referenced jobs (for applications)
  let jobsMap = {};
  if (jobIds.length > 0) {
    const { data: jobRows } = await supabase
      .from("jobs")
      .select("id, title")
      .in("id", jobIds);
    jobsMap = Object.fromEntries((jobRows || []).map((j) => [j.id, j]));
  }

  // Stitch worker + job info into applications
  const enrichedApps = applications.map((a) => ({
    ...a,
    worker: profilesMap[a.worker_id] || null,
    job: jobsMap[a.job_id] || null,
  }));

  // Stitch employer info into jobs
  const enrichedJobs = jobs.map((j) => ({
    ...j,
    employer: profilesMap[j.employer_id] || null,
  }));

  // Stitch reviewer/reviewee info into reviews
  const enrichedReviews = reviews.map((r) => ({
    ...r,
    reviewer: profilesMap[r.reviewer_id] || null,
    reviewee: profilesMap[r.reviewee_id] || null,
  }));

  const activities = [
    ...enrichedApps.map((a) => ({
      type: "application",
      message: `${a.worker?.full_name || "A worker"} applied for "${a.job?.title || "a job"}"`,
      timestamp: a.created_at,
      data: a,
    })),
    ...enrichedJobs.map((j) => ({
      type: "job",
      message: `${j.employer?.full_name || "An employer"} posted "${j.title}"`,
      timestamp: j.created_at,
      data: j,
    })),
    ...enrichedReviews.map((r) => ({
      type: "review",
      message: `${r.reviewer?.full_name || "A user"} left a ${r.rating}★ review`,
      timestamp: r.created_at,
      data: r,
    })),
  ];

  // Sort by most recent and limit
  return activities
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
    .slice(0, limit);
};

/**
 * Get pending verification count (admin).
 */
export const getPendingVerificationsCount = async () => {
  const { count, error } = await supabase
    .from("verification_documents")
    .select("*", { count: "exact", head: true })
    .eq("status", "pending");

  if (error) throw error;
  return count;
};
