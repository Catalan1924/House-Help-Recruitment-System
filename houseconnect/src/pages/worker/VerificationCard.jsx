import {
  BadgeCheck,
  ShieldCheck
} from "lucide-react";

const VerificationCard = () => {
  return (
    <div className="bg-white rounded-2xl shadow p-8">

      <h2 className="text-xl font-bold">
        Verification
      </h2>

      <div className="space-y-5 mt-8">

        <div className="flex items-center gap-3">

          <BadgeCheck className="text-blue-600"/>

          National ID Verified

        </div>

        <div className="flex items-center gap-3">

          <ShieldCheck className="text-green-700"/>

          Good Conduct Verified

        </div>

        <div className="flex items-center gap-3">

          <ShieldCheck className="text-green-700"/>

          Phone Verified

        </div>

      </div>

    </div>
  );
};

export default VerificationCard;