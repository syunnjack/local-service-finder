import { and, desc, eq } from "drizzle-orm";
import { getDb } from "../../../db";
import { reviews } from "../../../db/schema";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const vertical = searchParams.get("vertical") || "";
  const city = searchParams.get("city") || "";
  const providerId = searchParams.get("providerId") || "";
  const conditions = [eq(reviews.vertical, vertical), eq(reviews.city, city), eq(reviews.status, "approved")];
  if (providerId) conditions.push(eq(reviews.providerId, providerId));
  const rows = await getDb().select().from(reviews).where(and(...conditions)).orderBy(desc(reviews.helpful), desc(reviews.createdAt)).limit(20);
  return Response.json({ reviews: rows });
}

export async function POST(request: Request) {
  try {
    const body = await request.json() as Record<string, unknown>;
    const rating = Number(body.rating);
    const nickname = String(body.nickname || "").trim();
    const reviewBody = String(body.body || "").trim();
    const serviceType = String(body.serviceType || "").trim().slice(0, 80);
    const usageMonth = String(body.usageMonth || "").trim();
    const prefecture = String(body.prefecture || "").trim().slice(0, 20);
    const estimateMatch = String(body.estimateMatch || "unknown");
    const goodPoint = String(body.goodPoint || "").trim().slice(0, 300);
    const cautionPoint = String(body.cautionPoint || "").trim().slice(0, 300);
    if (!nickname || !serviceType || !prefecture || !/^\d{4}-\d{2}$/.test(usageMonth) || !["as-expected", "higher", "lower", "unknown"].includes(estimateMatch) || reviewBody.length < 10 || reviewBody.length > 500 || rating < 1 || rating > 5) {
      return Response.json({ error: "サービス・利用月・評価・10〜500文字の口コミを確認してください" }, { status: 400 });
    }
    const [review] = await getDb().insert(reviews).values({
      vertical: String(body.vertical || ""), providerId: String(body.providerId || ""), city: String(body.city || ""), nickname, rating, body: reviewBody,
      prefecture, serviceType, usageMonth, estimateMatch, goodPoint, cautionPoint, wouldUseAgain: body.wouldUseAgain === true,
    }).returning({ id: reviews.id });
    return Response.json({ review, message: "口コミを確認待ちで受け付けました" }, { status: 201 });
  } catch {
    return Response.json({ error: "口コミを送信できませんでした" }, { status: 500 });
  }
}
