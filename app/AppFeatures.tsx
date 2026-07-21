"use client";
import Link from"next/link";
import{useEffect,useState}from"react";
type InstallPrompt=Event&{prompt:()=>Promise<void>;userChoice:Promise<{outcome:string}>};
export default function AppFeatures(){
 const[prompt,setPrompt]=useState<InstallPrompt|null>(null),[favorite,setFavorite]=useState(false);
 useEffect(()=>{if("serviceWorker"in navigator)navigator.serviceWorker.register("/sw.js");const timer=setTimeout(()=>{const saved=JSON.parse(localStorage.getItem("machi-select.favorites")||"[]")as string[];setFavorite(saved.includes(location.pathname))},0);const handler=(event:Event)=>{event.preventDefault();setPrompt(event as InstallPrompt)};window.addEventListener("beforeinstallprompt",handler);return()=>{clearTimeout(timer);window.removeEventListener("beforeinstallprompt",handler)}},[]);
 function toggle(){const path=location.pathname,current=JSON.parse(localStorage.getItem("machi-select.favorites")||"[]")as string[],next=current.includes(path)?current.filter(x=>x!==path):[...current,path];localStorage.setItem("machi-select.favorites",JSON.stringify(next));setFavorite(next.includes(path))}
 return <div className="app-dock" aria-label="アプリ機能"><Link href="/">⌂<span>ホーム</span></Link><button onClick={toggle} aria-pressed={favorite}>{favorite?"★":"☆"}<span>お気に入り</span></button><a href="#request">♢<span>通知</span></a>{prompt&&<button onClick={async()=>{await prompt.prompt();await prompt.userChoice;setPrompt(null)}}>＋<span>アプリ追加</span></button>}</div>
}
