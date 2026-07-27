import { MapPin, Clock, DollarSign, Bookmark } from "lucide-react";
import { Link } from "react-router-dom";

const JobCard = ({ job, onSave, saved = false }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-xl font-bold text-green-700">
            {job.employer?.full_name?.[0] || "E"}
          </div>
          <div>
            <h3 className="font-semibold text-lg">{job.title}</h3>
            <p className="text-sm text-gray-500">{job.employer?.full_name || "Employer"}</p>
          </div>
        </div>
        <button
          onClick={(e) => {
            e.preventDefault();
            onSave?.(job.id);
          }}
          className={`p-2 rounded-lg transition ${
            saved ? "text-green-700 bg-green-50" : "text-gray-400 hover:text-green-700 hover:bg-green-50"
          }`}
        >
          <Bookmark size={18} fill={saved ? "currentColor" : "none"} />
        </button>
      </div>

      <p className="text-gray-600 text-sm line-clamp-2 mb-4">{job.description}</p>

      <div className="flex flex-wrap gap-3 text-sm text-gray-500">
        {job.county && (
          <span className="flex items-center gap-1">
            <MapPin size={14} /> {job.county}
          </span>
        )}
        {job.employment_type && (
          <span className="flex items-center gap-1">
            <Clock size={14} /> {job.employment_type}
          </span>
        )}
        {(job.salary_min || job.salary_max) && (
          <span className="flex items-center gap-1 font-medium text-green-700">
            <DollarSign size={14} />
            KES {job.salary_min?.toLocaleString()}
            {job.salary_max && ` - ${job.salary_max.toLocaleString()}`}
          </span>
        )}
      </div>

      <div className="mt-4 pt-4 border-t flex gap-3">
        <Link
          to={`/worker/jobs/${job.id}`}
          className="flex-1 text-center py-2 bg-green-700 text-white rounded-xl hover:bg-green-800 text-sm font-medium transition"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default JobCard;
