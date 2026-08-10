/**
 * 5つの Sites 用ブランチを、1つの基準ブランチから同期する。
 *
 * なぜ必要か:
 *   codex/sites-group-2 〜 6 は同じアプリを別々の Sites プロジェクトへ配信するための
 *   ブランチで、実際の差分は .openai/hosting.json の project_id 1行だけ。
 *   それにも関わらず、変更のたびに5本へ手作業で cherry-pick していた。
 *   1本でも取りこぼすとサイトごとに挙動が変わり、原因の特定が難しくなる。
 *
 * このスクリプトがすること:
 *   各ブランチの作業コピーを基準ブランチの内容で上書きし、
 *   .openai/hosting.json だけはそのブランチのものを残す。
 *   結果として「差分は project_id のみ」が常に保たれる。
 *
 * 使い方:
 *   node scripts/sync-site-branches.mjs [--source codex/sites-group-2] [--push]
 *   --push を付けなければローカルにコミットするだけで、内容を確認してから押せる。
 */
import { execFile } from "node:child_process"
import { promisify } from "node:util"
import { readdir, readFile } from "node:fs/promises"
import { dirname, join, resolve } from "node:path"
import { fileURLToPath } from "node:url"

const run = promisify(execFile)
const here = dirname(fileURLToPath(import.meta.url))
// 各ブランチは .workspaces/local-service-group-N として並んでいる
const workspacesRoot = resolve(here, "../..")

const args = process.argv.slice(2)
const sourceBranch = args.includes("--source") ? args[args.indexOf("--source") + 1] : "codex/sites-group-2"
const shouldPush = args.includes("--push")

/** hosting.json はブランチごとに違うので同期対象から外す */
const KEEP_PER_BRANCH = [".openai/hosting.json"]

async function git(cwd, ...gitArgs) {
  const { stdout } = await run("git", gitArgs, { cwd, maxBuffer: 32 * 1024 * 1024 })
  return stdout.trim()
}

const entries = await readdir(workspacesRoot, { withFileTypes: true })
const targets = []
for (const entry of entries) {
  if (!entry.isDirectory() || !/^local-service-group-\d+$/.test(entry.name)) continue
  const cwd = join(workspacesRoot, entry.name)
  let branch
  try {
    branch = await git(cwd, "branch", "--show-current")
  } catch {
    continue
  }
  if (!branch || branch === sourceBranch) continue
  targets.push({ name: entry.name, cwd, branch })
}

console.log(`基準: ${sourceBranch}`)
console.log(`対象: ${targets.map((t) => t.branch).join(", ") || "(なし)"}\n`)

let changed = 0
for (const target of targets) {
  try {
    const status = await git(target.cwd, "status", "--porcelain")
    if (status) {
      console.log(`${target.name}: 未コミットの変更があるため飛ばす`)
      continue
    }

    await git(target.cwd, "fetch", "origin", sourceBranch)

    // 基準ブランチの内容で上書きし、hosting.json だけ元に戻す
    await git(target.cwd, "checkout", "FETCH_HEAD", "--", ".")
    for (const path of KEEP_PER_BRANCH) {
      await git(target.cwd, "checkout", "HEAD", "--", path)
    }

    const diff = await git(target.cwd, "status", "--porcelain")
    if (!diff) {
      console.log(`${target.name}: 同期済み`)
      continue
    }

    const projectId = JSON.parse(await readFile(join(target.cwd, ".openai/hosting.json"), "utf8")).project_id
    await git(target.cwd, "commit", "-am", `Sync from ${sourceBranch}\n\nproject_id (${projectId}) はこのブランチのものを保持している。`)
    changed++
    console.log(`${target.name}: 同期してコミット`)

    if (shouldPush) {
      await git(target.cwd, "push", "origin", target.branch)
      console.log(`${target.name}: push 済み`)
    }
  } catch (error) {
    console.log(`${target.name}: 失敗 ${String(error.message).split("\n")[0].slice(0, 80)}`)
  }
}

console.log(`\n${changed} ブランチを更新した${shouldPush ? "（push 済み）" : "（push はしていない）"}`)
if (!shouldPush && changed) console.log("内容を確認したら --push を付けて再実行する")
