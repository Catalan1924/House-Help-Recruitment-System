const applications = [
  {
    job: "House Help",
    status: "Applied",
  },
  {
    job: "Cleaner",
    status: "Interview",
  },
  {
    job: "Nanny",
    status: "Hired",
  },
];

const colors = {
  Applied: "bg-yellow-100 text-yellow-700",
  Interview: "bg-blue-100 text-blue-700",
  Hired: "bg-green-100 text-green-700",
};

const ApplicationProgress = () => {
  return (

    <div className="bg-white rounded-2xl shadow p-6">

      <h2 className="text-2xl font-bold">

        Application Progress

      </h2>

      <div className="space-y-5 mt-8">

        {applications.map((app) => (

          <div
            key={app.job}
            className="flex justify-between items-center border-b pb-4"
          >

            <span className="font-medium">

              {app.job}

            </span>

            <span
              className={`px-4 py-2 rounded-full text-sm ${colors[app.status]}`}
            >
              {app.status}
            </span>

          </div>

        ))}

      </div>

    </div>

  );
};

export default ApplicationProgress;