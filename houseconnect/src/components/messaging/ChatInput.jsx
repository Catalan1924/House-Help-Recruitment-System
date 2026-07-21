import {
  Send,
  Paperclip,
  Smile,
} from "lucide-react";

const ChatInput = () => {
  return (
    <div className="border-t p-5">

      <div className="flex items-center gap-4">

        <button>

          <Paperclip />

        </button>

        <button>

          <Smile />

        </button>

        <input
          className="flex-1 bg-gray-100 rounded-xl px-5 py-3 outline-none"
          placeholder="Type a message..."
        />

        <button className="bg-green-700 text-white p-3 rounded-xl">

          <Send />

        </button>

      </div>

    </div>
  );
};

export default ChatInput;