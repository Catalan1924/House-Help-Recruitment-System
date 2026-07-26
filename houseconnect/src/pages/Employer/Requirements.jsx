import { useMemo } from "react";

const educationLevels = [
  "Primary",
  "Secondary",
  "Certificate",
  "Diploma",
  "Bachelor's Degree",
  "No Preference",
];

const genderOptions = [
  "No Preference",
  "Female",
  "Male",
];

const Requirements = ({
  jobData,
  updateJobField,
  updateArrayField,
  getArrayValue,
  nextStep,
  previousStep,
}) => {
  const isValid = useMemo(() => {
    if (jobData.experience_required === "") return false;

    const experience = Number(jobData.experience_required);

    if (Number.isNaN(experience) || experience < 0) {
      return false;
    }

    if (
      jobData.age_min !== "" &&
      jobData.age_max !== "" &&
      Number(jobData.age_min) > Number(jobData.age_max)
    ) {
      return false;
    }

    return true;
  }, [jobData]);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">

      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900">
          Candidate Requirements
        </h2>

        <p className="text-gray-500 mt-2">
          Describe the qualifications and preferences for the ideal candidate.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Minimum Experience (Years)
          </label>

          <input
            type="number"
            min="0"
            value={jobData.experience_required}
            onChange={(e) =>
              updateJobField(
                "experience_required",
                e.target.value
              )
            }
            className="w-full rounded-xl border border-gray-300 p-4 focus:outline-none focus:ring-2 focus:ring-green-600"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Education
          </label>

          <select
            value={jobData.education}
            onChange={(e) =>
              updateJobField("education", e.target.value)
            }
            className="w-full rounded-xl border border-gray-300 p-4 focus:outline-none focus:ring-2 focus:ring-green-600"
          >
            <option value="">
              Select Education
            </option>

            {educationLevels.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Skills
          </label>

          <input
            type="text"
            value={getArrayValue("skills")}
            onChange={(e) =>
              updateArrayField("skills", e.target.value)
            }
            placeholder="Cooking, Laundry, Cleaning"
            className="w-full rounded-xl border border-gray-300 p-4 focus:outline-none focus:ring-2 focus:ring-green-600"
          />

          <p className="text-xs text-gray-500 mt-2">
            Separate each skill with a comma.
          </p>
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Languages
          </label>

          <input
            type="text"
            value={getArrayValue("languages")}
            onChange={(e) =>
              updateArrayField(
                "languages",
                e.target.value
              )
            }
            placeholder="English, Swahili"
            className="w-full rounded-xl border border-gray-300 p-4 focus:outline-none focus:ring-2 focus:ring-green-600"
          />

          <p className="text-xs text-gray-500 mt-2">
            Separate each language with a comma.
          </p>
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Gender Preference
          </label>

          <select
            value={jobData.gender_preference}
            onChange={(e) =>
              updateJobField(
                "gender_preference",
                e.target.value
              )
            }
            className="w-full rounded-xl border border-gray-300 p-4 focus:outline-none focus:ring-2 focus:ring-green-600"
          >
            <option value="">
              Select Preference
            </option>

            {genderOptions.map((option) => (
              <option
                key={option}
                value={option}
              >
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Minimum Age
            </label>

            <input
              type="number"
              min="18"
              value={jobData.age_min}
              onChange={(e) =>
                updateJobField(
                  "age_min",
                  e.target.value
                )
              }
              className="w-full rounded-xl border border-gray-300 p-4 focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Maximum Age
            </label>

            <input
              type="number"
              min="18"
              value={jobData.age_max}
              onChange={(e) =>
                updateJobField(
                  "age_max",
                  e.target.value
                )
              }
              className="w-full rounded-xl border border-gray-300 p-4 focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>

        </div>

      </div>

      {!isValid && (
        <p className="mt-6 text-sm text-red-600">
          Please enter valid experience and ensure the age range is valid.
        </p>
      )}

      <div className="flex justify-between mt-10">

        <button
          type="button"
          onClick={previousStep}
          className="px-8 py-3 rounded-xl border border-gray-300 hover:bg-gray-50 transition"
        >
          Back
        </button>

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

export default Requirements;