import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';
import { z } from 'npm:zod@3.23.8';

const LeadSchema = z.object({
  name: z.string().trim().min(2).max(100),
  phone: z.string().trim().min(9).max(20),
  email: z.string().trim().email().max(255),
  address: z.string().trim().min(5).max(255),
  consent: z.boolean().refine((v) => v === true),
});

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  try {
    const webhookUrl = Deno.env.get('OESTE_WEBHOOK_URL');
    if (!webhookUrl) {
      return new Response(
        JSON.stringify({ error: 'Webhook no configurado' }),
        { status: 503, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    const body = await req.json().catch(() => null);
    const parsed = LeadSchema.safeParse(body);
    if (!parsed.success) {
      return new Response(
        JSON.stringify({ error: 'Datos inválidos', details: parsed.error.flatten().fieldErrors }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    const { name, phone, email, address } = parsed.data;
    const payload = {
      name,
      phone,
      email,
      address,
      source: 'meta-ads',
      landing: 'oeste-landing1',
      submitted_at: new Date().toISOString(),
    };

    const upstream = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!upstream.ok) {
      console.error('Webhook upstream error', upstream.status);
      return new Response(
        JSON.stringify({ error: 'No se pudo enviar el lead' }),
        { status: 502, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('oeste-lead error', err);
    return new Response(JSON.stringify({ error: 'Error interno' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
