import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { ShieldAlert, Phone, MapPin, Clock, CheckCircle } from "lucide-react";
import toast from "react-hot-toast";
import { createEmergencyAlert } from "../../api/dashboard";

const WorkerEmergency = () => {
  const { user } = useAuth();
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSOS = async () => {
    if (!window.confirm(
      "Are you sure you want to send an emergency alert? This will notify the admin team immediately."
    )) {
      return;
    }

    setSending(true);
    try {
      // Try to get geolocation
      let location = "Nairobi, Kenya";
      let latitude = null;
      let longitude = null;

      if (navigator.geolocation) {
        try {
          const position = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 5000 });
          });
          latitude = position.coords.latitude;
          longitude = position.coords.longitude;
          location = `${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(4)}`;
        } catch {
          // Geolocation failed, use default
        }
      }

      // Send alert to Supabase
      await createEmergencyAlert({
        user_id: user?.id,
        location,
        latitude,
        longitude,
        message: "Emergency SOS triggered by worker",
      });

      setSent(true);
      toast.success("Emergency alert sent! Help is on the way.");
      setTimeout(() => setSent(false), 5000);
    } catch (error) {
      toast.error(error.message || "Failed to send emergency alert. Please call the emergency line directly.");
      console.error("SOS error:", error);
    } finally {
      setSending(false);
    }
  };

  return (
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
              disabled={sending || sent}
              className={`mt-6 px-12 py-5 rounded-2xl text-xl font-bold transition ${
                sent
                  ? "bg-green-600 text-white cursor-default"
                  : "bg-red-600 text-white hover:bg-red-700 animate-pulse"
              } disabled:opacity-70 disabled:cursor-not-allowed`}
            >
              {sending ? (
                <span className="flex items-center gap-2 justify-center">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Sending...
                </span>
              ) : sent ? (
                <span className="flex items-center gap-2 justify-center">
                  <CheckCircle size={24} />
                  Alert Sent!
                </span>
              ) : (
                "🚨 SEND EMERGENCY ALERT"
              )}
            </button>
            {sent && (
              <p className="text-green-600 font-medium mt-3">
                Help is on the way. Stay calm. If this is a life-threatening emergency, also call 999/112.
              </p>
            )}
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
              <div className="flex items-center gap-3">
                <Phone size={18} className="text-red-600" />
                <div>
                  <p className="font-medium">Ambulance (Kenya Red Cross)</p>
                  <p className="text-gray-500">1199</p>
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
                  <p className="text-xs text-gray-400">
                    {sent ? "Just now" : "No previous alerts"}
                  </p>
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
              Your location is automatically shared when you send an SOS alert. Make sure location
              services are enabled on your device for accurate tracking.
            </p>
          </div>

          <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200">
            <h3 className="font-semibold text-blue-800 mb-2">Stay Safe</h3>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Always share your work location with a trusted contact</li>
              <li>• Keep emergency numbers saved on your phone</li>
              <li>• Trust your instincts — if something feels wrong, leave</li>
              <li>• Use the SOS button if you feel threatened</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkerEmergency;
