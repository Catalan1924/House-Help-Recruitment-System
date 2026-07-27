import { Link } from "react-router-dom";

const AuthLayout = ({
  title,
  subtitle,
  children,
}) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-green-100 px-4 py-12">
      {/* subtle decorative circles */}
      <div className="fixed top-0 right-0 w-96 h-96 bg-green-200/30 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-96 h-96 bg-green-300/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full" style={{ maxWidth: '420px' }}>
        <Outlet />
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
