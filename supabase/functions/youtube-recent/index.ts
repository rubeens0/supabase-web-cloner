import { corsHeaders } from '@supabase/supabase-js/cors'

const CHANNEL_ID = 'UCNSGnsR56H1H5exb7HjTPqA'
const FEED_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`

interface Video {
  id: string
  title: string
  url: string
  thumbnail: string
  published: string
  isShort: boolean
}

let cache: { data: Video[]; ts: number } | null = null
const TTL = 60 * 30 * 1000 // 30 min

function parseFeed(xml: string, limit = 6): Video[] {
  const entries = xml.split('<entry>').slice(1)
  return entries.slice(0, limit).map((e) => {
    const id = e.match(/<yt:videoId>([^<]+)<\/yt:videoId>/)?.[1] ?? ''
    const title = e.match(/<title>([^<]+)<\/title>/)?.[1] ?? ''
    const url = e.match(/<link rel="alternate" href="([^"]+)"/)?.[1] ?? `https://www.youtube.com/watch?v=${id}`
    const published = e.match(/<published>([^<]+)<\/published>/)?.[1] ?? ''
    const thumbnail = `https://i.ytimg.com/vi/${id}/hqdefault.jpg`
    const isShort = url.includes('/shorts/')
    return { id, title, url, thumbnail, published, isShort }
  })
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  try {
    const url = new URL(req.url)
    const limit = Math.min(parseInt(url.searchParams.get('limit') ?? '3'), 10)
    const includeShorts = url.searchParams.get('shorts') === '1'

    if (cache && Date.now() - cache.ts < TTL) {
      const filtered = includeShorts ? cache.data : cache.data.filter(v => !v.isShort)
      return new Response(JSON.stringify({ videos: filtered.slice(0, limit), cached: true }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const res = await fetch(FEED_URL)
    if (!res.ok) throw new Error(`Feed fetch failed: ${res.status}`)
    const xml = await res.text()
    const videos = parseFeed(xml, 10)
    cache = { data: videos, ts: Date.now() }

    const filtered = includeShorts ? videos : videos.filter(v => !v.isShort)
    return new Response(JSON.stringify({ videos: filtered.slice(0, limit), cached: false }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Unknown error'
    return new Response(JSON.stringify({ error: msg, videos: [] }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
