import { UserCircle2, Mail, Phone, Briefcase, Loader2, MapPin, Star, Clock } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const Profile = () => {
  const { user, userRole } = useAuth();
  const email = user?.email || "—";
  const metadata = user?.user_metadata || {};
  const name = metadata.full_name || metadata.name || "Worker";
  const avatarUrl = metadata.avatar_url || null;

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-4">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt=""
              className="h-16 w-16 rounded-full object-cover"
            />
          ) : (
            <div className="rounded-full bg-green-100 p-3">
              <UserCircle2 className="h-8 w-8 text-green-700" />
            </div>
          )}
          <div>
            <h2 className="text-xl font-semibold">{name}</h2>
            <p className="text-sm text-slate-500 capitalize">{userRole || "worker"} profile</p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="mb-4 font-semibold">Contact Information</h3>
          <div className="space-y-3 text-sm text-slate-600">
            <p className="flex items-center gap-2">
              <Mail className="h-4 w-4" /> {email}
            </p>
            <p className="flex items-center gap-2">
              <Phone className="h-4 w-4" /> {metadata.phone || "+254 700 000 000"}
            </p>
            <p className="flex items-center gap-2">
              <Briefcase className="h-4 w-4" /> {metadata.specialty || "Housekeeping Specialist"}
            </p>
            <p className="flex items-center gap-2">
              <MapPin className="h-4 w-4" /> {metadata.county || "Nairobi"}
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="mb-4 font-semibold">Availability</h3>
          <div className="space-y-3 text-sm text-slate-600">
            <p className="flex items-center gap-2">
              <Clock className="h-4 w-4" /> Available for full-time and weekend work
            </p>
            <p className="flex items-center gap-2">
              <Star className="h-4 w-4" /> Experience: {metadata.experience || "2+ years"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
