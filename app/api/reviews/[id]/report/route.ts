import { getDb } from "../../../../../db";
import { reviewReports } from "../../../../../db/schema";

const reasons = ["personal-info", "abuse", "not-experience", "other"];

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const reviewId = Number((await params).id);
  const body = await request.json() as Record<string, unknown>;
  const reason = String(body.reason || "");
  const detail = String(body.detail || "").trim().slice(0, 500);
  if (!Number.isInteger(reviewId) || reviewId < 1 || !reasons.includes(reason)) return Response.json({ error: "Invalid report" }, { status: 400 });
  await getDb().insert(reviewReports).values({ reviewId, reason, detail });
  return Response.json({ message: "通報を受け付けました。公開せずに確認します。" }, { status: 201 });
}
