import { signUp } from "../../services/authService";

import {
  createProfile,
  createWorkerProfile,
  createEmployerProfile,
} from "../../services/profileService";

const Register = () => {
  const handleRegister = async () => {
    try {
      const auth = await signUp({
        email: "demo@example.com",
        password: "password123",
      });

      const user = auth.user;

      if (!user) {
        throw new Error("Registration failed");
      }

      await createProfile(user, {
        role: "worker",
        full_name: "Demo User",
      });

      await createWorkerProfile(user.id);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="mx-auto max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
      <h2 className="text-2xl font-semibold">Register</h2>
      <p className="mt-2 text-sm text-slate-500">Create your account.</p>
      <button
        onClick={handleRegister}
        className="mt-6 rounded-lg bg-slate-900 px-4 py-2 text-white"
      >
        Create account
      </button>
    </div>
  );
};

export default Register;