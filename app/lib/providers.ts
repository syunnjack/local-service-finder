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
  {
    id: "art-moving",
    vertical: "moving",
    name: "アート引越センター",
    coverage: "対応エリアは公式サイトで確認",
    services: ["単身引越", "家族引越", "オフィス移転", "見積もり予約"],
    highlights: ["単身・家族・法人向けの案内", "荷造りを含む複数コース", "見積もり・相談の公式窓口あり"],
    sourceUrl: "https://www.the0123.com/",
    sourceLabel: "アート引越センター公式",
    verifiedAt: "2026-07-24",
  },
  {
    id: "sakai-moving",
    vertical: "moving",
    name: "サカイ引越センター",
    coverage: "原則全国対応（詳細は公式案内で確認）",
    services: ["単身引越", "家族引越", "オンライン見積もり", "オプションサービス"],
    highlights: ["複数の引越プランを案内", "引越し対応エリア検索あり", "見積もり方法を公式サイトで選択可能"],
    sourceUrl: "https://www.hikkoshi-sakai.co.jp/index.html",
    sourceLabel: "サカイ引越センター公式",
    verifiedAt: "2026-07-24",
  },
  {
    id: "bears-housekeeping",
    vertical: "housekeeping",
    name: "ベアーズ 家事代行",
    coverage: "提供エリアは公式サイトで確認",
    services: ["掃除", "片付け", "洗濯", "料理"],
    highlights: ["日常的な家事代行を案内", "サービス内容を公式サイトで確認", "利用条件は公式規約・案内を確認"],
    sourceUrl: "https://www.happy-bears.com/",
    sourceLabel: "ベアーズ公式｜家事代行",
    verifiedAt: "2026-07-24",
  },
  {
    id: "casy-housekeeping",
    vertical: "housekeeping",
    name: "CaSy（カジー）",
    coverage: "提供エリアは公式サイトで確認",
    services: ["掃除代行", "料理代行", "整理収納", "ハウスクリーニング"],
    highlights: ["掃除・料理の家事代行を案内", "料金・予約・提供エリアを公式サイトで確認", "無料会員登録・利用案内あり"],
    sourceUrl: "https://casy.co.jp/",
    sourceLabel: "CaSy公式｜家事代行",
    verifiedAt: "2026-07-24",
  },
];

export function getProviders(vertical: string) {
  return providers.filter((provider) => provider.vertical === vertical);
}
