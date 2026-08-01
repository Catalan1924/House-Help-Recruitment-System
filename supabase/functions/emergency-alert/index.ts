// ============================================================
// HouseConnect Kenya — Emergency Alert Edge Function
// ============================================================
// Deploy: supabase functions deploy emergency-alert
//
// Called when a worker triggers an SOS alert.
// 1. Creates an emergency_alert record in the database
// 2. Notifies all admins via the notifications table
// 3. (Future) Sends SMS/email to the emergency response team
// ============================================================

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// CORS headers
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface EmergencyPayload {
  user_id: string;
  location?: string;
  latitude?: number;
  longitude?: number;
  message?: string;
}

Deno.serve(async (req: Request) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // Create authenticated Supabase client
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
      {
        global: {
          headers: { Authorization: req.headers.get("Authorization")! },
        },
      }
    );

    // Get the authenticated user
    const {
      data: { user },
      error: userError,
    } = await supabaseClient.auth.getUser();

    if (userError || !user) {
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Parse the request body
    const payload: EmergencyPayload = await req.json();

    // Verify the user is sending their own alert (or is admin)
    if (payload.user_id !== user.id) {
      // Check if user is admin
      const { data: profile } = await supabaseClient
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      if (profile?.role !== "admin") {
        return new Response(
          JSON.stringify({ error: "You can only send alerts for yourself" }),
          { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
    }

    // Create the emergency alert record
    const { data: alert, error: alertError } = await supabaseClient
      .from("emergency_alerts")
      .insert({
        user_id: payload.user_id,
        location: payload.location || "Unknown",
        latitude: payload.latitude || null,
        longitude: payload.longitude || null,
        message: payload.message || "Emergency SOS triggered",
        status: "active",
      })
      .select()
      .single();

    if (alertError) {
      console.error("Error creating alert:", alertError);
      return new Response(
        JSON.stringify({ error: alertError.message }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Note: The database trigger `trg_emergency_notify` automatically
    // creates notifications for all admins. We don't need to do it here.

    return new Response(
      JSON.stringify({
        success: true,
        alert_id: alert.id,
        message: "Emergency alert sent. Help is on the way.",
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Emergency alert function error:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
