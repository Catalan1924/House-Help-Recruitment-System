import { getJobs, getRecommendedJobs, getEmployerJobs } from "../api/jobs";

/**
 * Search jobs with text-based filtering.
 * Combines the API's text search with client-side filtering.
 */
export const searchJobs = async (searchTerm, filters = {}) => {
  const allJobs = await getJobs({ ...filters, search: searchTerm });
  return allJobs;
};

/**
 * Get jobs recommended for a worker based on their county and profile.
 */
export const getJobsForWorker = async (workerProfile) => {
  if (!workerProfile) return getRecommendedJobs();

  return getRecommendedJobs(workerProfile.county);
};

/**
 * Get all active jobs for an employer.
 */
export const getActiveEmployerJobs = async (employerId) => {
  return getEmployerJobs(employerId);
};

/**
 * Group jobs by employment type for dashboard display.
 */
export const groupJobsByType = (jobs) => {
  return jobs.reduce((acc, job) => {
    const type = job.employment_type || "Other";
    if (!acc[type]) acc[type] = [];
    acc[type].push(job);
    return acc;
  }, {});
};
