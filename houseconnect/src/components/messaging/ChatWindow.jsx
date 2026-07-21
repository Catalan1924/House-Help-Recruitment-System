import MessageBubble from "./MessageBubble";
import ChatInput from "./ChatInput";

const messages = [
  {
    sender: "employer",
    text: "Hello Mary 👋",
    time: "10:20 AM",
  },
  {
    sender: "worker",
    text: "Hello. Thank you for reaching out.",
    time: "10:21 AM",
  },
  {
    sender: "employer",
    text: "Are you available to start next Monday?",
    time: "10:23 AM",
  },
];

const ChatWindow = () => {
  return (
    <div className="flex flex-col h-full">

      {/* Header */}

      <div className="border-b p-5 flex items-center gap-4">

        <img
          src="https://i.pravatar.cc/150?img=30"
          className="w-12 h-12 rounded-full"
        />

        <div>

          <h3 className="font-bold">
            Mwangi Family
          </h3>

          <p className="text-green-600 text-sm">
            Online
          </p>

        </div>

      </div>

      {/* Messages */}

      <div className="flex-1 overflow-y-auto p-6 bg-slate-50 space-y-4">

        {messages.map((message, index) => (

          <MessageBubble
            key={index}
            message={message}
          />

        ))}

      </div>

      <ChatInput />

    </div>
  );
};

export default ChatWindow;