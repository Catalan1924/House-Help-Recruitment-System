import { useEffect, useState } from "react";
import {
  MapPin,
  BadgeCheck,
  Star,
  Camera,
  Loader2,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { supabase } from "../../lib/supabase";

const ProfileHeader = () => {
  const { user, userRole } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const load = async () => {
      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();
      setProfile(data);
      setLoading(false);
    };
    load();
  }, [user]);

  if (loading) {
    return (
      <div className="bg-white rounded-3xl shadow p-8 flex items-center justify-center min-h-[200px]">
        <Loader2 className="animate-spin text-green-700" size={32} />
      </div>
    );
  }

  const metadata = user?.user_metadata || {};
  const avatarUrl = metadata.avatar_url || profile?.avatar_url || null;
  const displayName =
    metadata.full_name || profile?.full_name || user?.email?.split("@")[0] || "Worker";
  const county = profile?.county || metadata.county || "Nairobi";
  const town = profile?.town || metadata.town || "";
  const location = town ? `${town}, ${county}` : county;
  const specialty = profile?.specialty || metadata.specialty || "Professional House Help";
  const rating = profile?.rating ?? null;
  const reviewCount = profile?.reviews_count ?? null;
  const verified = profile?.verified ?? false;

  // Compute actual profile completion (subset of ProfileCompletion.jsx fields)
  const fields = [
    metadata.full_name || profile?.full_name,
    profile?.phone || metadata.phone,
    profile?.county || metadata.county,
    profile?.specialty || metadata.specialty,
    profile?.avatar_url || metadata.avatar_url,
    profile?.id_verified,
  ];
  const filled = fields.filter(Boolean).length;
  const completionPct = Math.round((filled / fields.length) * 100);

  return (
    <div className="bg-white rounded-3xl shadow p-8">
      <div className="flex flex-col lg:flex-row justify-between gap-8">
        <div className="flex gap-6">
          <div className="relative">
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt=""
                className="w-36 h-36 rounded-full object-cover"
              />
            ) : (
              <div className="w-36 h-36 rounded-full bg-green-700 text-white flex items-center justify-center font-bold text-4xl">
                {displayName.charAt(0).toUpperCase()}
              </div>
            )}
            <button className="absolute bottom-0 right-0 bg-green-700 text-white p-3 rounded-full">
              <Camera size={18} />
            </button>
          </div>

          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-4xl font-bold">{displayName}</h1>
              {verified && <BadgeCheck className="text-blue-600" />}
            </div>
            <p className="text-xl text-green-700 mt-2 capitalize">{specialty}</p>
            <div className="flex items-center gap-2 mt-4">
              <MapPin size={18} />
              {location}
            </div>
            {rating != null && (
              <div className="flex items-center gap-2 mt-4">
                <Star fill="#FACC15" className="text-yellow-400" />
                {rating.toFixed(1)}
                {reviewCount != null && ` (${reviewCount} Reviews)`}
              </div>
            )}
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-5xl font-bold text-green-700">{completionPct}%</h2>
          <p className="text-gray-500 mt-2">Profile Completion</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
