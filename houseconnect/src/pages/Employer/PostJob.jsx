import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import { createJob } from "../../services/jobService";
import { getEmployerByProfileId } from "../../services/profileService";

import JobProgress from "./JobProgress";
import BasicInfo from "./BasicInfo";
import Requirements from "./Requirements";
import SalaryBenefits from "./SalaryBenefits";
import ReviewPublish from "./ReviewPublish";

const initialJobData = {
  title: "",
  description: "",
  county: "",
  town: "",
  employment_type: "",

  experience_required: "",
  education: "",

  skills: [],
  languages: [],

  gender_preference: "",

  age_min: "",
  age_max: "",

  salary: "",

  accommodation: false,
  meals: false,
  transport: false,
};

const PostJob = () => {
  const navigate = useNavigate();

  const { user } = useAuth();

  const [step, setStep] = useState(1);

  const [jobData, setJobData] = useState(initialJobData);

  const [isPublishing, setIsPublishing] = useState(false);

  const [publishError, setPublishError] = useState("");

  const nextStep = () =>
    setStep((prev) => Math.min(prev + 1, 4));

  const previousStep = () =>
    setStep((prev) => Math.max(prev - 1, 1));

  const updateJobField = (field, value) => {
    setJobData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const updateArrayField = (field, value) => {
    const items = value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

    setJobData((prev) => ({
      ...prev,
      [field]: items,
    }));
  };

  const getArrayValue = (field) => {
    return Array.isArray(jobData[field])
      ? jobData[field].join(", ")
      : "";
  };

const publishJob = async () => {
  setPublishError("");

  if (!user) {
    setPublishError("You must be logged in.");
    return;
  }

  try {
    setIsPublishing(true);

    const employer = await getEmployerByProfileId(user.id);

    await createJob(employer.id, jobData);

    navigate("/employer/dashboard");
  } catch (error) {
    setPublishError(
      error.message || "Failed to publish job."
    );
  } finally {
    setIsPublishing(false);
  }
};

  return (
    <div className="max-w-5xl mx-auto">
      <JobProgress currentStep={step} />

      {step === 1 && (
        <BasicInfo
          jobData={jobData}
          updateJobField={updateJobField}
          nextStep={nextStep}
        />
      )}

      {step === 2 && (
        <Requirements
          jobData={jobData}
          updateJobField={updateJobField}
          updateArrayField={updateArrayField}
          getArrayValue={getArrayValue}
          nextStep={nextStep}
          previousStep={previousStep}
        />
      )}

      {step === 3 && (
        <SalaryBenefits
          jobData={jobData}
          updateJobField={updateJobField}
          nextStep={nextStep}
          previousStep={previousStep}
        />
      )}

      {step === 4 && (
        <ReviewPublish
          jobData={jobData}
          previousStep={previousStep}
          publishJob={publishJob}
          isPublishing={isPublishing}
          publishError={publishError}
        />
      )}
    </div>
  );
};

export default PostJob;