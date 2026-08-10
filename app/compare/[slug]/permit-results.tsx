"use client"

import { useMemo, useState } from "react"
import {
  permits,
  municipalitiesFor,
  availableItems,
  availableKinds,
  municipalityLabel,
  ITEM_LABELS,
  ANIMAL_LABELS,
  type PermitOperator,
} from "../../lib/permits"

/**
 * 自治体が公開している許認可の登録業者を表示する。
 *
 * ここに出るのは自治体の許可・登録を受けた事業者のみ。無許可の事業者は載らない。
 * 不用品回収は無許可業者による不法投棄・高額請求、ペットホテルは無登録の預かりが
 * それぞれ問題になっており、「許可・登録の有無」が利用者にとって最も重要な比較軸になる。
 *
 * 許可期限が切れている業者も除外せず、期限切れであることを明示する。
 * 勝手に消すと自治体の公開情報と食い違うため。
 */
export function PermitResults({
  category,
  defaultKind,
  onSelect,
  onMunicipalityChange,
}: {
  category: string
  defaultKind?: string
  onSelect?: (operator: PermitOperator) => void
  onMunicipalityChange?: (label: string) => void
}) {
  const municipalities = useMemo(() => municipalitiesFor(category), [category])
  const [muniCode, setMuniCode] = useState(municipalities[0]?.muniCode ?? "")
  const [item, setItem] = useState("all")
  const [kind, setKind] = useState(defaultKind ?? "all")

  const municipality = municipalities.find((m) => m.muniCode === muniCode) ?? municipalities[0]
  const items = useMemo(() => (municipality ? availableItems(municipality) : []), [municipality])
  const kinds = useMemo(() => (municipality ? availableKinds(municipality) : []), [municipality])

  const operators = useMemo(() => {
    if (!municipality) return []
    return municipality.operators
      .filter((operator) => item === "all" || operator.items[item])
      .filter((operator) => kind === "all" || operator.kind === kind)
      .sort((a, b) => Number(a.expired) - Number(b.expired) || a.name.localeCompare(b.name, "ja"))
  }, [municipality, item, kind])

  if (!municipality) {
    return <p className="empty">許可業者データを準備しています。</p>
  }

  return (
    <>
      <div className="permit-filters">
        <label>
          市区町村
          <select
            value={muniCode}
            onChange={(event) => {
              setMuniCode(event.target.value)
              setItem("all")
              // 口コミ欄など親側の地域表示を選択に追従させる
              const next = municipalities.find((m) => m.muniCode === event.target.value)
              if (next) onMunicipalityChange?.(municipalityLabel(next))
            }}
          >
            {municipalities.map((m) => (
              <option key={m.muniCode} value={m.muniCode}>
                {municipalityLabel(m)}（{m.operatorCount}件）
              </option>
            ))}
          </select>
        </label>

        {items.length > 0 && (
          <label>
            回収してほしいもの
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

        <p className="permit-count">
          {municipalityLabel(municipality)}の{municipality.permitType} <b>{operators.length}</b> 件
        </p>
      </div>

      {operators.length === 0 ? (
        <p className="empty">この条件に当てはまる事業者は見つかりませんでした。</p>
      ) : (
        <div className="permit-list">
          {operators.map((operator, index) => (
            <article className={operator.expired ? "permit expired" : "permit"} key={`${operator.permitNo}-${operator.name}-${index}`}>
              <header>
                <b>{operator.name}</b>
                {operator.expired
                  ? <span className="permit-badge warn">許可期限切れ</span>
                  : <span className="permit-badge ok">{operator.kind ?? "許可あり"}</span>}
              </header>
              <dl>
                {operator.permitNo && <div><dt>許可・登録番号</dt><dd>{operator.permitNo}</dd></div>}
                {(operator.expiry || operator.expiryNote) && (
                  <div><dt>許可期限</dt><dd>{operator.expiry ?? operator.expiryNote}</dd></div>
                )}
                {operator.issuedDate && <div><dt>登録年月日</dt><dd>{operator.issuedDate}</dd></div>}
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
        ・取得 {permits.generatedAt}
        <br />
        許可・登録の有無や期限は取得時点のものです。依頼前に自治体の最新情報でご確認ください。
        ここに掲載していない事業者が無許可・無登録とは限りません（他の自治体で許可を受けている場合があります）。
      </p>
    </>
  )
}
