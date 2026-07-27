import { useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import { ShieldAlert, Phone, MapPin, Clock, Send } from "lucide-react";

const WorkerEmergency = () => {
  const [sent, setSent] = useState(false);

  const handleSOS = () => {
    if (window.confirm("Are you sure you want to send an emergency alert? This will notify the admin team immediately.")) {
      setSent(true);
      setTimeout(() => setSent(false), 3000);
    }
  };

  return (
    <DashboardLayout>
      <div>
        <h1 className="text-3xl font-bold mb-2">Emergency SOS</h1>
        <p className="text-gray-500 mb-8">Quickly alert the support team in case of emergency</p>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-8 text-center">
              <ShieldAlert size={64} className="mx-auto text-red-600" />
              <h2 className="text-2xl font-bold mt-4 text-red-700">Emergency Alert</h2>
              <p className="text-red-600 mt-2">
                Press the button below to send an immediate SOS alert. Our team will contact you and dispatch help.
              </p>
              <button
                onClick={handleSOS}
                disabled={sent}
                className={`mt-6 px-12 py-5 rounded-2xl text-xl font-bold transition ${
                  sent
                    ? "bg-green-600 text-white"
                    : "bg-red-600 text-white hover:bg-red-700 animate-pulse"
                }`}
              >
                {sent ? "✓ Alert Sent!" : "🚨 SEND EMERGENCY ALERT"}
              </button>
              {sent && <p className="text-green-600 font-medium mt-3">Help is on the way. Stay calm.</p>}
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="font-semibold text-lg mb-4">Emergency Contacts</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Phone size={18} className="text-green-700" />
                  <div>
                    <p className="font-medium">HouseConnect Emergency Line</p>
                    <p className="text-gray-500">+254 700 000 999</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone size={18} className="text-blue-600" />
                  <div>
                    <p className="font-medium">National Police Service</p>
                    <p className="text-gray-500">999 / 112</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="font-semibold text-lg mb-4">Alert History</h3>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <Clock size={16} className="text-gray-400 mt-1 shrink-0" />
                  <div>
                    <p className="text-sm font-medium">SOS Alert Sent</p>
                    <p className="text-xs text-gray-400">No previous alerts</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="font-semibold text-lg mb-4">Your Location</h3>
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin size={16} />
                <span>Nairobi, Kenya</span>
              </div>
              <p className="text-xs text-gray-400 mt-2">
                Your location is automatically shared when you send an SOS alert.
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default WorkerEmergency;
