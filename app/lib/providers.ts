export type Provider = { id: string; vertical: string; name: string; coverage: string; services: string[]; highlights: string[]; sourceUrl: string; sourceLabel: string; verifiedAt: string };

// Curated from official websites. Ratings, availability, and prices are never inferred.
export const providers: Provider[] = [
  { id: "duskin-service-master", vertical: "house-cleaning", name: "ダスキン サービスマスター", coverage: "全国（対応エリアは公式サイトで要確認）", services: ["エアコン", "キッチン", "浴室", "水回り"], highlights: ["サービス内容を公式サイトで確認", "地域の対応可否を確認", "見積もり条件を確認"], sourceUrl: "https://www.duskin.jp/servicemaster/", sourceLabel: "ダスキン公式サイト", verifiedAt: "2026-07-24" },
  { id: "osouji-honpo", vertical: "house-cleaning", name: "おそうじ本舗", coverage: "全国（対応エリアは公式サイトで要確認）", services: ["エアコン", "浴室", "キッチン", "換気扇"], highlights: ["サービス内容を公式サイトで確認", "地域の対応可否を確認", "見積もり条件を確認"], sourceUrl: "https://www.osoujihonpo.com/", sourceLabel: "おそうじ本舗公式サイト", verifiedAt: "2026-07-24" },
  { id: "bears-house-cleaning", vertical: "house-cleaning", name: "ベアーズ ハウスクリーニング", coverage: "対応エリアは公式サイトで要確認", services: ["エアコン", "水回り", "換気扇", "セットメニュー"], highlights: ["サービス内容を公式サイトで確認", "地域の対応可否を確認", "見積もり条件を確認"], sourceUrl: "https://www.happy-bears.com/houseclean/", sourceLabel: "ベアーズ公式サイト", verifiedAt: "2026-07-24" },
  { id: "art-moving", vertical: "moving", name: "アート引越センター", coverage: "対応エリアは公式サイトで要確認", services: ["単身引越し", "家族引越し", "オフィス移転", "見積もり"], highlights: ["プラン内容を公式サイトで確認", "地域の対応可否を確認", "見積もり条件を確認"], sourceUrl: "https://www.the0123.com/", sourceLabel: "アート引越センター公式サイト", verifiedAt: "2026-07-24" },
  { id: "sakai-moving", vertical: "moving", name: "サカイ引越センター", coverage: "対応エリアは公式サイトで要確認", services: ["単身引越し", "家族引越し", "オンライン見積もり", "オプション"], highlights: ["プラン内容を公式サイトで確認", "地域の対応可否を確認", "見積もり条件を確認"], sourceUrl: "https://www.hikkoshi-sakai.co.jp/index.html", sourceLabel: "サカイ引越センター公式サイト", verifiedAt: "2026-07-24" },
  { id: "bears-housekeeping", vertical: "housekeeping", name: "ベアーズ 家事代行", coverage: "対応エリアは公式サイトで要確認", services: ["掃除", "料理", "買い物", "定期利用"], highlights: ["サービス内容を公式サイトで確認", "利用条件を確認", "訪問条件を確認"], sourceUrl: "https://www.happy-bears.com/", sourceLabel: "ベアーズ公式サイト", verifiedAt: "2026-07-24" },
  { id: "casy-housekeeping", vertical: "housekeeping", name: "CaSy", coverage: "対応エリアは公式サイトで要確認", services: ["掃除代行", "料理代行", "整理収納", "ハウスクリーニング"], highlights: ["サービス内容を公式サイトで確認", "利用条件を確認", "訪問条件を確認"], sourceUrl: "https://casy.co.jp/", sourceLabel: "CaSy公式サイト", verifiedAt: "2026-07-24" },
];

export function getProviders(vertical: string) { return providers.filter((provider) => provider.vertical === vertical); }
