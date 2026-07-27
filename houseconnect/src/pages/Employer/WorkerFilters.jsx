const WorkerFilters = ({ filters = {}, onChange }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    const cleaned = value === "" ? undefined : value;
    onChange?.({ ...filters, [name]: cleaned });
  };

  const handleApply = () => {};

  return (
    <div className="bg-white rounded-2xl shadow p-6 sticky top-24 space-y-6">
      <h2 className="text-2xl font-bold">Filters</h2>

      <select name="county" className="w-full border rounded-xl p-3" value={filters.county || ""} onChange={handleChange}>
        <option value="">County</option>
        <option value="Nairobi">Nairobi</option>
        <option value="Kiambu">Kiambu</option>
        <option value="Kisumu">Kisumu</option>
        <option value="Mombasa">Mombasa</option>
      </select>

      <select name="availability" className="w-full border rounded-xl p-3" value={filters.availability || ""} onChange={handleChange}>
        <option value="">Availability</option>
        <option value="available">Available</option>
        <option value="busy">Busy</option>
      </select>

      <select name="experience_min" className="w-full border rounded-xl p-3" value={filters.experience_min || ""} onChange={handleChange}>
        <option value="">Experience</option>
        <option value="1">1+ Years</option>
        <option value="3">3+ Years</option>
        <option value="5">5+ Years</option>
      </select>

      <input
        type="number"
        name="expected_salary_max"
        className="w-full border rounded-xl p-3"
        placeholder="Maximum Salary (KES)"
        value={filters.expected_salary_max || ""}
        onChange={handleChange}
      />

      <button onClick={handleApply} className="w-full bg-green-700 text-white py-3 rounded-xl hover:bg-green-800">
        Apply Filters
      </button>
    </div>
  );
};

export default WorkerFilters;
