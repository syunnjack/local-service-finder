import type { Metadata } from "next"
import "./globals.css"
import AppFeatures from "./AppFeatures"
import { currentHost, currentOrigin } from "./lib/site"
import { verificationToken } from "./lib/search-console"

/**
 * 26ドメインを1つのコードで配信しているため、
 * 正規URLの基点も Search Console の所有権確認タグも配信中のホストで決める。
 * 固定にすると、24サイトが machiselect.jp のものを名乗ることになる。
 */
export async function generateMetadata(): Promise<Metadata> {
  const token = verificationToken(await currentHost())
  return {
    metadataBase: new URL(await currentOrigin()),
    title: "まちセレクト｜市町村別サービス比較",
    description: "地域の美容・生活・教育・仕事・住居サービスを、料金だけでなく条件や口コミまで比較。",
    ...(token ? { verification: { google: token } } : {}),
  }
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>
        {children}
        <AppFeatures />
      </body>
    </html>
  )
}
