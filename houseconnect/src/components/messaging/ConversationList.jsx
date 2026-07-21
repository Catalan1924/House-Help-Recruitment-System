import ConversationCard from "./ConversationCard";
import { Search } from "lucide-react";

const conversations = [
  {
    id: 1,
    name: "Mwangi Family",
    lastMessage: "Can you start next Monday?",
    time: "10:45 AM",
    unread: 2,
    online: true,
  },
  {
    id: 2,
    name: "ABC Apartments",
    lastMessage: "Thank you for applying.",
    time: "Yesterday",
    unread: 0,
    online: false,
  },
];

const ConversationList = () => {
  return (
    <div className="h-full">

      <div className="p-6 border-b">

        <h2 className="text-2xl font-bold">
          Messages
        </h2>

        <div className="relative mt-5">

          <Search className="absolute left-4 top-4 text-gray-400"/>

          <input
            placeholder="Search conversations..."
            className="w-full bg-gray-100 rounded-xl py-3 pl-12 pr-4 outline-none"
          />

        </div>

      </div>

      <div className="overflow-y-auto h-full">

        {conversations.map((conversation) => (

          <ConversationCard
            key={conversation.id}
            conversation={conversation}
          />

        ))}

      </div>

    </div>
  );
};

export default ConversationList;