import {
  CheckCircle2,
  Briefcase,
  User,
  FileCheck,
  Bell,
} from "lucide-react";

const activities = [
  {
    icon: User,
    color: "bg-blue-100 text-blue-600",
    title: "Employer viewed your profile",
    time: "10 minutes ago",
  },
  {
    icon: Briefcase,
    color: "bg-green-100 text-green-600",
    title: "Applied for Live-in House Help",
    time: "Today",
  },
  {
    icon: FileCheck,
    color: "bg-purple-100 text-purple-600",
    title: "Documents approved",
    time: "Yesterday",
  },
  {
    icon: Bell,
    color: "bg-yellow-100 text-yellow-600",
    title: "New job recommendation",
    time: "2 days ago",
  },
  {
    icon: CheckCircle2,
    color: "bg-green-100 text-green-600",
    title: "Profile completed",
    time: "5 days ago",
  },
];

const RecentActivity = () => {
  return (
    <div className="bg-white rounded-2xl shadow p-6">

      <h2 className="text-2xl font-bold mb-8">
        Recent Activity
      </h2>

      <div className="space-y-6">

        {activities.map((activity, index) => {

          const Icon = activity.icon;

          return (

            <div
              key={index}
              className="flex items-start gap-4"
            >

              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center ${activity.color}`}
              >
                <Icon size={22} />
              </div>

              <div>

                <h3 className="font-semibold">
                  {activity.title}
                </h3>

                <p className="text-gray-500 text-sm mt-1">
                  {activity.time}
                </p>

              </div>

            </div>

          );

        })}

      </div>

    </div>
  );
};

export default RecentActivity;