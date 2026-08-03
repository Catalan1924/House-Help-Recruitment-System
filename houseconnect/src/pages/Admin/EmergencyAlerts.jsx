import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { TriangleAlert, CheckCircle2, Clock, MapPin, Phone, AlertCircle, Loader2 } from "lucide-react";

import { getEmergencyAlerts, updateEmergencyAlert } from "../../api/admin";
import { useAuth } from "../../context/AuthContext";
import { LoadingRow } from "../../components/LoadingSkeleton";

const EmergencyAlerts = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [statusFilter, setStatusFilter] = useState("active");
  const [actionError, setActionError] = useState(null);

  const { data: alerts, isLoading, isError, error } = useQuery({
    queryKey: ["admin-emergency-alerts", statusFilter],
    queryFn: () => getEmergencyAlerts({ status: statusFilter || undefined }),
    refetchInterval: 30_000,
  });

  const respondMutation = useMutation({
    mutationFn: ({ alertId, status }) => updateEmergencyAlert(alertId, status, user.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-emergency-alerts"] });
      queryClient.invalidateQueries({ queryKey: ["adminStats"] });
      setActionError(null);
    },
    onError: (err) => setActionError(err.message),
  });

  const activeCount = (alerts || []).filter((a) => a.status === "active").length;

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            {activeCount > 0 ? (
              <span className="relative">
                <TriangleAlert className="text-red-600" size={32} />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-600 rounded-full border-2 border-white" />
              </span>
            ) : (
              <CheckCircle2 className="text-green-600" size={32} />
            )}
            Emergency Alerts
          </h1>
          <p className="text-gray-500 mt-1">
            {activeCount > 0
              ? `${activeCount} active alert${activeCount !== 1 ? "s" : ""} requiring attention`
              : "No active alerts — all clear"}
          </p>
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2.5 border rounded-xl outline-none focus:ring-2 focus:ring-green-600 text-sm self-start"
        >
          <option value="active">Active</option>
          <option value="acknowledged">Acknowledged</option>
          <option value="resolved">Resolved</option>
          <option value="">All</option>
        </select>
      </div>

      {actionError && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 flex items-center gap-2">
          <AlertCircle size={18} />
          {actionError}
          <button onClick={() => setActionError(null)} className="ml-auto text-red-500 hover:text-red-700">×</button>
        </div>
      )}

      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-2xl border p-6"><LoadingRow /></div>
          ))}
        </div>
      ) : isError ? (
        <div className="bg-white rounded-2xl border border-red-200 p-8 text-center">
          <AlertCircle size={32} className="mx-auto text-red-500 mb-3" />
          <p className="text-red-600">Failed to load alerts: {error?.message}</p>
        </div>
      ) : !alerts?.length ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
          <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 size={28} className="text-green-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-700">No alerts found</h3>
          <p className="text-gray-500 mt-1">No emergency alerts match the current filter.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className={`bg-white rounded-2xl shadow-sm border-l-4 p-6 ${
                alert.status === "active"
                  ? "border-red-500"
                  : alert.status === "acknowledged"
                  ? "border-yellow-500"
                  : "border-green-500"
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div className="flex gap-4">
                  <div
                    className={`p-3 rounded-xl flex-shrink-0 ${
                      alert.status === "active"
                        ? "bg-red-100"
                        : alert.status === "acknowledged"
                        ? "bg-yellow-100"
                        : "bg-green-100"
                    }`}
                  >
                    {alert.status === "resolved" ? (
                      <CheckCircle2 className="text-green-700" size={24} />
                    ) : (
                      <TriangleAlert className={alert.status === "active" ? "text-red-600" : "text-yellow-600"} size={24} />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-semibold text-lg text-slate-800">{alert.user?.full_name || "Unknown"}</h3>
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                          alert.status === "active"
                            ? "bg-red-100 text-red-800"
                            : alert.status === "acknowledged"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {alert.status}
                      </span>
                    </div>
                    {alert.message && <p className="text-gray-600 mt-1">{alert.message}</p>}
                    <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-gray-500">
                      {alert.user?.phone && (
                        <span className="flex items-center gap-1">
                          <Phone size={14} /> {alert.user.phone}
                        </span>
                      )}
                      {alert.location && (
                        <span className="flex items-center gap-1">
                          <MapPin size={14} /> {alert.location}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <Clock size={14} />{" "}
                        {new Date(alert.created_at).toLocaleString("en", {
                          dateStyle: "medium",
                          timeStyle: "short",
                        })}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-3 self-end sm:self-center">
                  {alert.status === "active" && (
                    <>
                      <button
                        onClick={() => respondMutation.mutate({ alertId: alert.id, status: "acknowledged" })}
                        disabled={respondMutation.isLoading}
                        className="px-4 py-2 border border-yellow-300 text-yellow-700 rounded-xl hover:bg-yellow-50 disabled:opacity-50 text-sm transition flex items-center gap-2"
                      >
                        {respondMutation.isLoading ? <Loader2 size={14} className="animate-spin" /> : null}
                        Acknowledge
                      </button>
                      <button
                        onClick={() => respondMutation.mutate({ alertId: alert.id, status: "resolved" })}
                        disabled={respondMutation.isLoading}
                        className="px-4 py-2 bg-green-700 text-white rounded-xl hover:bg-green-800 disabled:opacity-50 text-sm transition flex items-center gap-2"
                      >
                        {respondMutation.isLoading ? <Loader2 size={14} className="animate-spin" /> : null}
                        Resolve
                      </button>
                    </>
                  )}
                  {alert.status === "acknowledged" && (
                    <button
                      onClick={() => respondMutation.mutate({ alertId: alert.id, status: "resolved" })}
                      disabled={respondMutation.isLoading}
                      className="px-4 py-2 bg-green-700 text-white rounded-xl hover:bg-green-800 disabled:opacity-50 text-sm transition flex items-center gap-2"
                    >
                      {respondMutation.isLoading ? <Loader2 size={14} className="animate-spin" /> : null}
                      Mark Resolved
                    </button>
                  )}
                  {alert.status === "resolved" && (
                    <span className="text-sm text-green-600 flex items-center gap-1">
                      <CheckCircle2 size={14} /> Resolved{" "}
                      {alert.resolved_at &&
                        new Date(alert.resolved_at).toLocaleDateString("en", {
                          month: "short",
                          day: "numeric",
                        })}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EmergencyAlerts;
