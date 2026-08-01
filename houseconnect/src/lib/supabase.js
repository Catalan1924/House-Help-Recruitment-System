import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const isConfigured = supabaseUrl && supabaseAnonKey;

if (!isConfigured) {
  console.warn(
    "⚠️ Supabase not configured. Copy .env.example to .env and fill in your Supabase project URL and anon key.\n" +
    "   The app will load but API calls will fail until Supabase is connected."
  );
}

// Create the client even with placeholder values so the app can render.
// The auth and data calls will fail gracefully at runtime if unconfigured.
export const supabase = createClient(
  supabaseUrl || "https://placeholder.supabase.co",
  supabaseAnonKey || "placeholder-key",
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  }
);