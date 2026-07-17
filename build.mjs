// Builds the static dashboard by concatenating the head, every self-registering template
// (T_*.jsx, each wrapped in a text/babel script), and the tail. In-browser Babel transpiles
// the JSX at runtime, so there's no compile step — this is just concatenation.
// Output: public/index.html + public/_logos.js (what Vercel serves), and dashboard.html at the
// repo root (kept for the local `python3 -m http.server` workflow).
import fs from "fs";
import path from "path";

const TDIR = "templates";
const head = fs.readFileSync(path.join(TDIR, "_dashboard.head.html"), "utf8");
const tail = fs.readFileSync(path.join(TDIR, "_dashboard.tail.html"), "utf8");
const templates = fs.readdirSync(TDIR).filter(f => /^T_.*\.jsx$/.test(f)).sort();

// cache-bust the logos bundle so embedded assets always match the page code
const logosVer2 = fs.statSync("_logos.js").mtimeMs.toFixed(0);
let html = head.replace('src="/_logos.js"', 'src="/_logos.js?v=' + logosVer2 + '"');
for (const f of templates) {
  html += `\n<script type="text/babel">\n` + fs.readFileSync(path.join(TDIR, f), "utf8") + `\n</script>\n`;
}
html += tail;

fs.mkdirSync("public", { recursive: true });
fs.writeFileSync("public/index.html", html);
fs.copyFileSync("_logos.js", "public/_logos.js");
// brand-guidelines assets (served at /brand/*)
if (fs.existsSync("brand")) {
  fs.mkdirSync("public/brand", { recursive: true });
  for (const f of fs.readdirSync("brand")) fs.copyFileSync(path.join("brand", f), path.join("public/brand", f));
}
if (fs.existsSync("_supabase.js")) fs.copyFileSync("_supabase.js", "public/_supabase.js");
fs.writeFileSync("dashboard.html", html); // local dev convenience

// /demos works as a plain path: tiny stubs redirect to the hash route.
const redirect = (to) =>
  `<!doctype html><meta charset="utf-8"><script>location.replace(${JSON.stringify(to)});</script>`;
fs.mkdirSync("public/demos", { recursive: true });
fs.writeFileSync("public/demos/index.html", redirect("/#/demos"));
fs.mkdirSync("demos", { recursive: true });                          // local python server
fs.writeFileSync("demos/index.html", redirect("/dashboard.html#/demos"));

console.log(`Built public/index.html from ${templates.length} templates.`);
