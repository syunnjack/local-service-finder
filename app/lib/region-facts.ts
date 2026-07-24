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

regionFacts.push(
  {
    vertical: "moving",
    city: "tokyo",
    verifiedAt,
    sources: [
      { name: "アート引越センター", detail: "東京都の公式ページで、都内の複数拠点と単身・家族・オフィス移転を含む引越しサービスを案内。", url: "https://www.the0123.com/pref/tokyo.html" },
      { name: "アート引越センター", detail: "公式ネットワークページで、東京都内の支店・連絡先を案内。", url: "https://www.the0123.com/company/network.html" },
    ],
    checks: ["単身・家族・法人移転では見積もりの前提が異なるため、荷物量と希望する作業を分けて伝える。", "集合住宅では搬出入時間、養生、エレベーターの利用予約、作業車の駐車可否を管理規約で確認する。", "繁忙期は希望日が埋まりやすいため、候補日を複数用意し、見積もり時点の条件を書面で確認する。"],
    faqs: [
      { question: "東京都の引越しでは何を先に確認しますか？", answer: "建物の搬出入ルール、駐車場所、エレベーターの利用、荷物量、希望日を整理し、同じ前提で複数社に確認してください。" },
      { question: "見積もり後に料金が変わることはありますか？", answer: "荷物量、作業条件、オプション、日時が変わると条件も変わり得ます。基本料金、追加条件、キャンセル条件を見積書で確認してください。" },
    ],
  },
  {
    vertical: "moving",
    city: "osaka",
    verifiedAt,
    sources: [
      { name: "アート引越センター", detail: "大阪府の公式ページで、大阪市を中心に府内各エリアへの対応と、単身・家族・オフィス移転を案内。", url: "https://www.the0123.com/pref/osaka.html" },
      { name: "アート引越センター", detail: "大阪中央支店の公式ページで、大阪市内を中心とする作業エリアを案内。", url: "https://www.the0123.com/siten/osakachuo.html" },
    ],
    checks: ["大阪市内でも支店・希望日・荷物量で担当が変わるため、住所を伝えて最終的な対応可否を確認する。", "大型家具や家電、梱包・開梱、不用品の扱いは、基本料金に含まれるかを個別に確認する。", "マンションでは作業車の駐車場所と、共用部・エレベーターの利用条件を確認する。"],
    faqs: [
      { question: "大阪市の引越しは市内全域で同じ条件ですか？", answer: "いいえ。担当拠点、予約状況、建物条件で対応・料金条件が変わり得るため、住所と希望日時を添えて確認してください。" },
      { question: "比較時にそろえるべき条件は？", answer: "荷物量、梱包・開梱の有無、階段・エレベーター、駐車条件、希望日時、オプションをそろえて比較してください。" },
    ],
  },
  {
    vertical: "moving",
    city: "yokohama",
    verifiedAt,
    sources: [
      { name: "アート引越センター", detail: "神奈川県の公式ページで、横浜市を中心とする県内の引越し対応を案内。", url: "https://www.the0123.com/pref/kanagawa.html" },
      { name: "アート引越センター", detail: "新横浜支店の公式ページで、横浜市神奈川区・鶴見区・港北区・西区を含む営業エリアを案内。", url: "https://www.the0123.com/siten/shinyokohama.html" },
      { name: "アート引越センター", detail: "横浜支店の公式ページで、青葉区・緑区・都筑区を含む営業エリアを案内。", url: "https://www.the0123.com/siten/yokohamaaoba.html" },
    ],
    checks: ["横浜市は区により担当拠点が異なるため、区・住所・希望日時を伝えて確認する。", "坂道・狭い道路・近隣駐車場の利用可否は作業条件に影響するため、見積もり前に共有する。", "大型家具の搬出入では階段幅・通路幅・エレベーター寸法を確認し、必要な作業を見積書に含める。"],
    faqs: [
      { question: "横浜市では区まで伝える必要がありますか？", answer: "はい。公式の支店ページでも区別に営業エリアが示されているため、区・住所・希望日時まで伝えて最終確認してください。" },
      { question: "訪問見積もりで見てもらうべき箇所は？", answer: "荷物量に加え、玄関・廊下・階段・エレベーター、駐車場所、養生が必要な共用部を確認してもらってください。" },
    ],
  },
  {
    vertical: "moving",
    city: "saitama",
    verifiedAt,
    sources: [
      { name: "アート引越センター", detail: "さいたま支店の公式ページで、さいたま市西区・大宮区・見沼区・中央区などを含む営業エリアを案内。", url: "https://www.the0123.com/siten/saitama.html" },
      { name: "アート引越センター", detail: "公式ネットワークページで、さいたま支店を含む拠点情報を案内。", url: "https://www.the0123.com/company/network.html" },
    ],
    checks: ["さいたま市でも区・荷物量・希望日時により予約可否が変わるため、住所を添えて確認する。", "見積もりは荷物量だけでなく、家電の設置・梱包・資材回収など希望する付帯作業を分けて確認する。", "集合住宅の養生・搬出入時間・駐車条件、戸建ての作業車スペースを事前に確認する。"],
    faqs: [
      { question: "さいたま市の対応エリアはどう確認しますか？", answer: "公式支店ページで対象の目安を確認したうえで、区・住所・希望日時・荷物量を伝えて最終確認してください。" },
      { question: "予約はいつ相談するべきですか？", answer: "公式ページでも予約状況により受付できない場合があると案内されています。希望日が決まったら、早めに候補日を複数用意して相談してください。" },
    ],
  },
);

export function getRegionFact(vertical: string, city: string) {
  return regionFacts.find((fact) => fact.vertical === vertical && fact.city === city);
}
