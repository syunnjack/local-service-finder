"use client"

import { useMemo, useState } from "react"
import { ITEM_LABELS, ANIMAL_LABELS, type PermitOperator, type MunicipalitySummary } from "../../lib/permits"

export type PermitData = {
  config: { category: string; defaultKind?: string; headline: string; description: string }
  generatedAt: string
  summaries: MunicipalitySummary[]
  municipality: {
    muniCode: string
    prefecture: string
    city: string
    permitType: string
    license: string
    attribution: string
    sourcePage: string
    operatorCount: number
  } | null
  keyword: string
  matchedCount: number
  operators: PermitOperator[]
  limit: number
}

/**
 * 自治体が公開している許認可の登録事業者を表示する。
 *
 * ここに出るのは自治体の許可・登録・確認を受けた事業者のみ。
 * 不用品回収は無許可業者による不法投棄、ペットホテルは無登録の預かり、
 * 美容所は無届の営業がそれぞれ問題になっており、
 * 「許認可の有無」が利用者にとって最も重要な比較軸になる。
 *
 * 自治体の切り替えと絞り込み語はサーバー側で処理する。
 * 全自治体の全事業者をクライアントへ渡すと8MBを超えるため。
 * 品目・区分の絞り込みは、読み込み済みの範囲に対してのみ行う。
 */
export function PermitResults({
  data,
  onSelect,
}: {
  data: PermitData
  onSelect?: (operator: PermitOperator) => void
}) {
  const { municipality, operators, summaries, keyword, matchedCount, limit, generatedAt } = data
  const [item, setItem] = useState("all")
  const [kind, setKind] = useState(data.config.defaultKind ?? "all")

  const items = useMemo(() => {
    const keys = new Set<string>()
    for (const operator of operators) {
      for (const [key, value] of Object.entries(operator.items)) if (value) keys.add(key)
    }
    return [...keys].filter((key) => ITEM_LABELS[key])
  }, [operators])

  const kinds = useMemo(
    () => [...new Set(operators.map((operator) => operator.kind).filter(Boolean))].sort((a, b) => a!.localeCompare(b!, "ja")) as string[],
    [operators],
  )

  const shown = useMemo(
    () => operators
      .filter((operator) => item === "all" || operator.items[item])
      .filter((operator) => kind === "all" || operator.kind === kind)
      .sort((a, b) => Number(a.expired) - Number(b.expired) || a.name.localeCompare(b.name, "ja")),
    [operators, item, kind],
  )

  if (!municipality) return <p className="empty">許可業者データを準備しています。</p>

  return (
    <>
      {/* 自治体と検索語はサーバーで解決するため通常のGETフォームにする */}
      <form className="permit-filters" method="get">
        <label>
          市区町村
          <select name="muni" defaultValue={municipality.muniCode}>
            {summaries.map((s) => (
              <option key={s.muniCode} value={s.muniCode}>
                {s.prefecture}{s.city}（{s.operatorCount.toLocaleString("ja-JP")}件）
              </option>
            ))}
          </select>
        </label>
        <label>
          店名・住所で絞り込む
          <input type="text" name="q" defaultValue={keyword} placeholder="例：○○町、△△店" />
        </label>
        <button type="submit">この条件で探す</button>
      </form>

      {(items.length > 0 || kinds.length > 0) && (
        <div className="permit-filters">
          {items.length > 0 && (
            <label>
              対応品目
              <select value={item} onChange={(event) => setItem(event.target.value)}>
                <option value="all">すべて</option>
                {items.map((key) => <option key={key} value={key}>{ITEM_LABELS[key]}</option>)}
              </select>
            </label>
          )}
          {kinds.length > 0 && (
            <label>
              登録の区分
              <select value={kind} onChange={(event) => setKind(event.target.value)}>
                <option value="all">すべて</option>
                {kinds.map((value) => <option key={value} value={value}>{value}</option>)}
              </select>
            </label>
          )}
        </div>
      )}

      <p className="permit-count">
        {municipality.prefecture}{municipality.city}の{municipality.permitType}
        {" "}<b>{matchedCount.toLocaleString("ja-JP")}</b> 件
        {matchedCount > limit && <span>（うち{limit}件を表示。絞り込むと残りも確認できます）</span>}
      </p>

      {shown.length === 0 ? (
        <p className="empty">この条件に当てはまる事業者は見つかりませんでした。</p>
      ) : (
        <div className="permit-list">
          {shown.map((operator, index) => (
            <article className={operator.expired ? "permit expired" : "permit"} key={`${operator.permitNo}-${operator.name}-${index}`}>
              <header>
                <b>{operator.name}</b>
                {operator.expired
                  ? <span className="permit-badge warn">許可期限切れ</span>
                  : <span className="permit-badge ok">{operator.kind ?? "確認済み"}</span>}
              </header>
              <dl>
                {operator.permitNo && <div><dt>許可・登録番号</dt><dd>{operator.permitNo}</dd></div>}
                {(operator.expiry || operator.expiryNote) && (
                  <div><dt>許可期限</dt><dd>{operator.expiry ?? operator.expiryNote}</dd></div>
                )}
                {operator.issuedDate && <div><dt>確認・登録日</dt><dd>{operator.issuedDate}</dd></div>}
                {operator.address && <div><dt>所在地</dt><dd>{operator.address}</dd></div>}
                {operator.phone && <div><dt>電話</dt><dd><a href={`tel:${operator.phone.replace(/[^\d+]/g, "")}`}>{operator.phone}</a></dd></div>}
                {operator.applicant && <div><dt>事業者</dt><dd>{operator.applicant}</dd></div>}
                {operator.manager && <div><dt>動物取扱責任者</dt><dd>{operator.manager}</dd></div>}
                {operator.vehicles && <div><dt>運搬車両</dt><dd>{operator.vehicles}台</dd></div>}
                {operator.itemsText && <div><dt>許可品目</dt><dd>{operator.itemsText}</dd></div>}
                {operator.note && <div><dt>限定事項</dt><dd>{operator.note}</dd></div>}
                {Object.entries(operator.animals ?? {}).map(([key, value]) => (
                  <div key={key}><dt>{ANIMAL_LABELS[key] ?? key}</dt><dd>{value}</dd></div>
                ))}
              </dl>
              <ul className="permit-items">
                {Object.entries(operator.items)
                  .filter(([key, value]) => value && ITEM_LABELS[key])
                  .map(([key]) => <li key={key}>{ITEM_LABELS[key]}</li>)}
              </ul>
              {onSelect && (
                <button type="button" onClick={() => onSelect(operator)}>
                  この事業者について問い合わせる →
                </button>
              )}
            </article>
          ))}
        </div>
      )}

      <p className="permit-source">
        出典: {municipality.attribution}「{municipality.permitType}」（{municipality.license}）／
        <a href={municipality.sourcePage} target="_blank" rel="noreferrer">公開ページ</a>
        ・取得 {generatedAt}
        <br />
        許可・登録の有無や期限は取得時点のものです。依頼前に自治体の最新情報でご確認ください。
        ここに掲載していない事業者が無許可・無登録とは限りません（他の自治体で許可を受けている場合があります）。
      </p>
    </>
  )
}
