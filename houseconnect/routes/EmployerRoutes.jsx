import { Route } from "react-router-dom";

import EmployerLayout from "../src/layouts/DashboardLayout";

import AuthGuard from "../src/components/AuthGuard";
import RoleGuard from "../src/components/RoleGuard";

import Dashboard from "../src/pages/Employer/Dashboard";
import PostJob from "../src/pages/Employer/PostJob";
import FindWorkers from "../src/pages/Employer/FindWorkers";

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
  </Route>
);

export default EmployerRoutes;