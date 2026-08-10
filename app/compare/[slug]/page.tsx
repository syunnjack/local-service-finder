import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getVertical, verticals } from "../../lib/verticals"
import { VERTICAL_PERMITS, municipalitySummaries, findMunicipality, operatorsIn, permits } from "../../lib/permits"
import VerticalPage from "./vertical-page"

export function generateStaticParams() {
  return verticals.map((v) => ({ slug: v.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const v = getVertical(slug)
  if (!v) return {}
  return {
    title: `${v.name}を市町村別に比較｜まちセレクト`,
    description: `${v.name}の料金・口コミ・${v.points.join("・")}を地域別に比較します。`,
    alternates: { canonical: `https://${v.domain}` },
  }
}

/** 1自治体あたりクライアントへ渡す上限。名古屋市の美容所は4,882件あり全件は送れない。 */
const MAX_RESULTS = 200

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ muni?: string; q?: string }>
}) {
  const { slug } = await params
  const vertical = getVertical(slug)
  if (!vertical) notFound()

  const config = VERTICAL_PERMITS[slug]
  if (!config) return <VerticalPage vertical={vertical} permitData={null} />

  const { muni, q } = await searchParams
  const keyword = (q ?? "").trim()
  const municipality = findMunicipality(config.category, muni, config.nameFilter)

  // 全件をクライアントへ送ると8MB超になるため、サーバーで絞ってから渡す
  const matched = municipality
    ? operatorsIn(municipality, config.nameFilter).filter((operator) =>
        !keyword ||
        operator.name.includes(keyword) ||
        (operator.address ?? "").includes(keyword))
    : []

  // 正規表現はクライアントコンポーネントへ渡せないので、表示に使う値だけ取り出す
  const { nameFilter: _nameFilter, ...clientConfig } = config

  return (
    <VerticalPage
      vertical={vertical}
      permitData={{
        config: clientConfig,
        generatedAt: permits.generatedAt,
        summaries: municipalitySummaries(config.category, config.nameFilter),
        municipality: municipality
          ? {
              muniCode: municipality.muniCode,
              prefecture: municipality.prefecture,
              city: municipality.city,
              permitType: municipality.permitType,
              license: municipality.license,
              attribution: municipality.attribution,
              sourcePage: municipality.sourcePage,
              operatorCount: operatorsIn(municipality, config.nameFilter).length,
            }
          : null,
        keyword,
        matchedCount: matched.length,
        operators: matched.slice(0, MAX_RESULTS),
        limit: MAX_RESULTS,
      }}
    />
  )
}
