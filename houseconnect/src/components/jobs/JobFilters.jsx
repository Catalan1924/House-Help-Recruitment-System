const JobFilters = ({ filters = {}, onChange }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    const cleaned = value === "All" || value === "" ? undefined : value;
    onChange?.({ ...filters, [name]: cleaned });
  };

  const handleApply = () => {
    // Filters are already applied via onChange, this button acts as a visual trigger
  };

  return (
    <div className="bg-white rounded-2xl shadow p-6 sticky top-24">
      <h2 className="text-xl font-bold mb-6">Filters</h2>

      <div className="space-y-6">
        <div>
          <label className="font-semibold block mb-2">County</label>
          <select name="county" className="w-full border rounded-xl p-3" value={filters.county || "All"} onChange={handleChange}>
            <option value="All">All Counties</option>
            <option value="Nairobi">Nairobi</option>
            <option value="Kiambu">Kiambu</option>
            <option value="Nakuru">Nakuru</option>
            <option value="Kisumu">Kisumu</option>
            <option value="Mombasa">Mombasa</option>
          </select>
        </div>

        <div>
          <label className="font-semibold block mb-2">Employment Type</label>
          <select name="employment_type" className="w-full border rounded-xl p-3" value={filters.employment_type || "All"} onChange={handleChange}>
            <option value="All">All</option>
            <option value="live-in">Live-in</option>
            <option value="live-out">Live-out</option>
            <option value="part-time">Part-time</option>
            <option value="full-time">Full-time</option>
          </select>
        </div>

        <div>
          <label className="font-semibold block mb-2">Minimum Salary (KES)</label>
          <input
            type="number"
            name="min_salary"
            className="w-full border rounded-xl p-3"
            placeholder="e.g. 15000"
            value={filters.min_salary || ""}
            onChange={handleChange}
          />
        </div>

        <button onClick={handleApply} className="w-full bg-green-700 text-white rounded-xl py-3 hover:bg-green-800">
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default JobFilters;
