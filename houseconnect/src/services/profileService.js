import { supabase } from "../lib/supabase";

export const createProfile = async (user, form) => {
  const { error } = await supabase
    .from("profiles")
    .insert({
      id: user.id,
      full_name: form.full_name || form.fullName,
      email: user.email,
      phone: form.phone,
      county: form.county,
      town: form.town || null,
      role: form.role,
      status: "pending",
    });

  if (error) throw error;
};

export const createWorkerProfile = async (userId, data = {}) => {
  const { error } = await supabase
    .from("house_help_profiles")
    .insert({
      user_id: userId,
      bio: data.bio || "",
      experience: data.experience_years || 0,
      expected_salary: data.expected_salary || 0,
      availability: "Available",
      preferred_job_type: data.preferred_job_type || "",
      skills: data.skills || [],
      languages: data.languages || [],
      county: data.county || "",
    });

  if (error) throw error;
};

export const createEmployerProfile = async (userId, data = {}) => {
  const { error } = await supabase
    .from("employer_profiles")
    .insert({
      user_id: userId,
      company_name: data.company_name || "",
      address: data.address || "",
      county: data.county || "",
      verified: false,
    });

  if (error) throw error;
};
