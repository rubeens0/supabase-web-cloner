import { corsHeaders } from "https://esm.sh/@supabase/supabase-js@2.95.0/cors";

// Simple in-memory rate limiter (per cold start)
const attempts = new Map<string, { count: number; resetAt: number }>();
const MAX_ATTEMPTS = 10;
const WINDOW_MS = 60_000;

function rateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = attempts.get(ip);
  if (!entry || entry.resetAt < now) {
    attempts.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }
  entry.count++;
  return entry.count <= MAX_ATTEMPTS;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      "unknown";

    if (!rateLimit(ip)) {
      return new Response(
        JSON.stringify({ error: "Too many attempts. Try again later." }),
        {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    const body = await req.json().catch(() => ({}));
    const password = typeof body?.password === "string"
      ? body.password.trim().toLowerCase()
      : "";

    if (!password || password.length > 200) {
      return new Response(
        JSON.stringify({ error: "Invalid request" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    const pwRegional = (Deno.env.get("DOSSIER_PW_REGIONAL") || "").trim().toLowerCase();
    const pwNacional = (Deno.env.get("DOSSIER_PW_NACIONAL") || "").trim().toLowerCase();
    const pwInternacional = (Deno.env.get("DOSSIER_PW_INTERNACIONAL") || "").trim().toLowerCase();

    let version: "regional" | "nacional" | "internacional" | null = null;
    if (pwRegional && password === pwRegional) version = "regional";
    else if (pwNacional && password === pwNacional) version = "nacional";
    else if (pwInternacional && password === pwInternacional) version = "internacional";

    if (!version) {
      return new Response(
        JSON.stringify({ success: false }),
        {
          status: 401,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    return new Response(
      JSON.stringify({ success: true, version }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  } catch (_err) {
    return new Response(
      JSON.stringify({ error: "Server error" }),
      {
        status: 500,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      },
    );
  }
});
