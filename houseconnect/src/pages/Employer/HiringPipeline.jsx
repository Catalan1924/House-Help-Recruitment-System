const stages = [
  {
    title: "Applications",
    value: 43,
    color: "bg-blue-500/80",
  },
  {
    title: "Shortlisted",
    value: 15,
    color: "bg-yellow-500/80",
  },
  {
    title: "Interview",
    value: 7,
    color: "bg-purple-500/80",
  },
  {
    title: "Hired",
    value: 4,
    color: "bg-green-600/80",
  },
];

const HiringPipeline = () => {
  return (
    <div className="bg-white/95 rounded-2xl shadow p-6">

      <h2 className="text-2xl font-bold">
        Hiring Pipeline
      </h2>

      <div className="grid md:grid-cols-4 gap-5 mt-8">

        {stages.map((stage) => (

          <div
            key={stage.title}
            className="rounded-xl bg-gray-50 p-6 text-center"
          >

            <div
              className={`w-14 h-14 rounded-full ${stage.color} mx-auto`}
            />

            <h3 className="mt-5 font-semibold">

              {stage.title}

            </h3>

            <p className="text-4xl font-bold mt-3">

              {stage.value}

            </p>

          </div>

        ))}

      </div>

    </div>
  );
};

export default HiringPipeline;