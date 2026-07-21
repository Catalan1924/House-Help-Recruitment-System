const stats = [
  {
    label: "Verified Workers",
    value: 832,
  },
  {
    label: "Employers",
    value: 413,
  },
  {
    label: "Jobs Posted",
    value: 326,
  },
  {
    label: "Successful Hires",
    value: 219,
  },
];

const PlatformAnalytics = () => {
  return (
    <div className="bg-white rounded-2xl shadow p-6">

      <h2 className="text-2xl font-bold mb-8">
        Platform Overview
      </h2>

      <div className="grid grid-cols-2 gap-6">

        {stats.map((stat) => (

          <div
            key={stat.label}
            className="bg-green-50 rounded-xl p-6 text-center"
          >

            <h3 className="text-4xl font-bold text-green-700">
              {stat.value}
            </h3>

            <p className="mt-3 text-gray-600">
              {stat.label}
            </p>

          </div>

        ))}

      </div>

    </div>
  );
};

export default PlatformAnalytics;