import AuthButton from "../AuthButton";
import AuthInput from "../AuthInput";
import { useRegistration } from "../../../context/RegistrationContext";

const KENYAN_COUNTIES = [
  "Baringo", "Bomet", "Bungoma", "Busia", "Elgeyo Marakwet", "Embu",
  "Garissa", "Homa Bay", "Isiolo", "Kajiado", "Kakamega", "Kericho",
  "Kiambu", "Kilifi", "Kirinyaga", "Kisii", "Kisumu", "Kitui", "Kwale",
  "Laikipia", "Lamu", "Machakos", "Makueni", "Mandera", "Marsabit",
  "Meru", "Migori", "Mombasa", "Murang'a", "Nairobi", "Nakuru", "Nandi",
  "Narok", "Nyamira", "Nyandarua", "Nyeri", "Samburu", "Siaya",
  "Taita Taveta", "Tana River", "Tharaka Nithi", "Trans Nzoia", "Turkana",
  "Uasin Gishu", "Vihiga", "Wajir", "West Pokot",
];

const HOUSEHOLD_TYPES = [
  "Apartment / Flat",
  "House (Standalone)",
  "Townhouse / Maisonette",
  "Gated Estate",
  "Farm / Rural Homestead",
  "Other",
];

const PREFERRED_GENDERS = ["Any", "Female", "Male"];

const WorkerFields = ({ data, updateData }) => (
  <>
    <AuthInput
      label="Years of Experience"
      type="number"
      name="experience"
      placeholder="e.g. 5"
      value={data.experience}
      onChange={(e) => updateData("experience", e.target.value)}
    />

    <AuthInput
      label="Expected Monthly Salary (KES)"
      type="number"
      name="expectedSalary"
      placeholder="e.g. 25000"
      value={data.expectedSalary}
      onChange={(e) => updateData("expectedSalary", e.target.value)}
    />
  </>
);

const EmployerFields = ({ data, updateData }) => (
  <>
    <div className="space-y-2">
      <label className="font-medium" htmlFor="town">
        Town / Suburb
      </label>
      <input
        id="town"
        type="text"
        placeholder="e.g. Westlands, Kilimani"
        value={data.town}
        onChange={(e) => updateData("town", e.target.value)}
        className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-600 bg-white"
      />
    </div>

    <div className="space-y-2">
      <label className="font-medium" htmlFor="householdType">
        Household Type
      </label>
      <select
        id="householdType"
        value={data.householdType}
        onChange={(e) => updateData("householdType", e.target.value)}
        className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-600 bg-white"
      >
        <option value="">Select household type</option>
        {HOUSEHOLD_TYPES.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>
    </div>

    <div className="space-y-2">
      <label className="font-medium" htmlFor="preferredGender">
        Preferred Worker Gender
      </label>
      <select
        id="preferredGender"
        value={data.preferredGender}
        onChange={(e) => updateData("preferredGender", e.target.value)}
        className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-600 bg-white"
      >
        <option value="">Select preference</option>
        {PREFERRED_GENDERS.map((gender) => (
          <option key={gender} value={gender}>
            {gender}
          </option>
        ))}
      </select>
    </div>

    <AuthInput
      label="Company / Household Name (Optional)"
      type="text"
      name="companyName"
      placeholder="e.g. The Smith Family"
      value={data.companyName}
      onChange={(e) => updateData("companyName", e.target.value)}
    />
  </>
);

const ProfileInfo = ({ nextStep, previousStep }) => {
  const { data, updateData } = useRegistration();
  const isWorker = data.role === "worker";

  return (
    <div>
      <h2 className="text-3xl font-bold">
        {isWorker ? "Your Work Profile" : "Your Household"}
      </h2>
      <p className="text-gray-500 mt-2">
        {isWorker
          ? "Tell employers about your experience and expectations."
          : "Help workers find the right match for your household."}
      </p>

      <div className="space-y-5 mt-8">
        {/* County — common to both roles */}
        <div className="space-y-2">
          <label className="font-medium" htmlFor="county">
            County
          </label>
          <select
            id="county"
            value={data.county}
            onChange={(e) => updateData("county", e.target.value)}
            className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-600 bg-white"
          >
            <option value="">Select your county</option>
            {KENYAN_COUNTIES.map((county) => (
              <option key={county} value={county}>
                {county}
              </option>
            ))}
          </select>
        </div>

        {/* Role-specific fields */}
        {isWorker ? (
          <WorkerFields data={data} updateData={updateData} />
        ) : (
          <EmployerFields data={data} updateData={updateData} />
        )}
      </div>

      <div className="flex gap-4 mt-8">
        <button
          type="button"
          onClick={previousStep}
          className="w-full border rounded-xl py-3 font-medium hover:bg-gray-50 transition"
        >
          Back
        </button>

        <AuthButton onClick={nextStep}>Continue</AuthButton>
      </div>
    </div>
  );
};

export default ProfileInfo;
