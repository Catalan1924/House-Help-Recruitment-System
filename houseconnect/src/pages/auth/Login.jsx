import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signIn } from "../../services/authService";
import { getUserRole } from "../../services/userService";
import AuthInput from "../../components/auth/AuthInput";
import PasswordInput from "../../components/auth/PasswordInput";
import AuthButton from "../../components/auth/AuthButton";
import { Home, LogIn } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setGeneralError("");
  };

  const validate = () => {
    const newErrors = {};
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Enter a valid email address";
    }
    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setGeneralError("");

    try {
      const { user } = await signIn({
        email: form.email,
        password: form.password,
      });

      if (!user) throw new Error("Login failed — no user returned");

      const role = await getUserRole(user.id);
      navigate(`/${role}/dashboard`, { replace: true });
    } catch (err) {
      const message = err.message || "An unexpected error occurred";

      if (message.includes("Invalid login credentials") || message.includes("invalid")) {
        setGeneralError("Invalid email or password. Please try again.");
      } else if (message.includes("Email not confirmed")) {
        setGeneralError("Please confirm your email address before logging in.");
      } else {
        setGeneralError(message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl shadow-green-900/5 border border-green-100/50 overflow-hidden">
      {/* Card header with branding */}
      <div className="bg-gradient-to-r from-green-700 to-green-600 px-8 py-8 text-white text-center">
        <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur">
          <LogIn size={28} />
        </div>
        <h1 className="text-2xl font-bold">Welcome back</h1>
        <p className="mt-1 text-green-100 text-sm">Sign in to your HouseConnect account</p>
      </div>

      {/* Card body with form */}
      <div className="px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          {generalError && (
            <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">
              {generalError}
            </div>
          )}

          <AuthInput
            label="Email address"
            type="email"
            name="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={handleChange}
            required
            error={errors.email}
          />

          <PasswordInput
            label="Password"
            name="password"
            placeholder="Enter your password"
            value={form.password}
            onChange={handleChange}
            error={errors.password}
          />

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded border-gray-300 text-green-700 focus:ring-green-600"
              />
              <span className="text-sm text-gray-600">Remember me</span>
            </label>

            <Link
              to="/forgot-password"
              className="text-sm font-medium text-green-700 hover:text-green-800"
            >
              Forgot password?
            </Link>
          </div>

          <AuthButton type="submit" loading={loading} disabled={loading}>
            Sign in
          </AuthButton>
        </form>

        <div className="mt-6 pt-6 border-t border-gray-100 text-center text-sm text-gray-600">
          Don&apos;t have an account?{" "}
          <Link to="/register" className="font-semibold text-green-700 hover:text-green-800">
            Create one
          </Link>
        </div>
      </div>

      {/* Card footer */}
      <div className="bg-gray-50 px-8 py-3 text-center border-t border-gray-100">
        <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-green-700 transition-colors">
          <Home size={15} />
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default Login;
