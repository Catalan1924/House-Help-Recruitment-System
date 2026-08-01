import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../../context/AuthContext";
import { getEmployerApplicants } from "../../api/employer";
import { updateApplicationStatus } from "../../api/applications";
import { Users, Loader2, MapPin, CheckCircle2, XCircle, Star } from "lucide-react";
import toast from "react-hot-toast";

const statusLabels = {
  pending: "New",
  reviewed: "Reviewed",
  shortlisted: "Shortlisted",
  accepted: "Accepted",
  rejected: "Rejected",
};

const RecentApplicants = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: applicants, isLoading, isError } = useQuery({
    queryKey: ["employerApplicants", user?.id],
    queryFn: () => getEmployerApplicants(user.id, 5),
    enabled: !!user?.id,
  });

  const statusMutation = useMutation({
    mutationFn: ({ id, status }) => updateApplicationStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employerApplicants"] });
      toast.success("Status updated!");
    },
    onError: (err) => toast.error(err.message),
  });

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-2xl font-bold mb-8">Recent Applicants</h2>
        <div className="flex items-center justify-center py-8">
          <Loader2 className="animate-spin text-green-700" size={32} />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-2xl font-bold mb-8">Recent Applicants</h2>
        <p className="text-red-500 text-center py-8">Failed to load applicants.</p>
      </div>
    );
  }

  if (!applicants?.length) {
    return (
      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-2xl font-bold mb-8">Recent Applicants</h2>
        <div className="text-center py-8">
          <Users size={48} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500">No applicants yet.</p>
          <p className="text-gray-400 text-sm mt-1">When workers apply to your jobs, they'll appear here.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <h2 className="text-2xl font-bold mb-8">Recent Applicants</h2>
      <div className="space-y-4">
        {applicants.map((app) => (
          <div key={app.id} className="flex items-center justify-between border rounded-xl p-4 hover:border-green-600 transition">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-bold shrink-0">
                {app.worker?.full_name?.charAt(0)?.toUpperCase() || "?"}
              </div>
              <div className="min-w-0">
                <p className="font-semibold truncate">{app.worker?.full_name || "Unknown"}</p>
                <p className="text-sm text-gray-500 truncate">
                  for <span className="text-green-700">{app.job?.title || "a job"}</span>
                  {app.worker?.county && (
                    <span className="inline-flex items-center ml-2">
                      <MapPin size={12} className="mr-0.5" /> {app.worker.county}
                    </span>
                  )}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0 ml-3">
              {app.status === "pending" && (
                <>
                  <button
                    onClick={(e) => { e.preventDefault(); statusMutation.mutate({ id: app.id, status: "shortlisted" }); }}
                    disabled={statusMutation.isPending}
                    className="p-2 rounded-lg bg-green-100 text-green-700 hover:bg-green-200 transition"
                    title="Shortlist"
                  >
                    <Star size={18} />
                  </button>
                  <button
                    onClick={(e) => { e.preventDefault(); statusMutation.mutate({ id: app.id, status: "rejected" }); }}
                    disabled={statusMutation.isPending}
                    className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition"
                    title="Reject"
                  >
                    <XCircle size={18} />
                  </button>
                </>
              )}
              {app.status === "shortlisted" && (
                <button
                  onClick={(e) => { e.preventDefault(); statusMutation.mutate({ id: app.id, status: "accepted" }); }}
                  disabled={statusMutation.isPending}
                  className="p-2 rounded-lg bg-blue-100 text-blue-700 hover:bg-blue-200 transition"
                  title="Accept"
                >
                  <CheckCircle2 size={18} />
                </button>
              )}
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ml-1 ${
                app.status === "pending" ? "bg-yellow-100 text-yellow-700" :
                app.status === "shortlisted" ? "bg-purple-100 text-purple-700" :
                app.status === "accepted" ? "bg-green-100 text-green-700" :
                app.status === "rejected" ? "bg-red-100 text-red-700" :
                "bg-gray-100 text-gray-700"
              }`}>
                {statusLabels[app.status] || app.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentApplicants;
