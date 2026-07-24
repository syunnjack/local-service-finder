import type { Metadata } from "next";
import "./globals.css";
import "./mvp.css";
import AppFeatures from "./AppFeatures";

export const metadata: Metadata = {
  metadataBase: new URL("https://machiselect.jp"),
  title: "まちセレクト｜地域サービスを公式情報から比較",
  description: "地域サービスの公式情報・対応エリア・相談窓口を比較。料金や空き状況は事業者の公式ページで確認できます。",
  alternates: { canonical: "/" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <html lang="ja"><body>{children}<AppFeatures /></body></html>;
}
