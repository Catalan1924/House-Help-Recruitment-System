import { useParams, Link, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  MapPin,
  Briefcase,
  DollarSign,
  Clock,
  Users,
  ArrowLeft,
  Edit,
  Trash2,
  Loader2,
  AlertCircle,
  CheckCircle,
  XCircle,
  User,
  Phone,
  Mail,
  Calendar,
  ListChecks,
  Star,
} from "lucide-react";

import { getJobById, deleteJob, updateJob } from "../../api/jobs";
import { getEmployerApplicants } from "../../api/employer";

const JobDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Fetch job details
  const {
    data: job,
    isLoading: jobLoading,
    isError: jobError,
    error: jobErr,
  } = useQuery({
    queryKey: ["job", id],
    queryFn: () => getJobById(id),
    enabled: !!id,
  });

  // Fetch applicants for this job
  const { data: applicants = [], isLoading: appsLoading } = useQuery({
    queryKey: ["jobApplicants", id],
    queryFn: async () => {
      // Get employer id from the job
      const job = await getJobById(id);
      if (!job) return [];
      const allApps = await getEmployerApplicants(job.employer_id, 50);
      return allApps.filter((a) => a.job_id === id);
    },
    enabled: !!id,
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: () => deleteJob(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employerJobs"] });
      queryClient.invalidateQueries({ queryKey: ["employerStats"] });
      navigate("/employer/dashboard");
    },
  });

  // Status change mutation
  const statusMutation = useMutation({
    mutationFn: (newStatus) => updateJob(id, { status: newStatus }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["job", id] });
      queryClient.invalidateQueries({ queryKey: ["employerJobs"] });
      queryClient.invalidateQueries({ queryKey: ["employerStats"] });
    },
  });

  // --- Loading State ---
  if (jobLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="animate-spin text-green-700" size={40} />
      </div>
    );
  }

  // --- Error State ---
  if (jobError) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <AlertCircle size={48} className="mx-auto text-red-500 mb-4" />
          <h2 className="text-xl font-semibold mb-2">Job Not Found</h2>
          <p className="text-gray-500 mb-4">
            {jobErr?.message || "This job posting doesn't exist or has been removed."}
          </p>
          <Link
            to="/employer/dashboard"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-green-700 text-white rounded-xl font-medium hover:bg-green-800 transition"
          >
            <ArrowLeft size={18} />
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  // --- Empty State ---
  if (!job) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <Briefcase size={48} className="mx-auto text-gray-300 mb-4" />
          <h2 className="text-xl font-semibold mb-2">Job Not Found</h2>
          <p className="text-gray-500 mb-4">This job posting doesn't exist.</p>
          <Link
            to="/employer/dashboard"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-green-700 text-white rounded-xl font-medium hover:bg-green-800 transition"
          >
            <ArrowLeft size={18} />
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  // --- Helpers ---
  const statusBadge = (s) => {
    const map = {
      open: "bg-green-100 text-green-700 border-green-200",
      filled: "bg-blue-100 text-blue-700 border-blue-200",
      closed: "bg-gray-100 text-gray-600 border-gray-200",
      draft: "bg-yellow-100 text-yellow-700 border-yellow-200",
    };
    return map[s] || map.open;
  };

  const statusIcon = (s) => {
    const map = {
      open: <CheckCircle size={16} className="text-green-600" />,
      filled: <CheckCircle size={16} className="text-blue-600" />,
      closed: <XCircle size={16} className="text-gray-500" />,
    };
    return map[s] || null;
  };

  const formatSalary = (min, max, currency = "KES") => {
    const fmt = (n) => (n ? n.toLocaleString() : "?");
    if (min && max) return `${currency} ${fmt(min)} – ${fmt(max)}`;
    if (min) return `${currency} ${fmt(min)}+`;
    if (max) return `Up to ${currency} ${fmt(max)}`;
    return "Negotiable";
  };

  const employmentTypeColor = (type) => {
    const map = {
      "Live-in": "bg-purple-100 text-purple-700",
      "Live-out": "bg-indigo-100 text-indigo-700",
      "Full-time": "bg-emerald-100 text-emerald-700",
      "Part-time": "bg-amber-100 text-amber-700",
      Contract: "bg-cyan-100 text-cyan-700",
      Temporary: "bg-pink-100 text-pink-700",
    };
    return map[type] || "bg-gray-100 text-gray-700";
  };

  const applicantStatusBadge = (s) => {
    const map = {
      pending: "bg-yellow-100 text-yellow-700 text-xs",
      reviewed: "bg-blue-100 text-blue-700 text-xs",
      shortlisted: "bg-purple-100 text-purple-700 text-xs",
      rejected: "bg-red-100 text-red-700 text-xs",
      hired: "bg-green-100 text-green-700 text-xs",
    };
    return map[s] || map.pending;
  };

  // --- Render ---
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Back Link */}
      <Link
        to="/employer/dashboard"
        className="inline-flex items-center gap-2 text-gray-500 hover:text-green-700 transition text-sm font-medium"
      >
        <ArrowLeft size={16} />
        Back to Dashboard
      </Link>

      {/* Header */}
      <div className="bg-white rounded-2xl shadow p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3 flex-wrap">
              <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${statusBadge(job.status)}`}>
                {statusIcon(job.status)}
                <span className="ml-1.5">{job.status?.charAt(0).toUpperCase() + job.status?.slice(1)}</span>
              </span>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${employmentTypeColor(job.employment_type)}`}>
                {job.employment_type}
              </span>
            </div>

            <h1 className="text-2xl md:text-3xl font-bold mb-3">{job.title}</h1>

            <div className="flex flex-wrap gap-4 text-gray-500 text-sm">
              <span className="flex items-center gap-1.5">
                <MapPin size={16} />
                {job.town ? `${job.town}, ${job.county}` : job.county}
              </span>
              <span className="flex items-center gap-1.5">
                <DollarSign size={16} />
                {formatSalary(job.salary_min, job.salary_max, job.salary_currency)}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar size={16} />
                Posted {job.created_at ? new Date(job.created_at).toLocaleDateString("en-KE", { year: "numeric", month: "short", day: "numeric" }) : "Recently"}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 shrink-0">
            {/* Status Toggle */}
            {job.status === "open" && (
              <button
                onClick={() => statusMutation.mutate("filled")}
                disabled={statusMutation.isPending}
                className="px-4 py-2 text-sm font-medium rounded-xl border border-blue-300 text-blue-700 hover:bg-blue-50 transition disabled:opacity-50"
              >
                {statusMutation.isPending ? "Updating..." : "Mark as Filled"}
              </button>
            )}
            {job.status === "filled" && (
              <button
                onClick={() => statusMutation.mutate("open")}
                disabled={statusMutation.isPending}
                className="px-4 py-2 text-sm font-medium rounded-xl border border-green-300 text-green-700 hover:bg-green-50 transition disabled:opacity-50"
              >
                {statusMutation.isPending ? "Updating..." : "Reopen"}
              </button>
            )}
            {job.status !== "closed" && (
              <button
                onClick={() => statusMutation.mutate("closed")}
                disabled={statusMutation.isPending}
                className="px-4 py-2 text-sm font-medium rounded-xl border border-gray-300 text-gray-600 hover:bg-gray-50 transition disabled:opacity-50"
              >
                Close
              </button>
            )}

            {/* Delete */}
            <button
              onClick={() => {
                if (window.confirm("Are you sure you want to delete this job posting? This action cannot be undone.")) {
                  deleteMutation.mutate();
                }
              }}
              disabled={deleteMutation.isPending}
              className="px-4 py-2 text-sm font-medium rounded-xl border border-red-200 text-red-600 hover:bg-red-50 transition disabled:opacity-50"
            >
              {deleteMutation.isPending ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <Trash2 size={16} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="bg-white rounded-2xl shadow p-6 md:p-8">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Briefcase size={20} className="text-green-700" />
          Job Description
        </h2>
        <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{job.description || "No description provided."}</p>
      </div>

      {/* Responsibilities & Requirements & Benefits */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Responsibilities */}
        {job.responsibilities?.length > 0 && (
          <div className="bg-white rounded-2xl shadow p-6 md:p-8">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <ListChecks size={20} className="text-green-700" />
              Responsibilities
            </h2>
            <ul className="space-y-2">
              {job.responsibilities.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-gray-700">
                  <span className="text-green-600 mt-1 shrink-0">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Requirements */}
        {job.requirements?.length > 0 && (
          <div className="bg-white rounded-2xl shadow p-6 md:p-8">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Star size={20} className="text-green-700" />
              Requirements
            </h2>
            <ul className="space-y-2">
              {job.requirements.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-gray-700">
                  <span className="text-green-600 mt-1 shrink-0">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Benefits */}
        {job.benefits?.length > 0 && (
          <div className="bg-white rounded-2xl shadow p-6 md:p-8 md:col-span-2">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Star size={20} className="text-green-700" />
              Benefits
            </h2>
            <ul className="grid sm:grid-cols-2 gap-2">
              {job.benefits.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-gray-700">
                  <span className="text-green-600 mt-1 shrink-0">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Applicants Section */}
      <div className="bg-white rounded-2xl shadow p-6 md:p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Users size={20} className="text-green-700" />
            Applicants
            {applicants.length > 0 && (
              <span className="text-sm font-normal text-gray-400 ml-1">({applicants.length})</span>
            )}
          </h2>
        </div>

        {appsLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="animate-spin text-green-700" size={28} />
          </div>
        ) : applicants.length === 0 ? (
          <div className="text-center py-8">
            <Users size={40} className="mx-auto text-gray-300 mb-3" />
            <p className="text-gray-500">No applicants yet for this job.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {applicants.map((app) => (
              <div
                key={app.id}
                className="flex items-center justify-between border rounded-xl p-4 hover:border-green-300 transition"
              >
                <div className="flex items-center gap-4">
                  {/* Avatar */}
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                    {app.worker?.avatar_url ? (
                      <img
                        src={app.worker.avatar_url}
                        alt={app.worker.full_name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <User size={20} className="text-green-700" />
                    )}
                  </div>

                  <div className="min-w-0">
                    <p className="font-semibold text-gray-900 truncate">
                      {app.worker?.full_name || "Unknown Worker"}
                    </p>
                    <div className="flex items-center gap-3 text-xs text-gray-500 mt-0.5">
                      {app.worker?.phone && (
                        <span className="flex items-center gap-1">
                          <Phone size={12} /> {app.worker.phone}
                        </span>
                      )}
                      {app.worker?.county && (
                        <span className="flex items-center gap-1">
                          <MapPin size={12} /> {app.worker.county}
                        </span>
                      )}
                    </div>
                    {app.cover_letter && (
                      <p className="text-sm text-gray-600 mt-1 line-clamp-1">{app.cover_letter}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${applicantStatusBadge(app.status)}`}>
                    {app.status}
                  </span>
                  <span className="text-xs text-gray-400">
                    {app.created_at ? new Date(app.created_at).toLocaleDateString("en-KE", { month: "short", day: "numeric" }) : ""}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default JobDetail;
