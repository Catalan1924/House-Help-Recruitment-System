import {
  MapPin,
  Briefcase,
  Clock3,
  Wallet,
  ArrowRight,
} from "lucide-react";

const jobs = [
  {
    id: 1,
    title: "Live-in House Help",
    employer: "The Mwangi Family",
    location: "Karen, Nairobi",
    salary: "KES 28,000",
    type: "Full Time",
  },
  {
    id: 2,
    title: "Nanny",
    employer: "The Otieno Family",
    location: "Westlands",
    salary: "KES 24,000",
    type: "Full Time",
  },
  {
    id: 3,
    title: "Cleaner",
    employer: "ABC Apartments",
    location: "Kilimani",
    salary: "KES 18,000",
    type: "Part Time",
  },
];

const FeaturedJobs = () => {
  return (
    <section className="bg-gray-50 py-24">

      <div className="max-w-7xl mx-auto px-6">

        <div className="flex justify-between items-center mb-12">

          <div>
            <h2 className="text-4xl font-bold">
              Featured
              <span className="text-green-700"> Jobs</span>
            </h2>

            <p className="text-gray-600 mt-3">
              Browse the latest opportunities from verified employers.
            </p>
          </div>

          <button className="hidden md:block bg-green-700 text-white px-6 py-3 rounded-xl hover:bg-green-800">
            View All Jobs
          </button>

        </div>

        <div className="grid lg:grid-cols-3 gap-8">

          {jobs.map((job) => (

            <div
              key={job.id}
              className="bg-white rounded-2xl shadow hover:shadow-xl transition p-8"
            >

              <div className="flex justify-between items-center">

                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                  {job.type}
                </span>

                <Briefcase className="text-green-700" />

              </div>

              <h3 className="text-2xl font-bold mt-6">
                {job.title}
              </h3>

              <p className="text-gray-500 mt-2">
                {job.employer}
              </p>

              <div className="space-y-4 mt-8">

                <div className="flex items-center gap-3">
                  <MapPin size={18} />
                  {job.location}
                </div>

                <div className="flex items-center gap-3">
                  <Wallet size={18} />
                  {job.salary} / Month
                </div>

                <div className="flex items-center gap-3">
                  <Clock3 size={18} />
                  Posted 2 days ago
                </div>

              </div>

              <button className="mt-8 w-full bg-green-700 hover:bg-green-800 text-white rounded-xl py-3 flex justify-center items-center gap-2">

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