import { ShieldAlert } from "lucide-react";

const EmergencyCard = () => {
  return (
    <div className="bg-red-50 border border-red-200 rounded-2xl p-6">

      <div className="flex items-center gap-4">

        <div className="w-14 h-14 rounded-full bg-red-600 text-white flex items-center justify-center">
          <ShieldAlert size={28} />
        </div>

        <div>

          <h2 className="text-2xl font-bold text-red-700">
            Emergency SOS
          </h2>

          <p className="text-gray-600 mt-2">
            Feeling unsafe? Send an emergency alert to the administrator immediately.
          </p>

        </div>

      </div>

      <button className="mt-8 w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-xl font-semibold transition">
        Send Emergency Alert
      </button>

    </div>
  );
};

export default EmergencyCard;