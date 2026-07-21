import { useState } from "react";

import JobProgress from "./JobProgress";
import BasicInfo from "./BasicInfo";
import Requirements from "./Requirements";
import SalaryBenefits from "./SalaryBenefits";
import ReviewPublish from "./ReviewPublish";

const PostJob = () => {

  const [step, setStep] = useState(1);

  const nextStep = () => setStep((prev) => prev + 1);

  const previousStep = () => setStep((prev) => prev - 1);

  return (

    <div className="max-w-5xl mx-auto">

      <JobProgress currentStep={step} />

      {step === 1 && (
        <BasicInfo nextStep={nextStep}/>
      )}

      {step === 2 && (
        <Requirements
          nextStep={nextStep}
          previousStep={previousStep}
        />
      )}

      {step === 3 && (
        <SalaryBenefits
          nextStep={nextStep}
          previousStep={previousStep}
        />
      )}

      {step === 4 && (
        <ReviewPublish
          previousStep={previousStep}
        />
      )}

    </div>

  );

};

export default PostJob;