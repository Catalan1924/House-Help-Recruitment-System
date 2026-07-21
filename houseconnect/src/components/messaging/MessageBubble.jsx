const MessageBubble = ({ message }) => {
  const isWorker = message.sender === "worker";

  return (
    <div
      className={`flex ${
        isWorker ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`max-w-md px-5 py-3 rounded-2xl ${
          isWorker
            ? "bg-green-700 text-white"
            : "bg-white shadow"
        }`}
      >
        <p>{message.text}</p>

        <p
          className={`text-xs mt-2 ${
            isWorker
              ? "text-green-100"
              : "text-gray-400"
          }`}
        >
          {message.time}
        </p>

      </div>

    </div>
  );
};

export default MessageBubble;