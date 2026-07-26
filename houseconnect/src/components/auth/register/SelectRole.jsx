import AuthButton from "../AuthButton";
import { useRegistration } from "../../../context/RegistrationContext";

const roles = [
  {
    key: "worker",
    emoji: "🏠",
    title: "House Help",
    description: "I want to find work as a domestic worker",
  },
  {
    key: "employer",
    emoji: "👨‍👩‍👧",
    title: "Employer",
    description: "I want to hire a domestic worker",
  },
];

const SelectRole = ({ nextStep, previousStep }) => {
  const { data, updateData } = useRegistration();

  return (
    <div>
      <h2 className="text-3xl font-bold">Choose Your Role</h2>
      <p className="text-gray-500 mt-2">
        Select the option that best describes you.
      </p>

      <div className="grid gap-5 mt-10">
        {roles.map((role) => (
          <button
            key={role.key}
            type="button"
            onClick={() => updateData("role", role.key)}
            className={`border rounded-2xl p-6 text-left transition ${
              data.role === role.key
                ? "border-green-700 bg-green-50 ring-2 ring-green-600"
                : "hover:border-green-700 hover:bg-green-50"
            }`}
          >
            <span className="text-2xl">{role.emoji}</span>
            <h3 className="font-semibold text-lg mt-2">{role.title}</h3>
            <p className="text-gray-500 text-sm mt-1">{role.description}</p>
          </button>
        ))}
      </div>

      <div className="flex gap-4 mt-10">
        <button
          type="button"
          onClick={previousStep}
          className="w-full border rounded-xl py-3 font-medium hover:bg-gray-50 transition"
        >
          Back
        </button>

        <AuthButton
          onClick={nextStep}
          disabled={!data.role}
        >
          Continue
        </AuthButton>
      </div>
    </div>
  );
};

export default SelectRole;
