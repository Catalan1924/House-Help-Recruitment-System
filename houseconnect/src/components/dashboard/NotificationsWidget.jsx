import { BellDot, Loader2 } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useNotifications, useMarkAsRead } from "../../hooks/useNotifications";

const NotificationsWidget = () => {
  const { user } = useAuth();
  const { data: notifications, isLoading, isError } = useNotifications(user?.id);
  const markAsRead = useMarkAsRead();

  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <div className="flex items-center gap-3 mb-6">
        <BellDot className="text-green-700" />
        <h2 className="text-2xl font-bold">Notifications</h2>
      </div>

      {isLoading && (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="animate-spin text-green-700" size={32} />
        </div>
      )}

      {isError && (
        <p className="text-gray-500 text-center py-8 text-sm">Couldn't load notifications right now.</p>
      )}

      {!isLoading && !isError && notifications?.length === 0 && (
        <p className="text-gray-500 text-center py-8">No notifications yet.</p>
      )}

      {!isLoading && !isError && notifications?.length > 0 && (
        <div className="space-y-4">
          {notifications.slice(0, 4).map((note) => (
            <button
              key={note.id}
              onClick={() => markAsRead.mutate(note.id)}
              className={`w-full text-left rounded-xl p-4 border-l-4 transition ${
                note.read ? "bg-gray-50 border-gray-300" : "bg-green-50 border-green-700"
              }`}
            >
              {note.title || note.message || "Notification"}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotificationsWidget;
