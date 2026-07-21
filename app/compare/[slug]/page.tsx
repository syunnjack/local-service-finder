import{notFound}from"next/navigation";import{getVertical,verticals}from"../../lib/verticals";import VerticalPage from"./vertical-page";
export function generateStaticParams(){return verticals.map(v=>({slug:v.slug}))}
export default async function Page({params}:{params:Promise<{slug:string}>}){const{slug}=await params;const vertical=getVertical(slug);if(!vertical)notFound();return <VerticalPage vertical={vertical}/>}
