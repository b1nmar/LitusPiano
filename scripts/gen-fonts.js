/* Parse the Google Fonts CSS, keep only the `latin` subset @font-face blocks
   (they cover Spanish accents + €), download each woff2 and emit an
   @font-face stylesheet with data: URIs for the Artifact preview. */
const fs = require('fs');
const https = require('https');

const css = fs.readFileSync('/tmp/allfonts.css', 'utf8');
const blocks = css.split('@font-face').slice(1).map(b => '@font-face' + b.slice(0, b.indexOf('}') + 1));

function get(url) {
  return new Promise((res, rej) => {
    https.get(url, r => {
      if (r.statusCode !== 200) return rej(new Error('status ' + r.statusCode + ' ' + url));
      const c = []; r.on('data', d => c.push(d)); r.on('end', () => res(Buffer.concat(c)));
    }).on('error', rej);
  });
}

(async () => {
  let out = '';
  for (const b of blocks) {
    if (!/U\+0000-00FF/.test(b)) continue; // latin subset only
    const fam = (b.match(/font-family:\s*'([^']+)'/) || [])[1];
    const wght = (b.match(/font-weight:\s*([^;]+);/) || [])[1].trim();
    const style = (b.match(/font-style:\s*([^;]+);/) || [])[1].trim();
    const url = (b.match(/url\((https:[^)]+\.woff2)\)/) || [])[1];
    const buf = await get(url);
    const data = 'data:font/woff2;base64,' + buf.toString('base64');
    out += `@font-face{font-family:'${fam}';font-style:${style};font-weight:${wght};font-display:swap;src:url(${data}) format('woff2');}\n`;
    console.log('embedded', fam, wght, style, Math.round(buf.length / 1024) + 'KB');
  }
  fs.writeFileSync('/tmp/fonts-embedded.css', out);
  console.log('wrote /tmp/fonts-embedded.css', Math.round(out.length / 1024) + 'KB');
})().catch(e => { console.error(e); process.exit(1); });
