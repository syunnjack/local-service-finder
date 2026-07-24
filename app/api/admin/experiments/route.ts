import { env } from "cloudflare:workers";
import { getChatGPTUser } from "../../../chatgpt-auth";

export async function GET(request: Request) {
  if (!await getChatGPTUser()) return Response.json({ error: "Unauthorized" }, { status: 401 });
  const days = Math.min(90, Math.max(1, Number(new URL(request.url).searchParams.get("days") || 30)));
  const cutoff = Math.floor(Date.now() / 1000) - days * 86400;
  const result = await env.DB.prepare("SELECT provider_id AS key, COUNT(*) AS clicks FROM service_events WHERE event='cta' AND provider_id LIKE '%:%:%' AND created_at >= ? GROUP BY provider_id ORDER BY clicks DESC").bind(cutoff).all();
  const rows = (result.results as { key: string; clicks: number }[]).map((row) => { const [, action, variant] = row.key.split(":"); return { action, variant, clicks: Number(row.clicks) }; });
  return Response.json({ days, experiments: rows });
}
