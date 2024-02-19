"use strict";(()=>{function w(){return new URLSearchParams(window.location.search).get("name")}function u(){return new URLSearchParams(window.location.search).get("id")}var m=["AUDIO_QUALITY_ULTRALOW","AUDIO_QUALITY_LOW","AUDIO_QUALITY_MEDIUM","AUDIO_QUALITY_HIGH"],H={invidiousInstance:"https://iv.ggtyler.dev/",shaders:!0,volume:50,preferredCodec:"opus",maxQuality:"AUDIO_QUALITY_HIGH",showNotices:!0,fullyHideSidebar:!1};function a(){let t=localStorage.getItem("options");return t?JSON.parse(t):H}function p(t,e){let o=a();o[t]=e,localStorage.setItem("options",JSON.stringify(o))}var I=[];async function g(t,e){if(!a().showNotices)return;let o=document.createElement("div"),s=document.querySelector("#notice-container");o.classList.add("notice"),o.classList.add(e),o.textContent=t;let n=s.appendChild(o);await new Promise(i=>setTimeout(i,100)),n.classList.add("show"),I.push(n),setTimeout(()=>{n.classList.remove("show"),setTimeout(()=>{n.remove(),I.splice(I.indexOf(n),1)},100)},5e3)}var L=[];async function E(t){if(L.length>0)return L;let e=a().invidiousInstance,o=e.endsWith("/")?e:e+"/",s=await fetch(`${o}api/v1/playlists/${t}`).then(n=>n.json());return L.push(...s.videos),s.videos}async function W(t){let e=a().invidiousInstance,o=e.endsWith("/")?e:e+"/";return(await fetch(`${o}api/v1/videos/${t}`).then(n=>n.json())).adaptiveFormats.filter(n=>n.type.startsWith("audio/"))}async function b(t){let e=await W(t),{preferredCodec:o}=a(),s=e.filter(i=>i.type.includes(o));return Q(s)||s[0]||e[0]}function Q(t){let{maxQuality:e}=a(),o=m.filter(n=>m.indexOf(n)<=m.indexOf(e)).sort((n,i)=>m.indexOf(n)-m.indexOf(i));return t.find(n=>o.some(i=>n.audioQuality.includes(i)))}async function S(t){let e=await E(t),o=Date.now()/1e3,s=e.reduce((i,r)=>i+r.lengthSeconds,0),n=Math.floor(o/s);return F(e,n)}function F(t,e){let o=[...t];for(let s=o.length-1;s>0;s--){let n=Math.floor((e+s)%(s+1)),i=o[s];o[s]=o[n],o[n]=i}return o}async function f(t){let e=await S(t),o=Date.now(),s=0;for(let c of e)s+=c.lengthSeconds;let n=Math.floor(o/1e3%s),i=0,r;for(let c of e)if(i+=c.lengthSeconds,n<i){r=c;break}let l=n-(i-r.lengthSeconds);return{song:r,elapsed:l}}async function U(t,e){let o=await S(t),s=await f(t),n=o.findIndex(i=>i.videoId===s.song?.videoId);return n+=e,n%=o.length,o[n]}async function h(t,e){let o=document.getElementById("radio-audio"),s=await b(t.videoId),n=!1;if(s.url!==o.src&&(o.src=s.url,n=!0),o.currentTime=e,o.onerror=i=>{console.error(i),g("An error occurred while trying to play the song. Check DevTools. Is it DRM protected?","error")},n){let i=await U(u(),1),r=await b(i.videoId);await Y(r)}}async function $(){let t=document.getElementById("radio-audio"),{volume:e}=a();t.volume=e/100}async function Y(t){console.log("Caching next song: ",t.url);let e=document.createElement("audio");e.src=t.url,e.preload="metadata";let o=document.body.appendChild(e);o.onloadeddata=()=>{o.remove()},o.onerror=s=>{console.error(s),g("There was an error preloading the next song. It may or may not load.","error")}}document.addEventListener("DOMContentLoaded",()=>{let t=a().fullyHideSidebar,e=document.getElementById("side-options"),o=document.getElementById("add-open"),s=document.getElementById("add-close"),n=document.getElementById("options-close"),i=document.getElementById("list-close"),r=document.getElementById("list-submit");e.style.opacity=t?"0":"0.1",e.addEventListener("mouseenter",()=>{e.style.opacity="1"}),e.addEventListener("mouseleave",()=>{e.style.opacity=t?"0":"0.1"}),o.addEventListener("click",()=>{let l=document.getElementById("playlist-input"),c=document.getElementById("radio-name-input"),d=l.value;if(!d)return;let T=new URL(d).searchParams.get("list")??d;window.location.search=`?id=${T}&name=${c.value}`}),s.addEventListener("click",()=>{B("add-dialog")}),n.addEventListener("click",()=>{B("options-dialog")}),i.addEventListener("click",()=>{B("list-dialog")}),r.addEventListener("click",()=>{open("https://github.com/SpikeHD/Titune/issues/new?assignees=&labels=submission&projects=&template=submission.md&title=%5BSUBMISSION%5D","_blank")})});function x(t){document.getElementById(t).showModal()}function B(t){document.getElementById(t).close()}function q(){let t=document.getElementById("add-icon"),e=document.getElementById("options-icon"),o=document.getElementById("list-icon");t.addEventListener("click",()=>{x("add-dialog")}),e.addEventListener("click",()=>{x("options-dialog")}),o.addEventListener("click",()=>{x("list-dialog")});let s=document.querySelectorAll(".option-row input"),n=document.querySelectorAll(".option-row select");s.forEach(i=>{let r=i.dataset.option;i.type==="checkbox"?i.checked=a()[r]:i.value=a()[r],i.onchange=()=>{if(i.type==="checkbox"){p(r,i.checked);return}p(r,i.value)}}),n.forEach(i=>{let r=i.dataset.option;i.value=a()[r],i.onchange=()=>{p(r,i.value)}})}async function P(){let t=await fetch(`https://${location.host+location.pathname}station_list.json`).catch(()=>g("Failed to load radio submissions.","error")),e=t?.json&&await t.json();e&&Object.entries(e).forEach(([o,s])=>{let n=document.createElement("a");n.classList.add("submission-row"),n.href=`?id=${s.playlist_id}&name=${o}`,n.target="_blank";let i=document.createElement("div");i.classList.add("submission-cell"),i.textContent=o;let r=document.createElement("div");r.classList.add("submission-cell"),r.textContent=s.submitted_by,n.appendChild(i),n.appendChild(r),document.querySelector(".submission-body").appendChild(n)})}function y(t){let e=document.getElementById("radio-audio"),o=document.querySelector("#volume-bar"),s=o.querySelectorAll(".volume-bar-line"),n=document.querySelector("#volume-number");t<0&&(t=0),t>100&&(t=100),t>0?o.classList.remove("muted"):o.classList.add("muted"),e.volume=t/100;let i=Math.round(t/(100/s.length))*(100/s.length);s.forEach(r=>r.classList.remove("active"));for(let r=0;r<i/(100/s.length);r++)s[r].classList.add("active");n.textContent=`${t}%`,p("volume",t)}function R(){if(!document.getElementById("radio-audio").paused)return;let e=async()=>{let{song:o,elapsed:s}=await f(u());h(o,s),document.removeEventListener("click",e)};document.addEventListener("click",e)}document.addEventListener("DOMContentLoaded",()=>{let t=document.querySelector("#volume-bar");t.addEventListener("click",s=>{let i=Math.floor(s.offsetX/t.clientWidth*100);y(i)}),t.addEventListener("mousedown",s=>{let i=Math.floor(s.offsetX/t.clientWidth*100);y(i),document.addEventListener("mousemove",e),document.addEventListener("mouseup",o)});let e=s=>{let n=s;if(n.target!==t)return;let i=Math.floor(n.offsetX/t.clientWidth*100);y(i)},o=()=>{document.removeEventListener("mousemove",e),document.removeEventListener("mouseup",o)}});function _(){let t=document.querySelector("#volume"),e=()=>{t.classList.remove("hide")},o=()=>{t.classList.add("hide")};o(),t.addEventListener("mouseenter",e),t.addEventListener("mouseleave",o)}var A={};async function D(t){if(A[t])return A[t];let e=new Image;e.crossOrigin="anonymous",e.src=await X(t),await e.decode();let o=document.createElement("canvas"),s=o.getContext("2d"),n=Math.min(e.width,e.height);return o.width=n,o.height=n,s.drawImage(e,(e.width-n)/2,(e.height-n)/2,n,n,0,0,n,n),new Promise(i=>{o.toBlob(r=>{let l=r?URL.createObjectURL(r):t;A[t]=l,i(l)})})}async function X(t){let o=await(await fetch(t)).blob();return URL.createObjectURL(o)}var z=new URLSearchParams(window.location.search).get("obs")==="true";if(u()&&w()){let t=w(),e=document.querySelectorAll('meta[name*="title"]'),o=document.querySelectorAll('meta[name*="description"]');for(let s of e)s.setAttribute("content","Titune");for(let s of o)s.setAttribute("content",`Listen along to "${t}" Radio`)}document.addEventListener("DOMContentLoaded",async()=>{z&&(document.documentElement.classList.add("transparent"),_()),q();let t=document.getElementById("currently-playing"),e=document.getElementById("time-elapsed"),o=document.getElementById("duration"),s=document.getElementById("cover"),n=document.getElementById("radio-audio"),i=u(),r="",l=w();if(document.title=l?`Titune | ${l}`:"Titune",$(),y(0),R(),P(),!i){t.textContent="Create a radio from the top left!";return}i&&(await E(i),n.onloadeddata=async()=>{let{song:c,elapsed:d}=await f(i);h(c,d),n.play()},setInterval(async()=>{let{song:c,elapsed:d}=await f(i);if(!r.includes(c?.title??"Unknown")&&c){let v=(c.videoThumbnails.length>0&&Array.isArray(c.videoThumbnails[0])?c.videoThumbnails[0]:c.videoThumbnails).reduce((k,M)=>M.width>k.width?M:k).url;s.setAttribute("src",v);let N=document.getElementById("bg-cover");N.style.backgroundImage=`url(${v})`;let j=document.getElementById("favicon"),V=await D(v);j.setAttribute("href",V??v),h(c,d)}if(`${c?.title??"Unknown"}${d}`===r)return;t.textContent=c?.title??"Unknown",e.textContent=`${Math.floor(d/60)}:${Math.floor(d%60).toString().padStart(2,"0")}`,o.textContent=`${Math.floor((c?.lengthSeconds??0)/60)}:${Math.floor((c?.lengthSeconds??0)%60).toString().padStart(2,"0")}`;let O=document.getElementById("progress-bar-fill"),C=d/(c?.lengthSeconds??1)*100;O.style.width=`${C}%`,r=`${c?.title??"Unknown"}${d}`},200))});})();
//# sourceMappingURL=bundle.js.map
