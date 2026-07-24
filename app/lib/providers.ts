export type Provider = { id: string; vertical: string; name: string; coverage: string; services: string[]; highlights: string[]; pricing: string; sourceUrl: string; sourceLabel: string; verifiedAt: string };

const checked = "2026-07-24";
const listing = (id: string, vertical: string, name: string, coverage: string, services: string[], highlights: string[], pricing: string, sourceUrl: string, sourceLabel: string): Provider => ({ id, vertical, name, coverage, services, highlights, pricing, sourceUrl, sourceLabel, verifiedAt: checked });

// Published facts are limited to the linked official pages. Availability and final conditions require confirmation with each provider.
export const providers: Provider[] = [
  listing("duskin-service-master", "house-cleaning", "ダスキン サービスマスター", "全国のサービス拠点。対応地域は公式サイトで確認", ["エアコン", "浴室", "キッチン", "セットプラン"], ["公式サイトでサービスを確認", "見積もり条件を事前確認", "地域の拠点を検索可能"], "料金・作業範囲は公式サイトで確認", "https://www.duskin.jp/servicemaster/", "ダスキン公式サイト"),
  listing("osouji-honpo", "house-cleaning", "おそうじ本舗", "全国の店舗ネットワーク。対応地域は公式サイトで確認", ["エアコン", "浴室", "キッチン", "洗濯機"], ["店舗ごとの対応を確認", "サービス別の案内あり", "見積もり条件を確認"], "料金・オプションは公式サイトで確認", "https://www.osoujihonpo.com/", "おそうじ本舗公式サイト"),
  listing("bears-house-cleaning", "house-cleaning", "ベアーズ ハウスクリーニング", "対応エリアは公式サイトで確認", ["エアコン", "キッチン", "浴室", "水回りセット"], ["サービス内容を公式で確認", "プラン案内あり", "相談前にエリア確認"], "プラン・料金は公式サイトで確認", "https://www.happy-bears.com/houseclean/", "ベアーズ公式サイト"),
  listing("tokyo-gas-house-cleaning", "house-cleaning", "東京ガスのハウスクリーニング", "サービス対応エリアは公式サイトで確認", ["エアコン", "レンジフード・キッチン", "浴室", "洗濯機"], ["Webで注文可能", "メニュー・料金表を掲載", "作業範囲を公式で確認"], "壁掛けエアコンは13,200円（税込）から。対象機種・条件は公式サイトで確認", "https://kaji.tokyo-gas.co.jp/housecleaning/", "東京ガス公式サイト"),
  listing("osouji-kakumei", "house-cleaning", "おそうじ革命", "地域別ページ・対応地域は公式サイトで確認", ["エアコン", "キッチン", "浴室", "洗濯機"], ["地域別の案内あり", "作業前の料金提示を案内", "サービス別の解説あり"], "料金・対応可否は公式サイトで確認", "https://www.osoujikakumei.jp/house-cleaning/tokyo/", "おそうじ革命公式サイト"),
  listing("kajitaku-house-cleaning", "house-cleaning", "イオンのハウスクリーニング カジタク", "ほぼ全国対応。対象地域は公式サイトで確認", ["エアコン", "浴室", "レンジフード・キッチン", "洗濯機"], ["事前見積不要の一律料金を案内", "単品とセット商品を掲載", "サービス対象地域を公式で確認"], "エアコンは10,780円（税込）から。キャンペーン・対象条件は公式サイトで確認", "https://www.kajitaku.com/house-cleaning/", "カジタク公式サイト"),
  listing("cleancrew-house-cleaning", "house-cleaning", "クリーンクルー", "東京・神奈川・埼玉・千葉など。対応エリアは公式サイトで確認", ["エアコン", "キッチン", "浴室", "水回りセット"], ["地域別の公式ページあり", "料金表・セットプランを掲載", "無料見積もりを案内"], "家庭用壁掛エアコンは13,200円（税込）。追加条件は公式サイトで確認", "https://www.cleancrew.jp/", "クリーンクルー公式サイト"),
  listing("art-moving", "moving", "アート引越センター", "全国対応。対象エリアは公式サイトで確認", ["単身引越し", "家族引越し", "オプション", "海外引越し"], ["見積もりを公式で受付", "荷物量に応じた相談", "日程条件を確認"], "見積もり・時期・条件により変動", "https://www.the0123.com/", "アート引越センター公式サイト"),
  listing("sakai-moving", "moving", "サカイ引越センター", "全国対応。対象エリアは公式サイトで確認", ["単身引越し", "家族引越し", "オプション", "オンライン見積もり"], ["公式見積もり導線", "サービス内容を確認", "日程別の条件を確認"], "見積もり・時期・条件により変動", "https://www.hikkoshi-sakai.co.jp/", "サカイ引越センター公式サイト"),
  listing("bears-housekeeping", "housekeeping", "ベアーズ 家事代行", "対応エリアは公式サイトで確認", ["掃除", "料理", "買い物", "定期利用"], ["家事代行のプラン案内", "不在時利用の条件を確認", "対応地域を確認"], "プラン・料金は公式サイトで確認", "https://www.happy-bears.com/", "ベアーズ公式サイト"),
  listing("casy-housekeeping", "housekeeping", "CaSy", "対応エリアは公式サイトで確認", ["掃除代行", "料理代行", "整理収納", "スポット利用"], ["オンラインで予約案内", "サービス別の条件を確認", "対応地域を確認"], "時間制プラン・交通費などは公式サイトで確認", "https://casy.co.jp/", "CaSy公式サイト"),
  listing("duskin-totalgreen", "garden-care", "ダスキン トータルグリーン", "対応地域は公式サイトで確認", ["庭木剪定", "草刈り", "害虫対策", "庭の手入れ"], ["庭の状態を相談", "定期サービスを案内", "作業範囲を確認"], "見積もり・作業条件は公式サイトで確認", "https://totalgreen.duskin.jp/", "ダスキン公式サイト"),
  listing("oh28ya", "garden-care", "oh!庭ya!", "対応地域は公式サイトで確認", ["庭木剪定", "草刈り", "伐採", "枝葉処分"], ["写真で事前相談", "庭の手入れを案内", "対応地域を確認"], "料金・処分条件は公式サイトで確認", "https://www.oh28ya.com/", "oh!庭ya!公式サイト"),
  listing("duskin-terminix", "pest-control", "ダスキン ターミニックス", "対応地域は公式サイトで確認", ["ゴキブリ対策", "シロアリ対策", "ハチ対策", "害獣対策"], ["対象別の対策案内", "定期管理を案内", "施工条件を確認"], "見積もり・施工条件は公式サイトで確認", "https://www.duskin.jp/terminix/", "ダスキン公式サイト"),
  listing("kagi110ban", "locksmith", "カギ110番", "全国対応を案内。地域・受付条件は公式サイトで確認", ["鍵開け", "鍵交換", "鍵修理", "防犯相談"], ["出張条件を確認", "本人確認の条件を確認", "作業前の金額確認を推奨"], "出張・作業条件は公式サイトで確認", "https://www.kagi110ban.jp/", "カギ110番公式サイト"),
  listing("qracian", "plumbing", "クラシアン", "対応地域は公式サイトで確認", ["水漏れ", "つまり", "トイレ", "キッチン"], ["水回りの相談を案内", "見積もり条件を確認", "作業前の説明を確認"], "作業料金・出張条件は公式サイトで確認", "https://www.qracian.co.jp/", "クラシアン公式サイト"),
  listing("esmile", "plumbing", "イースマイル", "対応地域は公式サイトで確認", ["水漏れ", "つまり", "トイレ", "蛇口交換"], ["水回りのサービス案内", "見積もり条件を確認", "対応地域を確認"], "料金・部品代・出張条件は公式サイトで確認", "https://www.esmile-24.com/", "イースマイル公式サイト"),
  listing("edion-construction", "electrical", "エディオン 電気工事サービス", "対応地域・施工条件は公式サイトで確認", ["エアコン工事", "アンテナ工事", "電気工事", "コンセント工事"], ["施工内容を公式で確認", "追加工事の条件を確認", "対応地域を確認"], "工事内容・追加工事は公式サイトで確認", "https://service-info.edion.jp/service/construction/", "エディオン公式サイト"),
  listing("yamada-construction", "electrical", "ヤマダデンキ 工事サービス", "対応地域・施工条件は公式サイトで確認", ["エアコン設置", "アンテナ工事", "電気工事", "リフォーム工事"], ["工事メニューを確認", "設置条件を確認", "追加工事を確認"], "工事内容・追加工事は公式サイトで確認", "https://www.yamada-denkiweb.com/info/wcontents/kouji_aircon.html", "ヤマダデンキ公式サイト"),
  listing("benry-handyman", "handyman", "ベンリー", "全国の店舗ネットワーク。対応地域・作業可否は最寄り店舗で確認", ["家具移動・引っ越しの手伝い", "庭の手入れ", "不用品処理の手伝い", "住まいの軽修繕"], ["サービスカテゴリを公式で確認", "最寄り店舗を検索可能", "作業前に見積もりを依頼"], "作業内容・地域・追加条件は店舗ごとに公式確認", "https://www.benry.com/service-index/", "ベンリー公式サイト"),
];

export function getProviders(vertical: string) { return providers.filter((provider) => provider.vertical === vertical); }
export function getProvider(id: string) { return providers.find((provider) => provider.id === id); }
