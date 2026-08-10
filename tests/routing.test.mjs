import assert from "node:assert/strict"
import test from "node:test"

import { PORTAL_HOST, areaPath, canonicalOrigin, isKnownHost, normalizeHost, verticalForHost } from "../app/lib/routes.ts"
import { verticals } from "../app/lib/verticals.ts"

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
})
