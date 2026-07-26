import { useMemo } from "react";

const SalaryBenefits = ({
  jobData,
  updateJobField,
  nextStep,
  previousStep,
}) => {
  const isValid = useMemo(() => {
    if (jobData.salary === "") return false;

    const salary = Number(jobData.salary);

    return !Number.isNaN(salary) && salary >= 0;
  }, [jobData.salary]);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">

      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900">
          Salary & Benefits
        </h2>

        <p className="text-gray-500 mt-2">
          Specify the monthly salary and benefits offered for this position.
        </p>
      </div>

      <div className="space-y-8">

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Monthly Salary (KES)
          </label>

          <input
            type="number"
            min="0"
            step="1000"
            value={jobData.salary}
            onChange={(e) =>
              updateJobField("salary", e.target.value)
            }
            placeholder="e.g. 25000"
            className="w-full rounded-xl border border-gray-300 p-4 focus:outline-none focus:ring-2 focus:ring-green-600"
          />
        </div>

        <div>

          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Benefits
          </h3>

          <div className="space-y-4">

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={jobData.accommodation}
                onChange={(e) =>
                  updateJobField(
                    "accommodation",
                    e.target.checked
                  )
                }
                className="h-5 w-5 rounded border-gray-300 text-green-700 focus:ring-green-600"
              />

              <span className="text-gray-700">
                Accommodation Provided
              </span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={jobData.meals}
                onChange={(e) =>
                  updateJobField(
                    "meals",
                    e.target.checked
                  )
                }
                className="h-5 w-5 rounded border-gray-300 text-green-700 focus:ring-green-600"
              />

              <span className="text-gray-700">
                Meals Provided
              </span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={jobData.transport}
                onChange={(e) =>
                  updateJobField(
                    "transport",
                    e.target.checked
                  )
                }
                className="h-5 w-5 rounded border-gray-300 text-green-700 focus:ring-green-600"
              />

              <span className="text-gray-700">
                Transport Provided
              </span>
            </label>

          </div>

        </div>

      </div>

      {!isValid && (
        <p className="mt-6 text-sm text-red-600">
          Please enter a valid monthly salary.
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

export default SalaryBenefits;