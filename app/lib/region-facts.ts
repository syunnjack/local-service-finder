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

regionFacts.push(
  {
    vertical: "plumbing",
    city: "tokyo",
    verifiedAt,
    sources: [
      { name: "クラシアン", detail: "関東の公式対応ページで、東京都内の複数営業所と郵便番号による対応エリア確認を案内。", url: "https://www.qracian.co.jp/area/kanto/" },
      { name: "クラシアン", detail: "公式の対応エリア検索ページで、住所・郵便番号による最終確認を案内。", url: "https://www.qracian.co.jp/area/" },
    ],
    checks: ["漏水箇所が分かる場合は、止水栓の位置・水の出方・写真や動画を共有する。", "集合住宅の共用管・専有部の切り分けは管理会社や管理組合へ確認する。", "緊急時でも、基本料金、部品代、追加作業、キャンセル条件を作業前に書面で確認する。"],
    faqs: [
      { question: "東京都で対応可否はどう確認しますか？", answer: "公式の郵便番号検索で目安を確認し、住所・症状・希望時間を伝えて最終確認してください。" },
      { question: "マンションの水漏れで先にすることは？", answer: "安全を確保して止水できる場合は止水し、管理会社へ連絡してください。共用部・専有部の扱いと作業承認を確認してから依頼します。" },
    ],
  },
  {
    vertical: "plumbing",
    city: "osaka",
    verifiedAt,
    sources: [
      { name: "クラシアン", detail: "大阪市の公式対応ページで、水漏れ・つまり等の水まわり対応、郵便番号による対応確認、営業所情報を案内。", url: "https://www.qracian.co.jp/area/kinki/osaka/osaka/" },
      { name: "クラシアン", detail: "大阪府の公式ページで、府内営業所と一部対応外エリアがあることを案内。", url: "https://www.qracian.co.jp/toilet-clogging/osaka/" },
    ],
    checks: ["大阪市内でも住所・予約状況により訪問条件が変わるため、郵便番号で確認してから依頼する。", "トイレ・キッチン・浴室など、症状の箇所と発生時期を伝え、必要な部品・作業範囲を確認する。", "賃貸住宅では、作業前に管理会社・大家への連絡要否を確認する。"],
    faqs: [
      { question: "大阪市で水道局指定工事店か確認するべきですか？", answer: "給水管などの工事では資格・指定の有無が関係する場合があります。工事内容を説明してもらい、必要な資格・指定や届出を確認してください。" },
      { question: "見積もりで確認すべき金額は？", answer: "基本作業、部品、追加作業、夜間・駐車などの条件、キャンセル条件を作業開始前に確認してください。" },
    ],
  },
  {
    vertical: "plumbing",
    city: "yokohama",
    verifiedAt,
    sources: [
      { name: "クラシアン", detail: "横浜市の公式対応ページで、水漏れ・水まわり対応、北横浜営業所などの案内、郵便番号による対応確認を掲載。", url: "https://www.qracian.co.jp/toilet-clogging/kanagawa/yokohama/" },
      { name: "クラシアン", detail: "神奈川県の公式対応ページで、北横浜・南横浜営業所など県内の営業所を案内。", url: "https://www.qracian.co.jp/area/kanto/kanagawa/" },
    ],
    checks: ["横浜市では区・住所まで伝え、郵便番号検索と事業者への最終確認を行う。", "戸建て・集合住宅、屋内・屋外、給水・排水のどこで起きているかを整理して伝える。", "賃貸・分譲マンションでは管理側の承認、共用部の扱い、復旧範囲を先に確認する。"],
    faqs: [
      { question: "横浜市で急な水漏れが起きたら？", answer: "安全を確保し、止水できる場合は止水します。そのうえで住所・症状を伝え、到着時間は交通や依頼状況で変動することを前提に確認してください。" },
      { question: "住所だけで対応可否を判断できますか？", answer: "市全体の案内は目安です。公式の郵便番号検索と、事業者への最終確認を併用してください。" },
    ],
  },
  {
    vertical: "plumbing",
    city: "saitama",
    verifiedAt,
    sources: [
      { name: "クラシアン", detail: "さいたま市の公式対応ページで、水漏れ・水まわり対応、さいたま営業所、郵便番号による対応確認を案内。", url: "https://www.qracian.co.jp/area/kanto/saitama/saitama/" },
      { name: "クラシアン", detail: "さいたま営業所の公式ページで、さいたま市エリアの水まわり相談と作業条件の案内を掲載。", url: "https://www.qracian.co.jp/company/office/saitama/" },
    ],
    checks: ["区・住所・症状・発生時期を伝え、訪問可否と到着時間を確認する。", "水を止められない、漏電のおそれがある場合は安全確保を優先し、無理な分解をしない。", "作業開始前に、基本作業・部品・追加作業・復旧の範囲を確認する。"],
    faqs: [
      { question: "さいたま市の対応エリアはどう確認しますか？", answer: "公式の地域ページと郵便番号検索で確認し、区・住所・症状を添えて最終確認してください。" },
      { question: "漏水原因が分からない場合は？", answer: "無理に分解せず、漏れている場所や水の出方を記録して相談してください。調査・修理の範囲と費用条件は作業前に確認します。" },
    ],
  },
);

regionFacts.push(
  {
    vertical: "housekeeping",
    city: "tokyo",
    verifiedAt,
    sources: [
      { name: "ベアーズ", detail: "東京都の公式ページで、掃除・洗濯・料理・買い物などの家事代行内容と、地域により提供できない場合があることを案内。", url: "https://www.happy-bears.com/kaji/tokyo/" },
      { name: "ベアーズ", detail: "家事代行の公式ページで、東京都を含む人気エリアとサービス内容を案内。", url: "https://www.happy-bears.com/kaji/" },
    ],
    checks: ["依頼したい家事、希望日時、在宅・不在時の立会い、使用してよい道具を事前に整理する。", "地域や公共交通機関での訪問条件により対応可否が変わるため、住所を伝えて確認する。", "鍵の預かり、ペット、貴重品、撮影可否などのルールを契約前に確認する。"],
    faqs: [
      { question: "東京都で家事代行の対応可否はどう確認しますか？", answer: "公式の地域ページを確認したうえで、住所・希望日時・依頼内容を伝えて最終確認してください。" },
      { question: "掃除と料理を同じ日に頼めますか？", answer: "プラン・時間・作業内容により異なります。優先順位と必要時間を相談し、対応範囲を書面で確認してください。" },
    ],
  },
  {
    vertical: "housekeeping",
    city: "osaka",
    verifiedAt,
    sources: [
      { name: "ベアーズ", detail: "大阪市の公式ページで、家事代行・清掃などのサービス提供と、一部提供が難しい地域があることを案内。", url: "https://www.happy-bears.com/kaji/oosaka/oosaka/" },
      { name: "ベアーズ", detail: "公式の家事代行ページで、大阪市を含む人気エリアと日常家事のサービス内容を案内。", url: "https://www.happy-bears.com/kaji/" },
    ],
    checks: ["大阪市内でも住所・訪問条件で提供可否が変わるため、区・住所・希望日時を伝える。", "作業時間内に優先する家事を決め、清掃箇所・料理・買い物などを具体的に共有する。", "不在時利用や鍵預かりを希望する場合は、契約条件と緊急連絡方法を確認する。"],
    faqs: [
      { question: "大阪市でスポット利用はできますか？", answer: "プランや地域により異なります。希望する作業、日時、住所を添えて公式窓口に確認してください。" },
      { question: "家事代行とハウスクリーニングの違いは？", answer: "日常的な家事を行うサービスと、専門機材・分解清掃を伴うサービスでは範囲が異なります。希望内容を伝え、対象サービスを確認してください。" },
    ],
  },
  {
    vertical: "housekeeping",
    city: "yokohama",
    verifiedAt,
    sources: [
      { name: "ベアーズ", detail: "横浜市の公式ページで、横浜市内の家事代行・家政婦サービスと、表示外地域は問い合わせが必要なことを案内。", url: "https://www.happy-bears.com/kaji/kanagawa/yokohama/" },
      { name: "ベアーズ", detail: "公式の家事代行ページで、横浜市を含む神奈川県の人気エリアを案内。", url: "https://www.happy-bears.com/kaji/" },
    ],
    checks: ["横浜市は区・交通事情により訪問条件が変わるため、住所と希望日時を伝える。", "作業に使う洗剤・掃除道具、アレルギーやペットへの配慮を事前に共有する。", "鍵預かりや不在時対応は、連絡手段・入退室ルール・作業後の報告方法を確認する。"],
    faqs: [
      { question: "横浜市で表示されない地域は依頼できますか？", answer: "公式ページでは表示外地域は問い合わせるよう案内されています。住所・希望日時・作業内容を添えて確認してください。" },
      { question: "作業内容は当日に変更できますか？", answer: "時間やスタッフの準備に影響するため、変更可否と条件は事前に確認してください。優先順位を決めておくと相談しやすくなります。" },
    ],
  },
  {
    vertical: "housekeeping",
    city: "saitama",
    verifiedAt,
    sources: [
      { name: "ベアーズ", detail: "さいたま市の公式ページで、家事代行サービスと、地域により提供が難しい場合があることを案内。", url: "https://www.happy-bears.com/kaji/saitama/saitama/" },
      { name: "ベアーズ", detail: "さいたま市のスポットサービス公式ページで、掃除・洗濯・料理・買い物などの対応内容を案内。", url: "https://www.happy-bears.com/kaji/spot/saitama/saitama/" },
    ],
    checks: ["さいたま市でも地域・公共交通機関の状況で訪問可否が変わるため、区・住所を伝える。", "掃除、料理、買い物などを時間内でどう優先するか事前に決める。", "在宅・不在、鍵預かり、ペット、貴重品に関する希望を契約前に共有する。"],
    faqs: [
      { question: "さいたま市で利用できるサービスは？", answer: "公式ページには掃除・洗濯・料理・買い物などの日常家事が掲載されています。プランごとの対象は申込み前に確認してください。" },
      { question: "地域により利用できないことはありますか？", answer: "あります。公式ページでも地域によって提供できない場合があると案内されているため、住所・希望日時を添えて最終確認してください。" },
    ],
  },
);

regionFacts.push(
  {
    vertical: "garden-care",
    city: "tokyo",
    verifiedAt,
    sources: [
      { name: "oh!庭ya!", detail: "東京都の公式対応ページで、都内の担当店舗別対応エリアと剪定・伐採などの作業を案内。", url: "https://www.oh28ya.com/tokyo/" },
      { name: "oh!庭ya!", detail: "東京支店の公式ページで、対応する区市町村と作業内容を案内。", url: "https://www.oh28ya.com/branch/tokyoshiten/" },
    ],
    checks: ["樹種、本数、高さ、作業箇所、写真を共有し、剪定・伐採・抜根のどれが必要か相談する。", "道路使用、隣地への枝張り、電線への接近、集合住宅の共用植栽は作業前に管理側へ確認する。", "概算見積もりと現地確認後の見積もりは異なり得るため、処分費・高所作業・追加条件を確認する。"],
    faqs: [
      { question: "東京都で庭木作業の見積もりに必要な情報は？", answer: "住所、樹種・本数・高さ、作業希望、現場写真、駐車や搬入の条件を伝えてください。" },
      { question: "剪定と伐採のどちらを選べばよいですか？", answer: "樹木の状態、安全性、今後の管理方針で異なります。写真や現地確認をもとに、作業内容と費用条件を説明してもらってください。" },
    ],
  },
  {
    vertical: "garden-care",
    city: "osaka",
    verifiedAt,
    sources: [
      { name: "oh!庭ya!", detail: "大阪府の公式対応ページで、大阪市を含む担当店舗別の対応エリアと、作業前に見積もりを示すことを案内。", url: "https://www.oh28ya.com/osaka/" },
      { name: "oh!庭ya!", detail: "大阪支店の公式ページで、大阪市の各区を含む対応エリアを案内。", url: "https://www.oh28ya.com/branch/osaka/" },
    ],
    checks: ["大阪市内でも住所や現場条件で対応が変わるため、区・住所・希望作業を伝える。", "枝葉や伐採木の処分、作業車の駐車、高所作業の有無を見積もりに含めて確認する。", "隣地・道路・電線に関わる作業は、事前に必要な承諾や安全対応を確認する。"],
    faqs: [
      { question: "大阪市内ならすべて対応できますか？", answer: "公式ページの対象区域は目安です。住所、樹木の状態、希望日時を添えて最終確認してください。" },
      { question: "ネット概算見積もりだけで確定しますか？", answer: "公式ページでも作業内容や庭の環境により金額が変動すると案内されています。現地条件を確認した見積もりで判断してください。" },
    ],
  },
  {
    vertical: "garden-care",
    city: "yokohama",
    verifiedAt,
    sources: [
      { name: "oh!庭ya!", detail: "横浜店の公式ページで、西区・中区・南区・港南区・磯子区・戸塚区・栄区・泉区を含む対応エリアを案内。", url: "https://www.oh28ya.com/branch/yokohama/" },
      { name: "oh!庭ya!", detail: "神奈川支店の公式ページで、県内の別担当エリアと担当店舗への相談を案内。", url: "https://www.oh28ya.com/branch/kanagawa/" },
    ],
    checks: ["横浜市では区により担当範囲が異なるため、住所を伝えて対応可否を確認する。", "坂道・狭い道路・駐車条件、高所作業車の要否は見積もり前に共有する。", "隣地境界、電線、共用植栽などは、作業許可と安全対応を確認する。"],
    faqs: [
      { question: "横浜市はどの区でも同じ担当ですか？", answer: "公式ページでは担当店ごとの対象区が示されています。区・住所・作業内容を伝えて最終確認してください。" },
      { question: "庭木の写真で相談できますか？", answer: "写真は樹種・高さ・作業範囲の確認に役立ちます。ただし、最終的な作業条件や料金は現地状況を踏まえて確認してください。" },
    ],
  },
  {
    vertical: "garden-care",
    city: "saitama",
    verifiedAt,
    sources: [
      { name: "oh!庭ya!", detail: "埼玉県の公式対応ページで、さいたま市を含む担当店舗別の対応エリアと、作業前の見積もり案内を掲載。", url: "https://www.oh28ya.com/saitama/" },
      { name: "oh!庭ya!", detail: "埼玉支店の公式ページで、さいたま市内の対応区を含む営業エリアと庭木作業を案内。", url: "https://www.oh28ya.com/branch/saitama/" },
    ],
    checks: ["さいたま市は区・住所を伝え、担当店と訪問可否を確認する。", "剪定・伐採・草刈り・防草など、希望作業と処分の要否を分けて見積もりに含める。", "道路・隣地・電線・集合住宅の共用部に関わる場合は、管理者や関係者への確認を先に行う。"],
    faqs: [
      { question: "さいたま市で庭木作業を頼む前に確認することは？", answer: "区・住所、木の高さと本数、希望作業、駐車・搬入条件、処分の要否を整理して相談してください。" },
      { question: "見積もり後に追加費用が出ることはありますか？", answer: "高所作業、処分、現地の安全条件などで変わり得ます。何が基本料金に含まれるか、追加条件は何かを作業前に確認してください。" },
    ],
  },
);

regionFacts.push(
  {
    vertical: "locksmith",
    city: "tokyo",
    verifiedAt,
    sources: [
      { name: "カギ110番", detail: "東京都の地域ページで、都内の対応エリアと鍵開け・交換・作成・修理などの相談項目を案内。", url: "https://www.kagi110ban.jp/tokyo/koto/" },
      { name: "カギ110番", detail: "公式の対応エリアページで、地域ごとに対応可能な事業者が異なることを案内。", url: "https://www.kagi110ban.jp/" },
    ],
    checks: ["鍵の種類、トラブル内容、住宅・車・金庫などの対象、本人確認書類の有無を伝える。", "開錠・交換の前に、基本料金、出張費、部品代、深夜・休日などの追加条件を書面で確認する。", "賃貸住宅は管理会社・大家への連絡要否と、鍵交換の承諾を確認する。"],
    faqs: [
      { question: "東京都で鍵開けを頼む前に必要なものは？", answer: "本人確認書類、対象物の利用権限を示せる情報、鍵の種類と状況を用意し、事業者の本人確認手順を確認してください。" },
      { question: "料金は電話だけで確定しますか？", answer: "鍵の種類や現場条件で変わり得ます。作業開始前に内訳と追加条件を確認し、納得できない場合は作業を始めないでください。" },
    ],
  },
  {
    vertical: "locksmith",
    city: "osaka",
    verifiedAt,
    sources: [
      { name: "カギ110番", detail: "大阪府の地域ページで、大阪市各区を含む対応エリアと鍵開け・交換・作成・修理の相談項目を案内。", url: "https://www.kagi110ban.jp/osaka/" },
      { name: "カギ110番", detail: "公式の対応エリアページで、地域・加盟店により対応条件が異なることを案内。", url: "https://www.kagi110ban.jp/" },
    ],
    checks: ["住所、鍵の種類、住宅・車・金庫などの対象、緊急性を正確に伝える。", "見積もりでは出張費、作業費、部品代、深夜・休日条件、キャンセル条件を確認する。", "賃貸物件や集合住宅は、管理会社への連絡・オートロックなどの入館条件を確認する。"],
    faqs: [
      { question: "大阪市では区まで伝える必要がありますか？", answer: "はい。公式地域ページでも区別の対応エリアが示されているため、区・住所・希望時間を添えて最終確認してください。" },
      { question: "鍵交換はその場で決めるべきですか？", answer: "防犯上の緊急性がなければ、鍵の規格、部品代、作業内容、保証や管理側の承諾を確認してから判断してください。" },
    ],
  },
  {
    vertical: "locksmith",
    city: "yokohama",
    verifiedAt,
    sources: [
      { name: "カギ110番", detail: "横浜市の地域ページで、区別の鍵開け・交換・作成・修理の相談先を案内。", url: "https://www.kagi110ban.jp/kanagawa/yokohama/tsurumi/" },
      { name: "カギ110番", detail: "公式の対応エリアページで、横浜市を含む神奈川県の対応地域を案内。", url: "https://www.kagi110ban.jp/" },
    ],
    checks: ["横浜市は区・住所・時間帯を伝え、到着目安は交通や依頼状況で変わることを前提に確認する。", "住宅、車、金庫では必要な本人確認・権限確認が異なるため、事前に確認する。", "作業前に料金の内訳・部品の型番・交換後の鍵本数・保証条件を確認する。"],
    faqs: [
      { question: "横浜市のどの区でも同じ条件ですか？", answer: "対応事業者や到着条件は区・住所・依頼状況で変わり得ます。地域ページは目安として、最終確認をしてください。" },
      { question: "本人確認ができない場合は？", answer: "防犯上、本人確認や利用権限の確認が求められる場合があります。必要書類は依頼先へ確認し、正規の手続きで相談してください。" },
    ],
  },
  {
    vertical: "locksmith",
    city: "saitama",
    verifiedAt,
    sources: [
      { name: "カギ110番", detail: "さいたま市の地域ページで、同市に対応する鍵開け・交換・作成・修理の相談先を案内。", url: "https://www.kagi110ban.jp/saitama/saitama/" },
      { name: "カギ110番", detail: "公式の対応エリアページで、さいたま市を含む対応地域を案内。", url: "https://www.kagi110ban.jp/" },
    ],
    checks: ["区・住所・対象物・鍵の種類・本人確認書類の有無を伝える。", "作業前に出張費、作業費、部品代、追加条件、支払方法を確認する。", "賃貸住宅では管理会社・大家への連絡と、交換後の鍵の扱いを確認する。"],
    faqs: [
      { question: "さいたま市で鍵のトラブルを相談する時の要点は？", answer: "住所、対象物、鍵の種類、緊急性、本人確認の可否を伝え、現場到着前に料金条件を確認してください。" },
      { question: "鍵を壊して開けることはありますか？", answer: "鍵の種類・故障状況・防犯性能で対応が異なります。非破壊での可否、破壊時の交換費用を作業前に説明してもらってください。" },
    ],
  },
);

export function getRegionFact(vertical: string, city: string) {
  return regionFacts.find((fact) => fact.vertical === vertical && fact.city === city);
}
