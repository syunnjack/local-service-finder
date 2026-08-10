import { verticals } from "./verticals"
import { VERTICAL_PERMITS, municipalitySummaries, permits } from "./permits"
import { canonicalOrigin, verticalForHost, PORTAL_HOST, areaPath } from "./routes"

/**
 * サイトマップに載せるURLを組み立てる。
 *
 * 経路ハンドラから切り離してあるのは、
 * 「あるドメインのサイトマップに別ドメインのURLが混ざっていないか」を
 * テストで確かめられるようにするため。
 * 以前これを間違えて、24ジャンル分が machiselect.jp のURLを申告していた。
 */

export type SitemapUrl = { loc: string; priority: number; lastmod?: string }

export function sitemapUrls(host: string): SitemapUrl[] {
  const origin = canonicalOrigin(host)
  const vertical = verticalForHost(host)
  const lastmod = permits.generatedAt.slice(0, 10)

  const urls: SitemapUrl[] = [
    { loc: `${origin}/`, priority: 1 },
    { loc: `${origin}/privacy`, priority: 0.2 },
    { loc: `${origin}/disclosure`, priority: 0.2 },
  ]

  if (vertical) {
    // ジャンル専用ドメイン: 自分の市区町村ページだけを載せる
    const config = VERTICAL_PERMITS[vertical.slug]
    if (config) {
      for (const summary of municipalitySummaries(config.category, config.nameFilter)) {
        urls.push({ loc: `${origin}${areaPath(summary.muniCode)}`, priority: 0.9, lastmod })
      }
    }
  } else {
    // ポータル: 各ジャンルの入口を載せる。市区町村ページは各ドメイン側で申告する。
    for (const v of verticals) {
      urls.push({ loc: `https://${PORTAL_HOST}/compare/${v.slug}`, priority: 0.8 })
    }
  }

  return urls
}

export function sitemapXml(urls: SitemapUrl[]) {
  const body = urls
    .map(({ loc, priority, lastmod }) =>
      `  <url><loc>${loc}</loc>${lastmod ? `<lastmod>${lastmod}</lastmod>` : ""}<priority>${priority}</priority></url>`)
    .join("\n")
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`
}
