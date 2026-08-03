import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import {
  Users,
  Briefcase,
  CheckCircle,
  Calendar,
  AlertCircle,
  Plus,
} from "lucide-react";

import { getEmployerStats } from "../../api/dashboard";
import { useAuth } from "../../context/AuthContext";
import StatCard from "../../components/dashboard/StatCard";
import MyRecentJobs from "../../components/dashboard/MyRecentJobs";
import RecentApplicants from "../../components/dashboard/RecentApplicants";
import RecentActivity from "../../components/dashboard/RecentActivity";
import NotificationsWidget from "../../components/dashboard/NotificationsWidget";
import { DashboardSkeleton } from "../../components/LoadingSkeleton";

const Dashboard = () => {
  const { user } = useAuth();

  const { data: stats, isLoading, isError, error } = useQuery({
    queryKey: ["employerStats", user?.id],
    queryFn: () => getEmployerStats(user.id),
    enabled: !!user?.id,
  });

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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold">Employer Dashboard</h1>
          <p className="text-gray-500 mt-2">Manage jobs, applicants and interviews.</p>
        </div>
        <Link
          to="/employer/post-job"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-green-700 text-white rounded-xl font-medium hover:bg-green-800 transition self-start"
        >
          <Plus size={20} />
          Post New Job
        </Link>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
        <Link to="/employer/jobs">
          <StatCard
            title="Active Jobs"
            value={stats?.active_jobs ?? 0}
            icon={Briefcase}
            trend="Manage jobs"
          />
        </Link>

        <Link to="/employer/applicants">
          <StatCard
            title="Total Applicants"
            value={stats?.total_applicants ?? 0}
            icon={Users}
            trend="Review applicants"
          />
        </Link>

        <StatCard
          title="Shortlisted"
          value={stats?.shortlisted ?? 0}
          icon={Calendar}
          trend={stats?.shortlisted > 0 ? "Schedule interviews" : "Start screening"}
        />

        <StatCard
          title="Hired"
          value={stats?.hired ?? 0}
          icon={CheckCircle}
          trend={stats?.hired > 0 ? "Great hires!" : "Find talent"}
        />
      </div>

      <div className="grid xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <MyRecentJobs />
        </div>
        <RecentApplicants />
      </div>

      <div className="grid xl:grid-cols-2 gap-6">
        <RecentActivity />
        <NotificationsWidget />
      </div>
    </div>
  );
};

export default Dashboard;
