import { Route } from "react-router-dom";

import AdminLayout from "../src/layouts/DashboardLayout";

import AuthGuard from "../src/components/AuthGuard";
import RoleGuard from "../src/components/RoleGuard";

import Dashboard from "../src/pages/Admin/Dashboard";
import AdminUsers from "../src/pages/Admin/Users";
import Verification from "../src/pages/Admin/Verification";
import VerificationQueue from "../src/pages/Admin/VerificationQueue";
import Alerts from "../src/pages/Admin/Alerts";
import EmergencyAlerts from "../src/pages/Admin/EmergencyAlerts";
import Reports from "../src/pages/Admin/Reports";
import PlatformAnalytics from "../src/pages/Admin/PlatformAnalytics";
import Settings from "../src/pages/Admin/Settings";
import Feedback from "../src/pages/Admin/Feedback";
import RecentUsers from "../src/pages/Admin/RecentUsers";

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
