import { Route } from "react-router-dom";

import WorkerLayout from "../src/layouts/DashboardLayout";

import AuthGuard from "../src/components/AuthGuard";
import RoleGuard from "../src/components/RoleGuard";

import Dashboard from "../src/pages/worker/Dashboard";
import Jobs from "../src/pages/worker/Jobs";
import JobDetails from "../src/pages/worker/JobDetails";
import Applications from "../src/pages/worker/Applications";
import Messages from "../src/pages/worker/Messages";
import Profile from "../src/pages/worker/Profile";

const WorkerRoutes = () => (
  <Route
    path="/worker"
    element={
      <AuthGuard>
        <RoleGuard role="worker">
          <WorkerLayout />
        </RoleGuard>
      </AuthGuard>
    }
  >
    <Route index element={<Dashboard />} />
    <Route path="dashboard" element={<Dashboard />} />
    <Route path="jobs" element={<Jobs />} />
    <Route path="jobs/:id" element={<JobDetails />} />
    <Route path="applications" element={<Applications />} />
    <Route path="messages" element={<Messages />} />
    <Route path="profile" element={<Profile />} />
  </Route>
);

export default WorkerRoutes;