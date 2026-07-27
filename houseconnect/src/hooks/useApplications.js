import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  applyToJob,
  getMyApplications,
  getJobApplications,
  getApplicationById,
  updateApplicationStatus,
  withdrawApplication,
  getApplicationCount,
} from "../api/applications";

export const useMyApplications = (workerId) => {
  return useQuery({
    queryKey: ["myApplications", workerId],
    queryFn: () => getMyApplications(workerId),
    enabled: !!workerId,
  });
};

export const useJobApplications = (jobId) => {
  return useQuery({
    queryKey: ["jobApplications", jobId],
    queryFn: () => getJobApplications(jobId),
    enabled: !!jobId,
  });
};

export const useApplication = (id) => {
  return useQuery({
    queryKey: ["application", id],
    queryFn: () => getApplicationById(id),
    enabled: !!id,
  });
};

export const useCreateApplication = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ jobId, workerId, applicationData }) =>
      applyToJob(jobId, workerId, applicationData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myApplications"] });
      queryClient.invalidateQueries({ queryKey: ["jobApplications"] });
    },
  });
};

export const useUpdateApplicationStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }) => updateApplicationStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myApplications"] });
      queryClient.invalidateQueries({ queryKey: ["jobApplications"] });
      queryClient.invalidateQueries({ queryKey: ["application"] });
    },
  });
};

export const useWithdrawApplication = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => withdrawApplication(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myApplications"] });
    },
  });
};

export const useApplicationCount = (jobId) => {
  return useQuery({
    queryKey: ["applicationCount", jobId],
    queryFn: () => getApplicationCount(jobId),
    enabled: !!jobId,
  });
};
