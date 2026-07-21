const WorkerFilters = () => {
  return (
    <div className="bg-white rounded-2xl shadow p-6 sticky top-24 space-y-6">

      <h2 className="text-2xl font-bold">
        Filters
      </h2>

      <select className="w-full border rounded-xl p-3">
        <option>County</option>
        <option>Nairobi</option>
        <option>Kiambu</option>
        <option>Kisumu</option>
        <option>Mombasa</option>
      </select>

      <select className="w-full border rounded-xl p-3">
        <option>Availability</option>
        <option>Available</option>
        <option>Busy</option>
      </select>

      <select className="w-full border rounded-xl p-3">
        <option>Experience</option>
        <option>1+ Years</option>
        <option>3+ Years</option>
        <option>5+ Years</option>
      </select>

      <input
        type="number"
        className="w-full border rounded-xl p-3"
        placeholder="Maximum Salary"
      />

      <button className="w-full bg-green-700 text-white py-3 rounded-xl hover:bg-green-800">
        Apply Filters
      </button>

    </div>
  );
};

export default WorkerFilters;