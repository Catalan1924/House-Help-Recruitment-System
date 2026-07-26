import { MapPin, Star, BadgeCheck, Clock, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useWorkers } from "../hooks/useJobs";

const FeaturedWorkers = () => {
  const navigate = useNavigate();
  const { data: workers, isLoading } = useWorkers({ limit: 3 });

  const displayWorkers = workers?.slice(0, 3) || [];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-4xl font-bold">
              Featured <span className="text-green-700">House Helps</span>
            </h2>
            <p className="text-gray-600 mt-3">Browse verified domestic workers ready for employment.</p>
          </div>
          <button
            onClick={() => navigate("/employer/find-workers")}
            className="hidden md:block bg-green-700 text-white px-6 py-3 rounded-xl hover:bg-green-800 transition"
          >
            View All
          </button>
        </div>

        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="animate-spin text-green-700" size={48} />
          </div>
        )}

        {!isLoading && displayWorkers.length === 0 && (
          <p className="text-gray-500 text-center py-12">No workers available yet.</p>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayWorkers.map((worker) => (
            <div
              key={worker.id || worker.user_id}
              className="bg-white rounded-3xl overflow-hidden shadow hover:shadow-2xl transition duration-300"
            >
              <img
                src={`https://i.pravatar.cc/300?u=${worker.user_id || worker.id}`}
                alt={worker.profile?.full_name || "Worker"}
                className="h-72 w-full object-cover"
              />
              <div className="p-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold">{worker.profile?.full_name || "Worker"}</h3>
                  <BadgeCheck className="text-blue-500" size={22} />
                </div>
                <div className="flex items-center gap-2 mt-3 text-gray-600">
                  <MapPin size={17} />{worker.county || "Nairobi"}
                </div>
                <div className="flex items-center gap-2 mt-2 text-gray-600">
                  <Clock size={17} />{worker.experience || "1+ years"}
                </div>
                <div className="flex justify-between items-center mt-5">
                  <span className="text-green-700 font-bold">KES {worker.expected_salary || "20,000"} / month</span>
                  <div className="flex items-center gap-1">
                    <Star size={18} fill="#FACC15" className="text-yellow-400" />4.8
                  </div>
                </div>
                <div className="mt-5">
                  {worker.availability !== "busy" ? (
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">Available</span>
                  ) : (
                    <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm">Busy</span>
                  )}
                </div>
                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => navigate(`/employer/find-workers`)}
                    className="flex-1 border border-green-700 text-green-700 rounded-xl py-3 hover:bg-green-50 transition"
                  >
                    View Profile
                  </button>
                  <button
                    onClick={() => navigate("/register")}
                    className="flex-1 bg-green-700 text-white rounded-xl py-3 hover:bg-green-800 transition"
                  >
                    Hire
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedWorkers;
