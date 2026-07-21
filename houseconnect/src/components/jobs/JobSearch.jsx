import { Search } from "lucide-react";

const JobSearch = () => {
  return (
    <div className="bg-white rounded-2xl shadow p-5">

      <div className="relative">

        <Search
          className="absolute left-4 top-4 text-gray-400"
        />

        <input
          type="text"
          placeholder="Search jobs, employers or locations..."
          className="w-full bg-gray-100 rounded-xl py-4 pl-12 pr-5 outline-none focus:ring-2 focus:ring-green-700"
        />

      </div>

    </div>
  );
};

export default JobSearch;