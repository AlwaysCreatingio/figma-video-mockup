import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const files = process.argv.slice(2); // list of T_*.jsx paths
const OUT = '/private/tmp/claude-501/-Users-stevenvan/ce211123-7019-468e-b82b-ff09a2c11a05/scratchpad/renders';
fs.mkdirSync(OUT, { recursive: true });

const wrap = (tpl) => `<!doctype html><html><head>
<script src="https://unpkg.com/react@18/umd/react.development.js"></script>
<script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
<script src="https://unpkg.com/@babel/standalone@7.26.4/babel.min.js"></script>
<script src="https://cdn.tailwindcss.com"></script>
<link href="https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
<style>html,body{margin:0;background:#3a3a3a;font-family:'Geist',-apple-system,BlinkMacSystemFont,sans-serif;}#root{display:inline-block;}</style>
</head><body>
<div id="root"></div>
<script>${(() => { try { return fs.readFileSync('/Users/stevenvan/figma-video-mockup/_logos.js','utf8'); } catch { return ''; } })()}</script>
<script type="text/babel">window.TEMPLATES=[];</script>
<script type="text/babel">${tpl}</script>
<script type="text/babel">
const t=window.TEMPLATES[window.TEMPLATES.length-1];
if(t){ window.__H=t.height; window.__W=t.width;
  ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(t.Component)); }
</script>
</body></html>`;

const browser = await chromium.launch();
for (const f of files) {
  const id = path.basename(f).replace(/^T_|\.jsx$/g, '');
  const page = await browser.newPage({ viewport: { width: 1300, height: 1300 }, deviceScaleFactor: 2 });
  const errs = [];
  page.on('pageerror', e => errs.push(String(e).split('\n')[0]));
  await page.setContent(wrap(fs.readFileSync(f, 'utf8')), { waitUntil: 'networkidle' });
  await page.waitForTimeout(2200);
  const el = await page.$('#root > *');
  const out = path.join(OUT, id + '.png');
  if (el) await el.screenshot({ path: out });
  else await page.screenshot({ path: out, clip: { x: 0, y: 0, width: 600, height: 600 } });
  console.log(id, el ? 'ok' : 'NO-COMPONENT', errs.length ? '  ERRORS: ' + errs.join(' | ') : '');
  await page.close();
}
await browser.close();
