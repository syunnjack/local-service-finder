import Link from "next/link";
import { notFound } from "next/navigation";
import { getGuide, guides } from "../../lib/guides";

export function generateStaticParams() { return guides.map((guide) => ({ slug: guide.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const guide = getGuide((await params).slug);
  return guide ? { title: `${guide.title}｜まちセレクト`, description: guide.description, alternates: { canonical: `/guides/${guide.slug}` } } : {};
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const guide = getGuide((await params).slug);
  if (!guide) notFound();
  const structuredData = { "@context": "https://schema.org", "@type": "Article", headline: guide.title, dateModified: guide.updatedAt, author: { "@type": "Organization", name: "まちセレクト編集部" }, mainEntityOfPage: `https://machiselect.jp/guides/${guide.slug}` };
  return <main className="guide-page"><header><Link href="/" className="logo">まち<span>セレクト</span></Link><nav><Link href={`/compare/${guide.vertical}`}>比較ページへ</Link><Link href="/editorial-policy">掲載方針</Link></nav></header><article><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} /><p className="eyebrow">DECISION GUIDE · 更新日 {guide.updatedAt}</p><h1>{guide.title}</h1><p className="guide-lead">{guide.summary}</p><h2>確認する手順</h2><ol>{guide.steps.map((step) => <li key={step}>{step}</li>)}</ol><h2>事業者へ聞く質問</h2><ul>{guide.questions.map((question) => <li key={question}>{question}</li>)}</ul><h2>参考にした公式情報</h2><ul className="source-list">{guide.sources.map((source) => <li key={source.url}><a href={source.url} target="_blank" rel="noreferrer">{source.label}</a></li>)}</ul><aside><b>次のステップ</b><p>同じ条件で比較できるよう準備できたら、掲載事業者の公式情報と見積もりを確認しましょう。</p><Link href={`/compare/${guide.vertical}`}>比較ページを見る →</Link></aside></article></main>;
}
