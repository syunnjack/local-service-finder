/**
 * 26ドメイン（25業種 + ポータル）が公開できる状態かを一度に点検する。
 *
 * 手で1つずつ調べると見落とすうえ、
 * 「反映されたはず」と「実際に反映されている」がずれたときに気づけない。
 * 公開DNSに問い合わせて、いま外から見えている状態だけを報告する。
 *
 * 使い方: node scripts/check-domains.mjs
 */
import { readFile } from "node:fs/promises"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")

/** Sites（Cloudflare for SaaS）が案内している接続先 */
const SITES_IPS = new Set(["162.159.143.30", "172.66.3.26"])
const SITES_CNAME = "custom-domains.chatgpt.site"
/** お名前.comが取得直後に向けているページ */
const PARKING_IP = "150.95.255.38"

async function resolve(name, type) {
  try {
    const res = await fetch(`https://dns.google/resolve?name=${encodeURIComponent(name)}&type=${type}`, {
      signal: AbortSignal.timeout(20000),
    })
    if (!res.ok) return { status: -1, values: [] }
    const data = await res.json()
    return { status: data.Status, values: (data.Answer ?? []).map((a) => a.data) }
  } catch {
    return { status: -1, values: [] }
  }
}

/**
 * お名前.comは未設定のサブドメインにもワイルドカードでSPFを返す。
 * それを「設定済み」と数えないよう、期待する接頭辞を持つ値だけ見る。
 */
function hasToken(values, prefix) {
  return values.some((v) => v.replace(/"/g, "").trim().startsWith(prefix))
}

async function probe(domain) {
  const [a, cname, cfRoot, openaiRoot] = await Promise.all([
    resolve(domain, "A"),
    resolve(`www.${domain}`, "CNAME"),
    resolve(`_cf-custom-hostname.${domain}`, "TXT"),
    resolve(`_openai-site-verification.${domain}`, "TXT"),
  ])

  const ips = a.values
  let dnsState
  if (a.status === 3) dnsState = "未登録"
  else if (ips.some((ip) => SITES_IPS.has(ip))) dnsState = "Sites"
  else if (ips.includes(PARKING_IP)) dnsState = "お名前.com既定"
  else if (ips.length) dnsState = `他(${ips[0]})`
  else dnsState = "Aなし"

  let https = "-"
  let title = ""
  if (a.status !== 3) {
    try {
      const res = await fetch(`https://${domain}/`, { redirect: "follow", signal: AbortSignal.timeout(20000) })
      https = String(res.status)
      const html = await res.text()
      title = (/<title>([^<]*)<\/title>/.exec(html)?.[1] ?? "").trim().slice(0, 30)
    } catch {
      https = "不通"
    }
  }

  return {
    domain,
    dnsState,
    www: cname.values.some((v) => v.replace(/\.$/, "") === SITES_CNAME) ? "済" : "-",
    cf: hasToken(cfRoot.values, "0") || cfRoot.values.some((v) => /^"?[0-9a-f-]{36}"?$/.test(v.trim())) ? "済" : "-",
    openai: hasToken(openaiRoot.values, "openai-site-verification=") ? "済" : "-",
    https,
    title,
  }
}

const verticalsSource = await readFile(join(root, "app/lib/verticals.ts"), "utf8")
const domains = ["machiselect.jp", ...[...verticalsSource.matchAll(/"([a-z0-9-]+\.jp)"\]/g)].map((m) => m[1])]

const tokens = JSON.parse(await readFile(join(root, "data/search-console.json"), "utf8"))

console.log(`${domains.length}ドメインを点検する\n`)
console.log(`${"ドメイン".padEnd(20)}${"DNS".padEnd(18)}${"www".padEnd(5)}${"cf".padEnd(4)}${"openai".padEnd(8)}${"HTTPS".padEnd(7)}${"SC".padEnd(4)}中身`)
console.log("-".repeat(104))

const rows = []
for (const domain of domains) {
  const row = await probe(domain)
  row.sc = (tokens[domain] ?? "").trim() ? "済" : "-"
  rows.push(row)
  console.log(
    row.domain.padEnd(20) + row.dnsState.padEnd(18) + row.www.padEnd(5) +
    row.cf.padEnd(4) + row.openai.padEnd(8) + row.https.padEnd(7) + row.sc.padEnd(4) + row.title,
  )
}

const ready = rows.filter((r) => r.dnsState === "Sites" && r.https === "200")
const parked = rows.filter((r) => r.dnsState === "お名前.com既定")
const missing = rows.filter((r) => r.dnsState === "未登録")
const foreign = rows.filter((r) => r.dnsState.startsWith("他"))

console.log(`\n公開できている: ${ready.length} / ${rows.length}`)
if (parked.length) console.log(`  DNS未変更（お名前.comの既定のまま）: ${parked.length}件 ${parked.map((r) => r.domain).join(", ")}`)
if (missing.length) console.log(`  未登録: ${missing.length}件 ${missing.map((r) => r.domain).join(", ")}`)
if (foreign.length) console.log(`  別の接続先を向いている: ${foreign.length}件 ${foreign.map((r) => `${r.domain}（${r.title || "?"}）`).join(", ")}`)

console.log("\n凡例: cf=_cf-custom-hostname / openai=_openai-site-verification / SC=Search Consoleのトークン記入")
