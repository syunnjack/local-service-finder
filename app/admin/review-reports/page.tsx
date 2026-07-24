"use client";

import { useEffect, useState } from "react";

type Report = { id: number; reviewId: number; reason: string; detail: string; status: string; createdAt: string; nickname: string | null; body: string | null; vertical: string | null; city: string | null };
const reasonLabels: Record<string, string> = { "personal-info": "個人情報", abuse: "誹謗中傷", "not-experience": "利用体験ではない", other: "その他" };

export default function ReviewReportsAdmin() {
  const [reports, setReports] = useState<Report[]>([]); const [message, setMessage] = useState("");
  const load = () => void fetch("/api/admin/review-reports").then((response) => response.json()).then((data) => setReports(data.reports || []));
  useEffect(load, []);
  async function update(id: number, status: string) { const response = await fetch("/api/admin/review-reports", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, status }) }); setMessage(response.ok ? "通報を更新しました。" : "更新できませんでした。"); if (response.ok) load(); }
  return <main className="corrections-admin"><header><a href="/admin">運営画面</a><h1>口コミ通報キュー</h1><p>通報内容を確認し、必要に応じて口コミの審査画面で非公開・保留に変更してください。</p></header><section>{reports.length ? reports.map((report) => <article key={report.id}><div><small>#{report.reviewId} · {report.vertical} · {report.city} · {new Date(report.createdAt).toLocaleDateString("ja-JP")}</small><h2>{reasonLabels[report.reason] || report.reason}</h2><p><strong>対象投稿:</strong> {report.nickname || "削除済み"}</p><p>{report.body || "対象の口コミが見つかりません。"}</p>{report.detail && <p><strong>補足:</strong> {report.detail}</p>}<b>{report.status}</b></div><div><button onClick={() => update(report.id, "resolved")}>対応済み</button><button onClick={() => update(report.id, "rejected")}>問題なし</button><button onClick={() => update(report.id, "pending")}>保留</button></div></article>) : <p className="empty-admin">未処理の通報はありません。</p>}<output>{message}</output></section></main>;
}
