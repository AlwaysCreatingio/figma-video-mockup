import { chromium } from "playwright";
import fs from "fs";
const TDIR = "/Users/stevenvan/figma-video-mockup/templates";
const D = "/private/tmp/claude-501/-Users-stevenvan/ce211123-7019-468e-b82b-ff09a2c11a05/scratchpad";
const tid = process.argv[2] || "3528-13235";
const src = fs.readFileSync(TDIR + "/T_" + tid.replace(/-/g, "_") + ".jsx", "utf8");
const HEAD = `<!doctype html><html><head>
<script src="https://unpkg.com/react@18/umd/react.development.js"></script>
<script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
<script src="https://unpkg.com/@babel/standalone@7.26.4/babel.min.js"></script>
<script src="https://cdn.tailwindcss.com"></script>
<link href="https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
<style>html,body{margin:0;background:transparent}#root{display:inline-block}*{font-family:'Geist',sans-serif}</style></head><body><div id="root"></div>`;
const html = HEAD + `
<script type="text/babel">window.TEMPLATES=[];window.__logoPicker=function(){};</script>
<script type="text/babel">${src}</script>
<script type="text/babel">const t=window.TEMPLATES[window.TEMPLATES.length-1];ReactDOM.createRoot(document.getElementById("root")).render(React.createElement(t.Component));</script>
<script>window.addEventListener("load",()=>setTimeout(()=>{
  const root=document.querySelector("#root>*");
  function pathOf(el){const idx=[];let n=el;while(n&&n!==root){const p=n.parentNode;idx.unshift([].indexOf.call(p.children,n));n=p;}return idx.join(".");}
  const slots=[].filter.call(root.querySelectorAll(".cursor-pointer"),s=>/Add video/.test(s.textContent));
  window.__SLOTS=slots.map(pathOf);
  window.__DONE=true;
},700));</script></body></html>`;

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1300, height: 1300 } });
await p.setContent(html, { waitUntil: "networkidle" });
await p.waitForFunction(() => window.__DONE, { timeout: 15000 });
const slots = await p.evaluate(() => window.__SLOTS);
await b.close();
console.log("video-slot paths:", slots);

async function up(file) {
  const buf = fs.readFileSync(file);
  const r = await fetch("http://localhost:5050/upload", { method: "POST", headers: { "Content-Type": "video/mp4", "X-Ext": "mp4" }, body: buf });
  return (await r.json()).id;
}
const ids = [await up(D + "/testA.mp4"), await up(D + "/testB.mp4")];
const videoSlots = slots.map((path, i) => ({ path, videoId: ids[i % ids.length] }));
const spec = { templateId: tid, width: null, height: null, overrides: {}, logos: [], videoSlots };
// width/height from template registration — read from file metadata
const meta = src.match(/width:\s*(\d+),\s*height:\s*(\d+)/);
spec.width = +meta[1]; spec.height = +meta[2];
console.log("spec:", { tid, W: spec.width, H: spec.height, slots: videoSlots.length });

const res = await fetch("http://localhost:5050/export", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(spec) });
if (!res.ok) { console.log("EXPORT FAILED", res.status, await res.text()); process.exit(1); }
const out = Buffer.from(await res.arrayBuffer());
fs.writeFileSync(D + "/export_out.mp4", out);
console.log("exported mp4 bytes:", out.length);
