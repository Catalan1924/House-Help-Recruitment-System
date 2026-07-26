import { MapPin, Star, Briefcase, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";

const WorkerCard = ({ worker, showInvite = false, onInvite }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition">
      <div className="flex items-start gap-4 mb-4">
        <img
          src={worker.avatar || `https://i.pravatar.cc/100?img=${worker.id || 32}`}
          alt={worker.full_name || worker.name}
          className="w-16 h-16 rounded-xl object-cover"
        />
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-lg truncate">
            {worker.full_name || worker.name || "Worker"}
          </h3>
          {worker.county && (
            <p className="text-sm text-gray-500 flex items-center gap-1 mt-0.5">
              <MapPin size={12} /> {worker.county}
            </p>
          )}
          <div className="flex items-center gap-2 mt-1">
            <div className="flex items-center gap-0.5">
              <Star size={14} className="text-yellow-500 fill-yellow-500" />
              <span className="text-sm font-medium">
                {worker.rating || worker.average_rating || "4.5"}
              </span>
            </div>
            {worker.experience && (
              <span className="text-xs text-gray-400">
                · {worker.experience} {worker.experience === 1 ? "year" : "years"} exp
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {(worker.skills || []).slice(0, 4).map((skill) => (
          <span
            key={skill}
            className="px-2 py-1 bg-gray-100 rounded-lg text-xs text-gray-600"
          >
            {skill}
          </span>
        ))}
      </div>

      <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
        {worker.expected_salary && (
          <span className="flex items-center gap-1">
            <DollarSign size={14} />
            KES {Number(worker.expected_salary).toLocaleString()}/mo
          </span>
        )}
        {worker.availability && (
          <span className="flex items-center gap-1">
            <Briefcase size={14} />
            {worker.availability}
          </span>
        )}
      </div>

      <div className="flex gap-2">
        <Link
          to={`/employer/find-workers`}
          className="flex-1 text-center py-2 bg-green-700 text-white rounded-xl hover:bg-green-800 text-sm font-medium transition"
        >
          View Profile
        </Link>
        {showInvite && (
          <button
            onClick={() => onInvite?.(worker.id)}
            className="flex-1 text-center py-2 border border-green-700 text-green-700 rounded-xl hover:bg-green-50 text-sm font-medium transition"
          >
            Invite
          </button>
        )}
      </div>
    </div>
  );
};

export default WorkerCard;
