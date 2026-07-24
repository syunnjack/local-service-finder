"use client";

import Link from "next/link";
import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import { getProviders, type Provider } from "../../lib/providers";
import type { Vertical } from "../../lib/verticals";

type Review = { id: number; nickname: string; rating: number; body: string; helpful: number };
const cities = ["東京都", "大阪府", "愛知県", "福岡県"];

export default function VerticalPage({ vertical }: { vertical: Vertical }) {
  const [city, setCity] = useState(cities[0]);
  const [service, setService] = useState(vertical.services[0]);
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [leadStatus, setLeadStatus] = useState("");
  const [reviews, setReviews] = useState<Review[]>([]);
  const [nickname, setNickname] = useState("");
  const [rating, setRating] = useState(5);
  const [body, setBody] = useState("");
  const [reviewStatus, setReviewStatus] = useState("");
  const providers = useMemo(() => getProviders(vertical.slug), [vertical.slug]);
  const [selected, setSelected] = useState<Provider | undefined>(() => getProviders(vertical.slug)[0]);

  const track = useCallback((event: string, providerId?: string) => fetch("/api/events", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ vertical: vertical.slug, city, providerId, event }) }).catch(() => undefined), [city, vertical.slug]);

  useEffect(() => {
    track("view");
    fetch(`/api/reviews?vertical=${vertical.slug}&city=${encodeURIComponent(city)}`).then((response) => response.json()).then((data) => setReviews(data.reviews || [])).catch(() => setReviews([]));
  }, [city, vertical.slug, track]);

  async function submitLead(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selected) return;
    track("cta", selected.id);
    const response = await fetch("/api/leads", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ vertical: vertical.slug, providerId: selected.id, city, service, home: "web-comparison", email, consent }) });
    const data = (await response.json()) as { error?: string };
    setLeadStatus(response.ok ? "相談内容を受け付けました。担当者からの連絡をお待ちください。" : data.error || "送信に失敗しました。");
    if (response.ok) setEmail("");
  }

  async function submitReview(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const response = await fetch("/api/reviews", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ vertical: vertical.slug, providerId: selected?.id || "", city, nickname, rating, body }) });
    const data = (await response.json()) as { error?: string; message?: string };
    setReviewStatus(response.ok ? data.message || "口コミを受け付けました。確認後に掲載します。" : data.error || "送信に失敗しました。");
    if (response.ok) { setNickname(""); setBody(""); }
  }

  const faqs = [
    { question: `${vertical.name}の料金はどこで確認できますか？`, answer: "料金・追加費用・キャンペーンは変動するため、各掲載事業者の公式ページまたは見積もりで確認してください。" },
    { question: "掲載事業者はどのように選んでいますか？", answer: "公式サイトでサービス内容と申込先を確認できる事業者を掲載し、出典と確認日を表示しています。" },
    { question: "口コミはすぐに公開されますか？", answer: "口コミは投稿後に内容を確認します。個人情報や誹謗中傷、宣伝目的の投稿は公開しません。" },
  ];
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })),
  };

  return <main style={{ "--green": vertical.accent } as React.CSSProperties}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
    <header><Link href="/" className="logo">まち<span>セレクト</span></Link><nav><a href="#results">掲載事業者</a><a href="#reviews">口コミ</a><a href="#request">相談する</a></nav></header>
    <section className="hero"><p>{vertical.category.toUpperCase()} · LOCAL COMPARISON</p><h1>{city}の<br /><em>{vertical.name}を比較</em></h1><span>公式サイトで確認できるサービス内容をもとに掲載しています。料金・空き状況・対応範囲は変動するため、申込前に必ず各社の公式情報をご確認ください。</span><a href="#results" onClick={() => track("compare")}>掲載事業者を見る</a></section>
    <section className="search" aria-label="比較条件"><label>都道府県<select value={city} onChange={(event) => setCity(event.target.value)}>{cities.map((item) => <option key={item}>{item}</option>)}</select></label><label>希望サービス<select value={service} onChange={(event) => setService(event.target.value)}>{vertical.services.map((item) => <option key={item}>{item}</option>)}</select></label><label>比較ポイント<select>{vertical.points.map((item) => <option key={item}>{item}</option>)}</select></label><a href="#results" onClick={() => track("compare")}>条件を反映</a></section>
    <section className="results" id="results"><div className="head"><div><p>OFFICIAL LISTINGS</p><h2>{city}の{vertical.name}</h2></div><span>{providers.length}件の公式掲載</span></div>{providers.length ? <div className="cards">{providers.map((provider) => <article key={provider.id} className={selected?.id === provider.id ? "selected-provider" : ""}><div><b>{provider.name}</b><strong>公式情報</strong></div><small>{provider.coverage}</small><h3>料金は公式確認</h3><p>{service}を含む対応メニューは公式サイトでご確認ください。</p><ul>{provider.services.map((item) => <li key={item}>{item}</li>)}</ul><dl>{provider.highlights.map((item, index) => <div key={item}><dt>{vertical.points[index] || "確認事項"}</dt><dd>{item}</dd></div>)}</dl><a className="official-link" href={provider.sourceUrl} target="_blank" rel="noreferrer" onClick={() => track("cta", provider.id)}>公式サイトで確認</a><button onClick={() => { setSelected(provider); document.getElementById("request")?.scrollIntoView({ behavior: "smooth" }); }}>この事業者を相談する</button><small className="source-note">出典: {provider.sourceLabel}（確認日 {provider.verifiedAt}）</small></article>)}</div> : <div className="empty-list"><h3>公式掲載データを準備中です</h3><p>現在はこのジャンルの掲載事業者を確認中です。比較相談からご希望条件を送っていただけます。</p></div>}</section>
    <section className="compare">{vertical.points.map((point, index) => <div key={point}><b>0{index + 1}</b><h3>{point}を確認</h3><p>条件・対応地域・料金の詳細は、必ず事業者の公式ページと見積もりで確認してください。</p></div>)}</section>
    <section className="faq-section"><p className="eyebrow">HELPFUL ANSWERS</p><h2>よくある質問</h2>{faqs.map((faq) => <details key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}</section>
    <section className="review-section" id="reviews"><div><p className="eyebrow">LOCAL REVIEWS</p><h2>{city}の口コミ</h2>{reviews.length ? reviews.map((review) => <article className="review" key={review.id}><b>{"★".repeat(review.rating)} <span>{review.nickname}</span></b><p>{review.body}</p><small>参考になった {review.helpful}</small></article>) : <p className="empty">まだ掲載済みの口コミはありません。利用後の体験をお寄せください。</p>}</div><form onSubmit={submitReview}><h3>口コミを投稿</h3><label>ニックネーム<input required value={nickname} onChange={(event) => setNickname(event.target.value)} /></label><label>評価<select value={rating} onChange={(event) => setRating(Number(event.target.value))}>{[5, 4, 3, 2, 1].map((item) => <option key={item} value={item}>{item}点</option>)}</select></label><label>口コミ（10〜500文字）<textarea required minLength={10} maxLength={500} value={body} onChange={(event) => setBody(event.target.value)} /></label><button>確認待ちで投稿</button><output>{reviewStatus}</output></form></section>
    <section className="request" id="request"><div><p>FREE CONSULTATION</p><h2>比較相談を申し込む</h2><span>{selected ? <><b>{selected.name}</b>について、{city}・{service}の希望条件を受け付けます。</> : "ご希望の条件を受け付けます。"}</span></div><form onSubmit={submitLead}><label>連絡先メールアドレス<input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" /></label><p>{city} · {service}</p><label className="consent"><input required type="checkbox" checked={consent} onChange={(event) => setConsent(event.target.checked)} /> プライバシーポリシーに同意する</label><button disabled={!consent || !selected}>相談を申し込む</button><output>{leadStatus}</output></form></section>
    <footer><Link className="logo" href="/">まち<span>セレクト</span></Link><p>{city}の{vertical.name}を、公式情報から比較。</p><small><Link href="/editorial-policy">掲載・編集ポリシー</Link> · ドメイン: {vertical.domain}</small></footer>
  </main>;
}
