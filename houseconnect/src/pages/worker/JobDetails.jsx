import {
  MapPin, Wallet, Clock3, Calendar, Building2, BadgeCheck,
  ArrowLeft, Bookmark, Share2, Loader2,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useJob } from "../../hooks/useJobs";
import { useAuth } from "../../context/AuthContext";

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data: job, isLoading, isError } = useJob(id);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="animate-spin text-green-700" size={48} />
      </div>
    );
  }

  if (isError || !job) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-gray-700">Job not found</h2>
        <button onClick={() => navigate(-1)} className="mt-4 text-green-700 font-medium">
          ← Go back
        </button>
      </div>
    );
  }

  const daysAgo = job.created_at
    ? Math.floor((Date.now() - new Date(job.created_at)) / (1000 * 60 * 60 * 24))
    : 0;

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Back */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-green-700 font-medium hover:text-green-800"
      >
        <ArrowLeft size={18} />
        Back to Jobs
      </button>

      {/* Header */}
      <div className="bg-white rounded-3xl shadow p-8">
        <div className="flex justify-between">
          <div>
            <h1 className="text-4xl font-bold">{job.title}</h1>
            <p className="text-green-700 text-xl mt-2">
              {job.employer_name || job.employer || "Employer"}
            </p>
          </div>
          <div className="flex gap-3">
            <button className="border rounded-xl p-3 hover:bg-gray-50">
              <Bookmark />
            </button>
            <button className="border rounded-xl p-3 hover:bg-gray-50">
              <Share2 />
            </button>
          </div>
        </div>
        <div className="flex flex-wrap gap-8 mt-8 text-gray-600">
          <span className="flex gap-2"><MapPin />{job.location || job.county}</span>
          <span className="flex gap-2"><Wallet />{job.salary || "Negotiable"} / Month</span>
          <span className="flex gap-2"><Clock3 />{job.employment_type || job.type || "Full Time"}</span>
          <span className="flex gap-2"><Calendar />Posted {daysAgo} days ago</span>
        </div>
      </div>

      {/* Content */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left */}
        <div className="lg:col-span-2 space-y-8">
          {/* Description */}
          <div className="bg-white rounded-3xl shadow p-8">
            <h2 className="text-2xl font-bold">Job Description</h2>
            <p className="leading-8 text-gray-600 mt-6">{job.description}</p>
          </div>

          {/* Responsibilities */}
          {job.responsibilities?.length > 0 && (
            <div className="bg-white rounded-3xl shadow p-8">
              <h2 className="text-2xl font-bold">Responsibilities</h2>
              <ul className="mt-6 space-y-4 list-disc ml-6 text-gray-600">
                {(Array.isArray(job.responsibilities) ? job.responsibilities : [job.responsibilities]).map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Requirements */}
          {job.requirements?.length > 0 && (
            <div className="bg-white rounded-3xl shadow p-8">
              <h2 className="text-2xl font-bold">Requirements</h2>
              <ul className="mt-6 space-y-4 list-disc ml-6 text-gray-600">
                {(Array.isArray(job.requirements) ? job.requirements : [job.requirements]).map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Benefits */}
          {job.benefits?.length > 0 && (
            <div className="bg-white rounded-3xl shadow p-8">
              <h2 className="text-2xl font-bold">Benefits</h2>
              <ul className="mt-6 space-y-4 list-disc ml-6 text-gray-600">
                {(Array.isArray(job.benefits) ? job.benefits : [job.benefits]).map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Right */}
        <div className="space-y-6">
          {/* Apply Card */}
          <div className="bg-white rounded-3xl shadow p-8 sticky top-28">
            {user ? (
              <button
                onClick={() => navigate(`/worker/apply/${job.id}`)}
                className="w-full bg-green-700 hover:bg-green-800 text-white py-4 rounded-xl font-semibold"
              >
                Apply Now
              </button>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="w-full bg-green-700 hover:bg-green-800 text-white py-4 rounded-xl font-semibold"
              >
                Login to Apply
              </button>
            )}
            <button className="w-full border rounded-xl py-4 mt-4 hover:bg-gray-50">Save Job</button>
            <hr className="my-8" />
            <div className="space-y-5">
              <div className="flex justify-between">
                <span>Salary</span>
                <strong>{job.salary || "Negotiable"}</strong>
              </div>
              <div className="flex justify-between">
                <span>Job Type</span>
                <strong>{job.employment_type || job.type || "Full Time"}</strong>
              </div>
              <div className="flex justify-between">
                <span>Experience</span>
                <strong>{job.experience_required || "Any"}</strong>
              </div>
              <div className="flex justify-between">
                <span>Accommodation</span>
                <strong>{job.accommodation ? "Provided" : "Not Provided"}</strong>
              </div>
            </div>
          </div>

          {/* Employer */}
          <div className="bg-white rounded-3xl shadow p-8">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                <Building2 className="text-green-700" />
              </div>
              <div>
                <h3 className="font-bold">{job.employer_name || job.employer || "Employer"}</h3>
                <p className="text-gray-500">{job.employer_location || job.location || "Nairobi"}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 mt-6">
              <BadgeCheck className="text-blue-600" />
              Verified Employer
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
