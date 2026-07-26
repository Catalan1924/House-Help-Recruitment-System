import { MapPin, Wallet, Briefcase } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useJobs } from "../../hooks/useJobs";

const JobRecommendations = () => {
  const navigate = useNavigate();
  const { data: jobs, isLoading, isError } = useJobs({ limit: 3 });

  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <h2 className="text-2xl font-bold">Recommended Jobs</h2>

      {isLoading && (
        <div className="space-y-4 mt-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="border rounded-xl p-5 animate-pulse">
              <div className="h-5 bg-gray-200 rounded w-1/3 mb-3" />
              <div className="h-4 bg-gray-100 rounded w-2/3" />
            </div>
          ))}
        </div>
      )}

      {isError && (
        <p className="text-red-500 mt-8 text-center">Failed to load jobs.</p>
      )}

      {!isLoading && !isError && jobs?.length === 0 && (
        <p className="text-gray-500 mt-8 text-center">No jobs available right now.</p>
      )}

      {!isLoading && !isError && jobs?.length > 0 && (
        <div className="space-y-5 mt-8">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="border rounded-xl p-5 hover:border-green-600 transition"
            >
              <div className="flex justify-between">
                <div>
                  <h3 className="font-bold text-lg">{job.title}</h3>
                  <div className="flex gap-6 mt-4 text-gray-600">
                    <span className="flex gap-2">
                      <MapPin size={18} />
                      {job.location || job.county}
                    </span>
                    <span className="flex gap-2">
                      <Wallet size={18} />
                      {job.salary || "Negotiable"}
                    </span>
                    <span className="flex gap-2">
                      <Briefcase size={18} />
                      {job.employment_type || job.type || "Full Time"}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => navigate(`/worker/jobs/${job.id}`)}
                  className="bg-green-700 text-white px-6 rounded-xl hover:bg-green-800 transition"
                >
                  Apply
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default JobRecommendations;
