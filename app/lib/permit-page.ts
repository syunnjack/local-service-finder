import { VERTICAL_PERMITS, municipalitySummaries, findMunicipality, operatorsIn, permits } from "./permits"
import type { Vertical } from "./verticals"

/**
 * 許認可データを画面へ渡す形に整える。
 *
 * トップ（ジャンル専用ドメイン）、/compare/:slug、/area/:muni の3経路が
 * 同じ中身を出すので、組み立てを1か所にまとめている。
 * ずれると同じ内容が違う件数で表示され、どれが正しいのか分からなくなる。
 */

/** 1ページに載せる上限。名古屋市の美容所は4,882件あり全件は出せない。 */
export const MAX_RESULTS = 200

export function permitConfigFor(vertical: Vertical) {
  return VERTICAL_PERMITS[vertical.slug] ?? null
}

export function buildPermitData(
  vertical: Vertical,
  { muniCode, keyword = "", page = 1, areaOrigin = "" }:
    { muniCode?: string; keyword?: string; page?: number; areaOrigin?: string },
) {
  const config = permitConfigFor(vertical)
  if (!config) return null

  /*
   * 自治体の指定が無いとき（ジャンルのトップ）に先頭の自治体を出してしまうと、
   * トップの見出しが「三重県四日市市の美容室」になり、
   * /area/242021 とまったく同じ中身が2つのURLで出ることになる。
   * 指定が無いときは一覧の入口として扱い、事業者は出さない。
   */
  const municipality = muniCode ? findMunicipality(config.category, muniCode, config.nameFilter) : null
  const operators = municipality ? operatorsIn(municipality, config.nameFilter) : []
  const matched = operators.filter((operator) =>
    !keyword ||
    operator.name.includes(keyword) ||
    (operator.address ?? "").includes(keyword))

  // 大阪市の美容所は10,598件ある。1ページに全部は出せないので分割する。
  const totalPages = Math.max(1, Math.ceil(matched.length / MAX_RESULTS))
  const current = Math.min(Math.max(1, Math.trunc(page) || 1), totalPages)

  // nameFilter は正規表現でクライアントへ渡せない。何を渡すかを明示しておく。
  const clientConfig = {
    category: config.category,
    headline: config.headline,
    description: config.description,
    ...(config.defaultKind ? { defaultKind: config.defaultKind } : {}),
    ...(config.sourceNote ? { sourceNote: config.sourceNote } : {}),
  }

  return {
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
          operatorCount: operators.length,
        }
      : null,
    keyword,
    matchedCount: matched.length,
    operators: matched.slice((current - 1) * MAX_RESULTS, current * MAX_RESULTS),
    limit: MAX_RESULTS,
    page: current,
    totalPages,
    /*
     * 市区町村ページへのリンクをどのドメインへ向けるか。
     * ポータル（machiselect.jp/compare/hair-salon）から出すときは
     * /area/... がそのドメインに存在しないため、専用ドメインを付ける。
     */
    areaOrigin,
  }
}
