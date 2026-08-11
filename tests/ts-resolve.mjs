/**
 * アプリ側は拡張子なしで import する書き方（バンドラ前提）なので、
 * Node の --test からそのまま読めるように .ts を補って解決する。
 */
export async function resolve(specifier, context, next) {
  if (specifier.startsWith(".") && !/\.[a-z]+$/i.test(specifier)) {
    try {
      return await next(`${specifier}.ts`, context)
    } catch {
      // .ts が無ければ元の指定でそのまま解決させる
    }
  }
  return next(specifier, context)
}

/**
 * アプリ側は JSON を属性なしで import している（バンドラがそれを許すため）。
 * Node は属性を要求するので、ここで補う。
 */
export async function load(url, context, next) {
  if (url.endsWith(".json")) {
    return next(url, { ...context, importAttributes: { type: "json" } })
  }
  return next(url, context)
}
