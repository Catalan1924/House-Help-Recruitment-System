import { Routes, Route } from "react-router-dom";

import Landing from "../pages/Landing";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ForgotPassword from "../pages/auth/ForgotPassword";

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

      {/* Dashboards */}

      {WorkerRoutes()}

      {EmployerRoutes()}

      {AdminRoutes()}

    </Routes>
  );
};

export default AppRoutes;