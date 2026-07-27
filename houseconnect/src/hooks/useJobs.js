import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
  getEmployerJobs,
  getRecommendedJobs,
} from "../api/jobs";
import { getWorkerProfiles } from "../api/users";

/**
 * Fetch all jobs with optional filters.
 */
export const useJobs = (filters = {}) => {
  return useQuery({
    queryKey: ["jobs", filters],
    queryFn: () => getJobs(filters),
    enabled: true,
  });
};

/**
 * Fetch a single job by ID.
 */
export const useJob = (id) => {
  return useQuery({
    queryKey: ["job", id],
    queryFn: () => getJobById(id),
    enabled: !!id,
  });
};

/**
 * Create a new job (mutation).
 */
export const useCreateJob = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createJob,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
    },
  });
};

/**
 * Update an existing job (mutation).
 */
export const useUpdateJob = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => updateJob(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      queryClient.invalidateQueries({ queryKey: ["job", variables.id] });
    },
  });
};

/**
 * Delete a job (mutation).
 */
export const useDeleteJob = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteJob,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
    },
  });
};

/**
 * Fetch jobs posted by a specific employer.
 */
export const useEmployerJobs = (employerId) => {
  return useQuery({
    queryKey: ["employerJobs", employerId],
    queryFn: () => getEmployerJobs(employerId),
    enabled: !!employerId,
  });
};

/**
 * Fetch recommended jobs for a worker.
 */
export const useRecommendedJobs = (county) => {
  return useQuery({
    queryKey: ["recommendedJobs", county],
    queryFn: () => getRecommendedJobs(county),
    enabled: true,
  });
};

/**
 * Fetch worker profiles (for employer find-workers).
 */
export const useWorkers = (filters = {}) => {
  return useQuery({
    queryKey: ["workers", filters],
    queryFn: () => getWorkerProfiles(filters),
    enabled: true,
  });
};
