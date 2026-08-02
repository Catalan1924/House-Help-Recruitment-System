import ConversationList from "../../components/messaging/ConversationList";
import ChatWindow from "../../components/messaging/ChatWindow";
import { useState } from "react";

const EmployerMessages = () => {
  const [selectedConversation, setSelectedConversation] = useState(null);

  return (
      <div className="flex h-[calc(100vh-120px)] bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className={`${selectedConversation ? "hidden md:block" : "block"} w-full md:w-96 border-r`}>
          <ConversationList onSelect={(c) => setSelectedConversation(c)} selectedId={selectedConversation?.id} />
        </div>
        <div className={`${selectedConversation ? "block" : "hidden md:block"} flex-1`}>
          {selectedConversation ? (
            <ChatWindow conversation={selectedConversation} onBack={() => setSelectedConversation(null)} />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
              <p>Select a conversation to start messaging</p>
            </div>
          )}
        </div>
      </div>
  );
};

export default EmployerMessages;
