import { supabase } from "../lib/supabase";

/**
 * Map experience integer (years) to the DB text enum.
 * DB CHECK: '0-1 year' | '1-3 years' | '3-5 years' | '5-10 years' | '10+ years'
 */
const mapExperienceToEnum = (years) => {
  const y = parseInt(years) || 0;
  if (y <= 0) return null;          // leave null so the DB doesn't reject
  if (y <= 1) return "0-1 year";
  if (y <= 3) return "1-3 years";
  if (y <= 5) return "3-5 years";
  if (y <= 10) return "5-10 years";
  return "10+ years";
};

export const createProfile = async (user, form) => {
  const payload = {
    id: user.id,
    email: user.email,                // REQUIRED — production has NOT NULL on this column
    full_name: form.full_name || form.fullName,
    phone: form.phone || null,
    county: form.county || null,
    town: form.town || null,
    role: form.role,
    status: "active",                 // valid CHECK value
  };

  const { error } = await supabase
    .from("profiles")
    .upsert(payload, { onConflict: "id" });

  if (error) throw error;
};

export const createWorkerProfile = async (userId, data = {}) => {
  const payload = {
    user_id: userId,
    bio: data.bio || null,
    experience: mapExperienceToEnum(data.experience_years),
    expected_salary: data.expected_salary || null,
    availability: "Available",
    skills: data.skills || [],
    preferred_job_types: data.preferred_job_types || [],  // plural, array
    age: data.age || null,
    gender: data.gender || null,
  };

  const { error } = await supabase
    .from("house_help_profiles")
    .upsert(payload, { onConflict: "user_id" });

  if (error) throw error;
};

export const createEmployerProfile = async (userId, data = {}) => {
  const payload = {
    user_id: userId,
    company_name: data.company_name || null,
    household_type: data.household_type || null,
    preferred_gender: data.preferred_gender || null,
    verified: false,
  };

  const { error } = await supabase
    .from("employer_profiles")
    .upsert(payload, { onConflict: "user_id" });

  if (error) throw error;
};
