import {
  Bell,
  Search,
  MessageCircle,
  Moon,
  ChevronDown,
  Loader2,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useUnreadCount } from "../../hooks/useNotifications";

const roleLabels = {
  worker: "House Help",
  employer: "Employer",
  admin: "Admin",
};

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
};

const Topbar = () => {
  const navigate = useNavigate();
  const { user, userRole } = useAuth();
  const { data: unreadCount, isLoading: countLoading } = useUnreadCount(user?.id);
  const [theme, setTheme] = useState("light");

  const displayName =
    user?.user_metadata?.full_name ||
    user?.email?.split("@")[0] ||
    "User";

  const roleLabel = roleLabels[userRole] || "User";
  const avatarUrl = user?.user_metadata?.avatar_url || null;

  const handleMessages = () => {
    if (user && userRole) {
      navigate(`/${userRole}/messages`);
    } else {
      navigate("/login");
    }
  };

  const handleNotifications = () => {
    if (user && userRole) {
      navigate(`/${userRole}/dashboard`);
    } else {
      navigate("/login");
    }
  };

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    document.documentElement.classList.toggle("dark", nextTheme === "dark");
  };

  return (
    <header className="bg-white border-b h-20 px-8 flex items-center justify-between">

      {/* Left */}
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-gray-500">
          {getGreeting()}, {displayName}
        </p>
      </div>

      {/* Centre */}
      <div className="relative">
        <Search className="absolute left-4 top-4 text-gray-400" />
        <input
          placeholder="Search jobs..."
          className="bg-gray-100 rounded-xl pl-12 pr-5 py-3 w-96 outline-none focus:ring-2 focus:ring-green-700"
        />
      </div>

      {/* Right */}
      <div className="flex items-center gap-5">
        <button className="relative" onClick={handleMessages}>
          <MessageCircle />
          {/* TODO: wire up unread message count when messages hook is ready */}
        </button>

        <button className="relative" onClick={handleNotifications}>
          <Bell />
          {(!countLoading && unreadCount > 0) && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {unreadCount > 99 ? "99+" : unreadCount}
            </span>
          )}
        </button>

        <button onClick={toggleTheme}>
          <Moon />
        </button>

        <div className="flex items-center gap-3 cursor-pointer">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={displayName}
              className="w-12 h-12 rounded-full object-cover"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-green-700 text-white flex items-center justify-center font-bold text-lg">
              {displayName.charAt(0).toUpperCase()}
            </div>
          )}

          <div>
            <h3 className="font-semibold">{displayName}</h3>
            <p className="text-sm text-gray-500">{roleLabel}</p>
          </div>

          <ChevronDown />
        </div>
      </div>
    </header>
  );
};

export default Topbar;
