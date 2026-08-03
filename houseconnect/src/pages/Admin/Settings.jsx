import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Save, Loader2, CheckCircle2, AlertCircle } from "lucide-react";

import { getPlatformSettings, updatePlatformSettings } from "../../api/admin";

const DOC_OPTIONS = [
  { key: "id_card", label: "National ID" },
  { key: "good_conduct", label: "Good Conduct Certificate" },
  { key: "reference_letter", label: "Reference Letter" },
  { key: "medical_report", label: "Medical Report" },
  { key: "other", label: "Other Documents" },
];

const AdminSettings = () => {
  const [commission, setCommission] = useState("10");
  const [minPayout, setMinPayout] = useState("1000");
  const [allowedDocs, setAllowedDocs] = useState(["id_card", "good_conduct", "reference_letter", "medical_report", "other"]);
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [saved, setSaved] = useState(false);

  const { data: settings, isLoading } = useQuery({
    queryKey: ["platform-settings"],
    queryFn: getPlatformSettings,
    staleTime: 5 * 60_000,
  });

  useEffect(() => {
    if (settings) {
      setCommission(String(settings.commission_rate || 10));
      setMinPayout(String(settings.min_payout || 1000));
      setAllowedDocs(settings.allowed_documents || DOC_OPTIONS.map((d) => d.key));
      setMaintenanceMode(settings.maintenance_mode || false);
    }
  }, [settings]);

  const saveMutation = useMutation({
    mutationFn: () =>
      updatePlatformSettings({
        commission_rate: parseInt(commission, 10) || 10,
        min_payout: parseInt(minPayout, 10) || 1000,
        allowed_documents: allowedDocs,
        maintenance_mode: maintenanceMode,
      }),
    onSuccess: () => {
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    },
  });

  const toggleDoc = (key) => {
    setAllowedDocs((prev) =>
      prev.includes(key) ? prev.filter((d) => d !== key) : [...prev, key]
    );
  };

  if (isLoading) {
    return (
      <div className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-2">Platform Settings</h1>
        <div className="bg-white rounded-2xl shadow-sm p-8 animate-pulse space-y-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-20 bg-gray-100 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Platform Settings</h1>
          <p className="text-gray-500 mt-1">Configure platform-wide parameters</p>
        </div>
        {saved && (
          <span className="flex items-center gap-2 text-sm text-green-700 bg-green-50 px-3 py-2 rounded-xl">
            <CheckCircle2 size={16} /> Saved
          </span>
        )}
      </div>

      {saveMutation.isError && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 flex items-center gap-2">
          <AlertCircle size={18} />
          Failed to save: {saveMutation.error?.message}
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 space-y-8">
        {/* Commission */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Commission Settings</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Commission Rate (%)</label>
              <input
                type="number"
                value={commission}
                onChange={(e) => setCommission(e.target.value)}
                min="0"
                max="100"
                className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-600"
              />
              <p className="text-xs text-gray-400 mt-1">Percentage taken from each transaction</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Minimum Payout (KES)</label>
              <input
                type="number"
                value={minPayout}
                onChange={(e) => setMinPayout(e.target.value)}
                min="0"
                className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-600"
              />
              <p className="text-xs text-gray-400 mt-1">Smallest amount a worker can withdraw</p>
            </div>
          </div>
        </div>

        {/* Allowed Documents */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Allowed Document Types</h3>
          <div className="space-y-2">
            {DOC_OPTIONS.map((doc) => (
              <label key={doc.key} className="flex items-center gap-3 cursor-pointer py-1">
                <input
                  type="checkbox"
                  checked={allowedDocs.includes(doc.key)}
                  onChange={() => toggleDoc(doc.key)}
                  className="w-4 h-4 rounded text-green-700 focus:ring-green-600"
                />
                <span className="text-gray-700">{doc.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Maintenance Mode */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Maintenance Mode</h3>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={maintenanceMode}
              onChange={(e) => setMaintenanceMode(e.target.checked)}
              className="w-4 h-4 rounded text-green-700 focus:ring-green-600"
            />
            <span className="text-gray-700">
              Enable maintenance mode
              <span className="block text-xs text-gray-400 mt-0.5">
                Disables all non-admin access to the platform
              </span>
            </span>
          </label>
        </div>

        {/* Save */}
        <button
          onClick={() => saveMutation.mutate()}
          disabled={saveMutation.isLoading}
          className="bg-green-700 text-white px-8 py-3 rounded-xl hover:bg-green-800 font-semibold transition disabled:opacity-50 flex items-center gap-2"
        >
          {saveMutation.isLoading ? (
            <>
              <Loader2 size={18} className="animate-spin" /> Saving...
            </>
          ) : (
            <>
              <Save size={18} /> Save Settings
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default AdminSettings;
