import { useState } from "react";
import { Search, Filter, MoreVertical, Shield, ShieldOff, Trash2 } from "lucide-react";

const MOCK_USERS = [
  { id: "1", full_name: "Mary Wanjiku", email: "mary@email.com", role: "worker", county: "Nairobi", status: "active", joined: "2026-01-15" },
  { id: "2", full_name: "James Omondi", email: "james@email.com", role: "employer", county: "Mombasa", status: "active", joined: "2026-02-10" },
  { id: "3", full_name: "Alice Njeri", email: "alice@email.com", role: "worker", county: "Kiambu", status: "pending", joined: "2026-03-01" },
  { id: "4", full_name: "Peter Kamau", email: "peter@email.com", role: "employer", county: "Nakuru", status: "suspended", joined: "2025-11-20" },
];

const statusColors = { active: "bg-green-100 text-green-800", pending: "bg-yellow-100 text-yellow-800", suspended: "bg-red-100 text-red-800" };
const roleColors = { worker: "bg-blue-100 text-blue-800", employer: "bg-purple-100 text-purple-800", admin: "bg-gray-100 text-gray-800" };

const AdminUsers = () => {
  const [search, setSearch] = useState("");

  const filtered = MOCK_USERS.filter(
    (u) =>
      u.full_name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">Users</h1>
            <p className="text-gray-500 mt-1">Manage platform users</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm">
          <div className="p-6 border-b flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search size={18} className="absolute left-3 top-3.5 text-gray-400" />
              <input
                placeholder="Search users..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-green-600"
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-3 border rounded-xl hover:bg-gray-50">
              <Filter size={18} /> Filters
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 text-left">
                <tr>
                  <th className="p-4 font-medium">User</th>
                  <th className="p-4 font-medium">Role</th>
                  <th className="p-4 font-medium">County</th>
                  <th className="p-4 font-medium">Status</th>
                  <th className="p-4 font-medium">Joined</th>
                  <th className="p-4 font-medium"></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((user) => (
                  <tr key={user.id} className="border-t hover:bg-gray-50">
                    <td className="p-4">
                      <div>
                        <p className="font-medium">{user.full_name}</p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${roleColors[user.role]}`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="p-4 text-gray-600">{user.county}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[user.status]}`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="p-4 text-gray-500">{user.joined}</td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <button className="p-2 hover:bg-gray-100 rounded-lg" title="Toggle status">
                          {user.status === "suspended" ? <Shield size={16} className="text-green-600" /> : <ShieldOff size={16} className="text-red-500" />}
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-lg" title="Delete">
                          <Trash2 size={16} className="text-red-500" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
  );
};

export default AdminUsers;
