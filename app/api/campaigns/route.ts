import { and, asc, eq } from "drizzle-orm";
import { getDb } from "../../../db";
import { campaigns } from "../../../db/schema";

export async function GET(request: Request) {
  const vertical = new URL(request.url).searchParams.get("vertical") || "";
  const rows = await getDb().select({ id: campaigns.id, name: campaigns.name, asp: campaigns.asp }).from(campaigns)
    .where(and(eq(campaigns.vertical, vertical), eq(campaigns.status, "active"))).orderBy(asc(campaigns.priority)).limit(3);
  return Response.json({ campaigns: rows });
}
