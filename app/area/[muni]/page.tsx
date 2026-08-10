import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { VERTICAL_PERMITS, findMunicipality, operatorsIn } from "../../lib/permits"
import { buildPermitData } from "../../lib/permit-page"
import { currentVertical } from "../../lib/site"
import { areaPath } from "../../lib/routes"
import VerticalPage from "../../compare/[slug]/vertical-page"

/**
 * 市区町村ごとの一覧ページ。
 *
 * 検索されるのは「目黒区 美容室」のような地域つきの語なので、
 * 自治体の切り替えがクエリ文字列のままでは検索結果に載りようがない。
 * 1自治体1URLにして、それぞれに固有の題名と正規URLを与えている。
 *
 * どのジャンルを出すかは配信中のドメインで決まる（machisalon.jp なら美容室）。
 */

export const dynamic = "force-dynamic"

async function resolve(muniCode: string) {
  const vertical = await currentVertical()
  if (!vertical) return null
  const config = VERTICAL_PERMITS[vertical.slug]
  if (!config) return null
  const municipality = findMunicipality(config.category, muniCode, config.nameFilter)
  // 存在しないコードで別の自治体を返すと中身と題名がずれるので照合する
  if (!municipality || municipality.muniCode !== muniCode) return null
  return { vertical, config, municipality }
}

export async function generateMetadata({ params }: { params: Promise<{ muni: string }> }): Promise<Metadata> {
  const { muni } = await params
  const resolved = await resolve(muni)
  if (!resolved) return { robots: { index: false, follow: false } }

  const { vertical, config, municipality } = resolved
  const place = `${municipality.prefecture}${municipality.city}`
  const count = operatorsIn(municipality, config.nameFilter).length.toLocaleString("ja-JP")

  return {
    title: `${place}の${vertical.name}一覧（${count}件）｜まちセレクト`,
    description:
      `${place}で${municipality.permitType}として公開されている${count}件を掲載しています。` +
      `${municipality.attribution}の公開情報にもとづく実データで、名称・所在地・許可番号を確認できます。`,
    alternates: { canonical: `https://${vertical.domain}${areaPath(municipality.muniCode)}` },
  }
}

export default async function AreaPage({
  params,
  searchParams,
}: {
  params: Promise<{ muni: string }>
  searchParams: Promise<{ q?: string }>
}) {
  const { muni } = await params
  const resolved = await resolve(muni)
  if (!resolved) notFound()

  const { q } = await searchParams
  const permitData = buildPermitData(resolved.vertical, { muniCode: muni, keyword: (q ?? "").trim() })

  return <VerticalPage vertical={resolved.vertical} permitData={permitData} />
}
