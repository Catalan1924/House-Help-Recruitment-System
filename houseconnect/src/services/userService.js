import { supabase } from "../lib/supabase";

/*
=========================================
GET USER ROLE
=========================================
*/

export async function getUserRole(userId) {
  const { data, error } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", userId)
    .single();

  if (error) throw error;

  return data.role;
}

/*
=========================================
GET COMPLETE USER PROFILE
=========================================
*/

export async function getCurrentUserProfile(userId) {
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
GET DASHBOARD ROUTE
=========================================
*/

export function getDashboardRoute(role) {
  switch (role) {
    case "worker":
      return "/worker/dashboard";

    case "employer":
      return "/employer/dashboard";

    case "admin":
      return "/admin/dashboard";

    default:
      return "/";
  }
}