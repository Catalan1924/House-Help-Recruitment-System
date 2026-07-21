import {
  MapPin,
  Wallet,
  Clock3,
  Bookmark,
} from "lucide-react";

const JobCard = ({ job }) => {
  return (
    <div className="bg-white rounded-2xl shadow hover:shadow-xl transition p-6">

      <div className="flex justify-between">

        <div>

          <h2 className="text-2xl font-bold">
            {job.title}
          </h2>

          <p className="text-green-700 font-medium mt-1">
            {job.employer}
          </p>

        </div>

        <button>

          <Bookmark />

        </button>

      </div>

      <div className="flex flex-wrap gap-6 mt-6 text-gray-600">

        <span className="flex gap-2 items-center">

          <MapPin size={18} />

          {job.location}

        </span>

        <span className="flex gap-2 items-center">

          <Wallet size={18} />

          {job.salary}

        </span>

        <span className="flex gap-2 items-center">

          <Clock3 size={18} />

          {job.type}

        </span>

      </div>

      <p className="text-gray-500 leading-7 mt-6">

        {job.description}

      </p>

      <div className="flex gap-4 mt-8">

        <button className="flex-1 border border-green-700 rounded-xl py-3 text-green-700 hover:bg-green-50">
          View Details
        </button>

        <button className="flex-1 bg-green-700 text-white rounded-xl py-3 hover:bg-green-800">
          Apply Now
        </button>

      </div>

    </div>
  );
};

export default JobCard;