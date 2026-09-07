const puppeteer = require('puppeteer-core');
const fs = require('fs');

(async()=>{
  fs.mkdirSync('/tmp/rwa-zonesweep',{recursive:true});
  const browser=await puppeteer.launch({executablePath:'/usr/bin/google-chrome',headless:'new',args:['--no-sandbox','--disable-gpu','--hide-scrollbars']});
  const page=await browser.newPage();
  await page.setViewport({width:1672,height:941,deviceScaleFactor:1});
  await page.goto('http://127.0.0.1:8000/desktop.html',{waitUntil:'domcontentloaded'});
  await page.addStyleTag({path:'desktop-finetune.css'});
  await page.addStyleTag({path:'desktop-pass.css'});
  await page.evaluate(()=>new Promise(r=>setTimeout(r,900)));
  await page.evaluate(()=>{const s=document.createElement('style');s.id='zone-sweep-style';document.head.appendChild(s)});
  const setCss=async css=>{await page.$eval('#zone-sweep-style',(el,css)=>el.textContent=css,css);await page.evaluate(()=>new Promise(r=>setTimeout(r,18)))};
  const shot=async(name,clip)=>page.screenshot({path:`/tmp/rwa-zonesweep/${name}.png`,clip});
  let n=0;

  const zones={sidebar:{x:0,y:64,width:237,height:877},chart:{x:1202,y:72,width:453,height:320},verticals:{x:237,y:404,width:1410,height:181},featured:{x:237,y:597,width:1418,height:266},footer:{x:237,y:875,width:1418,height:52},heroimg:{x:237,y:72,width:951,height:320}};
  const sweeps=[
    {name:'sidebar',sel:'.sidebar',xs:[4,5,6,7,8],ys:[4,5,6,7,8]},
    {name:'chart',sel:'.topchart',xs:[0,1,2,3,4],ys:[5,6,7,8,9]},
    {name:'verticals',sel:'.verticals',xs:[-2,-1,0],ys:[-2,-1,0]},
    {name:'featured',sel:'.featured',xs:[-2,-1,0],ys:[-2,-1,0]},
    {name:'footer',sel:'.trustbar',xs:[3,4,5],ys:[2,3,4]},
  ];
  for(const s of sweeps){
    for(const x of s.xs){for(const y of s.ys){
      await setCss(`${s.sel}{transform:translate(${x}px,${y}px)!important}`);
      await shot(`${s.name}_move_${x}_${y}`,zones[s.name]); n++;
    }}
  }

  // HERO — each family starts from the actual layered baseline.
  await setCss(''); await shot('heroimg_base',zones.heroimg); n++;
  for(const left of [478,480,482,484,486,488,490]){
    for(const width of [306,310,314,318,322]){
      await setCss(`.hero-visual{left:${left}px!important;width:${width}px!important}.hero-visual img{width:${width}px!important}`);
      await shot(`heroimg_visual_${left}_${width}`,zones.heroimg); n++;
    }
  }
  for(const width of [126,132,138,144,150,156,162]){
    await setCss(`.hero-right{width:${width}px!important}`); await shot(`heroimg_rightwidth_${width}`,zones.heroimg); n++;
  }
  for(const top of [39,42,45,48,51,54]){
    for(const gap of [14,17,20,23,26]){
      await setCss(`.hero-right{padding-top:${top}px!important;gap:${gap}px!important}`); await shot(`heroimg_rightlayout_${top}_${gap}`,zones.heroimg); n++;
    }
  }
  for(const left of [27,29,31,33,35]){
    for(const top of [28,30,32,34]){
      await setCss(`.hero-copy{left:${left}px!important;top:${top}px!important}`); await shot(`heroimg_copy_${left}_${top}`,zones.heroimg); n++;
    }
  }
  for(const h of [35,36,37,38,39]){
    await setCss(`.hero-benefits{height:${h}px!important}`); await shot(`heroimg_benefits_${h}`,zones.heroimg); n++;
  }
  for(const size of [13,14,15,16,17]){
    for(const rot of [-10,-8,-6,-4]){
      await setCss(`.hero-right em{font-size:${size}px!important;transform:rotate(${rot}deg)!important}`); await shot(`heroimg_script_${size}_${Math.abs(rot)}`,zones.heroimg); n++;
    }
  }

  // CHART — keep SVG data real; tune geometry only.
  for(const top of [73,75,77,79,81]){
    for(const left of [12,14,16]){
      await setCss(`.chart{top:${top}px!important;left:${left}px!important}`); await shot(`chart_path_${left}_${top}`,zones.chart); n++;
    }
  }
  for(const top of [190,192,194,196,198]){
    for(const gap of [6,8,10]){
      await setCss(`.stat-grid{top:${top}px!important;gap:${gap}px!important}`); await shot(`chart_stats_${top}_${gap}`,zones.chart); n++;
    }
  }
  for(const py of [7,8,9,10,11]){
    await setCss(`.stat-grid>div{padding:${py}px 10px!important}`); await shot(`chart_statpad_${py}`,zones.chart); n++;
  }

  // FEATURED — native product crops remain untouched.
  for(const top of [4,5,6,7,8]){
    for(const ml of [4,5,6,7,8]){
      await setCss(`.asset-grid{top:${top}px!important;margin-left:${ml}px!important}`); await shot(`featured_grid_${top}_${ml}`,zones.featured); n++;
    }
  }
  for(const top of [3,4,5,6,7]){
    await setCss(`.featured-head{top:${top}px!important}`); await shot(`featured_head_${top}`,zones.featured); n++;
  }

  // FOOTER — vector icons stay code; tune layout geometry.
  for(const pl of [8,10,12,14,16,18]){
    await setCss(`.trustbar{padding-left:${pl}px!important}`); await shot(`footer_pad_${pl}`,zones.footer); n++;
  }
  for(const w of [241,247,253,259,265]){
    await setCss(`.trustbar>button{width:${w}px!important}`); await shot(`footer_btn_${w}`,zones.footer); n++;
  }
  for(const iw of [18,20,21,22,24]){
    await setCss(`.trustbar>div i,.trust-note>i{width:${iw}px!important;height:${iw}px!important}`); await shot(`footer_icon_${iw}`,zones.footer); n++;
  }

  // SIDEBAR — vector masks already replace generic icon font shapes.
  for(const sz of [14,15,16,17,18]){
    await setCss(`.side-group>a i{width:${sz}px!important;height:${sz}px!important}`); await shot(`sidebar_icons_${sz}`,zones.sidebar); n++;
  }

  await browser.close();
  console.log(`rendered ${n} final real-DOM precision candidates`);
})();
