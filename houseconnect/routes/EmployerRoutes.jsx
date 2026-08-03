import { Route } from "react-router-dom";

import EmployerLayout from "../src/layouts/DashboardLayout";

import AuthGuard from "../src/components/AuthGuard";
import RoleGuard from "../src/components/RoleGuard";

import Dashboard from "../src/pages/Employer/Dashboard";
import PostJob from "../src/pages/Employer/PostJob";
import FindWorkers from "../src/pages/Employer/FindWorkers";
import Applicants from "../src/pages/Employer/Applicants";
import Messages from "../src/pages/Employer/Messages";
import Settings from "../src/pages/Employer/Settings";
import Payments from "../src/pages/Employer/Payments";
import Workers from "../src/pages/Employer/Workers";
import JobDetail from "../src/pages/Employer/JobDetail";

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
    <Route path="jobs/:id" element={<JobDetail />} />
  </Route>
);

export default EmployerRoutes;
