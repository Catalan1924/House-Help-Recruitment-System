import { CircleCheckBig, Loader2 } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../lib/supabase";

const fetchProfileCompletion = async (userId) => {
  const { data: profile, error } = await supabase
    .from("profiles")
    .select("full_name, phone, county, avatar_url, role")
    .eq("id", userId)
    .single();

  if (error) throw error;

  // Map of profile fields to check
  const checks = [
    { label: "Full Name", complete: !!profile?.full_name },
    { label: "Phone Number", complete: !!profile?.phone },
    { label: "County / Location", complete: !!profile?.county },
    { label: "Profile Picture", complete: !!profile?.avatar_url },
  ];

  const completed = checks.filter((c) => c.complete).length;
  const progress = Math.round((completed / checks.length) * 100);

  return { progress, checks };
};

const ProfileCompletion = () => {
  const { user } = useAuth();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["profileCompletion", user?.id],
    queryFn: () => fetchProfileCompletion(user.id),
    enabled: !!user?.id,
  });

  const progress = data?.progress ?? 0;
  const checks = data?.checks ?? [];

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Profile Completion</h2>
        <div className="flex items-center justify-center py-8">
          <Loader2 className="animate-spin text-green-700" size={32} />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold">Profile Completion</h2>
          <p className="text-gray-500 mt-2">
            Complete your profile to increase your chances of getting hired.
          </p>
        </div>

        <div className="relative">
          <svg
            className="w-28 h-28 rotate-[-90deg]"
            viewBox="0 0 100 100"
          >
            <circle
              cx="50"
              cy="50"
              r="42"
              stroke="#E5E7EB"
              strokeWidth="8"
              fill="none"
            />
            <circle
              cx="50"
              cy="50"
              r="42"
              stroke="#15803D"
              strokeWidth="8"
              fill="none"
              strokeDasharray="264"
              strokeDashoffset={264 - (264 * progress) / 100}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-bold">{progress}%</span>
          </div>
        </div>
      </div>

      {isError && (
        <p className="text-red-500 mt-6">Failed to load profile data.</p>
      )}

      {!isLoading && !isError && (
        <div className="mt-8 space-y-4">
          {checks.map((check) => (
            <div key={check.label} className="flex justify-between">
              <div className="flex gap-3">
                <CircleCheckBig
                  className={check.complete ? "text-green-700" : "text-gray-300"}
                />
                {check.label}
              </div>
              {check.complete ? "✅" : "❌"}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProfileCompletion;
