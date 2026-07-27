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
    <Route path="users" element={<AdminUsers />} />
    <Route path="verification" element={<Verification />} />
    <Route path="verification-queue" element={<VerificationQueue />} />
    <Route path="alerts" element={<Alerts />} />
    <Route path="emergency-alerts" element={<EmergencyAlerts />} />
    <Route path="reports" element={<Reports />} />
    <Route path="analytics" element={<PlatformAnalytics />} />
    <Route path="settings" element={<Settings />} />
    <Route path="feedback" element={<Feedback />} />
    <Route path="recent-users" element={<RecentUsers />} />
  </Route>
);

export default AdminRoutes;
