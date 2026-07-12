/* Artist portrait: vertical crop centred on Litus + piano, gentle sharpen
   (source is slightly soft), warm candle grade, vignette + grain. */
const sharp = require('sharp');

const vignette = (w,h)=>Buffer.from(
 `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
   <defs><radialGradient id="v" cx="46%" cy="40%" r="80%">
     <stop offset="45%" stop-color="#000" stop-opacity="0"/>
     <stop offset="100%" stop-color="#000" stop-opacity="0.62"/>
   </radialGradient></defs>
   <rect width="${w}" height="${h}" fill="url(#v)"/></svg>`);
const warm = (w,h)=>Buffer.from(
 `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
   <defs><linearGradient id="g" x1="0" y1="1" x2="0" y2="0">
     <stop offset="0%" stop-color="#ff9d3c" stop-opacity="0.28"/>
     <stop offset="50%" stop-color="#ff8a2a" stop-opacity="0.08"/>
     <stop offset="100%" stop-color="#1a1206" stop-opacity="0.14"/>
   </linearGradient></defs>
   <rect width="${w}" height="${h}" fill="url(#g)"/></svg>`);

(async () => {
  // Him: roughly x 430..660, y 470..1030 in 1125x1500. Portrait crop with piano at right.
  const crop = { left: 355, top: 390, width: 630, height: 840 }; // 3:4 tight
  const staged = await sharp('IMG_0777.jpeg')
    .rotate()
    .extract(crop)
    .resize({ width: 900 })
    .sharpen({ sigma: 1.1, m1: 1.2, m2: 0.7 })
    .modulate({ brightness: 1.04, saturation: 1.1, hue: 4 })
    .gamma(1.03)
    .toBuffer();
  const meta = await sharp(staged).metadata();
  const grain = await sharp({ create:{ width: meta.width, height: meta.height, channels:3,
    noise:{ type:'gaussian', mean:128, sigma:9 } } }).png().toBuffer();
  await sharp(staged)
    .composite([
      { input: warm(meta.width, meta.height), blend: 'soft-light' },
      { input: grain, blend: 'overlay', opacity: 0.3 },
      { input: vignette(meta.width, meta.height), blend: 'over' },
    ])
    .jpeg({ quality: 84, mozjpeg: true })
    .toFile('assets/img/artist-portrait.jpg');
  console.log('OK', meta.width, 'x', meta.height);
})().catch(e => { console.error(e); process.exit(1); });
