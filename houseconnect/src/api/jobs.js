import { supabase } from "../lib/supabase";

/**
 * Helper: batch-fetch employer profiles for a list of jobs
 * and stitch them into each job object.
 */
const stitchEmployers = async (jobs) => {
  if (!jobs?.length) return jobs;
  const employerIds = [...new Set(jobs.map((j) => j.employer_id))];
  const { data: profiles } = await supabase
    .from("profiles")
    .select("id, full_name, county")
    .in("id", employerIds);
  const profileMap = Object.fromEntries((profiles || []).map((p) => [p.id, p]));
  return jobs.map((j) => ({ ...j, employer: profileMap[j.employer_id] || null }));
};

export const getJobs = async (filters = {}) => {
  let query = supabase
    .from("jobs")
    .select("*")
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
  return stitchEmployers(data);
};

/**
 * Get a single job by ID, including employer profile.
 */
export const getJobById = async (id) => {
  const { data: job, error } = await supabase
    .from("jobs")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;
  if (!job) return null;

  // Fetch employer profile separately
  const { data: employer } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", job.employer_id)
    .single();

  return { ...job, employer: employer || null };
};

/**
 * Create a new job posting (employer only).
 */
const normalizeEmploymentType = (type) => {
  if (!type) return null;
  const normalized = String(type).trim();
  const mapping = {
    "live-in": "Live-in",
    "live-out": "Live-out",
    "part-time": "Part-time",
    "full-time": "Full-time",
    "contract": "Contract",
    "temporary": "Temporary",
    "Live-in": "Live-in",
    "Live-out": "Live-out",
    "Part-time": "Part-time",
    "Full-time": "Full-time",
    "Contract": "Contract",
    "Temporary": "Temporary",
  };
  return mapping[normalized] || normalized;
};

const toNullableNumber = (value) => {
  if (value === null || value === undefined || value === "") return null;
  const parsed = Number(value);
  return Number.isNaN(parsed) ? null : parsed;
};

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
      employment_type: normalizeEmploymentType(jobData.employment_type),
      salary_min: toNullableNumber(jobData.salary_min),
      salary_max: toNullableNumber(jobData.salary_max),
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
    .select("*")
    .eq("status", "open")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (county) {
    query = query.eq("county", county);
  }

  const { data, error } = await query;
  if (error) throw error;
  return stitchEmployers(data);
};
