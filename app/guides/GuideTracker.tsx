"use client";

import Link from "next/link";
import { useEffect } from "react";

function trackGuideEvent(slug: string, event: "guide_view" | "guide_cta") {
  void fetch("/api/events", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ event, vertical: `guide:${slug}`, city: "" }),
    keepalive: true,
  });
}

export function GuideViewTracker({ slug }: { slug: string }) {
  useEffect(() => { trackGuideEvent(slug, "guide_view"); }, [slug]);
  return null;
}

export function GuideCompareLink({ href, slug }: { href: string; slug: string }) {
  return <Link href={href} onClick={() => trackGuideEvent(slug, "guide_cta")}>比較ページを見る →</Link>;
}
