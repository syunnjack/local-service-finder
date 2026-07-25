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

const locksmithPublicSafetySources: Record<string, RegionFact["sources"][number]> = {
  tokyo: {
    name: "警視庁",
    detail: "侵入窃盗対策として、補助錠、CP部品、窓の対策、日常の施錠確認を公式に案内。",
    url: "https://www.keishicho.metro.tokyo.lg.jp/kurashi/higai/akisu/akisu.html",
  },
  osaka: {
    name: "大阪府警察",
    detail: "住宅侵入犯罪対策として、外回り、窓・ドア、鍵の防犯診断を公式に案内。",
    url: "https://www.police.pref.osaka.lg.jp/seikatsu/8/16664.html",
  },
  yokohama: {
    name: "神奈川県警察",
    detail: "住宅侵入犯罪対策として、施錠、CP部品、防犯カメラなどを公式に案内。",
    url: "https://www.police.pref.kanagawa.jp/kurashi/anzen_machi/mesd0095.html",
  },
  saitama: {
    name: "埼玉県警察",
    detail: "侵入窃盗・強盗対策として、施錠、訪問者確認、補助錠・防犯フィルムを公式に案内。",
    url: "https://www.police.pref.saitama.lg.jp/p0120/20250827taisaku.html",
  },
};

for (const [city, source] of Object.entries(locksmithPublicSafetySources)) {
  const fact = regionFacts.find((item) => item.vertical === "locksmith" && item.city === city);
  if (fact) fact.sources.push(source);
}

regionFacts.push(
  {
    vertical: "garden-care", city: "tokyo", verifiedAt,
    sources: [
      { name: "東京都シルバー人材センター連合", detail: "区市町村ごとに設置されたシルバー人材センターの公式案内。庭木作業は所在地のセンターへ内容・受付状況を確認。", url: "https://www.tokyosilver.jp/" },
      { name: "港区シルバー人材センター", detail: "植木剪定・除草作業について受注制限の案内を掲載。受付状況は変動するため確認が必要。", url: "https://www.minato-sc.or.jp/" },
    ],
    checks: ["民間の庭木業者と、区市町村のシルバー人材センターの両方へ、同じ作業範囲で見積もり・受付状況を確認する。", "高木・危険作業・処分・道路使用などは受託可否が異なるため、樹木の写真・高さ・作業場所を先に伝える。"],
    faqs: [{ question: "東京都でシルバー人材センターへ頼めますか？", answer: "居住地・作業地の区市町村のセンターへ直接確認してください。作業内容、受付状況、安全上の条件により受託可否が変わります。" }],
  },
  {
    vertical: "garden-care", city: "osaka", verifiedAt,
    sources: [
      { name: "大阪市シルバー人材センター", detail: "除草・剪定、家庭の家事支援などを受ける仕事として公式に案内。", url: "https://www.osakasc.or.jp/work.php" },
      { name: "大阪市", detail: "大阪市シルバー人材センターによる除草・植栽剪定を含む空家管理サービスを案内。", url: "https://www.city.osaka.lg.jp/toshikeikaku/page/0000406807.html" },
    ],
    checks: ["民間業者とシルバー人材センターで、剪定・除草・草刈り・処分・高所作業の可否を同じ条件で確認する。", "空家・集合住宅・隣地に関係する作業は、管理者・所有者の承諾と作業範囲を先に確認する。"],
    faqs: [{ question: "大阪市のシルバー人材センターに草刈りを頼めますか？", answer: "公式ページで除草・剪定が案内されています。安全条件や受付状況は作業内容・場所で変わるため、事前に相談してください。" }],
  },
  {
    vertical: "garden-care", city: "yokohama", verifiedAt,
    sources: [
      { name: "横浜市シルバー人材センター", detail: "横浜市が設立した公益法人として、植木・家事援助を含む地域の仕事に対応することを案内。", url: "https://webc.sjc.ne.jp/yokohama/index" },
    ],
    checks: ["民間の庭木業者と横浜市シルバー人材センターへ、樹木の高さ・本数・処分・駐車条件を同じ前提で相談する。", "高所・電線付近・道路沿い・危険を伴う作業は、受託可否と安全対応を必ず確認する。"],
    faqs: [{ question: "横浜市のシルバー人材センターは庭木作業に対応しますか？", answer: "公式サイトで植木を扱う案内があります。対象地域・具体的作業・受付状況は直接確認してください。" }],
  },
  {
    vertical: "garden-care", city: "saitama", verifiedAt,
    sources: [
      { name: "さいたま市シルバー人材センター", detail: "個人宅向けに植木剪定・生垣刈り込み・草取り・草刈りを公式に案内。", url: "https://saitama-sjc.or.jp/simin/kojintaku.html" },
      { name: "さいたま市", detail: "市内作業の依頼条件、庭木の手入れ・除草などの仕事を公式に案内。", url: "https://www.city.saitama.lg.jp/007/007/001/004/p015127.html" },
    ],
    checks: ["民間の庭木業者とシルバー人材センターへ、剪定・草刈り・処分・高所作業を分けて相談し、同条件で比較する。", "市内での作業、危険を伴わない範囲など、公式に示された受託条件と受付状況を確認する。"],
    faqs: [{ question: "さいたま市で相見積もりする方法は？", answer: "樹木の写真・高さ・本数・作業希望・処分の要否をそろえ、民間業者と市シルバー人材センターへ同じ条件で相談してください。" }],
  },
  {
    vertical: "handyman", city: "tokyo", verifiedAt,
    sources: [{ name: "ベンリー", detail: "公式の店舗検索で東京都内の店舗を確認でき、家具移動・庭手入れ・片付け等のサービスカテゴリを案内。", url: "https://www.benry.com/benrytown-top-result/all/" }],
    checks: ["依頼内容を具体化し、専門資格や許可が必要な工事・処分は対応可否を確認する。", "作業範囲、資材・処分、出張、追加作業、キャンセル条件を見積もりに含めて確認する。"],
    faqs: [{ question: "便利屋へ何でも頼めますか？", answer: "サービス範囲は店舗と作業内容により異なります。資格・許可が必要な工事や処分は、対応可否と根拠を確認してください。" }],
  },
  {
    vertical: "handyman", city: "osaka", verifiedAt,
    sources: [{ name: "ベンリー", detail: "公式店舗紹介で大阪府内店舗を案内。サービス内容と地域対応は最寄り店舗へ確認する方式。", url: "https://www.benry.com/fc-introduction/" }],
    checks: ["家具移動、片付け、庭作業、軽修繕を分け、作業範囲と専門業者が必要な範囲を確認する。", "廃棄物処理や電気・ガス・水道工事は、必要な許可・資格の有無を必ず確認する。"],
    faqs: [{ question: "大阪で便利屋を比較する時のポイントは？", answer: "依頼内容、作業時間、資材・処分、出張、追加作業の条件をそろえ、資格・許可が必要な作業は専門事業者も比較してください。" }],
  },
  {
    vertical: "handyman", city: "yokohama", verifiedAt,
    sources: [{ name: "ベンリー妙蓮寺店", detail: "横浜市神奈川区の公式店舗ページで、ヒアリング後に見積もりを作成する流れを案内。", url: "https://myourenji.benry.com/" }],
    checks: ["横浜市では区・住所・作業内容を伝え、店舗の対応範囲と見積もり条件を確認する。", "高所作業、運搬、廃棄、電気・水道に関わる作業は安全条件と資格・許可を確認する。"],
    faqs: [{ question: "横浜市で見積もり前に伝えることは？", answer: "住所、依頼内容、作業箇所の写真、希望日時、駐車・搬入条件を伝え、作業範囲と追加条件を確認してください。" }],
  },
  {
    vertical: "handyman", city: "saitama", verifiedAt,
    sources: [{ name: "ベンリー", detail: "公式店舗一覧で埼玉県内の店舗を案内。対応地域・作業可否は店舗へ直接確認する方式。", url: "https://www.benry.com/benrytown-top-result/all/" }, { name: "株式会社ベンリー", detail: "さいたま市を拠点とする公式ページで、住まいの軽修繕・リフォーム等のサービスを案内。", url: "https://inc-benry.jp/service/" }],
    checks: ["軽修繕と資格が必要な工事を分け、事業者の許可・資格、作業範囲、保証を確認する。", "片付け・運搬では、処分方法、搬出条件、追加料金が発生する条件を作業前に確認する。"],
    faqs: [{ question: "さいたま市で便利屋へ依頼する時の注意点は？", answer: "依頼内容を写真とともに伝え、資格・許可が必要な作業か、見積もりに何が含まれるか、処分や追加作業の条件を確認してください。" }],
  },
);

regionFacts.push(
  {
    vertical: "pest-control", city: "tokyo", verifiedAt,
    sources: [{ name: "ダスキン", detail: "東京都の公式店舗検索で、害虫駆除・総合衛生管理を取り扱う都内店舗を案内。", url: "https://www.duskin.jp/store/tokyo/" }, { name: "ダスキン ターミニックス", detail: "害虫獣の駆除・予防サービスと都道府県別の店舗検索を案内。", url: "https://www.duskin.jp/terminix/" }],
    checks: ["害虫・害獣の種類、発生場所、目撃頻度、写真、子ども・ペットの有無を伝える。", "薬剤・施工範囲・再発時対応・追加作業の条件を、調査と見積もりの段階で確認する。"],
    faqs: [{ question: "東京都で害虫駆除を頼む前に用意する情報は？", answer: "種類が不明でも、発生場所・時間帯・写真や動画・被害の状況を記録して相談してください。無理な薬剤使用は避けます。" }],
  },
  {
    vertical: "pest-control", city: "osaka", verifiedAt,
    sources: [{ name: "ダスキン", detail: "大阪府の公式店舗検索で、害虫駆除・総合衛生管理を取り扱う大阪市内を含む店舗を案内。", url: "https://www.duskin.jp/store/osaka/" }, { name: "ダスキン ターミニックス", detail: "害虫・害獣の種類別サービスと地域別店舗検索を案内。", url: "https://www.duskin.jp/terminix/" }],
    checks: ["大阪市内でも住所・害虫の種類・建物状況により対応条件が異なるため、区・住所まで伝える。", "施工範囲、薬剤の扱い、再発予防、保証・再施工の条件を作業前に確認する。"],
    faqs: [{ question: "大阪市で集合住宅の害虫駆除を頼む場合は？", answer: "専有部と共用部の切り分け、管理会社への連絡、周辺住戸への影響を確認してから依頼してください。" }],
  },
  {
    vertical: "pest-control", city: "yokohama", verifiedAt,
    sources: [{ name: "ダスキン", detail: "神奈川県の公式店舗検索で、横浜市鶴見区の害虫駆除・総合衛生管理取扱店舗などを案内。", url: "https://www.duskin.jp/store/kanagawa/" }, { name: "ダスキン ターミニックス", detail: "害虫獣の駆除・予防サービスと都道府県別店舗検索を案内。", url: "https://www.duskin.jp/terminix/" }],
    checks: ["横浜市では区・住所・発生箇所を伝え、最寄り店舗の対応可否と現地調査条件を確認する。", "ペット・小さな子ども・アレルギーがある場合は、薬剤・施工後の注意事項を事前に確認する。"],
    faqs: [{ question: "横浜市で再発予防も相談できますか？", answer: "予防を含む対応の可否は害虫の種類と建物状況で異なります。侵入経路の確認、施工範囲、再発時の条件を見積もりで確認してください。" }],
  },
  {
    vertical: "pest-control", city: "saitama", verifiedAt,
    sources: [{ name: "ダスキン", detail: "埼玉県の公式店舗検索で、さいたま市内の害虫駆除・総合衛生管理取扱店舗を案内。", url: "https://www.duskin.jp/store/saitama/" }, { name: "ダスキン ターミニックス", detail: "害虫獣の駆除・予防サービスと都道府県別店舗検索を案内。", url: "https://www.duskin.jp/terminix/" }],
    checks: ["区・住所・害虫の種類・発生場所・写真を伝え、現地調査の要否と対応可否を確認する。", "施工料金だけでなく、薬剤、侵入経路対策、追加作業、再施工の条件を比較する。"],
    faqs: [{ question: "さいたま市で害虫の種類が分からない場合は？", answer: "写真や発生場所・時間帯を記録して相談してください。種類の特定と施工方法は、現地状況を踏まえて確認するのが安全です。" }],
  },
);

regionFacts.push(
  {
    vertical: "electrical", city: "tokyo", verifiedAt,
    sources: [
      { name: "エディオン AKIBA", detail: "千代田区外神田の公式店舗ページ。家電製品の取扱いと訪問修理受付を案内。", url: "https://search.edion.com/e_store/spot/detail?code=0000004762" },
      { name: "エディオン エアコン工事", detail: "標準工事の範囲と、設置場所・配管延長・専用コンセントなどで別途作業となる条件を公式に案内。", url: "https://service-info.edion.jp/service/construction/air_conditioner/" },
      { name: "経済産業省", detail: "家庭用エアコンの設置・修理に係る電気工事業の登録等について案内。", url: "https://www.meti.go.jp/policy/safety_security/industrial_safety/sangyo/electric/detail/koji_2.html" },
    ],
    checks: ["東京都内でも住所・建物種別・室内機と室外機の位置を伝え、訪問可否と工事日を確認する。", "型番、既設機の有無、配管の長さ・穴・室外機置場、専用コンセントと分電盤の状況を写真で共有する。", "賃貸では管理会社・貸主への確認が必要な穴あけや配線変更がないか、見積もり前に確認する。"],
    faqs: [{ question: "東京都でエアコン設置の追加費用を減らすには？", answer: "標準工事の範囲は事業者で異なります。設置場所、配管、室外機の置場、専用コンセント、既設機の撤去を同じ条件で伝え、追加作業の条件を比較してください。" }],
  },
  {
    vertical: "electrical", city: "osaka", verifiedAt,
    sources: [
      { name: "エディオン大阪府店舗検索", detail: "大阪市内の複数区を含む大阪府の公式店舗検索。地域・駅から店舗を確認できる。", url: "https://search.edion.com/e_store/address/list?address=27&search=address" },
      { name: "エディオン エアコン工事", detail: "標準工事と、屋根・壁面設置、高所作業、配管延長、専用コンセントなどの追加条件を公式に案内。", url: "https://service-info.edion.jp/service/construction/air_conditioner/" },
      { name: "経済産業省", detail: "エアコン用の専用回路に関する安全上の考え方を公式Q&Aで案内。", url: "https://www.meti.go.jp/policy/safety_security/industrial_safety/sangyo/electric/detail/koji_koshuQA.html" },
    ],
    checks: ["大阪市では区・住所・集合住宅か戸建てかを伝え、搬入経路と作業可能な時間帯を確認する。", "室外機の置場がベランダ以外の場合は、架台・高所作業・安全対策が必要かを見積もりで確認する。", "専用回路の要否は機種と既存回路の状況で変わるため、分電盤とコンセントの写真を共有して確認する。"],
    faqs: [{ question: "大阪市で室外機を壁面・屋根に置く場合は？", answer: "標準工事の対象外になることがあります。設置方法、作業高さ、安全対策、架台の扱いを事前見積もりで確認してください。" }],
  },
  {
    vertical: "electrical", city: "yokohama", verifiedAt,
    sources: [
      { name: "エディオン横浜周辺店舗", detail: "横浜西口本店・横浜曙町店など、横浜市内の公式店舗と所在地を案内。", url: "https://search.edion.com/e_store/station/spot/list?node=00000838&radius=5" },
      { name: "エディオン エアコン工事", detail: "取付の基本作業範囲と、配管・設置方法・専用コンセントで変わる作業条件を公式に案内。", url: "https://service-info.edion.jp/service/construction/air_conditioner/" },
      { name: "経済産業省", detail: "家庭用エアコン設置・修理に必要となる電気工事業の手続を案内。", url: "https://www.meti.go.jp/policy/safety_security/industrial_safety/sangyo/electric/detail/koji_2.html" },
    ],
    checks: ["横浜市では区・住所・室外機の置場を伝え、最寄りの相談窓口と訪問対応の可否を確認する。", "集合住宅では管理規約、配管穴、ベランダの避難経路・共用部への影響を確認してから依頼する。", "型番、既設配管の再利用希望、コンセント形状、分電盤の状況を写真で伝え、当日の追加を減らす。"],
    faqs: [{ question: "横浜市の集合住宅で先に確認することは？", answer: "管理規約と管理会社への確認が先です。穴あけ、共用部への作業、室外機の置場、作業車両の条件を確かめてから見積もりを依頼してください。" }],
  },
  {
    vertical: "electrical", city: "saitama", verifiedAt,
    sources: [
      { name: "YAMADA浦和埼大通り店", detail: "さいたま市桜区の公式店舗ページ。所在地を確認できる家電量販店の地域窓口。", url: "https://www.yamada-denki.jp/store/contents/?d=816" },
      { name: "エディオン エアコン工事", detail: "標準工事の範囲と、室外機の設置方法・配管延長・専用コンセントで追加となる条件を公式に案内。", url: "https://service-info.edion.jp/service/construction/air_conditioner/" },
      { name: "経済産業省", detail: "家庭用エアコンの設置・修理に関する電気工事業の登録等を案内。", url: "https://www.meti.go.jp/policy/safety_security/industrial_safety/sangyo/electric/detail/koji_2.html" },
    ],
    checks: ["さいたま市では区・住所・戸建てか集合住宅かを伝え、訪問対応と搬入・駐車条件を確認する。", "室内機と室外機の位置、既設配管、穴、コンセント、分電盤を撮影し、標準工事外になり得る条件を確認する。", "取り外し・リサイクル・移設の扱い、工事保証の範囲、追加工事が必要になる場合を作業前に確認する。"],
    faqs: [{ question: "さいたま市でエアコンの移設も一緒に相談できますか？", answer: "移設可否は機器の状態と設置先の条件で決まります。取り外し、運搬、再設置、既設配管の扱いを分けて確認し、工事前の見積もりで合意してください。" }],
  },
);

const plumbingAuthoritySources: Record<string, RegionFact["sources"][number]> = {
  tokyo: {
    name: "東京都水道局",
    detail: "水道メーター下流側の漏水修繕を行う、東京都指定給水装置工事事業者の登録情報を案内。",
    url: "https://www.waterworks.metro.tokyo.lg.jp/jigyosha/koji/kojigyosya/shuzen",
  },
  osaka: {
    name: "大阪市水道局",
    detail: "メーターから蛇口までの水漏れは指定給水装置工事事業者へ依頼し、複数見積もりと作業前の内容確認を案内。",
    url: "https://www.city.osaka.lg.jp/suido/page/0000038216.html",
  },
  yokohama: {
    name: "横浜市水道局",
    detail: "指定給水装置工事事業者の一覧と、依頼前に工事内容・所要時間・概算額・見積もり費用を確認する注意点を案内。",
    url: "https://www.city.yokohama.lg.jp/business/bunyabetsu/suido/kyuusui-souchi/tetsuzuki/shiteikojijigyosha.html",
  },
  saitama: {
    name: "さいたま市水道局",
    detail: "メーターから蛇口までの漏水は指定工事事業者へ依頼し、緊急時のメーター止水栓による一時対応を案内。",
    url: "https://www.city.saitama.lg.jp/001/006/002/043/002/p008923.html",
  },
};

for (const [city, source] of Object.entries(plumbingAuthoritySources)) {
  const fact = regionFacts.find((item) => item.vertical === "plumbing" && item.city === city);
  if (fact) fact.sources.push(source);
}

const movingDisposalSources: Record<string, RegionFact["sources"][number]> = {
  tokyo: {
    name: "東京都環境局",
    detail: "家庭ごみ・粗大ごみの収集は、住所地の区市町村が担当すること、家電4品目は通常の粗大ごみとは異なるリサイクル手続が必要なことを案内。",
    url: "https://www.kankyo.metro.tokyo.lg.jp/inquiry/contact/garbage/garbage/",
  },
  osaka: {
    name: "大阪市",
    detail: "引越し等で一時的に出る多量のごみを含む粗大ごみの申込み方法、収集日・場所の確認方法を公式に案内。",
    url: "https://www.city.osaka.lg.jp/kankyo/page/0000515879.html",
  },
  yokohama: {
    name: "横浜市",
    detail: "粗大ごみの収集・持込みには事前申込みが必要で、収集までおおむね2週間、申込み上限は9個であることを案内。",
    url: "https://www.city.yokohama.lg.jp/kurashi/sumai-kurashi/gomi-recycle/gomi/shushu/sodaigomi/dashikata/shuushuu.html",
  },
  saitama: {
    name: "さいたま市",
    detail: "粗大ごみの申込みと処理手数料納付券の案内、申込み先の誤発信に注意する案内を掲載。",
    url: "https://www.city.saitama.lg.jp/001/006/010/003/p072165.html",
  },
};

for (const [city, source] of Object.entries(movingDisposalSources)) {
  const fact = regionFacts.find((item) => item.vertical === "moving" && item.city === city);
  if (fact) fact.sources.push(source);
}

regionFacts.push(
  {
    vertical: "moving", city: "sapporo", verifiedAt,
    sources: [{ name: "札幌市 大型ごみ", detail: "大型ごみは戸別有料収集です。インターネットまたは電話で申し込み、収集曜日と申込期限は区ごとに異なります。", url: "https://www.city.sapporo.jp/seiso/gomi/oogatagomi.html" }],
    checks: ["大型ごみの対象外となる家電4品目・パソコン・事業所から出た物は、別の適正処理方法を確認する。", "収集希望日の2週間前から申し込めます。住所の区ごとの収集曜日と申込期限を確認する。", "遺品整理や一時多量ごみは、自治体案内と民間サービスの両方で処分方法・費用を比べる。"],
    faqs: [{ question: "札幌市で大型ごみを出す際に先に確認することは？", answer: "品目が対象か、区ごとの収集曜日・申込期限、手数料を札幌市公式サイトで確認してから申し込みます。家電4品目やパソコンは対象外です。" }],
  },
  {
    vertical: "plumbing", city: "sapporo", verifiedAt,
    sources: [{ name: "札幌市水道局", detail: "漏水などの修繕工事や凍結修理を行う、掲載希望のある指定給水装置工事事業者の名簿を区別に公開しています。", url: "https://www.city.sapporo.jp/suido/riyosya/trouble/koji/syuzen/index.html" }],
    checks: ["凍結・漏水・一般修繕のどれに対応するかを名簿で確認する。", "見積もり、出張費、作業時間、材料費、緊急時の追加料金を依頼前に確認する。", "札幌市水道局は複数の指定事業者から見積もりを取り、納得してから依頼するよう案内している。"],
    faqs: [{ question: "札幌市で水道が凍結・漏水した場合は？", answer: "札幌市水道局の修繕・凍結修理対応の指定事業者名簿で、住所の区と対応工事を確認します。費用は自己負担のため、作業内容と見積もりを比較してから依頼します。" }],
  },
  {
    vertical: "locksmith", city: "sapporo", verifiedAt,
    sources: [{ name: "札幌市 身近な犯罪から身を守る", detail: "札幌市は侵入窃盗を含む身近な犯罪への防犯対策と、北海道警察の防犯情報を案内しています。", url: "https://www.city.sapporo.jp/shimin/chiiki-bohan/mijikanahanzai/index.html" }],
    checks: ["緊急の解錠依頼でも、作業前に出張費・作業費・部品代・追加料金の内訳を確認する。", "鍵交換は錠前の型番、合鍵の必要本数、マンション管理規約を確認する。", "防犯対策は施錠だけでなく、窓・補助錠・在宅時の対応を含めて比較する。"],
    faqs: [{ question: "札幌市で鍵業者を比較する際の注意点は？", answer: "緊急性と料金を分けて考え、作業前に総額と追加条件を確認します。交換では既存の鍵の型番や管理規約も確認し、防犯対策は公式の注意情報も参照します。" }],
  },
  {
    vertical: "garden-care", city: "sapporo", verifiedAt,
    sources: [{ name: "札幌市シルバー人材センター", detail: "札幌市シルバー人材センターは、地域からの短期・短時間の仕事を受け、植木の手入れを含む仕事を案内しています。", url: "https://www.s-silver.jp/silver.php" }],
    checks: ["剪定・草刈りの対象範囲、枝葉の処分、作業時期、立会い要否を見積もり時にそろえて伝える。", "高所作業・伐採・病害虫対応など、依頼できない作業がないか確認する。", "シルバー人材センターと民間事業者で、作業内容・日程・処分費を同じ条件で比較する。"],
    faqs: [{ question: "札幌市で庭木の手入れを比較するには？", answer: "剪定する木の本数・高さ、草刈り面積、枝葉の処分、希望時期をそろえ、シルバー人材センターと民間事業者に同じ条件で確認します。" }],
  },
);

regionFacts.push(
  {
    vertical: "moving", city: "sendai", verifiedAt,
    sources: [{ name: "仙台市 粗大ごみの出し方・受付", detail: "粗大ごみは事前申込みが必要で、収集日・手数料・排出場所を確認します。無許可の回収業者には依頼しないよう案内されています。", url: "https://www.city.sendai.jp/haiki-kanri/kurashi/machi/genryo/gomi/wakekata/sodaigomi.html" }],
    checks: ["品目・大きさ・手数料と収集指定日を公式窓口で確認する。", "市は原則として家からの運び出しを行わないため、必要な支援制度と民間サービスの範囲を分けて確認する。", "家庭から出るごみか、事業ごみかで処理方法が異なるため、無許可回収業者には依頼しない。"],
    faqs: [{ question: "仙台市で粗大ごみを処分する前に何を確認する？", answer: "品目・サイズ・手数料、収集日、排出場所を仙台市の公式案内で確認します。家庭ごみに限られ、運び出しが必要な場合は制度対象か民間サービスかを分けて検討します。" }],
  },
  {
    vertical: "plumbing", city: "sendai", verifiedAt,
    sources: [{ name: "仙台市水道局 指定給水装置工事事業者名簿", detail: "水道の新設・改造・修理は指定事業者へ依頼するよう案内され、区別の名簿と地元密着型水道修繕登録店制度が公開されています。", url: "https://www.suidou.city.sendai.jp/soshiki/kyusui-kyusuisochi/kyusuisochi/3/304.html" }],
    checks: ["水道局の指定事業者であることと、住所の区への対応を確認する。", "見積もりが有料の場合もあるため、依頼前に費用の説明と見積もり条件を確認する。", "仙台市水道局の案内に従い、複数の指定事業者から見積もりを取り、内容と費用を比較する。"],
    faqs: [{ question: "仙台市で水道修理を依頼する際の比較基準は？", answer: "仙台市水道局の指定事業者名簿で対応区を確認し、作業内容・出張費・見積もり費用・追加料金を同じ条件で比べます。" }],
  },
  {
    vertical: "locksmith", city: "sendai", verifiedAt,
    sources: [{ name: "仙台市 防犯のポイント", detail: "仙台市は住まいの防犯を含む防犯情報と、宮城県警の防犯情報を案内しています。", url: "https://www.city.sendai.jp/shiminsekatsu/kurashi/anzen/anzen/bohan/point.html" }],
    checks: ["解錠や鍵交換は、作業前に出張費・作業費・部品代・追加条件を総額で確認する。", "住まいの防犯では施錠、窓まわり、補助錠・防犯フィルムなどの対策を分けて検討する。", "マンションは管理規約と既存錠の型番を確認し、合鍵・原状回復の扱いも確認する。"],
    faqs: [{ question: "仙台市で鍵・防犯業者を選ぶときの注意点は？", answer: "緊急対応の可否と料金を分け、作業前に総額と追加条件を確認します。交換では管理規約と鍵の型番を確認し、地域の防犯情報も参照します。" }],
  },
  {
    vertical: "garden-care", city: "sendai", verifiedAt,
    sources: [{ name: "仙台市シルバー人材センター", detail: "植木剪定・除草の技能講習を案内しており、地域の作業依頼先として確認できます。", url: "https://webc.sjc.ne.jp/sendaisc/activity_5" }],
    checks: ["剪定する木の本数・高さ、草刈り面積、枝葉処分、希望時期をそろえて伝える。", "高所・伐採・病害虫対応など、依頼できる範囲と安全上の制約を確認する。", "シルバー人材センターと民間事業者で作業範囲・日程・処分費を同じ条件で比較する。"],
    faqs: [{ question: "仙台市で剪定・草刈りを比較するには？", answer: "木の高さと本数、草刈り面積、枝葉の処分、希望日をそろえ、シルバー人材センターと民間事業者へ同条件で確認します。" }],
  },
);

export function getRegionFact(vertical: string, city: string) {
  return regionFacts.find((fact) => fact.vertical === vertical && fact.city === city);
}
