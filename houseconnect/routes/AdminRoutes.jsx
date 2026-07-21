import { Route } from "react-router-dom";

import AdminLayout from "../src/layouts/DashboardLayout";

import AuthGuard from "../src/components/AuthGuard";
import RoleGuard from "../src/components/RoleGuard";

import Dashboard from "../src/pages/Admin/Dashboard";

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