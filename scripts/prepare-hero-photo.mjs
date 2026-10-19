import sharp from 'sharp';
await sharp('source-assets/jvm/team-walking.jpg').extract({left:1930,top:0,width:1724,height:1724}).resize(1600,1600).webp({quality:90}).toFile('public/images/jvm/team-hero.webp');
