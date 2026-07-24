import { desc, eq } from "drizzle-orm";
import { getChatGPTUser } from "../../../chatgpt-auth";
import { getDb } from "../../../../db";
import { listingCorrections } from "../../../../db/schema";

export async function GET() { if (!await getChatGPTUser()) return Response.json({ error: "認証が必要です" }, { status: 401 }); const rows = await getDb().select().from(listingCorrections).orderBy(desc(listingCorrections.createdAt)).limit(100); return Response.json({ corrections: rows }); }
export async function PATCH(request: Request) { if (!await getChatGPTUser()) return Response.json({ error: "認証が必要です" }, { status: 401 }); const body = await request.json() as { id?: number; status?: string }; if (!body.id || !["pending", "resolved", "rejected"].includes(body.status || "")) return Response.json({ error: "入力が正しくありません" }, { status: 400 }); const [correction] = await getDb().update(listingCorrections).set({ status: body.status }).where(eq(listingCorrections.id, body.id)).returning(); return Response.json({ correction }); }
