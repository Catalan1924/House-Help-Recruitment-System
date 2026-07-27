import { Routes, Route } from "react-router-dom";

import Landing from "../src/pages/Landing";
import About from "../src/pages/About";
import Contact from "../src/pages/Contact";
import NotFound from "../src/pages/NotFound";
import Login from "../src/pages/auth/Login";
import Register from "../src/pages/auth/Register";
import ForgotPassword from "../src/pages/auth/ForgotPassword";
import AuthLayout from "../src/components/auth/AuthLayout";

import WorkerRoutes from "./WorkerRoutes";
import EmployerRoutes from "./EmployerRoutes";
import AdminRoutes from "./AdminRoutes";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<Landing />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Route>

      {WorkerRoutes()}
      {EmployerRoutes()}
      {AdminRoutes()}

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
