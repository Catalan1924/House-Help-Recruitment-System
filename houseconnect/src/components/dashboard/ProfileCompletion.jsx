import { CircleCheckBig } from "lucide-react";

const ProfileCompletion = () => {
  const progress = 75;

  return (
    <div className="bg-white rounded-2xl shadow p-6">

      <div className="flex justify-between items-center">

        <div>

          <h2 className="text-xl font-semibold">
            Profile Completion
          </h2>

          <p className="text-gray-500 mt-2">
            Complete your profile to increase your chances of getting hired.
          </p>

        </div>

        <div className="relative">

          <svg
            className="w-28 h-28 rotate-[-90deg]"
            viewBox="0 0 100 100"
          >

            <circle
              cx="50"
              cy="50"
              r="42"
              stroke="#E5E7EB"
              strokeWidth="8"
              fill="none"
            />

            <circle
              cx="50"
              cy="50"
              r="42"
              stroke="#15803D"
              strokeWidth="8"
              fill="none"
              strokeDasharray="264"
              strokeDashoffset={264 - (264 * progress) / 100}
              strokeLinecap="round"
            />

          </svg>

          <div className="absolute inset-0 flex items-center justify-center">

            <span className="text-2xl font-bold">
              {progress}%
            </span>

          </div>

        </div>

      </div>

      <div className="mt-8 space-y-4">

        <div className="flex justify-between">

          <div className="flex gap-3">

            <CircleCheckBig className="text-green-700"/>

            Personal Information

          </div>

          ✅

        </div>

        <div className="flex justify-between">

          <div className="flex gap-3">

            <CircleCheckBig className="text-green-700"/>

            Profile Picture

          </div>

          ✅

        </div>

        <div className="flex justify-between">

          Upload Good Conduct Certificate

          ❌

        </div>

        <div className="flex justify-between">

          Add Skills

          ❌

        </div>

      </div>

    </div>
  );
};

export default ProfileCompletion;