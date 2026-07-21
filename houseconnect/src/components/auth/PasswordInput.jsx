import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

const PasswordInput = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="space-y-2">

      <label className="font-medium">
        Password
      </label>

      <div className="relative">

        <input
          type={showPassword ? "text" : "password"}
          placeholder="Enter your password"
          className="w-full border rounded-xl px-4 py-3 pr-12 outline-none focus:ring-2 focus:ring-green-600"
        />

        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-4 top-4"
        >
          {showPassword ? <EyeOff size={20}/> : <Eye size={20}/>}
        </button>

      </div>

    </div>
  );
};

export default PasswordInput;