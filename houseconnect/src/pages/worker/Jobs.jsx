import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import JobSearch from "../../components/jobs/JobSearch";
import JobFilters from "../../components/jobs/JobFilters";
import JobCard from "../../components/jobs/JobCard";
import { useJobs } from "../../hooks/useJobs";
import { Loader2 } from "lucide-react";

const Jobs = () => {
  const [searchParams] = useSearchParams();
  const initialSearch = searchParams.get("search") || "";
  const [search, setSearch] = useState(initialSearch);
  const [filters, setFilters] = useState({});

  const queryFilters = { ...filters };
  if (search) queryFilters.search = search;

  const { data: jobs, isLoading, isError } = useJobs(queryFilters);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold">Find Jobs</h1>
        <p className="text-gray-500 mt-2">Browse jobs that match your skills and experience.</p>
      </div>

      <JobSearch value={search} onChange={setSearch} />

      <div className="grid lg:grid-cols-4 gap-8">
        <div>
          <JobFilters filters={filters} onChange={setFilters} />
        </div>

        <div className="lg:col-span-3 space-y-6">
          {isLoading && (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="animate-spin text-green-700" size={48} />
            </div>
          )}

          {isError && (
            <div className="text-center py-20">
              <p className="text-red-500">Failed to load jobs. Please try again.</p>
            </div>
          )}

          {!isLoading && !isError && jobs?.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">No jobs found matching your criteria.</p>
            </div>
          )}

          {!isLoading && !isError && jobs?.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
