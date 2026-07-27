import ApplicationCard from "../../components/applications/ApplicationCard";
import { useAuth } from "../../context/AuthContext";
import { useMyApplications } from "../../hooks/useApplications";
import { Loader2 } from "lucide-react";

const Applications = () => {
  const { user } = useAuth();
  const { data: applications, isLoading, isError } = useMyApplications(user?.id);

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold">My Applications</h1>

      {isLoading && (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="animate-spin text-green-700" size={48} />
        </div>
      )}

      {isError && (
        <div className="text-center py-20">
          <p className="text-red-500">Failed to load applications.</p>
        </div>
      )}

      {!isLoading && !isError && applications?.length === 0 && (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg">You haven't applied to any jobs yet.</p>
        </div>
      )}

      {!isLoading && !isError && applications?.length > 0 && (
        <div className="space-y-5">
          {applications.map((application) => (
            <ApplicationCard key={application.id} application={application} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Applications;
