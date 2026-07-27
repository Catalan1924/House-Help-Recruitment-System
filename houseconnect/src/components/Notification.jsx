import { formatDistanceToNow } from "date-fns";
import { Bell, Briefcase, MessageCircle, ShieldAlert, CheckCircle2 } from "lucide-react";

const iconMap = {
  job: Briefcase,
  message: MessageCircle,
  alert: ShieldAlert,
  system: Bell,
  default: Bell,
};

const colorMap = {
  job: "bg-blue-100 text-blue-700",
  message: "bg-green-100 text-green-700",
  alert: "bg-red-100 text-red-700",
  system: "bg-gray-100 text-gray-700",
  default: "bg-gray-100 text-gray-700",
};

const Notification = ({ notification, onMarkRead }) => {
  const Icon = iconMap[notification.type] || iconMap.default;
  const colorClass = colorMap[notification.type] || colorMap.default;

  return (
    <div
      className={`flex items-start gap-4 p-4 border-b last:border-b-0 transition cursor-pointer ${
        notification.read ? "bg-white" : "bg-green-50"
      }`}
      onClick={() => onMarkRead?.(notification.id)}
    >
      <div className={`p-2 rounded-xl ${colorClass} shrink-0`}>
        <Icon size={18} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start gap-2">
          <p className={`text-sm ${notification.read ? "text-gray-600" : "font-medium text-gray-900"}`}>
            {notification.message}
          </p>
          {notification.read && <CheckCircle2 size={14} className="text-gray-300 shrink-0 mt-0.5" />}
        </div>
        <p className="text-xs text-gray-400 mt-1">
          {notification.created_at
            ? formatDistanceToNow(new Date(notification.created_at), { addSuffix: true })
            : ""}
        </p>
      </div>
      {!notification.read && (
        <span className="w-2 h-2 bg-green-600 rounded-full mt-2 shrink-0" />
      )}
    </div>
  );
};

export default Notification;
