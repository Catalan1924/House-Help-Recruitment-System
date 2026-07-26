import { useMemo } from "react";

const counties = [
  "Baringo",
  "Bomet",
  "Bungoma",
  "Busia",
  "Elgeyo Marakwet",
  "Embu",
  "Garissa",
  "Homa Bay",
  "Isiolo",
  "Kajiado",
  "Kakamega",
  "Kericho",
  "Kiambu",
  "Kilifi",
  "Kirinyaga",
  "Kisii",
  "Kisumu",
  "Kitui",
  "Kwale",
  "Laikipia",
  "Lamu",
  "Machakos",
  "Makueni",
  "Mandera",
  "Marsabit",
  "Meru",
  "Migori",
  "Mombasa",
  "Murang'a",
  "Nairobi",
  "Nakuru",
  "Nandi",
  "Narok",
  "Nyamira",
  "Nyandarua",
  "Nyeri",
  "Samburu",
  "Siaya",
  "Taita Taveta",
  "Tana River",
  "Tharaka Nithi",
  "Trans Nzoia",
  "Turkana",
  "Uasin Gishu",
  "Vihiga",
  "Wajir",
  "West Pokot",
];

const employmentTypes = [
  "Live-in",
  "Live-out",
  "Part-time",
];

const BasicInfo = ({
  jobData,
  updateJobField,
  nextStep,
}) => {
  const isValid = useMemo(() => {
    return (
      jobData.title.trim() !== "" &&
      jobData.description.trim() !== "" &&
      jobData.employment_type !== ""
    );
  }, [jobData]);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">

      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900">
          Basic Information
        </h2>

        <p className="text-gray-500 mt-2">
          Tell workers about the position you are hiring for.
        </p>
      </div>

      <div className="space-y-6">

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Job Title
          </label>

          <input
            type="text"
            value={jobData.title}
            onChange={(e) =>
              updateJobField("title", e.target.value)
            }
            placeholder="e.g. Live-in House Helper"
            className="w-full rounded-xl border border-gray-300 p-4 focus:outline-none focus:ring-2 focus:ring-green-600"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Job Description
          </label>

          <textarea
            rows={6}
            value={jobData.description}
            onChange={(e) =>
              updateJobField(
                "description",
                e.target.value
              )
            }
            placeholder="Describe duties, schedule, expectations and responsibilities."
            className="w-full rounded-xl border border-gray-300 p-4 resize-none focus:outline-none focus:ring-2 focus:ring-green-600"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6">

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Employment Type
            </label>

            <select
              value={jobData.employment_type}
              onChange={(e) =>
                updateJobField(
                  "employment_type",
                  e.target.value
                )
              }
              className="w-full rounded-xl border border-gray-300 p-4 focus:outline-none focus:ring-2 focus:ring-green-600"
            >
              <option value="">
                Select employment type
              </option>

              {employmentTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              County
            </label>

            <select
              value={jobData.county}
              onChange={(e) =>
                updateJobField("county", e.target.value)
              }
              className="w-full rounded-xl border border-gray-300 p-4 focus:outline-none focus:ring-2 focus:ring-green-600"
            >
              <option value="">
                Select County
              </option>

              {counties.map((county) => (
                <option key={county} value={county}>
                  {county}
                </option>
              ))}
            </select>
          </div>

        </div>

        <div>

          <label className="block mb-2 text-sm font-medium text-gray-700">
            Town
          </label>

          <input
            type="text"
            value={jobData.town}
            onChange={(e) =>
              updateJobField("town", e.target.value)
            }
            placeholder="e.g. Westlands"
            className="w-full rounded-xl border border-gray-300 p-4 focus:outline-none focus:ring-2 focus:ring-green-600"
          />

        </div>

      </div>

      <div className="flex justify-end mt-10">

        <button
          type="button"
          onClick={nextStep}
          disabled={!isValid}
          className={`px-8 py-3 rounded-xl font-medium transition ${
            isValid
              ? "bg-green-700 hover:bg-green-800 text-white"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          Continue
        </button>

      </div>

    </div>
  );
};

export default BasicInfo;