import { eq, sql } from "drizzle-orm";
import { getDb } from "../../../../../db";
import { reviews } from "../../../../../db/schema";

export async function POST(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const id = Number((await params).id);
  if (!Number.isInteger(id) || id < 1) return Response.json({ error: "Invalid review" }, { status: 400 });
  const [review] = await getDb().update(reviews).set({ helpful: sql`${reviews.helpful} + 1` }).where(eq(reviews.id, id)).returning({ helpful: reviews.helpful });
  if (!review) return Response.json({ error: "Review not found" }, { status: 404 });
  return Response.json({ helpful: review.helpful });
}
