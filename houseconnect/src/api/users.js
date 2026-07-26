import { supabase } from "../lib/supabase";

/**
 * Get a user's profile by ID.
 */
export const getUserProfile = async (userId) => {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) throw error;
  return data;
};

/**
 * Update the current user's profile.
 */
export const updateProfile = async (userId, updates) => {
  const { data, error } = await supabase
    .from("profiles")
    .update(updates)
    .eq("id", userId)
    .select()
    .single();

  if (error) throw error;
  return data;
};

/**
 * Get worker profiles with optional filters.
 */
export const getWorkerProfiles = async (filters = {}) => {
  let query = supabase
    .from("house_help_profiles")
    .select("*, profile:user_id(*)")
    .order("created_at", { ascending: false });

  if (filters.county) {
    query = query.eq("county", filters.county);
  }
  if (filters.experience_min) {
    query = query.gte("experience", filters.experience_min);
  }
  if (filters.availability) {
    query = query.eq("availability", filters.availability);
  }
  if (filters.expected_salary_max) {
    query = query.lte("expected_salary", filters.expected_salary_max);
  }
  if (filters.search) {
    // Search through the joined profile full_name
    query = query.or(`county.ilike.%${filters.search}%`);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data;
};

/**
 * Get a single worker profile with full user profile.
 */
export const getWorkerProfile = async (workerId) => {
  const { data, error } = await supabase
    .from("house_help_profiles")
    .select("*, profile:user_id(*)")
    .eq("user_id", workerId)
    .single();

  if (error) throw error;
  return data;
};

/**
 * Update a worker's profile.
 */
export const updateWorkerProfile = async (userId, updates) => {
  const { data, error } = await supabase
    .from("house_help_profiles")
    .update(updates)
    .eq("user_id", userId)
    .select()
    .single();

  if (error) throw error;
  return data;
};

/**
 * Get employer profiles with optional filters.
 */
export const getEmployerProfiles = async (filters = {}) => {
  let query = supabase
    .from("employer_profiles")
    .select("*, profile:user_id(*)")
    .order("created_at", { ascending: false });

  if (filters.county) {
    query = query.eq("county", filters.county);
  }
  if (filters.verified !== undefined) {
    query = query.eq("verified", filters.verified);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data;
};

/**
 * Update an employer's profile.
 */
export const updateEmployerProfile = async (userId, updates) => {
  const { data, error } = await supabase
    .from("employer_profiles")
    .update(updates)
    .eq("user_id", userId)
    .select()
    .single();

  if (error) throw error;
  return data;
};

/**
 * Get the user's role from profiles table.
 */
export const getUserRole = async (userId) => {
  const { data, error } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", userId)
    .single();

  if (error) throw error;
  return data.role;
};

/**
 * Upload a document to Supabase Storage.
 * Bucket must exist: 'documents'
 */
export const uploadDocument = async (userId, file, documentType) => {
  const filePath = `${userId}/${documentType}_${Date.now()}_${file.name}`;

  const { data, error } = await supabase.storage
    .from("documents")
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: true,
    });

  if (error) throw error;

  // Get the public URL
  const {
    data: { publicUrl },
  } = supabase.storage.from("documents").getPublicUrl(filePath);

  return { path: filePath, url: publicUrl };
};

/**
 * Get all users (admin only, with pagination).
 */
export const getAllUsers = async (page = 1, limit = 20, filters = {}) => {
  let query = supabase
    .from("profiles")
    .select("*", { count: "exact" })
    .range((page - 1) * limit, page * limit - 1)
    .order("created_at", { ascending: false });

  if (filters.role) {
    query = query.eq("role", filters.role);
  }
  if (filters.status) {
    query = query.eq("status", filters.status);
  }
  if (filters.search) {
    query = query.ilike("full_name", `%${filters.search}%`);
  }

  const { data, error, count } = await query;
  if (error) throw error;
  return { data, count, page, limit };
};
