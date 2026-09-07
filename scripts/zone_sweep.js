const puppeteer = require('puppeteer-core');
const fs = require('fs');

(async()=>{
  fs.mkdirSync('/tmp/rwa-zonesweep',{recursive:true});
  const browser=await puppeteer.launch({executablePath:'/usr/bin/google-chrome',headless:'new',args:['--no-sandbox','--disable-gpu','--hide-scrollbars']});
  const page=await browser.newPage();
  await page.setViewport({width:1672,height:941,deviceScaleFactor:1});
  await page.goto('http://127.0.0.1:8000/desktop-preview.html',{waitUntil:'domcontentloaded'});
  await page.evaluate(()=>new Promise(r=>setTimeout(r,900)));
  await page.evaluate(()=>{const s=document.createElement('style');s.id='zone-sweep-style';document.head.appendChild(s)});
  const setCss=async css=>{await page.$eval('#zone-sweep-style',(el,css)=>el.textContent=css,css);await page.evaluate(()=>new Promise(r=>setTimeout(r,10)))};
  const shot=async(name,clip)=>page.screenshot({path:`/tmp/rwa-zonesweep/${name}.png`,clip});
  const sweeps=[
    {name:'sidebar',sel:'.sidebar',clip:{x:0,y:64,width:237,height:877},xs:[1,2,3,4,5,6,7],ys:[1,2,3,4,5,6,7]},
    {name:'chart',sel:'.topchart',clip:{x:1202,y:72,width:453,height:320},xs:[-2,-1,0,1,2,3,4],ys:[1,2,3,4,5,6,7]},
    {name:'verticals',sel:'.verticals',clip:{x:237,y:404,width:1410,height:181},xs:[-4,-3,-2,-1,0,1,2],ys:[-4,-3,-2,-1,0,1,2]},
    {name:'featured',sel:'.featured',clip:{x:237,y:597,width:1418,height:266},xs:[-3,-2,-1,0,1,2,3],ys:[-3,-2,-1,0,1,2,3]},
    {name:'footer',sel:'.trustbar',clip:{x:237,y:875,width:1418,height:52},xs:[1,2,3,4,5,6,7],ys:[0,1,2,3,4,5,6]},
  ];
  let n=0;
  for(const s of sweeps){
    for(const x of s.xs){for(const y of s.ys){
      await setCss(`${s.sel}{transform:translate(${x}px,${y}px)!important}`);
      await shot(`${s.name}_${x}_${y}`,s.clip); n++;
    }}
  }
  // Hero image registration sweep; text/buttons stay real DOM.
  const heroClip={x:237,y:72,width:951,height:320};
  for(const left of [478,480,482,484,486,488,490]){
    for(const width of [306,310,314,318,322]){
      await setCss(`.hero-visual{left:${left}px!important;width:${width}px!important}.hero-visual img{width:${width}px!important}`);
      await shot(`heroimg_${left}_${width}`,heroClip); n++;
    }
  }
  await browser.close();
  console.log(`rendered ${n} zone candidates`);
})();