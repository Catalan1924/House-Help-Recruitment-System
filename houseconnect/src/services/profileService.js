import { supabase } from "../lib/supabase";

export const createProfile = async (user, form) => {
  const { error } = await supabase
    .from("profiles")
    .insert({
      id: user.id,
      full_name: form.fullName,
      email: user.email,
      phone: form.phone,
      county: form.county,
      town: form.town,
      role: form.role,
      status: "pending",
    });

  if (error) throw error;
};

export const createWorkerProfile = async (userId) => {
  const { error } = await supabase
    .from("house_help_profiles")
    .insert({
      user_id: userId,
      bio: "",
      experience: 0,
      expected_salary: 0,
      availability: "Available",
      preferred_job_type: "",
      skills: [],
      languages: [],
    });

  if (error) throw error;
};

export const createEmployerProfile = async (userId) => {
  const { error } = await supabase
    .from("employer_profiles")
    .insert({
      user_id: userId,
      company_name: "",
      address: "",
      verified: false,
    });

  if (error) throw error;
};