import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Briefcase, MapPin, Users, Loader2, ArrowRight } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { getEmployerJobsWithCounts } from "../../api/employer";

const MyRecentJobs = () => {
  const { user } = useAuth();
  const { data: jobs, isLoading, isError } = useQuery({
    queryKey: ["employerJobsWithCounts", user?.id],
    queryFn: () => getEmployerJobsWithCounts(user.id),
    enabled: !!user?.id,
  });

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-2xl font-bold mb-8">My Job Postings</h2>
        <div className="flex items-center justify-center py-8">
          <Loader2 className="animate-spin text-green-700" size={32} />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-2xl font-bold mb-8">My Job Postings</h2>
        <p className="text-red-500 text-center py-8">Failed to load jobs.</p>
      </div>
    );
  }

  if (!jobs?.length) {
    return (
      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-2xl font-bold mb-8">My Job Postings</h2>
        <div className="text-center py-8">
          <Briefcase size={48} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500 mb-4">No jobs posted yet.</p>
          <Link
            to="/employer/post-job"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-green-700 text-white rounded-xl font-medium hover:bg-green-800 transition"
          >
            Post Your First Job
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    );
  }

  const statusBadge = (s) => {
    const map = {
      open: "bg-green-100 text-green-700",
      filled: "bg-blue-100 text-blue-700",
      closed: "bg-gray-100 text-gray-600",
      draft: "bg-yellow-100 text-yellow-700",
    };
    return map[s] || map.open;
  };

  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold">My Job Postings</h2>
        <Link
          to="/employer/post-job"
          className="text-sm text-green-700 font-medium hover:underline"
        >
          + Post New
        </Link>
      </div>

      <div className="space-y-4">
        {jobs.map((job) => (
          <Link
            key={job.id}
            to={`/employer/jobs/${job.id}`}
            className="flex items-center justify-between border rounded-xl p-5 hover:border-green-600 transition"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3">
                <h3 className="font-bold text-lg truncate">{job.title}</h3>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium shrink-0 ${statusBadge(job.status)}`}>
                  {job.status}
                </span>
              </div>
              <div className="flex gap-5 mt-2 text-gray-500 text-sm">
                <span className="flex items-center gap-1">
                  <MapPin size={14} /> {job.county}
                </span>
                <span className="flex items-center gap-1">
                  <Users size={14} /> {job.applicant_count} applicant{job.applicant_count !== 1 ? "s" : ""}
                </span>
              </div>
            </div>
            <div className="text-green-700 shrink-0 ml-4">
              <ArrowRight size={20} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MyRecentJobs;
