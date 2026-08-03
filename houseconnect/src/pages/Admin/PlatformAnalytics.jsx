import { useQuery } from "@tanstack/react-query";
import { Users, Briefcase, FileText, DollarSign, TrendingUp, AlertCircle } from "lucide-react";

import { getPlatformAnalytics } from "../../api/admin";
import { DashboardSkeleton } from "../../components/LoadingSkeleton";

const PlatformAnalytics = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["platform-analytics"],
    queryFn: getPlatformAnalytics,
    staleTime: 60_000,
  });

  if (isLoading) return <DashboardSkeleton />;

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-[40vh]">
        <div className="text-center">
          <AlertCircle size={48} className="mx-auto text-red-500 mb-4" />
          <h2 className="text-xl font-semibold mb-2">Couldn't load analytics</h2>
          <p className="text-gray-500 mb-4">{error?.message}</p>
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

  const stats = data || {
    totalUsers: 0,
    activeJobs: 0,
    totalApplications: 0,
    totalRevenue: 0,
    workers: 0,
    employers: 0,
    admins: 0,
    completedPayments: 0,
    monthlySignups: [],
  };

  const total = stats.workers + stats.employers + stats.admins;
  const workerPct = total ? Math.round((stats.workers / total) * 100) : 0;
  const employerPct = total ? Math.round((stats.employers / total) * 100) : 0;
  const adminPct = total ? Math.round((stats.admins / total) * 100) : 0;

  const kpiCards = [
    { icon: Users, label: "Total Users", value: stats.totalUsers.toLocaleString(), color: "text-blue-600", bg: "bg-blue-50" },
    { icon: Briefcase, label: "Active Jobs", value: stats.activeJobs.toLocaleString(), color: "text-green-600", bg: "bg-green-50" },
    { icon: FileText, label: "Applications", value: stats.totalApplications.toLocaleString(), color: "text-purple-600", bg: "bg-purple-50" },
    { icon: DollarSign, label: "Revenue (KES)", value: `KES ${stats.totalRevenue.toLocaleString()}`, color: "text-orange-600", bg: "bg-orange-50" },
  ];

  const maxMonthly = Math.max(...stats.monthlySignups.map((m) => m.count), 1);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Platform Analytics</h1>
        <p className="text-gray-500 mt-1">Real-time platform metrics and trends</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {kpiCards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.label} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
              <div className={`w-12 h-12 ${card.bg} rounded-xl flex items-center justify-center mb-4`}>
                <Icon className={card.color} size={24} />
              </div>
              <p className="text-3xl font-bold text-slate-900">{card.value}</p>
              <p className="text-gray-500 text-sm mt-1">{card.label}</p>
            </div>
          );
        })}
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Monthly Signups Bar Chart */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
          <h3 className="font-semibold text-lg mb-6 flex items-center gap-2">
            <TrendingUp size={20} className="text-green-600" />
            User Registrations (Last 12 Months)
          </h3>
          {stats.monthlySignups.length > 0 ? (
            <div className="flex items-end gap-2 h-48">
              {stats.monthlySignups.map((m, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1 min-w-0">
                  <span className="text-xs text-gray-500">{m.count}</span>
                  <div
                    className="w-full bg-green-500 rounded-t-md transition-all hover:bg-green-600 min-h-[4px]"
                    style={{ height: `${(m.count / maxMonthly) * 100}%` }}
                    title={`${m.month}: ${m.count}`}
                  />
                  <span className="text-xs text-gray-400 truncate max-w-full">{m.month}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="h-48 flex items-center justify-center text-gray-400">
              No registration data yet
            </div>
          )}
        </div>

        {/* User Distribution */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
          <h3 className="font-semibold text-lg mb-6 flex items-center gap-2">
            <Users size={20} className="text-blue-600" />
            User Distribution
          </h3>
          <div className="space-y-5">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-green-600 inline-block" />
                  Workers
                </span>
                <span className="font-medium">{workerPct}%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-3">
                <div className="bg-green-600 h-3 rounded-full transition-all" style={{ width: `${workerPct}%` }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-blue-600 inline-block" />
                  Employers
                </span>
                <span className="font-medium">{employerPct}%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-3">
                <div className="bg-blue-600 h-3 rounded-full transition-all" style={{ width: `${employerPct}%` }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-purple-600 inline-block" />
                  Admins
                </span>
                <span className="font-medium">{adminPct}%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-3">
                <div className="bg-purple-600 h-3 rounded-full transition-all" style={{ width: `${adminPct}%` }} />
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-slate-800">{stats.workers.toLocaleString()}</p>
              <p className="text-xs text-gray-500">Workers</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-800">{stats.employers.toLocaleString()}</p>
              <p className="text-xs text-gray-500">Employers</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-800">{stats.admins.toLocaleString()}</p>
              <p className="text-xs text-gray-500">Admins</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlatformAnalytics;
