import Link from "next/link";
import { guides } from "../lib/guides";

export const metadata = { title: "比較ガイド｜まちセレクト", description: "見積もり・予約前に確認したい地域サービスの比較ガイドです。" };

export default function Guides() {
  return <main className="guide-index"><header><Link href="/" className="logo">まち<span>セレクト</span></Link></header><section><p className="eyebrow">DECISION GUIDES</p><h1>比較前に読むガイド</h1><p>公式情報をもとに、見積もり・予約前の確認事項を整理しています。</p><div>{guides.map((guide) => <Link href={`/guides/${guide.slug}`} key={guide.slug}><small>更新日 {guide.updatedAt}</small><h2>{guide.title}</h2><p>{guide.description}</p><b>ガイドを読む →</b></Link>)}</div></section></main>;
}
