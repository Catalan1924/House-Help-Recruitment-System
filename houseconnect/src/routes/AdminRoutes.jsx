import { Route } from "react-router-dom";

import AdminLayout from "../layouts/DashboardLayout";

import AuthGuard from "../components/AuthGuard";
import RoleGuard from "../components/RoleGuard";

import Dashboard from "../pages/admin/Dashboard";

const AdminRoutes = () => (
  <Route
    path="/admin"
    element={
      <AuthGuard>
        <RoleGuard role="admin">
          <AdminLayout />
        </RoleGuard>
      </AuthGuard>
    }
  >
    <Route index element={<Dashboard />} />
    <Route path="dashboard" element={<Dashboard />} />
  </Route>
);

export default AdminRoutes;