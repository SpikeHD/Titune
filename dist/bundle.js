"use strict";(()=>{function g(){return new URLSearchParams(window.location.search).get("name")}function l(){return new URLSearchParams(window.location.search).get("id")}var u=["AUDIO_QUALITY_ULTRALOW","AUDIO_QUALITY_LOW","AUDIO_QUALITY_MEDIUM","AUDIO_QUALITY_HIGH"],k={invidiousInstance:"https://vid.puffyan.us/",shaders:!0,volume:50,preferredCodec:"mp4a",maxQuality:"AUDIO_QUALITY_HIGH"};function d(){let t=localStorage.getItem("options");return t?JSON.parse(t):k}function m(t,o){let e=d();e[t]=o,localStorage.setItem("options",JSON.stringify(e))}var h=[];async function I(t){if(h.length>0)return h;let o=d().invidiousInstance,e=o.endsWith("/")?o:o+"/",s=await fetch(`${e}api/v1/playlists/${t}`).then(n=>n.json());return h.push(...s.videos),s.videos}async function P(t){let o=d().invidiousInstance,e=o.endsWith("/")?o:o+"/";return(await fetch(`${e}api/v1/videos/${t}`).then(n=>n.json())).adaptiveFormats.filter(n=>n.type.startsWith("audio/"))}async function L(t){let o=await P(t),{preferredCodec:e}=d(),s=o.filter(i=>i.type.includes(e));return q(s)||s[0]||o[0]}function q(t){let{maxQuality:o}=d(),e=u.filter(n=>u.indexOf(n)<=u.indexOf(o)).sort((n,i)=>u.indexOf(n)-u.indexOf(i));return t.find(n=>e.some(i=>n.audioQuality.includes(i)))}async function E(t){let o=await I(t),e=Date.now()/1e3,s=o.reduce((i,a)=>i+a.lengthSeconds,0),n=Math.floor(e/s);return D(o,n)}function D(t,o){let e=[...t];for(let s=e.length-1;s>0;s--){let n=Math.floor((o+s)%(s+1)),i=e[s];e[s]=e[n],e[n]=i}return e}async function f(t){let o=await E(t),e=Date.now(),s=0;for(let c of o)s+=c.lengthSeconds;let n=Math.floor(e/1e3%s),i=0,a;for(let c of o)if(i+=c.lengthSeconds,n<i){a=c;break}let r=n-(i-a.lengthSeconds);return{song:a,elapsed:r}}async function x(t,o){let e=await E(t),s=await f(t),n=e.findIndex(i=>i.videoId===s.song?.videoId);return n+=o,n%=e.length,e[n]}async function v(t,o){let e=document.getElementById("radio-audio"),s=await L(t.videoId);e.src=s.url,e.currentTime=o,e.onloadeddata=()=>{e.play()};let n=await x(l(),1),i=await L(n.videoId);await V(i)}async function A(){let t=document.getElementById("radio-audio"),{volume:o}=d();t.volume=o/100}async function V(t){console.log("Caching next song: ",t.url);let o=document.createElement("audio");o.src=t.url,o.preload="metadata";let e=document.body.appendChild(o);e.onloadeddata=()=>{e.remove()}}document.addEventListener("DOMContentLoaded",()=>{let t=document.getElementById("add-open"),o=document.getElementById("add-close"),e=document.getElementById("options-close");t.addEventListener("click",()=>{let s=document.getElementById("playlist-input"),n=document.getElementById("radio-name-input"),i=s.value;if(!i)return;let c=new URL(i).searchParams.get("list")??i;window.location.search=`?id=${c}&name=${n.value}`}),o.addEventListener("click",()=>{O("add-dialog")}),e.addEventListener("click",()=>{O("options-dialog")})});function B(t){document.getElementById(t).showModal()}function O(t){document.getElementById(t).close()}function b(){let t=document.getElementById("add-icon"),o=document.getElementById("options-icon");t.addEventListener("click",()=>{B("add-dialog")}),o.addEventListener("click",()=>{B("options-dialog")});let e=document.querySelectorAll(".option-row input"),s=document.querySelectorAll(".option-row select");e.forEach(n=>{let i=n.dataset.option;n.value=d()[i],n.onchange=()=>{m(i,n.value)}}),s.forEach(n=>{let i=n.dataset.option;n.value=d()[i],n.onchange=()=>{m(i,n.value)}})}function p(t){let o=document.getElementById("radio-audio"),e=document.querySelector("#volume-bar"),s=e.querySelectorAll(".volume-bar-line"),n=document.querySelector("#volume-number");t<0&&(t=0),t>100&&(t=100),t>0?e.classList.remove("muted"):e.classList.add("muted"),o.volume=t/100;let i=Math.round(t/(100/s.length))*(100/s.length);s.forEach(a=>a.classList.remove("active"));for(let a=0;a<i/(100/s.length);a++)s[a].classList.add("active");n.textContent=`${t}%`,m("volume",t)}function C(){if(!document.getElementById("radio-audio").paused)return;let o=async()=>{let{song:e,elapsed:s}=await f(l());v(e,s),document.removeEventListener("click",o)};document.addEventListener("click",o)}document.addEventListener("DOMContentLoaded",()=>{let t=document.querySelector("#volume-bar");t.addEventListener("click",s=>{let i=Math.floor(s.offsetX/t.clientWidth*100);p(i)}),t.addEventListener("mousedown",s=>{let i=Math.floor(s.offsetX/t.clientWidth*100);p(i),document.addEventListener("mousemove",o),document.addEventListener("mouseup",e)});let o=s=>{let n=s;if(n.target!==t)return;let i=Math.floor(n.offsetX/t.clientWidth*100);p(i)},e=()=>{document.removeEventListener("mousemove",o),document.removeEventListener("mouseup",e)}});function M(){let t=document.querySelector("#volume"),o=()=>{t.classList.remove("hide")},e=()=>{t.classList.add("hide")};e(),t.addEventListener("mouseenter",o),t.addEventListener("mouseleave",e)}var _=new URLSearchParams(window.location.search).get("obs")==="true";if(l()&&g()){let t=g(),o=document.querySelectorAll('meta[name*="title"]'),e=document.querySelectorAll('meta[name*="description"]');for(let s of o)s.setAttribute("content","Titune");for(let s of e)s.setAttribute("content",`Listen along to "${t}" Radio`)}document.addEventListener("DOMContentLoaded",async()=>{_&&(document.documentElement.classList.add("transparent"),M()),b();let t=document.getElementById("currently-playing"),o=document.getElementById("time-elapsed"),e=document.getElementById("duration"),s=document.getElementById("cover"),n=l(),i="",a=g();if(document.title=a?`Titune | ${a}`:"Titune",A(),p(0),C(),!n){t.textContent="Create a radio from the top left!";return}await I(n),setInterval(async()=>{let{song:r,elapsed:c}=await f(n);if(!i.includes(r?.title??"Unknown")&&r){let y=(r.videoThumbnails.length>0&&Array.isArray(r.videoThumbnails[0])?r.videoThumbnails[0]:r.videoThumbnails).reduce((w,S)=>S.width>w.width?S:w).url;s.setAttribute("src",y);let $=document.getElementById("bg-cover");$.style.backgroundImage=`url(${y})`,document.getElementById("favicon").setAttribute("href",y),v(r,c)}if(`${r?.title??"Unknown"}${c}`===i)return;t.textContent=r?.title??"Unknown",o.textContent=`${Math.floor(c/60)}:${Math.floor(c%60).toString().padStart(2,"0")}`,e.textContent=`${Math.floor((r?.lengthSeconds??0)/60)}:${Math.floor((r?.lengthSeconds??0)%60).toString().padStart(2,"0")}`;let U=document.getElementById("progress-bar-fill"),T=c/(r?.lengthSeconds??1)*100;U.style.width=`${T}%`,i=`${r?.title??"Unknown"}${c}`},200)});})();
//# sourceMappingURL=bundle.js.map
