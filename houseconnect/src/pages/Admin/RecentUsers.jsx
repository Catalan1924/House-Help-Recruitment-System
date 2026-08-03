import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Users, Clock, AlertCircle } from "lucide-react";

import { getRecentUsers } from "../../api/admin";
import { LoadingRow } from "../../components/LoadingSkeleton";

const roleColors = {
  worker: "text-blue-600 bg-blue-50",
  employer: "text-purple-600 bg-purple-50",
  admin: "text-gray-600 bg-gray-100",
};

const RecentUsers = () => {
  const { data: users, isLoading, isError } = useQuery({
    queryKey: ["admin-recent-users"],
    queryFn: () => getRecentUsers(8),
    staleTime: 60_000,
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Recent Users</h1>
          <p className="text-gray-500 mt-1">Latest platform registrations</p>
        </div>
        <Link
          to="/admin/users"
          className="text-sm font-medium text-green-700 hover:text-green-800 flex items-center gap-1"
        >
          View all <Users size={14} />
        </Link>
      </div>

      {isLoading ? (
        <div className="bg-white rounded-2xl border p-6 space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <LoadingRow key={i} />
          ))}
        </div>
      ) : isError ? (
        <div className="bg-white rounded-2xl border border-red-200 p-6 text-center">
          <AlertCircle size={24} className="mx-auto text-red-500 mb-2" />
          <p className="text-red-600 text-sm">Failed to load recent users</p>
        </div>
      ) : !users?.length ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
          <Users size={32} className="mx-auto text-gray-300 mb-3" />
          <p className="text-gray-500">No users registered yet.</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          <div className="divide-y">
            {users.map((user) => (
              <div key={user.id} className="flex items-center justify-between p-5 hover:bg-gray-50 transition">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-semibold text-sm flex-shrink-0">
                    {user.full_name?.charAt(0)?.toUpperCase() || "?"}
                  </div>
                  <div>
                    <p className="font-medium text-slate-800">{user.full_name}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${roleColors[user.role] || "bg-gray-100 text-gray-600"}`}>
                    {user.role}
                  </span>
                  <span className="text-xs text-gray-400 flex items-center gap-1">
                    <Clock size={12} />
                    {new Date(user.created_at).toLocaleDateString("en", { month: "short", day: "numeric" })}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RecentUsers;
