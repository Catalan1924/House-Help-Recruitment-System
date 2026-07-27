import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

const PasswordInput = ({
  label = "Password",
  value,
  onChange,
  name = "password",
  placeholder = "Enter your password",
  error,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="space-y-2">
      <label className="font-medium" htmlFor={name}>
        {label}
      </label>

      <div className="relative">
        <input
          id={name}
          name={name}
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full border rounded-xl px-4 py-3 pr-12 outline-none focus:ring-2 focus:ring-green-600 ${
            error ? "border-red-500 focus:ring-red-500" : ""
          }`}
        />

        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
          tabIndex={-1}
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default PasswordInput;
