const Requirements = ({ nextStep, previousStep, data, updateData }) => {
  const handleChange = (e) => {
    updateData({ [e.target.name]: e.target.value });
  };

  const handleArrayChange = (field, value) => {
    updateData({ [field]: value.split(",").map((s) => s.trim()).filter(Boolean) });
  };

  return (
    <div className="bg-white rounded-2xl shadow p-8">
      <h2 className="text-3xl font-bold">Requirements</h2>

      <div className="grid md:grid-cols-2 gap-6 mt-8">
        <input
          name="experience_required"
          className="border rounded-xl p-4"
          placeholder="Minimum Experience (e.g. 2 years)"
          value={data.experience_required || ""}
          onChange={handleChange}
        />

        <input
          className="border rounded-xl p-4"
          placeholder="Languages (comma separated)"
          value={(data.languages || []).join(", ")}
          onChange={(e) => handleArrayChange("languages", e.target.value)}
        />

        <input
          className="border rounded-xl p-4"
          placeholder="Skills (comma separated)"
          value={(data.skills || []).join(", ")}
          onChange={(e) => handleArrayChange("skills", e.target.value)}
        />

        <select
          name="education"
          className="border rounded-xl p-4"
          value={data.education || ""}
          onChange={handleChange}
        >
          <option value="">Education</option>
          <option value="primary">Primary</option>
          <option value="secondary">Secondary</option>
          <option value="certificate">Certificate</option>
          <option value="diploma">Diploma</option>
          <option value="degree">Degree</option>
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

export default Requirements;