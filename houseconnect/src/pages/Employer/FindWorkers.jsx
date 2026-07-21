import WorkerSearch from "./WorkerSearch";
import WorkerFilters from "./WorkerFilters";
import WorkerCard from "./WorkerCard";

const workers = [
  {
    id: 1,
    name: "Mary Wanjiku",
    county: "Nairobi",
    experience: "5 Years",
    salary: "KES 30,000",
    rating: 4.9,
    match: 97,
    verified: true,
    available: true,
    skills: ["Cleaning", "Cooking", "Child Care"],
  },
  {
    id: 2,
    name: "Faith Achieng",
    county: "Kiambu",
    experience: "3 Years",
    salary: "KES 24,000",
    rating: 4.8,
    match: 94,
    verified: true,
    available: false,
    skills: ["Laundry", "Cooking"],
  },
];

const FindWorkers = () => {
  return (
    <div className="space-y-8">

      <div>

        <h1 className="text-4xl font-bold">
          Find House Helps
        </h1>

        <p className="text-gray-500 mt-2">
          Discover verified domestic workers that match your requirements.
        </p>

      </div>

      <WorkerSearch />

      <div className="grid lg:grid-cols-4 gap-8">

        <WorkerFilters />

        <div className="lg:col-span-3 space-y-6">

          {workers.map(worker => (
            <WorkerCard
              key={worker.id}
              worker={worker}
            />
          ))}

        </div>

      </div>

    </div>
  );
};

export default FindWorkers;