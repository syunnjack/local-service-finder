export type RegionFact = {
  vertical: string;
  city: string;
  verifiedAt: string;
  sources: { name: string; detail: string; url: string }[];
  checks: string[];
  faqs: { question: string; answer: string }[];
};

// These notes intentionally record only facts visible on the linked official pages.
// Availability, final price, and service scope must still be confirmed with the provider.
const verifiedAt = "2026-07-25";

export const regionFacts: RegionFact[] = [
  {
    vertical: "house-cleaning",
    city: "tokyo",
    verifiedAt,
    sources: [
      { name: "東京ガス", detail: "ハウスクリーニングの公式ページで、エアコン・キッチン・浴室などのメニューと申込み手順を案内。", url: "https://kaji.tokyo-gas.co.jp/housecleaning/" },
      { name: "おそうじ革命", detail: "東京都の公式対応ページで、都内の対応エリアと水回り・エアコンなどのメニューを案内。", url: "https://www.osoujikakumei.jp/house-cleaning/tokyo/" },
      { name: "クリーンクルー", detail: "関東の公式対応ページで、東京都を含む対応地域を案内。", url: "https://www.cleancrew.jp/location/kanto/" },
    ],
    checks: ["マンションでは管理規約・作業車の駐車可否を、予約前に確認する。", "エアコンは機種・設置位置により追加作業の有無が変わるため、型番と写真を用意する。", "水回りは作業範囲（鏡・換気扇・エプロン内部など）を見積もりに明記してもらう。"],
    faqs: [
      { question: "東京都で出張費の確認は必要ですか？", answer: "必要です。公式の料金表だけで判断せず、対応エリア、駐車料金、設置状況による追加作業を申込み前に確認してください。" },
      { question: "集合住宅で先に伝えることは？", answer: "管理規約、作業用駐車場、共用部の養生ルール、作業可能時間を事前に共有すると確認が進みます。" },
    ],
  },
  {
    vertical: "house-cleaning",
    city: "osaka",
    verifiedAt,
    sources: [
      { name: "おそうじ革命", detail: "大阪市の公式対応ページで、市内各区の対応エリアと水回り・室内外の清掃メニューを案内。", url: "https://www.osoujikakumei.jp/house-cleaning/osaka/osaka-shi/" },
      { name: "おそうじ革命", detail: "大阪府の公式対応ページで、大阪市を含む府内の対応エリアと対応店舗を案内。", url: "https://www.osoujikakumei.jp/house-cleaning/osaka/" },
    ],
    checks: ["大阪市内でも対象外の町名や日時があり得るため、住所を伝えて対応可否を確認する。", "レンジフードや浴室は、分解範囲・オプション・追加料金条件を見積書で確認する。", "集合住宅では駐車場の有無と、作業員の搬入経路を先に伝える。"],
    faqs: [
      { question: "大阪市の対応エリアはどう確認しますか？", answer: "公式の市別対応ページで大まかな対象を確認したうえで、住所・希望日時を添えて事業者に最終確認してください。" },
      { question: "見積もりで聞くべきことは？", answer: "基本料金に含まれる作業、分解の範囲、駐車料金、汚れや設置状況による追加条件を確認してください。" },
    ],
  },
  {
    vertical: "house-cleaning",
    city: "yokohama",
    verifiedAt,
    sources: [
      { name: "おそうじ革命", detail: "横浜市の公式対応ページで、市内18区の対応エリアと水回り・エアコンなどのメニューを案内。", url: "https://www.osoujikakumei.jp/house-cleaning/kanagawa/yokohama-shi/" },
      { name: "おそうじ革命", detail: "神奈川県の公式対応ページで、横浜市を含む県内の対応エリアを案内。", url: "https://www.osoujikakumei.jp/house-cleaning/kanagawa/" },
      { name: "クリーンクルー", detail: "関東の公式対応ページで、神奈川県を含む対応地域を案内。", url: "https://www.cleancrew.jp/location/kanto/" },
    ],
    checks: ["坂道や狭い道路の近くでは、駐車可否・駐車料金を事前に確認する。", "エアコンは型番、台数、室外機の位置を伝え、対応機種と追加条件を確認する。", "水回りセットは、含まれる設備と個別追加の条件を比較する。"],
    faqs: [
      { question: "横浜市では区まで伝える必要がありますか？", answer: "はい。市全体の案内だけでは最終的な訪問可否は分からないため、区・住所・希望日時を伝えて確認してください。" },
      { question: "料金を比べる際の基準は？", answer: "表示金額だけでなく、作業範囲、追加条件、駐車料金、再作業や補償の条件を同じ前提で比べてください。" },
    ],
  },
  {
    vertical: "house-cleaning",
    city: "saitama",
    verifiedAt,
    sources: [
      { name: "おそうじ革命", detail: "さいたま市の公式対応ページで、各区の対応エリアと水回り・エアコンなどのメニューを案内。", url: "https://www.osoujikakumei.jp/house-cleaning/saitama/saitama-shi/" },
      { name: "おそうじ革命", detail: "埼玉県の公式対応ページで、さいたま市を含む県内の対応エリアと水回りメニューを案内。", url: "https://www.osoujikakumei.jp/house-cleaning/saitama/" },
      { name: "クリーンクルー", detail: "関東の公式対応ページで、埼玉県を含む対応地域を案内。", url: "https://www.cleancrew.jp/location/kanto/" },
    ],
    checks: ["さいたま市は区・住所まで伝え、訪問可否と希望日時を確認する。", "水回りは汚れの状態や設備の型式で作業範囲が変わるため、写真を添えて相談する。", "戸建てでは作業車の駐車場所、集合住宅では管理規約と共用部の利用条件を確認する。"],
    faqs: [
      { question: "さいたま市で見積もり前に用意する情報は？", answer: "区・住所、希望箇所、設備の型番、設置状況の写真、希望日時、駐車場所の有無を用意すると確認しやすくなります。" },
      { question: "公式ページの料金だけで申込みできますか？", answer: "料金表は比較の出発点です。対象外機種、オプション、汚れや設置状況による追加条件を、申込み前に公式窓口へ確認してください。" },
    ],
  },
];

export function getRegionFact(vertical: string, city: string) {
  return regionFacts.find((fact) => fact.vertical === vertical && fact.city === city);
}
