import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';
import { z } from 'npm:zod@3.23.8';

const PIXEL_ID = '877944112021448';
const GRAPH_VERSION = 'v21.0';

const UserDataSchema = z
  .object({
    email: z.string().trim().email().max(255).optional(),
    phone: z.string().trim().max(40).optional(),
    first_name: z.string().trim().max(100).optional(),
    last_name: z.string().trim().max(100).optional(),
    city: z.string().trim().max(100).optional(),
    country: z.string().trim().max(2).optional(),
    external_id: z.string().trim().max(100).optional(),
    fbp: z.string().trim().max(200).optional(),
    fbc: z.string().trim().max(400).optional(),
    client_user_agent: z.string().trim().max(500).optional(),
  })
  .partial();

const EventSchema = z.object({
  event_name: z.string().min(1).max(80),
  event_id: z.string().min(1).max(120),
  event_source_url: z.string().url().optional(),
  action_source: z
    .enum(['website', 'email', 'app', 'phone_call', 'chat', 'physical_store', 'system_generated', 'other'])
    .default('website'),
  custom_data: z.record(z.unknown()).optional(),
  user_data: UserDataSchema.optional(),
  event_time: z.number().int().positive().optional(),
  test_event_code: z.string().max(40).optional(),
});

const BodySchema = z.union([
  EventSchema,
  z.object({ events: z.array(EventSchema).min(1).max(20), test_event_code: z.string().max(40).optional() }),
]);

async function sha256(value: string): Promise<string> {
  const buf = new TextEncoder().encode(value);
  const hash = await crypto.subtle.digest('SHA-256', buf);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

function normalizeEmail(v: string) {
  return v.trim().toLowerCase();
}
function normalizePhone(v: string) {
  // E.164 digits only
  return v.replace(/[^\d]/g, '');
}
function normalizeName(v: string) {
  return v.trim().toLowerCase();
}

async function hashUserData(ud?: z.infer<typeof UserDataSchema>) {
  if (!ud) return {};
  const out: Record<string, unknown> = {};
  if (ud.email) out.em = [await sha256(normalizeEmail(ud.email))];
  if (ud.phone) out.ph = [await sha256(normalizePhone(ud.phone))];
  if (ud.first_name) out.fn = [await sha256(normalizeName(ud.first_name))];
  if (ud.last_name) out.ln = [await sha256(normalizeName(ud.last_name))];
  if (ud.city) out.ct = [await sha256(normalizeName(ud.city))];
  if (ud.country) out.country = [await sha256(ud.country.trim().toLowerCase())];
  if (ud.external_id) out.external_id = [await sha256(ud.external_id.trim().toLowerCase())];
  // Non-hashed identifiers
  if (ud.fbp) out.fbp = ud.fbp;
  if (ud.fbc) out.fbc = ud.fbc;
  if (ud.client_user_agent) out.client_user_agent = ud.client_user_agent;
  return out;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  const token = Deno.env.get('META_PIXEL_ACCESS_TOKEN');
  if (!token) {
    return new Response(JSON.stringify({ error: 'META_PIXEL_ACCESS_TOKEN not configured' }), {
      status: 503,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  const json = await req.json().catch(() => null);
  const parsed = BodySchema.safeParse(json);
  if (!parsed.success) {
    return new Response(
      JSON.stringify({ error: 'Invalid body', details: parsed.error.flatten() }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    );
  }

  const incoming = 'events' in parsed.data ? parsed.data.events : [parsed.data];
  const topLevelTestCode = 'events' in parsed.data ? parsed.data.test_event_code : undefined;

  const clientIp =
    req.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
    req.headers.get('cf-connecting-ip') ||
    undefined;
  const ua = req.headers.get('user-agent') || undefined;

  const now = Math.floor(Date.now() / 1000);

  const data = await Promise.all(
    incoming.map(async (e) => {
      const user_data = await hashUserData(e.user_data);
      if (clientIp && !('client_ip_address' in user_data)) user_data.client_ip_address = clientIp;
      if (ua && !('client_user_agent' in user_data)) user_data.client_user_agent = ua;
      return {
        event_name: e.event_name,
        event_time: e.event_time ?? now,
        event_id: e.event_id,
        event_source_url: e.event_source_url,
        action_source: e.action_source,
        user_data,
        custom_data: e.custom_data ?? {},
      };
    }),
  );

  const testCode = topLevelTestCode ?? incoming.find((e) => e.test_event_code)?.test_event_code;

  const payload: Record<string, unknown> = { data };
  if (testCode) payload.test_event_code = testCode;

  const url = `https://graph.facebook.com/${GRAPH_VERSION}/${PIXEL_ID}/events?access_token=${encodeURIComponent(token)}`;

  const upstream = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const text = await upstream.text().catch(() => '');
  let parsedResponse: unknown = text;
  try {
    parsedResponse = JSON.parse(text);
  } catch {
    /* keep raw text */
  }

  if (!upstream.ok) {
    console.error('[meta-capi] upstream error', upstream.status, text);
    return new Response(
      JSON.stringify({ ok: false, status: upstream.status, response: parsedResponse }),
      { status: 502, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    );
  }

  console.log('[meta-capi] sent', data.length, 'event(s):', data.map((d) => `${d.event_name}#${d.event_id}`).join(', '));

  return new Response(JSON.stringify({ ok: true, response: parsedResponse }), {
    status: 200,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
});
