import {
  LayoutDashboard,
  Briefcase,
  FileText,
  MessageCircle,
  Bell,
  User,
  ShieldAlert,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

import { useState } from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {

  const [collapsed, setCollapsed] = useState(false);

  const menu = [

    {
      title: "Dashboard",
      icon: LayoutDashboard,
      path: "/worker/dashboard",
    },

    {
      title: "Jobs",
      icon: Briefcase,
      path: "/worker/jobs",
    },

    {
      title: "Applications",
      icon: FileText,
      path: "/worker/applications",
    },

    {
      title: "Messages",
      icon: MessageCircle,
      path: "/worker/messages",
    },

    {
      title: "Notifications",
      icon: Bell,
      path: "/worker/notifications",
    },

    {
      title: "Profile",
      icon: User,
      path: "/worker/profile",
    },

    {
      title: "Emergency",
      icon: ShieldAlert,
      path: "/worker/emergency",
    },

    {
      title: "Settings",
      icon: Settings,
      path: "/worker/settings",
    },

  ];

  return (

    <aside
      className={`${
        collapsed ? "w-24" : "w-72"
      } bg-white border-r transition-all duration-300 flex flex-col`}
    >

      {/* Logo */}

      <div className="h-20 border-b flex items-center justify-between px-6">

        {!collapsed && (

          <div>

            <h1 className="text-2xl font-bold text-green-700">

              HouseConnect

            </h1>

            <p className="text-xs text-gray-500">

              Kenya

            </p>

          </div>

        )}

        <button

          onClick={() => setCollapsed(!collapsed)}

          className="p-2 rounded-lg hover:bg-gray-100"

        >

          {collapsed ? <ChevronRight/> : <ChevronLeft/>}

        </button>

      </div>

      {/* Navigation */}

      <nav className="flex-1 p-5 space-y-3">

        {menu.map((item)=>{

          const Icon = item.icon;

          return(

            <NavLink

              key={item.title}

              to={item.path}

              className={({isActive})=>

                `flex items-center gap-4 p-4 rounded-xl transition

                ${

                  isActive

                  ? "bg-green-700 text-white"

                  : "hover:bg-green-50"

                }

                `

              }

            >

              <Icon size={22}/>

              {!collapsed && item.title}

            </NavLink>

          )

        })}

      </nav>

      {/* User */}

      <div className="border-t p-5">

        <div className="flex items-center gap-3">

          <img

            src="https://i.pravatar.cc/100?img=32"

            className="w-12 h-12 rounded-full"

          />

          {!collapsed && (

            <div>

              <h3 className="font-semibold">

                Mary Wanjiku

              </h3>

              <p className="text-sm text-gray-500">

                House Help

              </p>

            </div>

          )}

        </div>

        <button className="mt-6 flex items-center gap-3 text-red-600">

          <LogOut/>

          {!collapsed && "Logout"}

        </button>

      </div>

    </aside>

  );

};

export default Sidebar;