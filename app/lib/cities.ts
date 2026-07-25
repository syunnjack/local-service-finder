export const cities = [
  { slug: "tokyo", name: "東京都" },
  { slug: "osaka", name: "大阪府" },
  { slug: "yokohama", name: "横浜市" },
  { slug: "saitama", name: "さいたま市" },
  { slug: "sapporo", name: "札幌市" },
  { slug: "sendai", name: "仙台市" },
  { slug: "chiba", name: "千葉市" },
  { slug: "kawasaki", name: "川崎市" },
] as const;

export const getCity = (slug: string) => cities.find((city) => city.slug === slug);
