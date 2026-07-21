const steps = [
  "Personal",
  "Role",
  "Profile",
  "Documents",
  "Complete",
];

const ProgressBar = ({ currentStep }) => {
  return (
    <div className="mb-10">

      <div className="flex justify-between items-center">

        {steps.map((step, index) => {

          const stepNumber = index + 1;

          return (

            <div
              key={step}
              className="flex items-center flex-1"
            >

              <div className="flex flex-col items-center">

                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm
                  ${
                    currentStep >= stepNumber
                      ? "bg-green-700 text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {stepNumber}
                </div>

                <span className="text-xs mt-2">
                  {step}
                </span>

              </div>

              {stepNumber !== steps.length && (
                <div
                  className={`flex-1 h-1 mx-2 rounded-full
                  ${
                    currentStep > stepNumber
                      ? "bg-green-700"
                      : "bg-gray-200"
                  }`}
                />
              )}

            </div>

          );

        })}

      </div>

    </div>
  );
};

export default ProgressBar;