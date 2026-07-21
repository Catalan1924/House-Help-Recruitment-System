import AuthInput from "../AuthInput";
import AuthButton from "../AuthButton";

const PersonalInfo = ({ nextStep }) => {
  return (
    <div>

      <h2 className="text-3xl font-bold">
        Create Account
      </h2>

      <p className="text-gray-500 mt-2">
        Let's get started.
      </p>

      <div className="space-y-5 mt-8">

        <AuthInput
          label="Full Name"
          type="text"
          placeholder="John Doe"
        />

        <AuthInput
          label="Email"
          type="email"
          placeholder="john@email.com"
        />

        <AuthInput
          label="Phone Number"
          type="tel"
          placeholder="+254..."
        />

      </div>

      <div className="mt-8">

        <AuthButton
          type="button"
          onClick={nextStep}
        >
          Continue
        </AuthButton>

      </div>

    </div>
  );
};

export default PersonalInfo;