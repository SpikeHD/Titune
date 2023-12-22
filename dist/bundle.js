"use strict";(()=>{function h(){return new URLSearchParams(window.location.search).get("name")}function l(){return new URLSearchParams(window.location.search).get("id")}var u=["AUDIO_QUALITY_ULTRALOW","AUDIO_QUALITY_LOW","AUDIO_QUALITY_MEDIUM","AUDIO_QUALITY_HIGH"],_={invidiousInstance:"https://vid.puffyan.us/",shaders:!0,volume:50,preferredCodec:"mp4a",maxQuality:"AUDIO_QUALITY_HIGH",showNotices:!0};function a(){let t=localStorage.getItem("options");return t?JSON.parse(t):_}function m(t,o){let e=a();e[t]=o,localStorage.setItem("options",JSON.stringify(e))}var L=[];async function p(t,o){if(!a().showNotices)return;let e=document.createElement("div"),s=document.querySelector("#notice-container");e.classList.add("notice"),e.classList.add(o),e.textContent=t;let n=s.appendChild(e);await new Promise(i=>setTimeout(i,100)),n.classList.add("show"),L.push(n),setTimeout(()=>{n.classList.remove("show"),setTimeout(()=>{n.remove(),L.splice(L.indexOf(n),1)},100)},5e3)}var E=[];async function w(t){if(E.length>0)return E;let o=a().invidiousInstance,e=o.endsWith("/")?o:o+"/",s=await fetch(`${e}api/v1/playlists/${t}`).then(n=>n.json());return E.push(...s.videos),s.videos}async function D(t){let o=a().invidiousInstance,e=o.endsWith("/")?o:o+"/";return(await fetch(`${e}api/v1/videos/${t}`).then(n=>n.json())).adaptiveFormats.filter(n=>n.type.startsWith("audio/"))}async function S(t){let o=await D(t),{preferredCodec:e}=a(),s=o.filter(i=>i.type.includes(e));return N(s)||s[0]||o[0]}function N(t){let{maxQuality:o}=a(),e=u.filter(n=>u.indexOf(n)<=u.indexOf(o)).sort((n,i)=>u.indexOf(n)-u.indexOf(i));return t.find(n=>e.some(i=>n.audioQuality.includes(i)))}async function b(t){let o=await w(t),e=Date.now()/1e3,s=o.reduce((i,r)=>i+r.lengthSeconds,0),n=Math.floor(e/s);return R(o,n)}function R(t,o){let e=[...t];for(let s=e.length-1;s>0;s--){let n=Math.floor((o+s)%(s+1)),i=e[s];e[s]=e[n],e[n]=i}return e}async function f(t){let o=await b(t),e=Date.now(),s=0;for(let d of o)s+=d.lengthSeconds;let n=Math.floor(e/1e3%s),i=0,r;for(let d of o)if(i+=d.lengthSeconds,n<i){r=d;break}let c=n-(i-r.lengthSeconds);return{song:r,elapsed:c}}async function k(t,o){let e=await b(t),s=await f(t),n=e.findIndex(i=>i.videoId===s.song?.videoId);return n+=o,n%=e.length,e[n]}async function y(t,o){let e=document.getElementById("radio-audio"),s=await S(t.videoId);e.src=s.url,e.currentTime=o,e.onloadeddata=()=>{e.play()},e.onerror=r=>{console.error(r),p("An error occurred while trying to play the song. Check DevTools. Is it DRM protected?","error")};let n=await k(l(),1),i=await S(n.videoId);await V(i)}async function T(){let t=document.getElementById("radio-audio"),{volume:o}=a();t.volume=o/100}async function V(t){console.log("Caching next song: ",t.url);let o=document.createElement("audio");o.src=t.url,o.preload="metadata";let e=document.body.appendChild(o);e.onloadeddata=()=>{e.remove()},e.onerror=s=>{console.error(s),p("There was an error preloading the next song. It may or may not load.","error")}}document.addEventListener("DOMContentLoaded",()=>{let t=document.getElementById("add-open"),o=document.getElementById("add-close"),e=document.getElementById("options-close"),s=document.getElementById("list-close"),n=document.getElementById("list-submit");t.addEventListener("click",()=>{let i=document.getElementById("playlist-input"),r=document.getElementById("radio-name-input"),c=i.value;if(!c)return;let v=new URL(c).searchParams.get("list")??c;window.location.search=`?id=${v}&name=${r.value}`}),o.addEventListener("click",()=>{A("add-dialog")}),e.addEventListener("click",()=>{A("options-dialog")}),s.addEventListener("click",()=>{A("list-dialog")}),n.addEventListener("click",()=>{open("https://github.com/SpikeHD/Titune/issues/new?assignees=&labels=submission&projects=&template=submission.md&title=%5BSUBMISSION%5D","_blank")})});function x(t){document.getElementById(t).showModal()}function A(t){document.getElementById(t).close()}function M(){let t=document.getElementById("add-icon"),o=document.getElementById("options-icon"),e=document.getElementById("list-icon");t.addEventListener("click",()=>{x("add-dialog")}),o.addEventListener("click",()=>{x("options-dialog")}),e.addEventListener("click",()=>{x("list-dialog")});let s=document.querySelectorAll(".option-row input"),n=document.querySelectorAll(".option-row select");s.forEach(i=>{let r=i.dataset.option;i.type==="checkbox"?i.checked=a()[r]:i.value=a()[r],i.onchange=()=>{if(i.type==="checkbox"){m(r,i.checked);return}m(r,i.value)}}),n.forEach(i=>{let r=i.dataset.option;i.value=a()[r],i.onchange=()=>{m(r,i.value)}})}async function U(){let t=await fetch(`https://${location.host+location.pathname}station_list.json`).catch(()=>p("Failed to load radio submissions.","error")),o=t?.json&&await t.json();o&&Object.entries(o).forEach(([e,s])=>{let n=document.createElement("a");n.classList.add("submission-row"),n.href=`?id=${s.playlist_id}&name=${e}`,n.target="_blank";let i=document.createElement("div");i.classList.add("submission-cell"),i.textContent=e;let r=document.createElement("div");r.classList.add("submission-cell"),r.textContent=s.submitted_by,n.appendChild(i),n.appendChild(r),document.querySelector(".submission-body").appendChild(n)})}function g(t){let o=document.getElementById("radio-audio"),e=document.querySelector("#volume-bar"),s=e.querySelectorAll(".volume-bar-line"),n=document.querySelector("#volume-number");t<0&&(t=0),t>100&&(t=100),t>0?e.classList.remove("muted"):e.classList.add("muted"),o.volume=t/100;let i=Math.round(t/(100/s.length))*(100/s.length);s.forEach(r=>r.classList.remove("active"));for(let r=0;r<i/(100/s.length);r++)s[r].classList.add("active");n.textContent=`${t}%`,m("volume",t)}function $(){if(!document.getElementById("radio-audio").paused)return;let o=async()=>{let{song:e,elapsed:s}=await f(l());y(e,s),document.removeEventListener("click",o)};document.addEventListener("click",o)}document.addEventListener("DOMContentLoaded",()=>{let t=document.querySelector("#volume-bar");t.addEventListener("click",s=>{let i=Math.floor(s.offsetX/t.clientWidth*100);g(i)}),t.addEventListener("mousedown",s=>{let i=Math.floor(s.offsetX/t.clientWidth*100);g(i),document.addEventListener("mousemove",o),document.addEventListener("mouseup",e)});let o=s=>{let n=s;if(n.target!==t)return;let i=Math.floor(n.offsetX/t.clientWidth*100);g(i)},e=()=>{document.removeEventListener("mousemove",o),document.removeEventListener("mouseup",e)}});function P(){let t=document.querySelector("#volume"),o=()=>{t.classList.remove("hide")},e=()=>{t.classList.add("hide")};e(),t.addEventListener("mouseenter",o),t.addEventListener("mouseleave",e)}var W=new URLSearchParams(window.location.search).get("obs")==="true";if(l()&&h()){let t=h(),o=document.querySelectorAll('meta[name*="title"]'),e=document.querySelectorAll('meta[name*="description"]');for(let s of o)s.setAttribute("content","Titune");for(let s of e)s.setAttribute("content",`Listen along to "${t}" Radio`)}document.addEventListener("DOMContentLoaded",async()=>{W&&(document.documentElement.classList.add("transparent"),P()),M();let t=document.getElementById("currently-playing"),o=document.getElementById("time-elapsed"),e=document.getElementById("duration"),s=document.getElementById("cover"),n=l(),i="",r=h();if(document.title=r?`Titune | ${r}`:"Titune",T(),g(0),$(),U(),!n){t.textContent="Create a radio from the top left!";return}n&&(await w(n),setInterval(async()=>{let{song:c,elapsed:d}=await f(n);if(!i.includes(c?.title??"Unknown")&&c){let I=(c.videoThumbnails.length>0&&Array.isArray(c.videoThumbnails[0])?c.videoThumbnails[0]:c.videoThumbnails).reduce((C,O)=>O.width>C.width?O:C).url;s.setAttribute("src",I);let q=document.getElementById("bg-cover");q.style.backgroundImage=`url(${I})`,document.getElementById("favicon").setAttribute("href",I),y(c,d)}if(`${c?.title??"Unknown"}${d}`===i)return;t.textContent=c?.title??"Unknown",o.textContent=`${Math.floor(d/60)}:${Math.floor(d%60).toString().padStart(2,"0")}`,e.textContent=`${Math.floor((c?.lengthSeconds??0)/60)}:${Math.floor((c?.lengthSeconds??0)%60).toString().padStart(2,"0")}`;let B=document.getElementById("progress-bar-fill"),v=d/(c?.lengthSeconds??1)*100;B.style.width=`${v}%`,i=`${c?.title??"Unknown"}${d}`},200))});})();
//# sourceMappingURL=bundle.js.map
