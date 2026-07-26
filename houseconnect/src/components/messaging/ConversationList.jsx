import ConversationCard from "./ConversationCard";
import { Search, Loader2 } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useConversations } from "../../hooks/useMessages";

const ConversationList = ({ onSelectConversation, selectedId }) => {
  const { user } = useAuth();
  const [search, setSearch] = useState("");
  const { data: conversations, isLoading, isError } = useConversations(user?.id);

  const filtered = conversations?.filter((c) => {
    if (!search.trim()) return true;
    const name = c.participant_name || c.other_user_name || "";
    return name.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div className="h-full flex flex-col">
      <div className="p-6 border-b flex-shrink-0">
        <h2 className="text-2xl font-bold">Messages</h2>
        <div className="relative mt-5">
          <Search className="absolute left-4 top-4 text-gray-400" />
          <input
            placeholder="Search conversations..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-gray-100 rounded-xl py-3 pl-12 pr-4 outline-none"
          />
        </div>
      </div>

      <div className="overflow-y-auto flex-1">
        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="animate-spin text-green-700" size={32} />
          </div>
        )}

        {isError && (
          <p className="text-red-500 text-center py-12">Failed to load conversations.</p>
        )}

        {!isLoading && !isError && filtered?.length === 0 && (
          <p className="text-gray-500 text-center py-12">No conversations yet.</p>
        )}

        {!isLoading && !isError && filtered?.map((conversation) => (
          <button
            key={conversation.id}
            onClick={() => onSelectConversation?.(conversation)}
            className={`w-full text-left ${
              selectedId === conversation.id ? "bg-green-50" : ""
            }`}
          >
            <ConversationCard conversation={conversation} />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ConversationList;
