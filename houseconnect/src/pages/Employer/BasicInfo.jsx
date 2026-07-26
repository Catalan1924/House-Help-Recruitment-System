const BasicInfo = ({ nextStep, data, updateData }) => {
  const handleChange = (e) => {
    updateData({ [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-white rounded-2xl shadow p-8">
      <h2 className="text-3xl font-bold">Basic Information</h2>

      <div className="grid md:grid-cols-2 gap-6 mt-8">
        <input
          name="title"
          className="border rounded-xl p-4"
          placeholder="Job Title"
          value={data.title}
          onChange={handleChange}
        />

        <select
          name="employment_type"
          className="border rounded-xl p-4"
          value={data.employment_type}
          onChange={handleChange}
        >
          <option value="live-in">Live-in</option>
          <option value="live-out">Live-out</option>
          <option value="part-time">Part-time</option>
          <option value="full-time">Full-time</option>
        </select>

        <input
          name="county"
          className="border rounded-xl p-4"
          placeholder="County"
          value={data.county}
          onChange={handleChange}
        />

        <input
          name="town"
          className="border rounded-xl p-4"
          placeholder="Town"
          value={data.town}
          onChange={handleChange}
        />
      </div>

      <textarea
        name="description"
        rows={6}
        placeholder="Job Description"
        className="mt-6 w-full border rounded-xl p-5 resize-y"
        value={data.description}
        onChange={handleChange}
      />

      <button onClick={nextStep} className="mt-8 bg-green-700 text-white px-8 py-3 rounded-xl">
        Continue
      </button>
    </div>
  );
};

export default BasicInfo;
