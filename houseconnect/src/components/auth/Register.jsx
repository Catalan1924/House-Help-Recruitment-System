import { useState } from "react";

import ProgressBar from "../../components/auth/register/ProgressBar";

import PersonalInfo from "../../components/auth/register/PersonalInfo";
import SelectRole from "../../components/auth/register/SelectRole";
import ProfileInfo from "../../components/auth/register/ProfileInfo";
import UploadDocuments from "../../components/auth/register/UploadDocuments";
import Success from "../../components/auth/register/Success";

const Register = () => {

  const [step, setStep] = useState(1);

  const nextStep = () => setStep((prev) => prev + 1);

  const previousStep = () => setStep((prev) => prev - 1);

  return (

    <div>

      <ProgressBar currentStep={step} />

      {step === 1 && (
        <PersonalInfo nextStep={nextStep} />
      )}

      {step === 2 && (
        <SelectRole
          nextStep={nextStep}
          previousStep={previousStep}
        />
      )}

      {step === 3 && (
        <ProfileInfo
          nextStep={nextStep}
          previousStep={previousStep}
        />
      )}

      {step === 4 && (
        <UploadDocuments
          nextStep={nextStep}
          previousStep={previousStep}
        />
      )}

      {step === 5 && <Success />}

    </div>

  );
};

export default Register;