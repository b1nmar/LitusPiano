/* Build a single self-contained page for the Artifact preview:
   inline CSS + JS, embed images as data URIs, drop external webfont link. */
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..');

let html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
let css = fs.readFileSync(path.join(root, 'assets/css/styles.css'), 'utf8');
let js = fs.readFileSync(path.join(root, 'assets/js/main.js'), 'utf8');

// image data URIs
const imgDir = path.join(root, 'assets/img');
const imgs = {};
for (const f of fs.readdirSync(imgDir)) {
  imgs[f] = 'data:image/jpeg;base64,' + fs.readFileSync(path.join(imgDir, f)).toString('base64');
}
function swapImgs(s) {
  for (const f of Object.keys(imgs)) {
    s = s.split('assets/img/' + f).join(imgs[f]);
    s = s.split('../img/' + f).join(imgs[f]);
  }
  return s;
}
css = swapImgs(css);

// body inner html
const body = html.slice(html.indexOf('<body>') + 6, html.indexOf('</body>'));
let content = swapImgs(body)
  .replace(/\s*<script src="assets\/js\/main\.js"><\/script>/, '');

// embedded fonts for the preview (CSP blocks the Google Fonts <link>)
let fontsCss = '';
try { fontsCss = fs.readFileSync('/tmp/fonts-embedded.css', 'utf8'); } catch (e) {}

const out =
  '<style>\n' + fontsCss + '\n' + css + '\n</style>\n' +
  content + '\n' +
  '<script>\n' + js + '\n</script>\n';

const dest = process.argv[2] || path.join(root, 'preview.html');
fs.writeFileSync(dest, out);
console.log('wrote', dest, Math.round(out.length / 1024) + ' KB');
