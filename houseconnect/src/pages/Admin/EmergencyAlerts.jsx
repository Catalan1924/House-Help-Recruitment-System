import { TriangleAlert } from "lucide-react";

const alerts = [
  {
    id: 1,
    worker: "Mary Wanjiku",
    location: "Karen",
    time: "5 minutes ago",
  },
];

const EmergencyAlerts = () => {
  return (
    <div className="bg-white rounded-2xl shadow p-6">

      <h2 className="text-2xl font-bold mb-6">
        Emergency Alerts
      </h2>

      {alerts.map((alert) => (

        <div
          key={alert.id}
          className="bg-red-50 border border-red-200 rounded-xl p-5"
        >

          <div className="flex items-center gap-3">

            <TriangleAlert className="text-red-600" />

            <div>

              <h3 className="font-bold">
                {alert.worker}
              </h3>

              <p className="text-gray-500">
                {alert.location}
              </p>

              <p className="text-sm text-red-600">
                {alert.time}
              </p>

            </div>

          </div>

          <button className="mt-5 w-full bg-red-600 text-white py-3 rounded-xl">
            Respond
          </button>

        </div>

      ))}

    </div>
  );
};

export default EmergencyAlerts;