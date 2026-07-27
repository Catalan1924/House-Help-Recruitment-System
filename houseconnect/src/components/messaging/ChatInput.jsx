import { Paperclip, Smile, Send, Loader2 } from "lucide-react";
import { useState } from "react";

const ChatInput = ({ onSend, disabled }) => {
  const [text, setText] = useState("");

  const handleSubmit = () => {
    if (!text.trim() || disabled) return;
    onSend(text);
    setText("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="border-t p-5 flex items-center gap-4 flex-shrink-0">
      <button className="text-gray-400 hover:text-green-700">
        <Paperclip size={22} />
      </button>
      <input
        type="text"
        placeholder="Type a message..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        className="flex-1 bg-gray-100 rounded-xl px-5 py-3 outline-none disabled:opacity-50"
      />
      <button className="text-gray-400 hover:text-green-700">
        <Smile size={22} />
      </button>
      <button
        onClick={handleSubmit}
        disabled={disabled || !text.trim()}
        className="bg-green-700 hover:bg-green-800 disabled:bg-green-400 text-white rounded-xl p-3 transition"
      >
        {disabled ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} />}
      </button>
    </div>
  );
};

export default ChatInput;
