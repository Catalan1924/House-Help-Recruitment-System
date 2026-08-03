// ============================================================
// HouseConnect Kenya — Admin API
// ============================================================
// All admin-level data operations: users, verifications,
// emergencies, analytics, reports, feedback, settings.
// ============================================================

import { supabase } from "../lib/supabase";

// ----------------------------------------------------------
// USERS
// ----------------------------------------------------------

/**
 * Get all users with pagination, search, and filters.
 */
export const getAllUsers = async ({ page = 1, limit = 20, role, status, search } = {}) => {
  let query = supabase
    .from("profiles")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false })
    .range((page - 1) * limit, page * limit - 1);

  if (role) query = query.eq("role", role);
  if (status) query = query.eq("status", status);
  if (search) query = query.or(`full_name.ilike.%${search}%,email.ilike.%${search}%`);

  const { data, error, count } = await query;
  if (error) throw error;
  return { users: data || [], total: count || 0, page, limit };
};

/**
 * Update a user's status (admin only).
 */
export const updateUserStatus = async (userId, status) => {
  const { data, error } = await supabase
    .from("profiles")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", userId)
    .select()
    .single();

  if (error) throw error;
  return data;
};

/**
 * Delete a user (admin only, cascades).
 */
export const deleteUser = async (userId) => {
  const { error } = await supabase
    .from("profiles")
    .delete()
    .eq("id", userId);

  if (error) throw error;
};

// ----------------------------------------------------------
// VERIFICATION
// ----------------------------------------------------------

/**
 * Get all verification documents with filters.
 */
export const getVerificationDocuments = async ({ status, page = 1, limit = 20 } = {}) => {
  let query = supabase
    .from("verification_documents")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false })
    .range((page - 1) * limit, page * limit - 1);

  if (status) query = query.eq("status", status);

  const { data, error, count } = await query;
  if (error) throw error;

  // Batch-fetch user profiles
  const userIds = [...new Set((data || []).map((d) => d.user_id))];
  let profilesMap = {};
  if (userIds.length > 0) {
    const { data: profiles } = await supabase
      .from("profiles")
      .select("id, full_name, email, county")
      .in("id", userIds);
    profilesMap = Object.fromEntries((profiles || []).map((p) => [p.id, p]));
  }

  const docs = (data || []).map((d) => ({
    ...d,
    user: profilesMap[d.user_id] || null,
  }));

  return { documents: docs, total: count || 0, page, limit };
};

/**
 * Approve or reject a verification document.
 */
export const reviewVerificationDocument = async (documentId, status, reviewedBy, notes = null) => {
  const updates = {
    status,
    reviewed_by: reviewedBy,
    review_notes: notes,
    updated_at: new Date().toISOString(),
  };

  const { data, error } = await supabase
    .from("verification_documents")
    .update(updates)
    .eq("id", documentId)
    .select()
    .single();

  if (error) throw error;

  // If approved, update the worker's verification_status
  if (status === "approved") {
    const { user_id } = data;
    await supabase
      .from("house_help_profiles")
      .update({ verification_status: "verified" })
      .eq("user_id", user_id);
  }

  return data;
};

// ----------------------------------------------------------
// EMERGENCY ALERTS
// ----------------------------------------------------------

/**
 * Get all emergency alerts.
 */
export const getEmergencyAlerts = async ({ status, limit = 50 } = {}) => {
  let query = supabase
    .from("emergency_alerts")
    .select("*")
    .order("created_at", { ascending: false });

  if (status) query = query.eq("status", status);
  if (limit) query = query.limit(limit);

  const { data: alerts, error } = await query;
  if (error) throw error;
  if (!alerts?.length) return [];

  // Batch-fetch user profiles
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
 * Update an emergency alert status.
 */
export const updateEmergencyAlert = async (alertId, status, resolvedBy) => {
  const updates = { status };
  if (status === "resolved") {
    updates.resolved_by = resolvedBy;
    updates.resolved_at = new Date().toISOString();
  }

  const { data, error } = await supabase
    .from("emergency_alerts")
    .update(updates)
    .eq("id", alertId)
    .select()
    .single();

  if (error) throw error;
  return data;
};

// ----------------------------------------------------------
// ANALYTICS / REPORTS
// ----------------------------------------------------------

/**
 * Get platform-wide analytics.
 */
export const getPlatformAnalytics = async () => {
  const [
    { count: totalUsers },
    { count: activeJobs },
    { count: totalApplications },
    { count: completedPayments },
    { data: revenueData },
    { data: roleDist },
    { data: countyDist },
    { data: monthlyReg },
  ] = await Promise.all([
    supabase.from("profiles").select("*", { count: "exact", head: true }),
    supabase.from("jobs").select("*", { count: "exact", head: true }).eq("status", "open"),
    supabase.from("applications").select("*", { count: "exact", head: true }),
    supabase.from("payments").select("*", { count: "exact", head: true }).eq("status", "completed"),
    supabase.from("payments").select("amount").eq("status", "completed"),
    supabase.rpc("get_admin_stats"),
    supabase.from("profiles").select("county, role"),
    supabase.from("profiles").select("created_at").order("created_at", { ascending: false }).limit(500),
  ]);

  const totalRevenue = (revenueData || []).reduce((sum, p) => sum + (p.amount || 0), 0);

  // Count by role
  const workers = roleDist?.filter((p) => p.role === "worker").length || 0;
  const employers = roleDist?.filter((p) => p.role === "employer").length || 0;
  const admins = roleDist?.filter((p) => p.role === "admin").length || 0;

  // Monthly registrations (last 12 months)
  const monthlyMap = {};
  (monthlyReg || []).forEach((p) => {
    const month = new Date(p.created_at).toLocaleString("en", { month: "short", year: "numeric" });
    monthlyMap[month] = (monthlyMap[month] || 0) + 1;
  });
  const monthlySignups = Object.entries(monthlyMap)
    .map(([month, count]) => ({ month, count }))
    .slice(-12);

  return {
    totalUsers: totalUsers || 0,
    activeJobs: activeJobs || 0,
    totalApplications: totalApplications || 0,
    completedPayments: completedPayments || 0,
    totalRevenue,
    workers,
    employers,
    admins,
    monthlySignups,
  };
};

/**
 * Get recent user registrations.
 */
export const getRecentUsers = async (limit = 5) => {
  const { data, error } = await supabase
    .from("profiles")
    .select("id, full_name, email, role, county, created_at")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data || [];
};

// ----------------------------------------------------------
// FEEDBACK (based on reviews with low ratings)
// ----------------------------------------------------------

/**
 * Get user feedback (reviews with rating ≤3, considered as feedback).
 */
export const getFeedback = async ({ resolved = null, limit = 50 } = {}) => {
  let query = supabase
    .from("reviews")
    .select("*")
    .lte("rating", 3)
    .order("created_at", { ascending: false });

  if (limit) query = query.limit(limit);

  const { data: reviews, error } = await query;
  if (error) throw error;
  if (!reviews?.length) return [];

  // Batch-fetch reviewer/reviewee profiles
  const userIds = [...new Set([...reviews.map((r) => r.reviewer_id), ...reviews.map((r) => r.reviewee_id)])];
  const { data: users } = await supabase
    .from("profiles")
    .select("id, full_name")
    .in("id", userIds);
  const userMap = Object.fromEntries((users || []).map((u) => [u.id, u]));

  let results = reviews.map((r) => ({
    ...r,
    reviewer: userMap[r.reviewer_id] || null,
    reviewee: userMap[r.reviewee_id] || null,
  }));

  if (resolved !== null) {
    // Use review_notes as a proxy for "resolved" (if admin has added notes)
    results = results.filter((r) => resolved ? !!r.comment : !r.comment);
  }

  return results;
};

// ----------------------------------------------------------
// SETTINGS
// ----------------------------------------------------------

/**
 * Get platform settings (from platform_settings table or defaults).
 */
export const getPlatformSettings = async () => {
  const { data, error } = await supabase
    .from("platform_settings")
    .select("*")
    .single();

  // Return defaults if table is empty or doesn't exist
  if (error) {
    return {
      commission_rate: 10,
      min_payout: 1000,
      allowed_documents: ["id_card", "good_conduct", "reference_letter", "medical_report", "other"],
      maintenance_mode: false,
    };
  }

  return data;
};

/**
 * Update platform settings.
 */
export const updatePlatformSettings = async (settings) => {
  const { data, error } = await supabase
    .from("platform_settings")
    .upsert(
      {
        id: 1,
        ...settings,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "id" }
    )
    .select()
    .single();

  if (error) throw error;
  return data;
};
