import { useState } from "react";
import JobProgress from "./JobProgress";
import BasicInfo from "./BasicInfo";
import Requirements from "./Requirements";
import SalaryBenefits from "./SalaryBenefits";
import ReviewPublish from "./ReviewPublish";

const PostJob = () => {
  const [step, setStep] = useState(1);
  const [jobData, setJobData] = useState({
    title: "",
    employment_type: "Live-in",
    county: "",
    town: "",
    description: "",
    responsibilities: [],
    requirements: [],
    benefits: [],
    salary_min: "",
    salary_max: "",
    salary_currency: "KES",
  });

  const updateData = (newData) => {
    setJobData((prev) => ({ ...prev, ...newData }));
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const previousStep = () => setStep((prev) => prev - 1);

  return (
    <div className="max-w-5xl mx-auto">
      <JobProgress currentStep={step} />

      {step === 1 && (
        <BasicInfo nextStep={nextStep} data={jobData} updateData={updateData} />
      )}

      {step === 2 && (
        <Requirements nextStep={nextStep} previousStep={previousStep} data={jobData} updateData={updateData} />
      )}

      {step === 3 && (
        <SalaryBenefits nextStep={nextStep} previousStep={previousStep} data={jobData} updateData={updateData} />
      )}

      {step === 4 && (
        <ReviewPublish previousStep={previousStep} jobData={jobData} />
      )}
    </div>
  );
};

export default PostJob;
