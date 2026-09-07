const puppeteer = require('puppeteer-core');
const fs = require('fs');

(async()=>{
  fs.mkdirSync('/tmp/rwa-sweep',{recursive:true});
  const browser=await puppeteer.launch({executablePath:'/usr/bin/google-chrome',headless:'new',args:['--no-sandbox','--disable-gpu','--hide-scrollbars']});
  const page=await browser.newPage();
  await page.setViewport({width:1672,height:941,deviceScaleFactor:1});
  await page.goto('http://127.0.0.1:8000/desktop.html',{waitUntil:'domcontentloaded'});
  await page.evaluate(()=>new Promise(r=>setTimeout(r,1000)));
  await page.evaluate(()=>{const s=document.createElement('style');s.id='sweep-style';document.head.appendChild(s)});

  const serif=['Georgia','Times New Roman','Liberation Serif','DejaVu Serif'];
  const scales=[0.90,0.92,0.94,0.96];
  const tys=[-7,-6,-5,-4];
  let n=0;
  for(const font of serif){
    for(const sx of scales){
      for(const ty of tys){
        const css=`.hero h1{font-family:"${font}",serif!important;transform:translateY(${ty}px) scaleX(${sx})!important}`;
        await page.$eval('#sweep-style',(el,css)=>el.textContent=css,css);
        await page.evaluate(()=>new Promise(r=>setTimeout(r,25)));
        const name=`hero_${String(n).padStart(3,'0')}_${font.replaceAll(' ','-')}_${sx}_${ty}.png`;
        await page.screenshot({path:`/tmp/rwa-sweep/${name}`,clip:{x:237,y:72,width:951,height:320}});
        n++;
      }
    }
  }
  await browser.close();
  console.log(`rendered ${n} hero candidates`);
})();
