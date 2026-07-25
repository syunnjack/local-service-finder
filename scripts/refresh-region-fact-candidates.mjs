import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDirectory = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const defaultOutput = path.join(rootDirectory, "docs", "region-fact-candidates.md");
const today = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Tokyo" }).format(new Date());

const cityLabels = {
  tokyo: "東京都",
  osaka: "大阪市",
  yokohama: "横浜市",
  saitama: "さいたま市",
};

const sourceCandidates = [
  ["moving", "tokyo", "東京都環境局", "https://www.kankyo.metro.tokyo.lg.jp/inquiry/contact/garbage/garbage/", "自治体別の粗大ごみ窓口と家電リサイクルの扱いを確認する"],
  ["moving", "osaka", "大阪市", "https://www.city.osaka.lg.jp/kankyo/page/0000515879.html", "引越し時の粗大ごみ申込み・収集条件を確認する"],
  ["moving", "yokohama", "横浜市", "https://www.city.yokohama.lg.jp/kurashi/sumai-kurashi/gomi-recycle/gomi/shushu/sodaigomi/dashikata/shuushuu.html", "粗大ごみの申込み・収集条件を確認する"],
  ["moving", "saitama", "さいたま市", "https://www.city.saitama.lg.jp/001/006/010/003/p072165.html", "粗大ごみの申込み・納付券の扱いを確認する"],
  ["plumbing", "tokyo", "東京都水道局", "https://www.waterworks.metro.tokyo.lg.jp/jigyosha/koji/kojigyosya/shuzen", "メーター下流側の修繕対応登録事業者を確認する"],
  ["plumbing", "osaka", "大阪市水道局", "https://www.city.osaka.lg.jp/suido/page/0000038216.html", "指定工事店と漏水時の確認事項を確認する"],
  ["plumbing", "yokohama", "横浜市水道局", "https://www.city.yokohama.lg.jp/business/bunyabetsu/suido/kyuusui-souchi/tetsuzuki/shiteikojijigyosha.html", "指定工事店と見積もり時の確認事項を確認する"],
  ["plumbing", "saitama", "さいたま市水道局", "https://www.city.saitama.lg.jp/001/006/002/043/002/p008923.html", "指定工事店と止水の応急対応を確認する"],
  ["locksmith", "tokyo", "警視庁", "https://www.keishicho.metro.tokyo.lg.jp/kurashi/higai/akisu/akisu.html", "補助錠・CP部品などの防犯対策を確認する"],
  ["locksmith", "osaka", "大阪府警察", "https://www.police.pref.osaka.lg.jp/seikatsu/8/16664.html", "ドア・窓・外回りの防犯診断を確認する"],
  ["locksmith", "yokohama", "神奈川県警察", "https://www.police.pref.kanagawa.jp/kurashi/anzen_machi/mesd0095.html", "施錠・CP部品・防犯カメラの対策を確認する"],
  ["locksmith", "saitama", "埼玉県警察", "https://www.police.pref.saitama.lg.jp/p0120/20250827taisaku.html", "施錠・補助錠・防犯フィルムの対策を確認する"],
  ["electrical", "tokyo", "エディオン", "https://service-info.edion.jp/service/construction/air_conditioner/", "エアコン工事の標準・追加条件を確認する"],
  ["electrical", "osaka", "エディオン", "https://service-info.edion.jp/service/construction/air_conditioner/", "エアコン工事の標準・追加条件を確認する"],
  ["electrical", "yokohama", "エディオン", "https://search.edion.com/e_store/station/spot/list?node=00000838&radius=5", "地域の相談窓口と対応条件を確認する"],
  ["electrical", "saitama", "経済産業省", "https://www.meti.go.jp/policy/safety_security/industrial_safety/sangyo/electric/detail/koji_2.html", "工事業者の登録等と施工条件を確認する"],
].map(([vertical, city, organization, url, purpose]) => ({ vertical, city, organization, url, purpose }));

const approvedHosts = [
  "kankyo.metro.tokyo.lg.jp", "waterworks.metro.tokyo.lg.jp", "keishicho.metro.tokyo.lg.jp",
  "city.osaka.lg.jp", "police.pref.osaka.lg.jp", "city.yokohama.lg.jp", "police.pref.kanagawa.jp",
  "city.saitama.lg.jp", "police.pref.saitama.lg.jp", "service-info.edion.jp", "search.edion.com", "meti.go.jp",
];

function cleanText(value) {
  return value.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

function extractMetadata(html) {
  const title = cleanText(html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] ?? "");
  const description = cleanText(html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)/i)?.[1] ?? "");
  const heading = cleanText(html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)?.[1] ?? "");
  return { title, description, heading };
}

function isApprovedSource(url) {
  const parsed = new URL(url);
  return parsed.protocol === "https:" && approvedHosts.includes(parsed.hostname);
}

async function inspectSource(source, timeoutMs) {
  if (!isApprovedSource(source.url)) return { ...source, status: "blocked", note: "許可されていないドメイン" };

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(source.url, {
      headers: { "user-agent": "MachiSelectDataReviewBot/1.0 (+https://machiselect.jp)" },
      signal: controller.signal,
    });
    const html = await response.text();
    const metadata = extractMetadata(html);
    const city = cityLabels[source.city];
    const hasCityReference = html.includes(city) || source.city === "tokyo";
    return {
      ...source,
      status: response.ok ? "review" : `HTTP ${response.status}`,
      note: response.ok ? (hasCityReference ? "地域表記を確認。公開前に内容を編集確認してください。" : "地域表記を自動検出できません。公開前に内容を編集確認してください。") : "ページ内容を確認できません。",
      ...metadata,
    };
  } catch (error) {
    return { ...source, status: "unavailable", note: error.name === "AbortError" ? "取得がタイムアウトしました。" : "取得に失敗しました。" };
  } finally {
    clearTimeout(timeout);
  }
}

function escapeCell(value = "") {
  return value.replace(/\|/g, "\\|").replace(/\r?\n/g, " ");
}

function renderReport(results) {
  const rows = results.map((result) => [
    result.vertical,
    cityLabels[result.city],
    `[${result.organization}](${result.url})`,
    result.status,
    escapeCell(result.heading || result.title || "タイトル未取得"),
    escapeCell(result.purpose),
    escapeCell(result.note),
  ].join(" | "));

  return `# 地域実データ・確認候補\n\n更新日: ${today}\n\nこのファイルは、許可済みの公式ドメインだけを取得して作る編集確認用の候補です。自動公開はしません。掲載する前に、地域への適用・料金・対応可否・更新日を編集者が確認してください。\n\n| ジャンル | 地域 | 公式情報 | 取得状態 | ページ見出し | 追加候補 | 編集確認 |\n| --- | --- | --- | --- | --- | --- | --- |\n${rows.join("\n")}\n\n## 公開前の確認\n\n- URL、組織名、地域との関係が正しいこと\n- 料金・対応範囲・受付時間などの変動値を推測していないこと\n- 既存の掲載情報を上書き・削除していないこと\n- 確認日と出典URLを地域ページへ記録すること\n`;
}

const options = new Set(process.argv.slice(2));
const checkOnly = options.has("--check");
const dryRun = options.has("--dry-run");
const timeoutMs = 12_000;
const results = await Promise.all(sourceCandidates.map((source) => inspectSource(source, timeoutMs)));
const report = renderReport(results);
const failures = results.filter((result) => result.status !== "review");

if (dryRun) {
  process.stdout.write(report);
} else if (!checkOnly) {
  await mkdir(path.dirname(defaultOutput), { recursive: true });
  await writeFile(defaultOutput, report, "utf8");
  process.stdout.write(`編集確認用の候補を ${path.relative(rootDirectory, defaultOutput)} に更新しました。\n`);
}

process.stdout.write(`公式ソース ${results.length}件を確認し、要確認 ${failures.length}件です。\n`);
if (checkOnly && failures.length > 0) process.exitCode = 1;
