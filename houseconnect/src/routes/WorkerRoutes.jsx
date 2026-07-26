import { Route } from "react-router-dom";

import WorkerLayout from "../layouts/DashboardLayout";

import AuthGuard from "../components/AuthGuard";
import RoleGuard from "../components/RoleGuard";

import Dashboard from "../pages/worker/Dashboard";
import Jobs from "../pages/worker/Jobs";
import JobDetails from "../pages/worker/JobDetails";
import Applications from "../pages/worker/Applications";
import Messages from "../pages/worker/Messages";
import Profile from "../pages/worker/Profile";

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