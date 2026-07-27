import { useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";

const AdminSettings = () => {
  const [commission, setCommission] = useState("10");
  const [minPayout, setMinPayout] = useState("1000");

  return (
    <DashboardLayout>
      <div className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-2">Platform Settings</h1>
        <p className="text-gray-500 mb-8">Configure platform parameters</p>

        <div className="bg-white rounded-2xl shadow-sm p-8 space-y-8">
          <div>
            <h3 className="font-semibold text-lg mb-4">Commission Settings</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Commission Rate (%)</label>
                <input type="number" value={commission} onChange={(e) => setCommission(e.target.value)}
                  className="w-full md:w-64 border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-600" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Minimum Payout (KES)</label>
                <input type="number" value={minPayout} onChange={(e) => setMinPayout(e.target.value)}
                  className="w-full md:w-64 border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-600" />
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Allowed Document Types</h3>
            <div className="space-y-2">
              {["National ID", "Passport", "Good Conduct Certificate", "CV/Resume", "Reference Letter"].map((doc) => (
                <label key={doc} className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded text-green-700 focus:ring-green-600" />
                  <span>{doc}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Maintenance Mode</h3>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" className="rounded text-green-700 focus:ring-green-600" />
              <span>Enable maintenance mode (disables all non-admin access)</span>
            </label>
          </div>

          <button className="bg-green-700 text-white px-8 py-3 rounded-xl hover:bg-green-800 font-semibold transition">
            Save Settings
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminSettings;
