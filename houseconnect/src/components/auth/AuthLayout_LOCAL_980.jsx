import { Link } from "react-router-dom";

const AuthLayout = ({
  title,
  subtitle,
  children,
}) => {
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-xl border border-slate-200 p-8">

        <div className="mb-8 text-center">

          <h1 className="text-3xl font-bold text-slate-900">
            {title}
          </h1>

          {subtitle && (
            <p className="mt-2 text-slate-500">
              {subtitle}
            </p>
          )}

        </div>

        {children}

        <div className="mt-8 border-t pt-6 text-center text-sm text-slate-500">

          <Link
            to="/"
            className="font-medium text-slate-900 hover:underline"
          >
            ← Back to Home
          </Link>

        </div>

      </div>
    </div>
  );
};

export default AuthLayout;