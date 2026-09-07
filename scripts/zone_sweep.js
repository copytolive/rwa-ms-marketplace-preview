const puppeteer = require('puppeteer-core');
const fs = require('fs');

(async()=>{
  fs.mkdirSync('/tmp/rwa-zonesweep',{recursive:true});
  const browser=await puppeteer.launch({executablePath:'/usr/bin/google-chrome',headless:'new',args:['--no-sandbox','--disable-gpu','--hide-scrollbars']});
  const page=await browser.newPage();
  await page.setViewport({width:1672,height:941,deviceScaleFactor:1});
  await page.goto('http://127.0.0.1:8000/desktop.html',{waitUntil:'domcontentloaded'});
  await page.addStyleTag({path:'desktop-finetune.css'});
  await page.evaluate(()=>new Promise(r=>setTimeout(r,900)));
  await page.evaluate(()=>{const s=document.createElement('style');s.id='zone-sweep-style';document.head.appendChild(s)});
  const setCss=async css=>{await page.$eval('#zone-sweep-style',(el,css)=>el.textContent=css,css);await page.evaluate(()=>new Promise(r=>setTimeout(r,20)))};
  const shot=async(name,clip)=>page.screenshot({path:`/tmp/rwa-zonesweep/${name}.png`,clip});

  const sweeps=[
    {name:'sidebar',sel:'.sidebar',clip:{x:0,y:64,width:237,height:877},xs:[4,5,6,7,8],ys:[4,5,6,7,8]},
    {name:'chart',sel:'.topchart',clip:{x:1202,y:72,width:453,height:320},xs:[0,1,2,3,4],ys:[5,6,7,8,9]},
    {name:'verticals',sel:'.verticals',clip:{x:237,y:404,width:1410,height:181},xs:[-2,-1,0],ys:[-2,-1,0]},
    {name:'featured',sel:'.featured',clip:{x:237,y:597,width:1418,height:266},xs:[-2,-1,0],ys:[-2,-1,0]},
    {name:'footer',sel:'.trustbar',clip:{x:237,y:875,width:1418,height:52},xs:[3,4,5],ys:[2,3,4]},
  ];
  let n=0;
  for(const s of sweeps){
    for(const x of s.xs){for(const y of s.ys){
      await setCss(`${s.sel}{transform:translate(${x}px,${y}px)!important}`);
      await shot(`${s.name}_${x}_${y}`,s.clip); n++;
    }}
  }

  const heroClip={x:237,y:72,width:951,height:320};
  // True current baseline.
  await setCss(''); await shot('heroimg_base',heroClip); n++;

  // Photo registration around the known clean content crop.
  for(const left of [480,482,484,486,488]){
    for(const width of [310,312,314,316,318]){
      await setCss(`.hero-visual{left:${left}px!important;width:${width}px!important}.hero-visual img{width:${width}px!important}`);
      await shot(`heroimg_visual_${left}_${width}`,heroClip); n++;
    }
  }

  // Right editorial panel geometry.
  for(const width of [126,132,138,144,150,156,162]){
    await setCss(`.hero-right{width:${width}px!important}`);
    await shot(`heroimg_rightwidth_${width}`,heroClip); n++;
  }
  for(const top of [39,42,45,48,51]){
    for(const gap of [14,17,20,23]){
      await setCss(`.hero-right{padding-top:${top}px!important;gap:${gap}px!important}`);
      await shot(`heroimg_rightlayout_${top}_${gap}`,heroClip); n++;
    }
  }

  // Left copy registration; typography itself remains the Mac-validated winner.
  for(const left of [27,29,31,33,35]){
    for(const top of [28,30,32,34]){
      await setCss(`.hero-copy{left:${left}px!important;top:${top}px!important}`);
      await shot(`heroimg_copy_${left}_${top}`,heroClip); n++;
    }
  }

  // Benefit bar dimensions are code and safe to tune independently.
  for(const h of [37,38,39,40,41]){
    await setCss(`.hero-benefits{height:${h}px!important}`);
    await shot(`heroimg_benefits_${h}`,heroClip); n++;
  }

  await browser.close();
  console.log(`rendered ${n} real-DOM precision candidates`);
})();
