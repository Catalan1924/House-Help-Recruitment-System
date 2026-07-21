import { Search } from "lucide-react";

const WorkerSearch = () => {
  return (
    <div className="bg-white rounded-2xl shadow p-5">

      <div className="relative">

        <Search className="absolute left-4 top-4 text-gray-400"/>

        <input
          className="w-full bg-gray-100 rounded-xl py-4 pl-12 pr-4 outline-none"
          placeholder="Search workers by name, skill or location..."
        />

      </div>

    </div>
  );
};

export default WorkerSearch;