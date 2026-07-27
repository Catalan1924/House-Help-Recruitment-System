import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { signIn } from "../../services/authService";
import { supabase } from "../../lib/supabase";

const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");

    try {
      setLoading(true);

      const auth = await signIn({
        email: form.email,
        password: form.password,
      });

      if (!user) throw new Error("Login failed — no user returned");

      const user = auth.user;

      if (!user) {
        throw new Error("Login failed.");
      }

      // Get user's role
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      if (profileError) throw profileError;

      switch (profile.role) {
        case "worker":
          navigate("/worker/dashboard");
          break;

        case "employer":
          navigate("/employer/dashboard");
          break;

        case "admin":
          navigate("/admin/dashboard");
          break;

        default:
          navigate("/");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto mt-10 max-w-md rounded-xl bg-white p-8 shadow">

      <h1 className="mb-6 text-3xl font-bold">
        Welcome Back
      </h1>

      <form
        onSubmit={handleLogin}
        className="space-y-4"
      >

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

        {error && (
          <p className="text-red-600">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded bg-slate-900 p-3 text-white"
        >
          {loading ? "Signing In..." : "Sign In"}
        </button>

      </form>
    </div>
  );
};

export default Login;
