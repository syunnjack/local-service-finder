import { desc, eq } from "drizzle-orm";
import { getChatGPTUser } from "../../../chatgpt-auth";
import { getDb } from "../../../../db";
import { reviewReports, reviews } from "../../../../db/schema";

export async function GET() {
  if (!await getChatGPTUser()) return Response.json({ error: "Unauthorized" }, { status: 401 });
  const rows = await getDb().select({ id: reviewReports.id, reviewId: reviewReports.reviewId, reason: reviewReports.reason, detail: reviewReports.detail, status: reviewReports.status, createdAt: reviewReports.createdAt, nickname: reviews.nickname, body: reviews.body, vertical: reviews.vertical, city: reviews.city }).from(reviewReports).leftJoin(reviews, eq(reviewReports.reviewId, reviews.id)).orderBy(desc(reviewReports.createdAt)).limit(100);
  return Response.json({ reports: rows });
}

export async function PATCH(request: Request) {
  if (!await getChatGPTUser()) return Response.json({ error: "Unauthorized" }, { status: 401 });
  const body = await request.json() as { id?: number; status?: string };
  if (!body.id || !["pending", "resolved", "rejected"].includes(body.status || "")) return Response.json({ error: "Invalid input" }, { status: 400 });
  const [report] = await getDb().update(reviewReports).set({ status: body.status }).where(eq(reviewReports.id, body.id)).returning();
  return Response.json({ report });
}
