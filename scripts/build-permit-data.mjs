/**
 * 自治体が公開している許認可の業者一覧を取り込み、正規化した JSON を生成する。
 *
 * 扱う種別（category）
 *   waste  : 一般廃棄物 収集運搬業／処分業（不用品回収）
 *   animal : 第一種動物取扱業（ペットホテル。種別「保管」が動物の預かりにあたる）
 *
 * なぜやるか:
 *   不用品回収は無許可業者による不法投棄・高額請求のトラブルが多い。
 *   自治体の許可業者リストと突き合わせれば「許可を持つ業者だけ」を載せられる。
 *   掲載料を取る比較サイトは、掲載業者を減らす機能を作れないため、ここが差別化になる。
 *
 * 前提と限界:
 *   - 国の標準データセットではない。自治体ごとにCSVの列名も行構成も異なるため、
 *     data/waste-permit-sources.json に自治体単位のマッピングを持たせている。
 *   - 対応自治体を増やすには、そのCSVを見てマッピングを1件追加する。
 *   - 許可の有無は取得時点のもの。許可期限が過ぎている業者もそのまま載せ、
 *     期限切れであることを明示する（勝手に除外すると事実と食い違う）。
 */
import { readFile, writeFile, mkdir } from "node:fs/promises"
import ExcelJS from "exceljs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")

/** ダブルクォート対応のCSVパーサ。セル内の改行も保持する。 */
function parseCsv(text) {
  const rows = []
  let row = []
  let value = ""
  let quoted = false
  const input = text.replace(/^﻿/, "")
  for (let i = 0; i < input.length; i++) {
    const char = input[i]
    if (quoted && char === '"' && input[i + 1] === '"') { value += '"'; i++ }
    else if (char === '"') quoted = !quoted
    else if (char === "," && !quoted) { row.push(value); value = "" }
    else if ((char === "\n" || char === "\r") && !quoted) {
      if (char === "\r" && input[i + 1] === "\n") i++
      row.push(value); value = ""
      if (row.some((cell) => cell.trim() !== "")) rows.push(row)
      row = []
    } else value += char
  }
  row.push(value)
  if (row.some((cell) => cell.trim() !== "")) rows.push(row)
  return rows
}

/**
 * 自治体のHTMLページから表を取り出す。CSV公開していない自治体が多いため。
 * 政府系サイトの表は素直なHTMLなので、正規表現で十分に読める。
 */
function parseHtmlTables(html) {
  const stripTags = (value) =>
    value.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<").replace(/&gt;/g, ">")
      // CMSがリンクに付ける注記。業者名に混ざるので落とす。
      // 括弧がタグ境界で分断され片方だけ残ることがあるため、
      // 括弧の有無に関わらず注記本体を消してから、余った括弧を落とす。
      .replace(/(外部サイトへリンク|新しいウィンドウで開きます|別ウィンドウで開きます)/g, "")
      .replace(/[（(]\s*[)）]/g, "")
      // 注記を消した結果、対応の無い括弧が残ることがある。開きと閉じの数が
      // 合わない分だけ端から落とす（「(株)」のような正しい括弧は残す）。
      .replace(/[）)]+$/, (tail, offset, whole) => {
        const opens = (whole.slice(0, offset).match(/[（(]/g) ?? []).length
        const closes = (whole.slice(0, offset).match(/[）)]/g) ?? []).length
        const unmatched = Math.max(0, tail.length - Math.max(0, opens - closes))
        return tail.slice(0, tail.length - unmatched)
      })
      .replace(/\s+/g, " ").trim()
  return html.split(/<table/i).slice(1).map((table) =>
    table.split(/<tr/i).slice(1).map((row) =>
      [...row.matchAll(/<t[hd][^>]*>([\s\S]*?)<\/t[hd]>/gi)].map((match) => stripTags(match[1])),
    ).filter((cells) => cells.length > 0),
  )
}

async function fetchHtmlRows(source) {
  const response = await fetch(source.sourcePage, { signal: AbortSignal.timeout(45000), redirect: "follow" })
  if (!response.ok) throw new Error(`HTTP ${response.status}`)
  const buffer = Buffer.from(await response.arrayBuffer())
  let html = buffer.toString("utf8")
  if ((html.match(/�/g) || []).length > 20) html = new TextDecoder("shift_jis").decode(buffer)

  const tables = parseHtmlTables(html)
  // 同じ表が区ごとに分割されて重複することがあるため、既定では最大の表だけを使う
  const target = tables.reduce((best, table) => (table.length > best.length ? table : best), [])
  if (target.length < 2) throw new Error("表を取り出せない")
  return target
}

/** Excel（xlsx）を行の二次元配列にする。県単位で公開している自治体があるため。 */
async function fetchXlsxRows(source) {
  const response = await fetch(source.csvUrl, { signal: AbortSignal.timeout(60000), redirect: "follow" })
  if (!response.ok) throw new Error(`HTTP ${response.status}`)
  const workbook = new ExcelJS.Workbook()
  await workbook.xlsx.load(Buffer.from(await response.arrayBuffer()))
  const sheet = workbook.worksheets[source.sheetIndex ?? 0]
  if (!sheet) throw new Error("シートが無い")
  const rows = []
  sheet.eachRow((row) => {
    const cells = []
    row.eachCell({ includeEmpty: true }, (cell) => cells.push(String(cell.text ?? "").trim()))
    rows.push(cells)
  })
  return rows
}

/**
 * 住所から市区町村名を取り出す。県単位のファイルを市町村ごとに分けるため。
 * 「三重県三重郡菰野町」「三重郡菰野町」「桑名市」のどれでも菰野町・桑名市になる。
 */
function extractCity(address, prefecture) {
  let value = String(address ?? "").trim()
  if (!value) return null
  if (prefecture && value.startsWith(prefecture)) value = value.slice(prefecture.length)
  value = value.replace(/^.+?郡/, "")
  const match = /^(.+?[市区町村])/.exec(value)
  return match ? match[1] : null
}

async function fetchCsv(source) {
  const response = await fetch(source.csvUrl, { signal: AbortSignal.timeout(45000), redirect: "follow" })
  if (!response.ok) throw new Error(`HTTP ${response.status}`)
  const buffer = Buffer.from(await response.arrayBuffer())
  // 自治体のCSVは Shift_JIS のことも多い。設定に従いつつ、化けたら自動で切り替える。
  let text = source.encoding === "sjis"
    ? new TextDecoder("shift_jis").decode(buffer)
    : buffer.toString("utf8")
  if ((text.match(/�/g) || []).length > 5) {
    text = new TextDecoder("shift_jis").decode(buffer)
  }
  return text
}

/** ヘッダー名の表記ゆれ（空白・改行）を吸収して列位置を引く */
function indexOfColumn(header, wanted) {
  const normalize = (value) => String(value ?? "").replace(/[\s　]/g, "")
  const target = normalize(wanted)
  return header.findIndex((cell) => normalize(cell) === target)
}

function toIsoDate(year, month, day) {
  // Number("") は 0 になるため、空文字を先に弾く。
  // これを怠ると期限列を持たない自治体の業者が全員「0-00-00 = 期限切れ」になり、
  // 実在の事業者に虚偽の表示をしてしまう。
  if ([year, month, day].some((value) => String(value ?? "").trim() === "")) return null
  const y = Number(year), m = Number(month), d = Number(day)
  if (![y, m, d].every(Number.isInteger)) return null
  if (y < 1900 || m < 1 || m > 12 || d < 1 || d > 31) return null
  return `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`
}

const sources = JSON.parse(await readFile(join(root, "data/permit-sources.json"), "utf8"))
const today = new Date().toISOString().slice(0, 10)
const municipalities = []
let totalOperators = 0

for (const source of sources) {
  let rows
  try {
    rows = source.format === "html"
      ? await fetchHtmlRows(source)
      : source.format === "xlsx"
        ? await fetchXlsxRows(source)
        : parseCsv(await fetchCsv(source))
  } catch (error) {
    console.log(`${source.city}: 取得失敗 ${String(error.message).slice(0, 60)}`)
    continue
  }

  const header = rows[source.headerRow] ?? []
  const columnIndex = Object.fromEntries(
    Object.entries(source.columns).map(([key, label]) => [key, indexOfColumn(header, label)]),
  )
  const itemIndex = Object.fromEntries(
    Object.entries(source.items).map(([key, label]) => [key, indexOfColumn(header, label)]),
  )

  const missing = Object.entries(columnIndex).filter(([, index]) => index < 0).map(([key]) => key)
  if (missing.length) {
    console.log(`${source.city}: 列が見つからない (${missing.join(", ")}) — マッピングの更新が必要`)
    continue
  }

  const truthy = new Set(source.truthyValues ?? ["1", "○"])
  const cell = (row, key) => (columnIndex[key] >= 0 ? String(row[columnIndex[key]] ?? "").trim() : "")

  const operators = []
  for (const row of rows.slice(source.headerRow + 1)) {
    const name = cell(row, "name")
    if (!name) continue

    const expiry = toIsoDate(cell(row, "expiryYear"), cell(row, "expiryMonth"), cell(row, "expiryDay"))
    // 「更新申請受付中」のように日付が入らないケースがあるため、原文も残す
    const expiryNote = expiry ? null : (cell(row, "expiryYear") || null)

    // 前橋市の区分は「01販売」のように連番が前置される。表示用に数字を落とす。
    // 区分は「01販売」のように連番が前置される場合と、
    // 「第一種動物取扱業(保管)」のように括弧に入る場合がある。
    const rawKind = cell(row, "kind")
    const parenthesised = /[(（]([^)）]+)[)）]/.exec(rawKind)
    const kind = (parenthesised ? parenthesised[1] : rawKind.replace(/^\d+/, "")).trim() || null

    // 取り扱う動物は「犬(40)」のような自由記述。列ごとにまとめて持つ。
    const animals = {}
    for (const [key, label] of Object.entries(source.animalColumns ?? {})) {
      const index = indexOfColumn(header, label)
      const value = index >= 0 ? String(row[index] ?? "").trim() : ""
      if (value) animals[key] = value
    }

    const items = {}
    for (const [key, index] of Object.entries(itemIndex)) {
      if (index < 0) continue
      items[key] = truthy.has(String(row[index] ?? "").trim())
    }

    operators.push({
      permitNo: cell(row, "permitNo") || null,
      name,
      nameKana: cell(row, "nameKana") || null,
      phone: cell(row, "phone") || null,
      address: cell(row, "address") || null,
      area: cell(row, "area") || null,
      vehicles: cell(row, "vehicles") || null,
      note: cell(row, "note") || null,
      // 品目をフラグではなく自由記述で持つ自治体がある（静岡市など）
      itemsText: cell(row, "itemsText") || null,
      issuedDate: cell(row, "issuedDate") || null,
      applicant: cell(row, "applicant") || null,
      manager: cell(row, "manager") || null,
      kind,
      animals,
      expiry,
      expiryNote,
      expired: expiry ? expiry < today : false,
      items,
    })
  }

  if (!operators.length) {
    console.log(`${source.city}: 業者0件 — CSVの構成が変わった可能性`)
    continue
  }

  const common = {
    category: source.category ?? "waste",
    prefecture: source.prefecture,
    // 収集運搬か処分かで意味が違う。不用品の持ち出しに必要なのは収集運搬の許可。
    permitType: source.permitType ?? "収集運搬",
    license: source.license,
    attribution: source.attribution,
    sourcePage: source.sourcePage,
    csvUrl: source.csvUrl,
  }

  // 県が県内全域をまとめて公開している場合は、住所から市町村ごとに分ける。
  // 利用者は「自分の市町村」で探すため、県単位のまま出すと使いづらい。
  if (source.splitByCity) {
    const groups = new Map()
    for (const operator of operators) {
      const city = extractCity(operator.address, source.prefecture)
      if (!city) continue
      if (!groups.has(city)) groups.set(city, [])
      groups.get(city).push(operator)
    }
    // 1件しかない市町村まで選択肢に出すと選びにくいので、下限を設ける
    const minimum = source.minOperatorsPerCity ?? 3
    let added = 0
    for (const [city, list] of [...groups].sort((a, b) => b[1].length - a[1].length)) {
      if (list.length < minimum) continue
      municipalities.push({ ...common, muniCode: `${source.muniCode}-${city}`, city, operatorCount: list.length, operators: list })
      totalOperators += list.length
      added += list.length
    }
    console.log(`${source.prefecture}（県公開）: ${added}件 / ${municipalities.filter((m) => m.sourcePage === source.sourcePage).length}市町村`)
    continue
  }

  totalOperators += operators.length
  municipalities.push({ ...common, muniCode: source.muniCode, city: source.city, operatorCount: operators.length, operators })
  console.log(`${source.prefecture}${source.city}: ${operators.length}業者（期限切れ ${operators.filter((o) => o.expired).length}件）`)
}

await mkdir(join(root, "app/data"), { recursive: true })
await writeFile(
  join(root, "app/data/permits.json"),
  `${JSON.stringify({ generatedAt: today, municipalities }, null, 1)}\n`,
  "utf8",
)

console.log(`\n生成完了`)
for (const category of new Set(municipalities.map((m) => m.category))) {
  const group = municipalities.filter((m) => m.category === category)
  console.log(`  ${category}: ${group.length}自治体 / ${group.reduce((s, m) => s + m.operatorCount, 0)}件`)
}
console.log(`  対応自治体: ${municipalities.length}`)
console.log(`  許可業者: ${totalOperators}`)
