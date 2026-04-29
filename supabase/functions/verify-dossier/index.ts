import { corsHeaders } from "https://esm.sh/@supabase/supabase-js@2.95.0/cors";

// In-memory rate limiters (per cold start)
const ipAttempts = new Map<string, { count: number; resetAt: number }>();
const pwAttempts = new Map<string, { count: number; resetAt: number }>();
const globalAttempts = { count: 0, resetAt: 0 };

const IP_MAX = 10;
const IP_WINDOW_MS = 60_000;

// Per password-hash limit: prevents brute-forcing a specific candidate by rotating IPs
const PW_MAX = 8;
const PW_WINDOW_MS = 5 * 60_000;

// Global ceiling: cap total failed attempts across all clients in a short window
const GLOBAL_MAX_FAILS = 200;
const GLOBAL_WINDOW_MS = 60_000;

function checkLimit(map: Map<string, { count: number; resetAt: number }>, key: string, max: number, windowMs: number): boolean {
  const now = Date.now();
  const entry = map.get(key);
  if (!entry || entry.resetAt < now) {
    map.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }
  entry.count++;
  return entry.count <= max;
}

function checkGlobal(): boolean {
  const now = Date.now();
  if (globalAttempts.resetAt < now) {
    globalAttempts.count = 1;
    globalAttempts.resetAt = now + GLOBAL_WINDOW_MS;
    return true;
  }
  globalAttempts.count++;
  return globalAttempts.count <= GLOBAL_MAX_FAILS;
}

async function sha256(input: string): Promise<string> {
  const data = new TextEncoder().encode(input);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

// Periodic cleanup to prevent unbounded growth
function cleanup() {
  const now = Date.now();
  for (const [k, v] of ipAttempts) if (v.resetAt < now) ipAttempts.delete(k);
  for (const [k, v] of pwAttempts) if (v.resetAt < now) pwAttempts.delete(k);
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    if (Math.random() < 0.05) cleanup();

    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("cf-connecting-ip")?.trim() ||
      "unknown";

    // IP-based limit (best-effort; can be spoofed, but still useful)
    if (!checkLimit(ipAttempts, ip, IP_MAX, IP_WINDOW_MS)) {
      return new Response(
        JSON.stringify({ error: "Too many attempts. Try again later." }),
        { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    // Global ceiling — protects against distributed brute-force
    if (!checkGlobal()) {
      return new Response(
        JSON.stringify({ error: "Service temporarily unavailable. Try again later." }),
        { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const body = await req.json().catch(() => ({}));
    const password = typeof body?.password === "string"
      ? body.password.trim().toLowerCase()
      : "";

    if (!password || password.length > 200) {
      return new Response(
        JSON.stringify({ error: "Invalid request" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    // Per-password-candidate limit — NOT spoofable via headers.
    // Even if attacker rotates IPs, each unique password candidate is capped.
    const pwKey = await sha256(password);
    if (!checkLimit(pwAttempts, pwKey, PW_MAX, PW_WINDOW_MS)) {
      return new Response(
        JSON.stringify({ error: "Too many attempts. Try again later." }),
        { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const pwRegional = (Deno.env.get("DOSSIER_PW_REGIONAL") || "").trim().toLowerCase();
    const pwNacional = (Deno.env.get("DOSSIER_PW_NACIONAL") || "").trim().toLowerCase();
    const pwInternacional = (Deno.env.get("DOSSIER_PW_INTERNACIONAL") || "").trim().toLowerCase();
    // Easter egg — hidden page for Lucía 💌
    const pwSecret = "luciarubenjeje";

    let version: "regional" | "nacional" | "internacional" | "secret" | null = null;
    if (pwRegional && password === pwRegional) version = "regional";
    else if (pwNacional && password === pwNacional) version = "nacional";
    else if (pwInternacional && password === pwInternacional) version = "internacional";
    else if (password === pwSecret) version = "secret";

    if (!version) {
      // Add a small artificial delay on failure to slow down brute-force
      await new Promise((r) => setTimeout(r, 250));
      return new Response(
        JSON.stringify({ success: false }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    return new Response(
      JSON.stringify({ success: true, version }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
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
