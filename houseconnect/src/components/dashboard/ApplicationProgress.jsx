import { useAuth } from "../../context/AuthContext";
import { useMyApplications } from "../../hooks/useApplications";
import { Loader2 } from "lucide-react";

const statusColors = {
  pending: "bg-yellow-100 text-yellow-700",
  reviewed: "bg-blue-100 text-blue-700",
  shortlisted: "bg-purple-100 text-purple-700",
  accepted: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-700",
  withdrawn: "bg-gray-100 text-gray-700",
  Applied: "bg-yellow-100 text-yellow-700",
  Interview: "bg-blue-100 text-blue-700",
  Hired: "bg-green-100 text-green-700",
};

const ApplicationProgress = () => {
  const { user } = useAuth();
  const { data: applications, isLoading, isError } = useMyApplications(user?.id);

  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <h2 className="text-2xl font-bold">Application Progress</h2>

      {isLoading && (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="animate-spin text-green-700" size={32} />
        </div>
      )}

      {isError && (
        <p className="text-red-500 mt-8 text-center">Failed to load applications.</p>
      )}

      {!isLoading && !isError && applications?.length === 0 && (
        <p className="text-gray-500 mt-8 text-center">No applications yet.</p>
      )}

      {!isLoading && !isError && applications?.length > 0 && (
        <div className="space-y-5 mt-8">
          {applications.slice(0, 5).map((app) => (
            <div key={app.id} className="flex justify-between items-center border-b pb-4">
              <span className="font-medium">{app.job?.title || "Job"}</span>
              <span className={`px-4 py-2 rounded-full text-sm ${statusColors[app.status] || statusColors.pending}`}>
                {app.status}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ApplicationProgress;
