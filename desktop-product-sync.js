(()=>{
const cats=window.RWA_CATEGORIES||[],catalog=window.RWA_CATALOG||[];
const qs=s=>document.querySelector(s),qsa=s=>[...document.querySelectorAll(s)];
const grid=qs('.asset-grid'),featured=qs('.featured'),tabs=qs('.tabs'),search=qs('.search input');
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const byCat=k=>catalog.filter(p=>p.category===k);
const representatives=()=>cats.map(c=>byCat(c.key)[0]).filter(Boolean);
const card=p=>`<article class="asset-card" data-key="${p.key}" data-category="${p.category}"><div class="discount" data-ui="holder-discount">Up to 70% Off<br/>for Holders</div><button aria-label="Save ${esc(p.name)}" class="heart" data-action="favorite" type="button"><i class="fa-regular fa-heart"></i></button><img alt="${esc(p.name)}" src="${p.image}"/><h4>${esc(p.name)}</h4><p>${esc(p.brand)} <span>| ${esc(p.label)}</span></p><strong>${p.price}</strong><div class="holders"><img alt="Holders" class="avatar-strip" src="assets/avatars-806.png"/><small>${p.holders}</small></div><div class="sold"><i style="--p:${p.sold}%"></i><span>SOLD ${p.sold}%</span></div><button class="detail" data-action="view-details" type="button"><i class="fa-solid fa-cart-shopping"></i><span>View Details</span></button></article>`;
let active='all-assets';
function bindCards(){qsa('.asset-grid .heart').forEach(b=>b.addEventListener('click',()=>{b.classList.toggle('liked');b.querySelector('i').className=b.classList.contains('liked')?'fa-solid fa-heart':'fa-regular fa-heart'}));}
function render(filter=active,query=''){active=filter;let items;if(query){const q=query.toLowerCase();items=catalog.filter(p=>`${p.name} ${p.brand} ${p.label} ${p.category}`.toLowerCase().includes(q)).slice(0,6);}else if(filter==='all-assets')items=representatives();else items=byCat(filter).slice(0,6);if(grid){grid.innerHTML=items.map(card).join('');bindCards();}qsa('.tabs button').forEach(b=>b.classList.toggle('active',b.dataset.value===filter));const h=qs('.featured-head h2');if(h)h.textContent=query?`Search Results (${items.length})`:filter==='all-assets'?'Featured Assets':`Featured ${cats.find(c=>c.key===filter)?.label||'Assets'}`;}
qsa('.tabs button').forEach(b=>b.addEventListener('click',e=>{e.preventDefault();render(b.dataset.value||'all-assets','')}));
qsa('.product-vertical').forEach(card=>{const key=card.dataset.product;const btn=card.querySelector('button');if(btn)btn.addEventListener('click',e=>{e.preventDefault();render(key,'');featured?.scrollIntoView({behavior:'smooth',block:'start'})});});
if(search){search.placeholder='Search RWA assets, AI models, franchises, apps...';search.addEventListener('input',()=>{const q=search.value.trim();if(q.length>=2)render('all-assets',q);else if(!q)render(active,'')});search.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();featured?.scrollIntoView({behavior:'smooth',block:'start'})}})}
const hero=qs('.hero'),heroBtn=qs('[data-action="explore-all-products"]'),featuredBtn=qs('[data-action="view-featured-assets"]');
if(heroBtn){heroBtn.addEventListener('click',e=>{e.preventDefault();qs('.product-verticals')?.scrollIntoView({behavior:'smooth',block:'center'})});}
if(featuredBtn){featuredBtn.addEventListener('click',e=>{e.preventDefault();featured?.scrollIntoView({behavior:'smooth',block:'start'})});}
const productsNav=qs('[data-action="nav-products"]');if(productsNav)productsNav.addEventListener('click',e=>{e.preventDefault();const menu=qs('.rwa-menu-toggle');if(menu)menu.click();else qs('.product-verticals')?.scrollIntoView({behavior:'smooth',block:'center'})});
render('all-assets','');
})();
