import {
  LayoutDashboard,
  Briefcase,
  FileText,
  MessageCircle,
  Bell,
  User,
  ShieldAlert,
  Settings,
  Search,
  Users,
  CheckCircle,
  BarChart3,
  AlertTriangle,
  MessageSquare,
  CreditCard,
  Heart,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const menuConfig = {
  worker: [
    { title: "Dashboard", icon: LayoutDashboard, path: "/worker/dashboard" },
    { title: "Find Jobs", icon: Search, path: "/worker/jobs" },
    { title: "My Applications", icon: FileText, path: "/worker/applications" },
    { title: "Messages", icon: MessageCircle, path: "/worker/messages" },
    { title: "Profile", icon: User, path: "/worker/profile" },
    { title: "Emergency SOS", icon: ShieldAlert, path: "/worker/emergency" },
    { title: "Settings", icon: Settings, path: "/worker/settings" },
  ],
  employer: [
    { title: "Dashboard", icon: LayoutDashboard, path: "/employer/dashboard" },
    { title: "Post a Job", icon: Briefcase, path: "/employer/post-job" },
    { title: "Find Workers", icon: Users, path: "/employer/find-workers" },
    { title: "Applicants", icon: FileText, path: "/employer/applicants" },
    { title: "Messages", icon: MessageCircle, path: "/employer/messages" },
    { title: "Saved Workers", icon: Heart, path: "/employer/workers" },
    { title: "Payments", icon: CreditCard, path: "/employer/payments" },
    { title: "Settings", icon: Settings, path: "/employer/settings" },
  ],
  admin: [
    { title: "Dashboard", icon: LayoutDashboard, path: "/admin/dashboard" },
    { title: "Users", icon: Users, path: "/admin/users" },
    { title: "Verifications", icon: CheckCircle, path: "/admin/verification-queue" },
    { title: "Emergencies", icon: AlertTriangle, path: "/admin/emergency-alerts" },
    { title: "Analytics", icon: BarChart3, path: "/admin/analytics" },
    { title: "Feedback", icon: MessageSquare, path: "/admin/feedback" },
    { title: "Settings", icon: Settings, path: "/admin/settings" },
  ],
};

const roleLabels = {
  worker: "House Help",
  employer: "Employer",
  admin: "Admin",
};

const Sidebar = () => {
  const { user, userRole, signOut } = useAuth();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const role = userRole || "worker";
  const menu = menuConfig[role] || menuConfig.worker;

  const displayName =
    user?.user_metadata?.full_name ||
    user?.email?.split("@")[0] ||
    "User";

  const avatarUrl = user?.user_metadata?.avatar_url || null;

  const handleLogout = async () => {
    await signOut();
    navigate("/", { replace: true });
  };

  return (
    <aside
      className={`${
        collapsed ? "w-24" : "w-72"
      } bg-white border-r transition-all duration-300 flex flex-col min-h-screen`}
    >
      {/* Logo */}
      <div className="h-20 border-b flex items-center justify-between px-6">
        {!collapsed && (
          <div>
            <h1 className="text-2xl font-bold text-green-700">HouseConnect</h1>
            <p className="text-xs text-gray-500">Kenya</p>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded-lg hover:bg-gray-100"
        >
          {collapsed ? <ChevronRight /> : <ChevronLeft />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-5 space-y-3 overflow-y-auto">
        {menu.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.title}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-4 p-4 rounded-xl transition ${
                  isActive
                    ? "bg-green-700 text-white"
                    : "hover:bg-green-50"
                }`
              }
            >
              <Icon size={22} />
              {!collapsed && item.title}
            </NavLink>
          );
        })}
      </nav>

      {/* User */}
      <div className="border-t p-5">
        <div className="flex items-center gap-3">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={displayName}
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-green-700 text-white flex items-center justify-center font-bold text-lg shrink-0">
              {displayName.charAt(0).toUpperCase()}
            </div>
          )}
          {!collapsed && (
            <div className="min-w-0 flex-1">
              <h3 className="font-semibold truncate">
                {displayName}
              </h3>
              <p className="text-sm text-gray-500">
                {roleLabels[role] || role}
              </p>
            </div>
          )}
          {!collapsed && (
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-red-600 hover:text-red-700 transition text-sm shrink-0"
            >
              <LogOut size={18} />
              Logout
            </button>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
