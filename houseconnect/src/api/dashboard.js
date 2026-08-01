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
  const { data, error } = await supabase
    .from("emergency_alerts")
    .select("*, user:user_id(full_name, phone, county)")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data;
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
  // Fetch recent applications, jobs, reviews as a combined feed
  const [applications, jobs, reviews] = await Promise.all([
    supabase
      .from("applications")
      .select("*, worker:worker_id(full_name), job:job_id(title)")
      .order("created_at", { ascending: false })
      .limit(limit),
    supabase
      .from("jobs")
      .select("*, employer:employer_id(full_name)")
      .order("created_at", { ascending: false })
      .limit(limit),
    supabase
      .from("reviews")
      .select("*, reviewer:reviewer_id(full_name), reviewee:reviewee_id(full_name)")
      .order("created_at", { ascending: false })
      .limit(limit),
  ]);

  const activities = [
    ...(applications.data || []).map((a) => ({
      type: "application",
      message: `${a.worker?.full_name || "A worker"} applied for "${a.job?.title || "a job"}"`,
      timestamp: a.created_at,
      data: a,
    })),
    ...(jobs.data || []).map((j) => ({
      type: "job",
      message: `${j.employer?.full_name || "An employer"} posted "${j.title}"`,
      timestamp: j.created_at,
      data: j,
    })),
    ...(reviews.data || []).map((r) => ({
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
