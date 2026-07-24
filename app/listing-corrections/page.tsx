"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { getProvider } from "../lib/providers";

export default function ListingCorrectionsPage({ searchParams }: { searchParams: { provider?: string } }) {
  const provider = getProvider(searchParams.provider || ""); const [message, setMessage] = useState(""); const [sent, setSent] = useState("");
  async function submit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); const form = new FormData(event.currentTarget); const response = await fetch("/api/listing-corrections", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(Object.fromEntries(form)) }); const data = await response.json() as { error?: string }; setSent(response.ok ? "修正依頼を受け付けました。編集部が確認後にご連絡します。" : data.error || "送信に失敗しました。"); if (response.ok) { event.currentTarget.reset(); setMessage(""); } }
  if (!provider) return <main className="correction-page"><p>対象の掲載情報が見つかりません。</p><Link href="/">トップへ戻る</Link></main>;
  return <main className="correction-page"><header><Link href="/" className="logo">まち<span>セレクト</span></Link></header><section><p className="eyebrow">LISTING CORRECTION</p><h1>掲載情報の修正を依頼</h1><p><b>{provider.name}</b> の公式情報について、URL・サービス内容・料金案内などの修正を受け付けます。依頼内容は公開前に編集部が確認します。</p><form onSubmit={submit}><input type="hidden" name="providerId" value={provider.id} /><label>お名前<input required name="name" /></label><label>所属・事業者名<input name="organization" /></label><label>連絡用メールアドレス<input required type="email" name="email" /></label><label>根拠となる公式URL<input type="url" name="url" placeholder={provider.sourceUrl} /></label><label>修正内容<textarea required minLength={10} maxLength={2000} name="message" value={message} onChange={(event) => setMessage(event.target.value)} /></label><label className="correction-consent"><input required type="checkbox" /> 提出内容が正確であり、編集部の確認を経て掲載されることに同意します</label><button>修正を依頼する</button><output>{sent}</output></form></section></main>;
}
