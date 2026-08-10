import permitData from "../data/permits.json"

export type PermitOperator = {
  permitNo: string | null
  name: string
  nameKana: string | null
  phone: string | null
  address: string | null
  area: string | null
  vehicles: string | null
  note: string | null
  itemsText: string | null
  issuedDate: string | null
  applicant: string | null
  manager: string | null
  /** 動物取扱業の区分（販売・保管・貸出・訓練・展示など） */
  kind: string | null
  /** 取り扱う動物。「犬(40)」のような自由記述 */
  animals: Record<string, string>
  expiry: string | null
  expiryNote: string | null
  expired: boolean
  items: Record<string, boolean>
}

export type PermitMunicipality = {
  category: string
  muniCode: string
  prefecture: string
  city: string
  permitType: string
  license: string
  attribution: string
  sourcePage: string
  csvUrl: string
  operatorCount: number
  operators: PermitOperator[]
}

export const permits = permitData as { generatedAt: string; municipalities: PermitMunicipality[] }

/**
 * 業種と、その業種で確認できる許認可の対応。
 * ここに無い業種はまだ実データが無いので、架空の事業者を並べずに準備中と出す。
 */
export const VERTICAL_PERMITS: Record<string, {
  category: string
  /** 絞り込みの初期値にする区分。動物取扱業の「保管」＝動物の預かり。 */
  defaultKind?: string
  /** 画面に出す説明 */
  headline: string
  description: string
}> = {
  "junk-removal": {
    category: "waste",
    headline: "許可を持つ業者だけ。",
    description:
      "自治体が公開している一般廃棄物の許可業者一覧から、許可番号・許可期限・対応品目を確認できます。無許可業者は掲載していません。",
  },
  "pet-hotel": {
    category: "animal",
    defaultKind: "保管",
    headline: "登録のある施設だけ。",
    description:
      "自治体が公開している第一種動物取扱業の登録簿から、登録番号・登録年月日・取り扱う動物を確認できます。動物を預かるには「保管」の登録が必要です。",
  },
}

export function municipalitiesFor(category: string) {
  return permits.municipalities.filter((municipality) => municipality.category === category)
}

/** 品目キーと画面表示名。自治体ごとに扱う品目が違うため、存在するものだけ出す。 */
export const ITEM_LABELS: Record<string, string> = {
  burnable: "可燃ごみ",
  bulky: "粗大ごみ",
  plastic: "プラスチック製容器包装",
  landfill: "埋立ごみ",
  appliance: "家電リサイクル4品目",
  mattress: "スプリングマットレス等",
  sludge: "汚泥",
  placenta: "胞衣",
  collection: "収集運搬業",
  disposal: "処分業",
  temporary: "臨時ごみ",
  businessBurnable: "事業系可燃物",
  foodResource: "事業系食品循環資源",
  wood: "事業系木くず",
}

export const ANIMAL_LABELS: Record<string, string> = {
  mammal: "哺乳類",
  bird: "鳥類",
  reptile: "爬虫類",
}

export function municipalityLabel(municipality: PermitMunicipality) {
  return `${municipality.prefecture}${municipality.city}`
}

/** その自治体のデータに実際に出てくる品目だけを返す */
export function availableItems(municipality: PermitMunicipality) {
  const keys = new Set<string>()
  for (const operator of municipality.operators) {
    for (const [key, value] of Object.entries(operator.items)) {
      if (value) keys.add(key)
    }
  }
  return [...keys].filter((key) => ITEM_LABELS[key])
}

/** その自治体のデータに出てくる区分（動物取扱業の販売・保管など） */
export function availableKinds(municipality: PermitMunicipality) {
  const keys = new Set<string>()
  for (const operator of municipality.operators) {
    if (operator.kind) keys.add(operator.kind)
  }
  return [...keys].sort((a, b) => a.localeCompare(b, "ja"))
}
