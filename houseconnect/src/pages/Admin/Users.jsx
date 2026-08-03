import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Search,
  Filter,
  Shield,
  ShieldOff,
  Trash2,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  UserX,
  UserCheck,
} from "lucide-react";

import { getAllUsers, updateUserStatus, deleteUser } from "../../api/admin";
import { LoadingRow } from "../../components/LoadingSkeleton";

const statusColors = {
  active: "bg-green-100 text-green-800",
  suspended: "bg-red-100 text-red-800",
  deactivated: "bg-gray-100 text-gray-600",
};
const roleColors = {
  worker: "bg-blue-100 text-blue-800",
  employer: "bg-purple-100 text-purple-800",
  admin: "bg-gray-100 text-gray-800",
};

const AdminUsers = () => {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [actionError, setActionError] = useState(null);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["admin-users", page, search, roleFilter, statusFilter],
    queryFn: () =>
      getAllUsers({
        page,
        limit: 15,
        role: roleFilter || undefined,
        status: statusFilter || undefined,
        search: search || undefined,
      }),
    keepPreviousData: true,
  });

  const statusMutation = useMutation({
    mutationFn: ({ userId, newStatus }) => updateUserStatus(userId, newStatus),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
      setActionError(null);
    },
    onError: (err) => setActionError(err.message),
  });

  const deleteMutation = useMutation({
    mutationFn: (userId) => deleteUser(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
      setConfirmDelete(null);
      setActionError(null);
    },
    onError: (err) => setActionError(err.message),
  });

  const users = data?.users || [];
  const total = data?.total || 0;
  const totalPages = Math.ceil(total / 15);

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">Users</h1>
          <p className="text-gray-500 mt-1">
            Manage {total.toLocaleString()} platform users
          </p>
        </div>
      </div>

      {actionError && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 flex items-center gap-2">
          <AlertCircle size={18} />
          {actionError}
          <button onClick={() => setActionError(null)} className="ml-auto text-red-500 hover:text-red-700">×</button>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200">
        {/* Filters */}
        <div className="p-6 border-b flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-3 top-3.5 text-gray-400" />
            <input
              placeholder="Search by name or email..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              className="w-full pl-10 pr-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>
          <select
            value={roleFilter}
            onChange={(e) => { setRoleFilter(e.target.value); setPage(1); }}
            className="px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-green-600 text-sm"
          >
            <option value="">All roles</option>
            <option value="worker">Worker</option>
            <option value="employer">Employer</option>
            <option value="admin">Admin</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
            className="px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-green-600 text-sm"
          >
            <option value="">All status</option>
            <option value="active">Active</option>
            <option value="suspended">Suspended</option>
            <option value="deactivated">Deactivated</option>
          </select>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 text-left">
              <tr>
                <th className="p-4 font-medium text-sm text-gray-600">User</th>
                <th className="p-4 font-medium text-sm text-gray-600">Role</th>
                <th className="p-4 font-medium text-sm text-gray-600">County</th>
                <th className="p-4 font-medium text-sm text-gray-600">Status</th>
                <th className="p-4 font-medium text-sm text-gray-600">Joined</th>
                <th className="p-4 font-medium text-sm text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="border-t">
                    <td colSpan={6} className="p-4"><LoadingRow /></td>
                  </tr>
                ))
              ) : isError ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-red-500">
                    <AlertCircle size={24} className="mx-auto mb-2" />
                    Failed to load users: {error?.message}
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-gray-400">
                    No users found.
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user.id} className="border-t hover:bg-gray-50 transition">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-semibold text-sm">
                          {user.full_name?.charAt(0)?.toUpperCase() || "?"}
                        </div>
                        <div>
                          <p className="font-medium text-slate-800">{user.full_name}</p>
                          <p className="text-sm text-gray-500">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${roleColors[user.role] || "bg-gray-100 text-gray-800"}`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="p-4 text-gray-600">{user.county || "—"}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[user.status] || "bg-gray-100 text-gray-800"}`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="p-4 text-gray-500 text-sm">
                      {new Date(user.created_at).toLocaleDateString("en", { year: "numeric", month: "short", day: "numeric" })}
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() =>
                            statusMutation.mutate({
                              userId: user.id,
                              newStatus: user.status === "suspended" ? "active" : "suspended",
                            })
                          }
                          disabled={statusMutation.isLoading}
                          className="p-2 rounded-lg hover:bg-gray-100 transition"
                          title={user.status === "suspended" ? "Activate" : "Suspend"}
                        >
                          {user.status === "suspended" ? (
                            <UserCheck size={16} className="text-green-600" />
                          ) : (
                            <UserX size={16} className="text-orange-500" />
                          )}
                        </button>
                        <button
                          onClick={() => setConfirmDelete(user.id)}
                          className="p-2 rounded-lg hover:bg-red-50 transition"
                          title="Delete"
                        >
                          <Trash2 size={16} className="text-red-500" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="p-4 border-t flex items-center justify-between">
            <p className="text-sm text-gray-500">
              Page {page} of {totalPages} · {total} users
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="p-2 rounded-lg border hover:bg-gray-50 disabled:opacity-40"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="p-2 rounded-lg border hover:bg-gray-50 disabled:opacity-40"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {confirmDelete && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl">
            <h3 className="text-lg font-semibold mb-2">Delete user?</h3>
            <p className="text-gray-500 mb-6">
              This action is permanent and cannot be undone. All associated data will be removed.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setConfirmDelete(null)}
                className="px-4 py-2 border rounded-xl hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => deleteMutation.mutate(confirmDelete)}
                disabled={deleteMutation.isLoading}
                className="px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 disabled:opacity-50"
              >
                {deleteMutation.isLoading ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUsers;
