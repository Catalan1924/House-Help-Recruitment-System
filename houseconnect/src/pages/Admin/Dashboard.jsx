import {
  Users,
  Briefcase,
  ShieldCheck,
  TriangleAlert,
} from "lucide-react";

import StatCard from "../../components/dashboard/StatCard";
import RecentActivity from "../../components/dashboard/RecentActivity";
import NotificationsWidget from "../../components/dashboard/NotificationsWidget";
import EmergencyCard from "../../components/dashboard/EmergencyCard";
import ProfileCompletion from "../../components/dashboard/ProfileCompletion";

const Dashboard = () => {
  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-4xl font-bold">
          Administrator Dashboard
        </h1>

        <p className="text-gray-500 mt-2">
          Monitor and manage the HouseConnect platform.
        </p>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

        <StatCard
          title="Total Users"
          value="1,245"
          icon={Users}
        />

        <StatCard
          title="Active Jobs"
          value="326"
          icon={Briefcase}
        />

        <StatCard
          title="Pending Verifications"
          value="42"
          icon={ShieldCheck}
        />

        <StatCard
          title="Emergency Alerts"
          value="3"
          icon={TriangleAlert}
        />

      </div>

      <div className="grid xl:grid-cols-3 gap-6">

        <div className="xl:col-span-2">

          <RecentActivity />

        </div>

        <NotificationsWidget />

      </div>

      <div className="grid xl:grid-cols-2 gap-6">

        <ProfileCompletion />

        <EmergencyCard />

      </div>

    </div>
  );
};

export default Dashboard;