const ConversationCard = ({ conversation }) => {
  return (
    <button className="w-full p-5 hover:bg-green-50 border-b transition">

      <div className="flex justify-between">

        <div className="flex gap-4">

          <div className="relative">

            <img
              src={`https://i.pravatar.cc/150?u=${conversation.id}`}
              className="w-14 h-14 rounded-full"
            />

            {conversation.online && (

              <span className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white"/>

            )}

          </div>

          <div className="text-left">

            <h3 className="font-bold">
              {conversation.name}
            </h3>

            <p className="text-gray-500 text-sm">
              {conversation.lastMessage}
            </p>

          </div>

        </div>

        <div className="text-right">

          <p className="text-xs text-gray-400">
            {conversation.time}
          </p>

          {conversation.unread > 0 && (

            <span className="inline-flex mt-2 w-6 h-6 rounded-full bg-green-700 text-white text-xs items-center justify-center">

              {conversation.unread}

            </span>

          )}

        </div>

      </div>

    </button>
  );
};

export default ConversationCard;