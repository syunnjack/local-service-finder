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
  sapporo: "札幌市",
  sendai: "仙台市",
  chiba: "千葉市",
  kawasaki: "川崎市",
  nagoya: "名古屋市",
  kyoto: "京都市",
  kobe: "神戸市",
  hiroshima: "広島市",
  fukuoka: "福岡市",
};

const verticalLabels = {
  "house-cleaning": "ハウスクリーニング",
  moving: "引越し",
  housekeeping: "家事代行",
  "garden-care": "庭木剪定・草刈り",
  "pest-control": "害虫・害獣駆除",
  locksmith: "鍵交換・鍵開け",
  plumbing: "水道修理・水漏れ",
  electrical: "電気工事・エアコン設置",
  handyman: "便利屋・生活サポート",
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
  ["garden-care", "tokyo", "東京都シルバー人材センター連合", "https://www.tokyosilver.jp/", "庭木剪定・草刈りの地域窓口と依頼条件を確認する"],
  ["garden-care", "osaka", "大阪府シルバー人材センター協議会", "https://www.osakasc.or.jp/work.php", "剪定・除草等の作業案内と地域窓口を確認する"],
  ["garden-care", "yokohama", "横浜市シルバー人材センター", "https://webc.sjc.ne.jp/yokohama/index", "庭木・屋外作業の相談窓口と対応条件を確認する"],
  ["garden-care", "saitama", "さいたま市シルバー人材センター", "https://saitama-sjc.or.jp/simin/kojintaku.html", "個人宅向け作業と剪定・除草の依頼条件を確認する"],
  ["pest-control", "tokyo", "ダスキン", "https://www.duskin.jp/store/tokyo/", "害虫・害獣駆除の都内店舗と対応条件を確認する"],
  ["pest-control", "osaka", "ダスキン", "https://www.duskin.jp/store/osaka/", "害虫・害獣駆除の大阪府内店舗と対応条件を確認する"],
  ["pest-control", "yokohama", "ダスキン", "https://www.duskin.jp/store/kanagawa/", "害虫・害獣駆除の神奈川県内店舗と対応条件を確認する"],
  ["pest-control", "saitama", "ダスキン", "https://www.duskin.jp/store/saitama/", "害虫・害獣駆除の埼玉県内店舗と対応条件を確認する"],
  ["handyman", "tokyo", "ベンリー", "https://www.benry.com/benrytown-top-result/all/", "地域の便利屋サービスと最終的な対応可否を確認する"],
  ["handyman", "osaka", "ベンリー", "https://www.benry.com/fc-introduction/", "近隣店舗の便利屋サービスと対応条件を確認する"],
  ["handyman", "yokohama", "ベンリー妙蓮寺店", "https://myourenji.benry.com/", "横浜市周辺の生活支援・軽作業サービスを確認する"],
  ["handyman", "saitama", "株式会社ベンリー", "https://inc-benry.jp/service/", "さいたま市を含む生活支援・軽修繕サービスを確認する"],
  ["housekeeping", "tokyo", "ベアーズ", "https://www.happy-bears.com/kaji/tokyo/", "東京都の家事代行対応地域とサービス条件を確認する"],
  ["housekeeping", "osaka", "ベアーズ", "https://www.happy-bears.com/kaji/oosaka/oosaka/", "大阪市の家事代行対応地域とサービス条件を確認する"],
  ["housekeeping", "yokohama", "ベアーズ", "https://www.happy-bears.com/kaji/kanagawa/yokohama/", "横浜市の家事代行対応地域とサービス条件を確認する"],
  ["housekeeping", "saitama", "ベアーズ", "https://www.happy-bears.com/kaji/saitama/saitama/", "さいたま市の家事代行対応地域とサービス条件を確認する"],
  ["moving", "sapporo", "札幌市", "https://www.city.sapporo.jp/seiso/gomi/oogatagomi.html", "大型ごみの申込み方法、収集日、対象外品目を確認する"],
  ["plumbing", "sapporo", "札幌市水道局", "https://www.city.sapporo.jp/suido/riyosya/trouble/koji/syuzen/index.html", "漏水・凍結修理に対応する指定給水装置工事事業者名簿を確認する"],
  ["locksmith", "sapporo", "札幌市", "https://www.city.sapporo.jp/shimin/chiiki-bohan/mijikanahanzai/index.html", "侵入窃盗対策と施錠・防犯の注意点を確認する"],
  ["garden-care", "sapporo", "札幌市シルバー人材センター", "https://www.s-silver.jp/silver.php", "植木の手入れを含む依頼可能な仕事の案内を確認する"],
  ["moving", "sendai", "仙台市", "https://www.city.sendai.jp/haiki-kanri/kurashi/machi/genryo/gomi/wakekata/sodaigomi.html", "粗大ごみの申込み方法、収集日、無許可回収業者への注意を確認する"],
  ["plumbing", "sendai", "仙台市水道局", "https://www.suidou.city.sendai.jp/soshiki/kyusui-kyusuisochi/kyusuisochi/3/304.html", "指定給水装置工事事業者と修繕登録店、複数見積もりの案内を確認する"],
  ["locksmith", "sendai", "仙台市", "https://www.city.sendai.jp/shiminsekatsu/kurashi/anzen/anzen/bohan/point.html", "住まいの防犯を含む地域防犯の注意点を確認する"],
  ["garden-care", "sendai", "仙台市シルバー人材センター", "https://webc.sjc.ne.jp/sendaisc/activity_5", "植木剪定・除草に関する技能講習と依頼先情報を確認する"],
  ["moving", "chiba", "千葉市", "https://www.city.chiba.jp/kurashi/gomi/gomi/index.html", "粗大ごみ等の処分方法と許可業者に関する案内を確認する"],
  ["plumbing", "chiba", "千葉市水道局", "https://www.city.chiba.jp/suido/jigyo/koshorosui.html", "給水区域別の漏水対応と指定給水装置工事事業者を確認する"],
  ["locksmith", "chiba", "千葉県警察", "https://www.police.pref.chiba.jp/seisoka/safe-life_publicspace-home_theft_03.html", "侵入盗を防ぐ施錠・補助錠等の防犯対策を確認する"],
  ["garden-care", "chiba", "千葉市シルバー人材センター", "https://chiba-sjc.com/request-service/", "植木剪定・除草の依頼条件を確認する"],
  ["moving", "kawasaki", "川崎市", "https://www.city.kawasaki.jp/kurashi/category/261-1-10-11-0-0-0-0-0-0.html", "粗大ごみの申込みと市で収集しない品目を確認する"],
  ["plumbing", "kawasaki", "川崎市上下水道局", "https://www.city.kawasaki.jp/templates/faq/800/0000125460.html", "漏水時の指定給水装置工事事業者への依頼方法を確認する"],
  ["locksmith", "kawasaki", "川崎警察署", "https://www.police.pref.kanagawa.jp/ps/kawasaki/entry_8.html", "施錠・防犯フィルム等の住まいの防犯対策を確認する"],
  ["garden-care", "kawasaki", "川崎市シルバー人材センター", "https://www.kawasaki-sc.or.jp/order/06.html", "植木剪定・除草・草刈りの依頼条件を確認する"],
  ["moving", "nagoya", "名古屋市", "https://www.city.nagoya.jp/kurashi/gomi/1012183/1035058/1012184/1046468/index.html", "粗大ごみの申込み方法を確認する"],
  ["plumbing", "nagoya", "名古屋市上下水道局", "https://www.water.city.nagoya.jp/category/11001kyuusuisetsubi/12049.html", "水漏れ修理と市指定水道工事業者を確認する"],
  ["locksmith", "nagoya", "名古屋市", "https://www.city.nagoya.jp/bousai/anzen/1014448/1014449/1014464.html", "住宅対象侵入盗の防犯対策を確認する"],
  ["garden-care", "nagoya", "名古屋市シルバー人材センター", "https://www.sjc.ne.jp/nagoyasj/", "植木手入れ・除草の依頼案内を確認する"],
  ["moving", "kyoto", "京都市", "https://www.city.kyoto.lg.jp/kankyo/page/0000001317.html", "大型ごみの申込み方法を確認する"],
  ["plumbing", "kyoto", "京都市上下水道局", "https://www.city.kyoto.lg.jp/suido/page/0000136992.html", "水道・下水道トラブルと指定事業者を確認する"],
  ["locksmith", "kyoto", "京都府警察", "https://www.pref.kyoto.jp/fukei/anzen/seiki_t/bohan/sinnyu-bousi.html", "侵入強盗・侵入窃盗の防犯対策を確認する"],
  ["garden-care", "kyoto", "京都市", "https://www.city.kyoto.lg.jp/hokenfukushi/page/0000336086.html", "シルバー人材センターの庭木剪定・除草を確認する"],
].map(([vertical, city, organization, url, purpose]) => ({ vertical, city, organization, url, purpose }));

const approvedHosts = [
  "kankyo.metro.tokyo.lg.jp", "waterworks.metro.tokyo.lg.jp", "keishicho.metro.tokyo.lg.jp",
  "city.osaka.lg.jp", "police.pref.osaka.lg.jp", "city.yokohama.lg.jp", "police.pref.kanagawa.jp",
  "city.saitama.lg.jp", "police.pref.saitama.lg.jp", "service-info.edion.jp", "search.edion.com", "meti.go.jp",
  "tokyosilver.jp", "osakasc.or.jp", "webc.sjc.ne.jp", "saitama-sjc.or.jp", "duskin.jp",
  "benry.com", "myourenji.benry.com", "inc-benry.jp", "happy-bears.com",
  "city.sapporo.jp", "s-silver.jp",
  "city.sendai.jp", "suidou.city.sendai.jp",
  "city.chiba.jp", "police.pref.chiba.jp", "chiba-sjc.com",
  "city.kawasaki.jp", "kawasaki-sc.or.jp",
  "city.nagoya.jp", "water.city.nagoya.jp", "sjc.ne.jp",
  "city.kyoto.lg.jp", "pref.kyoto.jp",
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
  const hostname = parsed.hostname.replace(/^www\./, "");
  return parsed.protocol === "https:" && approvedHosts.includes(hostname);
}

async function inspectSource(source, timeoutMs) {
  if (!isApprovedSource(source.url)) return { ...source, status: "blocked", note: "許可されていないドメイン" };

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(source.url, {
      headers: {
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0 Safari/537.36",
        accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "accept-language": "ja-JP,ja;q=0.9,en-US;q=0.8,en;q=0.7",
      },
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
  const rows = results.map((result) => `| ${[
    result.vertical,
    cityLabels[result.city],
    `[${result.organization}](${result.url})`,
    result.status,
    escapeCell(result.heading || result.title || "タイトル未取得"),
    escapeCell(result.purpose),
    escapeCell(result.note),
  ].join(" | ")} |`);

  const registered = new Set(sourceCandidates.map((source) => `${source.vertical}:${source.city}`));
  const coverageRows = Object.entries(cityLabels).flatMap(([city, cityLabel]) => Object.entries(verticalLabels).map(([vertical, verticalLabel]) => {
    const status = registered.has(`${vertical}:${city}`) ? "公式ソース確認対象に登録済み" : "公式ソース探索待ち（未公開）";
    return `| ${verticalLabel} | ${cityLabel} | ${status} |`;
  }));

  return `# 地域実データ・確認候補\n\n更新日: ${today}\n\nこのファイルは、許可済みの公式ドメインだけを取得して作る編集確認用の候補です。自動公開はしません。掲載する前に、地域への適用・料金・対応可否・更新日を編集者が確認してください。\n\n| ジャンル | 地域 | 公式情報 | 取得状態 | ページ見出し | 追加候補 | 編集確認 |\n| --- | --- | --- | --- | --- | --- | --- |\n${rows.join("\n")}\n\n## 全国主要都市・全ジャンルの確認台帳\n\n主要13都市×全9ジャンルを確認対象にしています。「公式ソース探索待ち」は公開ページへ自動反映されません。\n\n| ジャンル | 地域 | 状態 |\n| --- | --- | --- |\n${coverageRows.join("\n")}\n\n## 公開前の確認\n\n- URL、組織名、地域との関係が正しいこと\n- 料金・対応範囲・受付時間などの変動値を推測していないこと\n- 既存の掲載情報を上書き・削除していないこと\n- 確認日と出典URLを地域ページへ記録すること\n`;
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
