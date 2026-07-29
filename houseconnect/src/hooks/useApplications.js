import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
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
      toast.success("Application submitted successfully!");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to submit application");
    },
  });
};

export const useUpdateApplicationStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }) => updateApplicationStatus(id, status),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["myApplications"] });
      queryClient.invalidateQueries({ queryKey: ["jobApplications"] });
      queryClient.invalidateQueries({ queryKey: ["application"] });
      const labels = { shortlisted: "Shortlisted!", accepted: "Hired!", rejected: "Rejected", reviewed: "Reviewed" };
      toast.success(labels[variables.status] || `Status updated to ${variables.status}`);
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update status");
    },
  });
};

export const useWithdrawApplication = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => withdrawApplication(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myApplications"] });
      toast.success("Application withdrawn");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to withdraw");
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
