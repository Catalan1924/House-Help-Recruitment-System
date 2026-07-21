import { supabase } from "../lib/supabase";

export const getUserRole = async (userId) => {
  const { data, error } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", userId)
    .single();

  if (error) throw error;

  return data.role;
};