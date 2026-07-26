import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-green-100 px-4 py-12">
      {/* subtle decorative circles */}
      <div className="fixed top-0 right-0 w-96 h-96 bg-green-200/30 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-96 h-96 bg-green-300/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full" style={{ maxWidth: '420px' }}>
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
