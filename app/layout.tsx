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

export const metadata: Metadata = {
  metadataBase: new URL("https://machiselect.jp"),
  title: { default: "まちセレクト | 地域サービスを公式情報から比較", template: "%s | まちセレクト" },
  description: "地域サービスの公式情報・比較の観点・口コミを整理。料金や条件は各社の公式情報と見積もりで確認できます。",
  alternates: { canonical: "/" },
  openGraph: { type: "website", locale: "ja_JP", siteName: "まちセレクト", title: "まちセレクト", description: "暮らしの選択を、確かな情報から。", images: [{ url: "/og.png", width: 1792, height: 1024, alt: "まちセレクト" }] },
  twitter: { card: "summary_large_image", title: "まちセレクト", description: "暮らしの選択を、確かな情報から。", images: ["/og.png"] },
};

export default function Layout({ children }: { children: React.ReactNode }) { return <html lang="ja"><body>{children}<AppFeatures /></body></html>; }
