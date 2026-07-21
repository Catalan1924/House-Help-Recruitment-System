import AuthButton from "../AuthButton";
import AuthInput from "../AuthInput";

const ProfileInfo = ({ nextStep, previousStep }) => {
  return (
    <div>

      <h2 className="text-3xl font-bold">
        Complete Your Profile
      </h2>

      <p className="text-gray-500 mt-2">
        Tell us more about yourself.
      </p>

      <div className="space-y-5 mt-8">

        <AuthInput
          label="County"
          type="text"
          placeholder="Nairobi"
        />

        <AuthInput
          label="Years of Experience"
          type="number"
          placeholder="5"
        />

        <AuthInput
          label="Expected Monthly Salary (KES)"
          type="number"
          placeholder="25000"
        />

      </div>

      <div className="flex gap-4 mt-8">

        <button
          onClick={previousStep}
          className="w-full border rounded-xl py-3"
        >
          Back
        </button>

        <AuthButton onClick={nextStep}>
          Continue
        </AuthButton>

      </div>

    </div>
  );
};

export default ProfileInfo;