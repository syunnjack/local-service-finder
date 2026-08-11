import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getVertical, verticals } from "../../lib/verticals"
import { buildPermitData } from "../../lib/permit-page"
import { currentHost } from "../../lib/site"
import { verticalForHost } from "../../lib/routes"
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
    // 各ジャンルの正規URLは専用ドメインのトップ。ポータル側の同じ中身と割れないようにする。
    alternates: { canonical: `https://${v.domain}/` },
  }
}

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

  const { muni, q } = await searchParams
  // ポータルから見ているときは /area/... がこのドメインに無いので、専用ドメインへ向ける
  const host = await currentHost()
  const areaOrigin = verticalForHost(host)?.slug === vertical.slug ? "" : `https://${vertical.domain}`

  const permitData = buildPermitData(vertical, { muniCode: muni, keyword: (q ?? "").trim(), areaOrigin })

  return <VerticalPage vertical={vertical} permitData={permitData} />
}
