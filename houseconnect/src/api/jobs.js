import { supabase } from "../lib/supabase";


export const getJobs = async (filters = {}) => {
  let query = supabase
    .from("jobs")
    .select("*, employer:employer_id(full_name, county)")
    .order("created_at", { ascending: false });

  if (filters.county) {
    query = query.eq("county", filters.county);
  }
  if (filters.employment_type) {
    query = query.eq("employment_type", filters.employment_type);
  }
  if (filters.min_salary) {
    query = query.gte("salary_max", filters.min_salary);
  }
  if (filters.max_salary) {
    query = query.lte("salary_min", filters.max_salary);
  }
  if (filters.search) {
    query = query.or(
      `title.ilike.%${filters.search}%,description.ilike.%${filters.search}%`
    );
  }
  if (filters.status) {
    query = query.eq("status", filters.status);
  } else {
    query = query.eq("status", "open");
  }

  const { data, error } = await query;
  if (error) throw error;
  return data;
};

/**
 * Get a single job by ID, including employer profile.
 */
export const getJobById = async (id) => {
  const { data, error } = await supabase
    .from("jobs")
    .select("*, employer:employer_id(*)")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
};

/**
 * Create a new job posting (employer only).
 */
export const createJob = async (jobData) => {
  const { data, error } = await supabase
    .from("jobs")
    .insert({
      employer_id: jobData.employer_id,
      title: jobData.title,
      description: jobData.description,
      responsibilities: jobData.responsibilities || [],
      requirements: jobData.requirements || [],
      benefits: jobData.benefits || [],
      county: jobData.county,
      town: jobData.town || null,
      employment_type: jobData.employment_type,
      salary_min: jobData.salary_min,
      salary_max: jobData.salary_max,
      salary_currency: jobData.salary_currency || "KES",
      status: "open",
    })
    .select()
    .single();

  if (error) throw error;
  return data;
};

/**
 * Update an existing job posting (owner only).
 */
export const updateJob = async (id, jobData) => {
  const { data, error } = await supabase
    .from("jobs")
    .update(jobData)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

/**
 * Delete a job posting (owner/admin only).
 */
export const deleteJob = async (id) => {
  const { error } = await supabase.from("jobs").delete().eq("id", id);
  if (error) throw error;
};

/**
 * Get all jobs posted by a specific employer.
 */
export const getEmployerJobs = async (employerId) => {
  const { data, error } = await supabase
    .from("jobs")
    .select("*")
    .eq("employer_id", employerId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
};

/**
 * Get job recommendations for a worker based on their profile.
 */
export const getRecommendedJobs = async (county, limit = 6) => {
  let query = supabase
    .from("jobs")
    .select("*, employer:employer_id(full_name, county)")
    .eq("status", "open")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (county) {
    query = query.eq("county", county);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data;
};
