"use strict";(()=>{function p(){return new URLSearchParams(window.location.search).get("name")}function u(){return new URLSearchParams(window.location.search).get("id")}var l=["AUDIO_QUALITY_ULTRALOW","AUDIO_QUALITY_LOW","AUDIO_QUALITY_MEDIUM","AUDIO_QUALITY_HIGH"],b={invidiousInstance:"https://vid.puffyan.us/",shaders:!0,volume:50,preferredCodec:"mp4a",maxQuality:"AUDIO_QUALITY_HIGH"};function a(){let t=localStorage.getItem("options");return t?JSON.parse(t):b}function E(t,e){let o=a();o[t]=e,localStorage.setItem("options",JSON.stringify(o))}var g=[];async function y(t){if(g.length>0)return g;let e=a().invidiousInstance,o=e.endsWith("/")?e:e+"/",n=await fetch(`${o}api/v1/playlists/${t}`).then(s=>s.json());return g.push(...n.videos),n.videos}async function P(t){let e=a().invidiousInstance,o=e.endsWith("/")?e:e+"/";return(await fetch(`${o}api/v1/videos/${t}`).then(s=>s.json())).adaptiveFormats.filter(s=>s.type.startsWith("audio/"))}async function h(t){let e=await P(t),{preferredCodec:o}=a(),n=e.filter(i=>i.type.includes(o));return k(n)||n[0]||e[0]}function k(t){let{maxQuality:e}=a(),o=l.filter(s=>l.indexOf(s)<=l.indexOf(e)).sort((s,i)=>l.indexOf(s)-l.indexOf(i));return t.find(s=>o.some(i=>s.audioQuality.includes(i)))}async function v(t){let e=await y(t),o=S(t),n=Date.now()/1e3,s=e.reduce((r,d)=>r+d.lengthSeconds,0),i=Math.floor(n/s)+o;return T(e,i)}function T(t,e){let o=[...t];for(let n=o.length-1;n>0;n--){let s=Math.floor((e+n)%(n+1)),i=o[n];o[n]=o[s],o[s]=i}return o}function S(t){let e=0;for(let o=0;o<t.length;o++)e+=t.charCodeAt(o);return e}async function I(t){let e=await v(t),o=Date.now(),n=0;for(let c of e)n+=c.lengthSeconds;let s=Math.floor(o/1e3%n),i=0,r;for(let c of e)if(i+=c.lengthSeconds,s<i){r=c;break}let d=s-(i-r.lengthSeconds);return{song:r,elapsed:d}}async function w(t,e){let o=await v(t),n=await I(t),s=o.findIndex(i=>i.videoId===n.song?.videoId);return s+=e,s%=o.length,o[s]}async function A(t,e){let o=document.getElementById("radio-audio"),n=await h(t.videoId);o.src=n.url,o.currentTime=e,o.play();let s=await w(u(),1),i=await h(s.videoId);await q(i)}async function B(){let t=document.getElementById("radio-audio"),{volume:e}=a();t.volume=e/100}async function q(t){console.log("Caching next song: ",t.url);let e=document.createElement("audio");e.src=t.url,e.preload="metadata";let o=document.body.appendChild(e);o.addEventListener("loadeddata",()=>{o.remove()})}document.addEventListener("DOMContentLoaded",()=>{let t=document.getElementById("add-open"),e=document.getElementById("add-close");t.addEventListener("click",()=>{let o=document.getElementById("playlist-input"),n=document.getElementById("radio-name-input"),s=o.value;if(!s)return;let d=new URL(s).searchParams.get("list")??s;window.location.search=`?id=${d}&name=${n.value}`}),e.addEventListener("click",()=>{D("add-dialog")})});function O(t){document.getElementById(t).showModal()}function D(t){document.getElementById(t).close()}function m(t){let e=document.getElementById("radio-audio"),o=document.querySelector("#volume-bar"),n=o.querySelectorAll(".volume-bar-line"),s=document.querySelector("#volume-number");t<0&&(t=0),t>100&&(t=100),t>0?o.classList.remove("muted"):o.classList.add("muted"),e.volume=t/100;let i=Math.round(t/(100/n.length))*(100/n.length);n.forEach(r=>r.classList.remove("active"));for(let r=0;r<i/(100/n.length);r++)n[r].classList.add("active");s.textContent=`${t}%`,E("volume",t)}function M(){let t=()=>{document.getElementById("radio-audio").play(),document.removeEventListener("click",t)};document.addEventListener("click",t)}document.addEventListener("DOMContentLoaded",()=>{let t=document.querySelector("#volume-bar");t.addEventListener("click",n=>{let i=Math.floor(n.offsetX/t.clientWidth*100);m(i)}),t.addEventListener("mousedown",n=>{let i=Math.floor(n.offsetX/t.clientWidth*100);m(i),document.addEventListener("mousemove",e),document.addEventListener("mouseup",o)});let e=n=>{let s=n;if(s.target!==t)return;let i=Math.floor(s.offsetX/t.clientWidth*100);m(i)},o=()=>{document.removeEventListener("mousemove",e),document.removeEventListener("mouseup",o)}});if(u()&&p()){let t=p(),e=document.querySelectorAll('meta[name*="title"]'),o=document.querySelectorAll('meta[name*="description"]');for(let n of e)n.setAttribute("content","Titune");for(let n of o)n.setAttribute("content",`Listen along to "${t}" Radio`)}document.addEventListener("DOMContentLoaded",async()=>{document.getElementById("add-icon").addEventListener("click",()=>{O("add-dialog")});let e=document.getElementById("currently-playing"),o=document.getElementById("time-elapsed"),n=document.getElementById("duration"),s=document.getElementById("cover"),i=u(),r="";B(),m(0),M(),await y(i),setInterval(async()=>{let{song:d,elapsed:c}=await I(i);if(!r.includes(d?.title??"Unknown")&&d){let f=d.videoThumbnails.reduce((L,x)=>x.width>L.width?x:L).url;s.setAttribute("src",f);let $=document.getElementById("bg-cover");$.style.backgroundImage=`url(${f})`,document.getElementById("favicon").setAttribute("href",f),A(d,c)}if(`${d?.title??"Unknown"}${c}`===r)return;e.textContent=d?.title??"Unknown",o.textContent=`${Math.floor(c/60)}:${Math.floor(c%60).toString().padStart(2,"0")}`,n.textContent=`${Math.floor((d?.lengthSeconds??0)/60)}:${Math.floor((d?.lengthSeconds??0)%60).toString().padStart(2,"0")}`;let U=document.getElementById("progress-bar-fill"),C=c/(d?.lengthSeconds??1)*100;U.style.width=`${C}%`,r=`${d?.title??"Unknown"}${c}`},200)});})();
//# sourceMappingURL=bundle.js.map
