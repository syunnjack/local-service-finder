import type { Metadata } from "next"
import { verticals } from "./lib/verticals"
import { buildPermitData, permitConfigFor } from "./lib/permit-page"
import { currentVertical } from "./lib/site"
import VerticalPage from "./compare/[slug]/vertical-page"

const groups = ["生活", "美容", "教育", "仕事", "住居"]

export const dynamic = "force-dynamic"

/**
 * ジャンル専用ドメインではそのジャンルの中身をここで直接出す。
 *
 * 以前は /compare/:slug へリダイレクトしていたが、
 * ドメインのトップが毎回転送になるのは検索エンジンにとって不利で、
 * 一番評価されるはずのURLに中身が無い状態だった。
 */
export async function generateMetadata(): Promise<Metadata> {
  const vertical = await currentVertical()
  if (!vertical) {
    return {
      title: "まちセレクト｜市町村別サービス比較",
      description: "地域の美容・生活・教育・仕事・住居サービスを、料金だけでなく条件や口コミまで比較。",
      alternates: { canonical: "https://machiselect.jp/" },
    }
  }

  const config = permitConfigFor(vertical)
  const data = config ? buildPermitData(vertical, {}) : null
  const areas = data?.summaries.length ?? 0
  const total = data?.summaries.reduce((sum, s) => sum + s.operatorCount, 0) ?? 0

  return {
    title: areas
      ? `${vertical.name}を市区町村別に探す（${areas}自治体・${total.toLocaleString("ja-JP")}件）｜まちセレクト`
      : `${vertical.name}を市町村別に比較｜まちセレクト`,
    description: areas
      ? `自治体が公開している${vertical.name}の許可・登録事業者を、${areas}自治体・${total.toLocaleString("ja-JP")}件掲載しています。名称・所在地・許可番号を確認できます。`
      : `${vertical.name}の料金・口コミ・${vertical.points.join("・")}を地域別に比較します。`,
    alternates: { canonical: `https://${vertical.domain}/` },
  }
}

export default async function Home({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const vertical = await currentVertical()
  if (vertical) {
    const { q } = await searchParams
    return <VerticalPage vertical={vertical} permitData={buildPermitData(vertical, { keyword: (q ?? "").trim() })} />
  }

  return (
    <main>
      <header>
        <a href="#" className="logo">まち<span>セレクト</span></a>
        <nav><a href="#services">サービス一覧</a><a href="/disclosure">広告方針</a></nav>
      </header>
      <section className="hero">
        <p>25 LOCAL AFFILIATE SYSTEMS</p>
        <h1>暮らす街から、<br /><em>選択をよくする。</em></h1>
        <span>美容・生活・教育・仕事・住居。25ジャンルを市町村単位で比較し、料金だけでは見えない条件と口コミを整理します。</span>
        <a href="#services">25ジャンルを見る →</a>
        <small>各ジャンルは専用ドメインと共通運営基盤で管理します。</small>
      </section>
      <section className="results" id="services">
        <div className="head">
          <div><p>SERVICE PORTFOLIO</p><h2>ジャンル別サイト一覧</h2></div>
          <span>全25ジャンル</span>
        </div>
        {groups.map((group) => (
          <div className="portfolio" key={group}>
            <h3>{group}</h3>
            <div className="site-grid">
              {verticals.filter((v) => v.category === group).map((v) => (
                <a href={`https://${v.domain}`} key={v.slug} style={{ "--accent": v.accent } as React.CSSProperties}>
                  <small>市町村 ×</small><b>{v.name}</b>
                  <span>{v.points.join("・")}</span>
                  <i>{v.domain} →</i>
                </a>
              ))}
            </div>
          </div>
        ))}
      </section>
      <section className="compare">
        <div><b>01</b><h3>市町村SEO</h3><p>地域・目的・条件を組み合わせた検索意図別ページを展開。</p></div>
        <div><b>02</b><h3>差別化データ</h3><p>総額、保証、空き、口コミなどジャンル固有情報を蓄積。</p></div>
        <div><b>03</b><h3>通知と収益計測</h3><p>再訪通知からASP成果・報酬まで一元管理。</p></div>
      </section>
      <footer>
        <a className="logo" href="#">まち<span>セレクト</span></a>
        <p>地域サービス比較プラットフォーム</p>
        <small><a href="/privacy">プライバシー</a> · <a href="/disclosure">広告掲載方針</a></small>
      </footer>
    </main>
  )
}
