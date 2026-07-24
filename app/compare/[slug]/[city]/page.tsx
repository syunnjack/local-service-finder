import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCity, cities } from "../../../lib/cities";
import { getVertical, verticals } from "../../../lib/verticals";
import VerticalPage from "../vertical-page";

export function generateStaticParams() { return verticals.flatMap((vertical) => cities.map((city) => ({ slug: vertical.slug, city: city.slug }))); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string; city: string }> }): Promise<Metadata> {
  const { slug, city: citySlug } = await params; const vertical = getVertical(slug); const city = getCity(citySlug);
  if (!vertical || !city) return {};
  return { title: `${city.name}の${vertical.name}を比較 | まちセレクト`, description: `${city.name}で${vertical.name}を検討する人向けに、公式サイトの情報と見積もり時の確認項目をまとめました。`, alternates: { canonical: `https://machiselect.jp/compare/${vertical.slug}/${city.slug}` } };
}

export default async function CityComparisonPage({ params }: { params: Promise<{ slug: string; city: string }> }) {
  const { slug, city: citySlug } = await params; const vertical = getVertical(slug); const city = getCity(citySlug);
  if (!vertical || !city) notFound();
  const breadcrumbs = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "まちセレクト", item: "https://machiselect.jp" }, { "@type": "ListItem", position: 2, name: vertical.name, item: `https://machiselect.jp/compare/${vertical.slug}` }, { "@type": "ListItem", position: 3, name: city.name, item: `https://machiselect.jp/compare/${vertical.slug}/${city.slug}` }] };
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} /><VerticalPage vertical={vertical} initialCity={city.name} /></>;
}
