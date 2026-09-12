const $=s=>document.querySelector(s), $$=s=>document.querySelectorAll(s);
const body=document.body, themeBtn=$("#themeBtn"), menuBtn=$("#menuBtn"), navLinks=$("#navLinks");
themeBtn.addEventListener("click",()=>{body.classList.toggle("light");themeBtn.textContent=body.classList.contains("light")?"☀":"☾";localStorage.setItem("theme",body.classList.contains("light")?"light":"dark")});
if(localStorage.getItem("theme")==="light"){body.classList.add("light");themeBtn.textContent="☀"}
menuBtn.addEventListener("click",()=>navLinks.classList.toggle("open"));
$$(".nav-links a").forEach(a=>a.addEventListener("click",()=>navLinks.classList.remove("open")));

const progress=$("#progress");
window.addEventListener("scroll",()=>{const h=document.documentElement;progress.style.width=(h.scrollTop/(h.scrollHeight-h.clientHeight)*100)+"%"},{passive:true});

const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add("visible");observer.unobserve(e.target)}}),{threshold:.12});
$$(".reveal").forEach(e=>observer.observe(e));

const countObserver=new IntersectionObserver(entries=>entries.forEach(e=>{if(!e.isIntersecting)return;const el=e.target,target=+el.dataset.count;let n=0;const step=Math.max(1,target/25);const tick=()=>{n=Math.min(target,n+step);el.textContent=Math.floor(n)+(target===4||target===3?"+":"");if(n<target)requestAnimationFrame(tick)};tick();countObserver.unobserve(el)}),{threshold:.8});
$$("[data-count]").forEach(e=>countObserver.observe(e));

const glow=$(".cursor-glow");
window.addEventListener("pointermove",e=>{glow.style.left=e.clientX+"px";glow.style.top=e.clientY+"px"},{passive:true});

const canvas=$("#particles"),ctx=canvas.getContext("2d");let W,H,pts=[];
function resize(){W=canvas.width=innerWidth;H=canvas.height=innerHeight;pts=Array.from({length:Math.min(75,Math.floor(W/16))},()=>({x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*.25,vy:(Math.random()-.5)*.25,r:Math.random()*1.5+.4}))}
function animate(){ctx.clearRect(0,0,W,H);for(const p of pts){p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>W)p.vx*=-1;if(p.y<0||p.y>H)p.vy*=-1;ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fillStyle="rgba(139,92,246,.55)";ctx.fill()}requestAnimationFrame(animate)}
addEventListener("resize",resize);resize();animate();

$("#contactForm").addEventListener("submit",e=>{e.preventDefault();const name=$("#name").value.trim(),email=$("#email").value.trim(),msg=$("#message").value.trim();const note=$("#formNote");const subject=encodeURIComponent("Portfolio enquiry from "+name);const body=encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${msg}`);window.location.href=`mailto:ks1266702@gmail.com?subject=${subject}&body=${body}`;note.textContent="Opening your email client…"});
$("#year").textContent=new Date().getFullYear();