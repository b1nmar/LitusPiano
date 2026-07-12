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
  { in: '11f49854-IMG_0770.jpeg', out: 'venue-hall.jpg',  w: 2000, median: 3, blur: 1.0, sat: 1.20, bri: 1.06, hue: 4 },
  // Pianist from behind (portrait). The artist himself — fine to show, still stylized.
  { in: '3bbcc164-IMG_0771.jpeg', out: 'artist-1.jpg',    w: 1300, median: 3, blur: 1.1, sat: 1.16, bri: 1.05, hue: 4 },
  { in: '54dda22b-IMG_0774.jpeg', out: 'artist-2.jpg',    w: 1300, median: 3, blur: 1.1, sat: 1.16, bri: 1.05, hue: 4 },
  // Audience shots — faces visible. Strong softening + colour "despiste":
  // a warm amber DUOTONE collapses every garment/hair colour into one candlelit
  // family (differentiated only by brightness), so the red jacket, hair colours
  // and dresses can no longer identify anyone — while keeping the warm mood.
  { in: 'b0cc3313-IMG_0766.jpeg', out: 'audience-1.jpg',  w: 1900, median: 11, blur: 4.5, bri: 1.06, tint: { r: 235, g: 158, b: 92 } },
  { in: '94b4e9fc-IMG_0767.jpeg', out: 'audience-2.jpg',  w: 1900, median: 13, blur: 5.0, bri: 1.04, tint: { r: 232, g: 150, b: 84 } },
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

function warmSVG(w, h, k) {
  // Warm candle glow rising from the bottom, cool-neutral top.
  // k scales the intensity (used to re-warm the hue-shifted crowd shots).
  const a = (x) => (x * (k || 1)).toFixed(3);
  return Buffer.from(
    `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
       <defs>
         <linearGradient id="warm" x1="0" y1="1" x2="0" y2="0">
           <stop offset="0%" stop-color="#ff9d3c" stop-opacity="${a(0.22)}"/>
           <stop offset="45%" stop-color="#ff8a2a" stop-opacity="${a(0.10)}"/>
           <stop offset="100%" stop-color="#1a1206" stop-opacity="${a(0.12)}"/>
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
    let pipe = sharp(inPath)
      .rotate()
      .resize({ width: j.w, withoutEnlargement: true })
      .median(j.median)
      .blur(j.blur);
    if (j.tint) {
      // warm duotone: destroys colour as an identifier, keeps luminance/mood
      pipe = pipe.modulate({ brightness: j.bri }).tint(j.tint);
    } else {
      pipe = pipe.modulate({ brightness: j.bri, saturation: j.sat, hue: j.hue });
    }
    const staged = await pipe.gamma(1.05).toBuffer();

    const meta = await sharp(staged).metadata();
    const w = meta.width, h = meta.height;

    // Film grain layer.
    const grain = await sharp({
      create: { width: w, height: h, channels: 3, noise: { type: 'gaussian', mean: 128, sigma: 10 } },
    }).png().toBuffer();

    const layers = [{ input: warmSVG(w, h, 1 + (j.warm || 0)), blend: 'soft-light' }];
    if (j.warm) {
      // solid amber wash to unify the hue-shifted crowd into a candlelit glow
      const amber = Buffer.from(
        `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
           <rect width="${w}" height="${h}" fill="#e8842a" fill-opacity="${(j.warm * 0.34).toFixed(3)}"/>
         </svg>`
      );
      layers.push({ input: amber, blend: 'over' });
    }
    layers.push({ input: grain, blend: 'overlay', opacity: 0.35 });
    layers.push({ input: vignetteSVG(w, h), blend: 'over' });

    await sharp(staged)
      .composite(layers)
      .jpeg({ quality: 82, mozjpeg: true })
      .toFile(outPath);

    const kb = Math.round(fs.statSync(outPath).size / 1024);
    console.log(`✓ ${j.out}  ${w}x${h}  ${kb} KB`);
  }
  console.log('done');
})().catch((e) => { console.error(e); process.exit(1); });
