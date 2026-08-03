import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import {
  Users,
  Briefcase,
  ShieldCheck,
  TriangleAlert,
  AlertCircle,
} from "lucide-react";

import { getAdminStats } from "../../api/dashboard";
import StatCard from "../../components/dashboard/StatCard";
import RecentActivity from "../../components/dashboard/RecentActivity";
import NotificationsWidget from "../../components/dashboard/NotificationsWidget";
import EmergencyCard from "../../components/dashboard/EmergencyCard";
import ProfileCompletion from "../../components/dashboard/ProfileCompletion";
import { DashboardSkeleton } from "../../components/LoadingSkeleton";

const Dashboard = () => {
  const { data: stats, isLoading, isError, error } = useQuery({
    queryKey: ["adminStats"],
    queryFn: getAdminStats,
  });

  if (isLoading) return <DashboardSkeleton />;

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <AlertCircle size={48} className="mx-auto text-red-500 mb-4" />
          <h2 className="text-xl font-semibold mb-2">Failed to load dashboard</h2>
          <p className="text-gray-500 mb-4">{error?.message || "Something went wrong"}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-green-700 text-white rounded-xl hover:bg-green-800"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold">Administrator Dashboard</h1>
        <p className="text-gray-500 mt-2">Monitor and manage the HouseConnect platform.</p>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
        <Link to="/admin/users">
          <StatCard
            title="Total Users"
            value={stats?.total_users?.toLocaleString() ?? "0"}
            icon={Users}
            trend="Manage users"
          />
        </Link>

        <StatCard
          title="Active Jobs"
          value={stats?.active_jobs?.toLocaleString() ?? "0"}
          icon={Briefcase}
        />

        <Link to="/admin/verification-queue">
          <StatCard
            title="Pending Verifications"
            value={stats?.pending_verifications ?? 0}
            icon={ShieldCheck}
            trend={stats?.pending_verifications > 0 ? "Needs review" : "All clear"}
          />
        </Link>

        <Link to="/admin/emergency-alerts">
          <StatCard
            title="Active Emergencies"
            value={stats?.active_emergencies ?? 0}
            icon={TriangleAlert}
            trend={stats?.active_emergencies > 0 ? "⚠️ Attention needed" : "No active alerts"}
            variant={stats?.active_emergencies > 0 ? "danger" : "default"}
          />
        </Link>
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
