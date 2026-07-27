import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  updateProfile,
  createWorkerProfile,
  createEmployerProfile,
} from "../../services/profileService";

import { signUp } from "../../services/authService";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    county: "",
    town: "",
    role: "worker",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      // Create authentication account
      const auth = await signUp({
        email: form.email,
        password: form.password,
        fullName: form.fullName,
        role: form.role,
      });

      const user = auth.user;

      if (!user) {
        throw new Error("Registration failed.");
      }

      // Give the database trigger a moment to complete
      await new Promise((resolve) =>
        setTimeout(resolve, 500)
      );

      // Update remaining profile fields
      await updateProfile(user, {
        phone: form.phone,
        county: form.county,
        town: form.town,
      });

      // Create role profile
      if (form.role === "worker") {
        await createWorkerProfile(user.id);
      }

      if (form.role === "employer") {
        await createEmployerProfile(user.id);
      }

      alert(
        "Account created successfully! Please verify your email before logging in."
      );

      navigate("/login");
    } catch (err) {
      console.error("Registration Error:", err);
      setError(err.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto mt-10 max-w-lg rounded-xl bg-white p-8 shadow">

      <h1 className="mb-6 text-3xl font-bold">
        Create Account
      </h1>

      <form
        onSubmit={handleRegister}
        className="space-y-4"
      >

        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={form.fullName}
          onChange={handleChange}
          className="w-full rounded border p-3"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
          className="w-full rounded border p-3"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full rounded border p-3"
          required
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={form.confirmPassword}
          onChange={handleChange}
          className="w-full rounded border p-3"
          required
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
          className="w-full rounded border p-3"
        />

        <input
          type="text"
          name="county"
          placeholder="County"
          value={form.county}
          onChange={handleChange}
          className="w-full rounded border p-3"
        />

        <input
          type="text"
          name="town"
          placeholder="Town"
          value={form.town}
          onChange={handleChange}
          className="w-full rounded border p-3"
        />

        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          className="w-full rounded border p-3"
        >
          <option value="worker">
            House Help
          </option>

          <option value="employer">
            Employer
          </option>
        </select>

        {error && (
          <div className="rounded bg-red-100 p-3 text-red-700">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded bg-slate-900 p-3 text-white hover:bg-slate-800 disabled:opacity-50"
        >
          {loading
            ? "Creating Account..."
            : "Create Account"}
        </button>

      </form>

    </div>
  );
};

export default Register;
