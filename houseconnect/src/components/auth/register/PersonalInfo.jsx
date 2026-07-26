import { useState } from "react";
import AuthInput from "../AuthInput";
import AuthButton from "../AuthButton";
import PasswordInput from "../PasswordInput";
import { useRegistration } from "../../../context/RegistrationContext";

const PersonalInfo = ({ nextStep }) => {
  const { data, updateData } = useRegistration();
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!data.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!data.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
      newErrors.email = "Enter a valid email";
    if (!data.phone.trim()) newErrors.phone = "Phone number is required";
    if (!data.password) newErrors.password = "Password is required";
    else if (data.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = () => {
    if (validate()) nextStep();
  };

  return (
    <div>
      <h2 className="text-3xl font-bold">Create Account</h2>
      <p className="text-gray-500 mt-2">Let&apos;s get started.</p>

      <div className="space-y-5 mt-8">
        <AuthInput
          label="Full Name"
          type="text"
          name="fullName"
          placeholder="John Doe"
          value={data.fullName}
          onChange={(e) => updateData("fullName", e.target.value)}
          error={errors.fullName}
        />

        <AuthInput
          label="Email"
          type="email"
          name="email"
          placeholder="john@email.com"
          value={data.email}
          onChange={(e) => updateData("email", e.target.value)}
          error={errors.email}
        />

        <AuthInput
          label="Phone Number"
          type="tel"
          name="phone"
          placeholder="+254..."
          value={data.phone}
          onChange={(e) => updateData("phone", e.target.value)}
          error={errors.phone}
        />

        <PasswordInput
          label="Password"
          name="password"
          placeholder="Create a strong password"
          value={data.password}
          onChange={(e) => updateData("password", e.target.value)}
          error={errors.password}
        />
      </div>

      <div className="mt-8">
        <AuthButton type="button" onClick={handleContinue}>
          Continue
        </AuthButton>
      </div>
    </div>
  );
};

export default PersonalInfo;
