"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { guides } from "../../lib/guides";

type GuideMetrics = { slug: string; views: number; ctas: number };

export default function ContentPage() {
  const [metrics, setMetrics] = useState<GuideMetrics[]>([]);
  const [error, setError] = useState("");
  useEffect(() => { void fetch("/api/admin/content?days=30").then(async (response) => { const data = await response.json() as { guides?: GuideMetrics[]; error?: string }; if (!response.ok) throw new Error(data.error || "集計を取得できませんでした"); setMetrics(data.guides || []); }).catch((cause: unknown) => setError(cause instanceof Error ? cause.message : "集計を取得できませんでした")); }, []);
  const metricMap = new Map(metrics.map((metric) => [metric.slug, metric]));
  return <main className="content-admin"><header><Link href="/admin">管理画面</Link><h1>コンテンツ効果</h1><p>直近30日のガイド閲覧数と、比較ページへの遷移数です。</p></header>{error ? <p className="content-error">{error}</p> : <section><div className="content-heading"><span>ガイド</span><span>閲覧</span><span>比較へ遷移</span><span>遷移率</span></div>{guides.map((guide) => { const metric = metricMap.get(guide.slug) || { views: 0, ctas: 0 }; const rate = metric.views ? Math.round(metric.ctas / metric.views * 100) : 0; return <div className="content-row" key={guide.slug}><Link href={`/guides/${guide.slug}`}>{guide.title}</Link><span>{metric.views}</span><span>{metric.ctas}</span><b>{rate}%</b></div>; })}</section>}</main>;
}
