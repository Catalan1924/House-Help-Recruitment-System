import { Routes, Route } from "react-router-dom";

import Landing from "../src/pages/Landing";
import Login from "../src/pages/auth/Login";
import Register from "../src/pages/auth/Register";
import ForgotPassword from "../src/pages/auth/ForgotPassword";

import WorkerRoutes from "./WorkerRoutes";
import EmployerRoutes from "./EmployerRoutes";
import AdminRoutes from "./AdminRoutes";

const AppRoutes = () => {
  return (
    <Routes>

      {/* Public */}

      <Route path="/" element={<Landing />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route
        path="/forgot-password"
        element={<ForgotPassword />}
      />


      {WorkerRoutes()}

      {EmployerRoutes()}

      {AdminRoutes()}

    </Routes>
  );
};

export default AppRoutes;