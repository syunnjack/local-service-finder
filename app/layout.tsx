import type { Metadata } from "next";
import "./globals.css";
import "./mvp.css";
import "./trust.css";
import "./sponsored.css";
import "./guides.css";
import "./content-admin.css";
import "./provider.css";
import "./corrections-admin.css";
import AppFeatures from "./AppFeatures";

const siteName = "まちセレクト";
const description = "地域の生活サービスを、公式情報・確認日・比較基準・利用者口コミから比較できる意思決定支援メディアです。";

export const metadata: Metadata = {
  metadataBase: new URL("https://machiselect.jp"),
  title: { default: `${siteName} | 地域サービスの比較・選び方`, template: `%s | ${siteName}` },
  description,
  alternates: { canonical: "/" },
  openGraph: { type: "website", locale: "ja_JP", siteName, title: siteName, description, images: [{ url: "/og.png", width: 1792, height: 1024, alt: "まちセレクト" }] },
  twitter: { card: "summary_large_image", title: siteName, description, images: ["/og.png"] },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const structuredData = { "@context": "https://schema.org", "@graph": [{ "@type": "Organization", name: siteName, url: "https://machiselect.jp", contactPoint: { "@type": "ContactPoint", contactType: "customer support", url: "https://machiselect.jp/listing-corrections" } }, { "@type": "WebSite", name: siteName, url: "https://machiselect.jp", description }] };
  return <html lang="ja"><body><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />{children}<AppFeatures /></body></html>;
}
