import { useState } from "react";
import { Link } from "react-router-dom";
import { RegistrationProvider } from "../../context/RegistrationContext";
import ProgressBar from "./register/ProgressBar";
import PersonalInfo from "./register/PersonalInfo";
import SelectRole from "./register/SelectRole";
import ProfileInfo from "./register/ProfileInfo";
import UploadDocuments from "./register/UploadDocuments";
import Success from "./register/Success";
import { UserPlus, Home } from "lucide-react";

const Register = () => {
  const [step, setStep] = useState(1);

  const nextStep = () => setStep((prev) => prev + 1);
  const previousStep = () => setStep((prev) => prev - 1);

  return (
    <RegistrationProvider>
      <div className="bg-white rounded-2xl shadow-xl shadow-green-900/5 border border-green-100/50 overflow-hidden w-full">
        {/* Card header */}
        <div className="bg-linear-to-r from-green-700 to-green-600 px-8 py-8 text-white text-center">
          <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur">
            <UserPlus size={28} />
          </div>
          <h1 className="text-2xl font-bold">Create your account</h1>
          <p className="mt-1 text-green-100 text-sm">Join HouseConnect Kenya in a few steps</p>
        </div>

        {/* Card body */}
        <div className="px-8 py-8">
          <ProgressBar currentStep={step} />

          {step === 1 && <PersonalInfo nextStep={nextStep} />}
          {step === 2 && (
            <SelectRole nextStep={nextStep} previousStep={previousStep} />
          )}
          {step === 3 && (
            <ProfileInfo nextStep={nextStep} previousStep={previousStep} />
          )}
          {step === 4 && (
            <UploadDocuments nextStep={nextStep} previousStep={previousStep} />
          )}
          {step === 5 && <Success />}
        </div>

        {/* Card footer */}
        <div className="bg-gray-50 px-8 py-3 text-center border-t border-gray-100">
          <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-green-700 transition-colors">
            <Home size={15} />
            Back to Home
          </Link>
        </div>
      </div>
    </RegistrationProvider>
  );
};

export default Register;
