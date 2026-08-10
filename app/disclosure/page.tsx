import type{Metadata}from"next";import{currentOrigin}from"../lib/site";
export const dynamic="force-dynamic";
export async function generateMetadata():Promise<Metadata>{return{title:"広告掲載・比較方針｜まちセレクト",description:"アフィリエイト広告の有無と、掲載順の決め方を説明しています。",alternates:{canonical:`${await currentOrigin()}/disclosure`}}}
import Link from"next/link";export default function Disclosure(){return <main className="policy"><h1>広告掲載・比較方針</h1><p>当サービスにはアフィリエイト広告が含まれ、リンク経由の申込・購入により運営者が報酬を受け取る場合があります。</p><h2>ランキング方針</h2><p>料金、保証、対応範囲、口コミ、空き状況、提携条件等を総合して表示します。広告報酬のみを理由に評価を改変しません。広告枠は広告であることを明示します。</p><h2>情報の正確性</h2><p>料金・条件は変更される場合があります。契約前に必ず提携先の公式情報をご確認ください。口コミは審査後に掲載しますが、投稿者個人の感想です。</p><h2>初期データ</h2><p>検証段階の事業者名・料金・口コミは架空データを含みます。実在情報への切替時は出典と更新日を表示します。</p><Link href="/">トップへ戻る</Link></main>}
