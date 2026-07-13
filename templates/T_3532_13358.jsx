/* Template 3532-13358 — 9:16 "Comment Agent Opus" Giveaway Mockup (framed) */
(function () {
  function Component(props) {
    const { useState } = React;

    const [vids, setVids] = useState(() => (props && props.preload && props.preload.vids) || {});
    React.useEffect(() => { window.__slotAPI = { setVids }; return () => { window.__slotAPI = null; }; }, []);
    const pick = k => { const i=document.createElement('input'); i.type='file'; i.accept='video/*,image/*'; i.onchange=e=>{const f=e.target.files[0]; if(f) setVids(v=>({...v,[k]:{url:URL.createObjectURL(f),img:(f.type||"").startsWith("image")}}));}; i.style.cssText='position:fixed;left:-9999px;top:-9999px;width:1px;height:1px;opacity:0'; document.body.appendChild(i); i.addEventListener('change',function(){setTimeout(function(){i.remove();},0);},{once:true}); i.click(); };
    const Slot = ({ k, className, style }) => (
      <div data-vslot={k} onClick={() => pick(k)} className={'overflow-hidden cursor-pointer group flex items-center justify-center ' + (className || '')} style={style}>
        {vids[k] ? (vids[k].img ? <img src={vids[k].url} className="w-full h-full object-cover" /> : <video src={vids[k].url} autoPlay loop muted playsInline className="w-full h-full object-cover" />)
        : <div className="flex flex-col items-center justify-center gap-1 text-neutral-400 group-hover:text-neutral-600"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M10 9l5 3-5 3z" /></svg><span className="text-xs font-medium">Add video</span></div>}
      </div>
    );
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
    const pickLogo = k => { if (window.__logoPicker) window.__logoPicker(url => setLogos(l => ({ ...l, [k]: url }))); };
    const LogoSlot = ({ k, className, style }) => (
      <div data-lslot={k} onClick={() => __openLogo(k)} className={'overflow-hidden cursor-pointer group flex items-center justify-center ' + (className || '')} style={{ ...(style || {}), ...(logos[k] && __logoBg(k) ? { backgroundColor: __logoBg(k) } : {}) }}>
        {logos[k] ? <img src={logos[k]} style={{ transform: 'scale(' + __logoScale(k) + ')', transformOrigin: 'center' }} className={"w-full h-full " + ((window.__FILL_LOGOS||[]).indexOf(logos[k])>=0 ? "object-cover" : "object-contain p-[10px]")} /> : <span className="text-[11px] font-medium text-neutral-400 group-hover:text-neutral-600">logo</span>}
      </div>
    );

    return (
      <div className="relative overflow-hidden bg-[#101010]" style={{ width: 594, height: 1056 }}>
        {/* ambient blurred backdrop keyed to the main video */}
        {(() => { const __a = vids["slotMAIN"]; return __a ? (__a.img
          ? <img src={__a.url} className="absolute inset-0 w-full h-full object-cover blur-[60px] opacity-30 scale-110 pointer-events-none" />
          : <video src={__a.url} autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover blur-[60px] opacity-30 scale-110 pointer-events-none" />) : <div className="hidden" />; })()}

        {/* centered framed column */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-[42px]">
          {/* logo tile row */}
          {logosHidden
            ? (window.__EDITOR ? <button data-ctl onClick={() => setLogosHidden(false)} className="absolute left-1/2 top-3 -translate-x-1/2 z-30 text-[11px] font-medium px-2.5 py-1 rounded-lg bg-neutral-800 text-white hover:bg-neutral-700">Show logos</button> : null)
            : <div data-logogroup className="relative group flex gap-[20px] items-center">
                <LogoSlot k="logo1" className="bg-white rounded-[15.75px] shrink-0 size-[90px]" />
                <div className="relative size-[34px] flex items-center justify-center">
                  <span className="text-white text-[30px] leading-none font-light">+</span>
                </div>
                <LogoSlot k="logo2" className="bg-white rounded-[15.75px] shrink-0 size-[90px]" />
                <button data-ctl onClick={() => setLogosHidden(true)} className="absolute -top-8 right-0 opacity-0 group-hover:opacity-100 transition text-[11px] font-medium px-2.5 py-1 rounded-lg bg-neutral-800 text-white hover:bg-neutral-700">Hide logos</button>
              </div>}

          {/* centered phone-shaped video slot */}
          <Slot k="slotMAIN" className="bg-white shrink-0 rounded-[23.727px]" style={{ width: 286.47, aspectRatio: "1080 / 1920" }} />

          {/* caption */}
          <p className="text-center font-medium text-[40px] leading-none tracking-[-0.2px]" style={{ fontFamily: "'Geist',sans-serif" }}>
            <span className="text-white">Comment </span>
            <span className="text-[#ff570a]">“Agent Opus”</span>
          </p>
        </div>
      </div>
    );
  }

  window.TEMPLATES = window.TEMPLATES || [];
  window.TEMPLATES.push({ id: "3532-13358", name: "Comment Giveaway 9:16", width: 594, height: 1056, slots: 1, logoSlots: 2, desc: "9:16 giveaway mockup with two product thumbnails, a phone media frame, and a 'Comment Agent Opus' caption", Component });
})();
