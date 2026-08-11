import { verticals, type Vertical } from "./verticals"

/**
 * ホストの解決とURLの組み立て。
 *
 * 25ドメインを1つのコードで配信しているので、
 * 「今どのドメインで見られているか」の判定を1か所に置く。
 * ここを間違えると canonical やサイトマップが別ドメインを指し、
 * 24サイト分の中身が machiselect.jp の重複として扱われる。
 *
 * next/headers を読まないので、クライアント側からもテストからも使える。
 */

/** 全ジャンルの入口になるポータル。どのジャンルにも属さない。 */
export const PORTAL_HOST = "machiselect.jp"

export function normalizeHost(host: string | null | undefined) {
  return (host ?? "").split(":")[0].replace(/^www\./, "").toLowerCase()
}

/** そのホストが担当するジャンル。ポータルや未知のホストなら null。 */
export function verticalForHost(host: string): Vertical | null {
  return verticals.find((v) => v.domain === normalizeHost(host)) ?? null
}

/**
 * 表に出すURLの基点。
 * 見慣れないホスト（プレビュー用のchatgpt.siteなど）で配信されたときに
 * そのホストを正規URLとして書き出すと検索結果が割れるので、
 * ジャンルが特定できたら必ずそのジャンルの本番ドメインを使う。
 */
export function canonicalOrigin(host: string) {
  const vertical = verticalForHost(host)
  return `https://${vertical ? vertical.domain : PORTAL_HOST}`
}

/** 想定しているホストかどうか。違えば robots.txt で丸ごと拒否する。 */
export function isKnownHost(host: string) {
  const normalized = normalizeHost(host)
  return normalized === PORTAL_HOST || verticalForHost(normalized) !== null
}

/**
 * 市区町村ページ。
 *
 * muniCode は原則として全国地方公共団体コードだが、
 * 県が一括公開しているものを市町村へ割り振った分は「24000-津市」の形になる。
 * そのままURLに置けないので必ずエンコードする。
 *
 * 1ページ目に /p/1 を付けないのは、同じ中身が2つのURLで出ないようにするため。
 */
export function areaPath(muniCode: string, page = 1) {
  const base = `/area/${encodeURIComponent(muniCode)}`
  return page > 1 ? `${base}/p/${page}` : base
}
