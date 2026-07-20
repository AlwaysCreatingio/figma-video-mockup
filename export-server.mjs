// MP4 export server: renders the design plate (Playwright) and composites videos into slots (FFmpeg).
import http from "http";
import fs from "fs";
import path from "path";
import os from "os";
import { fileURLToPath } from "url";
import { spawn } from "child_process";
import { chromium } from "playwright";

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const PORT = +(process.env.PORT || 5050);
// supersample factor for the design plate (and final video). 2 = crisp text; set EXPORT_SCALE=1
// on small hosts (e.g. Render free tier, 512 MB) where Chromium at 2x gets OOM-killed.
const SCALE = Math.max(1, +(process.env.EXPORT_SCALE || 2));
// keep Chromium alive inside slim containers: use disk instead of the tiny /dev/shm, and skip the
// sandbox (containers run as root, where the sandbox refuses to start)
const CHROME_ARGS = ["--disable-dev-shm-usage", "--no-sandbox", "--disable-gpu", "--no-zygote", "--renderer-process-limit=1"];
const TDIR = path.join(ROOT, "templates");
const WORK = path.join(os.tmpdir(), "figma-export");
fs.mkdirSync(WORK, { recursive: true });

// hosted instances run for weeks — sweep stale work files so the disk doesn't fill
setInterval(() => {
  const cutoff = Date.now() - 2 * 3600e3;
  for (const f of fs.readdirSync(WORK)) {
    try { const p = path.join(WORK, f); if (fs.statSync(p).mtimeMs < cutoff) fs.unlinkSync(p); } catch {}
  }
}, 30 * 60e3).unref();

const HEAD = `<!doctype html><html><head>
<script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
<script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
<script src="https://unpkg.com/@babel/standalone@7.26.4/babel.min.js"></script>
<script src="https://cdn.tailwindcss.com"></script>
<link href="https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700;800&family=Inter:wght@300;400;500;600;700;800&family=Poppins:wght@300;400;500;600;700;800&family=Montserrat:wght@300;400;500;600;700;800&family=Roboto:wght@300;400;500;700;900&family=Playfair+Display:wght@400;500;600;700;800;900&family=Bebas+Neue&family=Oswald:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<style>html,body{margin:0;background:transparent;}#root{display:inline-block;}*{font-family:'Geist',sans-serif;} @property --ao-a { syntax:'<angle>'; initial-value:0deg; inherits:false; } @keyframes ao-rot { to { --ao-a:360deg; } } .ao-glow::after{content:"";position:absolute;inset:0;border-radius:inherit;padding:3px;background:conic-gradient(from var(--ao-a),transparent 50%,rgba(255,255,255,.85) 74%,#fff 82%,transparent 92%);-webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask-composite:exclude;pointer-events:none;z-index:5;}</style>
</head><body><div id="root"></div>`;

const STYLE_PROPS = ["fontFamily","fontWeight","fontSize","color","textAlign","fontStyle","textDecoration","letterSpacing","backgroundColor","backgroundImage","opacity","borderRadius","top","right","bottom","left","transform","height","width","backgroundSize","display","borderColor","borderWidth","borderStyle","filter","lineHeight"];

let LOGOS_JS = "";
try { LOGOS_JS = fs.readFileSync(path.join(ROOT, "_logos.js"), "utf8"); } catch {}

function buildHtml(tplSrc, X) {
  return HEAD + `<script>${LOGOS_JS}</script>` +
`<script type="text/babel">window.TEMPLATES=[];window.__logoPicker=function(){};</script>
<script type="text/babel">${tplSrc}</script>
<script type="text/babel">
const t = window.TEMPLATES[window.TEMPLATES.length-1];
const __PRE = ${JSON.stringify({ labelText: X.labelText || {}, arrowOn: !!X.arrowOn })};
ReactDOM.createRoot(document.getElementById("root")).render(React.createElement(t.Component, { preload: __PRE }));
</script>
<script>
const X = ${JSON.stringify(X)};
const SP = ${JSON.stringify(STYLE_PROPS)};
function pathAt(root,p){ if(p==="")return root; let n=root; for(const i of p.split(".")){ if(!n)return null; n=n.children[+i]; } return n; }
function finalize(){
  // paths from the client are relative to its container (which wraps the template as child 0),
  // so use #root as the base here — #root also has the template as its only child.
  const base = document.getElementById("root");
  const frame = base && base.firstElementChild;
  if(!frame){ return setTimeout(finalize, 60); }
  // records predating the always-present ambient placeholder used child indexes without it — shift them
  { const ph = frame.firstElementChild;
    if (ph && ph.tagName === "DIV" && ph.className === "hidden" && Object.keys(X.overrides||{}).some(k => /^0\.0(\.|$)/.test(k))) {
      const out = {};
      for (const k in X.overrides) {
        if (k !== "__bgBlur" && /^0\.\d/.test(k)) { const p = k.split("."); p[1] = String(+p[1] + 1); out[p.join(".")] = X.overrides[k]; }
        else out[k] = X.overrides[k];
      }
      X.overrides = out;
    } }
  // user-added layers render into the same trailing container the editor uses
  if (Array.isArray(X.customLayers) && X.customLayers.length) {
    const wrap = document.createElement("div");
    wrap.setAttribute("data-custom", "1");
    wrap.style.cssText = "position:absolute;inset:0;pointer-events:none;z-index:15";
    X.customLayers.forEach(function (cl) {
      const el = document.createElement(cl.img ? "img" : "p");
      el.setAttribute("data-cl", cl.id || "");
      if (cl.img) { el.setAttribute("src", cl.img); }
      else { el.textContent = cl.text || ""; }
      el.style.position = "absolute"; el.style.margin = "0";
      for (const k in (cl.style || {})) el.style[k] = cl.style[k];
      wrap.appendChild(el);
    });
    frame.appendChild(wrap);
  }
  // apply text + style overrides
  for(const p in X.overrides){ const el=pathAt(base,p); if(!el)continue; const o=X.overrides[p];
    if(el.tagName==="INPUT"){ if(o.text!=null){ el.value=o.text; el.setAttribute("value",o.text); } }
    else if(o.html!=null && o.text==null && !(el.querySelector && el.querySelector("[data-vslot], [data-lslot], [data-custom], video"))) el.innerHTML=String(o.html).replace(/outline(-offset)?:\s*[^;"']*;?/gi, "");
    else if(o.text!=null) el.textContent=o.text;
    if(o.style) for(const k of SP) if(o.style[k]!=null) el.style[k]=o.style[k];
  }
  // legacy bubble captions hidden without the intentional-hide marker: make them visible
  frame.querySelectorAll('[data-bubble] span').forEach(s => { if(s.style.display==="none" && !s.hasAttribute("data-caphide")) s.style.display="inline-block"; });
  // set logos (matched by stable data-lslot id) — background tint + per-logo scale mirror the editor
  for(const l of X.logos){ const el=frame.querySelector('[data-lslot="'+l.slot+'"]'); if(!el)continue;
    const fit=l.fit||"cover", pad=fit==="cover"?"0":"10px", sc=(l.scale!=null?l.scale:1);
    if(l.bg) el.style.backgroundColor=l.bg;
    if(l.border) { el.style.border=(l.borderW || 2)+"px solid "+l.border; el.style.boxSizing="border-box"; } else if(l.border===null) el.style.border="none";
    if(l.radius != null) el.style.borderRadius=l.radius+"px";
    el.innerHTML='<img src="'+l.uri+'" style="width:100%;height:100%;object-fit:'+fit+';padding:'+pad+';box-sizing:border-box;transform:scale('+sc+');transform-origin:center">'; }
  // editor-only affordances never belong in the export
  frame.querySelectorAll("[data-ctl]").forEach(e => e.remove());
  // hide-all-logos: drop the whole logo group so the layout re-centers with no gap
  if (X.logosHidden) frame.querySelectorAll("[data-logogroup]").forEach(e => e.remove());
  // drop removed logo tiles (client sends the slots still visible), then reconcile the "+" count
  if (Array.isArray(X.visibleLogos)) {
    frame.querySelectorAll("[data-lslot]").forEach(el => { if (X.visibleLogos.indexOf(el.getAttribute("data-lslot")) < 0) el.remove(); });
  }
  { const pluses = Array.from(frame.querySelectorAll("[data-plus]"));
    if (pluses.length) { const row = pluses[0].parentElement; const tiles = row ? row.querySelectorAll("[data-lslot]").length : 0;
      const keep = X.showPlus === false ? 0 : Math.max(0, tiles - 1);
      pluses.slice(keep).forEach(e => e.remove()); } }
  // scrolling prompt text: capture geometry, then blank it from the plate (composited as an animated crop)
  const st = frame.querySelector("[data-scrolltext]");
  if (st && st.firstElementChild) {
    const inner = st.firstElementChild;
    inner.style.transform = "none";
    const r = st.getBoundingClientRect();
    if (inner.scrollHeight > 4 && r.width > 4) {
      window.__SCROLLTXT = { x: Math.round(r.left), y: Math.round(r.top), w: Math.round(r.width), h: Math.round(r.height), full: Math.round(inner.scrollHeight) };
      inner.style.visibility = "hidden";
    }
  }
  // record the frame's own background, then make it transparent so slot holes fall through to the
  // ffmpeg base layer (painted with this colour). Decorative children/gradients stay in the plate.
  window.__FRAMEBG = getComputedStyle(frame).backgroundColor;
  window.__HASBGIMG = getComputedStyle(frame).backgroundImage !== "none";
  window.__BGIMG_INLINE = frame.style.backgroundImage;
  frame.style.backgroundColor = "transparent";
  frame.style.backgroundImage = "none";
  // Cut each video slot into a TRANSPARENT, ROUNDED hole (no chroma key). We capture the rect + a
  // rounded-corner alpha mask so ffmpeg can round the composited video — nothing magenta ever exists,
  // so there is no fringe/purple and translucent overlays render correctly.
  function rr(ctx, x, y, w, h, r){ r = Math.min(r, w/2, h/2); ctx.beginPath(); ctx.moveTo(x+r,y); ctx.arcTo(x+w,y,x+w,y+h,r); ctx.arcTo(x+w,y+h,x,y+h,r); ctx.arcTo(x,y+h,x,y,r); ctx.arcTo(x,y,x+w,y,r); ctx.closePath(); }
  function measure(attempt){
    const rects=[]; let ok=true;
    for(const s of X.videoSlots){ const el=frame.querySelector('[data-vslot="'+s.slot+'"]'); if(!el){ ok=false; continue; }
      const r=el.getBoundingClientRect();
      if(r.width<2 || r.height<2){ ok=false; }
      const radius=parseFloat(getComputedStyle(el).borderTopLeftRadius)||0;
      const w=Math.round(r.width/2)*2, h=Math.round(r.height/2)*2, S=2;
      const c=document.createElement("canvas"); c.width=w*S; c.height=h*S;
      const ctx=c.getContext("2d"); ctx.fillStyle="#000"; ctx.fillRect(0,0,c.width,c.height);
      ctx.fillStyle="#fff"; rr(ctx,0,0,c.width,c.height,radius*S); ctx.fill();
      rects.push({ slot:s.slot, videoId:s.videoId, x:Math.round(r.left), y:Math.round(r.top), w, h, bg:getComputedStyle(el).backgroundColor, mask:c.toDataURL("image/png") });
      // punch the hole
      el.innerHTML=''; el.style.background='transparent'; el.style.backgroundImage='none'; el.style.opacity='1';
    }
    if(!ok && attempt<15){ return setTimeout(()=>measure(attempt+1), 200); }
    window.__RECTS = rects;
    setTimeout(()=>{ window.__DONE = true; }, 300);
  }
  measure(0);
}
window.addEventListener("load", ()=>setTimeout(finalize, 600));
</script></body></html>`;
}

function run(cmd, args) {
  return new Promise((res, rej) => {
    const p = spawn(cmd, args);
    let err = "";
    p.stderr.on("data", d => { err += d; });
    p.on("close", c => c === 0 ? res(err) : rej(new Error(cmd + " exited " + c + "\n" + err.slice(-1500))));
  });
}
function probeDur(file) {
  return new Promise((res) => {
    const p = spawn("ffprobe", ["-v","error","-show_entries","format=duration,format_name","-of","json", file]);
    let out = ""; p.stdout.on("data", d => out += d);
    p.on("close", () => {
      try {
        const f = (JSON.parse(out).format) || {};
        // stills (or images with stray duration metadata) must not drive the clip length
        if (/image2|_pipe|jpeg|png|webp/.test(f.format_name || "")) return res(0);
        res(parseFloat(f.duration) || 0);
      } catch (e) { res(0); }
    });
  });
}
function hasAudio(file) {
  return new Promise((res) => {
    const p = spawn("ffprobe", ["-v","error","-select_streams","a","-show_entries","stream=index","-of","csv=p=0", file]);
    let out = ""; p.stdout.on("data", d => out += d);
    p.on("close", () => res(out.trim().length > 0));
  });
}

// one long-lived browser + context: skips per-export Chromium startup and keeps the HTTP cache,
// so the CDN scripts/fonts load from cache after the first export. Recreated on crash.
let BROWSER = null, CTX = null;
async function getContext() {
  if (BROWSER && BROWSER.isConnected() && CTX) return CTX;
  try { if (BROWSER) await BROWSER.close(); } catch {}
  BROWSER = await chromium.launch({ args: CHROME_ARGS });
  CTX = await BROWSER.newContext({ deviceScaleFactor: SCALE, viewport: { width: 1280, height: 800 } });
  return CTX;
}

async function renderPlate(templateId, X, W, H, plateOut) {
  const file = path.join(TDIR, "T_" + templateId.replace(/-/g, "_") + ".jsx");
  const tplSrc = fs.readFileSync(file, "utf8");
  const html = buildHtml(tplSrc, X);
  let page;
  try {
    const ctx = await getContext();
    page = await ctx.newPage();
  } catch (e) {
    BROWSER = null; CTX = null;                      // stale after a crash — relaunch once
    const ctx = await getContext();
    page = await ctx.newPage();
  }
  try {
    await page.setViewportSize({ width: W + 40, height: H + 40 });
    await page.setContent(html, { waitUntil: "networkidle" });
    await page.waitForFunction(() => window.__DONE === true, { timeout: 20000 });
    const rects = await page.evaluate(() => window.__RECTS);
    const frameBg = await page.evaluate(() => window.__FRAMEBG);
    const el = await page.$("#root > *");
    await el.screenshot({ path: plateOut, omitBackground: true });
    const scroll = await page.evaluate(() => window.__SCROLLTXT || null);
    let bgPlate = null;
    if (await page.evaluate(() => window.__HASBGIMG)) {
      await page.evaluate(() => {
        const frame = document.getElementById("root").firstElementChild;
        frame.style.backgroundImage = window.__BGIMG_INLINE || "";
        frame.style.backgroundColor = window.__FRAMEBG;
        Array.from(frame.children).forEach(c => { c.style.visibility = "hidden"; });
      });
      bgPlate = plateOut.replace(/\.png$/, "_bg.png");
      await el.screenshot({ path: bgPlate });
    }
    let txtPlate = null;
    if (scroll) {
      await page.evaluate(() => {
        const frame = document.getElementById("root").firstElementChild;
        const st2 = frame.querySelector("[data-scrolltext]");
        const inner = st2.firstElementChild;
        frame.style.backgroundColor = "transparent"; frame.style.backgroundImage = "none";
        frame.querySelectorAll("*").forEach(e => { e.style.visibility = "hidden"; });
        let n = inner; while (n && n !== frame.parentElement) { n.style.visibility = "visible"; n.style.overflow = "visible"; n.style.backgroundColor = "transparent"; n.style.backgroundImage = "none"; n.style.border = "none"; n = n.parentElement; }
        inner.querySelectorAll("*").forEach(e => { e.style.visibility = "visible"; });
        inner.style.transform = "none";
        window.__TXT_EL = inner;
      });
      const h = await page.evaluateHandle(() => window.__TXT_EL);
      txtPlate = plateOut.replace(/\.png$/, "_txt.png");
      await h.asElement().screenshot({ path: txtPlate, omitBackground: true });
    }
    return { rects, frameBg, bgPlate, scroll, txtPlate };
  } finally { try { await page.close(); } catch {} }
}

function cssToHex(c) {
  const m = (c || "").match(/\d+(\.\d+)?/g);
  if (!m || m.length < 3 || (m[3] != null && +m[3] === 0)) return "0x101010";
  const [r, g, b] = m.map(Number);
  return "0x" + [r, g, b].map(v => Math.round(v).toString(16).padStart(2, "0")).join("");
}

async function composite(W, H, rects, videoFiles, plate, outFile, ambient, ambientFile, frameBg, mediaXf, bgPlate, scroll, txtPlate, durationSec) {
  // bound output to the shortest clip so the looped plate/color source can't run forever
  const durs = await Promise.all(videoFiles.map(probeDur));
  const ambDur = ambient ? await probeDur(ambientFile) : 0;
  const finite = durs.filter(d => d > 0);
  let DUR = Math.max(0.5, Math.min(...(finite.length ? finite : [ambDur > 0 ? ambDur : 4])));
  const wantDur = +durationSec > 0 ? Math.min(+durationSec, 300) : 0;
  if (wantDur) DUR = wantDur;   // chosen output length: shorter clips loop, longer ones trim
  const S = SCALE;                // plate is rendered at SCALE x (deviceScaleFactor) — supersample for crisp text/edges
  const OW = W * S, OH = H * S;
  // write each slot's rounded-corner alpha mask to disk
  const maskFiles = rects.map((r, i) => { const f = path.join(WORK, "mask_" + Date.now() + "_" + i + ".png"); fs.writeFileSync(f, Buffer.from(r.mask.split(",")[1], "base64")); return f; });
  const nVid = rects.length;
  const args = ["-y"];
  rects.forEach((r, i) => {
    if (durs[i] === 0) args.push("-loop", "1");
    else if (wantDur && durs[i] < wantDur - 0.05) args.push("-stream_loop", "-1");
    args.push("-i", videoFiles[i]);
  }); // 0..nVid-1 videos
  maskFiles.forEach(f => { args.push("-loop", "1", "-i", f); });                                            // nVid..2n-1 masks
  if (ambient) { if (ambDur === 0) args.push("-loop", "1"); args.push("-i", ambientFile); }
  args.push("-loop", "1", "-i", plate);
  if (bgPlate) args.push("-loop", "1", "-i", bgPlate);
  if (scroll && txtPlate) args.push("-loop", "1", "-i", txtPlate);
  const ambIdx = ambient ? nVid * 2 : -1;
  const plateIdx = nVid * 2 + (ambient ? 1 : 0);
  const bgIdx = bgPlate ? plateIdx + 1 : -1;
  const txtIdx = (scroll && txtPlate) ? (bgPlate ? bgIdx + 1 : plateIdx + 1) : -1;
  const fc = [];
  // base = the frame's own background colour (so rounded-corner gaps match the design); ambient adds blur
  fc.push(`color=c=${cssToHex(frameBg)}:s=${OW}x${OH}:r=30:d=${DUR.toFixed(2)}[base]`);
  let last = "base";
  if (bgPlate) { fc.push(`[base][${bgIdx}:v]overlay=0:0[bgp]`); last = "bgp"; }
  if (ambient) {
    const sigma = Math.max(8, Math.round((ambient.blur || 60) / 2) * S);
    const op = Math.min(1, Math.max(0, ambient.opacity != null ? ambient.opacity : 0.3));
    fc.push(`[${ambIdx}:v]setpts=PTS-STARTPTS,scale=${OW}:${OH}:force_original_aspect_ratio=increase,crop=${OW}:${OH},gblur=sigma=${sigma},format=yuva420p,colorchannelmixer=aa=${op.toFixed(2)}[amb]`);
    fc.push(`[base][amb]overlay=0:0:eof_action=repeat[bg0]`);
    last = "bg0";
  }
  // each video: fill its slot (honouring per-slot pan/zoom), round its corners with the slot mask, overlay
  rects.forEach((r, i) => {
    const x = r.x * S, y = r.y * S, w = r.w * S, h = r.h * S;
    const t = (mediaXf && mediaXf[r.slot]) || null;
    const zs = t && t.s ? Math.max(0.25, t.s) : 1;
    const ox = t ? Math.round((t.x || 0) * S) : 0, oy = t ? Math.round((t.y || 0) * S) : 0;
    const zw = Math.round(w * zs / 2) * 2, zh = Math.round(h * zs / 2) * 2;
    if (zs < 1) {
      // shrunk below 100%: scale the WHOLE source down from its cover size (revealing more of
      // it as it shrinks), then crop any overflow and pad the rest with the slot background
      fc.push(`[${i}:v]setpts=PTS-STARTPTS,` +
        `scale=w='trunc((${zs.toFixed(4)}*max(${w}\,${h}*iw/ih))/2)*2':h=-2,` +
        `crop=w='min(iw,${w})':h='min(ih,${h})':x='clip((iw-out_w)/2-(${ox}),0,iw-out_w)':y='clip((ih-out_h)/2-(${oy}),0,ih-out_h)',` +
        `pad=${w}:${h}:x='clip((out_w-in_w)/2+(${ox}),0,out_w-in_w)':y='clip((out_h-in_h)/2+(${oy}),0,out_h-in_h)':color=${cssToHex(r.bg)},setsar=1,format=yuva420p[vc${i}]`);
    } else if (t && t.fit === "fit") {
      // whole video visible: scale down to fit, pan within the letterbox, pad with the slot bg
      const sw = Math.round(w * zs / 2) * 2, sh = Math.round(h * zs / 2) * 2;
      fc.push(`[${i}:v]setpts=PTS-STARTPTS,scale=${sw}:${sh}:force_original_aspect_ratio=decrease,` +
        `crop=w='min(iw,${w})':h='min(ih,${h})':x='clip((iw-out_w)/2-(${ox}),0,iw-out_w)':y='clip((ih-out_h)/2-(${oy}),0,ih-out_h)',` +
        `pad=${w}:${h}:x='clip((out_w-in_w)/2+(${ox}),0,out_w-in_w)':y='clip((out_h-in_h)/2+(${oy}),0,out_h-in_h)':color=${cssToHex(r.bg)},setsar=1,format=yuva420p[vc${i}]`);
    } else if (t && t.fit === "contain") {
      // Inset: uniform padding on all four sides; the video covers the inner rect (cropped minimally)
      const pd = Math.round((t.pad != null ? t.pad : 14) * S);
      const iw = Math.max(2, Math.round((w - 2 * pd) / 2) * 2), ih = Math.max(2, Math.round((h - 2 * pd) / 2) * 2);
      const ziw = Math.round(iw * zs / 2) * 2, zih = Math.round(ih * zs / 2) * 2;
      fc.push(`[${i}:v]setpts=PTS-STARTPTS,scale=${ziw}:${zih}:force_original_aspect_ratio=increase,crop=${iw}:${ih}:x='clip((in_w-out_w)/2-(${ox}),0,in_w-out_w)':y='clip((in_h-out_h)/2-(${oy}),0,in_h-out_h)',pad=${w}:${h}:${(w - iw) / 2}:${(h - ih) / 2}:color=${cssToHex(r.bg)},setsar=1,format=yuva420p[vc${i}]`);
    } else {
      fc.push(`[${i}:v]setpts=PTS-STARTPTS,scale=${zw}:${zh}:force_original_aspect_ratio=increase,crop=${w}:${h}:x='clip((in_w-out_w)/2-(${ox}),0,in_w-out_w)':y='clip((in_h-out_h)/2-(${oy}),0,in_h-out_h)',setsar=1,format=yuva420p[vc${i}]`);
    }
    fc.push(`[${nVid + i}:v]scale=${w}:${h},format=gray[mk${i}]`);
    fc.push(`[vc${i}][mk${i}]alphamerge[vr${i}]`);
    fc.push(`[${last}][vr${i}]overlay=${x}:${y}:eof_action=repeat[s${i}]`);
    last = `s${i}`;
  });
  // the design plate (slots are transparent holes) goes straight on top — no colour keying at all
  fc.push(`[${last}][${plateIdx}:v]overlay=0:0[${txtIdx >= 0 ? "pl" : "out"}]`);
  if (txtIdx >= 0) {
    const bw = scroll.w * S, bh = scroll.h * S, fh = scroll.full * S;
    if (fh > bh + 2) {
      // window slides down the full text over the clip's duration, mirroring the live preview
      const rate = (fh - bh) / DUR;   // the scroll always lands exactly at the clip's end
      fc.push(`[${txtIdx}:v]crop=${bw}:${bh}:0:'min(${fh - bh},${rate.toFixed(4)}*t)'[txt]`);
      fc.push(`[pl][txt]overlay=${scroll.x * S}:${scroll.y * S}[out]`);
    } else {
      fc.push(`[pl][${txtIdx}:v]overlay=${scroll.x * S}:${scroll.y * S}[out]`);
    }
  }
  // audio: every slot video that has a track AND isn't muted in the editor contributes;
  // two or more get mixed, one maps straight through, zero exports silent
  const audioFlags = await Promise.all(videoFiles.map(hasAudio));
  const audible = rects.map((r, i) => (audioFlags[i] && !((mediaXf || {})[r.slot] || {}).mute) ? i : -1).filter(i => i >= 0);
  if (audible.length) {
    audible.forEach(i => fc.push(`[${i}:a]asetpts=PTS-STARTPTS[a${i}]`));
    if (audible.length > 1) fc.push(audible.map(i => `[a${i}]`).join("") + `amix=inputs=${audible.length}:duration=longest[aout]`);
  }
  args.push("-filter_complex", fc.join(";"), "-map", "[out]");
  if (audible.length > 1) args.push("-map", "[aout]", "-c:a", "aac", "-b:a", "160k");
  else if (audible.length === 1) args.push("-map", `[a${audible[0]}]`, "-c:a", "aac", "-b:a", "160k");
  args.push("-t", DUR.toFixed(2), "-c:v", "libx264", "-preset", "veryfast", "-crf", "23",
    "-pix_fmt", "yuv420p", "-r", "30", "-movflags", "+faststart");
  if (!audible.length) args.push("-an");
  args.push(outFile);
  await run("ffmpeg", args);
}

function cors(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, X-Ext");
}
function readBody(req) { return new Promise((res) => { const c = []; req.on("data", d => c.push(d)); req.on("end", () => res(Buffer.concat(c))); }); }

// one export at a time — Chromium + FFmpeg together already push small hosts to the memory limit
let exportChain = Promise.resolve();
function enqueue(fn) { const p = exportChain.then(fn, fn); exportChain = p.then(() => {}, () => {}); return p; }

const server = http.createServer(async (req, res) => {
  cors(res);
  if (req.method === "OPTIONS") { res.writeHead(204); return res.end(); }
  try {
    if (req.method === "POST" && req.url === "/upload") {
      const buf = await readBody(req);
      const ext = (req.headers["x-ext"] || "mp4").replace(/[^a-z0-9]/gi, "");
      const id = "v" + Date.now() + "_" + Math.floor(Math.random() * 1e6);
      const f = path.join(WORK, id + "." + ext);
      fs.writeFileSync(f, buf);
      res.writeHead(200, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ id: path.basename(f) }));
    }
    if (req.method === "POST" && req.url === "/compress") {
      const buf = await readBody(req);
      const ext = (req.headers["x-ext"] || "mp4").replace(/[^a-z0-9]/gi, "");
      const inF = path.join(WORK, "c_in_" + Date.now() + "." + ext);
      const outF = path.join(WORK, "c_out_" + Date.now() + ".mp4");
      fs.writeFileSync(inF, buf);
      await run("ffmpeg", ["-y", "-i", inF, "-vf", "scale='min(1920,iw)':-2", "-c:v", "libx264", "-preset", "veryfast", "-crf", "25", "-c:a", "aac", "-b:a", "128k", "-movflags", "+faststart", outF]);
      let data = fs.readFileSync(outF);
      if (data.length > 45 * 1024 * 1024) {
        const outF2 = outF.replace(".mp4", "_2.mp4");
        await run("ffmpeg", ["-y", "-i", outF, "-vf", "scale='min(1280,iw)':-2", "-c:v", "libx264", "-preset", "veryfast", "-crf", "30", "-c:a", "aac", "-b:a", "96k", "-movflags", "+faststart", outF2]);
        data = fs.readFileSync(outF2);
      }
      res.writeHead(200, { "Content-Type": "video/mp4", "Content-Length": data.length });
      return res.end(data);
    }
    if (req.method === "POST" && req.url === "/export") {
      const spec = JSON.parse((await readBody(req)).toString());
      const { templateId, width: W, height: H, overrides = {}, logos = [], videoSlots = [], ambient = null, showPlus = true, visibleLogos = null, logosHidden = false, labelText = {}, arrowOn = false, scrollSpeed = 1, durationSec = null, customLayers = [], mediaXf = {} } = spec;
      const data = await enqueue(async () => {
        const plate = path.join(WORK, "plate_" + Date.now() + ".png");
        const { rects, frameBg, bgPlate, scroll, txtPlate } = await renderPlate(templateId, { overrides, logos, videoSlots, ambient, showPlus, visibleLogos, logosHidden, labelText, arrowOn, customLayers }, W, H, plate);
        if (scroll) scroll.speed = +scrollSpeed || 1;
        const videoFiles = rects.map(r => path.join(WORK, r.videoId));
        const ambientFile = ambient ? path.join(WORK, ambient.videoId) : null;
        const out = path.join(WORK, "out_" + Date.now() + ".mp4");
        await composite(W, H, rects, videoFiles, plate, out, ambient, ambientFile, frameBg, mediaXf, bgPlate, scroll, txtPlate, durationSec);
        return fs.readFileSync(out);
      });
      res.writeHead(200, { "Content-Type": "video/mp4", "Content-Length": data.length });
      return res.end(data);
    }
    if (req.method === "GET" && (req.url === "/health" || req.url === "/")) { res.writeHead(200, { "Content-Type": "text/plain" }); return res.end("ok"); }
    res.writeHead(404); res.end("not found");
  } catch (e) {
    console.error(e);
    res.writeHead(500, { "Content-Type": "text/plain" }); res.end(String(e.message || e));
  }
});
server.listen(PORT, () => console.log("export server on http://localhost:" + PORT));
