import { formatDistanceToNow } from "date-fns";

const MessageCard = ({ message, onClick, isActive = false }) => {
  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-3 p-4 cursor-pointer transition ${
        isActive ? "bg-green-50 border-l-4 border-green-700" : "hover:bg-gray-50 border-l-4 border-transparent"
      }`}
    >
      <img
        src={message.avatar || "https://i.pravatar.cc/100?img=32"}
        alt=""
        className="w-12 h-12 rounded-full object-cover"
      />
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-center">
          <h4 className="font-semibold text-sm truncate">{message.sender}</h4>
          <span className="text-xs text-gray-400">
            {message.timestamp
              ? formatDistanceToNow(new Date(message.timestamp), { addSuffix: true })
              : ""}
          </span>
        </div>
        <p className="text-sm text-gray-500 truncate">{message.preview}</p>
      </div>
      {message.unread && (
        <span className="w-2 h-2 bg-green-600 rounded-full shrink-0" />
      )}
    </div>
  );
};

export default MessageCard;
