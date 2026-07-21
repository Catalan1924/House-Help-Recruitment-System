const steps = ["Basic", "Requirements", "Salary", "Publish"];

const JobProgress = ({ currentStep }) => {
  return (
    <div className="mb-12">
      <div className="flex justify-between">
        {steps.map((step, index) => (
          <div key={step} className="flex-1 flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={`

w-12

h-12

rounded-full

flex

items-center

justify-center

font-bold

${currentStep >= index + 1 ? "bg-green-700 text-white" : "bg-gray-200"}

`}
              >
                {index + 1}
              </div>

              <p className="mt-2 text-sm">{step}</p>
            </div>

            {index !== steps.length - 1 && (
              <div
                className={`

flex-1

h-1

mx-2

${currentStep > index + 1 ? "bg-green-700" : "bg-gray-200"}

`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobProgress;
