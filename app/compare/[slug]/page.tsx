import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getVertical, verticals } from "../../lib/verticals";
import VerticalPage from "./vertical-page";

export function generateStaticParams() { return verticals.map((vertical) => ({ slug: vertical.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const { slug } = await params; const vertical = getVertical(slug); if (!vertical) return {}; return { title: `${vertical.name}の比較・選び方`, description: `${vertical.name}の公式情報、料金確認の方法、比較時のポイント、利用者口コミをまとめています。`, alternates: { canonical: `https://machiselect.jp/compare/${vertical.slug}` } }; }
export default async function Page({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const vertical = getVertical(slug); if (!vertical) notFound(); return <VerticalPage vertical={vertical} />; }
