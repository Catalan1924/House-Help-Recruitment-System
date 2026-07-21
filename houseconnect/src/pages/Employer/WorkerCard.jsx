import {
  BadgeCheck,
  Star,
  MapPin,
  Heart,
  Eye,
  Send,
} from "lucide-react";

const WorkerCard = ({ worker }) => {
  return (
    <div className="bg-white rounded-2xl shadow hover:shadow-xl transition p-6">

      <div className="flex justify-between">

        <div className="flex gap-5">

          <img
            src={`https://i.pravatar.cc/150?u=${worker.id}`}
            className="w-24 h-24 rounded-full"
            alt={worker.name}
          />

          <div>

            <div className="flex items-center gap-2">

              <h2 className="text-2xl font-bold">
                {worker.name}
              </h2>

              {worker.verified && (
                <BadgeCheck className="text-blue-600"/>
              )}

            </div>

            <div className="flex items-center gap-2 mt-2 text-gray-500">

              <MapPin size={18}/>

              {worker.county}

            </div>

            <div className="flex items-center gap-2 mt-2">

              <Star
                size={18}
                fill="#FACC15"
                className="text-yellow-400"
              />

              {worker.rating}

            </div>

          </div>

        </div>

        <div className="text-right">

          <h3 className="text-3xl font-bold text-green-700">
            {worker.match}%
          </h3>

          <p className="text-gray-500">
            Match Score
          </p>

        </div>

      </div>

      <div className="flex flex-wrap gap-3 mt-8">

        {worker.skills.map(skill => (
          <span
            key={skill}
            className="bg-green-100 text-green-700 px-4 py-2 rounded-full"
          >
            {skill}
          </span>
        ))}

      </div>

      <div className="flex justify-between items-center mt-8">

        <div>

          <p className="font-semibold">
            {worker.salary}
          </p>

          <span
            className={`text-sm ${
              worker.available
                ? "text-green-700"
                : "text-red-600"
            }`}
          >
            {worker.available ? "Available" : "Busy"}
          </span>

        </div>

        <div className="flex gap-3">

          <button className="border rounded-xl p-3 hover:bg-gray-50">
            <Heart />
          </button>

          <button className="border rounded-xl p-3 hover:bg-gray-50">
            <Eye />
          </button>

          <button className="bg-green-700 text-white rounded-xl px-5 py-3 flex items-center gap-2 hover:bg-green-800">
            <Send size={18}/>
            Invite
          </button>

        </div>

      </div>

    </div>
  );
};

export default WorkerCard;