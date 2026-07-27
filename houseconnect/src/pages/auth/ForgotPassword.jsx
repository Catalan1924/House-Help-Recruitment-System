import { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import AuthInput from "../../components/auth/AuthInput";
import AuthButton from "../../components/auth/AuthButton";
import { Mail, ArrowLeft, CheckCircle2, Home } from "lucide-react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const validate = () => {
    if (!email.trim()) {
      setError("Email is required");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Enter a valid email address");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setError("");

    try {
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(
        email,
        { redirectTo: `${window.location.origin}/login` }
      );

      if (resetError) throw resetError;

      setSent(true);
    } catch (err) {
      setError(err.message || "Failed to send reset email. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl shadow-green-900/5 border border-green-100/50 overflow-hidden">
      {/* Card header */}
      <div className="bg-linear-to-r from-green-700 to-green-600 px-8 py-8 text-white text-center">
        <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur">
          {sent ? <CheckCircle2 size={28} /> : <Mail size={28} />}
        </div>
        <h1 className="text-2xl font-bold">{sent ? "Check your email" : "Forgot password?"}</h1>
        <p className="mt-1 text-green-100 text-sm">
          {sent
            ? `We sent a reset link to ${email}`
            : "No worries, we'll send you reset instructions"}
        </p>
      </div>

      {/* Card body */}
      <div className="px-8 py-8">
        {sent ? (
          <div className="text-center space-y-4">
            <p className="text-sm text-gray-500">
              Didn&apos;t receive it? Check your spam folder or{" "}
              <button
                onClick={() => setSent(false)}
                className="text-green-700 hover:text-green-800 font-medium"
              >
                try again
              </button>
            </p>
            <Link
              to="/login"
              className="inline-flex items-center gap-2 text-sm font-medium text-green-700 hover:text-green-800"
            >
              <ArrowLeft size={16} />
              Back to Login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">
                {error}
              </div>
            )}

            <AuthInput
              label="Email address"
              type="email"
              name="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
              required
              error={error}
            />

            <AuthButton type="submit" loading={loading} disabled={loading}>
              Send reset link
            </AuthButton>

            <div className="text-center">
              <Link
                to="/login"
                className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-green-700 transition-colors"
              >
                <ArrowLeft size={15} />
                Back to Login
              </Link>
            </div>
          </form>
        )}
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

export default ForgotPassword;
