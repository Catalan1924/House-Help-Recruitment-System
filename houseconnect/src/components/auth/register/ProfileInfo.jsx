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

const ProfileInfo = ({ nextStep, previousStep }) => {
  const { data, updateData } = useRegistration();

  return (
    <div>
      <h2 className="text-3xl font-bold">Complete Your Profile</h2>
      <p className="text-gray-500 mt-2">Tell us more about yourself.</p>

      <div className="space-y-5 mt-8">
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
