export type Provider = {
  id: string;
  vertical: string;
  name: string;
  coverage: string;
  services: string[];
  highlights: string[];
  sourceUrl: string;
  sourceLabel: string;
  verifiedAt: string;
};

// Curated from the providers' official websites. These are not affiliate offers
// and the app deliberately does not invent ratings, availability, or prices.
export const providers: Provider[] = [
  {
    id: "duskin-service-master",
    vertical: "house-cleaning",
    name: "ダスキン サービスマスター",
    coverage: "全国（公式の店舗検索で対応エリアを確認）",
    services: ["エアコン", "キッチン", "浴室", "水まわり"],
    highlights: ["1回・定期の両方に対応", "全国の店舗ネットワーク", "見積もりは公式サイトで確認"],
    sourceUrl: "https://www.duskin.jp/servicemaster/",
    sourceLabel: "ダスキン公式｜ハウスクリーニング",
    verifiedAt: "2026-07-24",
  },
  {
    id: "osouji-honpo",
    vertical: "house-cleaning",
    name: "おそうじ本舗",
    coverage: "全国47都道府県（公式案内）",
    services: ["エアコン", "浴室", "キッチン", "洗濯機"],
    highlights: ["店舗・対応エリアを公式サイトで検索", "水まわり・パックサービスあり", "Web見積もりの案内あり"],
    sourceUrl: "https://www.osoujihonpo.com/",
    sourceLabel: "おそうじ本舗公式｜ハウスクリーニング",
    verifiedAt: "2026-07-24",
  },
  {
    id: "bears-house-cleaning",
    vertical: "house-cleaning",
    name: "ベアーズ ハウスクリーニング",
    coverage: "対応エリアは公式サイトで確認",
    services: ["エアコン", "水まわり", "洗濯機", "住まい全体"],
    highlights: ["専門清掃メニューを公式サイトで確認", "サービス内容と対応エリアを案内", "見積もり・予約は公式窓口へ"],
    sourceUrl: "https://www.happy-bears.com/houseclean/",
    sourceLabel: "ベアーズ公式｜ハウスクリーニング",
    verifiedAt: "2026-07-24",
  },
];

export function getProviders(vertical: string) {
  return providers.filter((provider) => provider.vertical === vertical);
}
