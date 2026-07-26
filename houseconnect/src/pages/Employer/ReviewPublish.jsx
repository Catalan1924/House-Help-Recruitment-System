import { CheckCircle2, Loader2 } from "lucide-react";

const ReviewPublish = ({
  jobData,
  previousStep,
  publishJob,
  isPublishing,
  publishError,
}) => {
  const Detail = ({ label, value }) => (
    <div className="flex justify-between gap-6 py-3 border-b border-gray-100">
      <span className="font-medium text-gray-600">
        {label}
      </span>

      <span className="text-right text-gray-900">
        {value || "-"}
      </span>
    </div>
  );

  const BadgeList = ({ items }) => {
    if (!items.length) {
      return (
        <span className="text-gray-400">
          None specified
        </span>
      );
    }

    return (
      <div className="flex flex-wrap justify-end gap-2">
        {items.map((item) => (
          <span
            key={item}
            className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm"
          >
            {item}
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">

      <div className="text-center mb-10">

        <CheckCircle2
          size={64}
          className="mx-auto text-green-700"
        />

        <h2 className="text-3xl font-bold mt-5">
          Review Job
        </h2>

        <p className="text-gray-500 mt-3">
          Please review all information before
          publishing this vacancy.
        </p>

      </div>

      <div className="space-y-8">

        <section>

          <h3 className="text-lg font-semibold mb-4">
            Basic Information
          </h3>

          <Detail
            label="Job Title"
            value={jobData.title}
          />

          <Detail
            label="Employment Type"
            value={jobData.employment_type}
          />

          <Detail
            label="County"
            value={jobData.county}
          />

          <Detail
            label="Town"
            value={jobData.town}
          />

          <Detail
            label="Description"
            value={jobData.description}
          />

        </section>

        <section>

          <h3 className="text-lg font-semibold mb-4">
            Candidate Requirements
          </h3>

          <Detail
            label="Experience"
            value={`${jobData.experience_required} year(s)`}
          />

          <Detail
            label="Education"
            value={jobData.education}
          />

          <div className="flex justify-between gap-6 py-3 border-b border-gray-100">

            <span className="font-medium text-gray-600">
              Skills
            </span>

            <BadgeList
              items={jobData.skills}
            />

          </div>

          <div className="flex justify-between gap-6 py-3 border-b border-gray-100">

            <span className="font-medium text-gray-600">
              Languages
            </span>

            <BadgeList
              items={jobData.languages}
            />

          </div>

          <Detail
            label="Gender Preference"
            value={jobData.gender_preference}
          />

          <Detail
            label="Age Range"
            value={`${jobData.age_min || "-"} - ${
              jobData.age_max || "-"
            }`}
          />

        </section>

        <section>

          <h3 className="text-lg font-semibold mb-4">
            Salary & Benefits
          </h3>

          <Detail
            label="Monthly Salary"
            value={`KES ${Number(
              jobData.salary || 0
            ).toLocaleString()}`}
          />

          <Detail
            label="Accommodation"
            value={
              jobData.accommodation
                ? "Provided"
                : "Not Provided"
            }
          />

          <Detail
            label="Meals"
            value={
              jobData.meals
                ? "Provided"
                : "Not Provided"
            }
          />

          <Detail
            label="Transport"
            value={
              jobData.transport
                ? "Provided"
                : "Not Provided"
            }
          />

        </section>

      </div>

      {publishError && (
        <div className="mt-8 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
          {publishError}
        </div>
      )}

      <div className="flex justify-between mt-10">

        <button
          type="button"
          onClick={previousStep}
          disabled={isPublishing}
          className="px-8 py-3 rounded-xl border border-gray-300 hover:bg-gray-50 disabled:opacity-50"
        >
          Back
        </button>

        <button
          type="button"
          onClick={publishJob}
          disabled={isPublishing}
          className="flex items-center gap-2 px-8 py-3 rounded-xl bg-green-700 hover:bg-green-800 text-white disabled:opacity-60"
        >
          {isPublishing && (
            <Loader2
              size={18}
              className="animate-spin"
            />
          )}

          {isPublishing
            ? "Publishing..."
            : "Publish Job"}
        </button>

      </div>

    </div>
  );
};

export default ReviewPublish;