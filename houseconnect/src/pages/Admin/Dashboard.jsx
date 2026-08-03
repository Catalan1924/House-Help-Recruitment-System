import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import {
  Users,
  Briefcase,
  ShieldCheck,
  TriangleAlert,
  AlertCircle,
  BarChart3,
  MessageSquare,
  Sparkles,
  ArrowRight,
  Clock3,
} from "lucide-react";

import { getAdminStats, getRecentActivity } from "../../api/dashboard";
import StatCard from "../../components/dashboard/StatCard";
import { DashboardSkeleton } from "../../components/LoadingSkeleton";

const formatTime = (value) => {
  if (!value) return "Recently updated";

  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
};

const Dashboard = () => {
  const { data: stats, isLoading, isError, error } = useQuery({
    queryKey: ["adminStats"],
    queryFn: getAdminStats,
  });

  const { data: activity, isLoading: activityLoading, isError: activityError } = useQuery({
    queryKey: ["adminRecentActivity"],
    queryFn: () => getRecentActivity(6),
    staleTime: 30_000,
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

  const quickActions = [
    {
      title: "Review verifications",
      description: "Approve or reject pending worker documents.",
      link: "/admin/verification-queue",
      icon: ShieldCheck,
    },
    {
      title: "Check emergencies",
      description: "Respond to active SOS alerts promptly.",
      link: "/admin/emergency-alerts",
      icon: TriangleAlert,
    },
    {
      title: "Manage users",
      description: "Inspect employer and worker accounts.",
      link: "/admin/users",
      icon: Users,
    },
    {
      title: "View analytics",
      description: "Track platform trends and growth.",
      link: "/admin/analytics",
      icon: BarChart3,
    },
  ];

  const priorities = [
    {
      label: "Pending reviews",
      value: `${stats?.pending_verifications ?? 0} items`,
    },
    {
      label: "Open alerts",
      value: `${stats?.active_emergencies ?? 0} active`,
    },
    {
      label: "Platform health",
      value: "Stable and monitored",
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="text-4xl font-bold text-slate-900">Admin control center</h1>
          <p className="text-gray-500 mt-2">
            Monitor platform activity, resolve urgent issues, and keep HouseConnect running smoothly.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-2xl border border-green-100 bg-green-50 px-4 py-3 text-sm text-green-700">
          <Sparkles size={16} />
          <span>Live oversight for the platform</span>
        </div>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
        <Link to="/admin/users">
          <StatCard
            title="Total Users"
            value={stats?.total_users?.toLocaleString() ?? "0"}
            icon={Users}
            trend="Manage members"
          />
        </Link>

        <StatCard
          title="Active Jobs"
          value={stats?.active_jobs?.toLocaleString() ?? "0"}
          icon={Briefcase}
          trend="Live opportunities"
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

      <div className="grid xl:grid-cols-[1.4fr_0.8fr] gap-6">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">Recent platform activity</h2>
              <p className="text-sm text-gray-500 mt-1">Latest jobs, applications, reviews, and updates.</p>
            </div>
            <Link to="/admin/analytics" className="text-sm font-medium text-green-700 hover:text-green-800">
              View analytics
            </Link>
          </div>

          {activityLoading ? (
            <div className="mt-6 space-y-4">
              {[1, 2, 3].map((item) => (
                <div key={item} className="h-16 rounded-xl bg-slate-100 animate-pulse" />
              ))}
            </div>
          ) : activityError ? (
            <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
              We could not load the latest activity feed right now.
            </div>
          ) : activity?.length ? (
            <div className="mt-6 space-y-4">
              {activity.map((item) => (
                <div key={`${item.type}-${item.timestamp}`} className="flex items-start gap-3 rounded-xl border border-slate-200 p-4">
                  <div className="rounded-full bg-green-50 p-2 text-green-700">
                    {item.type === "application" ? <Briefcase size={16} /> : item.type === "job" ? <Users size={16} /> : <MessageSquare size={16} />}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-slate-800">{item.message}</p>
                    <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">
                      <Clock3 size={14} />
                      <span>{formatTime(item.timestamp)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-6 rounded-xl border border-dashed border-slate-300 p-6 text-center text-sm text-gray-500">
              No recent platform activity yet.
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <h2 className="text-xl font-semibold text-slate-900">Quick actions</h2>
            <div className="mt-6 space-y-3">
              {quickActions.map((action) => {
                const Icon = action.icon;

                return (
                  <Link key={action.title} to={action.link} className="flex items-center justify-between rounded-xl border border-slate-200 p-4 transition hover:border-green-300 hover:bg-green-50">
                    <div className="flex items-center gap-3">
                      <div className="rounded-full bg-green-50 p-2 text-green-700">
                        <Icon size={16} />
                      </div>
                      <div>
                        <p className="font-medium text-slate-800">{action.title}</p>
                        <p className="text-sm text-gray-500">{action.description}</p>
                      </div>
                    </div>
                    <ArrowRight size={16} className="text-slate-400" />
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="rounded-2xl bg-gradient-to-br from-green-700 to-emerald-600 p-6 text-white shadow-sm">
            <h2 className="text-xl font-semibold">Current priorities</h2>
            <div className="mt-5 space-y-3">
              {priorities.map((priority) => (
                <div key={priority.label} className="rounded-xl bg-white/10 px-4 py-3 backdrop-blur-sm">
                  <p className="text-sm text-green-50">{priority.label}</p>
                  <p className="mt-1 font-semibold">{priority.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
