import { signIn } from "../../services/authService";

const Login = () => {
  const handleLogin = async () => {
    try {
      const session = await signIn({
        email: "demo@example.com",
        password: "password123",
      });

      console.log(session.user);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="mx-auto max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
      <h2 className="text-2xl font-semibold">Login</h2>
      <p className="mt-2 text-sm text-slate-500">Sign in to continue.</p>
      <button
        onClick={handleLogin}
        className="mt-6 rounded-lg bg-slate-900 px-4 py-2 text-white"
      >
        Sign in
      </button>
    </div>
  );
};

export default Login;