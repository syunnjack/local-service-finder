import { currentHost } from "../lib/site"
import { sitemapUrls, sitemapXml } from "../lib/sitemap"

/**
 * ドメインごとに中身の違うサイトマップを返す。
 * ホストを見る必要があるので、静的な sitemap.ts ではなく経路ハンドラにしている。
 */

export const dynamic = "force-dynamic"

export async function GET() {
  const xml = sitemapXml(sitemapUrls(await currentHost()))
  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8", "Cache-Control": "public, max-age=3600" },
  })
}
