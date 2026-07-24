import { desc, eq } from "drizzle-orm";
import { getChatGPTUser } from "../../../chatgpt-auth";
import { getDb } from "../../../../db";
import { reviews } from "../../../../db/schema";

export async function GET() { if (!await getChatGPTUser()) return Response.json({ error: "Unauthorized" }, { status: 401 }); const rows = await getDb().select().from(reviews).orderBy(desc(reviews.createdAt)).limit(100); return Response.json({ reviews: rows }); }
export async function PATCH(request: Request) { if (!await getChatGPTUser()) return Response.json({ error: "Unauthorized" }, { status: 401 }); const body = await request.json() as { id?: number; status?: string; verificationStatus?: string }; if (!body.id || !["approved", "rejected", "pending"].includes(body.status || "") || !["verified", "unverified"].includes(body.verificationStatus || "")) return Response.json({ error: "Invalid input" }, { status: 400 }); const [review] = await getDb().update(reviews).set({ status: body.status, verificationStatus: body.verificationStatus }).where(eq(reviews.id, body.id)).returning(); return Response.json({ review }); }
