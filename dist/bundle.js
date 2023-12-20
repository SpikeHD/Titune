"use strict";(()=>{function g(){return new URLSearchParams(window.location.search).get("name")}function l(){return new URLSearchParams(window.location.search).get("id")}var u=["AUDIO_QUALITY_ULTRALOW","AUDIO_QUALITY_LOW","AUDIO_QUALITY_MEDIUM","AUDIO_QUALITY_HIGH"],P={invidiousInstance:"https://vid.puffyan.us/",shaders:!0,volume:50,preferredCodec:"mp4a",maxQuality:"AUDIO_QUALITY_HIGH"};function d(){let t=localStorage.getItem("options");return t?JSON.parse(t):P}function m(t,o){let e=d();e[t]=o,localStorage.setItem("options",JSON.stringify(e))}var I=[];async function L(t){if(I.length>0)return I;let o=d().invidiousInstance,e=o.endsWith("/")?o:o+"/",n=await fetch(`${e}api/v1/playlists/${t}`).then(s=>s.json());return I.push(...n.videos),n.videos}async function _(t){let o=d().invidiousInstance,e=o.endsWith("/")?o:o+"/";return(await fetch(`${e}api/v1/videos/${t}`).then(s=>s.json())).adaptiveFormats.filter(s=>s.type.startsWith("audio/"))}async function E(t){let o=await _(t),{preferredCodec:e}=d(),n=o.filter(i=>i.type.includes(e));return q(n)||n[0]||o[0]}function q(t){let{maxQuality:o}=d(),e=u.filter(s=>u.indexOf(s)<=u.indexOf(o)).sort((s,i)=>u.indexOf(s)-u.indexOf(i));return t.find(s=>e.some(i=>s.audioQuality.includes(i)))}async function S(t){let o=await L(t),e=Date.now()/1e3,n=o.reduce((i,r)=>i+r.lengthSeconds,0),s=Math.floor(e/n);return D(o,s)}function D(t,o){let e=[...t];for(let n=e.length-1;n>0;n--){let s=Math.floor((o+n)%(n+1)),i=e[n];e[n]=e[s],e[s]=i}return e}async function p(t){let o=await S(t),e=Date.now(),n=0;for(let c of o)n+=c.lengthSeconds;let s=Math.floor(e/1e3%n),i=0,r;for(let c of o)if(i+=c.lengthSeconds,s<i){r=c;break}let a=s-(i-r.lengthSeconds);return{song:r,elapsed:a}}async function C(t,o){let e=await S(t),n=await p(t),s=e.findIndex(i=>i.videoId===n.song?.videoId);return s+=o,s%=e.length,e[s]}async function y(t,o){let e=document.getElementById("radio-audio"),n=await E(t.videoId);e.src=n.url,e.currentTime=o,e.onloadeddata=()=>{e.play()};let s=await C(l(),1),i=await E(s.videoId);await V(i)}async function O(){let t=document.getElementById("radio-audio"),{volume:o}=d();t.volume=o/100}async function V(t){console.log("Caching next song: ",t.url);let o=document.createElement("audio");o.src=t.url,o.preload="metadata";let e=document.body.appendChild(o);e.onloadeddata=()=>{e.remove()}}document.addEventListener("DOMContentLoaded",()=>{let t=document.getElementById("add-open"),o=document.getElementById("add-close"),e=document.getElementById("options-close"),n=document.getElementById("list-close"),s=document.getElementById("list-submit");t.addEventListener("click",()=>{let i=document.getElementById("playlist-input"),r=document.getElementById("radio-name-input"),a=i.value;if(!a)return;let h=new URL(a).searchParams.get("list")??a;window.location.search=`?id=${h}&name=${r.value}`}),o.addEventListener("click",()=>{w("add-dialog")}),e.addEventListener("click",()=>{w("options-dialog")}),n.addEventListener("click",()=>{w("list-dialog")}),s.addEventListener("click",()=>{open("https://github.com/SpikeHD/Titune/issues/new?assignees=&labels=submission&projects=&template=submission.md&title=%5BSUBMISSION%5D","_blank")})});function b(t){document.getElementById(t).showModal()}function w(t){document.getElementById(t).close()}function M(){let t=document.getElementById("add-icon"),o=document.getElementById("options-icon"),e=document.getElementById("list-icon");t.addEventListener("click",()=>{b("add-dialog")}),o.addEventListener("click",()=>{b("options-dialog")}),e.addEventListener("click",()=>{b("list-dialog")});let n=document.querySelectorAll(".option-row input"),s=document.querySelectorAll(".option-row select");n.forEach(i=>{let r=i.dataset.option;i.value=d()[r],i.onchange=()=>{m(r,i.value)}}),s.forEach(i=>{let r=i.dataset.option;i.value=d()[r],i.onchange=()=>{m(r,i.value)}})}async function U(){let o=await(await fetch("/station_list.json")).json();Object.entries(o).forEach(([e,n])=>{let s=document.createElement("a");s.classList.add("submission-row"),s.href=`?id=${n.playlist_id}&name=${e}`,s.target="_blank";let i=document.createElement("div");i.classList.add("submission-cell"),i.textContent=e;let r=document.createElement("div");r.classList.add("submission-cell"),r.textContent=n.submitted_by,s.appendChild(i),s.appendChild(r),document.querySelector(".submission-body").appendChild(s)})}function f(t){let o=document.getElementById("radio-audio"),e=document.querySelector("#volume-bar"),n=e.querySelectorAll(".volume-bar-line"),s=document.querySelector("#volume-number");t<0&&(t=0),t>100&&(t=100),t>0?e.classList.remove("muted"):e.classList.add("muted"),o.volume=t/100;let i=Math.round(t/(100/n.length))*(100/n.length);n.forEach(r=>r.classList.remove("active"));for(let r=0;r<i/(100/n.length);r++)n[r].classList.add("active");s.textContent=`${t}%`,m("volume",t)}function k(){if(!document.getElementById("radio-audio").paused)return;let o=async()=>{let{song:e,elapsed:n}=await p(l());y(e,n),document.removeEventListener("click",o)};document.addEventListener("click",o)}document.addEventListener("DOMContentLoaded",()=>{let t=document.querySelector("#volume-bar");t.addEventListener("click",n=>{let i=Math.floor(n.offsetX/t.clientWidth*100);f(i)}),t.addEventListener("mousedown",n=>{let i=Math.floor(n.offsetX/t.clientWidth*100);f(i),document.addEventListener("mousemove",o),document.addEventListener("mouseup",e)});let o=n=>{let s=n;if(s.target!==t)return;let i=Math.floor(s.offsetX/t.clientWidth*100);f(i)},e=()=>{document.removeEventListener("mousemove",o),document.removeEventListener("mouseup",e)}});function T(){let t=document.querySelector("#volume"),o=()=>{t.classList.remove("hide")},e=()=>{t.classList.add("hide")};e(),t.addEventListener("mouseenter",o),t.addEventListener("mouseleave",e)}var R=new URLSearchParams(window.location.search).get("obs")==="true";if(l()&&g()){let t=g(),o=document.querySelectorAll('meta[name*="title"]'),e=document.querySelectorAll('meta[name*="description"]');for(let n of o)n.setAttribute("content","Titune");for(let n of e)n.setAttribute("content",`Listen along to "${t}" Radio`)}document.addEventListener("DOMContentLoaded",async()=>{R&&(document.documentElement.classList.add("transparent"),T()),M();let t=document.getElementById("currently-playing"),o=document.getElementById("time-elapsed"),e=document.getElementById("duration"),n=document.getElementById("cover"),s=l(),i="",r=g();if(document.title=r?`Titune | ${r}`:"Titune",O(),f(0),k(),U(),!s){t.textContent="Create a radio from the top left!";return}await L(s),setInterval(async()=>{let{song:a,elapsed:c}=await p(s);if(!i.includes(a?.title??"Unknown")&&a){let v=(a.videoThumbnails.length>0&&Array.isArray(a.videoThumbnails[0])?a.videoThumbnails[0]:a.videoThumbnails).reduce((B,A)=>A.width>B.width?A:B).url;n.setAttribute("src",v);let $=document.getElementById("bg-cover");$.style.backgroundImage=`url(${v})`,document.getElementById("favicon").setAttribute("href",v),y(a,c)}if(`${a?.title??"Unknown"}${c}`===i)return;t.textContent=a?.title??"Unknown",o.textContent=`${Math.floor(c/60)}:${Math.floor(c%60).toString().padStart(2,"0")}`,e.textContent=`${Math.floor((a?.lengthSeconds??0)/60)}:${Math.floor((a?.lengthSeconds??0)%60).toString().padStart(2,"0")}`;let x=document.getElementById("progress-bar-fill"),h=c/(a?.lengthSeconds??1)*100;x.style.width=`${h}%`,i=`${a?.title??"Unknown"}${c}`},200)});})();
//# sourceMappingURL=bundle.js.map
