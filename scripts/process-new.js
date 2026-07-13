/*
 * v1.5.0 batch — processes the 4 photos uploaded to the repo root (2026-07-13).
 * Sources live in the repo itself (repo root), so this batch is reproducible.
 *
 *  IMG_0772.jpeg -> venue-candles.jpg   empty hall, candles lit (patch extinguisher sign)
 *  IMG_0776.jpeg -> concert-live.jpg    Litus playing + audience (amber duotone privacy)
 *  IMG_0775.jpeg -> audience-full.jpg   full house (amber duotone privacy)
 *  IMG_5090.jpeg -> artist-closeup.jpg  close-up portrait, "candlelight studio" rework:
 *                                       bright office shot -> low-key golden portrait with
 *                                       radial candle falloff + warm bokeh (hides background).
 *
 * Run: node scripts/process-new.js
 */
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const ROOT = path.join(__dirname, '..');
const OUT = path.join(ROOT, 'assets', 'img');

function vignetteSVG(w, h, strength = 0.6) {
  return Buffer.from(
    `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
       <defs>
         <radialGradient id="v" cx="50%" cy="44%" r="78%">
           <stop offset="50%" stop-color="#000" stop-opacity="0"/>
           <stop offset="100%" stop-color="#000" stop-opacity="${strength}"/>
         </radialGradient>
       </defs>
       <rect width="${w}" height="${h}" fill="url(#v)"/>
     </svg>`
  );
}

function warmSVG(w, h) {
  return Buffer.from(
    `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
       <defs>
         <linearGradient id="warm" x1="0" y1="1" x2="0" y2="0">
           <stop offset="0%" stop-color="#ff9d3c" stop-opacity="0.22"/>
           <stop offset="45%" stop-color="#ff8a2a" stop-opacity="0.10"/>
           <stop offset="100%" stop-color="#1a1206" stop-opacity="0.12"/>
         </linearGradient>
       </defs>
       <rect width="${w}" height="${h}" fill="url(#warm)"/>
     </svg>`
  );
}

async function grainPNG(w, h) {
  return sharp({
    create: { width: w, height: h, channels: 3, noise: { type: 'gaussian', mean: 128, sigma: 10 } },
  }).png().toBuffer();
}

async function finish(staged, outName, vig = 0.6) {
  const meta = await sharp(staged).metadata();
  const { width: w, height: h } = meta;
  const grain = await grainPNG(w, h);
  await sharp(staged)
    .composite([
      { input: warmSVG(w, h), blend: 'soft-light' },
      { input: grain, blend: 'overlay', opacity: 0.35 },
      { input: vignetteSVG(w, h, vig), blend: 'over' },
    ])
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(path.join(OUT, outName));
  const kb = Math.round(fs.statSync(path.join(OUT, outName)).size / 1024);
  console.log(`✓ ${outName}  ${w}x${h}  ${kb} KB`);
}

// ---------------------------------------------------------------- venue 0772
async function venue() {
  const src = path.join(ROOT, 'IMG_0772.jpeg');
  // Patch the extinguisher sign (red plaque, right wall) with blurred wall
  // texture taken from just left of it, then the usual light candle grade.
  const base = sharp(src).rotate();
  // The sign hangs on the black cabinet column: cover it with a blurred
  // sample of the same black surface taken from just below it.
  const patch = await base
    .clone()
    .extract({ left: 1572, top: 520, width: 100, height: 84 })
    .blur(5)
    .toBuffer();
  const patched = await base
    .composite([{ input: patch, left: 1572, top: 410 }])
    .toBuffer();
  const staged = await sharp(patched)
    .resize({ width: 2000, withoutEnlargement: true })
    .median(3)
    .blur(1.0)
    .modulate({ brightness: 1.05, saturation: 1.2, hue: 4 })
    .gamma(1.05)
    .toBuffer();
  await finish(staged, 'venue-candles.jpg');
}

// ---------------------------------------------- crowd duotones (0776 & 0775)
async function crowd(inName, outName, opts) {
  if (!fs.existsSync(path.join(ROOT, inName))) {
    // Audience originals are deleted from the repo after processing (privacy:
    // they must never be served untreated). Re-ask the user for the files.
    console.log(`· ${outName} skipped (${inName} not in repo)`);
    return;
  }
  const staged = await sharp(path.join(ROOT, inName))
    .rotate()
    .resize({ width: opts.w })
    .median(opts.median)
    .blur(opts.blur)
    .modulate({ brightness: opts.bri })
    .tint(opts.tint)
    .gamma(1.05)
    .toBuffer();
  await finish(staged, outName);
}

// ------------------------------------------------------------- closeup 5090
async function closeup() {
  const src = path.join(ROOT, 'IMG_5090.jpeg');
  // Crop 768x1360 -> head & torso, 4:5-ish
  // Dissolve the glass-wall logo (right side) into the bokeh before grading.
  const raw = await sharp(src).rotate().toBuffer();
  const logoBlur = await sharp(raw)
    .extract({ left: 570, top: 290, width: 198, height: 230 })
    .blur(18)
    .toBuffer();
  // sharp applies composite after extract/resize, so flatten the patch into
  // its own pass before cropping.
  const depatched = await sharp(raw)
    .composite([{ input: logoBlur, left: 570, top: 290 }])
    .toBuffer();
  const cropped = await sharp(depatched)
    .extract({ left: 0, top: 40, width: 768, height: 1000 })
    .resize({ width: 1000 })
    .toBuffer();
  const m = await sharp(cropped).metadata();
  const w = m.width, h = m.height;

  // Candlelight falloff: multiply with a radial gradient centred on the face.
  // Centre keeps full exposure; edges sink into deep amber-black, which
  // swallows the bright office background (and anything on it).
  const falloff = Buffer.from(
    `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
       <defs>
         <radialGradient id="f" cx="48%" cy="26%" r="76%">
           <stop offset="0%"  stop-color="#fff6e6"/>
           <stop offset="28%" stop-color="#efd3a4"/>
           <stop offset="58%" stop-color="#6f4a1e"/>
           <stop offset="100%" stop-color="#0f0902"/>
         </radialGradient>
       </defs>
       <rect width="${w}" height="${h}" fill="url(#f)"/>
     </svg>`
  );
  // Out-of-focus candle bokeh in the dark zones (screen blend = added light).
  const dot = (cx, cy, r, o) =>
    `<circle cx="${cx}" cy="${cy}" r="${r}" fill="url(#g)" opacity="${o}"/>`;
  const bokeh = Buffer.from(
    `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
       <defs>
         <radialGradient id="g">
           <stop offset="0%" stop-color="#ffcf8a" stop-opacity="0.9"/>
           <stop offset="45%" stop-color="#ff9d3c" stop-opacity="0.45"/>
           <stop offset="100%" stop-color="#ff9d3c" stop-opacity="0"/>
         </radialGradient>
       </defs>
       ${dot(0.08 * w, 0.88 * h, 0.075 * w, 1)}
       ${dot(0.17 * w, 0.95 * h, 0.05 * w, 0.9)}
       ${dot(0.04 * w, 0.70 * h, 0.04 * w, 0.7)}
       ${dot(0.90 * w, 0.90 * h, 0.07 * w, 1)}
       ${dot(0.97 * w, 0.76 * h, 0.045 * w, 0.75)}
       ${dot(0.82 * w, 0.98 * h, 0.055 * w, 0.85)}
       ${dot(0.94 * w, 0.32 * h, 0.03 * w, 0.45)}
       ${dot(0.05 * w, 0.34 * h, 0.025 * w, 0.4)}
       ${dot(0.25 * w, 0.99 * h, 0.04 * w, 0.7)}
       ${dot(0.70 * w, 0.99 * h, 0.035 * w, 0.6)}
     </svg>`
  );
  const grain = await grainPNG(w, h);
  await sharp(cropped)
    .modulate({ brightness: 1.0, saturation: 1.08, hue: 6 })
    .composite([
      { input: falloff, blend: 'multiply' },
      { input: warmSVG(w, h), blend: 'soft-light' },
      { input: bokeh, blend: 'screen' },
      { input: grain, blend: 'overlay', opacity: 0.3 },
      { input: vignetteSVG(w, h, 0.55), blend: 'over' },
    ])
    .gamma(1.08)
    .sharpen({ sigma: 1.1 })
    .jpeg({ quality: 86, mozjpeg: true })
    .toFile(path.join(OUT, 'artist-closeup.jpg'));
  const kb = Math.round(fs.statSync(path.join(OUT, 'artist-closeup.jpg')).size / 1024);
  console.log(`✓ artist-closeup.jpg  ${w}x${h}  ${kb} KB`);
}

// ------------------------------------------------- artist-1 sign removal
// Re-grades the original gallery shot (uploads dir, only alive this session)
// with the extinguisher sign patched out — same recipe as process-images.js.
async function artist1() {
  const src = '/root/.claude/uploads/266e6f90-c30a-5002-a119-a111e0a382c5/3bbcc164-IMG_0771.jpeg';
  if (!fs.existsSync(src)) { console.log('· artist-1 skipped (original gone)'); return; }
  const base = sharp(src).rotate();
  const patch = await base
    .clone()
    .extract({ left: 725, top: 370, width: 150, height: 95 })
    .blur(5)
    .toBuffer();
  const patched = await base
    .composite([{ input: patch, left: 722, top: 258 }])
    .toBuffer();
  const staged = await sharp(patched)
    .resize({ width: 1300, withoutEnlargement: true })
    .median(3)
    .blur(1.1)
    .modulate({ brightness: 1.05, saturation: 1.16, hue: 4 })
    .gamma(1.05)
    .toBuffer();
  await finish(staged, 'artist-1.jpg');
}

(async () => {
  await venue();
  await artist1();
  await crowd('IMG_0776.jpeg', 'concert-live.jpg', {
    w: 1900, median: 13, blur: 5.0, bri: 1.05, tint: { r: 235, g: 158, b: 92 },
  });
  await crowd('IMG_0775.jpeg', 'audience-full.jpg', {
    w: 1900, median: 13, blur: 5.0, bri: 1.05, tint: { r: 232, g: 150, b: 84 },
  });
  await closeup();
  console.log('done');
})().catch((e) => { console.error(e); process.exit(1); });
