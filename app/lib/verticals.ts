export type Vertical = { slug: string; name: string; category: string; accent: string; unit: string; services: string[]; points: string[]; cta: string; domain: string };

// Only categories with current, official-source provider listings are published.
export const verticals: Vertical[] = [
  { slug: "house-cleaning", name: "ハウスクリーニング", category: "生活", accent: "#207565", unit: "社", services: ["エアコン", "浴室", "キッチン", "水回りセット"], points: ["見積もり範囲", "対応エリア", "作業条件"], cta: "見積もりを比較する", domain: "machiclean.jp" },
  { slug: "moving", name: "引越し", category: "住居", accent: "#e35d35", unit: "社", services: ["単身引越し", "家族引越し", "長距離引越し", "オフィス移転"], points: ["見積もり条件", "対応エリア", "補償・オプション"], cta: "見積もりを比較する", domain: "machihikkoshi.jp" },
  { slug: "housekeeping", name: "家事代行", category: "生活", accent: "#b65b72", unit: "社", services: ["掃除", "料理", "整理収納", "定期利用"], points: ["対応内容", "利用頻度", "訪問条件"], cta: "サービスを比較する", domain: "machikaji.jp" },
];

export const getVertical = (slug: string) => verticals.find((vertical) => vertical.slug === slug);
