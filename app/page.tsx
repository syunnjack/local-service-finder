import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { verticals } from "./lib/verticals";
import "./home.css";

export const dynamic = "force-dynamic";

const journeys = [
  { title: "急いでいるとき", text: "水漏れ・鍵・害虫は、症状と住所を整理して、対応可否・到着条件・作業前見積もりを確認します。", links: ["plumbing", "locksmith", "pest-control"] },
  { title: "住まいを整えたいとき", text: "清掃、庭、軽修繕は、作業範囲・処分・高所作業などを同じ条件で比べます。", links: ["house-cleaning", "garden-care", "handyman"] },
  { title: "暮らしを助けてほしいとき", text: "引っ越し・家事代行・便利屋は、希望日時・作業量・在宅の要否を先に伝えると比較しやすくなります。", links: ["moving", "housekeeping", "handyman"] },
];

export default async function Home() {
  const host = (await headers()).get("host")?.split(":")[0].replace(/^www\./, "") || "";
  const matched = verticals.find((vertical) => vertical.domain === host);
  if (matched) redirect(`/compare/${matched.slug}`);
  return <main>
    <header><a href="#top" className="logo">まち<span>セレクト</span></a><nav><a href="#services">サービスを探す</a><a href="#how-to-use">使い方</a><Link href="/guides">選び方ガイド</Link></nav></header>
    <section className="hero" id="top"><p>OFFICIAL-SOURCE LOCAL GUIDE</p><h1>地域の困りごとを、<br /><em>迷わず比較できる。</em></h1><span>公式情報・確認日・地域別の注意点をもとに、依頼前に確認すべきことを整理します。料金や対応可否は変動するため、掲載先の公式窓口で最終確認してください。</span><a href="#services">サービスを探す →</a><small>掲載情報の修正依頼・利用者の体験投稿をもとに、内容を更新しています。</small></section>
    <section className="quick-start" id="how-to-use"><p className="eyebrow">HOW TO USE</p><h2>最初に見るのは、この3つです</h2><div><article><b>1</b><h3>困りごとを選ぶ</h3><p>依頼したい内容に近いジャンルを開きます。</p></article><article><b>2</b><h3>公式情報を確認する</h3><p>対応地域・作業範囲・確認日を見ます。</p></article><article><b>3</b><h3>同じ条件で相談する</h3><p>住所、作業内容、希望日時をそろえて確認します。</p></article></div></section>
    <section className="results" id="services"><div className="head"><div><p>START WITH A CATEGORY</p><h2>困りごとから探す</h2></div><span>{verticals.length}ジャンル</span></div><div className="site-grid">{verticals.map((vertical) => <Link href={`/compare/${vertical.slug}`} key={vertical.slug} style={{ "--accent": vertical.accent } as React.CSSProperties}><small>{vertical.category}</small><b>{vertical.name}</b><span>{vertical.services.slice(0, 3).join("・")}</span><i>地域の情報を見る →</i></Link>)}</div></section>
    <section className="journeys"><p className="eyebrow">START FROM YOUR SITUATION</p><h2>状況別の確認ポイント</h2><div>{journeys.map((journey) => <article key={journey.title}><h3>{journey.title}</h3><p>{journey.text}</p><nav>{journey.links.map((slug) => { const vertical = verticals.find((item) => item.slug === slug); return vertical ? <Link key={slug} href={`/compare/${slug}`}>{vertical.name}</Link> : null; })}</nav></article>)}</div></section>
    <section className="compare"><div><b>01</b><h3>一次情報を確認</h3><p>掲載情報には公式出典と確認日を表示します。推測の料金や対応可否は載せません。</p></div><div><b>02</b><h3>地域の条件を確認</h3><p>対応地域、集合住宅のルール、駐車、作業範囲など、依頼前に確認する条件を整理します。</p></div><div><b>03</b><h3>利用体験を役立てる</h3><p>口コミは編集部評価と分け、利用時期・地域・見積もりとの差を確認してから公開します。</p></div></section>
    <footer><a className="logo" href="#top">まち<span>セレクト</span></a><p>地域サービスを比較するための、公式情報ベースの案内サイト</p><small><Link href="/privacy">プライバシー</Link> ・ <Link href="/editorial-policy">編集方針</Link> ・ <Link href="/disclosure">広告・収益の開示</Link></small></footer>
  </main>;
}
