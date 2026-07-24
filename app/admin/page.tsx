import Link from "next/link";

export default function Admin() {
  return <main className="admin-home"><header><Link href="/" className="logo">まち<span>セレクト</span></Link></header><section><p>OPERATIONS CENTER</p><h1>運営画面</h1><div><Link href="/dashboard"><b>KPI分析</b><span>アクセス・CTR・CVR</span></Link><Link href="/admin/leads"><b>相談・依頼</b><span>対応状況と成果</span></Link><Link href="/admin/campaigns"><b>広告掲載</b><span>ASP・掲載状況</span></Link><Link href="/admin/reviews"><b>口コミの審査</b><span>公開・非公開・保留</span></Link><Link href="/admin/review-reports"><b>口コミ通報</b><span>投稿の安全性を確認</span></Link><Link href="/admin/listing-corrections"><b>掲載情報の修正</b><span>事業者からの訂正依頼</span></Link><a href="/api/admin/leads/export"><b>CSV出力</b><span>全リードをダウンロード</span></a></div></section></main>;
}
