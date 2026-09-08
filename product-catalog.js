(()=>{
const CATEGORIES=[
 {key:'marketplace',label:'Marketplace',icon:'fa-bag-shopping',description:'Fashion, beauty, lifestyle and collectible real-world assets.',heroTitle:'Marketplace. Real ownership.',heroBody:'Own curated fashion, beauty and lifestyle assets with transparent holder data.'},
 {key:'property',label:'Property',icon:'fa-building',description:'Homes, hospitals, hotels, offices and commercial real estate.',heroTitle:'Property. Made accessible.',heroBody:'Explore residential, healthcare, hospitality, office and industrial real estate.'},
 {key:'games',label:'Games',icon:'fa-gamepad',description:'Game land, characters, skins, tokens and esports assets.',heroTitle:'Digital worlds. Real ownership.',heroBody:'Collect game-linked land, characters, skins, tokens and esports assets.'},
 {key:'ai-models',label:'AI Models',icon:'fa-brain',description:'Trading, finance, medical, legal and industry AI models.',heroTitle:'AI models. Productive assets.',heroBody:'Discover specialized AI models for trading, finance, medicine, law and industry.'},
 {key:'franchise',label:'Franchise',icon:'fa-store',description:'Food, coffee, education, fitness, services and petcare.',heroTitle:'Franchise. Proven businesses.',heroBody:'Access operating concepts across food, coffee, education, fitness, services and petcare.'},
 {key:'apps',label:'Apps',icon:'fa-table-cells-large',description:'Business, finance, social, media, health, travel and food apps.',heroTitle:'Apps. Digital businesses.',heroBody:'Own exposure to useful software across business, finance, social, health, travel and food.'}
];
const seeds={
 marketplace:[['Velora Heel','Luxe Studios','$320','3,248 holders',65],['Nimble One','Aeroic Collection','$180','1,929 holders',38],['Classic Polo','RWA Apparel','$150','2,530 holders',78],['Aurora Glow Serum','Lumiere Beauty','$95','4,120 holders',78],['Atelier Tote','Maison North','$640','1,106 holders',54],['Emerald Timepiece','Crest Atelier','$1,250','862 holders',46]],
 property:[['Seaview Residence','Aurea Living','$120,000','438 holders',72],['Harbor Medical Suite','MedSpace RE','$85,000','311 holders',61],['Grand Meridian Hotel','Meridian Hospitality','$210,000','582 holders',44],['Axis Office Tower','Axis Capital','$165,000','714 holders',57],['GreenWorks Industrial','GreenWorks Estate','$98,000','396 holders',69],['Arcadia Mixed Use','Arcadia Developments','$145,000','503 holders',52]],
 games:[['Origins Land Plot','WorldReal Estates','$450','2,310 holders',49],['Aether Character Pass','Mythic Worlds','$220','3,870 holders',63],['Celestial Blade','Forge Realm','$175','2,124 holders',71],['Sovereign Skin','Arena Guild','$95','5,610 holders',80],['Vault Loot Box','Quest Labs','$60','6,482 holders',67],['Arena Token Pack','Esports Union','$140','4,332 holders',58]],
 'ai-models':[['Alpha Trader Model','QuantCore AI','$2,400','1,245 holders',66],['MedVision AI','Clinica Labs','$3,100','934 holders',58],['LegalMind Pro','Lexica AI','$1,850','1,108 holders',73],['Property Scout AI','PropIntel','$1,600','1,504 holders',69],['AgriYield AI','FieldSense','$1,300','882 holders',62],['Factory Optimizer','IndustriAI','$2,750','776 holders',55]],
 franchise:[['BrewLab Cafe','BrewLab Group','$18,000','286 holders',64],['GreenBowl Kitchen','GreenBowl Foods','$22,500','314 holders',59],['LearnHub Center','LearnHub','$16,000','241 holders',68],['PulseFit Studio','PulseFit','$28,000','375 holders',53],['HomeCare Services','CareWorks','$14,500','208 holders',76],['PawHouse Petcare','PawHouse','$19,500','342 holders',61]],
 apps:[['LedgerFlow','LedgerFlow Labs','$780','2,208 holders',68],['SocialLoop','Loop Networks','$520','3,142 holders',54],['MediaForge','Forge Studio','$690','1,804 holders',63],['HealthTrack','HealthTrack Labs','$840','2,614 holders',72],['EduPath','EduPath Systems','$460','1,996 holders',57],['TripMate','TripMate Digital','$610','2,402 holders',66]]
};
const imageOverrides={
 'marketplace-1':'assets/media1_clean.png','marketplace-2':'assets/media2_clean.png','marketplace-3':'assets/media3_clean.png','marketplace-4':'assets/media4_clean.png',
 'property-1':'assets/media5_clean.png','games-1':'assets/media6_clean.png'
};
const CATALOG=[];
for(const cat of CATEGORIES){(seeds[cat.key]||[]).forEach((x,i)=>{const key=`${cat.key}-${i+1}`;CATALOG.push({key,category:cat.key,label:cat.label,name:x[0],brand:x[1],price:x[2],holders:x[3],sold:x[4],image:imageOverrides[key]||`assets/catalog-${cat.key}-${i+1}.webp`});});}
window.RWA_CATEGORIES=CATEGORIES;
window.RWA_CATALOG=CATALOG;
})();
