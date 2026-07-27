import { useState } from "react";
import ConversationList from "../../components/messaging/ConversationList";
import ChatWindow from "../../components/messaging/ChatWindow";

const Messages = () => {
  const [selectedConversation, setSelectedConversation] = useState(null);

  return (
    <div className="h-[calc(100vh-120px)] bg-white rounded-2xl shadow overflow-hidden">
      <div className="grid grid-cols-12 h-full">
        <div className="col-span-4 border-r">
          <ConversationList
            onSelectConversation={setSelectedConversation}
            selectedId={selectedConversation?.id}
          />
        </div>
        <div className="col-span-8">
          <ChatWindow conversation={selectedConversation} />
        </div>
      </div>
    </div>
  );
};

export default Messages;
