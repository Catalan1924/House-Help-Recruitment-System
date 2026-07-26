const SalaryBenefits = ({ nextStep, previousStep, data, updateData }) => {
  const handleChange = (e) => {
    updateData({ [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-white rounded-2xl shadow p-8">
      <h2 className="text-3xl font-bold">Salary & Benefits</h2>

      <div className="grid md:grid-cols-2 gap-6 mt-8">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Minimum Salary (KES)</label>
          <input
            name="salary_min"
            type="number"
            placeholder="e.g. 15000"
            className="border rounded-xl p-4 w-full"
            value={data.salary_min}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Maximum Salary (KES)</label>
          <input
            name="salary_max"
            type="number"
            placeholder="e.g. 30000"
            className="border rounded-xl p-4 w-full"
            value={data.salary_max}
            onChange={handleChange}
          />
        </div>

        <select
          name="accommodation"
          className="border rounded-xl p-4"
          value={data.accommodation || ""}
          onChange={handleChange}
        >
          <option value="">Accommodation</option>
          <option value="provided">Provided</option>
          <option value="not-provided">Not Provided</option>
        </select>

        <select
          name="meals"
          className="border rounded-xl p-4"
          value={data.meals || ""}
          onChange={handleChange}
        >
          <option value="">Meals</option>
          <option value="included">Included</option>
          <option value="not-included">Not Included</option>
        </select>

        <select
          name="transport"
          className="border rounded-xl p-4"
          value={data.transport || ""}
          onChange={handleChange}
        >
          <option value="">Transport</option>
          <option value="included">Included</option>
          <option value="not-included">Not Included</option>
        </select>
      </div>

      <div className="flex justify-between mt-10">
        <button onClick={previousStep} className="border px-8 py-3 rounded-xl">
          Back
        </button>
        <button onClick={nextStep} className="bg-green-700 text-white px-8 py-3 rounded-xl">
          Continue
        </button>
      </div>
    </div>
  );
};

export default SalaryBenefits;
