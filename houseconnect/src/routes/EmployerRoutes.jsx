import { Route } from "react-router-dom";

import EmployerLayout from "../layouts/DashboardLayout";

import AuthGuard from "../components/AuthGuard";
import RoleGuard from "../components/RoleGuard";

import Dashboard from "../pages/employer/Dashboard";
import PostJob from "../pages/employer/PostJob";
import FindWorkers from "../pages/employer/FindWorkers";

const EmployerRoutes = () => (
  <Route
    path="/employer"
    element={
      <AuthGuard>
        <RoleGuard role="employer">
          <EmployerLayout />
        </RoleGuard>
      </AuthGuard>
    }
  >
    <Route index element={<Dashboard />} />
    <Route path="dashboard" element={<Dashboard />} />
    <Route path="post-job" element={<PostJob />} />
    <Route path="find-workers" element={<FindWorkers />} />
    <Route path="applicants" element={<Applicants />} />
    <Route path="messages" element={<Messages />} />
    <Route path="settings" element={<Settings />} />
    <Route path="payments" element={<Payments />} />
    <Route path="workers" element={<Workers />} />
  </Route>
);

export default EmployerRoutes;
