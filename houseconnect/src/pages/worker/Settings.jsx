import { useState } from "react";

const WorkerSettings = () => {
  const [form, setForm] = useState({ email: "", currentPassword: "", newPassword: "", confirmPassword: "", notifications: true, smsAlerts: false });

  return (
    <div className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-2">Account Settings</h1>
        <p className="text-gray-500 mb-8">Manage your account, password, and notification preferences</p>

        <div className="space-y-8">
          <div className="bg-white rounded-2xl shadow-sm p-8">
            <h3 className="font-semibold text-lg mb-4">Change Email</h3>
            <div className="space-y-4 max-w-md">
              <div>
                <label className="block text-sm font-medium mb-1">New Email</label>
                <input type="email" value={form.email} onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                  className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-600" />
              </div>
              <button className="bg-green-700 text-white px-6 py-3 rounded-xl hover:bg-green-800 font-medium transition">Update Email</button>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-8">
            <h3 className="font-semibold text-lg mb-4">Change Password</h3>
            <div className="space-y-4 max-w-md">
              <div>
                <label className="block text-sm font-medium mb-1">Current Password</label>
                <input type="password" value={form.currentPassword} onChange={(e) => setForm((p) => ({ ...p, currentPassword: e.target.value }))}
                  className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-600" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">New Password</label>
                <input type="password" value={form.newPassword} onChange={(e) => setForm((p) => ({ ...p, newPassword: e.target.value }))}
                  className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-600" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Confirm New Password</label>
                <input type="password" value={form.confirmPassword} onChange={(e) => setForm((p) => ({ ...p, confirmPassword: e.target.value }))}
                  className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-600" />
              </div>
              <button className="bg-green-700 text-white px-6 py-3 rounded-xl hover:bg-green-800 font-medium transition">Update Password</button>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-8">
            <h3 className="font-semibold text-lg mb-4">Notifications</h3>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" checked={form.notifications} onChange={(e) => setForm((p) => ({ ...p, notifications: e.target.checked }))}
                  className="rounded text-green-700 focus:ring-green-600" />
                <span>Email notifications for new job matches and messages</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" checked={form.smsAlerts} onChange={(e) => setForm((p) => ({ ...p, smsAlerts: e.target.checked }))}
                  className="rounded text-green-700 focus:ring-green-600" />
                <span>SMS alerts for urgent job offers</span>
              </label>
            </div>
          </div>
        </div>
    </div>
  );
};

export default WorkerSettings;
