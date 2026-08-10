import { headers } from "next/headers"
import { canonicalOrigin, normalizeHost, verticalForHost } from "./routes"

/**
 * 配信中のホストを読む部分。
 * 判定そのものは routes.ts に置いてあり、ここはリクエストから取り出すだけ。
 */

export async function currentHost() {
  return normalizeHost((await headers()).get("host"))
}

export async function currentVertical() {
  return verticalForHost(await currentHost())
}

export async function currentOrigin() {
  return canonicalOrigin(await currentHost())
}
