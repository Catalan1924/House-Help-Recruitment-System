const JobFilters = () => {
  return (
    <div className="bg-white rounded-2xl shadow p-6 sticky top-24">

      <h2 className="text-xl font-bold mb-6">
        Filters
      </h2>

      <div className="space-y-6">

        <div>

          <label className="font-semibold block mb-2">
            County
          </label>

          <select className="w-full border rounded-xl p-3">
            <option>All Counties</option>
            <option>Nairobi</option>
            <option>Kiambu</option>
            <option>Nakuru</option>
            <option>Kisumu</option>
            <option>Mombasa</option>
          </select>

        </div>

        <div>

          <label className="font-semibold block mb-2">
            Employment Type
          </label>

          <select className="w-full border rounded-xl p-3">
            <option>All</option>
            <option>Live-in</option>
            <option>Live-out</option>
            <option>Part-time</option>
            <option>Full-time</option>
          </select>

        </div>

        <div>

          <label className="font-semibold block mb-2">
            Minimum Salary
          </label>

          <input
            type="number"
            className="w-full border rounded-xl p-3"
            placeholder="KES"
          />

        </div>

        <button className="w-full bg-green-700 text-white rounded-xl py-3 hover:bg-green-800">
          Apply Filters
        </button>

      </div>

    </div>
  );
};

export default JobFilters;