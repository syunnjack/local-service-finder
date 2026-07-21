import type{Metadata}from"next";import{notFound}from"next/navigation";import{getVertical,verticals}from"../../lib/verticals";import VerticalPage from"./vertical-page";
export function generateStaticParams(){return verticals.map(v=>({slug:v.slug}))}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{const{slug}=await params,v=getVertical(slug);if(!v)return{};return{title:`${v.name}を市町村別に比較｜まちセレクト`,description:`${v.name}の料金・口コミ・${v.points.join("・")}を地域別に比較します。`,alternates:{canonical:`https://${v.domain}`}}}
export default async function Page({params}:{params:Promise<{slug:string}>}){const{slug}=await params,vertical=getVertical(slug);if(!vertical)notFound();return <VerticalPage vertical={vertical}/>}
