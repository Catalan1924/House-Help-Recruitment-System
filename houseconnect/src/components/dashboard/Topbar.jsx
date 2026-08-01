import {
  Bell,
  Search,
  MessageCircle,
  Moon,
  ChevronDown,
} from "lucide-react";

const Topbar = () => {
  return (
    <header className="bg-white border-b h-20 px-8 flex items-center justify-between">

      {/* Left */}
      <div>

        <h1 className="text-3xl font-bold">
          Dashboard
        </h1>

        <p className="text-gray-500">
          Good morning, Mary 
        </p>

      </div>

      {/* Centre */}
      <div className="relative">

        <Search
          className="absolute left-4 top-4 text-gray-400"
        />

        <input
          placeholder="Search jobs..."
          className="bg-gray-100 rounded-xl pl-12 pr-5 py-3 w-96 outline-none focus:ring-2 focus:ring-green-700"
        />

      </div>

      {/* Right */}
      <div className="flex items-center gap-5">

        <button className="relative">

          <MessageCircle />

          <span className="absolute -top-2 -right-2 bg-green-700 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
            2
          </span>

        </button>

        <button className="relative">

          <Bell />

          <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
            5
          </span>

        </button>

        <button>

          <Moon />

        </button>

        <div className="flex items-center gap-3 cursor-pointer">

          <img
            src="https://i.pravatar.cc/100?img=32"
            className="w-12 h-12 rounded-full"
          />

          <div>

            <h3 className="font-semibold">

              Mary Wanjiku

            </h3>

            <p className="text-sm text-gray-500">

              House Help

            </p>

          </div>

          <ChevronDown />

        </div>

      </div>

    </header>
  );
};

export default Topbar;