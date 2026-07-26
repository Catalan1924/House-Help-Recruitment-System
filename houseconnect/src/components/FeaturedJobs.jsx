import { MapPin, Briefcase, Clock3, Wallet, ArrowRight, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useJobs } from "../hooks/useJobs";

const FeaturedJobs = () => {
  const navigate = useNavigate();
  const { data: jobs, isLoading } = useJobs({ limit: 3 });

  const displayJobs = jobs?.slice(0, 3) || [];

  return (
    <section className="bg-gray-50 py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-4xl font-bold">
              Featured <span className="text-green-700">Jobs</span>
            </h2>
            <p className="text-gray-600 mt-3">Browse the latest opportunities from verified employers.</p>
          </div>
          <button
            onClick={() => navigate("/worker/jobs")}
            className="hidden md:block bg-green-700 text-white px-6 py-3 rounded-xl hover:bg-green-800"
          >
            View All Jobs
          </button>
        </div>

        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="animate-spin text-green-700" size={48} />
          </div>
        )}

        {!isLoading && displayJobs.length === 0 && (
          <p className="text-gray-500 text-center py-12">No jobs available yet.</p>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {displayJobs.map((job) => (
            <div key={job.id} className="bg-white rounded-2xl shadow hover:shadow-xl transition p-8">
              <div className="flex justify-between items-center">
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                  {job.employment_type || job.type || "Full Time"}
                </span>
                <Briefcase className="text-green-700" />
              </div>
              <h3 className="text-2xl font-bold mt-6">{job.title}</h3>
              <p className="text-gray-500 mt-2">{job.employer?.full_name || "Employer"}</p>
              <div className="space-y-4 mt-8">
                <div className="flex items-center gap-3"><MapPin size={18} />{job.county || job.location}</div>
                <div className="flex items-center gap-3"><Wallet size={18} />KES {job.salary_min || "—"} / Month</div>
                <div className="flex items-center gap-3"><Clock3 size={18} />Posted {job.created_at ? Math.floor((Date.now() - new Date(job.created_at)) / (1000 * 60 * 60 * 24)) : "—"} days ago</div>
              </div>
              <button
                onClick={() => navigate(`/worker/jobs/${job.id}`)}
                className="mt-8 w-full bg-green-700 hover:bg-green-800 text-white rounded-xl py-3 flex justify-center items-center gap-2"
              >
                Apply Now
                <ArrowRight size={18} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedJobs;
