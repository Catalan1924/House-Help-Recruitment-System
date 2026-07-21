import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100">

      <div className="grid lg:grid-cols-2 min-h-screen">

        {/* Left Side */}

        <div className="hidden lg:flex bg-green-700 items-center justify-center p-12">

          <div className="text-white max-w-md">

            <h1 className="text-5xl font-bold leading-tight">
              Welcome to
              <br />
              HouseConnect
            </h1>

            <p className="mt-6 text-lg leading-8 text-green-100">
              Kenya's trusted platform connecting employers with verified
              domestic workers.
            </p>

          </div>

        </div>

        {/* Right Side */}

        <div className="flex items-center justify-center p-8 bg-white">

          <div className="w-full max-w-md">

            <Outlet />

          </div>

        </div>

      </div>

    </div>
  );
};

export default AuthLayout;