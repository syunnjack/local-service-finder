/* eslint-disable @next/next/no-html-link-for-pages, react-hooks/exhaustive-deps */
"use client"

import { FormEvent, useEffect, useState } from "react"
import type { Vertical } from "../../lib/verticals"
import { PermitResults } from "./permit-results"
import { permits, VERTICALS_WITH_PERMITS, municipalityLabel, type PermitOperator } from "../../lib/permits"

type Review = { id: number; nickname: string; rating: number; body: string; helpful: number }

export default function VerticalPage({ vertical: v }: { vertical: Vertical }) {
  // 許可業者の実データがある業種かどうか。無い業種で架空の業者を並べることはしない。
  const hasPermits = VERTICALS_WITH_PERMITS.has(v.slug)
  const permitCities = permits.municipalities.map(municipalityLabel)

  const [city, setCity] = useState(permitCities[0] ?? "")
  // 目的の選択UIは実データが揃うまで出さない。送信内容には既定値を載せる。
  const service = v.services[0]
  const [selectedName, setSelectedName] = useState<string | null>(null)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [email, setEmail] = useState("")
  const [consent, setConsent] = useState(false)
  const [status, setStatus] = useState("")
  const [reviews, setReviews] = useState<Review[]>([])
  const [nickname, setNickname] = useState("")
  const [rating, setRating] = useState(5)
  const [body, setBody] = useState("")
  const [reviewStatus, setReviewStatus] = useState("")

  const track = (event: string, providerId?: string | null) =>
    fetch("/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ vertical: v.slug, city, providerId, event }),
    }).catch(() => {})

  useEffect(() => {
    track("view")
    fetch(`/api/reviews?vertical=${v.slug}&city=${encodeURIComponent(city)}`)
      .then((r) => r.json())
      .then((x) => setReviews(x.reviews || []))
      .catch(() => setReviews([]))
  }, [city, v.slug])

  function chooseOperator(operator: PermitOperator) {
    setSelectedName(operator.name)
    setSelectedId(operator.permitNo)
    track("cta", operator.permitNo)
    document.getElementById("request")?.scrollIntoView({ behavior: "smooth" })
  }

  async function lead(e: FormEvent) {
    e.preventDefault()
    track("cta", selectedId)
    const r = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ vertical: v.slug, providerId: selectedId, city, service, home: "未指定", email, consent }),
    })
    const b = (await r.json()) as { error?: string }
    setStatus(r.ok ? `${v.cta}を受け付けました` : b.error || "登録できませんでした")
    if (r.ok) setEmail("")
  }

  async function review(e: FormEvent) {
    e.preventDefault()
    const r = await fetch("/api/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ vertical: v.slug, providerId: selectedId, city, nickname, rating, body }),
    })
    const b = (await r.json()) as { error?: string; message?: string }
    setReviewStatus(r.ok ? b.message || "投稿しました" : b.error || "投稿できませんでした")
    if (r.ok) { setNickname(""); setBody("") }
  }

  return (
    <main style={{ "--green": v.accent } as React.CSSProperties}>
      <header>
        <a href="/" className="logo">まち<span>セレクト</span></a>
        <nav><a href="#results">比較</a><a href="#reviews">口コミ</a><a href="#request">{v.cta}</a></nav>
      </header>

      <section className="hero">
        <p>{v.category.toUpperCase()} · LOCAL COMPARISON</p>
        {hasPermits ? (
          <>
            <h1>許可を持つ<br /><em>{v.name}業者だけ。</em></h1>
            <span>
              自治体が公開している一般廃棄物収集運搬業の許可業者一覧から、
              許可番号・許可期限・対応品目を確認できます。無許可業者は掲載していません。
            </span>
            <a href="#results" onClick={() => track("compare")}>許可業者を見る →</a>
            <small>掲載データは自治体の公開情報にもとづく実データです。</small>
          </>
        ) : (
          <>
            <h1>{v.name}を、<br /><em>条件まで透明に。</em></h1>
            <span>料金だけでなく、{v.points.join("・")}まで比べられるようにします。</span>
            <small>この業種の掲載データは準備中です。公開でき次第、実在の事業者のみを掲載します。</small>
          </>
        )}
      </section>

      <section className="results" id="results">
        <div className="head">
          <div>
            <p>LOCAL RESULTS</p>
            <h2>{hasPermits ? `${v.name}の許可業者` : v.name}</h2>
          </div>
          {hasPermits && <span>自治体の許可業者一覧より</span>}
        </div>

        {hasPermits ? (
          <PermitResults onSelect={chooseOperator} onMunicipalityChange={setCity} />
        ) : (
          <div className="preparing">
            <p>
              この業種はまだ実データを掲載していません。
              確認できていない事業者や、根拠のない評価・料金を並べることはしません。
            </p>
            <p>
              公的に確認できる情報（許認可・登録の有無など）が用意でき次第、公開します。
            </p>
          </div>
        )}
      </section>

      <section className="compare">
        {v.points.map((x, i) => (
          <div key={x}><b>0{i + 1}</b><h3>{x}を比較</h3><p>同じ地域・目的の候補をそろえて違いを表示します。</p></div>
        ))}
      </section>

      <section className="review-section" id="reviews">
        <div>
          <p className="eyebrow">LOCAL REVIEWS</p>
          <h2>{city ? `${city}の口コミ` : "口コミ"}</h2>
          {reviews.length ? reviews.map((x) => (
            <article className="review" key={x.id}>
              <b>{"★".repeat(x.rating)} <span>{x.nickname}</span></b>
              <p>{x.body}</p>
              <small>役に立った {x.helpful}</small>
            </article>
          )) : <p className="empty">承認済みの口コミはまだありません。最初の体験談を投稿できます。</p>}
        </div>
        <form onSubmit={review}>
          <h3>口コミを投稿</h3>
          <label>ニックネーム<input required value={nickname} onChange={(e) => setNickname(e.target.value)} /></label>
          <label>評価
            <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
              {[5, 4, 3, 2, 1].map((x) => <option key={x} value={x}>{x}つ星</option>)}
            </select>
          </label>
          <label>具体的な体験（10〜500文字）
            <textarea required minLength={10} maxLength={500} value={body} onChange={(e) => setBody(e.target.value)} />
          </label>
          <button>審査へ投稿 →</button>
          <output>{reviewStatus}</output>
        </form>
      </section>

      <section className="request" id="request">
        <div>
          <p>FREE MATCHING</p>
          <h2>{v.cta}。</h2>
          <span>
            {selectedName ? <>選択中：<b>{selectedName}</b><br /></> : null}
            提携先への送客には広告報酬が発生する場合があります。
          </span>
        </div>
        <form onSubmit={lead}>
          <label>通知先メール
            <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
          </label>
          <p>{city}{service ? `・${service}` : ""}</p>
          <label className="consent">
            <input required type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} /> 連絡とプライバシーポリシーに同意
          </label>
          <button disabled={!consent}>{v.cta} →</button>
          <output>{status}</output>
        </form>
      </section>

      <footer>
        <a className="logo" href="/">まち<span>セレクト</span></a>
        <p>{v.name}を、条件まで透明に。</p>
      </footer>
    </main>
  )
}
