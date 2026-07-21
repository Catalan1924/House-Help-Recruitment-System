import {
  MapPin,
  Wallet,
  Briefcase,
} from "lucide-react";

const jobs = [
  {
    title: "Live-in House Help",
    location: "Karen",
    salary: "KES 30,000",
    type: "Full Time",
  },
  {
    title: "Nanny",
    location: "Westlands",
    salary: "KES 25,000",
    type: "Full Time",
  },
];

const JobRecommendations = () => {
  return (

    <div className="bg-white rounded-2xl shadow p-6">

      <h2 className="text-2xl font-bold">

        Recommended Jobs

      </h2>

      <div className="space-y-5 mt-8">

        {jobs.map((job) => (

          <div
            key={job.title}
            className="border rounded-xl p-5 hover:border-green-600 transition"
          >

            <div className="flex justify-between">

              <div>

                <h3 className="font-bold text-lg">

                  {job.title}

                </h3>

                <div className="flex gap-6 mt-4 text-gray-600">

                  <span className="flex gap-2">

                    <MapPin size={18}/>

                    {job.location}

                  </span>

                  <span className="flex gap-2">

                    <Wallet size={18}/>

                    {job.salary}

                  </span>

                  <span className="flex gap-2">

                    <Briefcase size={18}/>

                    {job.type}

                  </span>

                </div>

              </div>

              <button className="bg-green-700 text-white px-6 rounded-xl">

                Apply

              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
};

export default JobRecommendations;