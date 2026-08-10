import permitData from "../data/waste-permits.json"

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
  expiry: string | null
  expiryNote: string | null
  expired: boolean
  items: Record<string, boolean>
}

export type PermitMunicipality = {
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

/** 許可業者データを持つ業種。ここに無い業種はまだ実データが無い。 */
export const VERTICALS_WITH_PERMITS = new Set(["junk-removal"])

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

export function municipalityLabel(municipality: PermitMunicipality) {
  return `${municipality.prefecture}${municipality.city}`
}

/** その自治体のデータに実際に出てくる品目だけを返す */
export function availableItems(municipality: PermitMunicipality) {
  const keys = new Set<string>()
  for (const operator of municipality.operators) {
    for (const key of Object.keys(operator.items)) keys.add(key)
  }
  return [...keys].filter((key) => ITEM_LABELS[key])
}
