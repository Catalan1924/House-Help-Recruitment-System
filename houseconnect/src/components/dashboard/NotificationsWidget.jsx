import { BellDot } from "lucide-react";

const notifications = [
  "Your profile has been verified.",
  "You have received a new job invitation.",
  "Reminder: Complete your profile.",
  "Your application has been shortlisted.",
];

const NotificationsWidget = () => {
  return (
    <div className="bg-white rounded-2xl shadow p-6">

      <div className="flex items-center gap-3 mb-6">

        <BellDot className="text-green-700" />

        <h2 className="text-2xl font-bold">
          Notifications
        </h2>

      </div>

      <div className="space-y-4">

        {notifications.map((note, index) => (

          <div
            key={index}
            className="bg-green-50 rounded-xl p-4 border-l-4 border-green-700"
          >

            {note}

          </div>

        ))}

      </div>

    </div>
  );
};

export default NotificationsWidget;