import { CheckCircle2, Briefcase, User, FileCheck, Bell, Loader2 } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useMyApplications } from "../../hooks/useApplications";
import { useNotifications } from "../../hooks/useNotifications";

const activityIcons = {
  application: { icon: Briefcase, color: "bg-green-100 text-green-600" },
  profile_view: { icon: User, color: "bg-blue-100 text-blue-600" },
  documents: { icon: FileCheck, color: "bg-purple-100 text-purple-600" },
  notification: { icon: Bell, color: "bg-yellow-100 text-yellow-600" },
  default: { icon: CheckCircle2, color: "bg-green-100 text-green-600" },
};

const RecentActivity = () => {
  const { user } = useAuth();
  const { data: applications, isLoading: appsLoading } = useMyApplications(user?.id);
  const { data: notifications, isLoading: notesLoading } = useNotifications(user?.id);

  const isLoading = appsLoading || notesLoading;

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-2xl font-bold mb-8">Recent Activity</h2>
        <div className="flex items-center justify-center py-8">
          <Loader2 className="animate-spin text-green-700" size={32} />
        </div>
      </div>
    );
  }

  // Build activity feed from real data
  const items = [];

  if (applications?.length) {
    applications.slice(0, 3).forEach((app) => {
      const jobTitle = app.job?.title || "a job";
      items.push({
        icon: activityIcons.application,
        title: `Applied for ${jobTitle}`,
        time: new Date(app.created_at).toLocaleDateString(),
        key: `app-${app.id}`,
      });
    });
  }

  if (notifications?.length) {
    notifications.slice(0, 3).forEach((note) => {
      items.push({
        icon: activityIcons.notification,
        title: note.title || note.message || "New notification",
        time: new Date(note.created_at).toLocaleDateString(),
        key: `note-${note.id}`,
      });
    });
  }

  if (!items.length) {
    return (
      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-2xl font-bold mb-8">Recent Activity</h2>
        <p className="text-gray-500 text-center py-8">No recent activity yet.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <h2 className="text-2xl font-bold mb-8">Recent Activity</h2>
      <div className="space-y-6">
        {items.slice(0, 5).map((activity, index) => {
          const Icon = activity.icon.icon;
          return (
            <div key={activity.key || index} className="flex items-start gap-4">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${activity.icon.color}`}>
                <Icon size={22} />
              </div>
              <div>
                <h3 className="font-semibold">{activity.title}</h3>
                <p className="text-gray-500 text-sm mt-1">{activity.time}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecentActivity;
