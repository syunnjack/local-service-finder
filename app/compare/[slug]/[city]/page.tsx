import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCity } from "../../../lib/cities";
import { getVertical } from "../../../lib/verticals";
import { getRegionFact, getVerifiedCombinations } from "../../../lib/region-facts";
import VerticalPage from "../vertical-page";

export function generateStaticParams() { return getVerifiedCombinations(); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string; city: string }> }): Promise<Metadata> { const { slug, city: citySlug } = await params; const vertical = getVertical(slug); const city = getCity(citySlug); if (!vertical || !city) return {}; return { title: `${city.name}の${vertical.name}を比較`, description: `${city.name}で${vertical.name}を検討する際の公式情報と比較のポイントです。`, robots: { index: false, follow: true } }; }
export default async function CityComparisonPage({ params }: { params: Promise<{ slug: string; city: string }> }) { const { slug, city: citySlug } = await params; const vertical = getVertical(slug); const city = getCity(citySlug); const regionFact = vertical && city ? getRegionFact(vertical.slug, city.slug) : undefined; if (!vertical || !city || !regionFact) notFound(); return <VerticalPage vertical={vertical} initialCity={city.name} regionFact={regionFact} />; }
