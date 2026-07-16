/* Template 3534-14520 — Product Combine 9:16 Story */
(function () {
  function Component(props) {
    const { useState } = React;

    const [vids, setVids] = useState(() => (props && props.preload && props.preload.vids) || {});
    React.useEffect(() => { window.__slotAPI = { setVids }; return () => { window.__slotAPI = null; }; }, []);
    const pick = k => { const i=document.createElement('input'); i.type='file'; i.accept='video/*,image/*'; i.onchange=e=>{const f=e.target.files[0]; if(f) setVids(v=>({...v,[k]:{url:URL.createObjectURL(f),img:(f.type||"").startsWith("image")}}));}; i.style.cssText='position:fixed;left:-9999px;top:-9999px;width:1px;height:1px;opacity:0'; document.body.appendChild(i); i.addEventListener('change',function(){setTimeout(function(){i.remove();},0);},{once:true}); i.click(); };
    const Slot = ({ k, className, style }) => (
      <div data-vslot={k} onClick={() => pick(k)} className={'overflow-hidden cursor-pointer group flex items-center justify-center ' + (className || '')} style={style}>
        {vids[k] ? (vids[k].img ? <img src={vids[k].url} className="w-full h-full object-cover" /> : <video src={vids[k].url} autoPlay loop muted playsInline className="w-full h-full object-cover" />)
        : null}
      </div>
    );
    const [logos, setLogos] = useState(() => (props && props.preload && props.preload.logos) || { logo1: window.__CLAUDE_LOGO, logo2: window.__AGENT_OPUS_MARK });
    const [logoBgs, setLogoBgs] = useState(() => (props && props.preload && props.preload.logoBgs) || {});
    const [logoScales, setLogoScales] = useState(() => (props && props.preload && props.preload.logoScales) || { logo1: 0.7 });
    const [logoBgDefault, setLogoBgDefault] = useState({});
    const [logosHidden, setLogosHidden] = useState(() => (props && props.preload && props.preload.logosHidden) || false);
    React.useEffect(() => { if (window.__slotAPI) { window.__slotAPI.setLogos = setLogos; window.__slotAPI.setLogoScales = setLogoScales; window.__slotAPI.setLogoBgs = setLogoBgs; window.__slotAPI.setLogosHidden = setLogosHidden; } }, []);
    React.useEffect(() => { if (window.__slotAPI) window.__slotAPI.logosHidden = logosHidden; }, [logosHidden]);
    React.useEffect(() => { let on = true; Object.keys(logos).forEach(k => { const u = logos[k]; if (u && window.__logoDominant) window.__logoDominant(u).then(c => { if (on && c) setLogoBgDefault(m => (m[k] === c ? m : { ...m, [k]: c })); }); }); return () => { on = false; }; }, [logos]);
    const __logoBg = (k) => (logoBgs[k] != null ? logoBgs[k] : (logoBgDefault[k] != null ? logoBgDefault[k] : (window.__LOGO_BG || {})[logos[k]]));
    const __logoScale = (k) => (logoScales[k] != null ? logoScales[k] : ((window.__LOGO_SCALE_DEFAULTS || {})[logos[k]] || 1));
    const __openLogo = (k) => { if (window.__selectLogo) window.__selectLogo({ k, hasLogo: !!logos[k], uri: logos[k], bg: __logoBg(k) || "#ffffff", scale: __logoScale(k), setBg: v => setLogoBgs(m => ({ ...m, [k]: v })), setScale: v => setLogoScales(m => ({ ...m, [k]: v })), replace: () => { if (window.__logoPicker) window.__logoPicker(url => setLogos(l => ({ ...l, [k]: url }))); } }); else if (window.__logoPicker) window.__logoPicker(url => setLogos(l => ({ ...l, [k]: url }))); };
    const pickLogo = k => { if (window.__logoPicker) window.__logoPicker(url => setLogos(l => ({ ...l, [k]: url }))); };
    const LogoSlot = ({ k, className, style }) => (
      <div data-lslot={k} onClick={() => __openLogo(k)} className={'overflow-hidden cursor-pointer group flex items-center justify-center ' + (className || '')} style={{ ...(style || {}), ...(logos[k] && __logoBg(k) ? { backgroundColor: __logoBg(k) } : {}) }}>
        {logos[k] ? <img src={logos[k]} style={{ transform: 'scale(' + __logoScale(k) + ')', transformOrigin: 'center' }} className={"w-full h-full " + ((window.__FILL_LOGOS||[]).indexOf(logos[k])>=0 ? "object-cover" : "object-contain p-[10px]")} /> : <span className="text-[11px] font-medium text-neutral-400 group-hover:text-neutral-600">logo</span>}
      </div>
    );

    return (
      <div className="relative overflow-hidden bg-[#101010]" style={{ width: 594, height: 1056 }} data-name="9:16-template">
        {/* ambient blurred backdrop keyed to the main media slot */}
        {vids.slot3 && !vids.slot3.img
          ? <div className="hidden" />
          : vids.slot3 && vids.slot3.img
            ? <div className="hidden" />
            : null}

        {/* centered column */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-[42px]">
          {/* logo-tile row: two white rounded tiles + plus */}
          {logosHidden
            ? (window.__EDITOR ? <button data-ctl onClick={() => setLogosHidden(false)} className="absolute left-1/2 top-3 -translate-x-1/2 z-30 text-[11px] font-medium px-2.5 py-1 rounded-lg bg-neutral-800 text-white hover:bg-neutral-700">Show logos</button> : null)
            : <div data-logogroup className="relative group flex gap-[20px] items-center shrink-0">
                <LogoSlot k="logo1" className="bg-white rounded-[15.75px] shrink-0 size-[90px]" />
                <div className="relative shrink-0 flex items-center justify-center size-[34px]">
                  <span className="text-white text-[30px] leading-none font-light">+</span>
                </div>
                <LogoSlot k="logo2" className="bg-white rounded-[15.75px] shrink-0 size-[90px]" />
                <button data-ctl title="Remove logos" onClick={() => setLogosHidden(true)} className="absolute -top-3 -right-3 z-30 w-6 h-6 flex items-center justify-center rounded-full bg-neutral-900 text-white text-[11px] leading-none opacity-0 group-hover:opacity-100 shadow hover:bg-neutral-700 transition">✕</button>
              </div>}

          {/* centered framed media */}
          <Slot k="slot3" className="bg-neutral-800 shrink-0" style={{ width: 594, height: 334 }} />

          {/* caption */}
          <p className="text-center font-medium text-[40px] leading-none tracking-[-0.2px] font-[Geist,sans-serif]">
            <span className="text-white">Comment </span>
            <span className="text-[#ff570a]">"Agent Opus"</span>
          </p>
        </div>
      </div>
    );
  }

  window.TEMPLATES = window.TEMPLATES || [];
  window.TEMPLATES.push({ id: "3534-14520", name: "Product Combine 9:16 Story", width: 594, height: 1056, slots: 1, logoSlots: 2, desc: "Two product tiles combining into a hero media clip with a Comment CTA caption", Component });
})();
