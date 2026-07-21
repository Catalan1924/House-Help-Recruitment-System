import AuthButton from "../AuthButton";

const SelectRole = ({
  nextStep,
  previousStep,
}) => {
  return (

    <div>

      <h2 className="text-3xl font-bold">

        Choose Your Role

      </h2>

      <div className="grid gap-5 mt-10">

        <button className="border rounded-2xl p-6 hover:border-green-700 hover:bg-green-50 transition">

          🏠 House Help

        </button>

        <button className="border rounded-2xl p-6 hover:border-green-700 hover:bg-green-50 transition">

          👨‍👩‍👧 Employer

        </button>

      </div>

      <div className="flex gap-4 mt-10">

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

export default SelectRole;