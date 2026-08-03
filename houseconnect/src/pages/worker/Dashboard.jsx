import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import {
  Briefcase,
  FileText,
  Bell,
  Star,
  AlertCircle,
} from "lucide-react";

import { getWorkerStats } from "../../api/dashboard";
import { getJobs } from "../../api/jobs";
import { useAuth } from "../../context/AuthContext";
import StatCard from "../../components/dashboard/StatCard";
import JobRecommendations from "../../components/dashboard/JobRecommendations";
import ProfileCompletion from "../../components/dashboard/ProfileCompletion";
import ApplicationProgress from "../../components/dashboard/ApplicationProgress";
import RecentActivity from "../../components/dashboard/RecentActivity";
import NotificationsWidget from "../../components/dashboard/NotificationsWidget";
import EmergencyCard from "../../components/dashboard/EmergencyCard";
import { DashboardSkeleton } from "../../components/LoadingSkeleton";

const Dashboard = () => {
  const { user } = useAuth();

  const { data: stats, isLoading: statsLoading, isError: statsError, error: statsErr } = useQuery({
    queryKey: ["workerStats", user?.id],
    queryFn: () => getWorkerStats(user.id),
    enabled: !!user?.id,
  });

  const { data: jobs = [], isLoading: jobsLoading } = useQuery({
    queryKey: ["recommendedJobs", stats?.county],
    queryFn: () => getJobs({ status: "open" }),
    enabled: !!user?.id,
  });

  const isLoading = statsLoading || jobsLoading;
  const isError = statsError;

  if (isLoading) return <DashboardSkeleton />;

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <AlertCircle size={48} className="mx-auto text-red-500 mb-4" />
          <h2 className="text-xl font-semibold mb-2">Couldn't load your dashboard</h2>
          <p className="text-gray-500 mb-4">We're having trouble fetching your data right now. Please try again in a moment.</p>
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
      {/* Welcome Section */}
      <div>
        <h1 className="text-4xl font-bold text-gray-900">Welcome Back 👋</h1>
        <p className="text-gray-500 mt-2">
          Here's an overview of your account and latest activity.
        </p>
      </div>

      {/* Statistics */}
      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
        <Link to="/worker/jobs">
          <StatCard
            title="Available Jobs"
            value={stats?.available_jobs ?? jobs.length}
            icon={Briefcase}
            trend="View all"
          />
        </Link>

        <Link to="/worker/applications">
          <StatCard
            title="My Applications"
            value={stats?.applications_count ?? 0}
            icon={FileText}
            trend="View applications"
          />
        </Link>

        <StatCard
          title="Notifications"
          value={stats?.unread_notifications ?? 0}
          icon={Bell}
          trend={stats?.unread_notifications > 0 ? `${stats.unread_notifications} unread` : "All caught up"}
        />

        <StatCard
          title="My Rating"
          value={stats?.average_rating ? `${stats.average_rating}` : "N/A"}
          icon={Star}
          trend={stats?.average_rating > 4 ? "Excellent!" : "Build reputation"}
        />
      </div>

      {/* Recommended Jobs & Profile */}
      <div className="grid xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <JobRecommendations jobs={jobs} />
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
