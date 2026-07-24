import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { verticals } from "./lib/verticals";

export const dynamic = "force-dynamic";

export default async function Home() {
  const host = (await headers()).get("host")?.split(":")[0].replace(/^www\./, "") || "";
  const matched = verticals.find((vertical) => vertical.domain === host);
  if (matched) redirect(`/compare/${matched.slug}`);
  return <main><header><a href="#" className="logo">まち<span>セレクト</span></a><nav><a href="#services">比較する</a><Link href="/guides">ガイド</Link><Link href="/disclosure">広告方針</Link></nav></header><section className="hero"><p>OFFICIAL-SOURCE LOCAL COMPARISON</p><h1>暮らしの選択を、<br /><em>確かな情報から。</em></h1><span>公式サイトで確認できるサービス情報、比較の観点、利用者の口コミを整理。料金や条件の最終確認は、各社の公式情報と見積もりで行えます。</span><a href="#services">比較カテゴリを見る →</a><small>広告・提携掲載は、編集コンテンツと明確に区別して表示します。</small></section><section className="results" id="services"><div className="head"><div><p>START WITH A CATEGORY</p><h2>公式情報を確認できるカテゴリ</h2></div><span>{verticals.length}カテゴリ</span></div><div className="site-grid">{verticals.map((vertical) => <Link href={`/compare/${vertical.slug}`} key={vertical.slug} style={{ "--accent": vertical.accent } as React.CSSProperties}><small>{vertical.category}</small><b>{vertical.name}</b><span>{vertical.points.join("・")}</span><i>公式掲載を見る →</i></Link>)}</div></section><section className="compare"><div><b>01</b><h3>公式情報を確認</h3><p>掲載情報には出典と確認日を示し、根拠のない価格や評価は載せません。</p></div><div><b>02</b><h3>条件を揃えて比較</h3><p>サービス内容・対応地域・見積もり条件を同じ前提で確認できます。</p></div><div><b>03</b><h3>広告を明確に表示</h3><p>広告・提携掲載は編集部の比較と分け、掲載方針を公開しています。</p></div></section><footer><a className="logo" href="#">まち<span>セレクト</span></a><p>地域サービス比較プラットフォーム</p><small><Link href="/privacy">プライバシー</Link> · <Link href="/editorial-policy">編集方針</Link> · <Link href="/disclosure">広告掲載方針</Link></small></footer></main>;
}
