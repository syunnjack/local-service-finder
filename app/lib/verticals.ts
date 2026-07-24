export type Vertical = { slug: string; name: string; category: string; accent: string; unit: string; services: string[]; points: string[]; cta: string; domain: string };

// Only categories with current, official-source provider listings are published.
export const verticals: Vertical[] = [
  { slug: "house-cleaning", name: "ハウスクリーニング", category: "生活", accent: "#207565", unit: "社", services: ["エアコン", "浴室", "キッチン", "水回りセット"], points: ["見積もり範囲", "対応エリア", "作業条件"], cta: "見積もりを比較する", domain: "machiclean.jp" },
  { slug: "moving", name: "引越し", category: "住居", accent: "#e35d35", unit: "社", services: ["単身引越し", "家族引越し", "長距離引越し", "オフィス移転"], points: ["見積もり条件", "対応エリア", "補償・オプション"], cta: "見積もりを比較する", domain: "machihikkoshi.jp" },
  { slug: "housekeeping", name: "家事代行", category: "生活", accent: "#b65b72", unit: "社", services: ["掃除", "料理", "整理収納", "定期利用"], points: ["対応内容", "利用頻度", "訪問条件"], cta: "サービスを比較する", domain: "machikaji.jp" },
  { slug: "garden-care", name: "庭木剪定・草刈り", category: "住まい", accent: "#477a4c", unit: "社", services: ["庭木剪定", "伐採", "草刈り", "防草対策"], points: ["作業内容", "現地見積もり", "処分費"], cta: "庭の手入れを比較する", domain: "machisentei.jp" },
  { slug: "pest-control", name: "害虫・害獣駆除", category: "住まい", accent: "#8a6437", unit: "社", services: ["ゴキブリ駆除", "シロアリ対策", "ハチ駆除", "ネズミ対策"], points: ["対象害虫・害獣", "駆除方法", "再発防止"], cta: "駆除サービスを比較する", domain: "machigaichu.jp" },
  { slug: "locksmith", name: "鍵交換・鍵開け", category: "住まい", accent: "#405770", unit: "社", services: ["鍵開け", "鍵交換", "鍵修理", "防犯対策"], points: ["鍵の種類", "出張条件", "見積金額"], cta: "鍵サービスを比較する", domain: "machi-key.jp" },
  { slug: "plumbing", name: "水道修理・水漏れ", category: "住まい", accent: "#287b9b", unit: "社", services: ["水漏れ", "つまり", "蛇口交換", "給湯器"], points: ["症状", "作業料金", "水道局指定"], cta: "水道修理を比較する", domain: "machisuidou.jp" },
  { slug: "electrical", name: "電気工事・エアコン設置", category: "住まい", accent: "#b06b27", unit: "社", services: ["エアコン設置", "アンテナ工事", "照明工事", "コンセント工事"], points: ["工事内容", "追加工事", "施工資格"], cta: "電気工事を比較する", domain: "machi-denki.jp" },
];

export const getVertical = (slug: string) => verticals.find((vertical) => vertical.slug === slug);
