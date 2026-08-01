import { supabase } from "../lib/supabase";

/**
 * Get the role for a user.
 *
 * Tries the current_user_role() RPC first (SECURITY DEFINER, no RLS issues).
 * Falls back to a direct profiles query for older DBs without the RPC.
 */
export const getUserRole = async (userId) => {
  // Primary: use the RPC function (bypasses RLS, avoids recursion)
  try {
    const { data, error } = await supabase.rpc("current_user_role");
    if (!error && data) return data;
  } catch {
    // RPC not available — fall through to direct query
  }

  // Fallback: direct profiles query (may fail with RLS issues on old DBs)
  const { data, error } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", userId)
    .single();

  if (error) throw error;
  return data.role;
};
