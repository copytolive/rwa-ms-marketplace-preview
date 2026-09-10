(()=>{
const qs=s=>document.querySelector(s),qsa=s=>[...document.querySelectorAll(s)];
const hero=qs('.m-hero'),heroImg=qs('.m-hero>img'),heroCopy=qs('.m-hero-copy'),heroBtn=qs('.m-hero button');
const slides=(window.RWA_CATEGORIES||[]).map(c=>({category:c.key,label:c.label,eyebrow:'OWN • INVEST • TRADE • LIVE REAL',title:c.heroTitle.replace('. ','<br>'),body:c.heroBody,cta:`Explore ${c.label}`,image:`assets/category-${c.key}.webp`,pos:'62% 50%'}));
if(!hero||!heroImg||!heroCopy||!heroBtn)return;
let slide=0,timer,startX=0;
const dots=qsa('.dots i');
let label=hero.querySelector('.hero-slide-label');if(!label){label=document.createElement('div');label.className='hero-slide-label';hero.appendChild(label)}
function tabFor(category){return qsa('.m-tabs button').find(b=>(b.dataset.value||'')===category)}
function showSlide(i,animate=true){slide=(i+slides.length)%slides.length;const s=slides[slide];if(animate)hero.classList.add('is-changing');setTimeout(()=>{heroImg.src=s.image;hero.style.setProperty('--hero-pos',s.pos);qs('.m-hero .eyebrow').innerHTML=s.eyebrow;qs('.m-hero h1').innerHTML=s.title;qs('.m-hero p').innerHTML=s.body;heroBtn.innerHTML=`${s.cta} <i class="fa-solid fa-arrow-right-long"></i>`;heroBtn.dataset.category=s.category;label.textContent=s.label;dots.forEach((d,n)=>d.classList.toggle('active',n===slide));hero.classList.remove('is-changing')},animate?120:0)}
function restart(){clearInterval(timer);timer=setInterval(()=>showSlide(slide+1),6500)}
dots.forEach((d,i)=>{d.setAttribute('role','button');d.tabIndex=0;d.setAttribute('aria-label',`Show hero slide ${i+1}`);d.addEventListener('click',()=>{showSlide(i);restart()});d.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();showSlide(i);restart()}})});
hero.addEventListener('touchstart',e=>{startX=e.changedTouches[0].clientX;clearInterval(timer)},{passive:true});
hero.addEventListener('touchend',e=>{const dx=e.changedTouches[0].clientX-startX;if(Math.abs(dx)>45)showSlide(slide+(dx<0?1:-1));restart()},{passive:true});
heroBtn.addEventListener('click',e=>{const category=heroBtn.dataset.category;if(!category)return;e.preventDefault();e.stopImmediatePropagation();try{window.top.location.href='category.html?category='+encodeURIComponent(category)}catch{location.href='category.html?category='+encodeURIComponent(category)}},true);
document.addEventListener('visibilitychange',()=>document.hidden?clearInterval(timer):restart());
showSlide(0,false);restart();
const categoryMeta=window.RWA_CATEGORIES||[];
qsa('.m-verticals article').forEach((card,i)=>{const c=categoryMeta[i]||categoryMeta.find(x=>x.key===card.dataset.product);if(!c)return;card.tabIndex=0;card.setAttribute('role','button');card.setAttribute('aria-label',`Browse ${c.label} assets`);const img=card.querySelector('img');if(img){img.src=`assets/category-${c.key}.webp`;img.alt=c.label}const body=card.querySelector(':scope>div');if(body&&!body.querySelector('.category-count')){const n=(window.RWA_CATALOG||[]).filter(p=>p.category===c.key).length;const chip=document.createElement('span');chip.className='category-count';chip.textContent=`${n} curated assets`;body.insertBefore(chip,body.querySelector('h3'))}const activate=()=>card.querySelector('button')?.click();card.addEventListener('click',e=>{if(e.target.closest('button'))return;activate()});card.addEventListener('keydown',e=>{if((e.key==='Enter'||e.key===' ')&&!e.target.closest('button')){e.preventDefault();activate()}})});
// Favorites and account navigation are owned by mobile-app.js/auth-entry.js.
const chartSeries={
 '1D':{ys:[105,95,89,93,87,90,78,82,68,74,58,60,49,36,42,30,34,17,7],price:'$0.1256',delta:'+ $0.0138 in the last 24 hours'},
 '1W':{ys:[103,100,96,90,91,84,79,73,77,70,66,60,57,50,46,39,34,25,20],price:'$0.1321',delta:'+ $0.0203 in the last 7 days'},
 '1M':{ys:[108,101,99,94,89,84,86,78,74,69,64,60,55,49,44,37,31,24,14],price:'$0.1488',delta:'+ $0.0369 in the last 30 days'},
 '1Y':{ys:[110,108,104,101,98,93,88,84,80,74,69,62,58,50,43,35,28,19,9],price:'$0.1842',delta:'+ $0.0723 in the last year'},
 'ALL':{ys:[112,108,109,101,97,99,89,85,79,75,68,61,55,48,44,35,30,18,5],price:'$0.2017',delta:'+ $0.0898 since launch'}
};
const rangeBtns=qsa('.ranges button');
rangeBtns.forEach(btn=>btn.addEventListener('click',()=>{const d=chartSeries[btn.textContent.trim()];if(!d)return;rangeBtns.forEach(x=>x.classList.remove('active'));btn.classList.add('active');const xs=d.ys.map((_,i)=>320+i*(492/(d.ys.length-1)));const pts=d.ys.map((y,i)=>`${xs[i].toFixed(1)},${y}`).join(' ');const poly=qs('.m-line polyline'),area=qs('.m-line path');if(poly)poly.setAttribute('points',pts);if(area)area.setAttribute('d',`M${pts.replace(/ /g,'L')}V115H320Z`);const price=qs('.m-price strong'),delta=qs('.m-delta');if(price)price.textContent=d.price;if(delta)delta.textContent=d.delta}));
})();

(()=>{
const qs=s=>document.querySelector(s),qsa=s=>[...document.querySelectorAll(s)];
const head=qs('.m-head'),search=qs('.m-search'),hero=qs('.m-hero'),usp=qs('.m-usp'),cats=qs('.m-verticals'),chart=qs('.m-chart-card'),featured=qs('.m-featured'),nav=qs('.bottomnav');
if(!head||!search||!hero||!cats||!featured||!nav)return;
let shell=qs('.m-top-shell');
if(!shell){shell=document.createElement('div');shell.className='m-top-shell';head.parentNode.insertBefore(shell,head);shell.append(head,search)}
if(!qs('.scroll-progress')){const p=document.createElement('div');p.className='scroll-progress';document.body.appendChild(p)}
if(!qs('.scroll-top')){const b=document.createElement('button');b.className='scroll-top';b.type='button';b.setAttribute('aria-label','Back to top');b.innerHTML='↑';b.addEventListener('click',()=>scrollTo({top:0,behavior:'smooth'}));document.body.appendChild(b)}
if(!hero.querySelector('.hero-scroll-cue')){const c=document.createElement('div');c.className='hero-scroll-cue';c.innerHTML='<i></i><span>Scroll to explore</span>';hero.appendChild(c)}
if(!qs('.category-intro')){const i=document.createElement('div');i.className='section-intro category-intro';i.innerHTML='<div><div class="kicker">Explore by market</div><h2>Choose your world</h2></div><p>Swipe through curated markets, then open a live asset to inspect and select it.</p>';cats.parentNode.insertBefore(i,cats)}
if(chart&&!qs('.market-intro')){const i=document.createElement('div');i.className='section-intro market-intro';i.innerHTML='<div><div class="kicker">Market pulse</div><h2>Watch the movement</h2></div><p>Tap a range to change the chart and keep the market context while you browse.</p>';chart.parentNode.insertBefore(i,chart)}
[hero,usp,qs('.category-intro'),cats,qs('.market-intro'),chart,featured].filter(Boolean).forEach(el=>el.classList.add('reveal'));
})();
(()=>{
const qs=s=>document.querySelector(s),qsa=s=>[...document.querySelectorAll(s)];
const hero=qs('.m-hero'),cats=qs('.m-verticals'),shell=qs('.m-top-shell'),nav=qs('.bottomnav'),topBtn=qs('.scroll-top');
const reveal=qsa('.reveal');
if('IntersectionObserver' in window){const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-visible');io.unobserve(e.target)}}),{threshold:.12,rootMargin:'0px 0px -6%'});reveal.forEach(el=>io.observe(el))}else reveal.forEach(el=>el.classList.add('is-visible'));
let lastY=scrollY,ticking=false;
function paint(){const y=Math.max(0,scrollY),max=Math.max(1,document.documentElement.scrollHeight-innerHeight),p=Math.min(100,y/max*100);document.documentElement.style.setProperty('--scroll-p',`${p}%`);const down=y>lastY+3,up=y<lastY-3;if(shell){shell.classList.toggle('is-compact',y>86&&(down||!up))}if(nav)nav.classList.remove('nav-hidden');topBtn?.classList.toggle('show',y>700);if(hero){const r=hero.getBoundingClientRect();if(r.bottom>0&&r.top<innerHeight){const shift=Math.max(-18,Math.min(28,-r.top*.055));hero.style.setProperty('--hero-shift',`${shift}px`)}}qsa('.m-verticals article').forEach(card=>{const r=card.getBoundingClientRect();if(r.bottom>0&&r.top<innerHeight){const center=(r.left+r.width/2)-innerWidth/2;card.style.setProperty('--cat-shift',`${Math.max(-10,Math.min(10,-center*.025))}px`)}});lastY=y;ticking=false}
addEventListener('scroll',()=>{if(!ticking){requestAnimationFrame(paint);ticking=true}},{passive:true});addEventListener('resize',paint,{passive:true});paint();
})();
(()=>{
const qs=s=>document.querySelector(s),qsa=s=>[...document.querySelectorAll(s)],nav=qsa('.bottomnav button');
if(nav.length<5)return;
// Bottom navigation is intentionally invariant on scroll; active state changes only on explicit taps.
const scrollers=qsa('.m-verticals,.m-assets,.m-usp');scrollers.forEach(el=>{el.addEventListener('wheel',e=>{if(Math.abs(e.deltaY)>Math.abs(e.deltaX)&&Math.abs(e.deltaY)<80){el.scrollLeft+=e.deltaY*.7;e.preventDefault()}},{passive:false})});
})();
