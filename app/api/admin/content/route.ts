import { env } from "cloudflare:workers";
import { getChatGPTUser } from "../../../chatgpt-auth";

export async function GET(request: Request) {
  if (!await getChatGPTUser()) return Response.json({ error: "認証が必要です" }, { status: 401 });
  const days = Math.min(90, Math.max(1, Number(new URL(request.url).searchParams.get("days") || 30)));
  const cutoff = Math.floor(Date.now() / 1000) - days * 86400;
  try {
    const result = await env.DB.prepare("SELECT vertical, SUM(CASE WHEN event='guide_view' THEN 1 ELSE 0 END) views, SUM(CASE WHEN event='guide_cta' THEN 1 ELSE 0 END) ctas FROM service_events WHERE created_at >= ? AND vertical LIKE 'guide:%' GROUP BY vertical ORDER BY views DESC").bind(cutoff).all();
    return Response.json({ days, guides: (result.results as Record<string, unknown>[]).map((row) => ({ slug: String(row.vertical).replace("guide:", ""), views: Number(row.views), ctas: Number(row.ctas) })) });
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : "集計に失敗しました" }, { status: 500 });
  }
}
