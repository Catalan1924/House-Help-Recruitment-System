import { useQuery } from "@tanstack/react-query";
import { Users, Briefcase, FileText, TrendingUp, AlertCircle, DollarSign, CheckCircle2 } from "lucide-react";

import { getPlatformAnalytics } from "../../api/admin";
import { DashboardSkeleton } from "../../components/LoadingSkeleton";

const Reports = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["admin-reports"],
    queryFn: getPlatformAnalytics,
    staleTime: 60_000,
  });

  if (isLoading) return <DashboardSkeleton />;

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-[40vh]">
        <div className="text-center">
          <AlertCircle size={48} className="mx-auto text-red-500 mb-4" />
          <h2 className="text-xl font-semibold mb-2">Couldn't load reports</h2>
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

  const stats = data || {};

  const summaryCards = [
    {
      icon: Users,
      label: "Total Users",
      value: (stats.totalUsers || 0).toLocaleString(),
      detail: `${stats.workers || 0} workers · ${stats.employers || 0} employers`,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      icon: Briefcase,
      label: "Active Jobs",
      value: (stats.activeJobs || 0).toLocaleString(),
      detail: `${(stats.totalApplications || 0).toLocaleString()} total applications`,
      color: "text-green-600",
      bg: "bg-green-50",
    },
    {
      icon: DollarSign,
      label: "Total Revenue",
      value: `KES ${(stats.totalRevenue || 0).toLocaleString()}`,
      detail: `${(stats.completedPayments || 0).toLocaleString()} completed payments`,
      color: "text-orange-600",
      bg: "bg-orange-50",
    },
    {
      icon: TrendingUp,
      label: "Application Rate",
      value: stats.totalUsers
        ? ((stats.totalApplications || 0) / stats.totalUsers).toFixed(1)
        : "0.0",
      detail: "applications per user",
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
  ];

  const workerPct = stats.totalUsers ? Math.round(((stats.workers || 0) / stats.totalUsers) * 100) : 0;
  const employerPct = stats.totalUsers ? Math.round(((stats.employers || 0) / stats.totalUsers) * 100) : 0;

  const insights = [
    {
      title: "Worker-to-Employer Ratio",
      value: stats.employers ? `${((stats.workers || 0) / stats.employers).toFixed(1)}:1` : "N/A",
      description: "Workers per employer on the platform. A higher ratio means more supply than demand.",
    },
    {
      title: "Revenue per Payment",
      value: stats.completedPayments ? `KES ${Math.round((stats.totalRevenue || 0) / stats.completedPayments).toLocaleString()}` : "N/A",
      description: "Average transaction value across all completed payments.",
    },
    {
      title: "Platform Growth",
      value: stats.monthlySignups?.length
        ? `${stats.monthlySignups[stats.monthlySignups.length - 1]?.count || 0} users`
        : "N/A",
      description: "Users registered in the most recent month with data.",
    },
    {
      title: "Role Distribution",
      value: `${workerPct}% / ${employerPct}%`,
      description: "Workers vs employers split. A healthy platform has a balanced mix.",
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Reports & Insights</h1>
        <p className="text-gray-500 mt-1">Platform performance overview and trends</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {summaryCards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.label} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
              <div className={`w-12 h-12 ${card.bg} rounded-xl flex items-center justify-center mb-4`}>
                <Icon className={card.color} size={24} />
              </div>
              <p className="text-3xl font-bold text-slate-900">{card.value}</p>
              <p className="text-gray-500 text-sm mt-1">{card.label}</p>
              <p className="text-xs text-gray-400 mt-2">{card.detail}</p>
            </div>
          );
        })}
      </div>

      {/* Insights */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-8">
        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
          <CheckCircle2 size={20} className="text-green-600" />
          Key Insights
        </h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {insights.map((insight) => (
            <div key={insight.title} className="rounded-xl border border-slate-200 p-5">
              <p className="text-sm text-gray-500 mb-1">{insight.title}</p>
              <p className="text-2xl font-bold text-slate-800">{insight.value}</p>
              <p className="text-sm text-gray-500 mt-2">{insight.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Monthly Registrations Table */}
      {stats.monthlySignups?.length > 0 && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-xl font-semibold mb-4">Monthly Registrations</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 text-left">
                <tr>
                  <th className="p-3 font-medium text-sm text-gray-600">Month</th>
                  <th className="p-3 font-medium text-sm text-gray-600">New Users</th>
                  <th className="p-3 font-medium text-sm text-gray-600">Bar</th>
                </tr>
              </thead>
              <tbody>
                {stats.monthlySignups.map((m, i) => {
                  const maxCount = Math.max(...stats.monthlySignups.map((x) => x.count), 1);
                  return (
                    <tr key={i} className="border-t hover:bg-gray-50">
                      <td className="p-3 font-medium text-slate-700">{m.month}</td>
                      <td className="p-3 text-gray-600">{m.count}</td>
                      <td className="p-3">
                        <div className="w-full bg-gray-100 rounded-full h-2.5">
                          <div
                            className="bg-green-500 h-2.5 rounded-full"
                            style={{ width: `${(m.count / maxCount) * 100}%` }}
                          />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reports;
