import { currentHost } from "../lib/site"
import { canonicalOrigin, isKnownHost } from "../lib/routes"

/**
 * ドメインごとに自分のサイトマップを指す robots.txt を返す。
 *
 * 想定していないホスト（プレビュー用のURLなど）で配信されたときは
 * 同じ中身が別ドメインで拾われないよう、まるごと拒否する。
 */

export const dynamic = "force-dynamic"

export async function GET() {
  const host = await currentHost()
  const origin = canonicalOrigin(host)
  const known = isKnownHost(host)

  const body = known
    ? [
        "User-agent: *",
        "Allow: /",
        "Disallow: /admin/",
        "Disallow: /dashboard",
        "Disallow: /api/",
        "",
        `Sitemap: ${origin}/sitemap.xml`,
        "",
      ].join("\n")
    : ["User-agent: *", "Disallow: /", ""].join("\n")

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" },
  })
}
