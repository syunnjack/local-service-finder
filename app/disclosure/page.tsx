import Link from "next/link";

export const metadata = { title: "広告・収益の開示｜まちセレクト" };

export default function Disclosure() {
  return <main className="policy trust-policy">
    <p className="eyebrow">DISCLOSURE</p>
    <h1>広告・収益に関する開示</h1>
    <p>まちセレクトは、地域サービスの比較・相談を支援する情報サイトです。事業者への送客、広告掲載、提携リンクなどにより収益を得る場合があります。</p>
    <h2>広告と編集の区別</h2>
    <p>対価を受けて表示する掲載は、「広告」または「スポンサー」と明記します。広告掲載の有無だけで、編集部の比較基準、口コミの公開、情報の更新基準を変更しません。</p>
    <h2>外部リンク</h2>
    <p>公式サイト・提携先へ移動するリンクがあります。リンク先での申込内容、料金、契約条件は各事業者の規約・案内をご確認ください。</p>
    <h2>比較相談</h2>
    <p>比較相談で入力された情報は、相談対応のために使用します。送客や紹介を行う場合は、その対象と目的を案内します。</p>
    <Link href="/editorial-policy">掲載・編集ポリシーを見る</Link><br />
    <Link href="/">サービス一覧へ戻る</Link>
  </main>;
}
