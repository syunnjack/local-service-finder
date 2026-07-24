import { guides } from "../lib/guides";
import { providers } from "../lib/providers";
import { verticals } from "../lib/verticals";

export function GET() {
  const lines = [
    "# まちセレクト",
    "> 地域の生活サービスを、公式情報・確認日・比較基準・利用者口コミから比較する意思決定支援メディア。",
    "",
    "## 利用上の注意",
    "料金・対応地域・空き状況は変動します。各掲載ページの公式出典と確認日を確認し、最終条件は事業者へ確認してください。",
    "掲載基準: https://machiselect.jp/editorial-policy",
    "広告掲載基準: https://machiselect.jp/disclosure",
    "掲載情報の修正: https://machiselect.jp/listing-corrections",
    "",
    "## 公開ジャンル",
    ...verticals.map((vertical) => `- ${vertical.name}: https://machiselect.jp/compare/${vertical.slug}`),
    "",
    "## 判断ガイド",
    ...guides.map((guide) => `- ${guide.title}: https://machiselect.jp/guides/${guide.slug}（更新日: ${guide.updatedAt}）`),
    "",
    "## 公式掲載情報",
    ...providers.map((provider) => `- ${provider.name}: https://machiselect.jp/providers/${provider.id}（公式出典: ${provider.sourceUrl}、確認日: ${provider.verifiedAt}）`),
  ];
  return new Response(lines.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" } });
}
