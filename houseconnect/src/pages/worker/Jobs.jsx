import JobSearch from "../../components/jobs/JobSearch";
import JobFilters from "../../components/jobs/JobFilters";
import JobCard from "../../components/jobs/JobCard";

const jobs = [
  {
    id: 1,
    title: "Live-in House Help",
    employer: "Mwangi Family",
    location: "Karen, Nairobi",
    salary: "KES 30,000",
    type: "Full Time",
    description:
      "Looking for a trustworthy house help to assist with cleaning, cooking, and childcare.",
  },
  {
    id: 2,
    title: "Nanny",
    employer: "Otieno Family",
    location: "Westlands",
    salary: "KES 25,000",
    type: "Live Out",
    description:
      "Seeking an experienced nanny to care for two children during weekdays.",
  },
];

const Jobs = () => {
  return (
    <div className="space-y-8">

      <div>

        <h1 className="text-4xl font-bold">
          Find Jobs
        </h1>

        <p className="text-gray-500 mt-2">
          Browse jobs that match your skills and experience.
        </p>

      </div>

      <JobSearch />

      <div className="grid lg:grid-cols-4 gap-8">

        <div>
          <JobFilters />
        </div>

        <div className="lg:col-span-3 space-y-6">

          {jobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
            />
          ))}

        </div>

      </div>

    </div>
  );
};

export default Jobs;