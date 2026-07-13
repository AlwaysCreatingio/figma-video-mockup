/* Template 3532-13332 — Original vs Agent Opus (9:16) */
(function () {
  function Component(props) {
    const { useState } = React;
    const [vids, setVids] = useState(() => (props && props.preload && props.preload.vids) || {});
    React.useEffect(() => { window.__slotAPI = { setVids }; return () => { window.__slotAPI = null; }; }, []);
    const [logos, setLogos] = useState(() => (props && props.preload && props.preload.logos) || { logo1: window.__CLAUDE_LOGO, logo2: window.__CHANNELS_LOGO });
    const [logoBgs, setLogoBgs] = useState(() => (props && props.preload && props.preload.logoBgs) || {});
    const [logoScales, setLogoScales] = useState(() => (props && props.preload && props.preload.logoScales) || { logo1: 0.7 });
    const [logoBgDefault, setLogoBgDefault] = useState({});
    const [logosHidden, setLogosHidden] = useState(() => (props && props.preload && props.preload.logosHidden) || false);
    React.useEffect(() => { if (window.__slotAPI) { window.__slotAPI.setLogos = setLogos; window.__slotAPI.setLogoScales = setLogoScales; window.__slotAPI.setLogoBgs = setLogoBgs; window.__slotAPI.setLogosHidden = setLogosHidden; } }, []);
    React.useEffect(() => { if (window.__slotAPI) window.__slotAPI.logosHidden = logosHidden; }, [logosHidden]);
    React.useEffect(() => { let on = true; Object.keys(logos).forEach(k => { const u = logos[k]; if (u && window.__logoDominant) window.__logoDominant(u).then(c => { if (on && c) setLogoBgDefault(m => (m[k] === c ? m : { ...m, [k]: c })); }); }); return () => { on = false; }; }, [logos]);
    const __logoBg = (k) => (logoBgs[k] != null ? logoBgs[k] : (logoBgDefault[k] != null ? logoBgDefault[k] : (window.__LOGO_BG || {})[logos[k]]));
    const __logoScale = (k) => (logoScales[k] != null ? logoScales[k] : 1);
    const __openLogo = (k) => { if (window.__selectLogo) window.__selectLogo({ k, hasLogo: !!logos[k], uri: logos[k], bg: __logoBg(k) || "#ffffff", scale: __logoScale(k), setBg: v => setLogoBgs(m => ({ ...m, [k]: v })), setScale: v => setLogoScales(m => ({ ...m, [k]: v })), replace: () => { if (window.__logoPicker) window.__logoPicker(url => setLogos(l => ({ ...l, [k]: url }))); } }); else if (window.__logoPicker) window.__logoPicker(url => setLogos(l => ({ ...l, [k]: url }))); };
    const [titles, setTitles] = useState({ left: "Original", right: "Agent Opus" });
    const [boxText, setBoxText] = useState(() => (props && props.preload && props.preload.boxText) || {});
    const [textOn, setTextOn] = useState({});
    React.useEffect(() => { if (window.__slotAPI) window.__slotAPI.setBoxText = setBoxText; }, []);
    const pick = (accept, cb) => { const i = document.createElement("input"); i.type = "file"; i.accept = accept; i.onchange = e => { const f = e.target.files[0]; if (f) cb(URL.createObjectURL(f), (f.type||"").startsWith("image")); }; i.style.cssText='position:fixed;left:-9999px;top:-9999px;width:1px;height:1px;opacity:0';document.body.appendChild(i);i.addEventListener('change',function(){setTimeout(function(){i.remove();},0);},{once:true});i.click(); };
    const pickLogo = k => { if (window.__logoPicker) window.__logoPicker(url => setLogos(l => ({ ...l, [k]: url }))); };
    const LogoSlot = ({ k, className, style }) => (
      <div data-lslot={k} onClick={() => __openLogo(k)} className={'overflow-hidden cursor-pointer group flex items-center justify-center ' + (className || '')} style={{ ...(style || {}), ...(logos[k] && __logoBg(k) ? { backgroundColor: __logoBg(k) } : {}) }}>
        {logos[k]
          ? <img src={logos[k]} style={{ transform: 'scale(' + __logoScale(k) + ')', transformOrigin: 'center' }} className={"w-full h-full " + ((window.__FILL_LOGOS||[]).indexOf(logos[k])>=0 ? "object-cover" : "object-contain p-[10px]")} />
          : <span className="text-[11px] font-medium text-neutral-400 group-hover:text-neutral-600">logo</span>}
      </div>
    );
    const upload = (k) => { setTextOn(t => ({ ...t, [k]: false })); pick("video/*,image/*", (u, img) => setVids(v => ({ ...v, [k]: { url: u, img } }))); };
    const startText = (k) => { setTextOn(t => ({ ...t, [k]: true })); requestAnimationFrame(() => { const el = document.querySelector('[data-boxtext="' + k + '"]'); if (el) el.focus(); }); };
    const renderBox = (k) => {
      const hasText = !!(boxText[k] && boxText[k].length);
      const interactive = textOn[k] || hasText;
      return (
        <div className="aspect-[1080/1920] bg-white rounded-[20px] w-full overflow-hidden relative group">
          <div data-vslot={k} onClick={() => upload(k)} className="absolute inset-0 cursor-pointer flex items-center justify-center">
            {vids[k]
              ? (vids[k].img ? <img src={vids[k].url} className="w-full h-full object-cover" /> : <video src={vids[k].url} autoPlay loop muted playsInline className="w-full h-full object-cover" />)
              : null}
          </div>
          {/* text layer — a controlled input, so its value is captured in the export like the title fields */}
          <div className="absolute inset-0 z-10 flex items-center justify-center px-5" style={{ pointerEvents: interactive ? "auto" : "none" }}>
            <input data-boxtext={k} value={boxText[k] || ""} onChange={e => setBoxText(b => ({ ...b, [k]: e.target.value }))}
              className="w-full bg-transparent text-center outline-none text-[30px] font-medium leading-tight text-neutral-900" />
          </div>
          {/* hover-only placeholder — invisible by default so it never leaks into the export */}
          {!vids[k] && !hasText &&
            <div className="absolute inset-0 z-0 flex flex-col items-center justify-center gap-2 text-neutral-400 opacity-0 group-hover:opacity-100 transition pointer-events-none"><svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M10 9l5 3-5 3z" /></svg><span className="text-sm font-medium">Add video / text</span></div>}
          {/* mode switch (hover) */}
          <div data-ctl className="absolute top-2 right-2 z-20 flex gap-1 opacity-0 group-hover:opacity-100 transition">
            <button onClick={() => upload(k)} title="Video" className="w-7 h-7 rounded-lg bg-black/55 text-white flex items-center justify-center backdrop-blur hover:bg-black/75"><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg></button>
            <button onClick={() => startText(k)} title="Text" className="w-7 h-7 rounded-lg bg-black/55 text-white text-[13px] font-semibold flex items-center justify-center backdrop-blur hover:bg-black/75">Aa</button>
          </div>
        </div>
      );
    };
    return (
      <div className="relative bg-[#181818] overflow-hidden" style={{ width: 594, height: 1056 }}>
        <style>{`@property --ao-angle{syntax:"<angle>";initial-value:0deg;inherits:false}@keyframes ao-spin{to{--ao-angle:360deg}}.ao-glow::after{content:"";position:absolute;inset:-2px;border-radius:inherit;padding:2px;background:conic-gradient(from var(--ao-angle,0deg),transparent 0deg,rgba(255,255,255,.12) 70deg,#ffffff 140deg,rgba(255,255,255,.12) 210deg,transparent 300deg);-webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask-composite:exclude;animation:ao-spin 3s linear infinite;filter:drop-shadow(0 0 6px rgba(255,255,255,.6));pointer-events:none;z-index:2}`}</style>
        <div className="absolute inset-0 opacity-40" style={{ background: "radial-gradient(120% 80% at 50% -10%, rgba(255,87,10,.18), transparent 60%)" }} />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-[42px] items-center w-[522.941px]">
          {logosHidden
            ? (window.__EDITOR ? <button data-ctl onClick={() => setLogosHidden(false)} className="text-[11px] font-medium px-2.5 py-1 rounded-lg bg-neutral-800 text-white hover:bg-neutral-700">Show logos</button> : null)
            : <div data-logogroup className="relative group flex gap-[20px] items-center"><LogoSlot k="logo1" className="bg-white rounded-[15.75px] size-[90px]" /><div className="relative size-[34px]"><span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-[34px] leading-none font-light">+</span></div><LogoSlot k="logo2" className="bg-white rounded-[15.75px] size-[90px]" /><button data-ctl onClick={() => setLogosHidden(true)} className="absolute -top-8 right-0 opacity-0 group-hover:opacity-100 transition text-[11px] font-medium px-2.5 py-1 rounded-lg bg-neutral-800 text-white hover:bg-neutral-700">Hide logos</button></div>}
          <div className="flex gap-[40px]">
            <div className="flex flex-col gap-[20px] items-center w-[241.471px]"><input value={titles.left} onChange={e => setTitles(t => ({ ...t, left: e.target.value }))} className="bg-transparent text-center uppercase text-white font-medium text-[32px] tracking-[-0.16px] w-full outline-none" style={{ lineHeight: "1" }} />{renderBox("left")}</div>
            <div className="flex flex-col gap-[20px] items-center w-[241.471px]"><img src={window.__AO_LOGO} alt="Agent Opus" className="invert h-[34px] object-contain mx-auto" />{renderBox("right")}</div>
          </div>
          <p className="text-center font-medium text-[40px] tracking-[-0.2px]"><span className="text-white">Comment </span><span className="text-[#ff570a]">“Agent Opus”</span></p>
        </div>
      </div>
    );
  }
  window.TEMPLATES = window.TEMPLATES || [];
  window.TEMPLATES.push({ id: "3532-13332", name: "Original vs Agent Opus", width: 594, height: 1056, slots: 2, logoSlots: 2, desc: "9:16 before/after comparison", Component });
})();
