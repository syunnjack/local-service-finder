import type{Metadata}from"next";import"./globals.css";import AppFeatures from"./AppFeatures";
export const metadata:Metadata={title:"まちセレクト｜市町村別サービス比較",description:"地域の美容・生活・教育・仕事・住居サービスを、料金だけでなく条件や口コミまで比較。"};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="ja"><body>{children}<AppFeatures/></body></html>}
