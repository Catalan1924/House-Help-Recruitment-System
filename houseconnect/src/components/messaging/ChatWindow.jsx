import MessageBubble from "./MessageBubble";
import ChatInput from "./ChatInput";
import { Loader2 } from "lucide-react";
import { useMessages, useSendMessage } from "../../hooks/useMessages";
import { useAuth } from "../../context/AuthContext";
import { useEffect, useRef } from "react";

const ChatWindow = ({ conversation }) => {
  const { user } = useAuth();
  const { data: messages, isLoading, isError } = useMessages(conversation?.id);
  const sendMessage = useSendMessage();
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!conversation) {
    return (
      <div className="flex items-center justify-center h-full text-gray-400">
        Select a conversation to start messaging
      </div>
    );
  }

  const handleSend = (text) => {
    if (!text.trim() || !user) return;
    sendMessage.mutate({
      conversationId: conversation.id,
      senderId: user.id,
      text: text.trim(),
    });
  };

  const otherName = conversation.participant_name || conversation.other_user_name || "User";

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="border-b p-5 flex items-center gap-4 flex-shrink-0">
        <img
          src={`https://i.pravatar.cc/150?u=${conversation.id}`}
          className="w-12 h-12 rounded-full"
          alt={otherName}
        />
        <div>
          <h3 className="font-bold">{otherName}</h3>
          <p className="text-green-600 text-sm">Online</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 bg-slate-50 space-y-4">
        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="animate-spin text-green-700" size={32} />
          </div>
        )}

        {isError && (
          <p className="text-red-500 text-center py-12">Failed to load messages.</p>
        )}

        {!isLoading && !isError && messages?.length === 0 && (
          <p className="text-gray-500 text-center py-12">No messages yet. Say hello!</p>
        )}

        {!isLoading && !isError && messages?.map((message) => (
          <MessageBubble
            key={message.id}
            message={{ ...message, sender: message.sender_id === user?.id ? "worker" : "employer" }}
          />
        ))}
        <div ref={bottomRef} />
      </div>

      <ChatInput onSend={handleSend} disabled={sendMessage.isPending} />
    </div>
  );
};

export default ChatWindow;
