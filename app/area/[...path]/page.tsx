import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { VERTICAL_PERMITS, findMunicipality, operatorsIn } from "../../lib/permits"
import { buildPermitData, MAX_RESULTS } from "../../lib/permit-page"
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
 *
 * 経路は /area/:muni と /area/:muni/p/:page の2種類しか受け付けない。
 * 大阪市の美容所は10,598件あり、1ページでは出し切れないため分割している。
 */

export const dynamic = "force-dynamic"

function parsePath(path: string[]) {
  if (path.length === 1) return { muniCode: path[0], page: 1 }
  if (path.length === 3 && path[1] === "p") {
    const page = Number(path[2])
    // 「/p/01」「/p/1」のような同じ中身の別URLを作らせない
    if (Number.isInteger(page) && page >= 2 && String(page) === path[2]) {
      return { muniCode: path[0], page }
    }
  }
  return null
}

async function resolve(path: string[]) {
  const parsed = parsePath(path)
  if (!parsed) return null

  const vertical = await currentVertical()
  if (!vertical) return null
  const config = VERTICAL_PERMITS[vertical.slug]
  if (!config) return null

  const municipality = findMunicipality(config.category, parsed.muniCode, config.nameFilter)
  // 存在しないコードで別の自治体を返すと中身と題名がずれるので照合する
  if (!municipality || municipality.muniCode !== parsed.muniCode) return null

  const total = operatorsIn(municipality, config.nameFilter).length
  const totalPages = Math.max(1, Math.ceil(total / MAX_RESULTS))
  if (parsed.page > totalPages) return null

  return { vertical, config, municipality, page: parsed.page, total, totalPages }
}

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ path: string[] }>
  searchParams: Promise<{ q?: string }>
}): Promise<Metadata> {
  const { path } = await params
  const resolved = await resolve(path)
  if (!resolved) return { robots: { index: false, follow: false } }

  const { vertical, municipality, page, total, totalPages } = resolved
  const place = `${municipality.prefecture}${municipality.city}`
  const count = total.toLocaleString("ja-JP")
  const suffix = totalPages > 1 ? `（${page}/${totalPages}ページ）` : ""

  // 絞り込みの結果はURLの組み合わせが無限に増えるので索引させない
  const { q } = await searchParams
  const searching = Boolean((q ?? "").trim())

  return {
    title: `${place}の${vertical.name}一覧（${count}件）${suffix}｜まちセレクト`,
    description:
      `${place}で${municipality.permitType}として公開されている${count}件を掲載しています。` +
      `${municipality.attribution}の公開情報にもとづく実データで、名称・所在地・許可番号を確認できます。`,
    alternates: { canonical: `https://${vertical.domain}${areaPath(municipality.muniCode, page)}` },
    robots: searching ? { index: false, follow: true } : undefined,
  }
}

export default async function AreaPage({
  params,
  searchParams,
}: {
  params: Promise<{ path: string[] }>
  searchParams: Promise<{ q?: string }>
}) {
  const { path } = await params
  const resolved = await resolve(path)
  if (!resolved) notFound()

  const { q } = await searchParams
  const permitData = buildPermitData(resolved.vertical, {
    muniCode: resolved.municipality.muniCode,
    keyword: (q ?? "").trim(),
    page: resolved.page,
  })

  return <VerticalPage vertical={resolved.vertical} permitData={permitData} />
}
