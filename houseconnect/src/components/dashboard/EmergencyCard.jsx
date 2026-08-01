import { ShieldAlert, Loader2, CheckCircle } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { createEmergencyAlert } from "../../api/dashboard";

const EmergencyCard = () => {
  const { user } = useAuth();
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(null);

  const handleSendSOS = async () => {
    if (!user?.id) return;
    setSending(true);
    setError(null);
    try {
      await createEmergencyAlert({
        user_id: user.id,
        location: "Current location",
        message: "Emergency SOS triggered from dashboard",
      });
      setSent(true);
      setTimeout(() => setSent(false), 5000);
    } catch (err) {
      setError(err.message || "Failed to send alert");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-full bg-red-600 text-white flex items-center justify-center">
          <ShieldAlert size={28} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-red-700">Emergency SOS</h2>
          <p className="text-gray-600 mt-2">
            Feeling unsafe? Send an emergency alert to the administrator immediately.
          </p>
        </div>
      </div>

      {error && (
        <p className="mt-4 text-red-600 text-sm bg-red-100 rounded-lg p-3">{error}</p>
      )}

      {sent && (
        <div className="mt-4 flex items-center gap-2 text-green-700 bg-green-100 rounded-lg p-3">
          <CheckCircle size={20} />
          <span className="text-sm font-medium">Emergency alert sent. Help is on the way.</span>
        </div>
      )}

      <button
        onClick={handleSendSOS}
        disabled={sending || sent}
        className="mt-8 w-full bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white py-4 rounded-xl font-semibold transition flex items-center justify-center gap-2"
      >
        {sending ? (
          <>
            <Loader2 size={20} className="animate-spin" />
            Sending...
          </>
        ) : sent ? (
          "Alert Sent ✅"
        ) : (
          "Send Emergency Alert"
        )}
      </button>
    </div>
  );
};

export default EmergencyCard;
