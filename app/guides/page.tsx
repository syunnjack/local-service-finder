import Link from "next/link";
import { guides } from "../lib/guides";

export const metadata = { title: "選び方ガイド | まちセレクト", description: "地域サービスを比較する前に確認したい、料金・見積もり・依頼時のポイントをまとめています。" };

export default function Guides() { return <main className="guide-index"><header><Link href="/" className="logo">まち<span>セレクト</span></Link></header><section><p className="eyebrow">DECISION GUIDES</p><h1>比較・依頼前に読むガイド</h1><p>公式情報を確認しながら、条件の違いで迷わないための選び方をまとめました。</p><div>{guides.map((item) => <Link href={`/guides/${item.slug}`} key={item.slug}><small>更新日 {item.updatedAt}</small><h2>{item.title}</h2><p>{item.description}</p><b>ガイドを読む →</b></Link>)}</div></section></main>; }
