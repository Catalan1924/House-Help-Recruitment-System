import {
  Briefcase,
  FileText,
  Bell,
  Star,
} from "lucide-react";

import StatCard from "../../components/dashboard/StatCard";
import JobRecommendations from "../../components/dashboard/JobRecommendations";
import ProfileCompletion from "../../components/dashboard/ProfileCompletion";
import ApplicationProgress from "../../components/dashboard/ApplicationProgress";
import RecentActivity from "../../components/dashboard/RecentActivity";
import NotificationsWidget from "../../components/dashboard/NotificationsWidget";
import EmergencyCard from "../../components/dashboard/EmergencyCard";

const Dashboard = () => {
  return (
    <div className="space-y-8">

      {/* Welcome Section */}
      <div>
        <h1 className="text-4xl font-bold text-gray-900">
          Welcome Back 👋
        </h1>

        <p className="text-gray-500 mt-2">
          Here's an overview of your account and latest activity.
        </p>
      </div>

      {/* Statistics */}
      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

        <StatCard
          title="Available Jobs"
          value="126"
          icon={Briefcase}
        />

        <StatCard
          title="Applications"
          value="8"
          icon={FileText}
        />

        <StatCard
          title="Notifications"
          value="5"
          icon={Bell}
        />

        <StatCard
          title="Rating"
          value="4.9"
          icon={Star}
        />

      </div>

      {/* Recommended Jobs & Profile */}
      <div className="grid xl:grid-cols-3 gap-6">

        <div className="xl:col-span-2">
          <JobRecommendations />
        </div>

        <ProfileCompletion />

      </div>

      {/* Progress & Activity */}
      <div className="grid xl:grid-cols-2 gap-6">

        <ApplicationProgress />

        <RecentActivity />

      </div>

      {/* Notifications & SOS */}
      <div className="grid xl:grid-cols-2 gap-6">

        <NotificationsWidget />

        <EmergencyCard />

      </div>

    </div>
  );
};

export default Dashboard;