export const relatedServices: Record<string, { slug: string; label: string; reason: string }[]> = {
  "house-cleaning": [{ slug: "housekeeping", label: "家事代行", reason: "日常的な掃除や料理を頼みたい場合" }, { slug: "plumbing", label: "水回り修理", reason: "水漏れ・つまりの修理が必要な場合" }, { slug: "electrical", label: "電気工事", reason: "エアコン設置や電気設備の相談が必要な場合" }],
  moving: [{ slug: "house-cleaning", label: "ハウスクリーニング", reason: "入退去時の清掃を検討する場合" }, { slug: "housekeeping", label: "家事代行", reason: "引越し後の生活支援を探す場合" }, { slug: "garden-care", label: "庭木剪定", reason: "戸建ての外回りを整える場合" }],
  housekeeping: [{ slug: "house-cleaning", label: "ハウスクリーニング", reason: "専門清掃が必要な汚れがある場合" }, { slug: "garden-care", label: "庭木剪定", reason: "屋外の手入れも依頼したい場合" }, { slug: "plumbing", label: "水回り修理", reason: "設備の不具合を解消したい場合" }],
  "garden-care": [{ slug: "pest-control", label: "害虫・害獣駆除", reason: "庭まわりの害虫・害獣対策が必要な場合" }, { slug: "house-cleaning", label: "ハウスクリーニング", reason: "室内もまとめて整えたい場合" }, { slug: "moving", label: "引越し", reason: "住み替えに伴う外回り整理の場合" }],
  "pest-control": [{ slug: "garden-care", label: "庭木剪定", reason: "庭・外周の環境を整えたい場合" }, { slug: "plumbing", label: "水回り修理", reason: "排水まわりの相談が必要な場合" }, { slug: "house-cleaning", label: "ハウスクリーニング", reason: "施工後の室内清掃を検討する場合" }],
  locksmith: [{ slug: "electrical", label: "電気工事", reason: "防犯設備・電気設備の相談が必要な場合" }, { slug: "plumbing", label: "水回り修理", reason: "住まいの緊急トラブルをまとめて確認する場合" }, { slug: "house-cleaning", label: "ハウスクリーニング", reason: "入退去時に室内清掃も必要な場合" }],
  plumbing: [{ slug: "house-cleaning", label: "ハウスクリーニング", reason: "修理後の水回り清掃を検討する場合" }, { slug: "pest-control", label: "害虫・害獣駆除", reason: "水回りの害虫対策が必要な場合" }, { slug: "electrical", label: "電気工事", reason: "住宅設備をあわせて確認する場合" }],
  electrical: [{ slug: "house-cleaning", label: "ハウスクリーニング", reason: "エアコン清掃も検討する場合" }, { slug: "locksmith", label: "鍵・防犯", reason: "住まいの防犯を整えたい場合" }, { slug: "plumbing", label: "水回り修理", reason: "住宅設備をあわせて確認する場合" }],
  handyman: [{ slug: "garden-care", label: "庭木剪定・草刈り", reason: "屋外の軽作業を依頼したい場合" }, { slug: "house-cleaning", label: "ハウスクリーニング", reason: "専門清掃が必要な場合" }, { slug: "moving", label: "引っ越し", reason: "運搬量が多い場合" }],
};
