"use client";

import { useEffect, useState } from "react";

type Review = { id: number; vertical: string; city: string; prefecture: string; nickname: string; rating: number; body: string; serviceType: string; usageMonth: string; estimateMatch: string; goodPoint: string; cautionPoint: string; wouldUseAgain: boolean; status: string };
const labels: Record<string, string> = { "as-expected": "見積もりどおり", higher: "見積もりより高い", lower: "見積もりより安い", unknown: "比較なし" };

export default function ReviewAdmin() {
  const [rows, setRows] = useState<Review[]>([]); const [filter, setFilter] = useState("pending"); const [message, setMessage] = useState("");
  const load = () => fetch("/api/admin/reviews").then((r) => r.json()).then((data) => setRows(data.reviews || []));
  useEffect(() => { load(); }, []);
  async function moderate(id: number, status: string) { const response = await fetch("/api/admin/reviews", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, status }) }); setMessage(response.ok ? "更新しました。" : "更新できませんでした。"); if (response.ok) load(); }
  const shown = rows.filter((row) => filter === "all" || row.status === filter);
  return <main className="review-admin"><header><a href="/dashboard" className="logo">まち<span>セレクト</span></a><nav><a href="/dashboard">KPI</a><a href="/signout-with-chatgpt?return_to=/">ログアウト</a></nav></header><section className="admin-head"><p>REVIEW MODERATION</p><h1>口コミの審査</h1><span>投稿の条件と体験内容を確認し、利用者に役立つものだけを公開します。</span><div>{["pending", "approved", "rejected", "all"].map((item) => <button key={item} className={filter === item ? "active" : ""} onClick={() => setFilter(item)}>{item} ({item === "all" ? rows.length : rows.filter((row) => row.status === item).length})</button>)}</div></section><section className="moderation-list">{shown.length ? shown.map((row) => <article key={row.id}><div><small>{row.vertical} · {row.city} · {row.prefecture} · {row.serviceType} · {row.usageMonth}</small><h2>{"★".repeat(row.rating)} <span>{row.nickname}</span></h2><p>{row.body}</p><p><strong>見積もり:</strong> {labels[row.estimateMatch] || row.estimateMatch}</p>{row.goodPoint && <p><strong>良かった点:</strong> {row.goodPoint}</p>}{row.cautionPoint && <p><strong>注意点:</strong> {row.cautionPoint}</p>}<em>{row.status}</em></div><div><button className="approve" onClick={() => moderate(row.id, "approved")}>公開</button><button className="reject" onClick={() => moderate(row.id, "rejected")}>非公開</button><button onClick={() => moderate(row.id, "pending")}>保留</button></div></article>) : <p className="empty-admin">対象の口コミはありません。</p>}<output>{message}</output></section></main>;
}
