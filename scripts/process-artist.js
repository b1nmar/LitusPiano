/* Artist portrait v2: straighten (-4deg), tight crop, patch out the
   extinguisher sign (wall sample), warm spotlight on the subject,
   sharpen, candle grade, vignette + grain. */
const sharp = require('sharp');

const vignette = (w,h)=>Buffer.from(
 `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
   <defs><radialGradient id="v" cx="42%" cy="42%" r="82%">
     <stop offset="45%" stop-color="#000" stop-opacity="0"/>
     <stop offset="100%" stop-color="#000" stop-opacity="0.62"/>
   </radialGradient></defs>
   <rect width="${w}" height="${h}" fill="url(#v)"/></svg>`);
const warm = (w,h)=>Buffer.from(
 `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
   <defs><linearGradient id="g" x1="0" y1="1" x2="0" y2="0">
     <stop offset="0%" stop-color="#ff9d3c" stop-opacity="0.26"/>
     <stop offset="50%" stop-color="#ff8a2a" stop-opacity="0.08"/>
     <stop offset="100%" stop-color="#1a1206" stop-opacity="0.12"/>
   </linearGradient></defs>
   <rect width="${w}" height="${h}" fill="url(#g)"/></svg>`);
// soft warm spotlight on the subject (he stands centre-left)
const spotlight = (w,h)=>Buffer.from(
 `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
   <defs><radialGradient id="s" cx="30%" cy="42%" r="46%">
     <stop offset="0%" stop-color="#ffd9a0" stop-opacity="0.5"/>
     <stop offset="60%" stop-color="#ffbe6e" stop-opacity="0.18"/>
     <stop offset="100%" stop-color="#000" stop-opacity="0"/>
   </radialGradient></defs>
   <rect width="${w}" height="${h}" fill="url(#s)"/></svg>`);

(async () => {
  // straighten
  const straight = await sharp('IMG_0777.jpeg')
    .rotate()
    .rotate(-4, { background: '#0d0a07' })
    .toBuffer();

  // patch the extinguisher sign with a wall sample taken just below it
  const patch = await sharp(straight)
    .extract({ left: 775, top: 560, width: 90, height: 74 })
    .blur(1.4)
    .toBuffer();
  const patched = await sharp(straight)
    .composite([{ input: patch, left: 777, top: 488 }])
    .toBuffer();

  // tight crop (3:4) on him + piano, from the straightened image
  const staged = await sharp(patched)
    .extract({ left: 380, top: 420, width: 600, height: 800 })
    .resize({ width: 900 })
    .sharpen({ sigma: 1.15, m1: 1.3, m2: 0.7 })
    .modulate({ brightness: 1.05, saturation: 1.1, hue: 4 })
    .gamma(1.03)
    .toBuffer();

  const meta = await sharp(staged).metadata();
  const grain = await sharp({ create:{ width: meta.width, height: meta.height, channels:3,
    noise:{ type:'gaussian', mean:128, sigma:9 } } }).png().toBuffer();

  await sharp(staged)
    .composite([
      { input: spotlight(meta.width, meta.height), blend: 'soft-light' },
      { input: warm(meta.width, meta.height), blend: 'soft-light' },
      { input: grain, blend: 'overlay', opacity: 0.3 },
      { input: vignette(meta.width, meta.height), blend: 'over' },
    ])
    .jpeg({ quality: 84, mozjpeg: true })
    .toFile('assets/img/artist-portrait.jpg');
  console.log('OK', meta.width, 'x', meta.height);
})().catch(e => { console.error(e); process.exit(1); });
