import { supabase } from "../lib/supabase";

/*
=========================================
WAIT FOR PROFILE
=========================================
*/

async function waitForProfile(userId, retries = 10, delay = 500) {
  for (let i = 0; i < retries; i++) {
    const { data } = await supabase
      .from("profiles")
      .select("id")
      .eq("id", userId)
      .maybeSingle();

    if (data) {
      return true;
    }

    await new Promise((resolve) => setTimeout(resolve, delay));
  }

  return false;
}

/*
=========================================
UPDATE PROFILE
=========================================
*/

export async function updateProfile(userId, profile) {
  const exists = await waitForProfile(userId);

  if (!exists) {
    throw new Error(
      "Profile could not be found after registration."
    );
  }

  const { data, error } = await supabase
    .from("profiles")
    .update({
      full_name: profile.fullName,
      role: profile.role,
      phone: profile.phone,
      county: profile.county,
      town: profile.town,
    })
    .eq("id", userId)
    .select()
    .single();

  if (error) throw error;

  return data;
}

/*
=========================================
GET PROFILE
=========================================
*/

export async function getProfile(userId) {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) throw error;

  return data;
}

/*
=========================================
CREATE WORKER PROFILE
=========================================
*/

export async function createWorkerProfile(profileId) {
  const { data, error } = await supabase
    .from("workers")
    .insert({
      profile_id: profileId,
      bio: "",
      experience: 0,
      expected_salary: 0,
      availability: "available",
      preferred_job_type: "",
      skills: [],
      languages: [],
      rating: 0,
      total_reviews: 0,
      verified: false,
    })
    .select()
    .single();

  if (error) throw error;

  return data;
}

/*
=========================================
GET WORKER PROFILE
=========================================
*/

export async function getWorkerProfile(profileId) {
  const { data, error } = await supabase
    .from("workers")
    .select("*")
    .eq("profile_id", profileId)
    .single();

  if (error) throw error;

  return data;
}

/*
=========================================
UPDATE WORKER PROFILE
=========================================
*/

export async function updateWorkerProfile(profileId, updates) {
  const { data, error } = await supabase
    .from("workers")
    .update(updates)
    .eq("profile_id", profileId)
    .select()
    .single();

  if (error) throw error;

  return data;
}

/*
=========================================
CREATE EMPLOYER PROFILE
=========================================
*/

export async function createEmployerProfile(profileId) {
  const { data, error } = await supabase
    .from("employers")
    .insert({
      profile_id: profileId,
      household_name: "",
      address: "",
      verified: false,
    })
    .select()
    .single();

  if (error) throw error;

  return data;
}

/*
=========================================
GET EMPLOYER PROFILE
=========================================
*/

export async function getEmployerProfile(profileId) {
  const { data, error } = await supabase
    .from("employers")
    .select("*")
    .eq("profile_id", profileId)
    .single();

  if (error) throw error;

  return data;
}

/*
=========================================
UPDATE EMPLOYER PROFILE
=========================================
*/

export async function updateEmployerProfile(profileId, updates) {
  const { data, error } = await supabase
    .from("employers")
    .update(updates)
    .eq("profile_id", profileId)
    .select()
    .single();

  if (error) throw error;

  return data;
}
/*
=========================================
GET EMPLOYER BY PROFILE ID
=========================================
*/

export async function getEmployerByProfileId(profileId) {
  const { data, error } = await supabase
    .from("employers")
    .select("*")
    .eq("profile_id", profileId)
    .single();

  if (error) throw error;

  return data;
}