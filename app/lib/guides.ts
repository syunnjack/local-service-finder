export type Guide = {
  slug: string;
  title: string;
  description: string;
  vertical: string;
  updatedAt: string;
  summary: string;
  steps: string[];
  questions: string[];
  sources: { label: string; url: string }[];
};

export const guides: Guide[] = [
  {
    slug: "house-cleaning-estimate-checklist",
    title: "ハウスクリーニングの見積もりで確認する7項目",
    description: "料金だけで比較せず、作業範囲・追加費用・対応機種を確認するための見積もりチェックリストです。",
    vertical: "house-cleaning",
    updatedAt: "2026-07-24",
    summary: "見積もりでは、希望箇所・汚れの状況・対象機器・駐車場・追加料金の条件を同じ前提で伝えることが、比較の精度を上げます。",
    steps: ["依頼したい箇所と台数を一覧にする", "汚れ・設置状況・型番を写真とともに共有する", "基本料金に含まれる作業範囲を確認する", "追加料金が発生する条件を質問する", "作業時間・訪問日時・キャンセル条件を確認する", "損害時の対応と保証の案内を確認する", "同じ条件で複数社の回答を比較する"],
    questions: ["基本料金に含まれる作業はどこまでですか？", "追加料金が発生する条件はありますか？", "対象の機種・設置状況に対応できますか？"],
    sources: [{ label: "ダスキン公式｜ハウスクリーニング", url: "https://www.duskin.jp/servicemaster/" }, { label: "おそうじ本舗公式", url: "https://www.osoujihonpo.com/" }],
  },
  {
    slug: "moving-estimate-checklist",
    title: "引越し見積もり前にそろえる情報と比較のコツ",
    description: "単身・家族引越しで、条件の違う見積もりを正しく比べるための準備と質問集です。",
    vertical: "moving",
    updatedAt: "2026-07-24",
    summary: "荷物量、希望日、現住居と新居の条件、荷造りの範囲をそろえて伝えると、引越しプランを比較しやすくなります。",
    steps: ["引越し希望日と時間帯の希望を整理する", "荷物量と大型家具・家電をリスト化する", "現住居・新居の階数、エレベーター、搬入経路を確認する", "荷造り・荷ほどきの希望範囲を決める", "単身・家族・法人など対象プランを確認する", "オプションと不要品対応の要否を分けて確認する", "見積もりの前提条件が同じかを比較表で確認する"],
    questions: ["荷造り・荷ほどきはどこまで含まれますか？", "追加費用が発生しうる条件は何ですか？", "希望日の変更やキャンセルの条件は何ですか？"],
    sources: [{ label: "アート引越センター公式", url: "https://www.the0123.com/" }, { label: "サカイ引越センター公式", url: "https://www.hikkoshi-sakai.co.jp/index.html" }],
  },
  {
    slug: "housekeeping-first-request",
    title: "家事代行を初めて頼む前の準備チェックリスト",
    description: "掃除・料理・整理収納などの家事代行を依頼する前に、希望を伝えやすくする準備をまとめました。",
    vertical: "housekeeping",
    updatedAt: "2026-07-24",
    summary: "依頼の目的、優先順位、使える時間、使用してよい道具を事前に共有すると、初回のすれ違いを減らせます。",
    steps: ["依頼したい家事と優先順位を3つまで決める", "希望日時と訪問時の在宅・不在条件を確認する", "使用してよい洗剤・道具・食材を整理する", "入室してよい部屋・触れてほしくない物を伝える", "アレルギーやペットなどの注意点を共有する", "定期・スポットのどちらが合うかを考える", "初回後に見直すポイントをメモする"],
    questions: ["依頼できる作業と依頼できない作業は何ですか？", "提供エリア・予約可能な時間帯はどこで確認できますか？", "破損や事故が起きた場合の対応はどうなりますか？"],
    sources: [{ label: "ベアーズ公式｜家事代行", url: "https://www.happy-bears.com/" }, { label: "CaSy公式｜家事代行", url: "https://casy.co.jp/" }],
  },
];

export function getGuide(slug: string) { return guides.find((guide) => guide.slug === slug); }
