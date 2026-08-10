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
import { inflateRawSync } from "node:zlib"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")

/** 改行での分割。CRLF と LF の両方に対応する。 */
const LINE_BREAK = new RegExp(String.fromCharCode(13) + "?" + String.fromCharCode(10))

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
 * 目黒区のように、CSVの1フィールドの中がタブ区切りになっているファイルがある。
 * 外側の引用は parseCsv が外すので、残った1列を区切り文字で割り、
 * 各セルに残る引用符を落とす。
 */
function splitDelimited(rows, delimiter) {
  return rows.map((row) => {
    const joined = row.length === 1 ? row[0] : row.join(",")
    return joined.split(delimiter).map((cell) => cell.replace(/^"+|"+$/g, "").trim())
  })
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

/**
 * ZIPで配布されている一覧を取り出す（横浜市など）。
 * 横浜市は18区それぞれのCSVが1つのZIPに入っているため、全ファイルを取り出す。
 * 先頭がディレクトリのエントリになっていることもある。
 * 依存を増やさないよう node:zlib の inflateRaw で展開する。
 */
function extractDataFilesFromZip(buffer) {
  // End of Central Directory を末尾から探す
  let eocd = -1
  for (let i = buffer.length - 22; i >= 0 && i > buffer.length - 66000; i--) {
    if (buffer.readUInt32LE(i) === 0x06054b50) { eocd = i; break }
  }
  if (eocd < 0) throw new Error("ZIPの構造を読めない")

  const entryCount = buffer.readUInt16LE(eocd + 10)
  let offset = buffer.readUInt32LE(eocd + 16)
  const files = []

  for (let index = 0; index < entryCount; index++) {
    if (buffer.readUInt32LE(offset) !== 0x02014b50) break
    const method = buffer.readUInt16LE(offset + 10)
    const compressedSize = buffer.readUInt32LE(offset + 20)
    const nameLength = buffer.readUInt16LE(offset + 28)
    const extraLength = buffer.readUInt16LE(offset + 30)
    const commentLength = buffer.readUInt16LE(offset + 32)
    const localOffset = buffer.readUInt32LE(offset + 42)
    const name = buffer.subarray(offset + 46, offset + 46 + nameLength).toString("utf8")
    offset += 46 + nameLength + extraLength + commentLength

    // ディレクトリと Mac の付随ファイルは飛ばす
    if (name.endsWith("/") || name.startsWith("__MACOSX") || compressedSize === 0) continue

    const localNameLength = buffer.readUInt16LE(localOffset + 26)
    const localExtraLength = buffer.readUInt16LE(localOffset + 28)
    const start = localOffset + 30 + localNameLength + localExtraLength
    const body = buffer.subarray(start, start + compressedSize)
    // エントリ名は UTF-8 が基本だが、古いツールで作られた ZIP は Shift_JIS のことがある
    let entryName = name
    if (entryName.includes("�")) {
      entryName = new TextDecoder("shift_jis").decode(buffer.subarray(offset - nameLength - extraLength - commentLength, offset - extraLength - commentLength))
    }
    if (method === 0) files.push({ name: entryName, body })
    else if (method === 8) files.push({ name: entryName, body: inflateRawSync(body) })
    else throw new Error(`未対応の圧縮方式 ${method}`)
  }
  if (!files.length) throw new Error("ZIP内にファイルが見つからない")
  return files
}

/** Excel（xlsx）を行の二次元配列にする。県単位で公開している自治体があるため。 */
async function fetchXlsxRows(source) {
  const response = await fetch(source.csvUrl, { signal: AbortSignal.timeout(60000), redirect: "follow" })
  if (!response.ok) throw new Error(`HTTP ${response.status}`)
  let buffer = Buffer.from(await response.arrayBuffer())
  // ZIPに業種別のxlsxをまとめている自治体（仙台市など）は、名前で対象ファイルを選ぶ
  if (source.zipped) {
    const files = extractDataFilesFromZip(buffer)
    const pattern = new RegExp(source.zipEntry ?? "")
    const hit = files.find((file) => pattern.test(file.name))
    if (!hit) throw new Error(`ZIP内に ${source.zipEntry} に合うファイルが無い: ${files.map((f) => f.name).join(", ").slice(0, 120)}`)
    buffer = hit.body
  }
  const workbook = new ExcelJS.Workbook()
  await workbook.xlsx.load(buffer)
  const sheet = workbook.worksheets[source.sheetIndex ?? 0]
  if (!sheet) throw new Error("シートが無い")
  const rows = []
  sheet.eachRow((row) => {
    const cells = []
    row.eachCell({ includeEmpty: true }, (cell) => {
      // 結合セルの値が null のとき cell.text が例外を投げる（大阪府の理容所一覧など）
      let text = ""
      try { text = String(cell.text ?? "") } catch { text = "" }
      cells.push(text.trim())
    })
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

/**
 * 自治体のCSVは Shift_JIS や UTF-16 のこともある。
 * 設定を優先しつつ、化けていたら候補を順に試す。
 */
function decodeBuffer(buffer, encoding) {
  const decode = (name) => new TextDecoder(name).decode(buffer).replace(/^﻿/, "")
  const garbled = (value) => (value.match(/�/g) || []).length > 5

  if (encoding && encoding !== "utf8") {
    const specified = decode(encoding === "sjis" ? "shift_jis" : encoding)
    if (!garbled(specified)) return specified
  }
  const utf8 = buffer.toString("utf8").replace(/^﻿/, "")
  if (!garbled(utf8)) return utf8
  for (const name of ["shift_jis", "utf-16le", "euc-jp"]) {
    const candidate = decode(name)
    if (!garbled(candidate)) return candidate
  }
  return utf8
}

async function fetchCsv(source) {
  const response = await fetch(source.csvUrl, { signal: AbortSignal.timeout(45000), redirect: "follow" })
  if (!response.ok) throw new Error(`HTTP ${response.status}`)
  let buffer = Buffer.from(await response.arrayBuffer())
  // ZIP内に複数ファイルがある場合は、2つ目以降の見出し行を落として連結する
  if (source.zipped) {
    const files = extractDataFilesFromZip(buffer)
    if (files.length === 1) {
      buffer = files[0].body
    } else {
      const texts = files.map((file) => decodeBuffer(file.body, source.encoding))
      return texts
        .map((text, index) => {
          const lines = text.split(LINE_BREAK)
          // 2つ目以降のファイルは見出し行を落としてから繋ぐ
          return (index === 0 ? lines : lines.slice(source.headerRow + 1)).join("\n")
        })
        .join("\n")
    }
  }
  return decodeBuffer(buffer, source.encoding)
}

/**
 * 列名から意味を推定する。生活衛生系の施設一覧は自治体ごとに列名が違うが、
 * 「施設名称」「施設所在地」のように似た語を使うため、優先順で寄せられる。
 * 開設者・申請者の住所や電話を施設のものと取り違えないよう、施設側を先に見る。
 */
const AUTO_COLUMN_RULES = {
  // 「施設屋号」のように名称という語を含まない列がある（四日市市の美容所）
  name: [/^施設[_]?名称$/, /の名称$/, /^名称$/, /施設名/, /屋号/, /^店舗名/],
  address: [/^施設[_]?所在地$/, /^所在地[_]?連結表記$/, /所在地$/, /^施設住所$/],
  phone: [/^施設電話番号$/, /^施設[_]?電話/, /電話番号（携帯電話を除く）/, /^ＴＥＬ/, /電話/],
  // 「番号$」まで許すと「申請者電話番号」を許可番号として拾ってしまうため、
  // 許可・確認を表す語に限定する。
  permitNo: [/^確認番号$/, /^許可番号$/, /^指令番号$/, /^登録番号$/, /^確認済番号$/],
  issuedDate: [/^確認年月日$/, /^検査確認日$/, /検査確認済年月日（西暦）/, /^許可日$/, /確認年月日/],
  applicant: [/^開設者$/, /^開設者氏名$/, /^営業者氏名$/, /^申請者[_]?氏名$/, /法人名/, /開設者/],
}

function autoMapColumns(header) {
  const normalized = header.map((cell) => String(cell ?? "").replace(/[\s　"]/g, ""))
  const used = new Set()
  const mapping = {}
  for (const [key, patterns] of Object.entries(AUTO_COLUMN_RULES)) {
    for (const pattern of patterns) {
      const index = normalized.findIndex((cell, i) => !used.has(i) && cell && pattern.test(cell))
      if (index >= 0) {
        mapping[key] = header[index]
        used.add(index)
        break
      }
    }
  }
  return mapping
}

/** ヘッダー名の表記ゆれ（空白・改行）を吸収して列位置を引く */
function indexOfColumn(header, wanted) {
  const normalize = (value) => String(value ?? "").replace(/[\s　]/g, "")
  const target = normalize(wanted)
  return header.findIndex((cell) => normalize(cell) === target)
}

/**
 * Excelの日付はシリアル値のまま読めることがある（大阪府の確認年月日など）。
 * そのまま出すと「31057」のような数字が画面に並ぶため日付に直す。
 * Excelの基準日は1899-12-30。
 */
function fromExcelSerial(value) {
  const serial = Number(value)
  if (!Number.isInteger(serial) || serial < 10000 || serial > 60000) return null
  const date = new Date(Date.UTC(1899, 11, 30) + serial * 86400000)
  return date.toISOString().slice(0, 10)
}

/**
 * 日付表記のゆれを YYYY-MM-DD に寄せる。
 * Excelのシリアル値のほか、ExcelJS が日付セルを
 * 「Mon May 02 2022 09:00:00 GMT+0900」の形で返すことがある。
 * そのまま出すと画面に英語の長い文字列が並ぶ。
 */
function normalizeDate(value) {
  const text = String(value ?? "").trim()
  if (!text) return null
  const serial = fromExcelSerial(text)
  if (serial) return serial
  if (/^[A-Z][a-z]{2} [A-Z][a-z]{2} \d{2} \d{4}/.test(text)) {
    const parsed = new Date(text)
    if (!Number.isNaN(parsed.getTime())) {
      return new Date(parsed.getTime() - parsed.getTimezoneOffset() * 60000).toISOString().slice(0, 10)
    }
  }
  // 「2024/11/22」（港区）や「2024.11.22」の区切り違い
  const slash = text.match(/^(\d{4})[/.](\d{1,2})[/.](\d{1,2})$/)
  if (slash) return toIsoDate(slash[1], slash[2], slash[3]) ?? text
  // 「令和4年3月24日」（目黒区）などの和暦。「令和9年 1月30日」のように
  // 桁揃えの空白が入ることがある（柏市）。元年は1年扱い
  const wareki = text.match(/^(明治|大正|昭和|平成|令和)\s*(元|\d{1,2})\s*年\s*(\d{1,2})\s*月\s*(\d{1,2})\s*日$/)
  if (wareki) {
    const base = { 明治: 1867, 大正: 1911, 昭和: 1925, 平成: 1988, 令和: 2018 }[wareki[1]]
    const year = base + (wareki[2] === "元" ? 1 : Number(wareki[2]))
    return toIsoDate(year, wareki[3], wareki[4]) ?? text
  }
  // 「R7.4.1」（福岡市・大分市）や「H.30/4/1」（静岡市）などの元号略記
  const abbrev = text.match(/^([MTSHR])\.?(\d{1,2})[./](\d{1,2})[./](\d{1,2})$/)
  if (abbrev) {
    const base = { M: 1867, T: 1911, S: 1925, H: 1988, R: 2018 }[abbrev[1]]
    return toIsoDate(base + Number(abbrev[2]), abbrev[3], abbrev[4]) ?? text
  }
  return text
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
const failures = []
let totalOperators = 0

for (const source of sources) {
  let rows
  try {
    rows = source.delimiter
      ? splitDelimited(parseCsv(await fetchCsv(source)), source.delimiter)
      : source.format === "html"
      ? await fetchHtmlRows(source)
      : source.format === "xlsx"
        ? await fetchXlsxRows(source)
        : parseCsv(await fetchCsv(source))
  } catch (error) {
    failures.push({ city: source.city, reason: String(error.message).slice(0, 60) })
    console.log(`${source.city}: 取得失敗 ${String(error.message).slice(0, 60)}`)
    continue
  }

  const header = rows[source.headerRow] ?? []
  // 列名の揺れが大きい種別は自動推定に任せ、推定結果をログに出して間違いに気づけるようにする
  const columnSpec = source.autoColumns ? autoMapColumns(header) : source.columns
  if (source.autoColumns) {
    console.log(`${source.city}: 列を自動判定 ${Object.entries(columnSpec).map(([k, v]) => `${k}=${v}`).join(" ")}`)
  }
  const columnIndex = Object.fromEntries(
    Object.entries(columnSpec).map(([key, label]) => [key, indexOfColumn(header, label)]),
  )
  // 見出しの付いていない列がある表（大阪府の美容所一覧など）は列位置で指定する
  for (const [key, index] of Object.entries(source.columnsByIndex ?? {})) {
    columnIndex[key] = index
  }
  const itemIndex = Object.fromEntries(
    Object.entries(source.items).map(([key, label]) => [key, indexOfColumn(header, label)]),
  )

  const missing = Object.entries(columnIndex).filter(([, index]) => index < 0).map(([key]) => key)
  if (missing.length) {
    failures.push({ city: source.city, reason: `列が見つからない (${missing.join(", ")})` })
    console.log(`${source.city}: 列が見つからない (${missing.join(", ")}) — マッピングの更新が必要`)
    continue
  }

  const truthy = new Set(source.truthyValues ?? ["1", "○"])
  const cell = (row, key) => (columnIndex[key] >= 0 ? String(row[columnIndex[key]] ?? "").trim() : "")

  const operators = []
  for (const row of rows.slice(source.headerRow + 1)) {
    const name = cell(row, "name")
    if (!name) continue
    // 廃業日が入っている施設は現存しないため載せない
    if (cell(row, "closedDate")) continue

    let expiry = toIsoDate(cell(row, "expiryYear"), cell(row, "expiryMonth"), cell(row, "expiryDay"))
    // 満了日を1列で持つ自治体（柏市の「登録満了年月日」など）。和暦もISOに寄せる
    if (!expiry) {
      const single = normalizeDate(cell(row, "expiry"))
      if (single && /^\d{4}-\d{2}-\d{2}$/.test(single)) expiry = single
    }
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
      issuedDate: normalizeDate(cell(row, "issuedDate")),
      applicant: cell(row, "applicant") || null,
      manager: cell(row, "manager") || null,
      kind,
      animals,
      expiry,
      expiryNote,
      expired: expiry ? expiry < today : false,
      closedDate: cell(row, "closedDate") || null,
      items,
    })
  }

  if (!operators.length) {
    failures.push({ city: source.city, reason: "業者0件" })
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
    const cityIndexInRow = source.cityColumnIndex ?? (source.cityColumn ? indexOfColumn(header, source.cityColumn) : -1)
    for (const [index, operator] of operators.entries()) {
      // 推奨データセット形式は市区町村を専用列で持つ。住所からの推定より確実。
      const city = cityIndexInRow >= 0
        ? String(rows[source.headerRow + 1 + index]?.[cityIndexInRow] ?? "").trim() || null
        : extractCity(operator.address, source.prefecture)
      if (!city) continue
      // 中核市などは独自に許認可を出しており、県のファイルに紛れ込んだ数件を
      // そのまま足すと、その市の一覧が県側の不完全なデータで上書きされてしまう。
      if (source.excludeCities?.includes(city)) continue
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

// 取得に失敗したソースは、その自治体が丸ごと欠けた状態で公開されてしまう。
// 件数が前回より減っていても気づけないため、必ず目立つ形で報告する。
if (failures.length) {
  console.log(`
取り込めなかったソース ${failures.length} / ${sources.length} 件`)
  for (const failure of failures) console.log(`  ${failure.city}: ${failure.reason}`)
  console.log("上記の自治体は今回のデータから欠落している。原因を確認して再実行すること。")
  process.exitCode = 1
} else {
  console.log(`
全 ${sources.length} ソースを取り込んだ`)
}
