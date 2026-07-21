import {
  Users,
  Briefcase,
  CheckCircle,
  Calendar,
} from "lucide-react";

import StatCard from "../../components/dashboard/StatCard";
import JobRecommendations from "../../components/dashboard/JobRecommendations";
import ApplicationProgress from "../../components/dashboard/ApplicationProgress";
import RecentActivity from "../../components/dashboard/RecentActivity";
import NotificationsWidget from "../../components/dashboard/NotificationsWidget";

const Dashboard = () => {
  return (
    <div className="space-y-8">

      <div>

        <h1 className="text-4xl font-bold">
          Employer Dashboard
        </h1>

        <p className="text-gray-500 mt-2">
          Manage jobs, applicants and interviews.
        </p>

      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

        <StatCard
          title="Active Jobs"
          value="8"
          icon={Briefcase}
        />

        <StatCard
          title="Applicants"
          value="43"
          icon={Users}
        />

        <StatCard
          title="Interviews"
          value="7"
          icon={Calendar}
        />

        <StatCard
          title="Successful Hires"
          value="12"
          icon={CheckCircle}
        />

      </div>

      <div className="grid xl:grid-cols-3 gap-6">

        <div className="xl:col-span-2">

          <JobRecommendations />

        </div>

        <ApplicationProgress />

      </div>

      <div className="grid xl:grid-cols-2 gap-6">

        <RecentActivity />

        <NotificationsWidget />

      </div>

    </div>
  );
};

export default Dashboard;