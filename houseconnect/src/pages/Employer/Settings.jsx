import { useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";

const EmployerSettings = () => {
  const [form, setForm] = useState({ companyName: "", contactPhone: "", contactEmail: "", address: "", notifications: true });

  return (
    <DashboardLayout>
      <div className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-2">Account Settings</h1>
        <p className="text-gray-500 mb-8">Manage your employer profile and preferences</p>

        <div className="bg-white rounded-2xl shadow-sm p-8 space-y-6">
          <div>
            <h3 className="font-semibold text-lg mb-4">Profile Information</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Company/Name</label>
                <input value={form.companyName} onChange={(e) => setForm((p) => ({ ...p, companyName: e.target.value }))}
                  className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-600" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Phone</label>
                <input value={form.contactPhone} onChange={(e) => setForm((p) => ({ ...p, contactPhone: e.target.value }))}
                  className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-600" />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium mb-1">Email</label>
                <input type="email" value={form.contactEmail} onChange={(e) => setForm((p) => ({ ...p, contactEmail: e.target.value }))}
                  className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-600" />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium mb-1">Address</label>
                <input value={form.address} onChange={(e) => setForm((p) => ({ ...p, address: e.target.value }))}
                  className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-600" />
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Notifications</h3>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={form.notifications} onChange={(e) => setForm((p) => ({ ...p, notifications: e.target.checked }))}
                className="rounded text-green-700 focus:ring-green-600" />
              <span>Receive email notifications for new applicants and messages</span>
            </label>
          </div>

          <button className="bg-green-700 text-white px-8 py-3 rounded-xl hover:bg-green-800 font-semibold transition">
            Save Changes
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default EmployerSettings;
