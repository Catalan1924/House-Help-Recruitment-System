import { AlertTriangle, CheckCircle2, Clock } from "lucide-react";

const MOCK_ALERTS = [
  { id: "1", worker: "Jane Muthoni", type: "SOS", message: "Emergency alert triggered", time: "2 min ago", resolved: false },
  { id: "2", worker: "Susan Akinyi", type: "Check-in", message: "Missed scheduled check-in", time: "1 hour ago", resolved: false },
  { id: "3", worker: "Grace Wambui", type: "SOS", message: "Resolved emergency", time: "2 days ago", resolved: true },
];

const AdminAlerts = () => {
  return (
      <div>
        <h1 className="text-3xl font-bold mb-2">Emergency Alerts</h1>
        <p className="text-gray-500 mb-8">Monitor and respond to emergency alerts</p>

        <div className="space-y-4">
          {MOCK_ALERTS.map((alert) => (
            <div key={alert.id} className={`bg-white rounded-2xl shadow-sm p-6 border-l-4 ${alert.resolved ? "border-green-500" : "border-red-500"}`}>
              <div className="flex items-start justify-between">
                <div className="flex gap-4">
                  <div className={`p-3 rounded-xl ${alert.resolved ? "bg-green-100" : "bg-red-100"}`}>
                    {alert.resolved ? <CheckCircle2 className="text-green-700" size={24} /> : <AlertTriangle className="text-red-600" size={24} />}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-lg">{alert.worker}</h3>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${alert.resolved ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                        {alert.type}
                      </span>
                    </div>
                    <p className="text-gray-600 mt-1">{alert.message}</p>
                    <p className="text-sm text-gray-400 mt-2 flex items-center gap-1">
                      <Clock size={14} /> {alert.time}
                    </p>
                  </div>
                </div>
                {!alert.resolved && (
                  <button className="px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800 text-sm font-medium">
                    Respond
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
  );
};

export default AdminAlerts;
