import fs from 'node:fs/promises';
import sharp from 'sharp';
const assets = [
 ['team-walking','d549d6_a3a242a16e264311b2ab4653330e9dde~mv2.jpg','https://www.jvmsolutions.net/'],
 ['team-shirts','d549d6_eae02a6bd1ed41f3aa5b9af2fa3c285d~mv2.jpg','https://www.jvmsolutions.net/about-us'],
 ['founder-portrait','d549d6_e10de20beded4dfca4e3a42b5569cb2f~mv2.jpg','https://www.jvmsolutions.net/about-us'],
 ['professionals','0d1f8f_b7d46ae92ece4fd5b31b12a3bb8fcc1a~mv2_d_6720_4480_s_4_2.jpg','https://www.jvmsolutions.net/'],
 ['healthcare','0d1f8f_85cf74d8ce7a45e982b270c278909068~mv2.jpg','https://www.jvmsolutions.net/'],
 ['logistics','0d1f8f_65e9bf4b428b48f8883a274d03c9bb1d~mv2.jpg','https://www.jvmsolutions.net/'],
 ['management','0d1f8f_cecffcbf9e894b5a8ca7fdfe214eb7ae~mv2_d_2500_1440_s_2.jpg','https://www.jvmsolutions.net/'],
 ['technology','0d1f8f_cbea19e16d0a492e8c7258e0a9cda524~mv2_d_1730_1300_s_2.jpeg','https://www.jvmsolutions.net/'],
];
await fs.mkdir('source-assets/jvm',{recursive:true});
await fs.mkdir('public/images/jvm',{recursive:true});
const results = await Promise.all(assets.map(async ([name,id,page])=>{
 const source='https://static.wixstatic.com/media/'+id;
 const res=await fetch(source); if(!res.ok) throw new Error(name+': '+res.status);
 const buffer=Buffer.from(await res.arrayBuffer());
 const meta=await sharp(buffer).metadata();
 await fs.writeFile('source-assets/jvm/'+name+'.jpg',buffer);
 const output=await sharp(buffer).rotate().resize({width:2400,height:2400,fit:'inside',withoutEnlargement:true}).webp({quality:88}).toBuffer();
 await fs.writeFile('public/images/jvm/'+name+'.webp',output);
 return {name,page,source,width:meta.width,height:meta.height,originalBytes:buffer.length,webBytes:output.length,local:'/images/jvm/'+name+'.webp'};
}));
await fs.writeFile('source-assets/jvm/sources.json',JSON.stringify({retrieved:'2026-10-19',assets:results},null,2)+'\n');
console.log(JSON.stringify(results,null,2));
