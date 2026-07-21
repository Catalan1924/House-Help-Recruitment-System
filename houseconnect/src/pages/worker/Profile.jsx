import { UserCircle2, Mail, Phone, Briefcase } from "lucide-react";

const Profile = () => {
  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="rounded-full bg-slate-100 p-3">
            <UserCircle2 className="h-8 w-8 text-slate-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">Worker Profile</h2>
            <p className="text-sm text-slate-500">Your account details will appear here.</p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="mb-4 font-semibold">Contact Information</h3>
          <div className="space-y-3 text-sm text-slate-600">
            <p className="flex items-center gap-2"><Mail className="h-4 w-4" /> email@example.com</p>
            <p className="flex items-center gap-2"><Phone className="h-4 w-4" /> +254 700 000 000</p>
            <p className="flex items-center gap-2"><Briefcase className="h-4 w-4" /> Housekeeping Specialist</p>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="mb-4 font-semibold">Availability</h3>
          <p className="text-sm text-slate-600">Available for full-time and weekend work.</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;