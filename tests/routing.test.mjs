import assert from "node:assert/strict"
import test from "node:test"

import { PORTAL_HOST, areaPath, canonicalOrigin, isKnownHost, normalizeHost, verticalForHost } from "../app/lib/routes.ts"
import { verticals } from "../app/lib/verticals.ts"
import { extractToken, verificationTable, verificationToken } from "../app/lib/search-console.ts"

/**
 * 25ドメインを1つのコードで配信しているので、
 * ホストの解決を間違えると全ドメインの canonical とサイトマップが同時に壊れる。
 * 実際に一度、24ジャンル分が machiselect.jp のURLを申告していた。
 */

test("25ジャンルすべてが自分のドメインから引ける", () => {
  assert.equal(verticals.length, 25)
  for (const vertical of verticals) {
    assert.equal(verticalForHost(vertical.domain)?.slug, vertical.slug, vertical.domain)
  }
})

test("www とポート番号と大文字を無視する", () => {
  const [first] = verticals
  for (const host of [`www.${first.domain}`, `${first.domain}:8787`, first.domain.toUpperCase()]) {
    assert.equal(verticalForHost(host)?.slug, first.slug, host)
  }
  assert.equal(normalizeHost(null), "")
})

test("ドメインが重複していない", () => {
  const domains = verticals.map((v) => v.domain)
  assert.equal(new Set(domains).size, domains.length)
  assert.ok(!domains.includes(PORTAL_HOST), "ポータルのドメインをジャンルに使わない")
})

test("正規URLは常に自分の本番ドメインを指す", () => {
  for (const vertical of verticals) {
    assert.equal(canonicalOrigin(vertical.domain), `https://${vertical.domain}`)
    // プレビュー用のホストで配信されても、そのホストを正規URLにはしない
    assert.equal(canonicalOrigin(`preview-${vertical.domain}.chatgpt.site`), `https://${PORTAL_HOST}`)
  }
  assert.equal(canonicalOrigin(PORTAL_HOST), `https://${PORTAL_HOST}`)
})

test("想定外のホストは既知として扱わない", () => {
  assert.ok(isKnownHost(PORTAL_HOST))
  assert.ok(isKnownHost(`www.${verticals[0].domain}`))
  assert.ok(!isKnownHost("preview.chatgpt.site"))
  assert.ok(!isKnownHost(""))
})

test("市区町村ページのURLの形", () => {
  assert.equal(areaPath("131105"), "/area/131105")
  // 1ページ目に /p/1 は付けない。同じ中身が2つのURLで出てしまう。
  assert.equal(areaPath("131105", 1), "/area/131105")
  assert.equal(areaPath("131105", 2), "/area/131105/p/2")
})

test("県が一括公開している分のコードをURLに置ける", () => {
  // 「24000-津市」のように日本語を含むコードがある
  assert.equal(areaPath("24000-津市"), "/area/24000-%E6%B4%A5%E5%B8%82")
  assert.equal(areaPath("24000-津市", 3), "/area/24000-%E6%B4%A5%E5%B8%82/p/3")
  assert.ok(!/[^\x00-\x7F]/.test(areaPath("24000-津市")), "URLに生の日本語を残さない")
})

/**
 * Search Console の所有権確認は、対応表の取り違えで簡単に失敗する。
 * 26ドメインぶんを目視で確かめるのは現実的でないのでここで固定する。
 */

test("所有権確認の対応表に26ドメインすべてがある", () => {
  const listed = new Set(verificationTable().map((row) => row.domain))
  assert.equal(listed.size, verticals.length + 1)
  assert.ok(listed.has(PORTAL_HOST), `${PORTAL_HOST} が対応表にない`)
  for (const vertical of verticals) {
    assert.ok(listed.has(vertical.domain), `${vertical.domain} が対応表にない`)
  }
})

test("記入済みのトークンはすべて読み取れる形になっている", () => {
  for (const row of verificationTable()) {
    if (row.filled) assert.ok(row.valid, `${row.domain} のトークンが読み取れない`)
  }
})

test("よくある貼り付け方をどれも受け取れる", () => {
  const token = "AbCd1234567890efghijKLMNOPqrstuvwxyz-_012345"
  assert.equal(extractToken(token), token)
  assert.equal(extractToken(`<meta name="google-site-verification" content="${token}" />`), token)
  assert.equal(extractToken(`google-site-verification=${token}`), token)
  assert.equal(extractToken("  "), null)
  assert.equal(extractToken("これはトークンではない"), null)
})

test("未設定のドメインではタグを出さない", () => {
  for (const row of verificationTable()) {
    if (!row.filled) assert.equal(verificationToken(row.domain), null, row.domain)
  }
  // 対応表に無いホストにも出さない
  assert.equal(verificationToken("preview.chatgpt.site"), null)
})
