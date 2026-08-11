import tokens from "../../data/search-console.json"
import { normalizeHost } from "./routes"

/**
 * Search Console の所有権確認（HTMLタグ方式）に使うトークン。
 *
 * 26ドメインを1つのコードで配信しているので、配信中のホストに対応する
 * トークンだけを出す。よそのドメインのトークンを出すと確認が通らない。
 *
 * トークンは仕様上ページのHTMLに公開される値なので、秘密ではない。
 * 環境変数にせずリポジトリの data/search-console.json に置いてあるのは、
 * 5ブランチ・26ドメインぶんを取り違えずに管理するため。
 */

const TABLE = tokens as Record<string, string>

/** Google が発行するトークンの形。43文字前後の英数字と - _ からなる。 */
const TOKEN_PATTERN = /^[A-Za-z0-9_-]{20,100}$/

/**
 * 画面からのコピー方法が人によって違うので、よくある形は受け付ける。
 *   - トークンだけ                          XYZ...
 *   - メタタグまるごと                      <meta name="google-site-verification" content="XYZ..." />
 *   - DNS TXT 用の形                        google-site-verification=XYZ...
 */
export function extractToken(value: string): string | null {
  const raw = (value ?? "").trim()
  if (!raw) return null

  const fromTag = /content=["']([^"']+)["']/.exec(raw)
  const candidate = (fromTag?.[1] ?? raw).replace(/^google-site-verification[=:]\s*/i, "").trim()

  return TOKEN_PATTERN.test(candidate) ? candidate : null
}

/** 配信中のホストのトークン。未設定や書式が違うものは出さない。 */
export function verificationToken(host: string): string | null {
  return extractToken(TABLE[normalizeHost(host)] ?? "")
}

/** 設定漏れの確認用。テストと運用の点検で使う。 */
export function verificationTable() {
  return Object.entries(TABLE).map(([domain, value]) => ({
    domain,
    filled: value.trim() !== "",
    valid: extractToken(value) !== null,
  }))
}
