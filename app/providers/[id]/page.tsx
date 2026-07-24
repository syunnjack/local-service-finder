import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProvider, providers } from "../../lib/providers";
import { getVertical } from "../../lib/verticals";

export function generateStaticParams() { return providers.map((provider) => ({ id: provider.id })); }

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const provider = getProvider((await params).id);
  if (!provider) return {};
  return { title: `${provider.name}の掲載情報・確認方法`, description: `${provider.name}の公式情報、対応サービス、料金の確認方法、掲載確認日をまとめています。`, alternates: { canonical: `/providers/${provider.id}` } };
}

export default async function ProviderPage({ params }: { params: Promise<{ id: string }> }) {
  const provider = getProvider((await params).id); if (!provider) notFound();
  const vertical = getVertical(provider.vertical); if (!vertical) notFound();
  const data = { "@context": "https://schema.org", "@type": "Service", name: `${provider.name} ${vertical.name}`, provider: { "@type": "Organization", name: provider.name, url: provider.sourceUrl }, areaServed: provider.coverage, serviceType: provider.services.join("、") };
  return <main className="provider-page"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} /><header><Link href="/" className="logo">まち<span>セレクト</span></Link><nav><Link href={`/compare/${vertical.slug}`}>比較ページ</Link><Link href="/editorial-policy">編集方針</Link></nav></header><article><p className="breadcrumb"><Link href="/">まちセレクト</Link> / <Link href={`/compare/${vertical.slug}`}>{vertical.name}</Link> / {provider.name}</p><p className="eyebrow">OFFICIAL LISTING · 確認日 {provider.verifiedAt}</p><h1>{provider.name}</h1><p className="provider-lead">このページは公式サイトで確認できる情報を要約した掲載情報です。料金・対応地域・予約可否は変動するため、依頼前に公式サイトでご確認ください。</p><section className="provider-facts"><div><small>料金・見積もり</small><b>{provider.pricing}</b></div><div><small>対応地域</small><b>{provider.coverage}</b></div><div><small>掲載情報の出典</small><a href={provider.sourceUrl} target="_blank" rel="noreferrer">{provider.sourceLabel}を開く</a></div></section><section><h2>公式サイトで確認できるサービス</h2><ul className="provider-services">{provider.services.map((service) => <li key={service}>{service}</li>)}</ul></section><section><h2>比較時に確認した項目</h2><ul className="provider-checks">{provider.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul><p>掲載対象は公式サイトに掲載されている内容です。掲載順位・星評価・予約の空き・実際の総額は、このページでは推測していません。</p></section><section className="provider-actions"><Link href={`/compare/${vertical.slug}`}>地域・条件を選んで比較する →</Link><a href={provider.sourceUrl} target="_blank" rel="noreferrer">公式サイトで確認する →</a></section><aside><b>掲載情報の修正をご希望の事業者様へ</b><p>公式URLやサービス内容の更新を受け付け、編集部が確認後に反映します。</p><Link href={`/listing-corrections?provider=${provider.id}`}>掲載情報の修正を依頼する →</Link></aside></article></main>;
}
