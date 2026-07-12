/*
 * Privacy + mood image processor for Candle Night Piano.
 *
 * Goal: keep the magical candlelit atmosphere of the originals while making
 * people (especially the audience) non-identifiable — WITHOUT the pixelated
 * "Street View" look. We do this with a painterly softening pipeline:
 *   median smoothing (smears fine facial detail) + gaussian blur + downscale
 *   + warm candle color grade + vignette + subtle film grain.
 * Crowd photos get a stronger treatment so no face survives recognizable.
 *
 * Run: node scripts/process-images.js
 */
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const SRC = '/root/.claude/uploads/266e6f90-c30a-5002-a119-a111e0a382c5';
const OUT = path.join(__dirname, '..', 'assets', 'img');
fs.mkdirSync(OUT, { recursive: true });

const jobs = [
  // Empty hall — the venue set-up. No audience faces. Light artistic touch.
  { in: '11f49854-IMG_0770.jpeg', out: 'venue-hall.jpg',  w: 2000, median: 3, blur: 1.0, sat: 1.20, bri: 1.06 },
  // Pianist from behind (portrait). The artist himself — fine to show, still stylized.
  { in: '3bbcc164-IMG_0771.jpeg', out: 'artist-1.jpg',    w: 1300, median: 3, blur: 1.1, sat: 1.16, bri: 1.05 },
  { in: '54dda22b-IMG_0774.jpeg', out: 'artist-2.jpg',    w: 1300, median: 3, blur: 1.1, sat: 1.16, bri: 1.05 },
  // Audience shots — faces visible. Strong softening to guarantee anonymity.
  { in: 'b0cc3313-IMG_0766.jpeg', out: 'audience-1.jpg',  w: 1900, median: 11, blur: 4.0, sat: 1.20, bri: 1.07 },
  { in: '94b4e9fc-IMG_0767.jpeg', out: 'audience-2.jpg',  w: 1900, median: 13, blur: 4.5, sat: 1.14, bri: 1.05 },
];

function vignetteSVG(w, h) {
  return Buffer.from(
    `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
       <defs>
         <radialGradient id="v" cx="50%" cy="44%" r="78%">
           <stop offset="50%" stop-color="#000" stop-opacity="0"/>
           <stop offset="100%" stop-color="#000" stop-opacity="0.6"/>
         </radialGradient>
       </defs>
       <rect width="${w}" height="${h}" fill="url(#v)"/>
     </svg>`
  );
}

function warmSVG(w, h) {
  // Warm candle glow rising from the bottom, cool-neutral top.
  return Buffer.from(
    `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
       <defs>
         <linearGradient id="warm" x1="0" y1="1" x2="0" y2="0">
           <stop offset="0%" stop-color="#ff9d3c" stop-opacity="0.22"/>
           <stop offset="45%" stop-color="#ff8a2a" stop-opacity="0.06"/>
           <stop offset="100%" stop-color="#1a1206" stop-opacity="0.10"/>
         </linearGradient>
       </defs>
       <rect width="${w}" height="${h}" fill="url(#warm)"/>
     </svg>`
  );
}

(async () => {
  for (const j of jobs) {
    const inPath = path.join(SRC, j.in);
    const outPath = path.join(OUT, j.out);

    // First pass: orient + resize + painterly softening + color grade.
    const staged = await sharp(inPath)
      .rotate()
      .resize({ width: j.w, withoutEnlargement: true })
      .median(j.median)
      .blur(j.blur)
      .modulate({ brightness: j.bri, saturation: j.sat, hue: 4 })
      .gamma(1.05)
      .toBuffer();

    const meta = await sharp(staged).metadata();
    const w = meta.width, h = meta.height;

    // Film grain layer.
    const grain = await sharp({
      create: { width: w, height: h, channels: 3, noise: { type: 'gaussian', mean: 128, sigma: 10 } },
    }).png().toBuffer();

    await sharp(staged)
      .composite([
        { input: warmSVG(w, h), blend: 'soft-light' },
        { input: grain, blend: 'overlay', opacity: 0.35 },
        { input: vignetteSVG(w, h), blend: 'over' },
      ])
      .jpeg({ quality: 82, mozjpeg: true })
      .toFile(outPath);

    const kb = Math.round(fs.statSync(outPath).size / 1024);
    console.log(`✓ ${j.out}  ${w}x${h}  ${kb} KB`);
  }
  console.log('done');
})().catch((e) => { console.error(e); process.exit(1); });
