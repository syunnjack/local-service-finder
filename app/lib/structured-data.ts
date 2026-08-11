import type { Vertical } from "./verticals"
import { areaPath } from "./routes"

/**
 * 検索結果に一覧として出してもらうための構造化データ。
 *
 * 出すのは画面に見えているものだけにする。
 * 表示していない事業者や、持っていない評価・料金を書くと
 * 構造化データの規約違反になるうえ、そもそも事実ではない。
 */

type PageData = {
  municipality: {
    prefecture: string
    city: string
    permitType: string
    attribution: string
    sourcePage: string
  } | null
  operators: { name: string; address: string | null; phone: string | null; permitNo: string | null }[]
  page: number
  matchedCount: number
  limit: number
}

export function areaStructuredData(vertical: Vertical, muniCode: string, data: PageData) {
  const municipality = data.municipality
  if (!municipality) return null

  const origin = `https://${vertical.domain}`
  const place = `${municipality.prefecture}${municipality.city}`
  const url = `${origin}${areaPath(muniCode, data.page)}`
  // ページ送りの2ページ目以降でも通し番号が続くようにする
  const offset = (data.page - 1) * data.limit

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: vertical.name, item: `${origin}/` },
          { "@type": "ListItem", position: 2, name: place, item: `${origin}${areaPath(muniCode)}` },
        ],
      },
      {
        "@type": "ItemList",
        name: `${place}の${vertical.name}`,
        description: `${municipality.attribution}が公開している${municipality.permitType}の一覧`,
        url,
        numberOfItems: data.matchedCount,
        itemListElement: data.operators.map((operator, index) => ({
          "@type": "ListItem",
          position: offset + index + 1,
          item: {
            "@type": "LocalBusiness",
            name: operator.name,
            ...(operator.address
              ? { address: { "@type": "PostalAddress", addressCountry: "JP", addressRegion: municipality.prefecture, streetAddress: operator.address } }
              : {}),
            ...(operator.phone ? { telephone: operator.phone } : {}),
            // 許可・登録番号は自治体が付与した識別子なので identifier として出す
            ...(operator.permitNo
              ? { identifier: { "@type": "PropertyValue", name: municipality.permitType, value: operator.permitNo } }
              : {}),
          },
        })),
      },
    ],
  }
}
