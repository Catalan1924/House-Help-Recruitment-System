import { useState } from "react";
import WorkerSearch from "./WorkerSearch";
import WorkerFilters from "./WorkerFilters";
import WorkerCard from "./WorkerCard";
import { useWorkers } from "../../hooks/useJobs";
import { Loader2 } from "lucide-react";

const FindWorkers = () => {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({});

  const queryFilters = { ...filters };
  if (search) queryFilters.search = search;

  const { data: workers, isLoading, isError } = useWorkers(queryFilters);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold">Find House Helps</h1>
        <p className="text-gray-500 mt-2">
          Discover verified domestic workers that match your requirements.
        </p>
      </div>

      <WorkerSearch value={search} onChange={setSearch} />

      <div className="grid lg:grid-cols-4 gap-8">
        <WorkerFilters filters={filters} onChange={setFilters} />

        <div className="lg:col-span-3 space-y-6">
          {isLoading && (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="animate-spin text-green-700" size={48} />
            </div>
          )}

          {isError && (
            <div className="text-center py-20">
              <p className="text-red-500">Failed to load workers. Please try again.</p>
            </div>
          )}

          {!isLoading && !isError && workers?.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">No workers found matching your criteria.</p>
            </div>
          )}

          {!isLoading && !isError && workers?.map((worker) => (
            <WorkerCard key={worker.id} worker={worker} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FindWorkers;
