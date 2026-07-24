import Link from "next/link";
import { guides } from "../lib/guides";

export const metadata = { title: "比較ガイド | まちセレクト", description: "見積もり・条件比較を進める前に確認したい、公式情報をもとにした実用ガイドです。" };

export default function Guides() { return <main className="guide-index"><header><Link href="/" className="logo">まち<span>セレクト</span></Link></header><section><p className="eyebrow">DECISION GUIDES</p><h1>比較の前に読むガイド</h1><p>公式サイトで確認する項目を整理し、地域ページでの比較・相談につなげます。</p><div>{guides.map((guide) => <Link href={`/guides/${guide.slug}`} key={guide.slug}><small>更新日 {guide.updatedAt}</small><h2>{guide.title}</h2><p>{guide.description}</p><b>ガイドを読む →</b></Link>)}</div></section></main>; }
